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

  // ── Semantic shapes — each maps to a content section ─────────────────────

  // ── Upgraded semantic shapes ─────────────────────────────────────────────

  // (5,3) Torus knot — complex interlocked system (Cases section)
  // p=5 longitudinal wraps · q=3 meridional wraps → intricate overlapping paths
  tknot53: (i, n) => {
    const t     = (i / n) * Math.PI * 2;
    const p = 5, q = 3, R = 0.56, r = 0.30;
    const phi   = t * p, theta = t * q;
    const Rr    = R + r * Math.cos(theta);
    return [Rr * Math.cos(phi), r * Math.sin(theta), Rr * Math.sin(phi)];
  },

  // (3,2) Trefoil knot — three-lobed identity shape (About section)
  tknot32: (i, n) => {
    const t     = (i / n) * Math.PI * 2;
    const p = 3, q = 2, R = 0.60, r = 0.30;
    const phi   = t * p, theta = t * q;
    const Rr    = R + r * Math.cos(theta);
    return [Rr * Math.cos(phi), r * Math.sin(theta), Rr * Math.sin(phi)];
  },

  // Lorenz attractor — chaos butterfly, emergent thinking (Notes section)
  // Pre-computes 4 000 attractor points at module load (< 1ms)
  lorenz: (() => {
    let x = 0.1, y = 0, z = 0;
    const sigma = 10, rho = 28, beta = 8 / 3, dt = 0.004;
    // Burn warmup transient
    for (let k = 0; k < 1000; k++) {
      const dx = sigma * (y - x), dy = x * (rho - z) - y, dz = x * y - beta * z;
      x += dx * dt; y += dy * dt; z += dz * dt;
    }
    // Collect trajectory
    const raw = [];
    for (let k = 0; k < 4000; k++) {
      const dx = sigma * (y - x), dy = x * (rho - z) - y, dz = x * y - beta * z;
      x += dx * dt; y += dy * dt; z += dz * dt;
      // Remap: lorenz_x→particle_x  lorenz_z→particle_y  lorenz_y→depth
      raw.push([x, z, y]);
    }
    // Normalize each axis to [-0.86, 0.86]
    let mnX = 1e9, mxX = -1e9, mnY = 1e9, mxY = -1e9, mnZ = 1e9, mxZ = -1e9;
    for (const [px, py, pz] of raw) {
      if (px < mnX) mnX = px; if (px > mxX) mxX = px;
      if (py < mnY) mnY = py; if (py > mxY) mxY = py;
      if (pz < mnZ) mnZ = pz; if (pz > mxZ) mxZ = pz;
    }
    const cX = (mnX + mxX) / 2, sX = (mxX - mnX) / 2 || 1;
    const cY = (mnY + mxY) / 2, sY = (mxY - mnY) / 2 || 1;
    const cZ = (mnZ + mxZ) / 2, sZ = (mxZ - mnZ) / 2 || 1;
    const sc = 0.86;
    const pts = raw.map(([px, py, pz]) => [
      (px - cX) / sX * sc,
      -((py - cY) / sY) * sc,   // invert: high lorenz_z → visual top (white)
      (pz - cZ) / sZ * sc * 0.42,
    ]);
    return (i, n) => pts[Math.round((i / Math.max(n - 1, 1)) * (pts.length - 1))];
  })(),

  // Double helix — two intertwined strands + rungs (Contact section)
  dhelix: (i, n) => {
    const turns     = 4.5;
    const nRungSegs = Math.round(turns * 2);   // 9 rungs
    const nRungPts  = 7;                        // particles per rung
    const nRungs    = nRungSegs * nRungPts;
    const nStrands  = n - nRungs;
    const half      = Math.floor(nStrands / 2);

    if (i < nStrands) {
      // Strands
      const strand = i < half ? 0 : 1;
      const ti     = (i % half) / Math.max(half - 1, 1);
      const angle  = ti * Math.PI * 2 * turns + strand * Math.PI;
      return [Math.cos(angle) * 0.46, (ti * 2 - 1) * 0.92, Math.sin(angle) * 0.46];
    }
    // Rungs — straight bars connecting strand A to strand B
    const ri   = i - nStrands;
    const rl   = Math.floor(ri / nRungPts);
    const u    = (ri % nRungPts) / Math.max(nRungPts - 1, 1); // 0→1 across rung
    const rt   = rl / nRungSegs;
    const ang  = rt * Math.PI * 2 * turns;
    const yPos = (rt * 2 - 1) * 0.92;
    const s    = 1 - 2 * u;                    // strand A (+1) → strand B (−1)
    return [Math.cos(ang) * 0.46 * s, yPos, Math.sin(ang) * 0.46 * s];
  },

  // Möbius strip — continuous one-sided loop, design iteration (What I Do section)
  // STRIP particles span the cross-section width; the rest step along the loop
  mobius: (i, n) => {
    const STRIP = 6;
    const nMain = Math.ceil(n / STRIP);
    const ti    = Math.floor(i / STRIP) / nMain;       // 0..1 along the loop
    const si    = (i % STRIP) / (STRIP - 1) * 2 - 1;  // -1..1 across the width
    const t     = ti * Math.PI * 2;
    const R = 0.66, w = 0.22;
    return [
      (R + w * si * Math.cos(t / 2)) * Math.cos(t),
      w * si * Math.sin(t / 2),
      (R + w * si * Math.cos(t / 2)) * Math.sin(t),
    ];
  },

  // Vortex funnel — wide input converges to a tight point (How I Work section)
  // Top (white) = broad inputs · Bottom (red) = focused outcome
  vortex: (i, n) => {
    const t     = i / n;
    const turns = 7;
    const angle = t * Math.PI * 2 * turns;
    const y     = (t * 2 - 1) * 0.88;          // −0.88 (top/white) → +0.88 (bottom/red)
    const r     = (1 - t) * 0.72 + 0.04;       // tapers: wide top → tight bottom
    return [Math.cos(angle) * r, y, Math.sin(angle) * r];
  },

  // Scanline — CRT power-off: all particles collapse to a horizontal line
  // Used as fallback when user scrolls past all sections (footer area)
  scanline: (i, n) => {
    const u = (i / Math.max(n - 1, 1)) * 2 - 1;  // −1..1 along the line
    return [u * 0.80, 0, 0];
  },

  // Ripple — radial dampened water-drop surface (kept for morph compat)
  ripple: (i, n) => {
    const side = Math.ceil(Math.sqrt(n));
    const xi   = i % side, zi = Math.floor(i / side);
    const u    = (xi / Math.max(side - 1, 1)) * 2 - 1;
    const v    = (zi / Math.max(side - 1, 1)) * 2 - 1;
    const rad  = Math.sqrt(u * u + v * v);
    const y    = 0.30 * Math.cos(rad * Math.PI * 2.4) * Math.exp(-rad * 1.1);
    return [u * 1.1, y, v * 1.1];
  },

  // ── Legacy shapes kept for morph compatibility ──────────────────────────

  // Game controller — volumetric 3D point cloud (ellipsoidal surface sampling)
  // Parts: [cx, cy, cz,  rx,   ry,   rz,  weight]
  // Y axis: +1 = visual bottom (red), -1 = visual top (white)
  controller: (() => {
    const PARTS = [
      [  0.00, -0.04,  0.00,  0.64, 0.26, 0.18, 30], // main body
      [ -0.39,  0.46,  0.03,  0.20, 0.38, 0.20, 17], // left handle
      [  0.39,  0.46,  0.03,  0.20, 0.38, 0.20, 17], // right handle
      [ -0.53, -0.36, -0.06,  0.20, 0.09, 0.13,  8], // left shoulder bump
      [  0.53, -0.36, -0.06,  0.20, 0.09, 0.13,  8], // right shoulder bump
      [ -0.28,  0.09,  0.20,  0.13, 0.13, 0.06,  6], // left thumbstick
      [  0.16,  0.10,  0.20,  0.13, 0.13, 0.06,  6], // right thumbstick
      [ -0.42, -0.06,  0.22,  0.11, 0.11, 0.03,  4], // d-pad area
      [  0.36, -0.08,  0.22,  0.12, 0.12, 0.03,  4], // face buttons
    ];
    const TW = PARTS.reduce((s, p) => s + p[6], 0);
    const CW = []; let sum = 0;
    for (const p of PARTS) { sum += p[6]; CW.push(sum); }

    return (i, n) => {
      // Two independent deterministic hashes per particle
      let h1 = Math.imul(i ^ 0xdeadbeef, 0x9e3779b9);
      h1 = Math.imul(h1 ^ (h1 >>> 16), 0x85ebca6b);
      h1 = Math.imul(h1 ^ (h1 >>> 13), 0xc2b2ae35);
      const u = ((h1 ^ (h1 >>> 16)) >>> 0) / 0x100000000;

      let h2 = Math.imul((i + 7919) ^ 0xbabe1337, 0x6c62272e);
      h2 = Math.imul(h2 ^ (h2 >>> 16), 0xa3b195d5);
      h2 = Math.imul(h2 ^ (h2 >>> 13), 0xf42b5a7f);
      const v = ((h2 ^ (h2 >>> 16)) >>> 0) / 0x100000000;

      // Assign particle to part by sequential proportion
      const tgt = (i / n) * TW;
      let pi = 0;
      while (pi < CW.length - 1 && CW[pi] <= tgt) pi++;
      const [cx, cy, cz, rx, ry, rz] = PARTS[pi];

      // Uniform surface sampling: uniform in cos(phi) → uniform area on sphere
      const phi   = Math.acos(1 - 2 * u);
      const theta = Math.PI * 2 * v;
      const sp    = Math.sin(phi);
      return [
        cx + rx * sp * Math.cos(theta),
        cy + ry * sp * Math.sin(theta),
        cz + rz * Math.cos(phi),
      ];
    };
  })(),

  // Brain — volumetric 3D point cloud (lateral hemisphere view)
  // Parts: [cx, cy, cz,  rx,   ry,   rz,  weight]
  brain: (() => {
    const PARTS = [
      [  0.00, -0.05,  0.00,  0.58, 0.44, 0.34, 44], // main hemisphere mass
      [ -0.30, -0.10,  0.10,  0.26, 0.28, 0.22, 20], // frontal lobe
      [ -0.06,  0.40,  0.06,  0.24, 0.18, 0.18, 13], // temporal lobe
      [  0.38, -0.04,  0.02,  0.22, 0.28, 0.20, 11], // occipital lobe
      [ -0.46, -0.22,  0.06,  0.14, 0.20, 0.14,  5], // prefrontal
      [  0.10,  0.64,  0.00,  0.10, 0.20, 0.10,  7], // brainstem
    ];
    const TW = PARTS.reduce((s, p) => s + p[6], 0);
    const CW = []; let sum = 0;
    for (const p of PARTS) { sum += p[6]; CW.push(sum); }

    return (i, n) => {
      let h1 = Math.imul(i ^ 0xc0ffee42, 0x9e3779b9);
      h1 = Math.imul(h1 ^ (h1 >>> 16), 0x85ebca6b);
      h1 = Math.imul(h1 ^ (h1 >>> 13), 0xc2b2ae35);
      const u = ((h1 ^ (h1 >>> 16)) >>> 0) / 0x100000000;

      let h2 = Math.imul((i + 3571) ^ 0xf00dcafe, 0x6c62272e);
      h2 = Math.imul(h2 ^ (h2 >>> 16), 0xa3b195d5);
      h2 = Math.imul(h2 ^ (h2 >>> 13), 0xf42b5a7f);
      const v = ((h2 ^ (h2 >>> 16)) >>> 0) / 0x100000000;

      const tgt = (i / n) * TW;
      let pi = 0;
      while (pi < CW.length - 1 && CW[pi] <= tgt) pi++;
      const [cx, cy, cz, rx, ry, rz] = PARTS[pi];

      const phi   = Math.acos(1 - 2 * u);
      const theta = Math.PI * 2 * v;
      const sp    = Math.sin(phi);
      return [
        cx + rx * sp * Math.cos(theta),
        cy + ry * sp * Math.sin(theta),
        cz + rz * Math.cos(phi),
      ];
    };
  })(),

  // Circuit board — orthogonal PCB traces on a flat plane (for How I Work section)
  circuit: (() => {
    const GRID = 7;
    function node(gx, gy) {
      return [(gx / (GRID - 1)) * 1.7 - 0.85, 0, (gy / (GRID - 1)) * 1.7 - 0.85];
    }
    const segs = [];
    // Horizontal traces
    for (let gy = 0; gy < GRID; gy++) {
      for (let gx = 0; gx < GRID - 1; gx++) {
        const a = node(gx, gy), b = node(gx + 1, gy);
        const dx = b[0] - a[0]; segs.push({ a, b, len: Math.abs(dx) });
      }
    }
    // Vertical traces
    for (let gx = 0; gx < GRID; gx++) {
      for (let gy = 0; gy < GRID - 1; gy++) {
        const a = node(gx, gy), b = node(gx, gy + 1);
        const dz = b[2] - a[2]; segs.push({ a, b, len: Math.abs(dz) });
      }
    }
    const total = segs.reduce((s, sg) => s + sg.len, 0);
    const cum = []; let acc = 0;
    for (const sg of segs) { acc += sg.len; cum.push(acc); }
    return (i, n) => {
      const t = (i / n) * total;
      let si = cum.findIndex(c => c >= t); if (si < 0) si = segs.length - 1;
      const sg = segs[si], prev = si > 0 ? cum[si - 1] : 0;
      const u = sg.len > 0 ? (t - prev) / sg.len : 0;
      const x = sg.a[0] + (sg.b[0] - sg.a[0]) * u;
      const z = sg.a[2] + (sg.b[2] - sg.a[2]) * u;
      // Nodes (segment endpoints) pop slightly up; traces stay flat
      const atNode = Math.min(u, 1 - u) < 0.06;
      return [x, atNode ? 0.10 : 0.0, z];
    };
  })(),

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
  particleCount = 1200,
  mobileCanvas = false, // when true, renders a small canvas sized to mobileSize
  mobileSize   = 280,   // CSS px — square dimensions of the mobileCanvas
  mobileStyle  = {},    // position overrides applied to canvas style when mobileCanvas=true
}) {
  const canvasRef    = useRef(null);
  // Keep mutable refs for props so the RAF loop always sees the latest value
  // without re-registering the effect.
  const shapeRef     = useRef(shape);
  const offsetRef    = useRef({ x: offsetX, y: offsetY });
  const rotRef       = useRef({ x: rotX, y: rotY, z: rotZ, spin: spin ? 1 : 0 });
  const intensityRef = useRef(intensity);
  const pausedRef    = useRef(paused);
  // Lets the paused-prop watcher restart the loop if the tab was hidden while paused
  const startLoopRef = useRef(null);

  useEffect(() => { shapeRef.current = shape; },             [shape]);
  useEffect(() => { offsetRef.current = { x: offsetX, y: offsetY }; }, [offsetX, offsetY]);
  useEffect(() => { rotRef.current = { x: rotX, y: rotY, z: rotZ, spin: spin ? 1 : 0 }; }, [rotX, rotY, rotZ, spin]);
  useEffect(() => { intensityRef.current = intensity; },     [intensity]);
  useEffect(() => {
    pausedRef.current = paused;
    // If the tab was hidden while paused, the RAF loop stopped. Restart it now.
    if (!paused) startLoopRef.current?.();
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Reduce particle count on mobile — visually equivalent, significantly cheaper
    const isMobileViewport = window.innerWidth < 768;
    const N   = isMobileViewport ? Math.min(particleCount, 400) : particleCount;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h;
    let cleanupResize = () => {};

    if (mobileCanvas) {
      // Fixed small canvas — no resize listener needed
      w = mobileSize;
      h = mobileSize;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    } else {
      const getSize = () => ({ w: window.innerWidth, h: window.innerHeight });
      ({ w, h } = getSize());
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
      cleanupResize = () => window.removeEventListener('resize', resize);
    }

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
    let raf      = null;
    let frameN   = 0;
    // Preallocate draws buffer — reused every frame, no GC pressure
    const draws  = new Array(N);

    const startLoop = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const stopLoop  = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };
    startLoopRef.current = startLoop;

    const draw = () => {
      raf = null;
      // When hidden or paused, let the loop die — onVisChange / paused-effect
      // will restart it. Calling startLoop() here would busy-wait the GPU.
      if (pausedRef.current || document.hidden) { return; }
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

      startLoop();
    };

    // Pause completely when tab is hidden — saves GPU even when paused prop is false
    const onVisChange = () => {
      if (document.hidden) stopLoop();
      else if (!pausedRef.current) startLoop();
    };
    document.addEventListener('visibilitychange', onVisChange);

    startLoop();

    return () => {
      stopLoop();
      document.removeEventListener('visibilitychange', onVisChange);
      cleanupResize();
    };
  // Re-run when particleCount, mobileCanvas, or mobileSize change
  }, [particleCount, mobileCanvas, mobileSize]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        ...(mobileCanvas
          ? { bottom: 0, right: 0, top: 'auto', left: 'auto', ...mobileStyle }
          : { top: 0, left: 0 }),
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
