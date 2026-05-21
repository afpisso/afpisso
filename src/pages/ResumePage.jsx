import { useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useLang } from '../contexts/LangContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { analytics } from '../utils/analytics';
import { m } from 'framer-motion';

const experience = [
  {
    period: '2023 – Present',
    role: 'UX Lead',
    company: 'Game studio (NDA)',
    description: 'UX Lead across Game UX/UI, LiveOps, UEFN experiences, and VR productions. Responsible for UX strategy, UI system design, design documentation, and cross-discipline collaboration.',
  },
  {
    period: '2022 – 2023',
    role: 'Senior Game UX/UI Designer',
    company: 'Game studio (NDA)',
    description: 'UI systems design, HUD architecture, component states, player flow design, and handoff documentation for a live game title.',
  },
  {
    period: '2020 – 2022',
    role: 'Game Designer / UX/UI Designer',
    company: 'Various studios and clients',
    description: 'Game design, interaction design, and product UX/UI across mobile games and educational platforms.',
  },
];

const projects = [
  { title: 'Orcs Must Die: By the Blade', type: 'VR Game UX/UI', year: '2024' },
  { title: 'Dungeons & Dragons in Fortnite', type: 'UEFN / Game UX/UI', year: '2024' },
  { title: 'The Walking Dead (NDA)', type: 'Game UX/UI', year: '2024' },
  { title: 'Raptor Heist', type: 'UEFN / Game UX/UI', year: '2024' },
  { title: 'Havoc Hotel franchise', type: 'UEFN / UX Systems', year: '2023–2024' },
];

const skills = [
  'Game UX/UI', 'HUD design', 'UI systems', 'Player flows', 'Onboarding design',
  'Progression UX', 'LiveOps UX', 'VR UX', 'UEFN UX', 'Feedback systems',
  'Component architecture', 'UX documentation', 'Design handoff', 'Accessibility',
  'Cross-functional collaboration', 'UX leadership',
];

const tools = [
  'Figma', 'FigJam', 'UEFN', 'Unreal Engine (context)', 'Jira', 'Confluence',
  'Adobe Photoshop', 'Adobe Illustrator', 'Notion', 'Miro',
];

