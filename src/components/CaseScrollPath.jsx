/**
 * CaseScrollPath — ambient scroll progress for case studies.
 * Fixed left-edge, desktop only (xl+, ≥1280px where CaseTOC is visible).
 * A vertical SVG line that draws itself via pathLength as the page scrolls,
 * with diamond nodes marking section boundaries — game-doc / flowchart aesthetic.
 */

import { useEffect, useRef, useState } from 'react';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const H  = 340;  // SVG height (px)
const CX = 6;    // horizontal center within the 12px-wide container

export default function CaseScrollPath({ sections = [] }) {
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [marks, setMarks] = useState([]);
  const rafId = useRef(null);

  // Scrollhead Y: travels from 0 → H as the page scrolls
  const headY = useTransform(scrollYProgress, [0, 1], [0, H]);

  useEffect(() => {
    if (!sections.length) return;

    const calc = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;

      setMarks(
        sections
          .map(s => {
            const el = document.getElementById(s.id);
            if (!el) return null;
            const top = el.getBoundingClientRect().top + window.scrollY;
            return { id: s.id, p: Math.min(Math.max(top / total, 0), 1) };
          })
          .filter(Boolean)
      );
    };

    // Delay until after the hero scroll-driven animation settles
    const t = setTimeout(calc, 500);
    const onResize = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(calc);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId.current);
    };
  }, [sections]);

  if (shouldReduce) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed hidden xl:block"
      style={{
        left: 4,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 12,
        height: H,
        zIndex: 40,
        pointerEvents: 'none',
      }}
    >
      <svg
        width={12}
        height={H}
        viewBox={`0 0 12 ${H}`}
        fill="none"
        overflow="visible"
      >
        {/* Track spine */}
        <line
          x1={CX} y1={0}
          x2={CX} y2={H}
          stroke="rgba(255,37,64,0.14)"
          strokeWidth={1}
        />

        {/* Progress fill — draws itself via pathLength */}
        <m.path
          d={`M ${CX} 0 L ${CX} ${H}`}
          stroke="var(--color-accent)"
          strokeWidth={1.5}
          strokeLinecap="butt"
          style={{ pathLength: scrollYProgress }}
        />

        {/* Section markers — hollow diamonds that "punch" through the track */}
        {marks.map(({ id, p }) => {
          const y = p * H;
          // 4-point diamond: top, right, bottom, left relative to (CX, y)
          const pts = `${CX},${y - 4} ${CX + 4},${y} ${CX},${y + 4} ${CX - 4},${y}`;
          return (
            <g key={id}>
              <polygon points={pts} fill="var(--color-bg)" />
              <polygon points={pts} fill="none" stroke="rgba(255,37,64,0.38)" strokeWidth={1} />
            </g>
          );
        })}

        {/* Scrollhead — filled diamond traveling down the path */}
        <m.g style={{ y: headY }}>
          {/* 5px diamond centered at (CX, 0) within the group */}
          <polygon
            points={`${CX},${-5} ${CX + 5},0 ${CX},5 ${CX - 5},0`}
            fill="var(--color-accent)"
          />
        </m.g>
      </svg>
    </div>
  );
}
