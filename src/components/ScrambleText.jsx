import { useState } from 'react';
import { useScramble } from '../hooks/useScramble';
import { useReducedMotion } from 'framer-motion';

/**
 * ScrambleText — wraps a string and plays the scramble reveal
 * animation on mouse enter. Respects prefers-reduced-motion.
 *
 * @param {string}  children   The text to display and scramble
 * @param {number}  duration   Animation duration in ms (default 380)
 * @param {string}  as         HTML tag to render (default 'span')
 * @param {string}  className
 * @param {object}  style
 */
export default function ScrambleText({ children, duration = 380, as: Tag = 'span', className, style }) {
  const [trigger, setTrigger] = useState(0);
  const shouldReduce = useReducedMotion();
  const text = String(children ?? '');

  const displayed = useScramble(text, {
    duration,
    trigger,
    enabled: !shouldReduce,
  });

  return (
    <Tag
      className={className}
      style={style}
      onMouseEnter={() => setTrigger(t => t + 1)}
      aria-label={text}
    >
      {displayed}
    </Tag>
  );
}
