/**
 * CaseRail — 3D perspective carousel for case-to-case navigation.
 *
 * Renders all cases except the current one. Auto-advances every 4s,
 * pauses on hover. Supports drag-to-swipe, keyboard (←/→), and
 * scroll-wheel navigation.
 *
 * Design: 16:9 landscape cards, Bebas Neue titles, Play meta,
 * --color-accent red on active card, ambient bg blur from active thumbnail.
 * All motion via transform + opacity only. Respects useReducedMotion.
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cases, CASE_ORDER } from '../data/cases';
import { useLang } from '../contexts/LangContext';

// ── Constants ─────────────────────────────────────────────────────────────────
const EASE_OUT   = [0.16, 1, 0.3, 1];
const EASE_IN    = [0.4,  0, 1,  1];

const ACCENT_HEX    = '#ff2540';
const CHAMFER_C     = 16; // center card — clearly visible
const CHAMFER_S     = 6;  // side cards — subtle

function railChamfer(n) {
  return `polygon(0 0, calc(100% - ${n}px) 0, 100% ${n}px, 100% 100%, ${n}px 100%, 0 calc(100% - ${n}px))`;
}
// SVG polygon points for the chamfer shape at exact card dimensions
function railSvgPoints(w, h, n) {
  return `0,0 ${w - n},0 ${w},${n} ${w},${h} ${n},${h} 0,${h - n}`;
}
const BASE_SPRING = { type: 'spring', stiffness: 280, damping: 26, mass: 0.85 };
const TAP_SPRING  = { type: 'spring', stiffness: 420, damping: 20, mass: 0.85 };

const CARD_W        = 380;   // px — center card width
const CARD_ASPECT   = 9 / 16; // height = CARD_W * CARD_ASPECT
const CARD_H        = Math.round(CARD_W * CARD_ASPECT); // 213px
const X_STEP        = 360;   // px gap between card centers
const AUTOPLAY_MS   = 4000;

// ── Helpers ───────────────────────────────────────────────────────────────────
function wrap(min, max, v) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

// ── Thumbnail sub-component ───────────────────────────────────────────────────
// Keyed externally on slug so failed state resets when the item changes.
function RailThumb({ slug, id, isCenter }) {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      <img
        src={`/thumbnails/${slug}.webp`}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover pointer-events-none"
        onError={() => setFailed(true)}
        loading="eager"
        decoding="async"
      />
    );
  }

  // Fallback: dark card with ID watermark
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(14,3,6,0.95)',
        border: '1px solid rgba(255,37,64,0.1)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '3.5rem',
          color: isCenter ? 'var(--red-dim)' : 'rgba(255,37,64,0.05)',
          letterSpacing: '-0.02em',
          userSelect: 'none',
        }}
      >
        {id}
      </span>
    </div>
  );
}

// ── Single 3D card ────────────────────────────────────────────────────────────
function RailCard({ item, offset, onClickOffset, shouldReduce, navigate, isCurrent }) {
  const isCenter  = offset === 0;
  const dist      = Math.abs(offset);
  const [hovered, setHovered] = useState(false);

  // Spatial transforms — disabled for reduced motion (flat fade instead)
  const xPos    = shouldReduce ? 0         : offset * X_STEP;
  const zPos    = shouldReduce ? 0         : -dist * 140;
  const rotY    = shouldReduce ? 0         : offset * -16;
  const scale   = isCenter    ? 1          : dist === 1 ? 0.82 : 0.66;
  const opacity = isCenter    ? 1          : dist === 1 ? 0.52 : 0.22;
  const blurPx  = shouldReduce || isCenter ? 0 : dist * 4;
  const bright  = isCenter    ? 1          : 0.45;

  return (
    <m.div
      className="absolute"
      style={{
        width:  CARD_W,
        height: CARD_H,
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
      initial={false}
      animate={{
        x:       xPos,
        z:       zPos,
        rotateY: rotY,
        scale,
        opacity,
        filter: `blur(${blurPx}px) brightness(${bright})`,
      }}
      transition={{
        x:       BASE_SPRING,
        z:       BASE_SPRING,
        rotateY: BASE_SPRING,
        scale:   TAP_SPRING,
        opacity: { duration: 0.32, ease: EASE_OUT },
        filter:  { duration: 0.32, ease: EASE_OUT },
      }}
      onClick={() => {
        if (isCenter) {
          if (!isCurrent) navigate(`/case/${item.slug}`);
        } else {
          onClickOffset(offset);
        }
      }}
      onMouseEnter={() => { if (isCenter) setHovered(true);  }}
      onMouseLeave={() => { if (isCenter) setHovered(false); }}
      whileTap={{ scale: isCenter ? scale * 0.985 : scale * 0.97 }}
    >
      {/* HUD frame — clip-path in card-local space so chamfer stays correct under rotateY */}
      <div style={{
        position: 'relative',
        width: '100%', height: '100%',
        overflow: 'hidden',
        clipPath: railChamfer(isCenter ? CHAMFER_C : CHAMFER_S),
        boxShadow: isCenter ? 'none' : 'inset 0 0 0 1px rgba(255,255,255,0.05)',
      }}>

        {/* Thumbnail */}
        <RailThumb key={item.slug} slug={item.slug} id={item.id} isCenter={isCenter} />

        {/* Bottom gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.4) 42%, transparent 72%)' }}
        />

        {/* Bevel HUD — top + left accent lines on center card; clip-path handles chamfer corners */}
        {isCenter && (
          <>
            <div aria-hidden="true" style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              backgroundColor: hovered ? 'rgba(255,37,64,0.95)' : 'rgba(255,37,64,0.55)',
              zIndex: 6, pointerEvents: 'none',
              transition: 'background-color 0.22s ease',
            }} />
            <div aria-hidden="true" style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: 1,
              backgroundColor: hovered ? 'rgba(255,37,64,0.65)' : 'rgba(255,37,64,0.28)',
              zIndex: 6, pointerEvents: 'none',
              transition: 'background-color 0.22s ease',
            }} />
          </>
        )}

        {/* Case ID — top left */}
        <div
          className="absolute top-2.5 left-3 pointer-events-none flex items-center gap-1.5"
          style={{
            fontFamily:    '"Play", sans-serif',
            fontSize:      '8px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: isCenter ? 'var(--color-accent)' : 'var(--color-accent-40)',
          }}
        >
          {item.id}
          {isCurrent && isCenter && (
            <span style={{ fontSize: '7px', letterSpacing: '0.12em', color: 'var(--color-fg-mute)', borderLeft: '1px solid var(--color-rule)', paddingLeft: 6 }}>
              CURRENT
            </span>
          )}
        </div>

        {/* Bottom: title + platform row */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 pointer-events-none">
          <div
            style={{
              fontFamily:    '"Bebas Neue", sans-serif',
              fontSize:      'clamp(0.85rem, 2vw, 1.05rem)',
              lineHeight:    1.05,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color:         isCenter ? 'rgba(240,238,234,0.92)' : 'rgba(240,238,234,0.55)',
            }}
          >
            {item.title}
          </div>
          {isCenter && item.platform?.length > 0 && (
            <div style={{ marginTop: 5, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {item.platform.slice(0, 2).map(p => (
                <span key={p} style={{
                  fontFamily: '"Play", sans-serif',
                  fontSize: '7px', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--color-fg-mute)',
                  borderLeft: '1px solid var(--color-accent-30)',
                  paddingLeft: 5,
                }}>
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Center card hover reveal */}
        {isCenter && (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              background: hovered ? 'rgba(8,8,8,0.32)' : 'rgba(8,8,8,0)',
              transition: 'background 0.22s ease',
            }}
          >
            <span style={{
              fontFamily:    '"Play", sans-serif',
              fontSize:      '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         '#fff',
              border:        '1px solid rgba(255,255,255,0.28)',
              padding:       '6px 14px',
              opacity:       hovered ? 1 : 0,
              transform:     hovered ? 'translateY(0)' : 'translateY(4px)',
              transition:    'opacity 0.2s ease, transform 0.22s ease',
            }}>
              OPEN CASE →
            </span>
          </div>
        )}

      </div>
    </m.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function CaseRail({ currentSlug }) {
  const { t }        = useLang();
  const navigate     = useNavigate();
  const shouldReduce = useReducedMotion();

  const items = useMemo(() =>
    cases
      .filter(c => c.content)
      .sort((a, b) => {
        const ai = CASE_ORDER.indexOf(a.slug);
        const bi = CASE_ORDER.indexOf(b.slug);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      }),
  []);
  const count = items.length;

  const [active,     setActive]     = useState(() => {
    const idx = items.findIndex(c => c.slug === currentSlug);
    return idx >= 0 ? idx : 0;
  });
  const [isHovering, setIsHovering] = useState(false);
  const lastWheelTime = useRef(0);

  // Directional cursor zone tracking
  const stageRef    = useRef(null);
  const [cursorZone, setCursorZone] = useState(null); // 'prev' | 'next' | null
  const [cursorPos,  setCursorPos]  = useState({ x: 0, y: 0 });

  // Re-center on the current case when navigating between case pages
  useEffect(() => {
    const idx = items.findIndex(c => c.slug === currentSlug);
    setActive(idx >= 0 ? idx : 0);
  }, [currentSlug]); // items is stable (useMemo with no deps)

  const activeIndex = wrap(0, count, active);
  const activeItem  = items[activeIndex] ?? null;

  const handlePrev = useCallback(() => setActive(p => p - 1), []);
  const handleNext = useCallback(() => setActive(p => p + 1), []);

  const handleStageMouseMove = useCallback((e) => {
    if (!stageRef.current) return;
    const rect  = stageRef.current.getBoundingClientRect();
    const x     = e.clientX - rect.left;
    const y     = e.clientY - rect.top;
    const third = rect.width / 3;
    setCursorPos({ x, y });
    if (x < third)              setCursorZone('prev');
    else if (x > rect.width - third) setCursorZone('next');
    else                        setCursorZone(null);
  }, []);

  const handleStageMouseLeave = useCallback(() => setCursorZone(null), []);

  const handleStageClick = useCallback((e) => {
    // Only fire zone navigation when click is in a directional zone
    if (!stageRef.current) return;
    const rect  = stageRef.current.getBoundingClientRect();
    const x     = e.clientX - rect.left;
    const third = rect.width / 3;
    if (x < third)                   handlePrev();
    else if (x > rect.width - third) handleNext();
  }, [handlePrev, handleNext]);

  // Autoplay — pauses while hovering or under reduced-motion
  useEffect(() => {
    if (isHovering || shouldReduce || count === 0) return;
    const id = setInterval(handleNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isHovering, shouldReduce, handleNext, count]);

  // Keyboard
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft')  handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  // Mouse wheel / trackpad (400ms debounce against inertia)
  const onWheel = useCallback((e) => {
    const now  = Date.now();
    if (now - lastWheelTime.current < 400) return;
    const isH  = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const delta = isH ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 20) {
      delta > 0 ? handleNext() : handlePrev();
      lastWheelTime.current = now;
    }
  }, [handleNext, handlePrev]);

  // Drag / swipe
  const onDragEnd = useCallback((_, { offset, velocity }) => {
    const power = Math.abs(offset.x) * velocity.x;
    if (power < -8000) handleNext();
    else if (power > 8000) handlePrev();
  }, [handleNext, handlePrev]);

  if (count === 0 || !activeItem) return null;

  // Visible offsets: -2, -1, 0, +1, +2
  const visibleOffsets = [-2, -1, 0, 1, 2];

  return (
    <section
      className="relative outline-none overflow-x-hidden"
      style={{ borderTop: '1px solid var(--color-rule)' }}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onWheel={onWheel}
      aria-label="More case studies"
    >
      {/* ── Ambient background blur ── */}
      {!shouldReduce && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ overflow: 'hidden' }}
        >
          <AnimatePresence mode="popLayout">
            <m.div
              key={`rail-bg-${activeItem.slug}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              className="absolute inset-0"
            >
              <img
                src={`/thumbnails/${activeItem.slug}.jpg`}
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: 'blur(70px)', transform: 'scale(1.25)', opacity: 0.22 }}
                onError={() => {}}
              />
              {/* Vignette fades: top + bottom */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, var(--color-bg) 0%, transparent 25%, transparent 72%, var(--color-bg) 100%)',
                }}
              />
              {/* Left + right side fade */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 20%, transparent 80%, var(--color-bg) 100%)',
                }}
              />
            </m.div>
          </AnimatePresence>
        </div>
      )}

      {/* ── Content ── */}
      <div className="relative z-10 py-20 px-6">

        {/* Section label */}
        <div className="mb-14 flex items-center gap-4">
          <span
            style={{
              fontFamily:    '"Play", sans-serif',
              fontSize:      '9px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'var(--color-accent)',
              flexShrink:    0,
            }}
          >
            MORE CASES
          </span>
          <div
            className="flex-1 h-[1px]"
            style={{ backgroundColor: 'var(--color-rule)' }}
          />
          <span
            style={{
              fontFamily:    '"Play", sans-serif',
              fontSize:      '9px',
              letterSpacing: '0.14em',
              color:         'var(--color-fg-mute)',
              flexShrink:    0,
            }}
          >
            {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>

        {/* ── Card Stage ── */}
        <div
          ref={stageRef}
          style={{
            height:            CARD_H + 20,
            perspective:       '1200px',
            perspectiveOrigin: '50% 50%',
            overflow:          'hidden',
            position:          'relative',
            cursor:            cursorZone === 'prev' ? 'w-resize' : cursorZone === 'next' ? 'e-resize' : 'grab',
          }}
          onMouseMove={handleStageMouseMove}
          onMouseLeave={handleStageMouseLeave}
          onClick={handleStageClick}
        >
          {/* Floating directional cursor pill */}
          {!shouldReduce && cursorZone && (
            <m.div
              key={cursorZone}
              aria-hidden="true"
              style={{
                position:      'absolute',
                left:          cursorPos.x,
                top:           cursorPos.y,
                transform:     'translate(-50%, -50%)',
                zIndex:        20,
                pointerEvents: 'none',
                display:       'flex',
                alignItems:    'center',
                gap:           8,
                padding:       '7px 14px',
                backgroundColor: 'rgba(8,8,8,0.82)',
                border:        '1px solid var(--color-accent-30)',
                backdropFilter: 'blur(6px)',
              }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{ fontFamily: '"Play", sans-serif', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                {cursorZone === 'prev' ? '←' : '→'}
              </span>
              <span style={{ fontFamily: '"Play", sans-serif', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-fg-mute)' }}>
                {cursorZone === 'prev' ? 'prev' : 'next'}
              </span>
            </m.div>
          )}
          {/* Draggable rail */}
          <m.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={onDragEnd}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            style={{
              transformStyle: 'preserve-3d',
              position:       'relative',
            }}
          >
            {/* Center origin: cards are absolutely positioned from here */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {visibleOffsets.map(offset => {
                const absIdx = active + offset;
                const idx    = wrap(0, count, absIdx);
                const item   = items[idx];

                return (
                  <RailCard
                    key={absIdx}
                    item={item}
                    offset={offset}
                    onClickOffset={(o) => setActive(p => p + o)}
                    shouldReduce={shouldReduce}
                    navigate={navigate}
                    isCurrent={item.slug === currentSlug}
                  />
                );
              })}
            </div>
          </m.div>
        </div>

        {/* ── Info + Controls ── */}
        <div
          className="mt-10 flex items-end justify-between gap-6 flex-wrap max-w-5xl mx-auto"
        >

          {/* Active case meta — fades on change */}
          <div style={{ minHeight: 80 }}>
            <AnimatePresence mode="wait">
              <m.div
                key={activeItem.slug}
                initial={{ opacity: 0, y: 8,  filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                exit={  { opacity: 0, y: -6,  filter: 'blur(5px)' }}
                transition={{ duration: 0.24, ease: EASE_OUT }}
              >
                {/* Role · Year */}
                <div
                  className="mb-1"
                  style={{
                    fontFamily:    '"Play", sans-serif',
                    fontSize:      '9px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color:         'var(--color-accent)',
                  }}
                >
                  {activeItem.role}{activeItem.year ? ` · ${activeItem.year}` : ''}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily:    '"Bebas Neue", sans-serif',
                    fontSize:      'clamp(1.8rem, 4vw, 3rem)',
                    lineHeight:    1,
                    letterSpacing: '0.01em',
                    textTransform: 'uppercase',
                    color:         'var(--color-fg)',
                  }}
                >
                  {activeItem.title}
                </h3>

                {/* Platform tags */}
                <div className="mt-2 flex gap-1.5 flex-wrap">
                  {activeItem.platform?.slice(0, 3).map(p => (
                    <span
                      key={p}
                      style={{
                        fontFamily:    '"Play", sans-serif',
                        fontSize:      '8px',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color:         'var(--color-fg-mute)',
                        border:        '1px solid var(--color-rule)',
                        padding:       '2px 6px',
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Controls row — minimal ghost nav + subtle CTA */}
          <div className="flex items-center gap-5 flex-shrink-0">

            {/* Ghost ← counter → */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous case"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--color-fg-mute)', fontSize: '15px', lineHeight: 1,
                  padding: '4px', transition: 'color 0.18s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-fg-mute)'}
              >
                ←
              </button>
              <span style={{ fontFamily: '"Play", sans-serif', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--color-fg-mute)', userSelect: 'none' }}>
                {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <button
                onClick={handleNext}
                aria-label="Next case"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--color-fg-mute)', fontSize: '15px', lineHeight: 1,
                  padding: '4px', transition: 'color 0.18s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-fg-mute)'}
              >
                →
              </button>
            </div>

            {/* Subtle text CTA */}
            <Link
              to={`/case/${activeItem.slug}`}
              style={{
                fontFamily: '"Play", sans-serif', fontSize: '9px',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--color-accent)', textDecoration: 'none',
                borderBottom: '1px solid var(--color-accent-30)',
                paddingBottom: '2px', transition: 'border-color 0.18s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-accent-30)'}
            >
              open case →
            </Link>
          </div>
        </div>

        {/* Interaction hint — swipe on mobile, hover zones on desktop */}
        <div className="mt-5 flex justify-center" aria-hidden="true">
          <span style={{ fontFamily: '"Play", sans-serif', fontSize: '8px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-fg-mute)', opacity: 0.35 }}>
            <span className="md:hidden">← swipe →</span>
            <span className="hidden md:inline">hover · drag · ←→</span>
          </span>
        </div>

      </div>
    </section>
  );
}
