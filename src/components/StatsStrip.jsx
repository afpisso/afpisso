import { useState, useEffect, useRef } from 'react';
import { m, useReducedMotion, useInView } from 'framer-motion';
import { useLang } from '../contexts/LangContext';
import ClientLogos from './ClientLogos';

function CountUp({ target, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const shouldReduce = useReducedMotion();
  const numeric = parseInt(target, 10);
  const trailMatch = String(target).match(/[^0-9]+$/);
  const trail = trailMatch ? trailMatch[0] : suffix;
  // Start at the real value so SSG/no-JS HTML is correct (avoids "0+" in prerendered output)
  const [count, setCount] = useState(isNaN(numeric) ? 0 : numeric);

  useEffect(() => {
    if (!inView || isNaN(numeric)) return;
    if (shouldReduce) { setCount(numeric); return; }
    const delay = setTimeout(() => {
      setCount(0); // reset — parent opacity:0 hides the brief flash
      const duration = 900;
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setCount(Math.round(eased * numeric));
        if (progress < 1) requestAnimationFrame(tick);
        else setCount(numeric);
      };
      requestAnimationFrame(tick);
    }, 300);
    return () => clearTimeout(delay);
  }, [inView, numeric, shouldReduce]);

  return (
    <span ref={ref}>
      {isNaN(numeric) ? target : (
        <>
          {count}
          <span style={{ color: 'var(--color-accent)' }}>{trail}</span>
        </>
      )}
    </span>
  );
}

function StatReadout({ stat, index }) {
  const isPlatform = Number.isNaN(parseInt(stat.value, 10));
  const platformLines = isPlatform
    ? String(stat.value)
      .split(' · ')
      .reduce((lines, part, partIndex) => {
        const lineIndex = Math.floor(partIndex / 2);
        lines[lineIndex] = [...(lines[lineIndex] || []), part];
        return lines;
      }, [])
    : [];

  return (
    <m.div
      key={stat.label}
      className="relative min-h-[132px] md:min-h-[150px] flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
    >
      {index > 0 && (
        <div
          className="hidden md:block absolute left-0 top-6 bottom-6 w-px"
          style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
          aria-hidden="true"
        />
      )}
      <div
        className="tabular mb-3"
        style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: isPlatform ? 'clamp(2.1rem, 3.7vw, 4.2rem)' : 'clamp(3.5rem, 6.4vw, 6.5rem)',
          color: 'var(--color-fg)',
          letterSpacing: isPlatform ? '0.02em' : '0.01em',
          lineHeight: isPlatform ? 0.92 : 0.82,
          textShadow: '0 0 28px rgba(245,245,243,0.12)',
        }}
      >
        {isPlatform ? (
          <span>
            {platformLines.map((line) => (
              <span key={line.join('-')} style={{ display: 'block', whiteSpace: 'nowrap' }}>
                {line.map((part, partIndex) => (
                  <span key={part}>
                    {part}
                    {partIndex < line.length - 1 && <span style={{ color: 'var(--color-accent)' }}> · </span>}
                  </span>
                ))}
              </span>
            ))}
          </span>
        ) : (
          <CountUp target={stat.value} suffix="" />
        )}
      </div>
      <div
        className="sys-label"
        style={{
          color: 'var(--color-fg-dim)',
          letterSpacing: '0.18em',
          maxWidth: '18ch',
          lineHeight: 1.35,
        }}
      >
        {stat.label}
      </div>
    </m.div>
  );
}

export default function StatsStrip() {
  const { t } = useLang();

  return (
    <>
      <div
        className="relative z-10 overflow-hidden"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.12)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          background: 'linear-gradient(100deg, rgba(14,18,22,0.72) 0%, rgba(10,10,10,0.46) 54%, rgba(255,37,64,0.10) 100%)',
          backdropFilter: 'blur(22px) saturate(145%)',
          WebkitBackdropFilter: 'blur(22px) saturate(145%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(255,255,255,0.04)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, transparent 24%, rgba(255,37,64,0.08) 70%, transparent 100%)',
            opacity: 0.65,
          }}
        />
        <m.div
          className="relative z-10 w-full px-6 md:px-10 lg:px-14 py-4 md:py-5 grid grid-cols-2 md:grid-cols-4 gap-y-2 md:gap-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.trust.stats.map((stat, i) => <StatReadout key={stat.label} stat={stat} index={i} />)}
        </m.div>
      </div>

      <ClientLogos />
    </>
  );
}
