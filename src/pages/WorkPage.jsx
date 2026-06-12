import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { cases, CASE_ORDER } from '../data/cases';
import { useLang } from '../contexts/LangContext';
import GlitchStrokeText from '../components/GlitchStrokeText';
import ScrambleText from '../components/ScrambleText';
import SectionTag from '../components/SectionTag';
import { StatusDiamond } from '../components/CyberIcons';
import { usePageMeta } from '../hooks/usePageMeta';
import { analytics } from '../utils/analytics';
import SignalTrigger from '../components/SignalTrigger';
import { usePageTransition } from '../contexts/TransitionContext';
import { m, AnimatePresence, useMotionValue, useSpring, useReducedMotion, useScroll, useTransform, useSpring as useSpringValue } from 'framer-motion';

const BASE_URL = 'https://byandresfe.com';
const EASE_OUT = [0.16, 1, 0.3, 1];

const filters = ['All', 'Games', 'UEFN', 'VR', 'NDA-Safe', 'Legacy'];

const VISIBILITY_STYLE = {
  'public':             { color: 'var(--color-accent)',    border: 'var(--color-accent-30)' },
  'nda-safe':           { color: 'var(--color-accent)',    border: 'var(--color-accent-30)' },
  'password-protected': { color: '#facc15',                border: 'rgba(234,179,8,0.3)' },
  'coming-soon':        { color: '#facc15',                border: 'rgba(234,179,8,0.3)' },
  'legacy':             { color: 'var(--color-fg-mute)',   border: 'var(--color-rule)' },
};

function matchFilter(filter, c) {
  if (filter === 'All') return true;
  if (filter === 'Games') return c.category === 'games';
  if (filter === 'UEFN') return c.platform?.includes('UEFN') || c.platform?.includes('Fortnite');
  if (filter === 'VR') return c.platform?.includes('VR');
  if (filter === 'NDA-Safe') return c.visibility === 'nda-safe';
  if (filter === 'Legacy') return c.visibility === 'legacy' || c.category === 'legacy';
  return true;
}

// ── Thumbnail image with placeholder fallback ─────────────────────────────────
function ThumbnailOrPlaceholder({ c, priority = false }) {
  const [failed, setFailed] = useState(false);
  const src = `/thumbnails/${c.slug}.webp`;

  if (!failed) {
    return (
      <img
        key={src}
        src={src}
        alt=""
        aria-hidden="true"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      backgroundColor: 'rgba(14,3,6,0.95)',
      border: '1px solid var(--red-dim)',
      position: 'relative',
      display: 'flex', flexDirection: 'column',
      alignItems: 'flex-start', justifyContent: 'flex-end',
      padding: '20px 24px',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: '5rem',
        color: 'rgba(255,37,64,0.06)',
        letterSpacing: '-0.02em',
        userSelect: 'none',
      }}>
        {c.id}
      </div>
      <div style={{ position: 'relative', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {c.platform?.map(p => (
          <span key={p} style={{
            fontFamily: '"Play", sans-serif',
            fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--color-fg-mute)',
            border: '1px solid var(--color-rule)',
            padding: '2px 6px',
          }}>{p}</span>
        ))}
      </div>
    </div>
  );
}

