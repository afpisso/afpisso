import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cases } from '../data/cases';
import { useLang } from '../contexts/LangContext';
import SectionHeading from './SectionHeading';
import { StatusDiamond } from './CyberIcons';
import { analytics } from '../utils/analytics';
import CyberBtn from './CyberBtn';
import { m, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion';

// Emil Kowalski: ease-out enter, ease-in exit, transform+opacity only, interruptible
const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_IN  = [0.4, 0, 1, 1];

const VISIBILITY_STYLE = {
  'public':             { color: 'var(--color-accent)',    border: 'rgba(255,37,64,0.3)' },
  'nda-safe':           { color: 'var(--color-accent)',    border: 'rgba(255,37,64,0.3)' },
  'password-protected': { color: '#facc15',                border: 'rgba(234,179,8,0.3)' },
  'coming-soon':        { color: '#facc15',                border: 'rgba(234,179,8,0.3)' },
  'legacy':             { color: 'var(--color-fg-mute)',   border: 'var(--color-rule)' },
};

// ── Thumbnail with fallback placeholder ──────────────────────────────────────
function ThumbnailOrPlaceholder({ case: c }) {
  const [failed, setFailed] = useState(false);
  const src = `/thumbnails/${c.slug}.jpg`;

  if (!failed) {
    return (
      <img
        key={src}
        src={src}
        alt=""
        aria-hidden="true"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        loading="eager"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  // Fallback: dark card with ID watermark + platform tags
  return (
    <div
      style={{
        width: '100%', height: '100%',
        backgroundColor: 'rgba(14,3,6,0.95)',
        border: '1px solid rgba(255,37,64,0.12)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '20px 24px',
      }}
    >
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
            fontFamily: '"JetBrains Mono", monospace',
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

// ── Floating cursor preview ───────────────────────────────────────────────────
// Follows the mouse with spring lag; swaps project image via AnimatePresence.
function CursorPreview({ items, hovered }) {
  const shouldReduce = useReducedMotion();
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  // Spring config: snappy but with visible lag so it feels physical
  const springX = useSpring(mouseX, { stiffness: 160, damping: 22, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 160, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (shouldReduce) return;
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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
      style={{
        left: springX,
        top: springY,
        x: 28,    // offset right of cursor
        y: -100,  // float above cursor
        width: 400,
      }}
    >
      <AnimatePresence mode="wait">
        {hovered && active && (
          <m.div
            key={hovered}
            initial={{ opacity: 0, scale: 0.90, y: 14 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={  { opacity: 0, scale: 0.95,  y: -8 }}
            transition={{
              opacity: { duration: 0.18, ease: EASE_OUT },
              scale:   { duration: 0.24, ease: EASE_OUT },
              y:       { duration: 0.22, ease: EASE_OUT },
            }}
            style={{
              aspectRatio: '16/9',
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            {/* Thumbnail image — derived from slug path */}
            <ThumbnailOrPlaceholder case={active} />

            {/* Red accent line at top */}
            <div
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                backgroundColor: 'var(--color-accent)', opacity: 0.6,
              }}
            />
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

// ── Single project row ────────────────────────────────────────────────────────
function ProjectRow({ caseData, index, onHover, isHovered }) {
  const { t, lang } = useLang();
  const vs = VISIBILITY_STYLE[caseData.visibility] || VISIBILITY_STYLE['legacy'];
  const statusLabel = t.caseStatuses?.[caseData.visibility] || caseData.status;

  return (
    <m.article
      aria-label={`${caseData.id}: ${caseData.title}`}
      className="relative group"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.38, ease: EASE_OUT, delay: index * 0.055 }}
      onMouseEnter={() => onHover(caseData.slug)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Top border */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px] transition-colors duration-300"
        style={{ backgroundColor: isHovered ? 'rgba(255,37,64,0.45)' : 'var(--color-rule)' }}
      />

      {/* Left accent — scaleY reveal */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-[2px]"
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
        aria-label={`Open case: ${caseData.title}`}
        style={{ textDecoration: 'none', display: 'block' }}
        onClick={() => analytics.caseCardClick?.(caseData.slug, caseData.title)}
      >
        <div
          className="flex items-center gap-5 py-6 pl-6 pr-4 sm:pr-6 transition-colors duration-200"
          style={{ backgroundColor: isHovered ? 'rgba(255,37,64,0.018)' : 'transparent' }}
        >

          {/* Index number */}
          <div
            className="flex-shrink-0 w-10 tabular-nums transition-colors duration-200"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: isHovered ? 'var(--color-accent)' : 'rgba(255,37,64,0.3)',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Main content */}
          <div className="flex-grow min-w-0">
            {/* Title row */}
            <div className="flex items-baseline gap-4 flex-wrap mb-2">
              <h3
                className="uppercase transition-colors duration-200"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(1.7rem, 3.2vw, 3rem)',
                  lineHeight: 1,
                  letterSpacing: '0.01em',
                  color: isHovered ? 'var(--color-fg)' : 'rgba(240,238,234,0.75)',
                }}
              >
                {caseData.title}
              </h3>
              {/* Status badge */}
              <span
                className="flex-shrink-0 flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-2 py-1 transition-opacity duration-200"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  color: vs.color,
                  border: `1px solid ${vs.border}`,
                  opacity: isHovered ? 1 : 0.65,
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
                    fontFamily: '"JetBrains Mono", monospace',
                    border: '1px solid var(--color-rule)',
                    color: 'var(--color-fg-mute)',
                    opacity: isHovered ? 0.9 : 0.5,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: case ID + animated arrow */}
          <div className="flex-shrink-0 flex flex-col items-end gap-2 pl-4 min-w-[60px]">
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
                transition: `opacity 0.2s ${EASE_OUT}, transform 0.28s cubic-bezier(0.16,1,0.3,1)`,
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

// ── Main section ──────────────────────────────────────────────────────────────
export default function CaseFiles() {
  const { t } = useLang();
  const [hovered, setHovered] = useState(null);

  const VISIBILITY_ORDER = { public: 0, 'nda-safe': 1, 'password-protected': 2, 'coming-soon': 3, legacy: 4 };
  const featured = [...cases.filter(c => c.featured)].sort(
    (a, b) => (VISIBILITY_ORDER[a.visibility] ?? 9) - (VISIBILITY_ORDER[b.visibility] ?? 9)
  );

  return (
    <>
      {/* Cursor-following preview — rendered outside section to avoid overflow clip */}
      <CursorPreview items={featured} hovered={hovered} />

      <section
        id="cases"
        className="py-36 relative"
        style={{ borderTop: '1px solid var(--color-rule)' }}
      >
        {/* Mobile: solid bg — on desktop the gradient does the work */}
        <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
        {/* Desktop: content left, particles right — gradient fades to transparent on the right */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to right, #0a0a0a 0%, #0a0a0a 60%, rgba(10,10,10,0.92) 64%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.15) 78%, transparent 85%)',
        }} />
        <div className="relative z-10 lg:max-w-[62%] lg:mr-auto px-6">

          {/* Section header */}
          <div className="mb-16">
            <SectionHeading label={t.caseFiles.label} title={t.caseFiles.sectionTitle} page="003" />
            <div className="flex items-start gap-12 mt-10 flex-wrap">
              <m.p
                className="text-base max-w-sm"
                style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'var(--color-fg-dim)', lineHeight: 1.85 }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                {t.caseFiles.descriptionShort}
              </m.p>
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.45 }}
              >
                <CyberBtn to="/work" variant="ghost" size="sm">
                  {t.caseFiles.viewAll}
                </CyberBtn>
              </m.div>
            </div>
          </div>

          {/* Editorial project list */}
          <div>
            {featured.map((c, i) => (
              <ProjectRow
                key={c.id}
                caseData={c}
                index={i}
                onHover={setHovered}
                isHovered={hovered === c.slug}
              />
            ))}
            {/* Bottom border */}
            <div className="h-[1px]" style={{ backgroundColor: 'var(--color-rule)' }} />
          </div>


        </div>
      </section>
    </>
  );
}
