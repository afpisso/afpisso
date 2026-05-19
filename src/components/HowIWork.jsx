import { motion } from 'framer-motion';
import { useLang } from '../contexts/LangContext';
import { StepNumber, ScanReticle } from './CyberIcons';

function RevealLine({ delay = 0 }) {
  return (
    <motion.div
      style={{ height: '1px', backgroundColor: 'var(--color-accent)', transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    />
  );
}

export default function HowIWork() {
  const { t } = useLang();
  const { label, headline, body, steps } = t.howIWork;

  return (
    <section id="how-i-work" className="py-28" style={{ borderTop: '1px solid var(--color-rule)', backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScanReticle size={13} color="var(--color-accent)" />
          <RevealLine />
          <span className="sys-label whitespace-nowrap">{label}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="uppercase mb-8"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: 'var(--color-fg)',
                letterSpacing: '0.02em',
                lineHeight: 1,
              }}
            >
              {headline}
            </h2>
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '13px',
                color: 'var(--color-fg-dim)',
                lineHeight: 1.85,
                maxWidth: '440px',
              }}
            >
              {body}
            </p>
          </motion.div>

          {/* Right: steps */}
          <ol className="space-y-0">
            {steps.map((step, i) => (
              <motion.li
                key={step.num}
                className="flex gap-6 py-6 border-t group"
                style={{ borderColor: 'var(--color-rule)' }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              >
                <div className="flex-shrink-0 pt-0.5">
                  <StepNumber num={step.num} />
                </div>
                <div>
                  <div
                    className="text-[13px] font-bold uppercase mb-1.5"
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      color: 'var(--color-fg)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '12px',
                      color: 'var(--color-fg-dim)',
                      lineHeight: 1.75,
                    }}
                  >
                    {step.body}
                  </div>
                </div>
              </motion.li>
            ))}
            <li className="border-t" style={{ borderColor: 'var(--color-rule)' }} />
          </ol>
        </div>
      </div>
    </section>
  );
}
