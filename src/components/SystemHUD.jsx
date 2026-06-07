import { useEffect, useRef, useState } from 'react';

const MONO = '"Play", sans-serif';

// Ambient system readout — cursor position, scroll progress, session time.
// Updates via RAF + direct DOM mutation (no React re-renders at 60fps).
// Desktop-only, aria-hidden, pointer-events: none.
export default function SystemHUD() {
  const [isMd, setIsMd] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 768
  );
  const [visible, setVisible] = useState(false);

  const containerRef = useRef(null);
  const cxRef        = useRef(null);
  const cyRef        = useRef(null);
  const scRef        = useRef(null);
  const tmRef        = useRef(null);

  const cursorRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const rafRef    = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => setIsMd(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!isMd) return;

    const onMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    const onScroll = () => {
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      scrollRef.current = window.scrollY / max;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll',      onScroll, { passive: true });

    const tick = () => {
      if (cxRef.current) {
        const t = (document.timeline?.currentTime ?? performance.now()) / 1000;

        cxRef.current.textContent = cursorRef.current.x;
        cyRef.current.textContent = cursorRef.current.y;
        scRef.current.textContent = scrollRef.current.toFixed(3);
        tmRef.current.textContent = t.toFixed(1) + 'S';
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Appear after boot sequence settles
    const timer = setTimeout(() => setVisible(true), 1800);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll',      onScroll);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timer);
    };
  }, [isMd]);

  if (!isMd) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        bottom:        16,
        right:         16,
        zIndex:        50,
        fontFamily:    MONO,
        fontSize:      '8px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        pointerEvents: 'none',
        display:       'grid',
        gridTemplateColumns: 'auto auto',
        columnGap:     20,
        rowGap:        3,
        lineHeight:    1.6,
        opacity:       visible ? 1 : 0,
        transition:    'opacity 0.8s ease',
      }}
    >
      <Row label="CURSOR X:" valueRef={cxRef} init="0" />
      <Row label="SCROLL:"   valueRef={scRef} init="0.000" />
      <Row label="CURSOR Y:" valueRef={cyRef} init="0" />
      <Row label="TIME:"     valueRef={tmRef} init="0.0S" />
    </div>
  );
}

function Row({ label, valueRef, init }) {
  return (
    <div style={{ display: 'flex', gap: 6, whiteSpace: 'nowrap' }}>
      <span style={{ color: 'var(--color-fg-mute)' }}>{label}</span>
      <span ref={valueRef} style={{ color: 'var(--color-fg-dim)', minWidth: '3ch', textAlign: 'right' }}>
        {init}
      </span>
    </div>
  );
}
