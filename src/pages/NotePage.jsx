import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { fieldNotes } from '../data/fieldNotes';
import { noteArticles } from '../data/noteArticles';
import { cases } from '../data/cases';
import { useLang } from '../contexts/LangContext';
import { usePageMeta } from '../hooks/usePageMeta';
import SectionTag from '../components/SectionTag';
import { m } from 'framer-motion';

const BASE_URL = 'https://byandresfe.com';

// ─── Block renderers ──────────────────────────────────────────────────────

function Paragraph({ text }) {
  return (
    <p style={{
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '14px',
      lineHeight: 1.9,
      color: 'rgba(245,245,243,0.72)',
      marginBottom: '1.5rem',
    }}>
      {text}
    </p>
  );
}

function Heading({ text }) {
  return (
    <h2 style={{
      fontFamily: '"Bebas Neue", sans-serif',
      fontSize: 'clamp(22px, 3vw, 32px)',
      letterSpacing: '0.03em',
      color: 'var(--color-fg)',
      textTransform: 'uppercase',
      marginTop: '2.5rem',
      marginBottom: '1rem',
      lineHeight: 1,
    }}>
      {text}
    </h2>
  );
}

function Subheading({ text }) {
  return (
    <h3 style={{
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '11px',
      letterSpacing: '0.18em',
      color: 'var(--color-accent)',
      textTransform: 'uppercase',
      marginTop: '2rem',
      marginBottom: '0.75rem',
    }}>
      {text}
    </h3>
  );
}

