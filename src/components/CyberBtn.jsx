/**
 * CyberBtn — unified CTA button for the AFPISSO site.
 *
 * Variants:
 *   'solid'        — red fill, sweeps to darker red on hover
 *   'ghost'        — rule-border outline, subtle fill + border brightens on hover
 *   'accent-ghost' — accent-colored border, sweeps to solid accent on hover
 *
 * Shared behaviour (all variants):
 *   - 8px clip-path chamfer
 *   - SweepFill horizontal sweep on enter / reverse on leave
 *   - Arrow → nudges 3px right on hover (set showArrow={false} to omit)
 *   - whileTap scale 0.97
 *   - Optional magnetic cursor attraction (magnetic prop)
 *   - data-cursor="cta" for the custom cursor system
 *
 * Renders as: m.a (href), MotionLink (to), or m.button (default)
 *
 * Any Framer Motion props (initial, whileInView, viewport, transition, etc.)
 * passed as props are forwarded to the underlying motion element via ...rest.
 */

import { useState, useRef, useCallback } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import SweepFill from './SweepFill';

// Defined at module scope so m(Link) is not recreated on every render
const MotionLink = m(Link);

const CHAMFER = 8;
const CLIP = `polygon(0 0, calc(100% - ${CHAMFER}px) 0, 100% ${CHAMFER}px, 100% 100%, ${CHAMFER}px 100%, 0 calc(100% - ${CHAMFER}px))`;
const MONO = '"JetBrains Mono", monospace';

const SIZE_PADDING = {
  sm: '8px 14px',
  md: '13px 24px',
  lg: '16px 32px',
};

const VARIANTS = {
  solid: {
    bg:              'var(--color-accent)',
    color:           '#0a0a0a',
    border:          'none',
    borderHover:     'none',
    sweepColor:      '#cc1f34',
    sweepTextColor:  '#0a0a0a',
  },
  ghost: {
    bg:              'transparent',
    color:           'var(--color-fg-dim)',
    border:          '1px solid var(--color-rule)',
    borderHover:     '1px solid rgba(255,255,255,0.28)',
    sweepColor:      'rgba(255,255,255,0.06)',
    sweepTextColor:  'var(--color-fg)',
  },
  'accent-ghost': {
    bg:              'transparent',
    color:           'var(--color-accent)',
    border:          '1px solid var(--color-accent)',
    borderHover:     '1px solid var(--color-accent)',
    sweepColor:      'var(--color-accent)',
    sweepTextColor:  '#0a0a0a',
  },
};

export default function CyberBtn({
  variant   = 'accent-ghost',
  size      = 'md',
  href,
  to,
  target,
  rel,
  onClick,
  children,
  showArrow = true,
  magnetic  = false,
  disabled  = false,
  className = '',
  style: extraStyle = {},
  'aria-label': ariaLabel,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  const v   = VARIANTS[variant] ?? VARIANTS.solid;

  // Spring values for magnetic effect — always created but only used when magnetic=true
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 200, damping: 18, mass: 0.5 });

  const handleMouseMove = useCallback((e) => {
    if (!magnetic || disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.28);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.28);
  }, [magnetic, disabled, mx, my]);

  const handleEnter = useCallback(() => setHover(true), []);

  const handleLeave = useCallback(() => {
    setHover(false);
    if (magnetic) { mx.set(0); my.set(0); }
  }, [magnetic, mx, my]);

  const padding = SIZE_PADDING[size] ?? SIZE_PADDING.md;

  const motionStyle = {
    position:        'relative',
    overflow:        'hidden',
    display:         'inline-flex',
    alignItems:      'center',
    fontFamily:      MONO,
    fontSize:        11,
    letterSpacing:   '0.12em',
    textTransform:   'uppercase',
    textDecoration:  'none',
    cursor:          disabled ? 'default' : 'pointer',
    clipPath:        CLIP,
    background:      v.bg,
    color:           v.color,
    border:          hover ? v.borderHover : v.border,
    transition:      'border-color 0.2s',
    ...(magnetic ? { x: sx, y: sy, willChange: 'transform' } : {}),
    ...extraStyle,
  };

  const inner = (
    <SweepFill active={hover} fillColor={v.sweepColor} activeTextColor={v.sweepTextColor}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding }}>
        {children}
        {showArrow && (
          <m.span
            aria-hidden="true"
            animate={{ x: hover ? 3 : 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block' }}
          >→</m.span>
        )}
      </span>
    </SweepFill>
  );

  const sharedProps = {
    ref,
    className,
    style:         motionStyle,
    onMouseEnter:  handleEnter,
    onMouseLeave:  handleLeave,
    onMouseMove:   handleMouseMove,
    onFocus:       handleEnter,
    onBlur:        handleLeave,
    whileTap:      disabled ? undefined : { scale: 0.97 },
    onClick,
    'aria-label':  ariaLabel,
    'data-cursor': 'cta',
    ...rest,
  };

  if (to) {
    return <MotionLink to={to} {...sharedProps}>{inner}</MotionLink>;
  }
  if (href) {
    return (
      <m.a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        {...sharedProps}
      >
        {inner}
      </m.a>
    );
  }
  return <m.button type="button" {...sharedProps}>{inner}</m.button>;
}
