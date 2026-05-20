import { useRef, useCallback } from 'react';

/**
 * SpotlightCard — wrapper que añade un border iluminado que sigue el cursor.
 * Usa CSS custom properties (--sx, --sy) para mover el gradiente sin
 * re-renders de React. El estilo .spotlight-card::before está en index.css.
 *
 * @param {string}   className  clases Tailwind adicionales
 * @param {object}   style      estilos inline adicionales
 * @param {string}   color      color del spotlight (default accent rojo)
 * @param {number}   radius     radio del spotlight en px (default 280)
 * @param {ReactNode} children
 */
export default function SpotlightCard({
  children,
  className = '',
  style = {},
  color = 'rgba(255,37,64,0.22)',
  radius = 280,
  ...props
}) {
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--sx', `${x}px`);
    ref.current.style.setProperty('--sy', `${y}px`);
    ref.current.style.setProperty('--spotlight-opacity', '1');
  }, []);

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.setProperty('--spotlight-opacity', '0');
  }, []);

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`}
      style={{ position: 'relative', ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}