// ── Floating cursor preview — follows mouse with spring lag ───────────────────
function CursorPreview({ items, hovered }) {
  const shouldReduce = useReducedMotion();
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const movedOnce = useRef(false);
  const [showable, setShowable] = useState(false);

  const springX = useSpring(mouseX, { stiffness: 160, damping: 22, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 160, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (shouldReduce) return;
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!movedOnce.current) { movedOnce.current = true; setShowable(true); }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY, shouldReduce]);

  if (shouldReduce) return null;

  const active = items.find(c => c.slug === hovered);

  return (
    <m.div
      aria-hidden="true"
      className="fixed pointer-events-none z-[90]"
      style={{ left: springX, top: springY, x: 28, y: -100, width: 400 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: (hovered && showable) ? 1 : 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      {/* Aspect-ratio shell — gives mode="sync" a stable container so both
          enter/exit frames coexist without pushing layout */}
      <div style={{
        position: 'relative',
        aspectRatio: '16/9',
        overflow: 'hidden',
        clipPath: 'polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px))',
        boxShadow: '0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)',
      }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,37,64,0.7)', zIndex: 10, pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,37,64,0.38)', zIndex: 10, pointerEvents: 'none' }} />
        <AnimatePresence mode="sync">
          {hovered && active && (
            <m.div
              key={hovered}
              initial={{
                clipPath: 'inset(0% 100% 0% 0%)',
                filter: 'saturate(0) brightness(2)',
              }}
              animate={{
                clipPath: 'inset(0% 0% 0% 0%)',
                filter: 'saturate(1) brightness(1)',
              }}
              exit={{
                clipPath: 'inset(0% 0% 0% 100%)',
                filter: 'saturate(0) brightness(2)',
                transition: {
                  clipPath: { duration: 0.1, ease: [0.4, 0, 1, 1] },
                  filter:   { duration: 0.05, ease: 'linear' },
                },
              }}
              transition={{
                clipPath: { duration: 0.18, ease: [0.32, 0.72, 0, 1] },
                filter:   { duration: 0.2, ease: EASE_OUT },
              }}
              style={{
                position: 'absolute',
                inset: 0,
                willChange: 'clip-path, filter',
              }}
            >
              <ThumbnailOrPlaceholder c={active} />
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                backgroundColor: 'var(--color-accent)', opacity: 0.6,
              }} />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
}

