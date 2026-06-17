/**
 * pick-highlights.mjs
 *
 * For each case trailer:
 *   1. Extract 1 frame every 2s with FFmpeg
 *   2. Ask Claude Vision which 5-second window is most visually exciting
 *   3. Trim + encode a 5s clip (mp4 + webm) → public/clips/{slug}-clip.{ext}
 *
 * Usage:
 *   node scripts/pick-highlights.mjs
 *   node scripts/pick-highlights.mjs --slug orcs-must-die-by-the-blade
 *   node scripts/pick-highlights.mjs --dry-run   (skip FFmpeg export, just log picks)
 */

import { execSync, spawnSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, unlinkSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { tmpdir } from 'os';
import Anthropic from '@anthropic-ai/sdk';

// ── Config ─────────────────────────────────────────────────────────────────────
const ROOT       = resolve(import.meta.dirname, '..');
const PUBLIC     = join(ROOT, 'public');
const CLIPS_DIR  = join(PUBLIC, 'clips');
const CLIP_DURATION = 5;   // seconds to extract
const FRAME_INTERVAL = 2;  // sample one frame every N seconds
const MAX_FRAMES = 20;     // cap sent to Claude (cost/latency)
const MIN_START_OFFSET = 2; // don't start clips within 2s of beginning (avoids title cards)

const TRAILERS = [
  { slug: 'star-wars-roguelike-one',      src: 'cases/star-wars-roguelike-one/roguelike-one-trailer.mp4' },
  { slug: 'orcs-must-die-by-the-blade',   src: 'cases/orcs-must-die-by-the-blade/orcs-must-die-by-the-blade-Trailer.mp4' },
  { slug: 'zombie-dragon-adventure',      src: 'cases/zombie-dragon-adventure/zombie-dragon-adventure-Trailer.mp4' },
  { slug: 'raptor-heist',                 src: 'cases/raptor-heist/raptor-heist-Trailer.mp4' },
  { slug: 'courtyard-king',               src: 'cases/courtyard-king/courtyard-king-trailer.mp4' },
  { slug: 'havoc-hotel-3',                src: 'cases/havoc-hotel-3/havoc-hoterl-3-Trailer.mp4' },
  { slug: 'kodety',                       src: 'cases/kodety/Kodety-trailer.mp4' },
];

// ── CLI args ───────────────────────────────────────────────────────────────────
const args        = process.argv.slice(2);
const slugFilter  = args.includes('--slug')  ? args[args.indexOf('--slug')  + 1] : null;
const manualStart = args.includes('--start') ? parseInt(args[args.indexOf('--start') + 1], 10) : null;
const dryRun      = args.includes('--dry-run');

const trailers = slugFilter
  ? TRAILERS.filter(t => t.slug === slugFilter)
  : TRAILERS;

// ── Helpers ────────────────────────────────────────────────────────────────────
function ffprobe(src) {
  const result = spawnSync('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=duration',
    '-of', 'csv=p=0',
    src,
  ], { encoding: 'utf8' });
  const duration = parseFloat(result.stdout.trim());
  if (isNaN(duration)) throw new Error(`ffprobe failed for ${src}: ${result.stderr}`);
  return duration;
}

function extractFrames(src, tmpDir, duration) {
  // Decide actual interval so we don't exceed MAX_FRAMES
  const totalFrames = Math.floor(duration / FRAME_INTERVAL);
  const interval = totalFrames > MAX_FRAMES
    ? duration / MAX_FRAMES
    : FRAME_INTERVAL;

  execSync(
    `ffmpeg -y -i "${src}" -vf "fps=1/${interval},scale=640:-2" -q:v 3 "${tmpDir}/%04d.jpg"`,
    { stdio: 'pipe' },
  );

  const files = readdirSync(tmpDir)
    .filter(f => f.endsWith('.jpg'))
    .sort()
    .map(f => join(tmpDir, f));

  // Build timestamp map: frame index (1-based) → seconds
  const timestamps = files.map((_, i) => Math.round(i * interval));
  return { files, timestamps, interval };
}

function frameToBase64(path) {
  return readFileSync(path).toString('base64');
}

