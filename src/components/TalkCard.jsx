import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { localizePath } from '../utils/i18nRoutes.js';

const EASE_OUT = [0.16, 1, 0.3, 1];
const ACCENT = '#ff2540';
const MONO   = '"Play", sans-serif';
const BEBAS  = '"Bebas Neue", sans-serif';
const CHAMFER = 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)';

/**
 * TalkCard — cover + event chip + title, used on /speaking and the home strip.
 * `featured` lays the card out horizontally on large screens.
 */
export default function TalkCard({ talk, lang, featured = false, index = 0, compact = false }) {
  const t = (v) => v[lang] || v.es;
  const isWorkshop = talk.format.en.startsWith('Workshop');
  const cta = lang === 'es' ? (isWorkshop ? 'Ver taller' : 'Ver charla') : (isWorkshop ? 'View workshop' : 'View talk');
  const meta = [t(talk.format), talk.date].filter(Boolean).join(' · ');

  const body = (
    <div
      className={`group relative h-full grid ${featured ? 'lg:grid-cols-[1.45fr_1fr]' : ''}`}
      style={{ border: '1px solid var(--color-rule)', backgroundColor: 'rgba(8,8,8,0.55)', transition: 'border-color 0.25s' }}
    >
      {/* accent rule — grows on hover */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] w-16 group-hover:w-full z-10"
        style={{ backgroundColor: ACCENT, transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)' }}
      />

      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', ...(featured ? { minHeight: '100%' } : {}) }}>
        <img
          src={talk.cover}
          alt=""
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04]"
          style={{ transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.4s', filter: 'saturate(0.9) brightness(0.88)' }}
        />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,5,5,0) 45%, rgba(5,5,5,0.75) 100%)' }} />
        <span
          className="absolute left-4 top-4"
          style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#050505', backgroundColor: ACCENT, padding: '5px 12px 5px 9px', clipPath: CHAMFER }}
        >
          {talk.event}
        </span>
      </div>

      <div className={`flex flex-col ${compact ? 'p-5' : 'p-6 md:p-8'} ${featured ? 'lg:justify-center lg:p-12' : ''}`}>
        <div className="sys-label mb-3" style={{ color: 'var(--color-fg-mute)' }}>{meta}</div>
        <h3
          className="uppercase"
          style={{
            fontFamily: BEBAS,
            fontSize: featured ? 'clamp(2.2rem, 4.2vw, 4rem)' : compact ? 'clamp(1.6rem, 2.4vw, 2.1rem)' : 'clamp(1.9rem, 2.8vw, 2.7rem)',
            color: 'var(--color-fg)',
            lineHeight: 0.98,
            letterSpacing: '0.01em',
          }}
        >
          {t(talk.title)}
        </h3>
        {!compact && (
          <p className="mt-4" style={{ fontFamily: MONO, fontSize: '13px', color: 'var(--color-fg-dim)', lineHeight: 1.7, maxWidth: '46ch' }}>
            {t(talk.summary)}
          </p>
        )}
        <span
          className="mt-auto pt-6 inline-flex items-center gap-2"
          style={{ fontFamily: MONO, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT }}
        >
          {cta}
          <span aria-hidden="true" className="inline-block group-hover:translate-x-1" style={{ transition: 'transform 0.25s' }}>→</span>
        </span>
      </div>
    </div>
  );

  const linkStyle = { display: 'block', height: '100%', textDecoration: 'none' };
  const hover = {
    onMouseEnter: e => { e.currentTarget.firstChild.style.borderColor = 'rgba(255,37,64,0.5)'; },
    onMouseLeave: e => { e.currentTarget.firstChild.style.borderColor = 'var(--color-rule)'; },
  };

  return (
    <m.div
      className={featured ? 'md:col-span-2' : ''}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.07 * index }}
    >
      {talk.to.includes('#')
        ? <a href={localizePath(talk.to, lang)} style={linkStyle} aria-label={t(talk.title)} {...hover}>{body}</a>
        : <Link to={talk.to} style={linkStyle} aria-label={t(talk.title)} {...hover}>{body}</Link>}
    </m.div>
  );
}
