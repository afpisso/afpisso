import { usePageTransition } from '../contexts/TransitionContext';

const ACCENT = '#ff2540';
const MONO   = '"Play", monospace';
const BEBAS  = '"Bebas Neue", sans-serif';

// ── Clip-path per phase ───────────────────────────────────────────────────────
// wipe-in:    sheet enters from the right  → covers screen
// title-card: sheet is full screen, title card visible
// wipe-out:   sheet exits to the left
// idle:       hidden (off-screen right)
function sheetClip(phase) {
  if (phase === 'wipe-in')    return 'inset(0 0 0 0)';
  if (phase === 'title-card') return 'inset(0 0 0 0)';
  if (phase === 'wipe-out')   return 'inset(0 100% 0 0)';
  return 'inset(0 0 0 100%)'; // idle — parked off-screen right
}

function sheetTransition(phase) {
  if (phase === 'wipe-in')  return 'clip-path 0.32s cubic-bezier(0.32, 0.72, 0, 1)';
  if (phase === 'wipe-out') return 'clip-path 0.32s cubic-bezier(0.16, 1, 0.3, 1)';
  return 'none';
}

export default function PageTransitionOverlay() {
  const { state } = usePageTransition();
  const { active, meta, phase } = state;

  if (!active && phase === 'idle') return null;

  const isWipe = phase === 'wipe-in' || phase === 'title-card' || phase === 'wipe-out';
  const showTitleCard = phase === 'title-card' && meta?.caseId;

  return (
    <>
      {/* Red sweep sheet */}
      <div
        aria-hidden="true"
        style={{
          position:    'fixed',
          inset:       0,
          zIndex:      190,
          background:  ACCENT,
          clipPath:    sheetClip(phase),
          transition:  sheetTransition(phase),
          pointerEvents: 'none',
          overflow:    'hidden',
        }}
      >
        {/* Faint repeating wordmark — same as MenuOverlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
          fontFamily: BEBAS,
          color: '#0a0a0a', opacity: 0.08,
          fontSize: 200, letterSpacing: '0.04em', lineHeight: 0.85,
          whiteSpace: 'nowrap', overflow: 'hidden', paddingLeft: 20,
          userSelect: 'none',
        }}>
          <span>BYANDRESFE·BYANDRESFE</span>
          <span style={{ alignSelf: 'flex-end' }}>·BYANDRESFE·</span>
          <span>BYANDRESFE·BYANDRESFE</span>
        </div>

        {/* Title card — visible during title-card phase */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'grid', placeItems: 'center',
          opacity: showTitleCard ? 1 : 0,
          transition: 'opacity 0.12s ease',
        }}>
          {meta?.caseId && (
            <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{
                fontFamily: MONO,
                fontSize: '9px',
                letterSpacing: '0.24em',
                color: 'rgba(10,10,10,0.6)',
                textTransform: 'uppercase',
                marginBottom: 12,
                fontWeight: 700,
              }}>
                {meta.caseId}
              </div>
              <div style={{
                fontFamily: BEBAS,
                fontSize: 'clamp(2rem, 5vw, 3.8rem)',
                color: '#0a0a0a',
                letterSpacing: '0.02em',
                lineHeight: 0.9,
                maxWidth: '600px',
                textTransform: 'uppercase',
              }}>
                {meta.caseTitle}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Soft slide overlay — for prev/next between cases */}
      {(phase === 'slide-out' || phase === 'slide-in') && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed', inset: 0, zIndex: 190,
            backgroundColor: 'var(--color-bg)',
            opacity: phase === 'slide-out' ? 1 : 0,
            transition: phase === 'slide-out'
              ? 'opacity 0.18s ease-in'
              : 'opacity 0.25s cubic-bezier(0.16,1,0.3,1)',
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
}
