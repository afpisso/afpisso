/**
 * CaseRail — 3D perspective carousel for case-to-case navigation.
 *
 * Renders all cases except the current one. Auto-advances every 4s,
 * pauses on hover. Supports drag-to-swipe, keyboard (←/→), and
 * scroll-wheel navigation.
 *
 * Design: 16:9 landscape cards, Bebas Neue titles, JetBrains Mono meta,
 * --color-accent red on active card, ambient bg blur from active thumbnail.
 * All motion via transform + opacity only. Respects useReducedMotion.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cases }  from '../data/cases';
import { useLang } from '../contexts/LangContext';

// ── Constants ─────────────────────────────────────────────────────────────────
const EASE_OUT   = [0.16, 1, 0.3, 1];
const EASE_IN    = [0.4,  0, 1,  1];
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
        src={`/thumbnails/${slug}.jpg`}
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
          color: isCenter ? 'rgba(255,37,64,0.12)' : 'rgba(255,37,64,0.05)',
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
function RailCard({ item, offset, onClickOffset, shouldReduce, navigate }) {
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
      // key provided by parent for AnimatePresence indexing
      className="absolute"
      style={{
        width:  CARD_W,
        height: CARD_H,
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: 2,
        textDecoration: 'none',
      }}
      initial={false}
      animate={{
        x:      xPos,
        z:      zPos,
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
          navigate(`/case/${item.slug}`);
        } else {
          onClickOffset(offset);
        }
      }}
      onMouseEnter={() => { if (isCenter) setHovered(true);  }}
      onMouseLeave={() => { if (isCenter) setHovered(false); }}
      whileTap={{ scale: isCenter ? scale * 0.985 : scale * 0.97 }}
    >
      {/* Thumbnail (keyed on slug so failed state resets on item change) */}
      <RailThumb key={item.slug} slug={item.slug} id={item.id} isCenter={isCenter} />

      {/* Bottom gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.35) 38%, transparent 68%)',
        }}
      />

      {/* Top: red accent line (center only) + case ID */}
      {isCenter && (
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
      )}
      <div
        className="absolute top-3 left-3 pointer-events-none"
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize:   '8px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: isCenter ? 'var(--color-accent)' : 'rgba(255,37,64,0.4)',
        }}
      >
        {item.id}
      </div>

      {/* Bottom: title overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 pb-3 pointer-events-none"
      >
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
      </div>

      {/* Center card: hover reveal — "OPEN CASE →" */}
      {isCenter && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            background: hovered ? 'rgba(8,8,8,0.38)' : 'rgba(8,8,8,0)',
            transition: 'background 0.22s ease',
          }}
        >
          <span
            style={{
              fontFamily:    '"JetBrains Mono", monospace',
              fontSize:      '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         '#fff',
              border:        '1px solid rgba(255,255,255,0.28)',
              padding:       '6px 14px',
              opacity:       hovered ? 1 : 0,
              transform:     hovered ? 'translateY(0)' : 'translateY(4px)',
              transition:    'opacity 0.2s ease, transform 0.22s ease',
            }}
          >
            OPEN CASE →
          </span>
        </div>
      )}
    </m.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function CaseRail({ currentSlug }) {
  const { t }        = useLang();
  const navigate     = useNavigate();
  const shouldReduce = useReducedMotion();

  // Items: all cases with content, minus the one currently being viewed
  const items = cases.filter(c => c.content && c.slug !== currentSlug);
  const count = items.length;

  const [active,     setActive]     = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const lastWheelTime = useRef(0);

  // Reset to 0 whenever the page case changes
  useEffect(() => { setActive(0); }, [currentSlug]);

  const activeIndex = wrap(0, count, active);
  const activeItem  = items[activeIndex] ?? null;

  const handlePrev = useCallback(() => setActive(p => p - 1), []);
  const handleNext = useCallback(() => setActive(p => p + 1), []);

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
              fontFamily:    '"JetBrains Mono", monospace',
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
              fontFamily:    '"JetBrains Mono", monospace',
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
        {/*
          perspective wrapper — overflow-hidden clips ±2 side cards.
          The drag target is the inner div; perspective is on its wrapper.
        */}
        <div
          style={{
            height:            CARD_H + 20,   // slight breathing room
            perspective:       '1200px',
            perspectiveOrigin: '50% 50%',
            overflow:          'hidden',
            position:          'relative',
          }}
        >
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
                    fontFamily:    '"JetBrains Mono", monospace',
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
                        fontFamily:    '"JetBrains Mono", monospace',
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

          {/* Controls row */}
          <div className="flex items-center gap-3 flex-shrink-0">

            {/* Prev / counter / Next */}
            <div
              className="flex items-center"
              style={{ border: '1px solid var(--color-rule)' }}
            >
              <button
                onClick={handlePrev}
                aria-label="Previous case"
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent:'center',
                  width:         40,
                  height:        40,
                  background:    'none',
                  border:        'none',
                  borderRight:   '1px solid var(--color-rule)',
                  cursor:        'pointer',
                  color:         'var(--color-fg-mute)',
                  fontSize:      '16px',
                  transition:    'color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color       = 'var(--color-fg)';
                  e.currentTarget.style.background  = 'rgba(255,37,64,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color       = 'var(--color-fg-mute)';
                  e.currentTarget.style.background  = 'none';
                }}
              >
                ←
              </button>

              <span
                style={{
                  fontFamily:    '"JetBrains Mono", monospace',
                  fontSize:      '9px',
                  letterSpacing: '0.1em',
                  color:         'var(--color-fg-mute)',
                  padding:       '0 14px',
                  userSelect:    'none',
                }}
              >
                {String(activeIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(count).padStart(2, '0')}
              </span>

              <button
                onClick={handleNext}
                aria-label="Next case"
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent:'center',
                  width:         40,
                  height:        40,
                  background:    'none',
                  border:        'none',
                  borderLeft:    '1px solid var(--color-rule)',
                  cursor:        'pointer',
                  color:         'var(--color-fg-mute)',
                  fontSize:      '16px',
                  transition:    'color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color       = 'var(--color-fg)';
                  e.currentTarget.style.background  = 'rgba(255,37,64,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color       = 'var(--color-fg-mute)';
                  e.currentTarget.style.background  = 'none';
                }}
              >
                →
              </button>
            </div>

            {/* Open case CTA */}
            <Link
              to={`/case/${activeItem.slug}`}
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            8,
                padding:        '0 20px',
                height:         40,
                backgroundColor:'var(--color-accent)',
                color:          '#fff',
                fontFamily:     '"JetBrains Mono", monospace',
                fontSize:       '9px',
                letterSpacing:  '0.18em',
                textTransform:  'uppercase',
                textDecoration: 'none',
                flexShrink:     0,
                transition:     'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              OPEN CASE
              <span aria-hidden="true" style={{ fontSize: '13px' }}>→</span>
            </Link>
          </div>
        </div>

        {/* Drag / keyboard hint — fades after first interaction */}
        <div
          className="mt-6 flex justify-center"
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily:    '"JetBrains Mono", monospace',
              fontSize:      '8px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color:         'var(--color-fg-mute)',
              opacity:       0.45,
            }}
          >
            DRAG · SCROLL · ←→
          </span>
        </div>

      </div>
    </section>
  );
}
