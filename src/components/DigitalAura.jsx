import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const CHARS = ['0', '1', '/', '\\', '|', '_', '-', '+', ':', '#', '@', '!', '<', '>'];
const MAX = 70;

export default function DigitalAura() {
  const canvasRef = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const particles = [];
    const lastPos = { x: -1, y: -1 };
    let animId = null;
    let running = false;

    const spawn = (x, y, speed) => {
      const count = Math.min(4, Math.ceil(speed / 4));
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX) particles.shift();
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 10 + 2;
        particles.push({
          x: x + Math.cos(angle) * radius * 0.5,
          y: y + Math.sin(angle) * radius * 0.5,
          vx: (Math.random() - 0.5) * 0.9,
          vy: Math.random() * 0.7 + 0.15,
          char: CHARS[Math.floor(Math.random() * CHARS.length)],
          life: 1,
          decay: Math.random() * 0.02 + 0.012,
          opacity: Math.random() * 0.55 + 0.35,
          // ~30% chance of red, rest are dim white
          red: Math.random() > 0.7,
          size: Math.random() > 0.55 ? 9 : 7,
        });
      }
    };

    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;
      const dx = x - lastPos.x;
      const dy = y - lastPos.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 1.5) {
        spawn(x, y, speed);
        lastPos.x = x;
        lastPos.y = y;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x  += p.vx;
        p.y  += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }

        ctx.globalAlpha = Math.max(0, p.life) * p.opacity;
        ctx.fillStyle   = p.red ? '#ff2540' : 'rgba(245,245,243,0.9)';
        ctx.font        = `${p.size}px "JetBrains Mono", monospace`;
        ctx.fillText(p.char, p.x, p.y);
      }
      ctx.globalAlpha = 1;

      // Pause the loop when no particles are alive — resume on next spawn
      if (particles.length > 0) {
        animId = requestAnimationFrame(render);
      } else {
        running = false;
      }
    };

    const startLoop = () => {
      if (!running) {
        running = true;
        animId = requestAnimationFrame(render);
      }
    };

    const onMoveWithStart = (e) => {
      onMove(e);
      if (particles.length > 0) startLoop();
    };

    window.addEventListener('mousemove', onMoveWithStart, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMoveWithStart);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [shouldReduce]);

  if (shouldReduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99998,
        mixBlendMode: 'screen',
      }}
    />
  );
}
