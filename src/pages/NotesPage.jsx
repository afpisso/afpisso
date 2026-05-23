import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { fieldNotes } from '../data/fieldNotes';
import { noteArticles } from '../data/noteArticles';
import { useLang } from '../contexts/LangContext';
import GlitchStrokeText from '../components/GlitchStrokeText';
import SectionTag from '../components/SectionTag';
import { usePageMeta } from '../hooks/usePageMeta';
import { m } from 'framer-motion';

const BASE_URL = 'https://byandresfe.com';

// Monochrome signal system — type name communicates the category, not color
const TYPE_STYLE = {
  color: 'var(--color-fg-dim)',
  backgroundColor: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--color-rule)',
};

export default function NotesPage({ onMenuOpen }) {
  const { t, lang } = useLang();

  usePageMeta({
    title: lang === 'es' ? 'Field Notes' : 'Field Notes',
    description: lang === 'es'
      ? 'Frameworks, análisis y notas de Andres Felipe Pisso sobre UX/UI para juegos, sistemas de interfaz, HUD, accesibilidad, UEFN, VR y diseño de producto digital.'
      : 'Field notes, frameworks and breakdowns by Andres Felipe Pisso on UX clarity, UI systems, HUD design, feedback, accessibility, UEFN, VR UX and digital product thinking.',
  });

  // Inject Blog + BreadcrumbList schema for this route
  useEffect(() => {
    const schemaId = 'ld-json-notes';
    let el = document.getElementById(schemaId);
    const schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL + '/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Field Notes', 'item': BASE_URL + '/notes' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': BASE_URL + '/notes#blog',
        'name': 'Field Notes',
        'description': 'Field notes, frameworks and breakdowns by Andres Felipe Pisso on UX clarity, UI systems, HUD design, feedback, accessibility, UEFN, VR UX and digital product thinking.',
        'url': BASE_URL + '/notes',
        'author': { '@id': BASE_URL + '/#person' },
        'isPartOf': { '@id': BASE_URL + '/#website' },
        'blogPost': fieldNotes.map(n => ({
          '@type': 'BlogPosting',
          'url': `${BASE_URL}/notes/${n.slug}`,
          'headline': n.title,
          'description': n.summary,
          'keywords': n.category,
          'datePublished': n.date,
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

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <main>
        <section className="pt-40 pb-20" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <m.div
              className="mb-8"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionTag label={t.fieldNotes.label} page="004" />
            </m.div>
            <m.h1
              className="uppercase"
              style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(4rem, 8vw, 7rem)', color: 'var(--color-fg)', lineHeight: 0.9, letterSpacing: '0.02em' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              {t.fieldNotes.headline.split(' ').slice(0, -1).join(' ')}<br />
              <GlitchStrokeText stroke="1.5px rgba(245,245,243,0.5)">{t.fieldNotes.headline.split(' ').slice(-1)}</GlitchStrokeText>
            </m.h1>
            <m.p
              className="mt-6"
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: 'var(--color-fg-dim)', lineHeight: 1.85, maxWidth: '520px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {t.fieldNotes.description}
            </m.p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--color-rule)' }}>
              {fieldNotes.map((note, i) => {
                return (
                  <m.article
                    key={note.id}
                    aria-label={note.title}
                    style={{ backgroundColor: 'transparent' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                  >
                    <Link
                      to={`/notes/${note.slug}`}
                      className="h-full p-6 flex flex-col"
                      style={{ textDecoration: 'none', display: 'flex' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="text-[10px] font-bold tracking-widest uppercase px-2 py-1"
                          style={{ fontFamily: '"JetBrains Mono", monospace', ...TYPE_STYLE }}
                        >
                          {note.type}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="sys-label">{note.readTime}</span>
                          <span className="sys-label">/</span>
                          <span className="sys-label">{note.category}</span>
                        </div>
                      </div>
                      <div className="mb-1">
                        <span className="text-[10px] font-bold" style={{ color: 'var(--color-accent)', fontFamily: '"JetBrains Mono", monospace', opacity: 0.7, letterSpacing: '0.15em' }}>
                          {note.id}
                        </span>
                      </div>
                      <h2 className="uppercase mb-4" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.2, color: 'rgba(240,238,234,0.85)' }}>
                        {lang === 'es' && note.titleEs ? note.titleEs : note.title}
                      </h2>
                      <p className="text-[13px] leading-relaxed flex-grow" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)' }}>
                        {lang === 'es' && note.summaryEs ? note.summaryEs : note.summary}
                      </p>
                      <div
                        className="flex items-center gap-2 mt-5 text-[10px] font-bold tracking-widest uppercase"
                        style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-accent)' }}
                      >
                        <span>{t.fieldNotes.readNote}</span>
                        <span aria-hidden="true">→</span>
                      </div>
                    </Link>
                  </m.article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
