/**
 * Ticker — infinite horizontal text marquee.
 *
 * Pure CSS animation: translateX 0 → -50% on a duplicated track.
 * Pauses on hover. No JS requestAnimationFrame, no layout thrashing.
 * GPU composited via will-change: transform.
 *
 * Props:
 *   items     string[] — items to display (repeated for seamless loop)
 *   speed     number   — seconds per full cycle (default 38)
 *   reverse   boolean  — scroll right-to-left vs left-to-right
 *   separator string   — separator between items (default '·')
 *   accent    number[] — indices of items to render in accent red
 *   className string
 */

export default function Ticker({
  items,
  speed     = 38,
  reverse   = false,
  separator = '·',
  accent    = [],
  className = '',
}) {
  // Duplicate the items for a seamless infinite loop
  const track = [...items, ...items];

  return (
    <div
      className={`ticker-root ${className}`}
      style={{
        overflow:   'hidden',
        borderTop:  '1px solid var(--color-rule)',
        borderBottom: '1px solid var(--color-rule)',
        padding:    '14px 0',
        position:   'relative',
      }}
    >
      {/* Left + right edge fade */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          zIndex:     2,
          pointerEvents: 'none',
          background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 8%, transparent 92%, var(--color-bg) 100%)',
        }}
      />

      <div
        className="ticker-track"
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          gap:            0,
          whiteSpace:     'nowrap',
          animationName:          reverse ? 'ticker-reverse' : 'ticker-forward',
          animationDuration:      `${speed}s`,
          animationTimingFunction:'linear',
          animationIterationCount:'infinite',
          willChange:     'transform',
        }}
      >
        {track.map((item, i) => {
          const originalIdx = i % items.length;
          const isAccent    = accent.includes(originalIdx);

          return (
            <span
              key={i}
              style={{ display: 'inline-flex', alignItems: 'center' }}
              aria-hidden={i >= items.length ? 'true' : undefined}
            >
              <span
                style={{
                  fontFamily:    '"JetBrains Mono", monospace',
                  fontSize:      '9px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         isAccent ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                  padding:       '0 24px',
                  transition:    'color 0.2s',
                }}
              >
                {item}
              </span>
              <span
                aria-hidden="true"
                style={{
                  color:       isAccent ? 'rgba(255,37,64,0.5)' : 'rgba(255,255,255,0.12)',
                  fontSize:    '8px',
                  flexShrink:  0,
                  lineHeight:  1,
                }}
              >
                {separator}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
