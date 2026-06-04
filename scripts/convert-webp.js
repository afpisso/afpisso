import sharp from 'sharp';
import { readdirSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const dir = new URL('../public/thumbnails/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

const files = readdirSync(dir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

for (const file of files) {
  const src = join(dir, file);
  const dest = join(dir, basename(file, extname(file)) + '.webp');
  if (existsSync(dest)) { console.log('skip', file); continue; }
  const info = await sharp(src)
    .webp({ quality: 82, effort: 4 })
    .toFile(dest);
  console.log(`✓ ${file} → ${basename(dest)} (${Math.round(info.size/1024)}KB)`);
}
