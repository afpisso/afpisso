import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useScramble } from '../hooks/useScramble';

/**
 * GlitchStrokeText (v2) — two simultaneous effects on hover:
 *
 *  1. SCRAMBLE / DECODE — characters randomize then resolve left→right
 *     via useScramble (RAF-based, same chars as the nav/footer scramble)
 *
 *  2. CHROMATIC ABERRATION / RGB SPLIT — reuses .logo-name.glitching CSS
 *     from index.css: red ghost + cyan ghost with clip-path slice animation,
 *     fired for the duration of the scramble then removed
 *
 * Props:
 *   silent   Pass true when this component is nested inside an element that
 *            already provides an accessible name (e.g. <h2 aria-label="...">).
 *            Suppresses the per-span aria-label and adds aria-hidden instead,
 *            preventing screen readers from announcing each word twice.
 */

const DURATION = 420; // ms — scramble + glitch burst length

export default function GlitchStrokeText({ children, stroke: _stroke, style, className = '', silent = false }) {
  const [trigger, setTrigger] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const shouldReduce = useReducedMotion();

  const text = String(children ?? '');

  const displayed = useScramble(text, {
    duration: DURATION,
    trigger,
    enabled: !shouldReduce,
  });

  // useEffect-based cleanup prevents setState-after-unmount if the
  // component unmounts while the glitch animation is still running.
  useEffect(() => {
    if (!glitching) return;
    const id = setTimeout(() => setGlitching(false), DURATION + 90);
    return () => clearTimeout(id);
  }, [glitching]);

  const handleEnter = () => {
    if (shouldReduce) return;
    setTrigger((t) => t + 1);
    setGlitching(true);
  };

  return (
    <span
      className={`logo-name${glitching ? ' glitching-title' : ''}${className ? ` ${className}` : ''}`}
      data-text={text}
      {...(silent ? { 'aria-hidden': true } : { 'aria-label': text })}
      style={style}
      onMouseEnter={handleEnter}
    >
      {displayed}
    </span>
  );
}
