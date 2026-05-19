/**
 * CyberIcons — sistema de íconos estilo cyberpunk para ByAndresFe
 * Todos son SVG inline, aria-hidden por defecto.
 */

/** >> doble chevron angular */
export function CyberChevron({ size = 10, color = 'currentColor', className = '' }) {
  return (
    <svg width={size * 1.5} height={size} viewBox="0 0 15 10" fill="none" aria-hidden="true" className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M1 1l4 4-4 4M8 1l4 4-4 4" stroke={color} strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

/** Diamante de estado — relleno o solo borde */
export function StatusDiamond({ size = 7, color = 'currentColor', filled = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" fill="none" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <path d="M4 0.5L7.5 4L4 7.5L0.5 4Z" fill={filled ? color : 'none'} stroke={color} strokeWidth="0.9" />
    </svg>
  );
}

/** Cruz de mira / reticula */
export function ScanReticle({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <rect x="0.5" y="0.5" width="5" height="5" stroke={color} strokeWidth="0.8" />
      <rect x="8.5" y="8.5" width="5" height="5" stroke={color} strokeWidth="0.8" />
      <path d="M7 0v14M0 7h14" stroke={color} strokeWidth="0.5" opacity="0.35" />
      <circle cx="7" cy="7" r="1.2" fill={color} opacity="0.6" />
    </svg>
  );
}

/** Corchetes angulares de targetting [ ◆ ] */
export function TargetBrackets({ size = 16, color = 'currentColor' }) {
  const arm = 5;
  return (
    <svg width={size * 1.8} height={size} viewBox="0 0 29 16" fill="none" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      {/* Left bracket */}
      <path d={`M${arm} 0 H0 V${arm}`} stroke={color} strokeWidth="1.2" strokeLinecap="square" />
      <path d={`M${arm} 16 H0 V${16 - arm}`} stroke={color} strokeWidth="1.2" strokeLinecap="square" />
      {/* Right bracket */}
      <path d={`M${29 - arm} 0 H29 V${arm}`} stroke={color} strokeWidth="1.2" strokeLinecap="square" />
      <path d={`M${29 - arm} 16 H29 V${16 - arm}`} stroke={color} strokeWidth="1.2" strokeLinecap="square" />
      {/* Center diamond */}
      <path d="M14.5 5L17 8L14.5 11L12 8Z" fill={color} opacity="0.7" />
    </svg>
  );
}

/** Corchetes de esquina para tarjetas — 4 corners como el menú */
export function CardCorners({ color = 'rgba(255,255,255,0.15)', accentColor = '#ff2540', accent = false, arm = 12, thickness = 1.5, inset = 0 }) {
  const s = `${thickness}px solid ${accent ? accentColor : color}`;
  const corners = [
    { top: inset, left: inset, borderTop: s, borderLeft: `${thickness}px solid ${accentColor}` },
    { top: inset, right: inset, borderTop: s, borderRight: s },
    { bottom: inset, left: inset, borderBottom: s, borderLeft: s },
    { bottom: inset, right: inset, borderBottom: s, borderRight: s },
  ];
  return (
    <>
      {corners.map((style, i) => (
        <span key={i} aria-hidden="true" style={{ position: 'absolute', width: arm, height: arm, pointerEvents: 'none', ...style }} />
      ))}
    </>
  );
}

/** Número de paso con brackets angulares */
export function StepNumber({ num, color = '#ff2540', dimColor = 'rgba(255,37,64,0.3)' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
      <span style={{ color: dimColor, fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: 0 }}>[</span>
      <span style={{ color, fontFamily: '"JetBrains Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', minWidth: '1.8ch', textAlign: 'center' }}>{num}</span>
      <span style={{ color: dimColor, fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: 0 }}>]</span>
    </span>
  );
}

/** Indicador de señal (barras) — igual que el menú pero exportable */
export function SignalBars({ count = 3, height = 12, color = 'currentColor' }) {
  const bars = Array.from({ length: count }, (_, i) => i);
  return (
    <span aria-hidden="true" style={{ display: 'inline-flex', gap: 2, alignItems: 'flex-end', height }}>
      {bars.map(i => (
        <span key={i} style={{
          width: 2,
          height: `${40 + i * 20}%`,
          background: color,
          opacity: 0.7 + i * 0.1,
        }} />
      ))}
    </span>
  );
}

/** Línea separadora con diamante central */
export function CyberDivider({ color = 'var(--color-rule)', accentColor = 'var(--color-accent)' }) {
  return (
    <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
      <div style={{ flex: 1, height: 1, background: color }} />
      <StatusDiamond size={6} color={accentColor} filled />
      <div style={{ flex: 1, height: 1, background: color }} />
    </div>
  );
}
