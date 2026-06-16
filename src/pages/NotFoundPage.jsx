import { useEffect, useRef, useState, useCallback } from 'react';
import { useScramble } from '../hooks/useScramble';
import { m, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SectionTag from '../components/SectionTag';
import CyberBtn from '../components/CyberBtn';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLang } from '../contexts/LangContext';

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

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

// P2 fix: duration 0.55 → 0.38 (Emil timing-300ms-max)
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE_OUT } },
};

// ─── Auto-scrambling 404 heading ──────────────────────────────────────────────
function Glitch404({ reducedMotion }) {
  const [trigger, setTrigger] = useState(0);
  const displayed = useScramble('404', {
    duration: 520,
    trigger,
    enabled: !reducedMotion,
  });

  useEffect(() => {
    if (reducedMotion) return;
    setTrigger(1);
    const id = setInterval(() => setTrigger(t => t + 1), 3500);
    return () => clearInterval(id);
  }, [reducedMotion]);

  // P1 fix: m.div → m.h1 for correct heading hierarchy
  return (
    <m.h1
      initial={reducedMotion ? false : { opacity: 0, y: 28, skewX: -3 }}
      animate={{ opacity: 1, y: 0, skewX: 0 }}
      transition={{ duration: 0.38, ease: EASE_OUT }}
      aria-label="404"
      style={{
        fontFamily:    '"Bebas Neue", sans-serif',
        fontSize:      'clamp(140px, 22vw, 280px)',
        lineHeight:    0.85,
        color:         'var(--color-accent)',
        letterSpacing: '-0.01em',
        userSelect:    'none',
        margin:        0,
      }}
    >
      {displayed}
    </m.h1>
  );
}

// ─── Blink cursor ─────────────────────────────────────────────────────────────
// P1 fix: respects useReducedMotion
function BlinkCursor() {
  const reducedMotion = useReducedMotion();
  return (
    <m.span
      aria-hidden="true"
      animate={reducedMotion ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
      transition={reducedMotion ? {} : { duration: 1, repeat: Infinity, times: [0, 0.45, 0.55, 1] }}
      style={{
        display:       'inline-block',
        width:         '7px',
        height:        '13px',
        background:    'var(--color-accent)',
        verticalAlign: 'middle',
        marginLeft:    '3px',
        marginBottom:  '1px',
      }}
    />
  );
}

const LOG_DELAYS = [0.35, 0.60, 0.85, 1.10, 1.35];

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
            display:       'flex',
            gap:           '10px',
            fontFamily:    '"Play", sans-serif',
            fontSize:      '11px',
            lineHeight:    1.7,
            letterSpacing: '0.06em',
            minWidth:      0,
          }}
        >
          <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>{prefix}</span>
          {/* P3 fix: use token; min-width:0 prevents overflow on long lines */}
          <span style={{ color: 'var(--color-fg-55)', minWidth: 0, wordBreak: 'break-word' }}>{text}</span>
        </m.div>
      )}
    </AnimatePresence>
  );
}

