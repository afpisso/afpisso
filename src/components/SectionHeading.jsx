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
const getLineIndent = (i, compact, mobile) => {
  if (i === 0) return '0';
  if (mobile) return 'clamp(10px, 3vw, 16px)';
  if (compact) return 'clamp(16px, 3vw, 32px)';
  // Clamp: generous on desktop, contained on mobile
  return `clamp(24px, 4vw, 72px)`;
};

function useViewportBand() {
  const [viewport, setViewport] = useState(
    () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 1440;
      return { compact: width <= 1023, mobile: width <= 680 };
    }
  );

  useEffect(() => {
    const compactMq = window.matchMedia('(max-width: 1023px)');
    const mobileMq = window.matchMedia('(max-width: 680px)');
    const sync = () => setViewport({ compact: compactMq.matches, mobile: mobileMq.matches });
    sync();
    compactMq.addEventListener('change', sync);
    mobileMq.addEventListener('change', sync);
    return () => {
      compactMq.removeEventListener('change', sync);
      mobileMq.removeEventListener('change', sync);
    };
  }, []);

  return viewport;
}

export default function SectionHeading({ label, title, page, delay = 0 }) {
  const { compact: isCompact, mobile: isMobile } = useViewportBand();

  // Split on \n for explicit line control; uppercase each line
  const lines = title
    ? title.split('\n').map((l) => l.trim().toUpperCase()).filter(Boolean)
    : [];

  return (
    <div>
      {/* ── Top row: chamfered red chip + PAGE number ── */}
      <m.div
        className="flex items-center justify-between mb-5"
        style={{ gap: isCompact ? 14 : 20, alignItems: isCompact ? 'flex-start' : 'center' }}
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
            padding: isCompact ? '7px 16px 7px 12px' : '8px 22px 8px 14px',
            display: 'inline-block',
            maxWidth: isCompact ? 'calc(100% - 64px)' : undefined,
          }}
        >
          <span
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: isMobile ? 'clamp(1.35rem, 7vw, 1.85rem)' : isCompact ? 'clamp(1.45rem, 4.5vw, 2.05rem)' : 'clamp(1.6rem, 2.8vw, 2.4rem)',
              color: '#0a0a0a',
              letterSpacing: isCompact ? '0.045em' : '0.06em',
              lineHeight: isCompact ? 0.95 : 1,
              display: 'block',
              whiteSpace: isCompact ? 'normal' : 'nowrap',
              textWrap: isCompact ? 'balance' : undefined,
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
            fontSize: isCompact ? '8px' : '9px',
            color: 'var(--color-accent)',
            letterSpacing: isCompact ? '0.12em' : '0.14em',
            textTransform: 'uppercase',
            textAlign: 'right',
            lineHeight: isCompact ? 1.45 : 1.7,
            flexShrink: 0,
            paddingTop: isCompact ? 4 : 0,
          }}
        >
          PAGE<br />{page}
        </div>
      </m.div>

      {/* ── Thin rule between chip and title ── */}
      {lines.length > 0 && (
        <m.div
          style={{ height: 1, backgroundColor: 'var(--color-rule)', marginBottom: isCompact ? '1.15rem' : '1.75rem' }}
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
          style={{ lineHeight: isCompact ? 0.88 : 1.0, maxWidth: '100%' }}
        >
          {lines.map((line, i) => (
            <m.div
              key={i}
              style={{
                paddingLeft: getLineIndent(i, isCompact, isMobile),
                overflow: 'hidden',
                display: 'block',
                // Second line slightly smaller for visual hierarchy
                marginTop: i > 0 ? (isCompact ? '0.04em' : '0.08em') : 0,
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
                      ? (isMobile ? 'clamp(2.7rem, 13.8vw, 4rem)' : isCompact ? 'clamp(3.25rem, 8.2vw, 5.8rem)' : 'clamp(3.8rem, 7.5vw, 8.5rem)')
                      : (isMobile ? 'clamp(2.35rem, 12.2vw, 3.55rem)' : isCompact ? 'clamp(2.9rem, 7.3vw, 5.1rem)' : 'clamp(3.4rem, 6.8vw, 7.6rem)'),
                  letterSpacing: isCompact ? '0.005em' : '0.01em',
                  // Second line: stroke/ghost treatment for contrast
                  color: i === 0 ? 'var(--color-fg)' : 'var(--color-fg)',
                  opacity: i === 0 ? 1 : 0.72,
                  display: 'block',
                  whiteSpace: isCompact ? 'normal' : 'nowrap',
                  textWrap: isCompact ? 'balance' : undefined,
                  overflowWrap: isCompact ? 'normal' : undefined,
                  maxWidth: '100%',
                }}
              >
                <GlitchStrokeText
                  silent
                  style={isCompact ? {
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
