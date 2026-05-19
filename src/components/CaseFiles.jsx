import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CaseCard from './CaseCard';
import { cases } from '../data/cases';
import { useLang } from '../contexts/LangContext';
import GlitchStrokeText from './GlitchStrokeText';

export default function CaseFiles() {
  const { t } = useLang();
  // Public cases first, NDA-safe after — more content visible upfront
  const VISIBILITY_ORDER = { public: 0, 'nda-safe': 1, 'password-protected': 2, 'coming-soon': 3, legacy: 4 };
  const featured = [...cases.filter(c => c.featured)].sort(
    (a, b) => (VISIBILITY_ORDER[a.visibility] ?? 9) - (VISIBILITY_ORDER[b.visibility] ?? 9)
  );

  return (
    <section id="cases" className="py-28" style={{ borderTop: '1px solid var(--color-rule)' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <motion.div
              className="flex items-center gap-4 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-[1px] w-8" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span className="sys-label">{t.caseFiles.label}</span>
            </motion.div>
            <motion.h2
              className="uppercase"
              style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--color-fg)', lineHeight: 0.9, letterSpacing: '0.02em' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t.caseFiles.label.split(' ').slice(0, -1).join(' ')}<br />
              <GlitchStrokeText stroke="1.5px rgba(245,245,243,0.5)">{t.caseFiles.label.split(' ').slice(-1)}</GlitchStrokeText>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <p
              className="text-base max-w-sm"
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'var(--color-fg-dim)', lineHeight: 1.85 }}
            >
              Each project below represents a real design problem. Some are NDA-safe,
              some are public case studies. The role and focus area describe where the
              actual design work happened.
            </p>
            <Link
              to="/work"
              className="flex items-center gap-2 text-[10px] tracking-widest uppercase transition-colors duration-200 w-fit"
              style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-mute)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-fg-mute)'}
            >
              <span>{t.caseFiles.viewAll}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Case grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--color-rule)' }}>
          {featured.map((c, i) => (
            <div key={c.id} style={{ backgroundColor: 'transparent' }}>
              <CaseCard caseData={c} index={i} />
            </div>
          ))}
          {/* Filler cell for grid alignment */}
          {featured.length % 3 !== 0 && (
            <div
              className="hidden xl:block"
              style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-rule)' }}
            />
          )}
        </div>

        {/* Bottom note */}
        <motion.div
          className="mt-8 flex items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <div className="h-[1px] flex-grow" style={{ backgroundColor: 'var(--color-rule)' }} />
          <Link
            to="/work"
            className="sys-label whitespace-nowrap transition-colors duration-200"
            style={{ color: 'var(--color-fg-mute)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-fg-mute)'}
          >
            {t.caseFiles.viewAll} →
          </Link>
          <div className="h-[1px] flex-grow" style={{ backgroundColor: 'var(--color-rule)' }} />
        </motion.div>
      </div>
    </section>
  );
}
