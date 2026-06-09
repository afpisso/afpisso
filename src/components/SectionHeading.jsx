import GlitchStrokeText from './GlitchStrokeText';
import { m } from 'framer-motion';
import { useEffect, useState } from 'react';

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
const getLineIndent = (i, mobile) => {
  if (i === 0) return '0';
  if (mobile) return 'clamp(10px, 3vw, 16px)';
  // Clamp: generous on desktop, contained on mobile
  return `clamp(24px, 4vw, 72px)`;
};

function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 680
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 680px)');
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return mobile;
}

export default function SectionHeading({ label, title, page, delay = 0 }) {
  const isMobile = useIsMobile();

  // Split on \n for explicit line control; uppercase each line
  const lines = title
    ? title.split('\n').map((l) => l.trim().toUpperCase()).filter(Boolean)
    : [];

  return (
    <div>
      {/* ── Top row: chamfered red chip + PAGE number ── */}
      <m.div
        className="flex items-center justify-between mb-5"
        style={{ gap: isMobile ? 14 : 20, alignItems: isMobile ? 'flex-start' : 'center' }}
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
            padding: isMobile ? '7px 16px 7px 12px' : '8px 22px 8px 14px',
            display: 'inline-block',
            maxWidth: isMobile ? 'calc(100% - 64px)' : undefined,
          }}
        >
          <span
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: isMobile ? 'clamp(1.35rem, 7vw, 1.85rem)' : 'clamp(1.6rem, 2.8vw, 2.4rem)',
              color: '#0a0a0a',
              letterSpacing: isMobile ? '0.045em' : '0.06em',
              lineHeight: isMobile ? 0.95 : 1,
              display: 'block',
              whiteSpace: isMobile ? 'normal' : 'nowrap',
              textWrap: isMobile ? 'balance' : undefined,
            }}
          >
            {label.toUpperCase()}
          </span>
        </div>

        {/* PAGE number — parallax depth layer via CSS scroll-driven animation */}
        <div
          className="section-page-num"
          style={{
            fontFamily: '"Play", sans-serif',
            fontSize: isMobile ? '8px' : '9px',
            color: 'var(--color-accent)',
            letterSpacing: isMobile ? '0.12em' : '0.14em',
            textTransform: 'uppercase',
            textAlign: 'right',
            lineHeight: isMobile ? 1.45 : 1.7,
            flexShrink: 0,
            paddingTop: isMobile ? 4 : 0,
          }}
        >
          PAGE<br />{page}
        </div>
      </m.div>

      {/* ── Thin rule between chip and title ── */}
      {lines.length > 0 && (
        <m.div
          style={{ height: 1, backgroundColor: 'var(--color-rule)', marginBottom: isMobile ? '1.15rem' : '1.75rem' }}
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
          style={{ lineHeight: isMobile ? 0.86 : 1.0, maxWidth: '100%' }}
        >
          {lines.map((line, i) => (
            <m.div
              key={i}
              style={{
                paddingLeft: getLineIndent(i, isMobile),
                overflow: 'hidden',
                display: 'block',
                // Second line slightly smaller for visual hierarchy
                marginTop: i > 0 ? (isMobile ? '0.04em' : '0.08em') : 0,
                maxWidth: '100%',
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
                      ? (isMobile ? 'clamp(2.7rem, 13.8vw, 4rem)' : 'clamp(3.8rem, 7.5vw, 8.5rem)')
                      : (isMobile ? 'clamp(2.35rem, 12.2vw, 3.55rem)' : 'clamp(3.4rem, 6.8vw, 7.6rem)'),
                  letterSpacing: isMobile ? '0.005em' : '0.01em',
                  // Second line: stroke/ghost treatment for contrast
                  color: i === 0 ? 'var(--color-fg)' : 'var(--color-fg)',
                  opacity: i === 0 ? 1 : 0.72,
                  display: 'block',
                  whiteSpace: isMobile ? 'normal' : 'nowrap',
                  textWrap: isMobile ? 'balance' : undefined,
                  overflowWrap: isMobile ? 'normal' : undefined,
                  maxWidth: '100%',
                }}
              >
                <GlitchStrokeText
                  silent
                  style={isMobile ? {
                    display: 'block',
                    maxWidth: '100%',
                    whiteSpace: 'normal',
                    textWrap: 'balance',
                    overflowWrap: 'normal',
                  } : undefined}
                >
                  {line}
                </GlitchStrokeText>
              </span>
            </m.div>
          ))}
        </h2>
      )}
    </div>
  );
}
