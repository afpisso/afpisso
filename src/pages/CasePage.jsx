import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { cases } from '../data/cases';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useLang } from '../contexts/LangContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { analytics } from '../utils/analytics';
import { m } from 'framer-motion';

const BASE_URL = 'https://byandresfe.com';

const ACCENT = 'var(--color-accent)';
const FG = 'var(--color-fg)';
const DIM = 'var(--color-fg-dim)';
const RULE = 'var(--color-rule)';
const MONO = '"JetBrains Mono", monospace';
const BEBAS = '"Bebas Neue", sans-serif';

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div style={{ width: 32, height: 1, backgroundColor: ACCENT }} />
      <span className="sys-label">{children}</span>
    </div>
  );
}

function ImagePlaceholder({ label = 'Image', aspect = '16/9', src }) {
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
      aria-hidden="true"
    >
      {src && (
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" onError={e => { e.currentTarget.style.display = 'none'; }} />
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

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

  const { content } = caseData;
  const visibilityLabel = t.caseStatuses[caseData.visibility] || caseData.status;

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />

      <main>
        {/* Case header */}
        <section
          className="relative pt-36 pb-20 overflow-hidden"
          style={{ borderBottom: `1px solid ${RULE}` }}
        >
          <div className="absolute inset-0 grid-bg" aria-hidden="true" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6">
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
                className="text-[9px] font-bold tracking-widest uppercase px-2 py-1"
                style={{ fontFamily: MONO, color: ACCENT, border: `1px solid rgba(255,37,64,0.3)` }}
              >
                {visibilityLabel}
              </span>
            </m.div>

            <m.h1
              className="uppercase mb-6"
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
                  <li key={tag} className="text-[9px] font-bold tracking-widest uppercase px-2 py-1"
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
          <ImagePlaceholder label={`${caseData.title} — hero image`} aspect="16/6" src={`/cases/${caseData.slug}/hero.jpg`} />
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
                    <ImagePlaceholder label="Process / approach visual" aspect="16/7" src={`/cases/${caseData.slug}/approach.jpg`} />
                  </div>
                </m.section>
              )}

              {/* Key decisions */}
              {content?.keyDecisions?.length > 0 && (
                <m.section
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
              {caseData.whatThisShows && (
                <m.section
                  className="py-10 mb-2"
                  style={{ borderBottom: `1px solid ${RULE}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel>{t.casePage.sections.whatThisShows || 'What this project shows'}</SectionLabel>
                  <p style={{ fontFamily: MONO, fontSize: '14px', color: DIM, lineHeight: 1.85, maxWidth: '640px' }}>
                    {caseData.whatThisShows}
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
                  <Link
                    to="/contact"
                    className="flex items-center gap-3 px-6 py-3 text-[11px] tracking-widest uppercase transition-colors duration-200"
                    style={{ fontFamily: MONO, backgroundColor: ACCENT, color: '#0a0a0a', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#cc1f34'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = ACCENT}
                  >
                    {t.contact.contactMe}
                  </Link>
                  <Link
                    to="/work"
                    className="flex items-center gap-3 px-6 py-3 text-[11px] tracking-widest uppercase transition-all duration-200"
                    style={{ fontFamily: MONO, border: `1px solid ${RULE}`, color: DIM, clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; e.currentTarget.style.color = FG; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = RULE; e.currentTarget.style.color = DIM; }}
                  >
                    {t.casePage.backToWork}
                  </Link>
                </div>
              </m.section>
            </div>

            {/* Sidebar — Quick facts */}
            <aside
              className="xl:sticky xl:top-24 hidden xl:block"
              aria-label="Case quick facts"
            >
              <div className="p-5 relative" style={{ border: `1px solid ${RULE}`, backgroundColor: 'rgba(255,255,255,0.01)' }}>
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
                <div className="sys-label mb-4">{t.casePage.quickFacts}</div>
                {content?.quickFacts && (
                  <dl className="space-y-4">
                    {Object.entries(content.quickFacts).filter(([k]) => k !== 'confidentiality').map(([key, val]) => (
                      <div key={key}>
                        <dt className="sys-label mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                        <dd style={{ fontFamily: MONO, fontSize: '12px', color: FG }}>
                          {Array.isArray(val) ? val.join(', ') : val}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
                <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${RULE}` }}>
                  <div className="sys-label mb-3">{t.casePage.metaPlatform}</div>
                  <div style={{ fontFamily: MONO, fontSize: '12px', color: FG }}>{caseData.platform?.join(', ')}</div>
                </div>
              </div>

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
            </aside>
          </div>

          {/* Mobile case nav */}
          <div className="xl:hidden mt-12 grid grid-cols-2 gap-2">
            <Link
              to={`/case/${prevCase.slug}`}
              className="p-4 transition-all duration-200"
              style={{ border: `1px solid ${RULE}`, textDecoration: 'none' }}
            >
              <div className="sys-label mb-1">{t.casePage.prev}</div>
              <div style={{ fontFamily: MONO, fontSize: '11px', color: DIM }}>{prevCase.title}</div>
            </Link>
            <Link
              to={`/case/${nextCase.slug}`}
              className="p-4 text-right transition-all duration-200"
              style={{ border: `1px solid ${RULE}`, textDecoration: 'none' }}
            >
              <div className="sys-label mb-1">{t.casePage.next}</div>
              <div style={{ fontFamily: MONO, fontSize: '11px', color: DIM }}>{nextCase.title}</div>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
