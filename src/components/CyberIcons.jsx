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

// ══════════════════════════════════════════════════════════════════
// SECTION ICONS — thin-line 24×24 SVGs, 1.2px stroke, geometric
// Used in WhatIDo, HowIWork, SystemsLab sections.
// All inherit color from parent via `color` prop (default currentColor).
// ══════════════════════════════════════════════════════════════════

const svgBase = (size, viewBox, children) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" aria-hidden="true"
    style={{ display: 'block', flexShrink: 0 }}>
    {children}
  </svg>
);

/** Gamepad / controller — WhatIDo: Game UX/UI */
export function IconGamepad({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Body */}
      <path d="M6 9 C4 9 2 11 2 13.5 C2 16 3.5 18 5.5 18 C6.5 18 7.5 17.5 8.5 16.5 L9.5 15.5 H14.5 L15.5 16.5 C16.5 17.5 17.5 18 18.5 18 C20.5 18 22 16 22 13.5 C22 11 20 9 18 9 Z" />
      {/* D-pad */}
      <path d="M7 12 H9 M8 11 V13" />
      {/* Buttons */}
      <circle cx="16" cy="11.5" r="0.8" fill={color} />
      <circle cx="17.5" cy="12.8" r="0.8" fill={color} />
      {/* Triggers */}
      <path d="M6 9 L6.5 7 C7 5.5 8.5 5 10 5 H14 C15.5 5 17 5.5 17.5 7 L18 9" />
    </g>
  );
}

/** Stacked layers — WhatIDo: UX Systems */
export function IconLayers({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 17 L12 22 L22 17" />
      <path d="M2 12 L12 17 L22 12" />
      <path d="M2 7 L12 2 L22 7 L12 12 Z" />
    </g>
  );
}

/** IA grid — WhatIDo: Digital Product */
export function IconGrid({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M14 17.5 H21 M17.5 14 V21" strokeLinecap="round" />
    </g>
  );
}

/** Cycle arrow — HowIWork: Understand the loop */
export function IconLoop({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12 C4 7.6 7.6 4 12 4 C15 4 17.6 5.6 19 8" />
      <path d="M20 12 C20 16.4 16.4 20 12 20 C9 20 6.4 18.4 5 16" />
      <polyline points="19,5 19,8 16,8" />
      <polyline points="5,19 5,16 8,16" />
    </g>
  );
}

/** Magnifier — HowIWork: Find where hesitation starts */
export function IconSearch({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="15.5" y1="15.5" x2="21" y2="21" />
      {/* Signal lines inside glass */}
      <path d="M8 10.5 H13 M10.5 8 V13" opacity="0.5" />
    </g>
  );
}

/** Signal arrow — HowIWork: Design the signal */
export function IconSignal({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Horizontal arrow */}
      <line x1="3" y1="12" x2="18" y2="12" />
      <polyline points="13,7 18,12 13,17" />
      {/* Signal waves */}
      <path d="M20 9 C21.5 10.2 21.5 13.8 20 15" />
      <path d="M22 7 C24.5 9 24.5 15 22 17" opacity="0.5" />
    </g>
  );
}

/** Checkmark target — HowIWork: Test the decision */
export function IconTest({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" opacity="0.4" />
      <polyline points="9,12 11,14 15,10" />
    </g>
  );
}

/** Document with terminal lines — HowIWork: Document the system */
export function IconDoc({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3 H5 C4.4 3 4 3.4 4 4 V20 C4 20.6 4.4 21 5 21 H19 C19.6 21 20 20.6 20 20 V9 Z" />
      <polyline points="14,3 14,9 20,9" />
      {/* Code lines */}
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="16" x2="13" y2="16" />
      <path d="M8 10 L9.5 11 L8 12" />
    </g>
  );
}

/** Screen/HUD — SystemsLab: HUD Reviews */
export function IconHUD({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="14" rx="1" />
      {/* HUD crosshair in screen */}
      <path d="M8 8 H6 V10 M16 8 H18 V10 M8 14 H6 V12 M16 14 H18 V12" />
      <circle cx="12" cy="11" r="1.5" />
      {/* Stand */}
      <line x1="12" y1="18" x2="12" y2="21" />
      <line x1="9" y1="21" x2="15" y2="21" />
    </g>
  );
}

/** Network nodes — SystemsLab: UX Systems */
export function IconNetwork({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round">
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="17" r="2" />
      <circle cx="19" cy="17" r="2" />
      <line x1="12" y1="7" x2="5" y2="15" />
      <line x1="12" y1="7" x2="19" y2="15" />
      <line x1="7" y1="17" x2="17" y2="17" />
    </g>
  );
}

/** Eye with scan — SystemsLab: Accessibility */
export function IconEye({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12 C4 6 8.5 3 12 3 C15.5 3 20 6 23 12 C20 18 15.5 21 12 21 C8.5 21 4 18 1 12 Z" />
      <circle cx="12" cy="12" r="3" />
      {/* Scan line */}
      <line x1="6" y1="12" x2="8" y2="12" opacity="0.4" />
      <line x1="16" y1="12" x2="18" y2="12" opacity="0.4" />
    </g>
  );
}

/** Door/key — SystemsLab: Player Onboarding */
export function IconOnboard({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15,3 21,3 21,21 15,21" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <polyline points="15,8 21,12 15,16" />
      <line x1="3" y1="3" x2="3" y2="21" />
      <line x1="3" y1="3" x2="9" y2="3" />
      <line x1="3" y1="21" x2="9" y2="21" />
    </g>
  );
}

/** Calendar cycle — SystemsLab: LiveOps UX */
export function IconLiveOps({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="17" rx="1" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
      {/* Refresh arrow inside */}
      <path d="M9 14 C9 12.3 10.3 11 12 11 C13.2 11 14.2 11.7 14.7 12.7" />
      <polyline points="15,11 14.7,12.7 13,12.5" />
    </g>
  );
}

/** Pen tool — SystemsLab: Figma Workflows */
export function IconFigma({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8 C5 5.8 6.8 4 9 4 H12 V12 H9 C6.8 12 5 10.2 5 8 Z" />
      <path d="M12 4 H15 C17.2 4 19 5.8 19 8 C19 10.2 17.2 12 15 12 H12 Z" />
      <path d="M5 16 C5 13.8 6.8 12 9 12 H12 V16 C12 18.2 10.2 20 8 20 C5.8 20 4 18.2 5 16 Z" />
      <circle cx="15.5" cy="16" r="3.5" />
    </g>
  );
}

/** Game engine U shape — SystemsLab: UEFN Workflows */
export function IconUnreal({ size = 20, color = 'currentColor' }) {
  return svgBase(size, '0 0 24 24',
    <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4 V14 C5 17.3 8.1 20 12 20 C15.9 20 19 17.3 19 14 V4" />
      <line x1="5" y1="9" x2="9" y2="9" />
      <line x1="15" y1="9" x2="19" y2="9" />
      <path d="M9 4 V10 M15 4 V10" opacity="0.5" />
    </g>
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
