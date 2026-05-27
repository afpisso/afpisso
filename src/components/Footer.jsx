import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { useLenis } from '../contexts/LenisContext';
import SignalTrigger from './SignalTrigger';
import AudioBars from './AudioBars';
import ScrambleText from './ScrambleText';
import { m } from 'framer-motion';

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/byandresfe', external: true },
  { label: 'Instagram', href: 'https://instagram.com/byandresfe', external: true },
  { label: 'X / Twitter', href: 'https://x.com/byandresfe', external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLang();
  const lenisRef = useLenis();

  return (
    <footer id="footer-tx" style={{ borderTop: '1px solid var(--color-rule)', backgroundColor: 'var(--color-bg)' }}>

      {/* END TRANSMISSION — typographic close statement */}
      <div
        className="max-w-[1400px] mx-auto px-6 py-16 md:py-24"
        style={{ borderBottom: '1px solid var(--color-rule)', overflow: 'hidden' }}
      >
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
            }}
          >
            <div style={{ width: 18, height: 1, backgroundColor: 'var(--color-accent)', opacity: 0.5 }} />
            <span
              style={{
                fontFamily:    '"JetBrains Mono", monospace',
                fontSize:      '9px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color:         'rgba(255,37,64,0.45)',
                fontWeight:    700,
              }}
            >
              // transmission complete
            </span>
            {/* SIG-FOOTER — Terminal Echo hunt trigger */}
            <SignalTrigger id="sig-footer" prominence="low" />
          </div>
          <p
            aria-hidden="true"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3rem, 8.5vw, 8rem)',
              lineHeight: 0.9,
              letterSpacing: '0.01em',
              color: 'rgba(240,238,234,0.08)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            END TRANSMISSION
          </p>
        </m.div>
      </div>

      {/* Upper section — tagline + nav */}
      <div
        className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start"
        style={{ borderBottom: '1px solid var(--color-rule)' }}
      >
        {/* Left — brand + tagline */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-3 mb-4 group"
            style={{ textDecoration: 'none' }}
            aria-label="ByAndresFe home"
            onClick={() => lenisRef?.current ? lenisRef.current.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: 'instant' })}
          >
            <div
              className="w-7 h-7 flex items-center justify-center overflow-hidden transition-colors duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
            >
              <img
                src="/logo-mark.png"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'block';
                }}
              />
              <svg width="14" height="14" viewBox="0 0 30 30" fill="none" aria-hidden="true" style={{ display: 'none' }}>
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M15 1 L30 29 L24 29 L21 22.5 H9 L6 29 L0 29 L15 1 Z M15 8 L20 22 H10 Z"
                  fill="white"
                />
                <rect x="8.5" y="20" width="13" height="3" fill="#ff2540" />
              </svg>
            </div>
            <span
              style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '15px', letterSpacing: '0.22em', color: 'var(--color-fg)' }}
            >
              BYANDRESFE
            </span>
          </Link>
          <p
            className="max-w-sm"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '11px',
              color: 'var(--color-fg-mute)',
              lineHeight: 1.75,
              letterSpacing: '0.02em',
            }}
          >
            {t.footer?.tagline || 'Game UX/UI, clarity systems and player decision-making.'}
          </p>
        </div>

        {/* Right — nav columns */}
        <div className="flex gap-10 flex-wrap">
          <div>
            <h3 className="sys-label mb-4" style={{ color: 'var(--color-fg-mute)' }}>
              {t.footer?.navWork || 'Work'}
            </h3>
            <nav className="flex flex-col gap-2.5">
              {[
                { to: '/work',       label: t.nav.work  || 'Case Files'  },
                { to: '/notes',      label: t.nav.notes || 'Field Notes' },
                { to: '/resume.pdf', label: t.footer?.resume || 'Resume', external: true },
              ].map(({ to, label, external }) =>
                external ? (
                  <a
                    key={to}
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] tracking-wider transition-colors duration-150 inline-flex items-center gap-1.5"
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      color: 'var(--color-fg-dim)',
                      textDecoration: 'none',
                      minHeight: '44px',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-fg)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-fg-dim)')}
                  >
                    <ScrambleText duration={300}>{label}</ScrambleText>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <Link
                    key={to}
                    to={to}
                    className="text-[11px] tracking-wider transition-colors duration-150 inline-flex items-center gap-1.5"
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      color: 'var(--color-fg-dim)',
                      textDecoration: 'none',
                      minHeight: '44px',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-fg-dim)')}
                  >
                    <ScrambleText duration={300}>{label}</ScrambleText>
                  </Link>
                )
              )}
            </nav>
          </div>

          <div>
            <h3 className="sys-label mb-4" style={{ color: 'var(--color-fg-mute)' }}>
              {t.footer?.navConnect || 'Connect'}
            </h3>
            <nav className="flex flex-col gap-2.5">
              {SOCIAL.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-wider transition-colors duration-150 inline-flex items-center gap-1"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    color: 'var(--color-fg-dim)',
                    textDecoration: 'none',
                    minHeight: '44px',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-fg-dim)')}
                >
                  <ScrambleText duration={300}>{label}</ScrambleText>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Lower bar — compact meta */}
      <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-5 flex-wrap">
          <span className="sys-label">byandresfe.com</span>
          <div className="h-3 w-[1px]" style={{ backgroundColor: 'var(--color-rule)' }} />
          <span className="sys-label">Game UX / UI</span>
          <div className="h-3 w-[1px]" style={{ backgroundColor: 'var(--color-rule)' }} />
          <span className="sys-label">© {year}</span>
        </div>

        <div className="flex items-center gap-2">
          <AudioBars active={true} color="var(--color-accent)" size={10} />
          <span className="sys-label" style={{ color: 'var(--color-accent)' }}>{t.nav.status}</span>
        </div>
      </div>

    </footer>
  );
}
