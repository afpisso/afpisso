/**
 * AudioBars — compact EQ-style signal indicator.
 * Uses transform-only animation so it stays cheap inside the fixed nav.
 *
 * Props:
 *   active  {boolean}  Whether to animate (default: true)
 *   color   {string}   Bar color (default: 'currentColor')
 *   size    {number}   Bar height in px (default: 12)
 */
export default function AudioBars({ active = true, color = 'currentColor', size = 12 }) {
  const bars = [
    { min: 0.22, mid: 0.68, peak: 0.42, end: 0.88, duration: 0.74, delay: -0.18 },
    { min: 0.36, mid: 0.96, peak: 0.55, end: 0.28, duration: 0.58, delay: -0.42 },
    { min: 0.18, mid: 0.52, peak: 1.0, end: 0.46, duration: 0.82, delay: -0.06 },
    { min: 0.44, mid: 0.74, peak: 0.26, end: 0.92, duration: 0.66, delay: -0.34 },
    { min: 0.26, mid: 0.88, peak: 0.38, end: 0.62, duration: 0.92, delay: -0.58 },
  ];

  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        gap: '2px',
        height: size,
        width: size + 6,
        flexShrink: 0,
      }}
    >
      {bars.map((bar, i) => (
        <span
          key={i}
          style={{
            width: i === 2 ? 2.5 : 2,
            height: '100%',
            background: color,
            opacity: active ? 0.9 : 0.42,
            transformOrigin: 'bottom',
            willChange: active ? 'transform' : 'auto',
            animation: active
              ? `audioBars-live ${bar.duration}s ${bar.delay}s infinite cubic-bezier(0.32,0.72,0,1)`
              : 'none',
            transform: active ? `scaleY(${bar.min})` : `scaleY(${i === 2 ? 0.5 : 0.28})`,
            transition: 'opacity 180ms cubic-bezier(0.16,1,0.3,1), transform 180ms cubic-bezier(0.16,1,0.3,1)',
            '--bar-min': bar.min,
            '--bar-mid': bar.mid,
            '--bar-peak': bar.peak,
            '--bar-end': bar.end,
          }}
        />
      ))}
      <style>{`
        @keyframes audioBars-live {
          0%   { transform: scaleY(var(--bar-min)); }
          18%  { transform: scaleY(var(--bar-mid)); }
          34%  { transform: scaleY(var(--bar-peak)); }
          52%  { transform: scaleY(var(--bar-end)); }
          72%  { transform: scaleY(var(--bar-mid)); }
          100% { transform: scaleY(var(--bar-min)); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes audioBars-live {
            0%, 100% { transform: scaleY(0.55); }
          }
        }
      `}</style>
    </span>
  );
}
