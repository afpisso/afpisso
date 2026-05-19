/**
 * GeometryGrid — 3D particle cloud that morphs between shapes,
 * reacts to cursor (repulsion + spring-back), and transitions
 * smoothly when `shape` prop changes.
 *
 * Shapes: sphere | torus | helix | wave | cube
 *
 * Props:
 *   mouseRef      — React ref with { x, y } screen coords (from useMousePos)
 *   shape         — current shape key (changes with scroll section)
 *   intensity     — mouse repulsion strength 1–10 (default 7)
 *   offsetX/Y     — horizontal/vertical offset (fraction of viewport, –1..1)
 *   rotX/Y/Z      — base rotation radians
 *   spin          — continuous Y rotation (bool, default true)
 *   paused        — freeze animation (for prefers-reduced-motion)
 *   particleCount — default 1600
 */
import { useEffect, useRef } from 'react';

const PHI = Math.PI * (1 + Math.sqrt(5));

const GENS = {
  sphere: (i, n) => {
    const y   = 1 - (i / (n - 1)) * 2;
    const r   = Math.sqrt(Math.max(0, 1 - y * y));
    const th  = PHI * i;
    const jit = 0.94 + ((i * 9301 + 49297) % 233280) / 233280 * 0.10;
    return [r * Math.cos(th) * jit, y * jit, r * Math.sin(th) * jit];
  },
  torus: (i, n) => {
    const wraps = 11;
    const u = (i / n) * Math.PI * 2 * wraps;
    const v = (i * 0.0429) * Math.PI * 2;
    const R = 0.72, rr = 0.22;
    return [
      (R + rr * Math.cos(v)) * Math.cos(u),
      rr * Math.sin(v),
      (R + rr * Math.cos(v)) * Math.sin(u),
    ];
  },
  helix: (i, n) => {
    const t      = i / n;
    const turns  = 4.5;
    const radius = 0.55 + 0.1 * Math.sin(t * Math.PI);
    return [
      Math.cos(t * Math.PI * 2 * turns) * radius,
      (t * 2 - 1) * 0.95,
      Math.sin(t * Math.PI * 2 * turns) * radius,
    ];
  },
  wave: (i, n) => {
    const side = Math.ceil(Math.sqrt(n));
    const xi   = i % side;
    const zi   = Math.floor(i / side);
    const u    = (xi / (side - 1)) * 2 - 1;
    const v    = (zi / (side - 1)) * 2 - 1;
    const y    = 0.22 * Math.sin(u * Math.PI * 1.6) * Math.cos(v * Math.PI * 1.6);
    return [u * 1.15, y, v * 1.15];
  },
  cube: (i, n) => {
    const perFace = Math.ceil(n / 6);
    const face    = Math.floor(i / perFace);
    const idx     = i % perFace;
    const side    = Math.ceil(Math.sqrt(perFace));
    const a       = ((idx % side) / Math.max(side - 1, 1)) * 2 - 1;
    const b       = (Math.floor(idx / side) / Math.max(side - 1, 1)) * 2 - 1;
    const s       = 0.78;
    switch (face) {
      case 0:  return [ s, a * s, b * s];
      case 1:  return [-s, a * s, b * s];
      case 2:  return [a * s,  s, b * s];
      case 3:  return [a * s, -s, b * s];
      case 4:  return [a * s, b * s,  s];
      default: return [a * s, b * s, -s];
    }
  },

  // AFP logo — two paths from logo-mark.svg (viewBox 500×556, center 250,278)
  // positive y = down in canvas space, so no y-flip needed
  logo: (() => {
    const W = (px, py) => [(px - 250) / 310, (py - 278) / 310];

    // Path 1: left diagonal bar (filled, closed polygon)
    const P1 = [
      W(248.4,   0),
      W(0,       435.403),
      W(104.482, 435.403),
      W(303.34,  94.847),
      W(248.4,   0),        // close
    ];

    // Path 2: right side + crossbar + bottom (stroked, closed)
    const P2 = [
      W(444.173, 358.734),
      W(482.677, 425.403),
      W(403.074, 425.403),
      W(313.386, 425.389),
      W(310.499, 430.387),
      W(250.032, 535.059),
      W(199.372, 435.7),
      W(244.08,  358.297),
      W(360.085, 358.297),
      W(351.422, 343.296),
      W(302.089, 257.871),
      W(344.011, 185.273),
      W(444.173, 358.734),  // close
    ];

    // Build all segments and cumulative arc lengths
    const segs = [];
    for (const path of [P1, P2]) {
      for (let k = 0; k < path.length - 1; k++) {
        const a = path[k], b = path[k + 1];
        const dx = b[0] - a[0], dy = b[1] - a[1];
        segs.push({ a, b, len: Math.sqrt(dx * dx + dy * dy) });
      }
    }
    const total = segs.reduce((s, sg) => s + sg.len, 0);
    const cum   = [];
    let acc = 0;
    for (const sg of segs) { acc += sg.len; cum.push(acc); }

    return (i, n) => {
      const t  = (i / n) * total;
      let si   = cum.findIndex(c => c >= t);
      if (si < 0) si = segs.length - 1;
      const sg   = segs[si];
      const prev = si > 0 ? cum[si - 1] : 0;
      const u    = sg.len > 0 ? (t - prev) / sg.len : 0;
      const x    = sg.a[0] + (sg.b[0] - sg.a[0]) * u;
      const y    = sg.a[1] + (sg.b[1] - sg.a[1]) * u;
      // Slight z spread for 3D depth feel
      const z    = (((i * 6271 + 19) % 100) / 100 - 0.5) * 0.18;
      return [x, y, z];
    };
  })(),
};

