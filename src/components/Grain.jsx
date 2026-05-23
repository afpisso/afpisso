/**
 * Grain — fixed film-grain overlay for the entire site.
 *
 * Implementation: CSS pseudo-element with SVG feTurbulence noise, animated
 * by shifting the background-position every ~800ms via a steps() keyframe.
 * GPU-composited (transform only), no canvas, no JS loop — essentially free.
 *
 * Skipped on prefers-reduced-motion (in MotionConfig context, MotionConfig
 * reducedMotion="user" gates the parent; we check ourselves here too).
 */

import { useReducedMotion } from 'framer-motion';

export default function Grain() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;

  return <div className="grain-overlay" aria-hidden="true" />;
}
