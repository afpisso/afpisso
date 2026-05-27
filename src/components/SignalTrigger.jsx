/**
 * SignalTrigger — the [!] hunt marker.
 *
 * Game language: the exclamation mark is universally understood as "there's
 * something here" (Metal Gear, RPGs, quest markers). It's visually distinct
 * from the site's decorative elements (logo marks, ◈ glyphs, rules).
 *
 * Prominence levels:
 *   'high'   — pulsing, 50% opacity at rest. Tutorial signal (sig-hero).
 *              This one is meant to be found first. Teaches the mechanic.
 *   'medium' — static, 22% opacity at rest. Requires looking in the right area.
 *   'low'    — static, 14% opacity at rest. Subtler, rewards careful exploration.
 *
 * All levels hover to full opacity with crosshair cursor.
 * Disappears entirely once the signal is acquired.
 * data-hunt-signal attribute is used by the proximity tracker in HuntHUD.
 */

import { m } from 'framer-motion';
import { useHunt } from '../contexts/HuntContext';

const EASE = [0.16, 1, 0.3, 1];

export default function SignalTrigger({ id, prominence = 'medium', style = {} }) {
  const { acquireSignal, isFound } = useHunt();

  if (isFound(id)) return null; // disappears after acquisition

  const restOpacity = prominence === 'high' ? 0.5 : prominence === 'medium' ? 0.22 : 0.14;
  const fontSize    = prominence === 'high' ? '14px' : '10px';
  const padding     = prominence === 'high' ? 10 : 8;

  const pulseAnim = prominence === 'high'
    ? { opacity: [restOpacity, 0.9, restOpacity] }
    : { opacity: restOpacity };
  const pulseTransition = prominence === 'high'
    ? { repeat: Infinity, duration: 2.8, ease: 'easeInOut', times: [0, 0.5, 1] }
    : {};

  return (
    <m.button
      data-hunt-signal={id}
      onClick={() => acquireSignal(id)}
      aria-hidden="true"
      tabIndex={-1}
      title=""
      initial={{ opacity: restOpacity }}
      animate={pulseAnim}
      transition={pulseTransition}
      whileHover={{ opacity: 1, scale: 1.08 }}
      style={{
        background:  'none',
        border:      'none',
        padding,
        cursor:      'crosshair',
        fontFamily:  '"JetBrains Mono", monospace',
        fontSize,
        fontWeight:  700,
        letterSpacing: '0.02em',
        userSelect:  'none',
        lineHeight:  1,
        display:     'inline-flex',
        alignItems:  'center',
        gap:         0,
        ...style,
      }}
    >
      {/* Brackets dimmer, ! at full accent — instantly readable as "game UI" */}
      <span style={{ color: 'rgba(255,255,255,0.35)' }}>[</span>
      <span style={{ color: 'var(--color-accent)', padding: prominence === 'high' ? '0 3px' : '0 2px' }}>!</span>
      <span style={{ color: 'rgba(255,255,255,0.35)' }}>]</span>
    </m.button>
  );
}
