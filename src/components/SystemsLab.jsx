import { motion } from 'framer-motion';
import { useLang } from '../contexts/LangContext';
import GlitchStrokeText from './GlitchStrokeText';

export default function SystemsLab() {
  const { t } = useLang();
  const sl = t.systemsLab;

  return (
    <section id="systems" className="py-28" style={{ borderTop: '1px solid var(--color-rule)' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <motion.div
              className="flex items-center gap-4 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-[1px] w-8" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span className="sys-label">{sl.label}</span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-black uppercase tracking-tight"
              style={{ fontFamily: '"Bebas Neue", sans-serif', color: 'var(--color-fg)', lineHeight: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {sl.principlesLabel.split(' ').slice(0, -1).join(' ') || sl.principlesLabel}<br />
              <GlitchStrokeText stroke="1.5px rgba(240,238,234,0.5)">
                {sl.principlesLabel.split(' ').slice(-1)[0]}
              </GlitchStrokeText>
            </motion.h2>
          </div>
          <motion.p
            className="text-base self-end"
            style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)', lineHeight: 1.8, maxWidth: '420px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {sl.description}
          </motion.p>
        </div>

        {/* Principles */}
        <div className="mb-20">
          {sl.principles.map((p, i) => (
            <motion.div
              key={p.id}
              className="group flex items-start gap-6 py-7 border-t transition-colors duration-200"
              style={{ borderColor: 'var(--color-rule)' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(212,43,34,0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-rule)')}
            >
              <div
                className="text-[11px] font-bold pt-1 flex-shrink-0 w-8"
                style={{ fontFamily: '"Bebas Neue", sans-serif', color: 'var(--color-accent)', opacity: 0.6 }}
              >
                {p.id}
              </div>
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <h3
                  className="text-xl font-bold uppercase"
                  style={{ fontFamily: '"Bebas Neue", sans-serif', color: 'var(--color-fg)', fontSize: '16px', lineHeight: 1.3 }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)' }}
                >
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t" style={{ borderColor: 'var(--color-rule)' }} />
        </div>

        {/* Modules grid */}
        <div>
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-[1px] w-8" style={{ backgroundColor: 'var(--color-rule)' }} />
            <span className="sys-label">{sl.modulesLabel}</span>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px" style={{ backgroundColor: 'var(--color-rule)' }}>
            {sl.modules.map((mod, i) => (
              <motion.div
                key={mod.label}
                className="group p-5 transition-all duration-200 cursor-default"
                style={{ backgroundColor: 'rgba(8,8,8,0.42)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(18,4,7,0.62)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(8,8,8,0.42)')}
              >
                <div
                  className="text-[9px] font-bold tracking-widest uppercase mb-2"
                  style={{ color: 'var(--color-accent)', fontFamily: '"JetBrains Mono", monospace', opacity: 0.7 }}
                >
                  {mod.tag}
                </div>
                <div
                  className="text-[13px] font-semibold"
                  style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg)', lineHeight: 1.3 }}
                >
                  {mod.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
