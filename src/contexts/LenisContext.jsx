/**
 * LenisContext — global smooth scroll via Lenis v1.
 *
 * Uses lerp-based scroll (not fixed-duration) so short scrolls feel snappy
 * and long scrolls feel smooth — proportional to distance, not time-fixed.
 *
 * Static import (SSR-safe: Lenis only instantiates inside useEffect).
 * No dynamic import → no race condition between cleanup and resolution.
 *
 * Scrollbar fix: when the user drags the native scrollbar, Lenis's RAF loop
 * would fight the browser's own scroll handling and snap back on release.
 * We detect mousedown near the right edge (scrollbar zone), pause Lenis,
 * let the browser own the drag, then resync + resume on mouseup.
 */

import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

const LenisCtx = createContext(null);

// Width of native scrollbar hit zone (px from right edge of viewport)
const SCROLLBAR_ZONE = 20;

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

    // ── RAF loop ────────────────────────────────────────────────────────────
    let rafId = null;

    function startRaf() {
      function tick(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);
    }

    function stopRaf() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    startRaf();

    // ── Native scrollbar drag fix ────────────────────────────────────────────
    // When the user clicks inside the scrollbar zone, pause Lenis so the
    // browser can move the page freely. On mouseup, sync Lenis to wherever
    // the browser landed and resume.
    let draggingScrollbar = false;

    function onMouseDown(e) {
      if (e.clientX >= document.documentElement.clientWidth - SCROLLBAR_ZONE) {
        draggingScrollbar = true;
        lenis.stop();
        stopRaf();
      }
    }

    function onMouseUp() {
      if (!draggingScrollbar) return;
      draggingScrollbar = false;
      // Snap Lenis internal target to wherever the browser ended up,
      // then restart — no lerp drift, no position fight.
      lenis.scrollTo(window.scrollY, { immediate: true });
      lenis.start();
      startRaf();
    }

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup',   onMouseUp);

    return () => {
      stopRaf();
      lenis.destroy();
      lenisRef.current = null;
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup',   onMouseUp);
    };
  }, []);

  return <LenisCtx.Provider value={lenisRef}>{children}</LenisCtx.Provider>;
}

/** Returns the Lenis instance ref. ref.current is null during SSR and on first render. */
export function useLenis() {
  return useContext(LenisCtx);
}
