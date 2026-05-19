/**
 * PhotoGridOverlay
 * Canvas dot-grid that appears on photo hover.
 * Dots spring away from the cursor and snap back.
 *
 * Props:
 *   active      — boolean, controls fade in/out
 *   mousePosRef — ref with { x, y } in container-local px coords
 */
import { useEffect, useRef } from 'react';

const SPACING    = 22;   // px between dots
const REPULSE_R  = 72;   // repulsion radius in px
const REPULSE_F  = 90;   // repulsion force magnitude
const SPRING_K   = 0.14; // spring toward home
const DAMPING    = 0.70; // velocity damping
const FADE_IN    = 0.07; // alpha lerp speed (in)
const FADE_OUT   = 0.05; // alpha lerp speed (out)
const RED_CHANCE = 0.10; // fraction of red accent dots

export default function PhotoGridOverlay({ active, mousePosRef }) {
  const canvasRef    = useRef(null);
  const activeRef    = useRef(active);
  const startLoopRef = useRef(null);

  // Sync active → ref so the RAF closure sees it without re-registering
  useEffect(() => {
    activeRef.current = active;
    if (active && startLoopRef.current) startLoopRef.current();
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let dots    = [];
    let w = 0, h = 0;
    let animId  = null;
    let running = false;
    let globalA = 0; // current fade alpha (0 → 1)

    // ── Build dot grid sized to canvas ──────────────────────────────────
    const buildDots = (cw, ch) => {
      const cols  = Math.floor(cw / SPACING) + 1;
      const rows  = Math.floor(ch / SPACING) + 1;
      const offX  = (cw - (cols - 1) * SPACING) / 2;
      const offY  = (ch - (rows - 1) * SPACING) / 2;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = offX + c * SPACING;
          const oy = offY + r * SPACING;
          dots.push({
            ox, oy, x: ox, y: oy, vx: 0, vy: 0,
            red:  Math.random() < RED_CHANCE,
            size: Math.random() < 0.12 ? 1.6 : 1.0,
          });
        }
      }
    };

    // ── Resize canvas + rebuild dots ─────────────────────────────────────
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots(w, h);
    };
    resize();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // ── Main render loop ──────────────────────────────────────────────────
    const render = () => {
      const isActive = activeRef.current;
      const target   = isActive ? 1 : 0;
      globalA += (target - globalA) * (isActive ? FADE_IN : FADE_OUT);

      ctx.clearRect(0, 0, w, h);

      if (globalA > 0.005) {
        const mp = mousePosRef?.current ?? { x: -1, y: -1 };

        for (const d of dots) {
          // Mouse repulsion toward original position
          const dx   = d.ox - mp.x;
          const dy   = d.oy - mp.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let tx = d.ox, ty = d.oy;

          if (dist < REPULSE_R && dist > 0.5 && mp.x >= 0) {
            const force = (1 - dist / REPULSE_R) ** 2;
            tx += (dx / dist) * force * REPULSE_F;
            ty += (dy / dist) * force * REPULSE_F;
          }

          // Spring physics
          d.vx = (d.vx + (tx - d.x) * SPRING_K) * DAMPING;
          d.vy = (d.vy + (ty - d.y) * SPRING_K) * DAMPING;
          d.x += d.vx;
          d.y += d.vy;

          // Draw
          const a = globalA * (d.red ? 0.75 : 0.22);
          ctx.fillStyle = d.red
            ? `rgba(255,37,64,${a})`
            : `rgba(245,245,243,${a})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Stop when fully faded out and inactive
      if (globalA > 0.004 || isActive) {
        animId = requestAnimationFrame(render);
      } else {
        running = false;
        animId  = null;
      }
    };

    const startLoop = () => {
      if (!running) {
        running = true;
        animId  = requestAnimationFrame(render);
      }
    };
    startLoopRef.current = startLoop;

    // Kick off immediately if already active on mount
    if (activeRef.current) startLoop();

    return () => {
      ro.disconnect();
      if (animId) cancelAnimationFrame(animId);
      startLoopRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    />
  );
}
