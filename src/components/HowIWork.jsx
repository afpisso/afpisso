import { useLang } from '../contexts/LangContext';
import { StepNumber, IconLoop, IconSearch, IconSignal, IconTest, IconDoc } from './CyberIcons';
import SectionHeading from './SectionHeading';
import { m } from 'framer-motion';

const STEP_ICONS = [IconLoop, IconSearch, IconSignal, IconTest, IconDoc];

export default function HowIWork() {
  const { t } = useLang();
  const { label, sectionTitle, headline, body, steps } = t.howIWork;

  return (
    <section id="how-i-work" className="py-24 relative" style={{ borderTop: '1px solid var(--color-rule)' }}>
      {/* Mobile: solid bg */}
      <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
      {/* Desktop: content left, particles right */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to right, #0a0a0a 0%, #0a0a0a 60%, rgba(10,10,10,0.92) 64%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.15) 78%, transparent 85%)',
      }} />
      <div className="relative z-10 lg:max-w-[62%] lg:mr-auto px-6">
        {/* Section heading */}
        <div className="mb-16">
          <SectionHeading label={label} title={sectionTitle} page="005" />
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
            {steps.map((step, i) => {
              const StepIcon = STEP_ICONS[i];
              return (
              <m.li
                key={step.num}
                className="flex gap-5 py-6 border-t"
                style={{ borderColor: 'var(--color-rule)' }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              >
                {/* Step icon + number stacked */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-0.5" style={{ minWidth: 28 }}>
                  {StepIcon && (
                    <div style={{ color: 'rgba(255,37,64,0.45)' }}>
                      <StepIcon size={18} />
                    </div>
                  )}
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
              );
            })}
            <li className="border-t" style={{ borderColor: 'var(--color-rule)' }} />
          </ol>
        </div>
      </div>
    </section>
  );
}