// ── Single case row ───────────────────────────────────────────────────────────
function CaseRow({ caseData, rowIndex, isHovered, onHover, lang, t }) {
  const vs = VISIBILITY_STYLE[caseData.visibility] || VISIBILITY_STYLE['legacy'];
  const statusLabel = t.caseStatuses?.[caseData.visibility] || caseData.status;
  const { navigateWithWipe } = usePageTransition();

  return (
    <m.article
      layout
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } }}
      transition={{ duration: 0.38, ease: EASE_OUT, delay: rowIndex * 0.05 }}
      onMouseEnter={() => onHover(caseData.slug)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Top rule */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px] transition-colors duration-300 pointer-events-none"
        style={{ backgroundColor: isHovered ? 'var(--color-accent-45)' : 'var(--color-rule)' }}
      />
      {/* Left accent bar */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
        style={{
          backgroundColor: 'var(--color-accent)',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          transition: 'opacity 0.25s, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}
      />


      <Link
        to={`/case/${caseData.slug}`}
        aria-label={`${caseData.title}`}
        style={{ textDecoration: 'none', display: 'block' }}
        onClick={(e) => {
          e.preventDefault();
          analytics.caseCardClick?.(caseData.slug, caseData.title);
          navigateWithWipe(`/case/${caseData.slug}`, {
            caseId: `CASE-${String(caseData.id ?? (cases.findIndex(c => c.slug === caseData.slug) + 1)).padStart(3, '0')}`,
            caseTitle: caseData.title,
          });
        }}
      >
        {/* Mobile thumbnail — desktop uses cursor-follow preview instead */}
        <div
          className="block sm:hidden"
          style={{ aspectRatio: '16/9', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <ThumbnailOrPlaceholder c={caseData} priority={rowIndex < 2} />
        </div>

        <div
          className="flex items-center gap-3 sm:gap-5 py-4 sm:py-7 pl-3 sm:pl-6 pr-3 sm:pr-8 transition-colors duration-200"
          style={{ backgroundColor: isHovered ? 'rgba(255,37,64,0.02)' : 'transparent' }}
        >
          {/* Index number */}
          <div
            className="flex-shrink-0 w-7 sm:w-10 tabular-nums transition-colors duration-200"
            style={{
              fontFamily: '"Play", sans-serif',
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: isHovered ? 'var(--color-accent)' : 'var(--color-accent-30)',
            }}
          >
            {String(rowIndex + 1).padStart(2, '0')}
          </div>

          {/* Main content */}
          <div className="flex-grow min-w-0">
            {/* Title + status */}
            <div className="flex items-baseline gap-3 flex-wrap mb-2">
              <h2
                className="uppercase transition-colors duration-200"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(1.1rem, 4vw, 3rem)',
                  lineHeight: 1,
                  letterSpacing: '0.01em',
                  color: isHovered ? 'var(--color-fg)' : 'rgba(240,238,234,0.78)',
                }}
              >
                {caseData.title}
              </h2>
              <span
                className="flex-shrink-0 flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-2 py-1 transition-opacity duration-200"
                style={{
                  fontFamily: '"Play", sans-serif',
                  color: vs.color,
                  border: `1px solid ${vs.border}`,
                  opacity: isHovered ? 1 : 0.6,
                }}
              >
                <StatusDiamond size={4} color={vs.color} filled />
                {statusLabel}
              </span>
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="sys-label transition-colors duration-200"
                style={{ color: isHovered ? 'var(--color-fg-dim)' : 'var(--color-fg-mute)' }}
              >
                {caseData.role}
              </span>
              <span className="sys-label opacity-40" aria-hidden>·</span>
              <span
                className="sys-label transition-colors duration-200"
                style={{ color: isHovered ? 'var(--color-fg-dim)' : 'var(--color-fg-mute)' }}
              >
                {caseData.year}
              </span>
              {caseData.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="hidden sm:inline text-[10px] tracking-widest uppercase px-2 py-0.5 transition-opacity duration-200"
                  style={{
                    fontFamily: '"Play", sans-serif',
                    border: '1px solid var(--color-rule)',
                    color: 'var(--color-fg-mute)',
                    opacity: isHovered ? 0.85 : 0.45,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: case ID + arrow */}
          <div className="hidden sm:flex flex-shrink-0 flex-col items-end gap-2 pl-4 min-w-[60px]">
            <div
              className="sys-label transition-colors duration-200"
              style={{ color: isHovered ? 'var(--color-accent)' : 'var(--color-fg-mute)' }}
            >
              {caseData.id}
            </div>
            <div
              aria-hidden="true"
              style={{
                fontSize: '18px',
                color: 'var(--color-accent)',
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
                transition: 'opacity 0.2s, transform 0.28s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              →
            </div>
          </div>
        </div>
      </Link>
    </m.article>
  );
}

// ── Mobile work card — split layout + sticky stacking ────────────────────────
// Emil principles:
//   props-clip-path-performant — clip-path reveal from bottom
//   ease-ios-drawer [0.32,0.72,0,1] — dramatic deceleration on entry
//   transform-scale-children — scroll-based scale dim on exit
//   interact-interruptible — Framer handles via animate prop
//   polish-blur-bridge — subtle filter on scale-down
const CHAMFER = 'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)';

function MobileWorkCard({ caseData, index, total }) {
  const cardRef = useRef(null);
  const shouldReduce = useReducedMotion();
  const { t } = useLang();
  const vs = VISIBILITY_STYLE[caseData.visibility] || VISIBILITY_STYLE['legacy'];
  const statusLabel = t.caseStatuses?.[caseData.visibility] || caseData.status;
  const [imgFailed, setImgFailed] = useState(false);

  // All hooks at top level — no conditional calls
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const dimRaw   = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.55]);
  const blurRaw  = useTransform(scrollYProgress, [0.65, 1], [0, 4]);
  const blurFilter = useTransform(blurRaw, v => `blur(${v}px)`);
  const smoothScale = useSpringValue(scaleRaw, { stiffness: 180, damping: 30 });
  const smoothDim   = useSpringValue(dimRaw,   { stiffness: 180, damping: 30 });

  return (
    <div
      ref={cardRef}
      style={{
        position: 'sticky',
        top: 68,
        zIndex: index + 1,
        width: '100%',
      }}
    >
      <m.article
        style={shouldReduce ? {} : {
          scale: smoothScale,
          opacity: smoothDim,
          filter: blurFilter,
          transformOrigin: 'top center',
        }}
        initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
        animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
        transition={{
          clipPath: { duration: 0.52, ease: [0.32, 0.72, 0, 1], delay: index * 0.05 },
          opacity:  { duration: 0.05, ease: 'linear', delay: index * 0.05 },
        }}
      >
        <Link
          to={`/case/${caseData.slug}`}
          style={{ textDecoration: 'none', display: 'block' }}
          onClick={() => analytics.caseCardClick?.(caseData.slug, caseData.title)}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 120px',
            minHeight: 148,
            overflow: 'hidden',
            backgroundColor: 'var(--color-bg)',
            borderBottom: '1px solid var(--color-rule)',
            borderTop: index === 0 ? '1px solid var(--color-rule)' : 'none',
          }}>

            {/* ── Left: text info ─────────────────────────────── */}
            <div style={{ padding: '18px 10px 18px 16px', minWidth: 0 }}>
              <div style={{
                fontFamily: '"Play", sans-serif',
                fontSize: '9px', letterSpacing: '0.16em',
                color: 'var(--color-accent-45)', marginBottom: 8,
              }}>
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </div>

              <h2 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(1.3rem, 4.8vw, 1.75rem)',
                lineHeight: 0.94, letterSpacing: '0.01em',
                color: 'var(--color-fg)', textTransform: 'uppercase',
                marginBottom: 10,
              }}>
                {caseData.title}
              </h2>

              <div className="sys-label" style={{ marginBottom: 7, color: 'var(--color-fg-dim)' }}>
                {caseData.role} · {caseData.year}
              </div>

              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontFamily: '"Play", sans-serif',
                fontSize: '9px', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: vs.color,
              }}>
                <StatusDiamond size={3} color={vs.color} filled />
                {statusLabel}
              </span>
            </div>

            {/* ── Right: chamfered cyberpunk thumbnail ────────── */}
            {/* Padding creates the inset margins; inner div fills via height: 100% */}
            <div style={{ padding: '10px 10px 10px 0', position: 'relative' }}>
              {/* Glow behind the frame */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 60% 50%, var(--color-accent-08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* Chamfered frame — fills padded space naturally */}
              <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                clipPath: CHAMFER,
                overflow: 'hidden',
                backgroundColor: '#080808',
              }}>
                {!imgFailed ? (
                  <img
                    src={`/thumbnails/${caseData.slug}.webp`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                    onError={() => setImgFailed(true)}
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '2rem', color: 'var(--color-accent-08)',
                  }}>
                    {caseData.id}
                  </div>
                )}
                {/* Accent line */}
                <div aria-hidden="true" style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  backgroundColor: 'var(--color-accent)',
                }} />
                {/* Bottom scrim */}
                <div aria-hidden="true" style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                  background: 'linear-gradient(transparent, rgba(6,6,6,0.85))',
                  pointerEvents: 'none',
                }} />
                {/* ID stamp */}
                <div style={{
                  position: 'absolute', bottom: 5, right: 6,
                  fontFamily: '"Play", sans-serif',
                  fontSize: '7px', letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
                  userSelect: 'none',
                }}>
                  {caseData.id}
                </div>
              </div>

              {/* Corner brackets — outside the clipPath, on the padding container */}
              {[
                { top: 5, right: 5, borderTop: '1.5px solid var(--color-accent)', borderRight: '1.5px solid var(--color-accent)' },
                { bottom: 5, right: 5, borderBottom: '1.5px solid var(--color-accent)', borderRight: '1.5px solid var(--color-accent)' },
                { top: 5, left: -4, borderTop: '1.5px solid var(--color-accent)', borderLeft: '1.5px solid var(--color-accent)' },
                { bottom: 5, left: -4, borderBottom: '1.5px solid var(--color-accent)', borderLeft: '1.5px solid var(--color-accent)' },
              ].map((s, i) => (
                <div key={i} aria-hidden="true" style={{ position: 'absolute', width: 8, height: 8, ...s }} />
              ))}
            </div>

          </div>
        </Link>
      </m.article>
    </div>
  );
}

