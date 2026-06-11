import { useEffect, useRef, useState, useCallback } from 'react';
import { useScramble } from '../hooks/useScramble';
import { m, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SectionTag from '../components/SectionTag';
import CyberBtn from '../components/CyberBtn';
import { usePageMeta } from '../hooks/usePageMeta';

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE_OUT = [0.16, 1, 0.3, 1];

const CLIP_FULL = `polygon(
  10px 0,
  calc(100% - 10px) 0,
  100% 10px,
  100% calc(100% - 10px),
  calc(100% - 10px) 100%,
  10px 100%,
  0 calc(100% - 10px),
  0 10px
)`;

// Stagger container
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.55, ease: EASE_OUT } },
};

// ─── Auto-scrambling 404 ──────────────────────────────────────────────────────
function Glitch404({ reducedMotion }) {
  const [trigger, setTrigger] = useState(0);
  const displayed = useScramble('404', {
    duration: 520,
    trigger,
    enabled: !reducedMotion,
  });

  // Fire on mount, then every 3.5s
  useEffect(() => {
    if (reducedMotion) return;
    setTrigger(1);
    const id = setInterval(() => setTrigger(t => t + 1), 3500);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <m.div
      initial={{ opacity: 0, y: 28, skewX: -3 }}
      animate={{ opacity: 1, y: 0, skewX: 0 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
      aria-label="404"
      style={{
        fontFamily:    '"Bebas Neue", sans-serif',
        fontSize:      'clamp(140px, 22vw, 280px)',
        lineHeight:    0.85,
        color:         'var(--color-accent)',
        letterSpacing: '-0.01em',
        userSelect:    'none',
      }}
    >
      {displayed}
    </m.div>
  );
}

// ─── Blink cursor ─────────────────────────────────────────────────────────────
function BlinkCursor() {
  return (
    <m.span
      aria-hidden="true"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, times: [0, 0.45, 0.55, 1] }}
      style={{
        display:         'inline-block',
        width:           '7px',
        height:          '13px',
        background:      'var(--color-accent)',
        verticalAlign:   'middle',
        marginLeft:      '3px',
        marginBottom:    '1px',
      }}
    />
  );
}

// ─── Typewriter log lines ─────────────────────────────────────────────────────
const LOG_LINES = [
  { prefix: '>', text: 'PAGE_STATUS: OFFLINE',                    delay: 0.35 },
  { prefix: '>', text: 'CABLE_STATUS: IN DOG\'S MOUTH',           delay: 0.60 },
  { prefix: '>', text: 'OPERATOR_STATUS: PANICKING',              delay: 0.85 },
  { prefix: '>', text: 'SUSPECT_DESCRIPTION: BROWN, FAST, WEARING HOODIE', delay: 1.10 },
  { prefix: '>', text: 'RECOVERY_PLAN: RUN FASTER',               delay: 1.35 },
];

function LogLine({ prefix, text, delay, reducedMotion }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), reducedMotion ? 0 : delay * 1000);
    return () => clearTimeout(id);
  }, [delay, reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={reducedMotion ? false : { opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
          style={{
            display:     'flex',
            gap:         '10px',
            fontFamily:  '"Play", monospace',
            fontSize:    '11px',
            lineHeight:  1.7,
            letterSpacing: '0.06em',
          }}
        >
          <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>{prefix}</span>
          <span style={{ color: 'rgba(240,238,234,0.55)' }}>{text}</span>
        </m.div>
      )}
    </AnimatePresence>
  );
}

// ─── CCTV timestamp (live clock in the overlay) ───────────────────────────────
function CCTVTimestamp() {
  const [ts, setTs] = useState('');
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}  ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };
    setTs(fmt());
    const id = setInterval(() => {
      setTs(fmt());
      setBlink(b => !b);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position:      'absolute',
        top:           10,
        left:          12,
        fontFamily:    '"Play", monospace',
        fontSize:      '9px',
        letterSpacing: '0.12em',
        color:         'rgba(240,238,234,0.45)',
        zIndex:        5,
        lineHeight:    1.6,
        userSelect:    'none',
      }}
    >
      <div style={{ color: 'rgba(255,37,64,0.7)', marginBottom: 1 }}>
        CAM-04 ● REC
        <span style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.1s' }}> ●</span>
      </div>
      <div>{ts}</div>
    </div>
  );
}

// ─── Video panel with VHS glitch ─────────────────────────────────────────────
const GLITCH_DURATION_MS = 380;
const VID_DURATION       = 5.04; // seconds
const LOOP_MASK_AT       = VID_DURATION - 0.55; // start glitch before loop end