export default function ResumePage({ onMenuOpen }) {
  const { t, lang } = useLang();
  const r = t.resume;

  usePageMeta({
    title: lang === 'es' ? 'CV' : 'Resume',
    description: lang === 'es'
      ? 'CV de Andres Felipe Pisso — UX Lead y Diseñador Game UX/UI con 11+ años de experiencia.'
      : 'Resume of Andres Felipe Pisso — UX Lead and Game UX/UI Designer with 11+ years of experience.',
  });

  // Track resume page view on mount
  useEffect(() => { analytics.resumeView(); }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <main>
        <section className="pt-40 pb-28">
          <div className="max-w-[900px] mx-auto px-6">
            {/* Header */}
            <m.div
              className="flex items-end justify-between mb-16 pb-8 flex-wrap gap-4"
              style={{ borderBottom: '1px solid var(--color-rule)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <div className="sys-label mb-2" style={{ color: 'var(--color-accent)' }}>{r.label}</div>
                <h1
                  className="uppercase mb-2"
                  style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--color-fg)', lineHeight: 0.9, letterSpacing: '0.02em' }}
                >
                  {r.headline}
                </h1>
                <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: 'var(--color-fg-dim)' }}>
                  {r.subheadline}
                </p>
              </div>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 text-[11px] tracking-widest uppercase transition-colors duration-200"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  border: '1px solid var(--color-rule)',
                  color: 'var(--color-fg-dim)',
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-rule)'; e.currentTarget.style.color = 'var(--color-fg-dim)'; }}
                onClick={analytics.resumeDownload}
              >
                {r.download} ↓
              </a>
            </m.div>

            {/* Summary */}
            <m.section
              className="mb-16"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              <h2 className="sys-label mb-4" style={{ color: 'var(--color-accent)' }}>{r.sections.summary}</h2>
              <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '14px', color: 'rgba(240,238,234,0.75)', lineHeight: 1.85 }}>
                {r.summary}
              </p>
            </m.section>

            {/* Experience */}
            <m.section
              className="mb-16"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <h2 className="sys-label mb-6" style={{ color: 'var(--color-accent)' }}>{r.sections.experience}</h2>
              <dl className="space-y-0">
                {experience.map((exp, i) => (
                  <div key={i} className="py-6 border-t flex flex-col sm:flex-row gap-4 sm:gap-8" style={{ borderColor: 'var(--color-rule)' }}>
                    <dt className="text-[11px] flex-shrink-0 sm:w-36" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-mute)', letterSpacing: '0.05em' }}>
                      {exp.period}
                    </dt>
                    <dd>
                      <div className="text-[14px] font-bold uppercase mb-0.5" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg)' }}>
                        {exp.role}
                      </div>
                      <div className="text-[12px] mb-2" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-accent)', letterSpacing: '0.05em' }}>
                        {exp.company}
                      </div>
                      <p className="text-[13px]" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)', lineHeight: 1.75 }}>
                        {exp.description}
                      </p>
                    </dd>
                  </div>
                ))}
                <div className="border-t" style={{ borderColor: 'var(--color-rule)' }} />
              </dl>
            </m.section>

            {/* Selected Projects */}
            <m.section
              className="mb-16"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              <h2 className="sys-label mb-6" style={{ color: 'var(--color-accent)' }}>{r.sections.projects}</h2>
              <ul className="space-y-0">
                {projects.map((proj, i) => (
                  <li key={i} className="flex items-start justify-between gap-6 py-4 border-t" style={{ borderColor: 'var(--color-rule)' }}>
                    <div>
                      <div className="text-[13px] font-bold uppercase" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg)' }}>
                        {proj.title}
                      </div>
                      <div className="text-[11px]" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)', letterSpacing: '0.05em' }}>
                        {proj.type}
                      </div>
                    </div>
                    <div className="text-[11px] tabular flex-shrink-0" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-mute)' }}>
                      {proj.year}
                    </div>
                  </li>
                ))}
                <li className="border-t" style={{ borderColor: 'var(--color-rule)' }} />
              </ul>
            </m.section>

            {/* Skills + Tools grid */}
            <m.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <section>
                <h2 className="sys-label mb-4" style={{ color: 'var(--color-accent)' }}>{r.sections.skills}</h2>
                <ul className="flex flex-wrap gap-1.5">
                  {skills.map(s => (
                    <li key={s} className="text-[11px] px-2 py-1" style={{ fontFamily: '"JetBrains Mono", monospace', border: '1px solid var(--color-rule)', color: 'var(--color-fg-dim)' }}>
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="sys-label mb-4" style={{ color: 'var(--color-accent)' }}>{r.sections.tools}</h2>
                <ul className="flex flex-wrap gap-1.5">
                  {tools.map(s => (
                    <li key={s} className="text-[11px] px-2 py-1" style={{ fontFamily: '"JetBrains Mono", monospace', border: '1px solid var(--color-rule)', color: 'var(--color-fg-dim)' }}>
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            </m.div>

            {/* Education + Languages */}
            <m.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            >
              <section>
                <h2 className="sys-label mb-4" style={{ color: 'var(--color-accent)' }}>{r.sections.education}</h2>
                <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: 'var(--color-fg-dim)', lineHeight: 1.75 }}>
                  Digital Design / Interactive Media<br />
                  Colombia
                </p>
              </section>
              <section>
                <h2 className="sys-label mb-4" style={{ color: 'var(--color-accent)' }}>{r.sections.languages}</h2>
                <ul style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: 'var(--color-fg-dim)', lineHeight: 2 }}>
                  {r.languageList.map(l => <li key={l}>{l}</li>)}
                </ul>
              </section>
            </m.div>

            {/* Contact */}
            <m.section
              className="pt-8"
              style={{ borderTop: '1px solid var(--color-rule)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <h2 className="sys-label mb-4" style={{ color: 'var(--color-accent)' }}>{r.sections.contact}</h2>
              <div className="flex flex-wrap gap-6" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: 'var(--color-fg-dim)' }}>
                <a href="mailto:afpisso@gmail.com" style={{ color: 'var(--color-fg-dim)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-fg-dim)'}
                  onClick={() => analytics.emailClick('resume-page')}
                >
                  afpisso@gmail.com
                </a>
                <a href="https://linkedin.com/in/byandresfe" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-fg-dim)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-fg-dim)'}
                  onClick={() => analytics.linkedinClick('resume-page')}
                >
                  LinkedIn
                </a>
                <span>{r.locationRemote}</span>
              </div>
            </m.section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
