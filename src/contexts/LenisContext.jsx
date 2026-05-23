/**
 * LenisContext — global smooth scroll via Lenis.
 *
 * Provides the Lenis instance to any component that needs to call
 * lenis.scrollTo() programmatically (e.g. route-change scroll-to-top).
 *
 * SSR-safe: Lenis is instantiated only inside useEffect (client-only).
 * The RAF loop is paused automatically when the document is hidden.
 */

import { createContext, useContext, useEffect, useRef } from 'react';

const LenisCtx = createContext(null);

export function LenisProvider({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId;

    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        // Exponential-out easing: silk feel without overdamping
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        duration:        1.15,
        smoothWheel:     true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.8,
        infinite:        false,
      });

      ref.current = lenis;

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (ref.current) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, []);

  return <LenisCtx.Provider value={ref}>{children}</LenisCtx.Provider>;
}

/** Returns the Lenis instance ref — ref.current may be null on first render. */
export function useLenis() {
  return useContext(LenisCtx);
}
