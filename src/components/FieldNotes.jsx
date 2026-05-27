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

  return (
    <section
      id="notes"
      className="py-24 relative"
      style={{ borderTop: '1px solid var(--color-rule)' }}
    >
      {/* Mobile: solid bg */}
      <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
      {/* Desktop: content right, particles left */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to left, #0a0a0a 0%, #0a0a0a 60%, rgba(10,10,10,0.92) 64%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.15) 78%, transparent 85%)',
      }} />
      <div className="relative z-10 lg:max-w-[62%] lg:ml-auto px-6">

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
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'var(--color-fg-dim)', lineHeight: 1.85 }}
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

        {/* Editorial list — each note is a horizontal row */}
        <div>
          {fieldNotes.map((note, i) => {
            const isHovered = hovered === note.id;
            const glyph = TYPE_GLYPHS[note.type] || '◇';

            return (
              <m.article
                key={note.id}
                aria-label={note.title}
                className="group relative"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                onMouseEnter={() => setHovered(note.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] transition-colors duration-300"
                  style={{ backgroundColor: isHovered ? 'rgba(255,37,64,0.4)' : 'var(--color-rule)' }}
                />

                {/* Left accent pulse on hover */}
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
                  className="flex items-center gap-0 py-5 pl-5 pr-0 transition-colors duration-200"
                  style={{
                    textDecoration: 'none',
                    backgroundColor: isHovered ? 'rgba(255,37,64,0.025)' : 'transparent',
                  }}
                  aria-label={`Read note: ${note.title}`}
                  onFocus={() => setHovered(note.id)}
                  onBlur={() => setHovered(null)}
                >
                  {/* Note ID + glyph */}
                  <div
                    className="flex-shrink-0 w-28 hidden sm:block"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  >
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
                  </div>

                  {/* Title + type + summary */}
                  <div className="flex-grow min-w-0 pr-6">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3
                        className="uppercase transition-colors duration-200"
                        style={{
                          fontFamily: '"Bebas Neue", sans-serif',
                          fontSize: 'clamp(18px, 2vw, 24px)',
                          lineHeight: 1.1,
                          letterSpacing: '0.02em',
                          color: isHovered ? 'var(--color-fg)' : 'rgba(240,238,234,0.8)',
                        }}
                      >
                        {lang === 'es' && note.titleEs ? note.titleEs : note.title}
                      </h3>
                      <span
                        className="flex-shrink-0 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 transition-colors duration-200"
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          border: `1px solid ${isHovered ? 'rgba(255,37,64,0.35)' : 'var(--color-rule)'}`,
                          color: isHovered ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                        }}
                      >
                        {note.type}
                      </span>
                    </div>
                    <p
                      className="text-[12px] leading-relaxed line-clamp-2"
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        color: isHovered ? 'var(--color-fg-dim)' : 'var(--color-fg-mute)',
                        transition: 'color 0.2s',
                        maxWidth: '680px',
                      }}
                    >
                      {lang === 'es' && note.summaryEs ? note.summaryEs : note.summary}
                    </p>
                  </div>

                  {/* Meta + CTA — right side */}
                  <div
                    className="flex-shrink-0 flex flex-col items-end gap-2 pl-4 border-l ml-4"
                    style={{ borderColor: isHovered ? 'rgba(255,37,64,0.2)' : 'var(--color-rule)', transition: 'border-color 0.2s', minWidth: '120px' }}
                  >
                    <div className="text-right">
                      <div className="sys-label">{note.readTime}</div>
                      <div className="sys-label mt-0.5" style={{ color: 'var(--color-fg-mute)' }}>{note.category}</div>
                    </div>
                    <div
                      className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase transition-all duration-200"
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        color: isHovered ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                        transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                      }}
                      aria-hidden="true"
                    >
                      <span>{t.fieldNotes.readNote}</span>
                      <span>›</span>
                    </div>
                  </div>
                </Link>

                {/* Bottom border for last item */}
                {i === fieldNotes.length - 1 && (
                  <div className="h-[1px]" style={{ backgroundColor: 'var(--color-rule)' }} />
                )}

              </m.article>
            );
          })}
          {/* SIG-NOTES — medium prominence [!] after the full notes list */}
          <div style={{ paddingTop: 4 }}>
            <SignalTrigger id="sig-notes" prominence="medium" style={{ padding: '6px 0' }} />
          </div>
        </div>

      </div>
    </section>
  );
}