// ─── CCTV timestamp ───────────────────────────────────────────────────────────
function CCTVTimestamp() {
  const [ts, setTs]       = useState('');
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const fmt = () => {
      const d   = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}  ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };
    setTs(fmt());
    const id = setInterval(() => { setTs(fmt()); setBlink(b => !b); }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position:      'absolute',
        top:           10,
        left:          12,
        fontFamily:    '"Play", sans-serif',
        fontSize:      '9px',
        letterSpacing: '0.12em',
        color:         'var(--color-fg-45)',
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
const VID_DURATION       = 5.04;
const LOOP_MASK_AT       = VID_DURATION - 0.55;

function VideoPanel({ reducedMotion }) {
  const vidRef          = useRef(null);
  const glitchTimeout   = useRef(null);
  const intervalRef     = useRef(null);
  const trackingTimeout = useRef(null); // P2 fix: cleanup for fireTracking
  // P2 fix: ref to avoid stale closure in onTimeUpdate
  const glitchingRef    = useRef(false);

  const [glitching,   setGlitching]   = useState(false);
  const [seed,        setSeed]        = useState(5);
  const [trackingBar, setTrackingBar] = useState(false);

  const fireGlitch = useCallback(() => {
    setSeed(Math.floor(Math.random() * 200));
    setGlitching(true);
    glitchingRef.current = true;
    clearTimeout(glitchTimeout.current);
    glitchTimeout.current = setTimeout(() => {
      setGlitching(false);
      glitchingRef.current = false;
    }, GLITCH_DURATION_MS);
  }, []);

  const fireTracking = useCallback(() => {
    setTrackingBar(true);
    // P2 fix: use ref so it can be cleared on unmount
    clearTimeout(trackingTimeout.current);
    trackingTimeout.current = setTimeout(() => setTrackingBar(false), 600);
  }, []);

  useEffect(() => {
    const vid = vidRef.current;
    if (!vid || reducedMotion) {
      vid?.play().catch(() => {});
      return;
    }

    vid.loop = false;
    vid.play().catch(() => {});

    // P2 fix: read glitchingRef.current instead of stale closure
    const onTimeUpdate = () => {
      if (vid.currentTime >= LOOP_MASK_AT && !glitchingRef.current) fireGlitch();
    };
    const onEnded = () => {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    };

    vid.addEventListener('timeupdate', onTimeUpdate);
    vid.addEventListener('ended',      onEnded);

    const scheduleNext = () => {
      const delay = 2500 + Math.random() * 2500;
      intervalRef.current = setTimeout(() => {
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
      clearTimeout(trackingTimeout.current); // P2 fix
    };
  }, [reducedMotion, fireGlitch, fireTracking]);

  const dispScale = glitching ? 14 : 0;

  return (
    <div
      style={{
        position:    'relative',
        clipPath:    CLIP_FULL,
        overflow:    'hidden',
        aspectRatio: '16 / 9',
        width:       '100%',
        background:  'var(--bg-2)', // P3 fix: was #0a0a0a
      }}
    >
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
            <feTurbulence
              type="turbulence"
              baseFrequency="0.025 0.002"
              numOctaves="1"
              seed={seed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={dispScale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feOffset in="displaced" dx="4"  dy="0" result="r-shift" />
            <feColorMatrix
              in="r-shift"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.85 0"
              result="r-only"
            />
            <feOffset in="displaced" dx="-4" dy="0" result="cb-shift" />
            <feColorMatrix
              in="cb-shift"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.85 0"
              result="cb-only"
            />
            <feBlend in="r-only"  in2="displaced" mode="screen" result="rgb1" />
            <feBlend in="cb-only" in2="rgb1"      mode="screen" />
          </filter>
        </defs>
      </svg>

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
          // P2 fix: no transition on filter — glitch must be abrupt, not smoothed
          filter:    glitching ? 'url(#vhs-glitch)' : 'none',
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

      {trackingBar && (
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            left:          0,
            right:         0,
            height:        '18px',
            background:    'rgba(240,238,234,0.07)',
            animation:     'tracking-sweep 0.55s linear forwards',
            zIndex:        4,
            pointerEvents: 'none',
          }}
        />
      )}

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

      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          background:    'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
          zIndex:        3,
        }}
      />

      <CCTVTimestamp />

      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        10,
          right:         12,
          fontFamily:    '"Play", sans-serif',
          fontSize:      '9px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         'var(--color-fg-28)',
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
  const { t }         = useLang();
  const nf            = t.notFound;

  usePageMeta({
    title:       nf.pageTitle,
    description: nf.pageDesc,
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
        style={{ flex: 1, display: 'flex', alignItems: 'center' }}
      >
        <div
          style={{
            width:    '100%',
            maxWidth: '1280px',
            margin:   '0 auto',
            padding:  'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 64px)',
          }}
        >
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
              <m.div variants={itemVariants}>
                <SectionTag label={nf.tag} page="000" />
              </m.div>

              {/* P1 fix: renders as <h1> */}
              <Glitch404 reducedMotion={reducedMotion} />

              {/* Subtitle — plain p, not a heading */}
              <m.div variants={itemVariants}>
                <p style={{
                  fontFamily:    '"Bebas Neue", sans-serif',
                  fontSize:      'clamp(22px, 3vw, 32px)',
                  letterSpacing: '0.04em',
                  color:         'var(--color-fg-55)',
                  lineHeight:    1,
                  margin:        0,
                }}>
                  {nf.subtitle}
                </p>
              </m.div>

              <m.div
                variants={itemVariants}
                style={{
                  height:     '1px',
                  background: 'var(--color-accent-30)',
                  width:      '100%',
                }}
              />

              {/* P3 fix: use token --color-fg-72 */}
              <m.p
                variants={itemVariants}
                style={{
                  fontFamily:    '"Play", sans-serif',
                  fontSize:      '13px',
                  lineHeight:    1.65,
                  letterSpacing: '0.03em',
                  color:         'var(--color-fg-72)',
                  maxWidth:      '36ch',
                  margin:        0,
                }}
              >
                {nf.bodyPrefix}{' '}
                <span style={{ color: 'var(--color-accent)', fontWeight: 700, wordBreak: 'break-all' }}>
                  {requestedPath}
                </span>{' '}
                {nf.bodySuffix}
              </m.p>

              {/* P1 fix: borderLeft removed — replaced with tinted background */}
              <m.div
                variants={itemVariants}
                style={{
                  background:    'color-mix(in srgb, var(--color-accent) 4%, transparent)',
                  padding:       '12px 16px',
                  display:       'flex',
                  flexDirection: 'column',
                  gap:           '2px',
                }}
              >
                {nf.logs.map((text, i) => (
                  <LogLine
                    key={text}
                    prefix=">"
                    text={text}
                    delay={LOG_DELAYS[i]}
                    reducedMotion={reducedMotion}
                  />
                ))}
                <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    fontFamily:    '"Play", sans-serif',
                    fontSize:      '11px',
                    letterSpacing: '0.06em',
                    color:         'var(--color-accent)',
                  }}>
                    &gt;
                  </span>
                  <BlinkCursor />
                </div>
              </m.div>

              <m.div variants={itemVariants} style={{ paddingTop: '4px' }}>
                <CyberBtn to="/" variant="solid" size="md" magnetic>
                  {nf.cta}
                </CyberBtn>
              </m.div>
            </m.div>

            {/* RIGHT — video (order: -1 on mobile so it appears above text) */}
            {/* P2 fix: duration 0.7 → 0.45 */}
            <m.div
              className="not-found-video"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.2, ease: EASE_OUT }}
            >
              <VideoPanel reducedMotion={reducedMotion} />

              <div
                style={{
                  marginTop:      '12px',
                  display:        'flex',
                  alignItems:     'center',
                  gap:            '10px',
                  justifyContent: 'space-between',
                }}
              >
                {/* P3 fix: use tokens */}
                <span style={{
                  fontFamily:    '"Play", sans-serif',
                  fontSize:      '10px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color:         'var(--color-fg-28)',
                }}>
                  CCTV — SECTOR 404
                </span>
                <span style={{
                  fontFamily:    '"Play", sans-serif',
                  fontSize:      '10px',
                  letterSpacing: '0.14em',
                  color:         'var(--color-fg-18)',
                }}>
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
