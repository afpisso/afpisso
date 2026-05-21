import { useLang } from '../contexts/LangContext';
import { StepNumber } from './CyberIcons';
import SectionHeading from './SectionHeading';
import { m } from 'framer-motion';

export default function HowIWork() {
  const { t } = useLang();
  const { label, headline, body, steps } = t.howIWork;

  return (
    <section id="how-i-work" className="py-28" style={{ borderTop: '1px solid var(--color-rule)', backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section heading */}
        <div className="mb-16">
          <SectionHeading label={label} page="005" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: supporting copy */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="mb-4"
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '11px',
                color: 'var(--color-accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {headline}
            </p>
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
          </m.div>

          {/* Right: steps */}
          <ol className="space-y-0">
            {steps.map((step, i) => (
              <m.li
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
              </m.li>
            ))}
            <li className="border-t" style={{ borderColor: 'var(--color-rule)' }} />
          </ol>
        </div>
      </div>
    </section>
  );
}
