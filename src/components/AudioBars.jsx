/**
 * AudioBars — animated EQ-style bars indicating active/live status.
 * Ported from the design system handoff (claude.ai/design).
 *
 * Props:
 *   active  {boolean}  Whether to animate (default: true)
 *   color   {string}   Bar color (default: 'currentColor')
 *   size    {number}   Bar height in px (default: 12)
 */
export default function AudioBars({ active = true, color = 'currentColor', size = 12 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        gap: '2px',
        height: size,
        width: size + 2,
        flexShrink: 0,
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          style={{
            width: 2,
            height: '100%',
            background: color,
            opacity: 0.85,
            transformOrigin: 'bottom',
            animation: active
              ? `audioBars 1.1s ${-i * 0.18}s infinite alternate cubic-bezier(.2,.7,.2,1)`
              : 'none',
            transform: active ? undefined : 'scaleY(0.3)',
          }}
        />
      ))}
      <style>{`
        @keyframes audioBars {
          0%   { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes audioBars {
            0%, 100% { transform: scaleY(0.6); }
          }
        }
      `}</style>
    </span>
  );
}
