import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import GeometryGrid from './GeometryGrid';

const SECTION_CONFIG = {
  home: { shape: 'logo', offsetX: 0.46, spin: true },
  cases: { shape: 'tknot53', offsetX: 0.46, spin: true },
  'what-i-do': { shape: 'mobius', offsetX: -0.46, spin: true },
  'how-i-work': { shape: 'vortex', offsetX: 0.46, spin: true },
  notes: { shape: 'lorenz', offsetX: -0.46, spin: true },
  about: { shape: 'tknot32', offsetX: 0.46, spin: true },
  contact: { shape: 'sphere', offsetX: 0.46, spin: true },
  'footer-tx': { shape: 'scanline', offsetX: 0, spin: false },
};

const SECTION_IDS = Object.keys(SECTION_CONFIG);

function useMousePos() {
  const ref = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const onMove = (e) => {
      ref.current.x = e.clientX;
      ref.current.y = e.clientY;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return ref;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const update = () => {
      const triggerY = window.innerHeight * 0.35;
      let bestId = ids[0];
      let bestTop = -Infinity;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= triggerY && top > bestTop) {
          bestTop = top;
          bestId = id;
        }
      }

      setActive((prev) => (prev === bestId ? prev : bestId));
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
    const retry = setTimeout(update, 700);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      clearTimeout(retry);
    };
  }, [ids]);

  return active;
}

export default function HomeGeometryLayer() {
  const shouldReduce = useReducedMotion();
  const mouseRef = useMousePos();
  const activeSection = useActiveSection(SECTION_IDS);
  const cfg = SECTION_CONFIG[activeSection] || SECTION_CONFIG.home;

  if (shouldReduce) return null;

  return (
    <GeometryGrid
      mouseRef={mouseRef}
      shape={cfg.shape}
      intensity={7}
      offsetX={cfg.offsetX}
      offsetY={0}
      rotX={0.2}
      spin={cfg.spin}
      paused={false}
      particleCount={1200}
    />
  );
}
