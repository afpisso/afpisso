import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { cases } from '../data/cases';
import { useLang } from '../contexts/LangContext';
import GlitchStrokeText from '../components/GlitchStrokeText';
import SectionTag from '../components/SectionTag';
import { StatusDiamond } from '../components/CyberIcons';
import { usePageMeta } from '../hooks/usePageMeta';
import { analytics } from '../utils/analytics';
import { m, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

const BASE_URL = 'https://byandresfe.com';
const EASE_OUT = [0.16, 1, 0.3, 1];

const filters = ['All', 'Games', 'UEFN', 'VR', 'NDA-Safe', 'Legacy'];

const VISIBILITY_STYLE = {
  'public':             { color: 'var(--color-accent)',    border: 'rgba(255,37,64,0.3)' },
  'nda-safe':           { color: 'var(--color-accent)',    border: 'rgba(255,37,64,0.3)' },
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
function ThumbnailOrPlaceholder({ c }) {
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

  return (
    <div style={{
      width: '100%', height: '100%',
      backgroundColor: 'rgba(14,3,6,0.95)',
      border: '1px solid rgba(255,37,64,0.12)',
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

// ── Floating cursor preview — follows mouse with spring lag ───────────────────
function CursorPreview({ items, hovered }) {
  const shouldReduce = useReducedMotion();
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const springX = useSpring(mouseX, { stiffness: 160, damping: 22, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 160, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (shouldReduce) return;
    const onMove = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
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
    >
      <AnimatePresence mode="wait">
        {hovered && active && (
          <m.div
            key={hovered}
            initial={{ opacity: 0, scale: 0.90, y: 14 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
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
            <ThumbnailOrPlaceholder c={active} />
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              backgroundColor: 'var(--color-accent)', opacity: 0.6,
            }} />
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

// ── Single case row ───────────────────────────────────────────────────────────
function CaseRow({ caseData, rowIndex, isHovered, onHover, lang, t }) {
  const vs = VISIBILITY_STYLE[caseData.visibility] || VISIBILITY_STYLE['legacy'];
  const statusLabel = t.caseStatuses?.[caseData.visibility] || caseData.status;

  return (
    <m.article
      layout
      aria-label={`${caseData.id}: ${caseData.title}`}
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
        style={{ backgroundColor: isHovered ? 'rgba(255,37,64,0.45)' : 'var(--color-rule)' }}
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
          transition: 'opacity 0.22s, transform 0.32s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      <Link
        to={`/case/${caseData.slug}`}
        aria-label={`Open case: ${caseData.title}`}
        style={{ textDecoration: 'none', display: 'block' }}
        onClick={() => analytics.caseCardClick?.(caseData.slug, caseData.title)}
      >
        <div
          className="flex items-center gap-5 py-7 pl-6 pr-4 sm:pr-8 transition-colors duration-200"
          style={{ backgroundColor: isHovered ? 'rgba(255,37,64,0.02)' : 'transparent' }}
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
                  fontSize: 'clamp(1.7rem, 3.2vw, 3rem)',
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
                  fontFamily: '"JetBrains Mono", monospace',
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
                    fontFamily: '"JetBrains Mono", monospace',
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

// ─────────────────────────────────────────────────────────────────────────────

export default function WorkPage({ onMenuOpen }) {
  const [active, setActive] = useState('All');
  const [hovered, setHovered] = useState(null);
  const { t, lang } = useLang();

  usePageMeta({
    title: lang === 'es' ? 'Trabajo seleccionado' : 'Selected Work',
    description: lang === 'es'
      ? 'Casos de estudio de Game UX/UI, UEFN, VR y sistemas de interfaz por Andres Felipe Pisso. Cada caso documenta el problema real de diseño, el rol y las decisiones que dieron forma al trabajo.'
      : 'Selected UX/UI case studies by Andres Felipe Pisso covering game UX, UI systems, HUD clarity, UEFN, VR interfaces, LiveOps UX, accessibility and player decision-making.',
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
        'description': 'Selected UX/UI case studies by Andres Felipe Pisso covering game UX, UI systems, HUD clarity, UEFN, VR interfaces, LiveOps UX, and player decision-making.',
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

  const visible = cases.filter(c => matchFilter(active, c));

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
      {/* Cursor preview rendered outside main to avoid overflow clipping */}
      <CursorPreview items={visible} hovered={hovered} />

      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />

      <main>

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
              <GlitchStrokeText stroke="1.5px rgba(245,245,243,0.5)">
                {t.caseFiles.label.split(' ').slice(-1)}
              </GlitchStrokeText>
            </m.h1>

            <m.p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '13px',
                color: 'var(--color-fg-dim)',
                lineHeight: 1.85,
                maxWidth: '520px',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 }}
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
              className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-10"
              role="group"
              aria-label="Filter projects"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.15 }}
            >
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '9px',
                  letterSpacing: '0.16em',
                  color: 'var(--color-fg-mute)',
                  textTransform: 'uppercase',
                  userSelect: 'none',
                }}
              >
                View
              </span>

              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => { setActive(f); setHovered(null); analytics.filterUse(f); }}
                  aria-pressed={active === f}
                  className="relative transition-colors duration-200"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: active === f ? 'var(--color-fg)' : 'var(--color-fg-mute)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    paddingBottom: '3px',
                    cursor: 'pointer',
                    minHeight: '44px',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                  onMouseEnter={e => { if (active !== f) e.currentTarget.style.color = 'var(--color-fg-dim)'; }}
                  onMouseLeave={e => { if (active !== f) e.currentTarget.style.color = 'var(--color-fg-mute)'; }}
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
            </m.div>

            {/* Case list */}
            <div>
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
            </div>

            {visible.length === 0 && (
              <m.div
                className="py-24 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: 'var(--color-fg-mute)' }}>
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