function VideoPanel({ reducedMotion }) {
  const vidRef        = useRef(null);
  const glitchTimeout = useRef(null);
  const intervalRef   = useRef(null);

  const [glitching,    setGlitching]    = useState(false);
  const [seed,         setSeed]         = useState(5);
  const [trackingBar,  setTrackingBar]  = useState(false);

  const fireGlitch = useCallback(() => {
    setSeed(Math.floor(Math.random() * 200));
    setGlitching(true);
    clearTimeout(glitchTimeout.current);
    glitchTimeout.current = setTimeout(() => setGlitching(false), GLITCH_DURATION_MS);
  }, []);

  const fireTracking = useCallback(() => {
    setTrackingBar(true);
    setTimeout(() => setTrackingBar(false), 600);
  }, []);

  useEffect(() => {
    const vid = vidRef.current;
    if (!vid || reducedMotion) {
      vid?.play().catch(() => {});
      return;
    }

    // Manual loop: mask restart with a glitch burst
    vid.loop = false;
    vid.play().catch(() => {});

    const onTimeUpdate = () => {
      if (vid.currentTime >= LOOP_MASK_AT && !glitching) fireGlitch();
    };
    const onEnded = () => {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    };

    vid.addEventListener('timeupdate', onTimeUpdate);
    vid.addEventListener('ended',      onEnded);

    // Periodic random glitches (2.5–5s apart)
    const scheduleNext = () => {
      const delay = 2500 + Math.random() * 2500;
      intervalRef.current = setTimeout(() => {
        // 60% glitch, 40% tracking bar
        if (Math.random() < 0.6) fireGlitch(); else fireTracking();
        scheduleNext();
      }, delay);
    };
    scheduleNext();

    return () => {
      vid.removeEventListener('timeupdate', onTimeUpdate);
      vid.removeEventListener('ended',      onEnded);
      clearTimeout(glitchTimeout.current);
      clearTimeout(intervalRef.current);
    };
  }, [reducedMotion, fireGlitch, fireTracking]);

  // Displacement scale: 0 at rest, spike on glitch
  const dispScale = glitching ? 14 : 0;

  return (
    <div
      style={{
        position:    'relative',
        clipPath:    CLIP_FULL,
        overflow:    'hidden',
        aspectRatio: '16 / 9',
        width:       '100%',
        background:  '#0a0a0a',
      }}
    >
      {/* ── SVG filter definitions (invisible, 0×0) ── */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <filter
            id="vhs-glitch"
            x="-5%" y="-5%"
            width="110%" height="110%"
            colorInterpolationFilters="sRGB"
          >
            {/* Horizontal-biased turbulence */}
            <feTurbulence
              type="turbulence"
              baseFrequency="0.025 0.002"
              numOctaves="1"
              seed={seed}
              result="noise"
            />
            {/* Displacement for the full image */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={dispScale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Red channel: shift right */}
            <feOffset in="displaced" dx="4"  dy="0" result="r-shift" />
            <feColorMatrix
              in="r-shift"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.85 0"
              result="r-only"
            />
            {/* Cyan (G+B) channel: shift left */}
            <feOffset in="displaced" dx="-4" dy="0" result="cb-shift" />
            <feColorMatrix
              in="cb-shift"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.85 0"
              result="cb-only"
            />
            {/* Composite: red ghost + cyan ghost over displaced */}
            <feBlend in="r-only"    in2="displaced" mode="screen" result="rgb1" />
            <feBlend in="cb-only"   in2="rgb1"      mode="screen" />
          </filter>
        </defs>
      </svg>

      {/* Red top-border accent */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          top:        0, left: 0, right: 0,
          height:     '2px',
          background: 'var(--color-accent)',
          zIndex:     2,
        }}
      />

      {/* Video — filter applied via inline style */}
      <video
        ref={vidRef}
        poster="/404/404.webp"
        muted
        playsInline
        preload="auto"
        aria-label="Pixel art animation: a dog steals the cable"
        style={{
          width:     '100%',
          height:    '100%',
          objectFit: 'cover',
          display:   'block',
          filter:    glitching ? 'url(#vhs-glitch)' : 'none',
          transition: glitching ? 'none' : 'filter 0.06s linear',
        }}
      >
        <source src="/404/404.webm" type="video/webm" />
        <source src="/404/404.mp4"  type="video/mp4" />
        <img
          src="/404/404.webp"
          alt="Pixel art: a dog in a dark room running with a power cable"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </video>

      {/* VHS tracking bar — sweeps top-to-bottom */}
      {trackingBar && (
        <div
          aria-hidden="true"
          style={{
            position:   'absolute',
            left:       0,
            right:      0,
            height:     '18px',
            background: 'rgba(240,238,234,0.07)',
            animation:  'tracking-sweep 0.55s linear forwards',
            zIndex:     4,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Scanlines */}
      <div
        aria-hidden="true"
        style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.22) 1px, rgba(0,0,0,0.22) 2px)',
          backgroundSize:  '100% 2px',
          pointerEvents:   'none',
          zIndex:          3,
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
          zIndex:     3,
        }}
      />

      {/* CCTV HUD */}
      <CCTVTimestamp />
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        10,
          right:         12,
          fontFamily:    '"Play", monospace',
          fontSize:      '9px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         'rgba(240,238,234,0.28)',
          zIndex:        5,
          userSelect:    'none',
        }}
      >
        SECTOR-404 / EVIDENCE
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function NotFoundPage({ onMenuOpen }) {
  const location      = useLocation();
  const reducedMotion = useReducedMotion();
  const requestedPath = location.pathname;

  usePageMeta({
    title:       'Page Not Found — AFPISSO',
    description: 'The page you were looking for has gone missing. A dog may be involved.',
    robots:      'noindex',
  });

  return (
    <div
      style={{
        minHeight:       '100dvh',
        display:         'flex',
        flexDirection:   'column',
        position:        'relative',
        zIndex:          1,
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />

      <main
        id="main-content"
        style={{
          flex:       1,
          display:    'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width:     '100%',
            maxWidth:  '1280px',
            margin:    '0 auto',
            padding:   'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 64px)',
          }}
        >
          {/* ── Grid: left text / right video ─────────────────────────────── */}
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap:                 'clamp(40px, 5vw, 80px)',
              alignItems:          'center',
            }}
          >
            {/* LEFT — console readout */}
            <m.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
            >
              {/* Tag */}
              <m.div variants={itemVariants}>
                <SectionTag label="Error 404" page="000" />
              </m.div>

              {/* Big 404 — auto-glitch */}
              <Glitch404 reducedMotion={reducedMotion} />

              {/* Subtitle */}
              <m.div variants={itemVariants}>
                <span style={{
                  fontFamily:    '"Bebas Neue", sans-serif',
                  fontSize:      'clamp(22px, 3vw, 32px)',
                  letterSpacing: '0.04em',
                  color:         'rgba(240,238,234,0.55)',
                  lineHeight:    1,
                }}>
                  Page disconnected.
                </span>
              </m.div>

              {/* Separator */}
              <m.div
                variants={itemVariants}
                style={{
                  height:     '1px',
                  background: 'var(--color-accent-30)',
                  width:      '100%',
                }}
              />

              {/* Incident copy */}
              <m.p
                variants={itemVariants}
                style={{
                  fontFamily:    '"Play", monospace',
                  fontSize:      '13px',
                  lineHeight:    1.65,
                  letterSpacing: '0.03em',
                  color:         'rgba(240,238,234,0.72)',
                  maxWidth:      '36ch',
                }}
              >
                The page at{' '}
                <span
                  style={{
                    color:      'var(--color-accent)',
                    fontWeight: 700,
                    wordBreak:  'break-all',
                  }}
                >
                  {requestedPath}
                </span>{' '}
                is offline. We found the problem — a tiny brown suspect escaped with the power cable before this page could load.
              </m.p>

              {/* Log terminal */}
              <m.div
                variants={itemVariants}
                style={{
                  borderLeft: '2px solid var(--color-accent-30)',
                  paddingLeft: '16px',
                  display:    'flex',
                  flexDirection: 'column',
                  gap:        '2px',
                }}
              >
                {LOG_LINES.map((line) => (
                  <LogLine key={line.text} {...line} reducedMotion={reducedMotion} />
                ))}
                <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily:  '"Play", monospace',
                      fontSize:    '11px',
                      letterSpacing: '0.06em',
                      color:       'var(--color-accent)',
                    }}
                  >
                    &gt;
                  </span>
                  <BlinkCursor />
                </div>
              </m.div>

              {/* CTA */}
              <m.div variants={itemVariants} style={{ paddingTop: '4px' }}>
                <CyberBtn to="/" variant="solid" size="md" magnetic>
                  Restore Connection
                </CyberBtn>
              </m.div>
            </m.div>

            {/* RIGHT — video */}
            <m.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
            >
              <VideoPanel reducedMotion={reducedMotion} />

              {/* Caption below video */}
              <div
                style={{
                  marginTop:     '12px',
                  display:       'flex',
                  alignItems:    'center',
                  gap:           '10px',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily:    '"Play", monospace',
                    fontSize:      '10px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color:         'rgba(240,238,234,0.28)',
                  }}
                >
                  CCTV — SECTOR 404
                </span>
                <span
                  style={{
                    fontFamily:    '"Play", monospace',
                    fontSize:      '10px',
                    letterSpacing: '0.14em',
                    color:         'rgba(240,238,234,0.18)',
                  }}
                >
                  REC ●
                </span>
              </div>
            </m.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