export default function GeometryGrid({
  mouseRef,
  shape       = 'sphere',
  intensity   = 7,
  offsetX     = 0,
  offsetY     = 0,
  rotX        = 0.20,
  rotY        = 0,
  rotZ        = 0,
  spin        = true,
  paused      = false,
  particleCount = 1600,
}) {
  const canvasRef   = useRef(null);
  // Keep mutable refs for props so the RAF loop always sees the latest value
  // without re-registering the effect.
  const shapeRef    = useRef(shape);
  const offsetRef   = useRef({ x: offsetX, y: offsetY });
  const rotRef      = useRef({ x: rotX, y: rotY, z: rotZ, spin: spin ? 1 : 0 });
  const intensityRef = useRef(intensity);
  const pausedRef   = useRef(paused);

  useEffect(() => { shapeRef.current = shape; },             [shape]);
  useEffect(() => { offsetRef.current = { x: offsetX, y: offsetY }; }, [offsetX, offsetY]);
  useEffect(() => { rotRef.current = { x: rotX, y: rotY, z: rotZ, spin: spin ? 1 : 0 }; }, [rotX, rotY, rotZ, spin]);
  useEffect(() => { intensityRef.current = intensity; },     [intensity]);
  useEffect(() => { pausedRef.current = paused; },           [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Reduce particle count on mobile — visually equivalent, significantly cheaper
    const isMobile = window.innerWidth < 768;
    const N   = isMobile ? Math.min(particleCount, 600) : particleCount;
    const getSize = () => ({ w: window.innerWidth, h: window.innerHeight });
    let { w, h } = getSize();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      ({ w, h } = getSize());
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Pre-compute all shape targets
    const allTargets = {};
    Object.keys(GENS).forEach((name) => {
      const arr = new Array(N);
      for (let i = 0; i < N; i++) arr[i] = GENS[name](i, N);
      allTargets[name] = arr;
    });

    // Init particles at the current shape, scattered slightly for boot feel
    const initName = shapeRef.current in allTargets ? shapeRef.current : 'sphere';
    const initTgt  = allTargets[initName];
    const particles = new Array(N);
    for (let i = 0; i < N; i++) {
      const tgt = initTgt[i];
      particles[i] = {
        hx: tgt[0], hy: tgt[1], hz: tgt[2],
        x: (Math.random() - 0.5) * 0.4,
        y: (Math.random() - 0.5) * 0.4,
        z: (Math.random() - 0.5) * 0.4,
        vx: 0, vy: 0, vz: 0,
        baseY: tgt[1],
        noise: ((i * 12569) % 1000) / 1000,
      };
    }

    // Smoothed view state — lerps toward target each frame
    const view = {
      ox: offsetRef.current.x,
      oy: offsetRef.current.y,
      rx: rotRef.current.x,
      ry: rotRef.current.y,
      rz: rotRef.current.z,
    };

    let t        = 0;
    let raf;
    let frameN   = 0;
    // Preallocate draws buffer — reused every frame, no GC pressure
    const draws  = new Array(N);

    const draw = () => {
      if (pausedRef.current) {
        raf = requestAnimationFrame(draw);
        return;
      }
      t += 0.008;

      // Update home positions to current shape
      const name = shapeRef.current;
      const tgA  = allTargets[name] || allTargets.sphere;
      for (let i = 0; i < N; i++) {
        const a = tgA[i];
        // Lerp home → target (smooth shape transition)
        particles[i].hx += (a[0] - particles[i].hx) * 0.04;
        particles[i].hy += (a[1] - particles[i].hy) * 0.04;
        particles[i].hz += (a[2] - particles[i].hz) * 0.04;
        particles[i].baseY = particles[i].hy;
      }

      // Lerp view
      const off  = offsetRef.current;
      const rot  = rotRef.current;
      const k    = 0.06;
      view.ox += (off.x - view.ox) * k;
      view.oy += (off.y - view.oy) * k;
      view.rx += (rot.x - view.rx) * k;
      view.ry += (rot.y - view.ry) * k;
      view.rz += (rot.z - view.rz) * k;

      const scale   = Math.min(w, h) * 0.30;
      const cx      = w / 2 + view.ox * w * 0.5;
      const cy      = h / 2 + view.oy * h * 0.5;
      const camDist = 3.0;

      const angY = t * 0.20 * rot.spin + view.ry;
      const cosY = Math.cos(angY), sinY = Math.sin(angY);
      const cosX = Math.cos(view.rx), sinX = Math.sin(view.rx);
      const cosZ = Math.cos(view.rz), sinZ = Math.sin(view.rz);

      const inten        = intensityRef.current;
      const mx           = mouseRef?.current?.x ?? -10000;
      const my2          = mouseRef?.current?.y ?? -10000;
      const repulseR     = 130 + inten * 10;
      const repulseStr   = 0.005 * inten;

      ctx.clearRect(0, 0, w, h);
      frameN++;

      for (let i = 0; i < N; i++) {
        const p = particles[i];

        // Spring toward home + damping
        p.vx = (p.vx + (p.hx - p.x) * 0.055) * 0.86;
        p.vy = (p.vy + (p.hy - p.y) * 0.055) * 0.86;
        p.vz = (p.vz + (p.hz - p.z) * 0.055) * 0.86;
        // Organic breathing noise
        p.vx += Math.sin(t * 1.3 + p.noise * 9)  * 0.0005;
        p.vy += Math.cos(t * 1.1 + p.noise * 11) * 0.0005;
        p.x += p.vx; p.y += p.vy; p.z += p.vz;

        // Rotate Y → X → Z
        let rx  =  p.x * cosY + p.z * sinY;
        let rzm = -p.x * sinY + p.z * cosY;
        let ry  =  p.y * cosX - rzm * sinX;
        let rz  =  p.y * sinX + rzm * cosX;
        if (view.rz !== 0) {
          const rx2 = rx * cosZ - ry * sinZ;
          const ry2 = rx * sinZ + ry * cosZ;
          rx = rx2; ry = ry2;
        }

        // Perspective
        const persp = camDist / (camDist + rz);
        const sx    = cx + rx * scale * persp;
        const sy    = cy + ry * scale * persp;
        const psize = Math.max(0.4, (0.5 + persp * 0.85) * 1.2);

        // Mouse repulsion in screen space
        const dx = sx - mx;
        const dy = sy - my2;
        const dd = Math.sqrt(dx * dx + dy * dy);
        if (dd < repulseR && dd > 0.5) {
          const force = (1 - dd / repulseR) ** 2 * repulseStr;
          p.vx += (dx / dd) * cosY * force;
          p.vz += (dx / dd) * sinY * force;
          p.vy += (dy / dd) * force;
        }

        // Color: bottom=white (#f5f5f3) → top=red (#ff2540)
        const yt  = Math.max(0, Math.min(1, (p.baseY + 1) * 0.5));
        const k2  = yt * yt * (3 - 2 * yt); // smoothstep
        const r   = Math.round(245 + k2 * 10);
        const g   = Math.round(245 - k2 * 208);
        const b   = Math.round(243 - k2 * 179);
        const alpha = (0.28 + persp * 0.52) * (yt > 0.78 ? 1.0 : 0.92);

        draws[i] = [sx, sy, rz, psize, r, g, b, alpha];
      }

      // Back-to-front depth sort — every other frame is imperceptible at 60fps
      if (frameN % 2 === 0) draws.sort((a, b) => a[2] - b[2]);
      for (let i = 0; i < N; i++) {
        const d = draws[i];
        ctx.fillStyle = `rgba(${d[4]},${d[5]},${d[6]},${d[7]})`;
        ctx.beginPath();
        ctx.arc(d[0], d[1], d[3], 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  // Re-run only when particleCount changes (everything else uses refs)
  }, [particleCount]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
