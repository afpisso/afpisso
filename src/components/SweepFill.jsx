/**
 * SweepFill — menu-style red sweep animation for buttons and links.
 *
 * The parent element must have:
 *   position: relative
 *   overflow: hidden  (if the clip shape needs containment)
 *
 * Usage:
 *   <button style={{ position: 'relative', overflow: 'hidden' }}>
 *     <SweepFill active={hover}>Label text</SweepFill>
 *   </button>
 */

const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';

export default function SweepFill({
  children,
  active,
  fillColor = 'var(--color-accent)',
  activeTextColor = '#0a0a0a',
}) {
  return (
    <>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: fillColor,
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition: `transform 0.28s ${EASE}`,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1, color: active ? activeTextColor : 'inherit', transition: 'color 0.18s' }}>
        {children}
      </span>
    </>
  );
}
