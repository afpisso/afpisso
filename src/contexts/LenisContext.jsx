/**
 * LenisContext — global smooth scroll via Lenis v1.
 *
 * Uses lerp-based scroll (not fixed-duration) so short scrolls feel snappy
 * and long scrolls feel smooth — proportional to distance, not time-fixed.
 *
 * Static import (SSR-safe: Lenis only instantiates inside useEffect).
 * No dynamic import → no race condition between cleanup and resolution.
 */

import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

const LenisCtx = createContext(null);

export function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      // lerp: linear interpolation per frame (0 = instant, 1 = never moves).
      // 0.1 = moves 10% of remaining distance each frame → snappy but smooth.
      // Unlike duration-based scroll, this scales with distance automatically.
      lerp:            0.1,
      wheelMultiplier: 1.2,   // how much distance each wheel tick covers
      touchMultiplier: 1.5,   // touch swipe responsiveness
      syncTouch:       false, // let mobile use native scroll (better perf)
      infinite:        false,
      smoothWheel:     true,
    });

    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisCtx.Provider value={lenisRef}>{children}</LenisCtx.Provider>;
}

/** Returns the Lenis instance ref. ref.current is null during SSR and on first render. */
export function useLenis() {
  return useContext(LenisCtx);
}
