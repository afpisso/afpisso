import { useEffect, useState, useRef } from 'react';
import { m, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export default function Cursor() {
  const shouldReduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState('default'); // 'default' | 'hover' | 'cta'
  const [isTouch, setIsTouch] = useState(false);
  // Coords update directly via DOM ref — avoids a React re-render on every mousemove
  const coordsElRef = useRef(null);

  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);

  // Fast snap: the center dot
  const dotX = useSpring(mx, { stiffness: 900, damping: 35, restDelta: 0.001 });
  const dotY = useSpring(my, { stiffness: 900, damping: 35, restDelta: 0.001 });

  // Lazy follow: the bracket assembly
  const bkX = useSpring(mx, { stiffness: 130, damping: 18, restDelta: 0.001 });
  const bkY = useSpring(my, { stiffness: 130, damping: 18, restDelta: 0.001 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse) { setIsTouch(true); return; }
    if (shouldReduce) return;

    document.documentElement.style.cursor = 'none';

    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (coordsElRef.current) {
        coordsElRef.current.textContent =
          `X:${String(e.clientX).padStart(4, '0')} Y:${String(e.clientY).padStart(4, '0')}`;
      }
      if (!visible) setVisible(true);
    };

    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor]');
      if (!el) { setState('default'); return; }
      setState(el.dataset.cursor === 'cta' ? 'cta' : 'hover');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.style.cursor = '';
    };
  }, [mx, my, visible, shouldReduce]);

  if (isTouch || shouldReduce) return null;

  // Sizing by state
  const GAP = state === 'cta' ? 12 : state === 'hover' ? 9 : 6;
  const ARM = state === 'cta' ? 14 : state === 'hover' ? 11 : 8;
  const dotSize = state === 'cta' ? 5 : 3;
  const bkColor = state === 'cta'
    ? 'var(--color-accent)'
    : state === 'hover'
    ? 'rgba(245,245,243,0.65)'
    : 'rgba(245,245,243,0.38)';

  const bracket = (pos) => {
    const shared = {
      position: 'absolute',
      width: ARM,
      height: ARM,
      transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
    };
    const b = `1px solid ${bkColor}`;
    switch (pos) {
      case 'tl': return { ...shared, top: -(GAP + ARM), left: -(GAP + ARM), borderTop: b, borderLeft: b };
      case 'tr': return { ...shared, top: -(GAP + ARM), left: GAP,          borderTop: b, borderRight: b };
      case 'bl': return { ...shared, top: GAP,          left: -(GAP + ARM), borderBottom: b, borderLeft: b };
      case 'br': return { ...shared, top: GAP,          left: GAP,          borderBottom: b, borderRight: b };
      default:   return shared;
    }
  };

  return (
    <div aria-hidden="true" style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 99999 }}>

      {/* ── Center dot — fast snap ── */}
      <m.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          pointerEvents: 'none',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
      >
        <m.div
          animate={{ width: dotSize, height: dotSize }}
          transition={{ duration: 0.15 }}
          style={{ backgroundColor: 'var(--color-accent)', pointerEvents: 'none' }}
        />
      </m.div>

      {/* ── Bracket assembly — lazy follow ── */}
      <m.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: bkX, y: bkY,
          translateX: '-50%', translateY: '-50%',
          pointerEvents: 'none',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
      >
        {/* Zero-size anchor at cursor center */}
        <div style={{ position: 'relative', width: 0, height: 0 }}>
          {['tl', 'tr', 'bl', 'br'].map((pos) => (
            <div key={pos} style={bracket(pos)} />
          ))}

          {/* Coordinate readout */}
          <div
            ref={coordsElRef}
            style={{
              position: 'absolute',
              top: GAP + ARM + 4,
              left: GAP + 2,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '7px',
              letterSpacing: '0.06em',
              color: state === 'cta' ? 'rgba(255,37,64,0.5)' : 'rgba(245,245,243,0.22)',
              whiteSpace: 'nowrap',
              lineHeight: 1.4,
              transition: 'color 0.2s',
            }}
          >X:0000 Y:0000
          </div>
        </div>
      </m.div>
    </div>
  );
}