// ── Grid card — image-forward layout for gallery view ────────────────────────
function WorkGridCard({ caseData, index }) {
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const { t } = useLang();
  const vs = VISIBILITY_STYLE[caseData.visibility] || VISIBILITY_STYLE['legacy'];
  const statusLabel = t.caseStatuses?.[caseData.visibility] || caseData.status;

  return (
    <m.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.38, ease: EASE_OUT, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        to={`/case/${caseData.slug}`}
        style={{ textDecoration: 'none', display: 'block' }}
        onClick={() => analytics.caseCardClick?.(caseData.slug, caseData.title)}
      >
        {/* Thumbnail */}
        <div
          style={{
            aspectRatio: '16/9',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: '#000',
          }}
        >
          {!imgFailed ? (
            <img
              src={`/thumbnails/${caseData.slug}.webp`}
              alt={caseData.thumbnailAlt || caseData.title}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 0.55s cubic-bezier(0.32,0.72,0,1)',
              }}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'rgba(14,3,6,0.95)',
            }}>
              <span style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '5rem', color: 'var(--color-accent-08)',
                letterSpacing: '-0.02em', userSelect: 'none',
              }}>{caseData.id}</span>
            </div>
          )}

          {/* Red accent line — slides in on hover */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            backgroundColor: 'var(--color-accent)',
            transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.28s cubic-bezier(0.32,0.72,0,1)',
          }} />

          {/* Bottom scrim for legibility */}
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
            background: 'linear-gradient(transparent, rgba(8,8,8,0.7))',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
          }} />

          {/* Case ID watermark */}
          <div style={{
            position: 'absolute', bottom: 10, right: 12,
            fontFamily: '"Play", sans-serif',
            fontSize: '9px', letterSpacing: '0.18em',
            color: hovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.18)',
            transition: 'color 0.2s', userSelect: 'none',
          }}>
            {caseData.id}
          </div>
        </div>

        {/* Card body */}
        <div style={{
          padding: '14px 0 18px',
          borderBottom: '1px solid var(--color-rule)',
        }}>
          {/* Status + arrow row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: '"Play", sans-serif',
              fontSize: '9px', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: vs.color,
              border: `1px solid ${vs.border}`,
              padding: '2px 6px',
              opacity: hovered ? 1 : 0.65,
              transition: 'opacity 0.2s',
            }}>
              <StatusDiamond size={4} color={vs.color} filled />
              {statusLabel}
            </span>
            <span aria-hidden="true" style={{
              color: 'var(--color-accent)',
              fontSize: '14px',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
              transition: 'opacity 0.2s, transform 0.28s cubic-bezier(0.16,1,0.3,1)',
            }}>→</span>
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
            lineHeight: 0.95,
            letterSpacing: '0.01em',
            color: hovered ? 'var(--color-fg)' : 'rgba(240,238,234,0.82)',
            transition: 'color 0.2s',
            marginBottom: 8,
            textTransform: 'uppercase',
          }}>
            {caseData.title}
          </h2>

          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span className="sys-label" style={{
              color: hovered ? 'var(--color-fg-dim)' : 'var(--color-fg-mute)',
              transition: 'color 0.2s',
            }}>{caseData.role}</span>
            <span className="sys-label" style={{ opacity: 0.35 }}>·</span>
            <span className="sys-label" style={{
              color: hovered ? 'var(--color-fg-dim)' : 'var(--color-fg-mute)',
              transition: 'color 0.2s',
            }}>{caseData.year}</span>
          </div>
        </div>
      </Link>
    </m.article>
  );
}

// SVG icons for view toggle
function IconList() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect y="1" width="14" height="1.5" fill="currentColor" rx="0.5" />
      <rect y="6.25" width="14" height="1.5" fill="currentColor" rx="0.5" />
      <rect y="11.5" width="14" height="1.5" fill="currentColor" rx="0.5" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect width="6" height="6" rx="0.5" fill="currentColor" />
      <rect x="8" width="6" height="6" rx="0.5" fill="currentColor" />
      <rect y="8" width="6" height="6" rx="0.5" fill="currentColor" />
      <rect x="8" y="8" width="6" height="6" rx="0.5" fill="currentColor" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function WorkPage({ onMenuOpen }) {
  const [active, setActive] = useState('All');
  const [hovered, setHovered] = useState(null);
  const [view, setView] = useState(() => {
    try { return localStorage.getItem('work-view') || 'list'; } catch { return 'list'; }
  });
  const { t, lang } = useLang();

  usePageMeta({
    title: lang === 'es' ? 'Trabajo seleccionado' : 'Selected Work',
    description: lang === 'es'
      ? 'Casos de estudio de Game UX/UI, UEFN, VR y sistemas de interfaz por Andrés Felipe Pisso. Cada caso documenta el problema real de diseño, el rol y las decisiones que dieron forma al trabajo.'
      : 'Selected UX/UI case studies by Andrés Felipe Pisso covering game UX, UI systems, HUD clarity, UEFN, VR interfaces, LiveOps UX, accessibility and player decision-making.',
  });

  useEffect(() => {
    const schemaId = 'ld-json-work';
    let el = document.getElementById(schemaId);
    const schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL + '/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Selected Work', 'item': BASE_URL + '/work' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': BASE_URL + '/work#page',
        'name': 'Selected Work',
        'description': 'Selected UX/UI case studies by Andrés Felipe Pisso covering game UX, UI systems, HUD clarity, UEFN, VR interfaces, LiveOps UX, and player decision-making.',
        'url': BASE_URL + '/work',
        'author': { '@id': BASE_URL + '/#person' },
        'isPartOf': { '@id': BASE_URL + '/#website' },
        'hasPart': cases.map(c => ({
          '@type': 'CreativeWork',
          'url': `${BASE_URL}/case/${c.slug}`,
          'name': c.title,
          'description': c.description,
          'author': { '@id': BASE_URL + '/#person' },
        })),
      },
    ];
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = schemaId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => { const s = document.getElementById(schemaId); if (s) s.remove(); };
  }, []);

  const visible = cases.filter(c => matchFilter(active, c)).sort((a, b) => {
    const ai = CASE_ORDER.indexOf(a.slug);
    const bi = CASE_ORDER.indexOf(b.slug);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
      {/* Cursor preview rendered outside main to avoid overflow clipping */}
      <CursorPreview items={visible} hovered={hovered} />

      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />

      <main id="main-content">

        {/* ── Page header ─────────────────────────────────────────────────────── */}
        <section
          className="pt-40 pb-20 relative overflow-hidden"
          style={{ borderBottom: '1px solid var(--color-rule)' }}
        >
          {/* Large decorative case count — spatial depth, barely visible */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
            aria-hidden="true"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(10rem, 28vw, 30rem)',
              color: 'rgba(255,255,255,0.02)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            {String(cases.length).padStart(2, '0')}
          </div>

          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <m.div
              className="mb-8"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <SectionTag label={t.caseFiles.label} page="003" />
            </m.div>

            <m.h1
              className="uppercase mb-6"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                color: 'var(--color-fg)',
                lineHeight: 0.88,
                letterSpacing: '0.02em',
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.05 }}
            >
              {t.caseFiles.label.split(' ').slice(0, -1).join(' ')}<br />
              <ScrambleText duration={480}>
                {t.caseFiles.label.split(' ').slice(-1).join(' ')}
              </ScrambleText>
            </m.h1>

            {t.caseFiles.sectionTitle && (
              <m.p
                className="uppercase mb-6"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(1rem, 2vw, 1.45rem)',
                  color: 'var(--color-fg-dim)',
                  lineHeight: 1.3,
                  letterSpacing: '0.04em',
                  whiteSpace: 'pre-line',
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.08 }}
              >
                {t.caseFiles.sectionTitle}
              </m.p>
            )}

            <m.p
              style={{
                fontFamily: '"Play", sans-serif',
                fontSize: '13px',
                color: 'var(--color-fg-dim)',
                lineHeight: 1.85,
                maxWidth: '520px',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.14 }}
            >
              {t.caseFiles.description}
            </m.p>
          </div>
        </section>

        {/* ── Filter bar + case list ──────────────────────────────────────────── */}
        <section className="py-12">
          <div className="max-w-[1400px] mx-auto px-6">

            {/* Filter bar — animated active underline via layoutId */}
            <m.div
              className="flex sm:flex-wrap items-baseline gap-x-4 sm:gap-x-6 gap-y-2 mb-10 overflow-x-auto sm:overflow-visible"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              role="group"
              aria-label="Filter projects"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.15 }}
            >
              <span
                style={{
                  fontFamily: '"Play", sans-serif',
                  fontSize: '9px',
                  letterSpacing: '0.16em',
                  color: 'var(--color-fg-mute)',
                  textTransform: 'uppercase',
                  userSelect: 'none',
                }}
              >
                Filter:
              </span>

              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => { setActive(f); setHovered(null); analytics.filterUse(f); }}
                  aria-pressed={active === f}
                  className={`relative transition-colors duration-200 ${active === f ? 'text-[var(--color-fg)]' : 'text-[var(--color-fg-mute)] hover:text-[var(--color-fg-dim)]'}`}
                  style={{
                    fontFamily: '"Play", sans-serif',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    backgroundColor: 'transparent',
                    border: 'none',
                    paddingBottom: '3px',
                    cursor: 'pointer',
                    minHeight: '44px',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  {t.caseFiles.filterLabels?.[f] ?? f}
                  {active === f && (
                    <m.span
                      layoutId="filter-active-line"
                      className="absolute bottom-0 left-0 right-0"
                      style={{ height: '1px', backgroundColor: 'var(--color-accent)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              ))}

              <span className="sys-label" style={{ color: 'var(--color-fg-mute)' }}>
                — {visible.length} {visible.length !== 1 ? t.caseFiles.projects : t.caseFiles.project}
              </span>

              {/* View toggle — pushed to far right */}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                {[
                  { id: 'list', Icon: IconList,  label: 'List view'  },
                  { id: 'grid', Icon: IconGrid,  label: 'Grid view'  },
                ].map(({ id, Icon, label }) => (
                  <button
                    key={id}
                    aria-label={label}
                    aria-pressed={view === id}
                    onClick={() => {
                      setView(id);
                      setHovered(null);
                      try { localStorage.setItem('work-view', id); } catch {}
                    }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 32, height: 32,
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: view === id ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                      transition: 'color 0.18s',
                    }}
                    onMouseEnter={e => { if (view !== id) e.currentTarget.style.color = 'var(--color-fg-dim)'; }}
                    onMouseLeave={e => { if (view !== id) e.currentTarget.style.color = 'var(--color-fg-mute)'; }}
                  >
                    <Icon />
                  </button>
                ))}
              </div>
            </m.div>

            {/* ── List view ──────────────────────────────────────────────────── */}
            {view === 'list' && (
              <div>
                {/* Desktop list — text rows with CursorPreview */}
                <div className="hidden sm:block">
                  <AnimatePresence mode="popLayout">
                    {visible.map((c, i) => (
                      <CaseRow
                        key={c.id}
                        caseData={c}
                        rowIndex={i}
                        isHovered={hovered === c.slug}
                        onHover={setHovered}
                        lang={lang}
                        t={t}
                      />
                    ))}
                  </AnimatePresence>

                  {visible.length > 0 && (
                    <m.div layout className="h-[1px]" style={{ backgroundColor: 'var(--color-rule)' }} />
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <SignalTrigger id="sig-work" prominence="medium" style={{ padding: '6px 0' }} />
                  </div>
                </div>

                {/* Mobile list — split card with sticky stacking */}
                <div className="sm:hidden">
                  {visible.map((c, i) => (
                    <MobileWorkCard
                      key={c.id}
                      caseData={c}
                      index={i}
                      total={visible.length}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Grid view ──────────────────────────────────────────────────── */}
            {view === 'grid' && (
              <AnimatePresence mode="popLayout">
                <m.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10"
                >
                  {visible.map((c, i) => (
                    <WorkGridCard key={c.id} caseData={c} index={i} />
                  ))}
                </m.div>
              </AnimatePresence>
            )}

            {visible.length === 0 && (
              <m.div
                className="py-24 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p style={{ fontFamily: '"Play", sans-serif', fontSize: '13px', color: 'var(--color-fg-mute)' }}>
                  {t.caseFiles.noProjects}
                </p>
              </m.div>
            )}

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