function List({ items }) {
  return (
    <ul style={{ marginBottom: '1.5rem', paddingLeft: 0, listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '13px',
          lineHeight: 1.85,
          color: 'rgba(245,245,243,0.65)',
          paddingLeft: '1.5rem',
          marginBottom: '0.6rem',
          position: 'relative',
        }}>
          <span style={{
            position: 'absolute', left: 0,
            color: 'var(--color-accent)',
            fontSize: '10px', top: '4px',
          }}>◆</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Callout({ text }) {
  return (
    <div style={{
      margin: '2rem 0',
      padding: '20px 24px',
      border: '1px solid rgba(255,37,64,0.25)',
      backgroundColor: 'rgba(255,37,64,0.04)',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', backgroundColor: 'var(--color-accent)' }} aria-hidden="true" />
      <p style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '13px',
        lineHeight: 1.85,
        color: 'rgba(245,245,243,0.85)',
        margin: 0,
        fontStyle: 'italic',
      }}>
        {text}
      </p>
    </div>
  );
}

function renderBlock(block, i) {
  switch (block.type) {
    case 'paragraph':  return <Paragraph  key={i} text={block.text} />;
    case 'heading':    return <Heading    key={i} text={block.text} />;
    case 'subheading': return <Subheading key={i} text={block.text} />;
    case 'list':       return <List       key={i} items={block.items} />;
    case 'callout':    return <Callout    key={i} text={block.text} />;
    default:           return null;
  }
}

// Monochrome signal system — type name communicates the category, not color
const TYPE_STYLE = {
  color: 'var(--color-fg-dim)',
  backgroundColor: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--color-rule)',
};

// ─── Page ─────────────────────────────────────────────────────────────────

export default function NotePage({ onMenuOpen }) {
  const { slug }    = useParams();
  const { t, lang } = useLang();
  const np = t.notePage;

  const meta    = fieldNotes.find((n) => n.slug === slug);
  const article = noteArticles?.[slug];
  const blocks  = article?.[lang] ?? article?.en ?? [];

  const title = meta
    ? (lang === 'es' && meta.titleEs ? meta.titleEs : meta.title)
    : 'Field Note';

  usePageMeta({
    title,
    description: meta
      ? (lang === 'es' && meta.summaryEs ? meta.summaryEs : meta.summary)
      : '',
    article: meta ? { datePublished: meta.date, dateModified: meta.date } : undefined,
  });

  // Inject BreadcrumbList schema for note pages
  useEffect(() => {
    if (!meta) return;
    const schemaId = `ld-json-note-${meta.slug}`;
    let el = document.getElementById(schemaId);
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL + '/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Field Notes', 'item': BASE_URL + '/notes' },
        { '@type': 'ListItem', 'position': 3, 'name': title, 'item': `${BASE_URL}/notes/${meta.slug}` },
      ],
    };
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = schemaId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => { const s = document.getElementById(schemaId); if (s) s.remove(); };
  }, [meta, title]);

  // Next note in the list (circular)
  const idx      = fieldNotes.findIndex((n) => n.slug === slug);
  const nextNote = fieldNotes[(idx + 1) % fieldNotes.length];

  // ── Not found or no content yet ──
  if (!meta || blocks.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
        <Nav onMenuOpen={onMenuOpen} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '4rem', color: 'rgba(255,37,64,0.15)', lineHeight: 1 }}>
              {meta ? 'COMING SOON' : '404'}
            </div>
            <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: 'var(--color-fg-dim)', margin: '16px 0 24px' }}>
              {meta ? np.comingSoon : np.notFound}
            </p>
            <Link to="/notes" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'var(--color-accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              ← {np.backToNotes}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const typeStyle = TYPE_STYLE;

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <main>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="pt-40 pb-16" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[860px] mx-auto px-6">

            {/* Breadcrumb */}
            <m.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/notes"
                style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-fg-mute)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-fg-mute)')}
              >
                ← {np.fieldNotesLabel}
              </Link>
              <span style={{ color: 'var(--color-rule)', fontSize: '10px' }}>/</span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', opacity: 0.7 }}>
                {meta.id}
              </span>
            </m.div>

            {/* Type + meta row */}
            <m.div
              className="flex flex-wrap items-center gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.16em', textTransform: 'uppercase', padding: '4px 10px',
                ...typeStyle,
              }}>
                {meta.type}
              </span>
              <span className="sys-label">{meta.readTime}</span>
              <span className="sys-label">·</span>
              <span className="sys-label">{meta.category}</span>
              {meta.date && (
                <>
                  <span className="sys-label">·</span>
                  <time
                    dateTime={meta.date}
                    className="sys-label"
                  >
                    {new Date(meta.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </time>
                </>
              )}
            </m.div>

            {/* Title */}
            <m.h1
              className="uppercase"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                lineHeight: 0.9, letterSpacing: '0.02em',
                color: 'var(--color-fg)', marginBottom: '1.5rem',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            >
              {title}
            </m.h1>

            {/* Lead summary */}
            <m.p
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '14px', lineHeight: 1.85, color: 'var(--color-fg-dim)', maxWidth: '620px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {lang === 'es' && meta.summaryEs ? meta.summaryEs : meta.summary}
            </m.p>
          </div>
        </section>

        {/* ── Article body ─────────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-16 items-start">

              {/* Main content */}
              <m.article
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              >
                {blocks.map((block, i) => renderBlock(block, i))}
              </m.article>

              {/* Sidebar */}
              <m.aside
                className="hidden lg:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                <div style={{ position: 'sticky', top: '96px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* Meta panel */}
                  <div style={{ border: '1px solid var(--color-rule)', padding: '18px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', backgroundColor: 'var(--color-accent)' }} />
                    <div className="sys-label mb-4" style={{ color: 'var(--color-accent)' }}>
                      {np.aboutNote}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        { label: np.metaId,       value: meta.id },
                        { label: np.metaType,     value: meta.type },
                        { label: np.metaReadTime, value: meta.readTime },
                        { label: np.metaCategory, value: meta.category },
                        ...(meta.date ? [{ label: 'Published', value: new Date(meta.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }] : []),
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-fg-mute)' }}>{label}</span>
                          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--color-fg-dim)', textAlign: 'right' }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next note */}
                  {nextNote && nextNote.slug !== slug && (
                    <div>
                      <div className="sys-label mb-3">{np.nextNote}</div>
                      <Link to={`/notes/${nextNote.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                        <div
                          style={{ border: '1px solid var(--color-rule)', padding: '14px', transition: 'border-color 0.2s, background-color 0.2s' }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,37,64,0.3)'; e.currentTarget.style.backgroundColor = 'rgba(255,37,64,0.03)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-rule)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', opacity: 0.7 }}>
                            {nextNote.id}
                          </span>
                          <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '17px', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-fg)', margin: '5px 0 0', lineHeight: 1.1 }}>
                            {lang === 'es' && nextNote.titleEs ? nextNote.titleEs : nextNote.title}
                          </p>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </m.aside>
            </div>
          </div>
        </section>

        {/* ── Email capture ────────────────────────────────── */}
        <section style={{ borderTop: '1px solid var(--color-rule)' }} className="py-16">
          <div className="max-w-[860px] mx-auto px-6">
            <m.div
              style={{ border: '1px solid rgba(255,37,64,0.2)', padding: '32px 36px', position: 'relative', backgroundColor: 'rgba(255,37,64,0.04)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', backgroundColor: 'var(--color-accent)' }} aria-hidden="true" />
              <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '10px' }}>
                {np.fieldNotesLabel}
              </p>
              <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(18px, 3vw, 26px)', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-fg)', marginBottom: '8px', lineHeight: 1.1 }}>
                {np.subscribeHeadline}
              </p>
              <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: 'var(--color-fg-dim)', marginBottom: '20px', lineHeight: 1.7 }}>
                {np.subscribeBody}
              </p>
              <form
                onSubmit={e => { e.preventDefault(); const v = e.target.email.value; if (v) { window.open(`mailto:andresfe@byandresfe.com?subject=Subscribe%20Field%20Notes&body=${encodeURIComponent(v)}`, '_blank'); } }}
                style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={np.subscribePlaceholder}
                  style={{
                    flex: '1 1 200px',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '12px',
                    padding: '10px 14px',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--color-rule)',
                    color: 'var(--color-fg)',
                    outline: 'none',
                    letterSpacing: '0.04em',
                    minHeight: '40px',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,37,64,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-rule)'}
                />
                <button
                  type="submit"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '10px 20px',
                    backgroundColor: 'var(--color-accent)',
                    color: '#0a0a0a',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#cc1f34'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}
                >
                  {np.subscribeCta}
                </button>
              </form>
            </m.div>
          </div>
        </section>

        {/* ── Related Case Studies ─────────────────────────── */}
        {meta?.relatedCases?.length > 0 && (() => {
          const related = meta.relatedCases
            .map(s => cases.find(c => c.slug === s))
            .filter(Boolean);
          if (!related.length) return null;
          return (
            <section style={{ borderTop: '1px solid var(--color-rule)' }} className="py-12">
              <div className="max-w-[1100px] mx-auto px-6">
                <div className="mb-6">
                  <SectionTag label="Related Case Studies" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--color-rule)' }}>
                  {related.map(c => (
                    <Link
                      key={c.slug}
                      to={`/case/${c.slug}`}
                      className="p-5 transition-colors duration-200"
                      style={{ textDecoration: 'none', backgroundColor: 'var(--color-bg)', display: 'block' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.025)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-bg)'}
                    >
                      <div className="sys-label mb-1" style={{ color: 'var(--color-accent)' }}>{c.id}</div>
                      <div className="uppercase mb-2" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', color: 'var(--color-fg)', letterSpacing: '0.02em', lineHeight: 1.1 }}>
                        {c.title}
                      </div>
                      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'var(--color-fg-dim)', lineHeight: 1.6 }}>
                        {c.focus}
                      </div>
                      <div className="flex items-center gap-1.5 mt-3" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--color-accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        <span>Open case</span>
                        <span aria-hidden>→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* ── Footer nav ───────────────────────────────────── */}
        <section style={{ borderTop: '1px solid var(--color-rule)' }} className="py-12">
          <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
            <Link
              to="/notes"
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-fg-mute)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-fg-mute)')}
            >
              ← {np.allNotes}
            </Link>
            {nextNote && nextNote.slug !== slug && (
              <Link
                to={`/notes/${nextNote.slug}`}
                style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)', textDecoration: 'none' }}
              >
                {np.nextNoteCta} →
              </Link>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