async function pickBestMoment(client, files, timestamps, duration) {
  // Build image content blocks
  const imageBlocks = files.map((f, i) => ({
    type: 'image',
    source: {
      type: 'base64',
      media_type: 'image/jpeg',
      data: frameToBase64(f),
    },
    // Each image is followed by a text label so Claude can reference it
  }));

  // Interleave with timestamp labels
  const content = [];
  files.forEach((f, i) => {
    content.push({
      type: 'text',
      text: `[Frame at ${timestamps[i]}s]`,
    });
    content.push({
      type: 'image',
      source: { type: 'base64', media_type: 'image/jpeg', data: frameToBase64(f) },
    });
  });

  content.push({
    type: 'text',
    text: [
      `These are frames sampled from a game trailer (total duration: ${Math.round(duration)}s).`,
      `I need to extract a ${CLIP_DURATION}-second highlight clip for a portfolio scroll animation.`,
      `Pick the single best start timestamp (in seconds) for a ${CLIP_DURATION}s window that shows:`,
      `  • high visual energy or action`,
      `  • clear gameplay (not title cards, logos, or fade-to-black)`,
      `  • no UI overlays that look out-of-context`,
      `  • the clip must end before the trailer ends (start ≤ ${Math.round(duration - CLIP_DURATION)})`,
      `  • start must be ≥ ${MIN_START_OFFSET}s`,
      ``,
      `Reply with ONLY a single integer — the start second. No explanation, no units, just the number.`,
    ].join('\n'),
  });

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 16,
    messages: [{ role: 'user', content }],
  });

  const raw = response.content[0].text.trim();
  const pick = parseInt(raw, 10);

  if (isNaN(pick)) throw new Error(`Claude returned non-numeric: "${raw}"`);

  // Clamp to valid range
  const maxStart = Math.max(MIN_START_OFFSET, Math.round(duration - CLIP_DURATION));
  return Math.min(Math.max(pick, MIN_START_OFFSET), maxStart);
}

function exportClip(src, startSec, outMp4, outWebm) {
  // MP4 — H.264, web-optimized
  execSync(
    `ffmpeg -y -ss ${startSec} -i "${src}" -t ${CLIP_DURATION} ` +
    `-c:v libx264 -preset fast -crf 23 -an ` +
    `-movflags +faststart -vf "scale=1280:-2" ` +
    `"${outMp4}"`,
    { stdio: 'pipe' },
  );

  // WebM — VP9, smaller
  execSync(
    `ffmpeg -y -ss ${startSec} -i "${src}" -t ${CLIP_DURATION} ` +
    `-c:v libvpx-vp9 -crf 33 -b:v 0 -an ` +
    `-vf "scale=1280:-2" ` +
    `"${outWebm}"`,
    { stdio: 'pipe' },
  );
}

function cleanTmp(dir) {
  try {
    readdirSync(dir).forEach(f => unlinkSync(join(dir, f)));
  } catch { /* ignore */ }
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

  if (!existsSync(CLIPS_DIR)) mkdirSync(CLIPS_DIR, { recursive: true });

  const results = [];

  for (const { slug, src } of trailers) {
    const fullSrc = join(PUBLIC, src);
    if (!existsSync(fullSrc)) {
      console.warn(`⚠  SKIP ${slug} — file not found: ${fullSrc}`);
      continue;
    }

    console.log(`\n▶ ${slug}`);

    // 1. Get duration
    const duration = ffprobe(fullSrc);
    console.log(`   duration: ${duration.toFixed(1)}s`);

    // 2. Extract frames into temp dir
    const tmpDir = join(tmpdir(), `highlights-${slug}`);
    mkdirSync(tmpDir, { recursive: true });
    cleanTmp(tmpDir);

    console.log(`   extracting frames…`);
    const { files, timestamps, interval } = extractFrames(fullSrc, tmpDir, duration);
    console.log(`   ${files.length} frames sampled (every ~${interval.toFixed(1)}s)`);

    // 3. Pick timestamp — manual override or Claude
    let startSec;
    if (manualStart !== null) {
      startSec = Math.min(Math.max(manualStart, MIN_START_OFFSET), Math.round(duration - CLIP_DURATION));
      console.log(`   using manual start: ${startSec}s`);
    } else {
      console.log(`   asking Claude…`);
      try {
        startSec = await pickBestMoment(client, files, timestamps, duration);
      } catch (err) {
        console.error(`   ✗ Claude error: ${err.message}`);
        cleanTmp(tmpDir);
        continue;
      }
    }
    console.log(`   ✓ best window: ${startSec}s – ${startSec + CLIP_DURATION}s`);

    results.push({ slug, startSec, duration: CLIP_DURATION });

    if (!dryRun) {
      // 4. Export clips
      const outMp4  = join(CLIPS_DIR, `${slug}-clip.mp4`);
      const outWebm = join(CLIPS_DIR, `${slug}-clip.webm`);
      console.log(`   encoding mp4…`);
      try {
        exportClip(fullSrc, startSec, outMp4, outWebm);
        console.log(`   ✓ saved ${slug}-clip.mp4 + .webm`);
      } catch (err) {
        console.error(`   ✗ FFmpeg error: ${err.message}`);
      }
    }

    cleanTmp(tmpDir);
  }

  // Write picks manifest
  const manifest = join(CLIPS_DIR, 'picks.json');
  writeFileSync(manifest, JSON.stringify(results, null, 2));
  console.log(`\n✔ Done. Manifest → public/clips/picks.json`);
  if (dryRun) console.log('  (dry-run — no clips exported)');
}

main().catch(err => { console.error(err); process.exit(1); });
