import { useState, useEffect } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_*<>+#';

/**
 * useScramble — animates a string via random character substitution,
 * revealing the target text left-to-right with staggered timing.
 *
 * Ported from the design system (claude.ai/design handoff).
 *
 * @param {string} target  The final string to display
 * @param {object} opts
 * @param {number} opts.duration  Total animation duration in ms (default 700)
 * @param {any}    opts.trigger   Change this value to re-trigger the scramble
 * @param {number} opts.delay     Delay before scramble starts in ms (default 0)
 * @param {boolean} opts.enabled  Set false to skip animation entirely
 * @returns {string} The current animated string
 */
export function useScramble(target, { duration = 700, trigger = 0, delay = 0, enabled = true } = {}) {
  const [out, setOut] = useState(target);

  useEffect(() => {
    if (!enabled) {
      setOut(target);
      return;
    }

    const N = target.length;
    const start = performance.now() + delay;
    // Each char settles at a slightly different time for a sweep feel
    const ends = Array.from({ length: N }, (_, i) =>
      start + (i / Math.max(N, 1)) * duration * 0.7 + Math.random() * duration * 0.3
    );

    let raf;
    const tick = () => {
      const now = performance.now();
      let s = '';
      for (let i = 0; i < N; i++) {
        if (now >= ends[i]) {
          s += target[i];
        } else if (now < start) {
          s += ' ';
        } else {
          s += target[i] === ' '
            ? ' '
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      setOut(s);
      if (now < start + duration + 50) {
        raf = requestAnimationFrame(tick);
      } else {
        setOut(target);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, trigger, enabled]);

  return out;
}
