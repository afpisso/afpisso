import GlitchStrokeText from './GlitchStrokeText';
import { m } from 'framer-motion';

/**
 * SectionHeading — editorial section title system.
 *
 * Structure:
 *   ┌──────────────────────┐  PAGE
 *   │  LABEL TEXT  ▊▊▊▊▊▊ │  007
 *   └──────────────────────┘
 *
 *   STAIRCASE
 *     TITLE
 *       TEXT   ← each word on its own indented line with scramble + chromatic glitch
 *
 * Props:
 *   label       Short text for the red block (e.g. "Systems Lab")
 *   title       Text for the staircase h2 — defaults to `label` if omitted
 *   page        Zero-padded page string ("006")
 *   delay       Motion delay for entrance (seconds)
 */

// Compute indent for word at position i
const getIndent = (i) => {
  if (i === 0) return '0';
  const minPx  = 32 * i;
  const vw     = 4.5 * i;
  const maxPx  = 80 * i;
  return `clamp(${minPx}px, ${vw}vw, ${maxPx}px)`;
};

export default function SectionHeading({ label, title, page, delay = 0 }) {
  const displayTitle = (title ?? label).toUpperCase();
  const words = displayTitle.split(' ');

  return (
    <div>
      {/* ── Top row: chamfered red block + PAGE number ── */}
      <m.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {/* Red chamfered block */}
        <div
          style={{
            backgroundColor: 'var(--color-accent)',
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            padding: '8px 22px 8px 14px',
            display: 'inline-block',
          }}
        >
          <span
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)',
              color: '#0a0a0a',
              letterSpacing: '0.04em',
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

      {/* ── Staircase h2 — each word is its own line ── */}
      <h2 aria-label={displayTitle} style={{ lineHeight: 0.88 }}>
        {words.map((word, i) => (
          <m.div
            key={word + i}
            style={{
              paddingLeft: getIndent(i),
              overflow: 'hidden',
              display: 'block',
            }}
            initial={{ opacity: 0, y: '60%' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + 0.1 + i * 0.08,
            }}
          >
            <span
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(3.5rem, 7.5vw, 8.5rem)',
                letterSpacing: '-0.01em',
                color: 'var(--color-fg)',
                display: 'block',
              }}
            >
              <GlitchStrokeText silent>{word}</GlitchStrokeText>
            </span>
          </m.div>
        ))}
      </h2>
    </div>
  );
}
