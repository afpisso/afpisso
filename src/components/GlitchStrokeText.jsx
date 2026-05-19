import { useState } from 'react';

/**
 * GlitchStrokeText — tres capas sincronizadas:
 *
 * z0  Stroke text  → visible por defecto, el rojo lo cubre al hacer hover
 * z1  Rojo sweep   → scaleX(0→1) desde la izquierda, cubre el stroke
 * z2  Texto sólido → clip-path revela izquierda→derecha en sincronía con el rojo
 *
 * Al salir: todo revierte en orden inverso.
 */

const CHAMFER = 5;
const redClip = `polygon(0 0, calc(100% - ${CHAMFER}px) 0, 100% ${CHAMFER}px, 100% 100%, ${CHAMFER}px 100%, 0 calc(100% - ${CHAMFER}px))`;
const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
const DUR  = '0.3s';

export default function GlitchStrokeText({ children, stroke = '1.5px rgba(245,245,243,0.5)' }) {
  const [active, setActive] = useState(false);

  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {/* z0 — stroke (outline) base, el rojo lo tapará al barrer */}
      <span style={{
        display: 'inline-block',
        WebkitTextStroke: stroke,
        color: 'transparent',
      }}>
        {children}
      </span>

      {/* z1 — contenedor rojo que barre de izquierda a derecha */}
      <span aria-hidden="true" style={{
        position: 'absolute',
        top: '-0.06em', bottom: '-0.06em',
        left: '-0.04em', right: '-0.04em',
        background: 'var(--color-accent)',
        transform: active ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left center',
        transition: `transform ${DUR} ${EASE}`,
        clipPath: redClip,
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* z2 — texto sólido oscuro, se revela por clip-path en sincronia con el rojo */}
      <span aria-hidden="true" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        color: '#0a0a0a',
        zIndex: 2,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        /* clip va de "todo tapado por la derecha" a "todo visible" */
        clipPath: active
          ? 'inset(0 -6% 0 -6%)'
          : 'inset(0 106% 0 -6%)',
        transition: `clip-path ${DUR} ${EASE}`,
      }}>
        {children}
      </span>
    </span>
  );
}
