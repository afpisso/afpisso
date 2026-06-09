import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fieldNotes } from '../data/fieldNotes';
import { useLang } from '../contexts/LangContext';
import { useHunt } from '../contexts/HuntContext';
import SignalTrigger from './SignalTrigger';
import SectionHeading from './SectionHeading';
import CyberBtn from './CyberBtn';
import { m } from 'framer-motion';

// Normalised to the site's token system — no rainbow
const TYPE_GLYPHS = {
  'Deep Dive': '◈',
  'Reference':  '◇',
  'Framework':  '◆',
  'Checklist':  '◉',
  'Analysis':   '◎',
  'Tools':      '⊕',
};

export default function FieldNotes() {
  const [hovered, setHovered] = useState(null);
  const { t, lang } = useLang();
  useHunt(); // keeps context subscription alive
  const latestNotes = [...fieldNotes]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  const featuredNote = latestNotes[0];
  const supportingNotes = latestNotes.slice(1);

  const getTitle = (note) => (lang === 'es' && note.titleEs ? note.titleEs : note.title);
  const getSummary = (note) => (lang === 'es' && note.summaryEs ? note.summaryEs : note.summary);

  return (
    <section
      id="notes"
      className="py-20 md:py-24 relative"
      style={{ borderTop: '1px solid var(--color-rule)' }}
    >
      {/* Mobile: solid bg */}
      <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
      {/* Desktop: content right, particles left */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to left, #0a0a0a 0%, #0a0a0a 60%, rgba(10,10,10,0.92) 64%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.15) 78%, transparent 85%)',
      }} />
      <div className="relative z-10 md:max-w-[82ch] md:mx-auto lg:max-w-[62%] lg:mx-0 lg:ml-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <SectionHeading
            label={t.fieldNotes.label.split('/')[0].trim()}
            title={t.fieldNotes.sectionTitle}
            page="007"
          />
          <div className="flex items-start gap-12 mt-10 flex-wrap">
            <m.p
              className="text-base max-w-sm"
              style={{ fontFamily: '"Play", sans-serif', fontSize: 12, color: 'var(--color-fg-dim)', lineHeight: 1.85 }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              {t.fieldNotes.description}
            </m.p>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.45 }}
            >
              <CyberBtn to="/notes" variant="ghost" size="sm">
                {t.fieldNotes.viewAll}
              </CyberBtn>
            </m.div>
          </div>
        </div>

        {/* Latest field notes — one lead signal + four compact entries */}
        <div>
          {featuredNote && (() => {
            const isHovered = hovered === featuredNote.id;
            const glyph = TYPE_GLYPHS[featuredNote.type] || '◇';

            return (
              <m.article
                aria-label={getTitle(featuredNote)}
                className="group relative mb-3"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHovered(featuredNote.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  to={`/notes/${featuredNote.slug}`}
                  className="block relative overflow-hidden"
                  style={{
                    textDecoration: 'none',
                    borderTop: `1px solid ${isHovered ? 'var(--color-accent)' : 'var(--color-rule)'}`,
                    borderBottom: '1px solid var(--color-rule)',
                    background: isHovered
                      ? 'linear-gradient(100deg, rgba(255,37,64,0.08), rgba(255,37,64,0.02) 42%, transparent 100%)'
                      : 'linear-gradient(100deg, rgba(255,255,255,0.035), rgba(255,255,255,0.008) 52%, transparent 100%)',
                    transition: 'background 0.22s, border-color 0.22s',
                  }}
                  aria-label={getTitle(featuredNote)}
                  onFocus={() => setHovered(featuredNote.id)}
                  onBlur={() => setHovered(null)}
                >
                  <div
                    aria-hidden="true"
                    className="absolute right-4 top-2"
                    style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: 'clamp(4rem, 7vw, 6.8rem)',
                      lineHeight: 1,
                      color: 'rgba(240,238,234,0.045)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {featuredNote.id.replace('FN-', '')}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[120px_minmax(0,1fr)_128px] gap-6 md:gap-8 px-5 py-7 md:py-8 relative z-10">
                    <div>
                      <div className="sys-label mb-2" style={{ color: isHovered ? 'var(--color-accent)' : 'var(--color-fg-mute)' }}>
                        {lang === 'es' ? 'Última nota' : 'Latest note'}
                      </div>
                      <div style={{ fontFamily: '"Bebas Neue", sans-serif', color: isHovered ? 'var(--color-accent)' : 'var(--color-fg-dim)', fontSize: 30, lineHeight: 1 }} aria-hidden="true">
                        {glyph}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span
                          className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5"
                          style={{
                            fontFamily: '"Play", sans-serif',
                            border: `1px solid ${isHovered ? 'var(--color-accent-35)' : 'var(--color-rule)'}`,
                            color: isHovered ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                          }}
                        >
                          {featuredNote.type}
                        </span>
                        <span className="sys-label">{featuredNote.date.slice(0, 7)}</span>
                      </div>
                      <h3
                        className="uppercase"
                        style={{
                          fontFamily: '"Bebas Neue", sans-serif',
                          fontSize: 'clamp(2rem, 4.5vw, 4.8rem)',
                          lineHeight: 0.94,
                          letterSpacing: '0.015em',
                          color: isHovered ? 'var(--color-fg)' : 'rgba(240,238,234,0.9)',
                          maxWidth: '760px',
                        }}
                      >
                        {getTitle(featuredNote)}
                      </h3>
                      <p
                        className="mt-4 line-clamp-2"
                        style={{
                          fontFamily: '"Play", sans-serif',
                          fontSize: 13,
                          lineHeight: 1.8,
                          color: isHovered ? 'var(--color-fg-dim)' : 'var(--color-fg-mute)',
                          maxWidth: '620px',
                        }}
                      >
                        {getSummary(featuredNote)}
                      </p>
                    </div>

                    <div className="md:text-right md:border-l md:pl-6" style={{ borderColor: 'var(--color-rule)' }}>
                      <div className="sys-label">{featuredNote.readTime}</div>
                      <div className="sys-label mt-1" style={{ color: 'var(--color-fg-mute)' }}>{featuredNote.category}</div>
                      <div
                        className="mt-5 inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase"
                        style={{ fontFamily: '"Play", sans-serif', color: isHovered ? 'var(--color-accent)' : 'var(--color-fg-mute)' }}
                        aria-hidden="true"
                      >
                        <span>{t.fieldNotes.readNote}</span>
                        <span>›</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </m.article>
            );
          })()}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--color-rule)' }}>
          {supportingNotes.map((note, i) => {
            const isHovered = hovered === note.id;
            const glyph = TYPE_GLYPHS[note.type] || '◇';

            return (
              <m.article
                key={note.id}
                aria-label={getTitle(note)}
                className="group relative"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.08 + i * 0.04 }}
                onMouseEnter={() => setHovered(note.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ backgroundColor: 'var(--color-bg)' }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'top',
                  }}
                />

                <Link
                  to={`/notes/${note.slug}`}
                  className="block h-full py-5 px-5 transition-colors duration-200"
                  style={{
                    textDecoration: 'none',
                    backgroundColor: isHovered ? 'rgba(255,37,64,0.025)' : 'transparent',
                  }}
                  aria-label={getTitle(note)}
                  onFocus={() => setHovered(note.id)}
                  onBlur={() => setHovered(null)}
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div
                      className="text-[10px] tracking-widest"
                      style={{ color: isHovered ? 'var(--color-accent)' : 'var(--color-fg-mute)', transition: 'color 0.2s' }}
                    >
                      {note.id}
                    </div>
                    <div
                      className="text-[14px] mt-0.5"
                      style={{ color: isHovered ? 'var(--color-accent)' : 'var(--color-rule)', transition: 'color 0.25s' }}
                      aria-hidden="true"
                    >
                      {glyph}
                    </div>
                    <div className="sys-label text-right">{note.readTime}</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span
                        className="flex-shrink-0 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 transition-colors duration-200"
                        style={{
                          fontFamily: '"Play", sans-serif',
                          border: `1px solid ${isHovered ? 'var(--color-accent-35)' : 'var(--color-rule)'}`,
                          color: isHovered ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                        }}
                      >
                        {note.type}
                      </span>
                      <span className="sys-label">{note.category}</span>
                    </div>
                      <h3
                        className="uppercase mb-3 transition-colors duration-200"
                        style={{
                          fontFamily: '"Bebas Neue", sans-serif',
                          fontSize: 'clamp(1.35rem, 2.5vw, 2rem)',
                          lineHeight: 1.0,
                          letterSpacing: '0.02em',
                          color: isHovered ? 'var(--color-fg)' : 'rgba(240,238,234,0.8)',
                        }}
                      >
                        {getTitle(note)}
                      </h3>
                    <p
                      className="text-[12px] leading-relaxed line-clamp-3"
                      style={{
                        fontFamily: '"Play", sans-serif',
                        color: isHovered ? 'var(--color-fg-dim)' : 'var(--color-fg-mute)',
                        transition: 'color 0.2s',
                      }}
                    >
                      {getSummary(note)}
                    </p>
                  </div>

                  <div
                    className="mt-5 flex items-center gap-1.5 text-[10px] tracking-widest uppercase transition-all duration-200"
                    style={{
                      fontFamily: '"Play", sans-serif',
                      color: isHovered ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                      transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                    }}
                    aria-hidden="true"
                  >
                    <span>{t.fieldNotes.readNote}</span>
                    <span>›</span>
                  </div>
                </Link>
              </m.article>
            );
          })}
          </div>
          {/* SIG-NOTES — medium prominence [!] after the full notes list */}
          <div style={{ paddingTop: 4 }}>
            <SignalTrigger id="sig-notes" prominence="medium" style={{ padding: '6px 0' }} />
          </div>
        </div>

      </div>
    </section>
  );
}
