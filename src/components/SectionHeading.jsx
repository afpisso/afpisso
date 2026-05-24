import GlitchStrokeText from './GlitchStrokeText';
import { m } from 'framer-motion';

/**
 * SectionHeading — editorial section title system.
 *
 * Structure:
 *   ┌──────────────────────┐  PAGE
 *   │  LABEL TEXT  ▊▊▊▊▊▊ │  007
 *   └──────────────────────┘
 *   ──── thin rule ─────────────
 *
 *   LINE ONE
 *     LINE TWO      ← max 2–3 lines, staircase per line (not per word)
 *
 * Props:
 *   label       Short text for the red chip (e.g. "Systems Lab")
 *   title       Multi-line title — use \n for explicit line breaks.
 *               When omitted the staircase h2 is not rendered.
 *   page        Zero-padded page string ("006")
 *   delay       Motion delay for entrance (seconds)
 */

// Indent per line (not per word) — subtle, editorial
const getLineIndent = (i) => {
  if (i === 0) return '0';
  // Clamp: generous on desktop, contained on mobile
  return `clamp(24px, 4vw, 72px)`;
};

export default function SectionHeading({ label, title, page, delay = 0 }) {
  // Split on \n for explicit line control; uppercase each line
  const lines = title
    ? title.split('\n').map((l) => l.trim().toUpperCase()).filter(Boolean)
    : [];

  return (
    <div>
      {/* ── Top row: chamfered red chip + PAGE number ── */}
      <m.div
        className="flex items-center justify-between mb-5"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {/* Red chamfered block */}
        <div
          style={{
            backgroundColor: 'var(--color-accent)',
            clipPath:
              'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            padding: '8px 22px 8px 14px',
            display: 'inline-block',
          }}
        >
          <span
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
              color: '#0a0a0a',
              letterSpacing: '0.06em',
              lineHeight: 1,
              display: 'block',
              whiteSpace: 'nowrap',
            }}
          >
            {label.toUpperCase()}
          </span>
        </div>

        {/* PAGE number — pushed to far right */}
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px',
            color: 'var(--color-accent)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            textAlign: 'right',
            lineHeight: 1.7,
          }}
        >
          PAGE<br />{page}
        </div>
      </m.div>

      {/* ── Thin rule between chip and title ── */}
      {lines.length > 0 && (
        <m.div
          style={{ height: 1, backgroundColor: 'var(--color-rule)', marginBottom: '1.75rem' }}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: delay + 0.1 }}
        />
      )}

      {/* ── Staircase h2 — per LINE, not per word ── */}
      {lines.length > 0 && (
        <h2
          aria-label={lines.join(' ')}
          style={{ lineHeight: 1.0 }}
        >
          {lines.map((line, i) => (
            <m.div
              key={i}
              style={{
                paddingLeft: getLineIndent(i),
                overflow: 'hidden',
                display: 'block',
                // Second line slightly smaller for visual hierarchy
                marginTop: i > 0 ? '0.08em' : 0,
              }}
              initial={{ y: '106%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.72,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + 0.18 + i * 0.1,
              }}
            >
              <span
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize:
                    i === 0
                      ? 'clamp(3.8rem, 7.5vw, 8.5rem)'
                      : 'clamp(3.4rem, 6.8vw, 7.6rem)',
                  letterSpacing: '0.01em',
                  // Second line: stroke/ghost treatment for contrast
                  color: i === 0 ? 'var(--color-fg)' : 'var(--color-fg)',
                  opacity: i === 0 ? 1 : 0.72,
                  display: 'block',
                  whiteSpace: 'nowrap',
                }}
              >
                <GlitchStrokeText silent>{line}</GlitchStrokeText>
              </span>
            </m.div>
          ))}
        </h2>
      )}
    </div>
  );
}
