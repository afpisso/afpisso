import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { cases } from '../data/cases';
import { fieldNotes } from '../data/fieldNotes';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CaseRail from '../components/CaseRail';
import CaseTOC from '../components/CaseTOC';
import { useLang } from '../contexts/LangContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { analytics } from '../utils/analytics';
import SectionTag from '../components/SectionTag';
import CyberBtn from '../components/CyberBtn';
import { m, useReducedMotion } from 'framer-motion';

const BASE_URL = 'https://byandresfe.com';

// ── Ambient page ghost ────────────────────────────────────────────────────────
// Thumbnail blurred to abstraction (120px) at 4% opacity. Too faint to read as
// an image; just enough to give each case a unique color temperature throughout
// the page. Absolutely positioned so it blends over the solid bg. GPU layer via
// CSS filter on the img element — never backdrop-filter on scrolling content.
function PageGhost({ slug }) {
  const [failed, setFailed] = useState(false);
  const shouldReduce = useReducedMotion();
  if (failed || shouldReduce) return null;
  return (
    <img
      src={`/thumbnails/${slug}.jpg`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        width: '100%',
        height: '75vh',
        objectFit: 'cover',
        objectPosition: 'center top',
        filter: 'blur(120px)',
        opacity: 0.045,
        transform: 'scale(1.4)',
        transformOrigin: 'top center',
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      onError={() => setFailed(true)}
    />
  );
}

// ── Hero section blur ─────────────────────────────────────────────────────────
// Strong blur (72px) confined to the case header section (overflow:hidden clips
// the scaled image). Layers: blurred img → dark veil (80% opacity) → grid-bg
// → content. The veil keeps text legible; the bottom gradient dissolves cleanly
// into the solid content area below.
function HeroBlur({ slug }) {
  const [failed, setFailed] = useState(false);
  const shouldReduce = useReducedMotion();
  if (failed || shouldReduce) return null;
  return (
    <>
      <img
        src={`/thumbnails/${slug}.jpg`}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          filter: 'blur(72px)',
          transform: 'scale(1.18)',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        onError={() => setFailed(true)}
      />
      {/* Dark veil — preserves text contrast, lets project color bleed through */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundColor: 'rgba(8,8,8,0.80)',
        }}
      />
      {/* Bottom fade — hero dissolves into the solid content sections below */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '48%', zIndex: 2,
          background: 'linear-gradient(to bottom, transparent, var(--color-bg))',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}

const ACCENT = 'var(--color-accent)';
const FG = 'var(--color-fg)';
const DIM = 'var(--color-fg-dim)';
const RULE = 'var(--color-rule)';
const MONO = '"JetBrains Mono", monospace';
const BEBAS = '"Bebas Neue", sans-serif';

function SectionLabel({ children }) {
  return (
    <div className="mb-8">
      <SectionTag label={children} />
    </div>
  );
}

function ImagePlaceholder({ label = 'Image', aspect = '16/9', src, alt }) {
  const hasRealImage = Boolean(src)
  return (
    <div
      style={{
        aspectRatio: aspect,
        border: `1px solid ${RULE}`,
        backgroundColor: 'rgba(255,255,255,0.02)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 12, position: 'relative', overflow: 'hidden',
      }}
      aria-hidden={hasRealImage ? undefined : 'true'}
    >
      {src && (
        <img
          src={src}
          alt={alt || label}
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="1" stroke="rgba(245,245,243,0.15)" strokeWidth="1.2" />
          <circle cx="8.5" cy="8.5" r="2" stroke="rgba(245,245,243,0.15)" strokeWidth="1.2" />
          <path d="M3 16l5-5 4 4 3-3 6 6" stroke="rgba(245,245,243,0.15)" strokeWidth="1.2" />
        </svg>
        <span style={{ fontFamily: MONO, fontSize: '10px', color: 'rgba(245,245,243,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {label}
        </span>
      </div>
      {[['top-2 left-2', 'border-t border-l'], ['top-2 right-2', 'border-t border-r'], ['bottom-2 left-2', 'border-b border-l'], ['bottom-2 right-2', 'border-b border-r']].map(([pos, cls]) => (
        <div key={pos} aria-hidden="true" className={`absolute ${pos} w-4 h-4 ${cls}`} style={{ borderColor: RULE }} />
      ))}
    </div>
  );
}

function DecisionBlock({ item, index }) {
  const { t } = useLang();
  const cp = t.casePage.sections;
  return (
    <m.div
      className="relative p-6 mb-4"
      style={{ border: `1px solid ${RULE}`, backgroundColor: 'rgba(255,255,255,0.01)' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ backgroundColor: index === 0 ? ACCENT : RULE }} aria-hidden="true" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="sys-label mb-2" style={{ color: ACCENT }}>{cp.problem}</div>
          <p style={{ fontFamily: MONO, fontSize: '13px', color: DIM, lineHeight: 1.75 }}>{item.problem}</p>
        </div>
        <div>
          <div className="sys-label mb-2" style={{ color: FG }}>{cp.decision}</div>
          <p style={{ fontFamily: MONO, fontSize: '13px', color: DIM, lineHeight: 1.75 }}>{item.decision}</p>
        </div>
        <div>
          <div className="sys-label mb-2">{cp.whyItMattered}</div>
          <p style={{ fontFamily: MONO, fontSize: '13px', color: DIM, lineHeight: 1.75 }}>{item.why}</p>
        </div>
      </div>
    </m.div>
  );
}

function QuickFacts({ facts }) {
  const entries = Object.entries(facts).filter(([k]) => k !== 'confidentiality');
  return (
    <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {entries.map(([key, val]) => (
        <div key={key} className="p-4" style={{ border: `1px solid ${RULE}`, backgroundColor: 'rgba(255,255,255,0.01)' }}>
          <dt className="sys-label mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
          <dd style={{ fontFamily: MONO, fontSize: '12px', color: FG, letterSpacing: '0.02em' }}>
            {Array.isArray(val) ? val.join(', ') : val}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function CasePage({ onMenuOpen }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();

  const caseData = cases.find((c) => c.slug === slug);
  const currentIndex = cases.findIndex((c) => c.slug === slug);
  const nextCase = cases[(currentIndex + 1) % cases.length];
  const prevCase = cases[(currentIndex - 1 + cases.length) % cases.length];

  usePageMeta({
    title: caseData ? caseData.title : 'Case Study',
    description: caseData
      ? (lang === 'es' && caseData.descriptionEs ? caseData.descriptionEs : caseData.description)
      : undefined,
  });

  // Inject BreadcrumbList + CreativeWork schema for this case
  useEffect(() => {
    if (!caseData) return;
    const schemaId = `ld-json-case-${caseData.slug}`;
    let el = document.getElementById(schemaId);
    const schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL + '/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Selected Work', 'item': BASE_URL + '/work' },
          { '@type': 'ListItem', 'position': 3, 'name': caseData.title, 'item': `${BASE_URL}/case/${caseData.slug}` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${BASE_URL}/case/${caseData.slug}#work`,
        'name': caseData.title,
        'description': caseData.description,
        'url': `${BASE_URL}/case/${caseData.slug}`,
        'keywords': caseData.tags?.join(', '),
        'author': { '@id': BASE_URL + '/#person' },
        'creator': { '@id': BASE_URL + '/#person' },
        'about': { '@type': 'Thing', 'name': caseData.focus || caseData.tags?.[0] },
        'isPartOf': { '@id': BASE_URL + '/work#page' },
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
  }, [caseData]);

  // Scroll depth tracking at 25 / 50 / 75 / 100
  const depthTracked = useRef(new Set());
  useEffect(() => {
    if (!caseData) return;
    depthTracked.current.clear();

    const checkDepth = () => {
      const el = document.documentElement;
      const pct = Math.round((el.scrollTop + el.clientHeight) / el.scrollHeight * 100);
      for (const depth of [25, 50, 75, 100]) {
        if (pct >= depth && !depthTracked.current.has(depth)) {
          depthTracked.current.add(depth);
          analytics.caseScroll(caseData.slug, depth);
        }
      }
    };

    window.addEventListener('scroll', checkDepth, { passive: true });
    return () => window.removeEventListener('scroll', checkDepth);
  }, [caseData]);

  // Scroll-to-top on slug change is handled by App.jsx via Lenis
  // (lenisRef.current.scrollTo(0, { immediate: true }) on location.pathname change)

  if (!caseData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
        <div className="text-center">
          <p style={{ fontFamily: MONO, color: DIM, marginBottom: 16 }}>{t.casePage.notFound}</p>
          <Link to="/work" style={{ fontFamily: MONO, fontSize: '11px', color: ACCENT }}>{t.casePage.backToWork}</Link>
        </div>
      </div>
    );
  }

  const content = (lang === 'es' && caseData.contentEs) ? caseData.contentEs : caseData.content;
  const whatThisShows = (lang === 'es' && caseData.whatThisShowsEs) ? caseData.whatThisShowsEs : caseData.whatThisShows;
  const visibilityLabel = t.caseStatuses[caseData.visibility] || caseData.status;
  const cp = t.casePage.sections;

  // Build TOC dynamically — only sections present in this case's content
  const tocSections = [
    content?.summary                   && { id: 'cs-summary',      label: cp.executiveSummary },
    content?.context                   && { id: 'cs-context',      label: cp.context },
    content?.challenge                 && { id: 'cs-challenge',    label: cp.challenge },
    content?.role                      && { id: 'cs-role',         label: cp.myRole },
    content?.constraints?.length > 0   && { id: 'cs-constraints',  label: cp.constraints },
    content?.approach?.length > 0      && { id: 'cs-approach',     label: cp.uxApproach },
    content?.keyDecisions?.length > 0  && { id: 'cs-decisions',    label: cp.keyDecisions },
    content?.deliverables?.length > 0  && { id: 'cs-deliverables', label: cp.deliverables },
    content?.outcome                   && { id: 'cs-outcome',      label: cp.outcome },
    content?.nextSteps                 && { id: 'cs-next',         label: cp.nextSteps },
    whatThisShows                      && { id: 'cs-shows',        label: cp.whatThisShows || 'What this shows' },
  ].filter(Boolean);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
      {/* Ambient color ghost — sits above solid bg, below all content */}
      <PageGhost slug={caseData.slug} />

      {/* Content — z-index 1 keeps it above the ghost */}
      <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />

      <main>
        {/* Case header */}
        <section
          className="relative pt-36 pb-20 overflow-hidden"
          style={{ borderBottom: `1px solid ${RULE}` }}
        >
          {/* Strong blur layer — img filter on GPU, not backdrop-filter */}
          <HeroBlur slug={caseData.slug} />
          <div className="absolute inset-0 grid-bg" aria-hidden="true" style={{ zIndex: 3, opacity: 0.45 }} />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6" style={{ zIndex: 4 }}>
            {/* Breadcrumb */}
            <m.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to="/work"
                style={{ fontFamily: MONO, fontSize: '11px', color: DIM, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = ACCENT}
                onMouseLeave={e => e.currentTarget.style.color = DIM}
              >
                ← {t.caseFiles.label}
              </Link>
              <span style={{ color: RULE }}>·</span>
              <span className="sys-label">{caseData.id}</span>
            </m.div>

            {/* Eyebrow + Title */}
            <m.div
              className="mb-4"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              <span
                className="text-[10px] font-bold tracking-widest uppercase px-2 py-1"
                style={{ fontFamily: MONO, color: ACCENT, border: `1px solid rgba(255,37,64,0.3)` }}
              >
                {visibilityLabel}
              </span>
            </m.div>

            <m.h1
              className="uppercase mb-2"
              style={{
                fontFamily: BEBAS,
                fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
                color: FG,
                lineHeight: 0.9,
                letterSpacing: '0.01em',
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              {caseData.title}
            </m.h1>
            <m.div
              className="mb-6"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-fg-mute)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.12 }}
              aria-hidden="true"
            >
              Game UX/UI Case Study · {caseData.role} · {caseData.platform?.join(' / ')}
            </m.div>

            <m.p
              className="mb-10"
              style={{ fontFamily: MONO, fontSize: 'clamp(13px, 1.4vw, 15px)', color: DIM, maxWidth: '640px', lineHeight: 1.85 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              {lang === 'es' && caseData.headlineEs ? caseData.headlineEs : caseData.headline}
            </m.p>

            {/* Meta row */}
            <m.div
              className="flex flex-wrap gap-6 items-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div>
                <div className="sys-label mb-1">{t.casePage.metaRole}</div>
                <div style={{ fontFamily: MONO, fontSize: '12px', color: FG }}>{caseData.role}</div>
              </div>
              <div>
                <div className="sys-label mb-1">{t.casePage.metaPlatform}</div>
                <div style={{ fontFamily: MONO, fontSize: '12px', color: FG }}>{caseData.platform?.join(' / ')}</div>
              </div>
              <div>
                <div className="sys-label mb-1">{t.casePage.metaYear}</div>
                <div style={{ fontFamily: MONO, fontSize: '12px', color: FG, fontVariantNumeric: 'tabular-nums' }}>{caseData.year}</div>
              </div>
              <ul className="flex flex-wrap gap-1.5 ml-auto" aria-label="Tags">
                {caseData.tags.map(tag => (
                  <li key={tag} className="text-[10px] font-bold tracking-widest uppercase px-2 py-1"
                    style={{ fontFamily: MONO, border: `1px solid ${RULE}`, color: 'var(--color-fg-mute)' }}>
                    {tag}
                  </li>
                ))}
              </ul>
            </m.div>
          </div>
        </section>

        {/* Hero image */}
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <ImagePlaceholder label={`${caseData.title} — hero image`} aspect="16/6" src={`/cases/${caseData.slug}/hero.jpg`} alt={`${caseData.title} — Game UX/UI case study hero image`} />
        </div>

        {/* NDA notice if applicable */}
        {(caseData.visibility === 'nda-safe') && content?.quickFacts?.confidentiality && (
          <div className="max-w-[1400px] mx-auto px-6 mb-4">
            <div className="p-4 relative" style={{ border: `1px solid rgba(255,37,64,0.2)`, backgroundColor: 'rgba(255,37,64,0.03)' }}>
              <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
              <p style={{ fontFamily: MONO, fontSize: '12px', color: DIM, lineHeight: 1.75 }}>
                <span style={{ color: ACCENT, fontWeight: 700 }}>NDA-safe breakdown — </span>
                {content.quickFacts.confidentiality}
              </p>
            </div>
          </div>
        )}

        {/* Body */}
        <article className="max-w-[1400px] mx-auto px-6 pb-28">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
            {/* Main content */}
            <div>

              {/* Executive summary */}
              {content?.summary && (
                <m.section
                  id="cs-summary"
                  className="py-10 mb-2"
                  style={{ borderBottom: `1px solid ${RULE}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel>{t.casePage.sections.executiveSummary}</SectionLabel>
                  <p style={{ fontFamily: MONO, fontSize: '15px', color: 'rgba(240,238,234,0.8)', lineHeight: 1.85 }}>
                    {content.summary}
                  </p>
                </m.section>
              )}

              {/* Context */}
              {content?.context && (
                <m.section
                  id="cs-context"
                  className="py-10 mb-2"
                  style={{ borderBottom: `1px solid ${RULE}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel>{t.casePage.sections.context}</SectionLabel>
                  <p style={{ fontFamily: MONO, fontSize: '14px', color: DIM, lineHeight: 1.85 }}>{content.context}</p>
                </m.section>
              )}

              {/* Challenge */}
              {content?.challenge && (
                <m.section
                  id="cs-challenge"
                  className="py-10 mb-2"
                  style={{ borderBottom: `1px solid ${RULE}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel>{t.casePage.sections.challenge}</SectionLabel>
                  <p style={{ fontFamily: MONO, fontSize: '14px', color: DIM, lineHeight: 1.85 }}>{content.challenge}</p>
                </m.section>
              )}

              {/* My role */}
              {content?.role && (
                <m.section
                  id="cs-role"
                  className="py-10 mb-2"
                  style={{ borderBottom: `1px solid ${RULE}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel>{t.casePage.sections.myRole}</SectionLabel>
                  <p style={{ fontFamily: MONO, fontSize: '14px', color: DIM, lineHeight: 1.85 }}>{content.role}</p>
                </m.section>
              )}

              {/* Constraints */}
              {content?.constraints?.length > 0 && (
                <m.section
                  id="cs-constraints"
                  className="py-10 mb-2"
                  style={{ borderBottom: `1px solid ${RULE}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel>{t.casePage.sections.constraints}</SectionLabel>
                  <ul className="space-y-3">
                    {content.constraints.map((c, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span aria-hidden="true" style={{ color: ACCENT, flexShrink: 0, fontFamily: MONO, fontSize: '12px', marginTop: '2px' }}>—</span>
                        <span style={{ fontFamily: MONO, fontSize: '13px', color: DIM, lineHeight: 1.75 }}>{c}</span>
                      </li>
                    ))}
                  </ul>
                </m.section>
              )}

              {/* UX Approach */}
              {content?.approach?.length > 0 && (
                <m.section
                  id="cs-approach"
                  className="py-10 mb-2"
                  style={{ borderBottom: `1px solid ${RULE}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel>{t.casePage.sections.uxApproach}</SectionLabel>
                  <div className="space-y-8">
                    {content.approach.map((item, i) => (
                      <m.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                      >
                        <h3 className="uppercase mb-3" style={{ fontFamily: BEBAS, fontSize: '1.4rem', color: FG, letterSpacing: '0.02em', lineHeight: 1 }}>
                          {item.heading}
                        </h3>
                        <p style={{ fontFamily: MONO, fontSize: '13px', color: DIM, lineHeight: 1.85 }}>{item.body}</p>
                      </m.div>
                    ))}
                  </div>
                  <div className="mt-10">
                    <ImagePlaceholder label="Process / approach visual" aspect="16/7" src={`/cases/${caseData.slug}/approach.jpg`} alt={`${caseData.title} — design process and approach documentation`} />
                  </div>
                </m.section>
              )}

              {/* Key decisions */}
              {content?.keyDecisions?.length > 0 && (
                <m.section
                  id="cs-decisions"
                  className="py-10 mb-2"
                  style={{ borderBottom: `1px solid ${RULE}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel>{t.casePage.sections.keyDecisions}</SectionLabel>
                  <p className="mb-8" style={{ fontFamily: MONO, fontSize: '13px', color: DIM, lineHeight: 1.85, maxWidth: '560px' }}>
                    {t.casePage.sections.keyDecisionsIntro}
                  </p>
                  {content.keyDecisions.map((item, i) => (
                    <DecisionBlock key={i} item={item} index={i} />
                  ))}
                </m.section>
              )}

              {/* Deliverables */}
              {content?.deliverables?.length > 0 && (
                <m.section
                  id="cs-deliverables"
                  className="py-10 mb-2"
                  style={{ borderBottom: `1px solid ${RULE}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel>{t.casePage.sections.deliverables}</SectionLabel>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {content.deliverables.map((d, i) => (
                      <li key={i} className="flex gap-3 items-start py-2 border-b" style={{ borderColor: RULE }}>
                        <span aria-hidden="true" style={{ color: ACCENT, flexShrink: 0, fontFamily: MONO, fontSize: '12px', marginTop: '2px' }}>✓</span>
                        <span style={{ fontFamily: MONO, fontSize: '12px', color: DIM, lineHeight: 1.6 }}>{d}</span>
                      </li>
                    ))}
                  </ul>
                </m.section>
              )}

              {/* Outcome */}
              {content?.outcome && (
                <m.section
                  id="cs-outcome"
                  className="py-10 mb-2"
                  style={{ borderBottom: `1px solid ${RULE}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel>{t.casePage.sections.outcome}</SectionLabel>
                  <p style={{ fontFamily: MONO, fontSize: '14px', color: DIM, lineHeight: 1.85 }}>{content.outcome}</p>
                </m.section>
              )}

              {/* What I'd check next */}
              {content?.nextSteps && (
                <m.section
                  id="cs-next"
                  className="py-10 mb-2"
                  style={{ borderBottom: `1px solid ${RULE}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel>{t.casePage.sections.nextSteps}</SectionLabel>
                  <p style={{ fontFamily: MONO, fontSize: '14px', color: DIM, lineHeight: 1.85 }}>{content.nextSteps}</p>
                </m.section>
              )}

              {/* What this shows */}
              {whatThisShows && (
                <m.section
                  id="cs-shows"
                  className="py-10 mb-2"
                  style={{ borderBottom: `1px solid ${RULE}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel>{t.casePage.sections.whatThisShows || 'What this project shows'}</SectionLabel>
                  <p style={{ fontFamily: MONO, fontSize: '14px', color: DIM, lineHeight: 1.85, maxWidth: '640px' }}>
                    {whatThisShows}
                  </p>
                </m.section>
              )}

              {/* CTA */}
              <m.section
                className="py-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="mb-6" style={{ fontFamily: MONO, fontSize: '15px', color: 'rgba(240,238,234,0.8)', lineHeight: 1.8 }}>
                  {t.casePage_cta.body}
                </p>
                <div className="flex flex-wrap gap-3">
                  <CyberBtn variant="solid" to="/contact">
                    {t.contact.contactMe}
                  </CyberBtn>
                  <CyberBtn variant="ghost" to="/work">
                    {t.casePage.backToWork}
                  </CyberBtn>
                </div>
              </m.section>
            </div>

            {/* Sidebar — Quick facts */}
            <aside
              className="xl:sticky xl:top-24 hidden xl:block"
              aria-label="Case quick facts"
            >
              <div className="relative" style={{ border: `1px solid ${RULE}`, backgroundColor: 'rgba(255,255,255,0.01)' }}>
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
                <div className="px-5 pt-5 pb-2">
                  <div className="sys-label" style={{ color: ACCENT }}>{t.casePage.quickFacts}</div>
                </div>
                {content?.quickFacts && (
                  <dl>
                    {Object.entries(content.quickFacts).filter(([k]) => k !== 'confidentiality').map(([key, val]) => (
                      <div key={key} className="flex items-start justify-between gap-3 px-5 py-3 border-t" style={{ borderColor: RULE }}>
                        <dt className="sys-label flex-shrink-0 capitalize w-20" style={{ paddingTop: '1px' }}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </dt>
                        <dd className="text-right" style={{ fontFamily: MONO, fontSize: '12px', color: FG, lineHeight: 1.4 }}>
                          {Array.isArray(val) ? val.join(', ') : val}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
                <div className="px-5 py-3 border-t flex items-start justify-between gap-3" style={{ borderColor: RULE }}>
                  <div className="sys-label flex-shrink-0 w-20">{t.casePage.metaPlatform}</div>
                  <div className="text-right" style={{ fontFamily: MONO, fontSize: '12px', color: FG }}>{caseData.platform?.join(' / ')}</div>
                </div>
              </div>

              {/* Section table of contents */}
              <CaseTOC sections={tocSections} />

              {/* Navigation between cases */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  to={`/case/${prevCase.slug}`}
                  className="p-3 transition-all duration-200"
                  style={{ border: `1px solid ${RULE}`, textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,37,64,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = RULE}
                >
                  <div className="sys-label mb-1">{t.casePage.prev}</div>
                  <div style={{ fontFamily: MONO, fontSize: '11px', color: DIM }}>{prevCase.title}</div>
                </Link>
                <Link
                  to={`/case/${nextCase.slug}`}
                  className="p-3 text-right transition-all duration-200"
                  style={{ border: `1px solid ${RULE}`, textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,37,64,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = RULE}
                >
                  <div className="sys-label mb-1">{t.casePage.next}</div>
                  <div style={{ fontFamily: MONO, fontSize: '11px', color: DIM }}>{nextCase.title}</div>
                </Link>
              </div>

              {/* Related Field Notes */}
              {caseData.relatedNotes?.length > 0 && (() => {
                const related = caseData.relatedNotes
                  .map(slug => fieldNotes.find(n => n.slug === slug))
                  .filter(Boolean);
                if (!related.length) return null;
                return (
                  <div className="mt-4 p-4" style={{ border: `1px solid ${RULE}`, backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <div className="sys-label mb-3" style={{ color: ACCENT }}>Related Field Notes</div>
                    <ul className="space-y-3">
                      {related.map(note => (
                        <li key={note.slug}>
                          <Link
                            to={`/notes/${note.slug}`}
                            className="block transition-colors duration-200"
                            style={{ textDecoration: 'none' }}
                            onMouseEnter={e => e.currentTarget.style.color = FG}
                            onMouseLeave={e => e.currentTarget.style.color = DIM}
                          >
                            <div className="sys-label mb-0.5">{note.category}</div>
                            <div style={{ fontFamily: MONO, fontSize: '11px', color: DIM, lineHeight: 1.5 }}>
                              {note.title}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </aside>
          </div>

        </article>
      </main>

      {/* Full-width case carousel — lives outside main so it bleeds edge-to-edge */}
      <CaseRail currentSlug={caseData.slug} />

      <Footer />
      </div>{/* end content z-index wrapper */}
    </div>
  );
}
