import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import ContactOverlay from './ContactOverlay';
import CyberBtn from './CyberBtn';
import AudioBars from './AudioBars';
import ScrambleText from './ScrambleText';
import { analytics } from '../utils/analytics';
import { m } from 'framer-motion';

export default function Nav({ onMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { t, lang, toggleLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
    {/* Skip-to-content link — visible on focus for keyboard users */}
    <a
      href="#home"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:px-4 focus:py-2 focus:text-[11px] focus:uppercase focus:tracking-widest"
      style={{ fontFamily: '"JetBrains Mono", monospace', backgroundColor: 'var(--color-accent)', color: '#0a0a0a' }}
    >
      Skip to content
    </a>

    <m.nav
      aria-label="Site navigation"
      className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'border-b' : ''}`}
      style={{
        backgroundColor: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
        borderColor: 'var(--color-rule)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 0.3s, border-color 0.3s',
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1], delay: 0.4 }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-4 flex items-center justify-between">

        {/* Logo / Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          aria-label={t.nav.logoLabel}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div
            className="w-10 h-10 relative flex items-center justify-center overflow-hidden transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <img
              src="/logo-mark.png"
              alt=""
              aria-hidden="true"
              width="40"
              height="40"
              className="w-full h-full object-contain p-1"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'block';
              }}
            />
            <svg width="22" height="22" viewBox="0 0 30 30" fill="none" aria-hidden="true" style={{ display: 'none' }}>
              <path fillRule="evenodd" clipRule="evenodd"
                d="M15 1 L30 29 L24 29 L21 22.5 H9 L6 29 L0 29 L15 1 Z M15 8 L20 22 H10 Z"
                fill="white"
              />
              <rect x="8.5" y="20" width="13" height="3" fill="#ff2540" />
            </svg>
            <div aria-hidden="true" className="absolute -bottom-[1px] -right-[1px] w-2 h-2" style={{ backgroundColor: 'var(--color-accent)' }} />
          </div>
          <div>
            <ScrambleText
              style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '14px', letterSpacing: '0.22em', color: 'var(--color-fg)', lineHeight: 1, display: 'block' }}
              duration={400}
            >
              ByAndresFe
            </ScrambleText>
            <div className="sys-label" style={{ marginTop: '2px' }}>{t.nav.logoSub}</div>
          </div>
        </Link>

        {/* Right: nav links + lang switch + contact + MENU+ */}
        <div className="flex items-center gap-3">
          {/* Desktop nav links — NavLink provides active state via aria-current */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { to: '/work', label: t.nav.work },
              { to: '/notes', label: t.nav.notes },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                style={({ isActive }) => ({
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                  textDecoration: 'none',
                  padding: '6px 12px',
                  border: `1px solid ${isActive ? 'rgba(255,37,64,0.35)' : 'transparent'}`,
                  transition: 'color 0.2s, border-color 0.2s',
                })}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-fg)';
                  e.currentTarget.style.borderColor = 'var(--color-rule)';
                }}
                onMouseLeave={e => {
                  // Restore active or default style after hover
                  const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
                  e.currentTarget.style.color = isActive ? 'var(--color-accent)' : 'var(--color-fg-mute)';
                  e.currentTarget.style.borderColor = isActive ? 'rgba(255,37,64,0.35)' : 'transparent';
                }}
              >
                <ScrambleText duration={300}>{label}</ScrambleText>
              </NavLink>
            ))}
          </div>

          {/* Available pill — desktop only */}
          <div
            aria-label={`Status: ${t.nav.status} — ${t.nav.statusSub}`}
            className="hidden md:flex flex-col justify-center px-3 py-1.5"
            style={{ border: '1px solid var(--color-rule)' }}
          >
            <div className="flex items-center gap-2">
              <AudioBars active={true} color="var(--color-accent)" size={10} />
              <span className="sys-label">{t.nav.status}</span>
            </div>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--color-fg-mute)', marginTop: '2px', paddingLeft: '16px' }}>
              {t.nav.statusSub}
            </span>
          </div>

          {/* Language switcher */}
          <button
            onClick={() => { analytics.languageSwitch(lang === 'en' ? 'es' : 'en'); toggleLang(); }}
            aria-label={`Switch language to ${t.nav.lang}`}
            className="hidden sm:flex items-center justify-center"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              letterSpacing: '0.14em',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent',
              color: 'var(--color-fg-mute)',
              padding: '6px 10px',
              cursor: 'pointer',
              minHeight: 44,
              transition: 'border-color 0.2s, color 0.2s',
              textTransform: 'uppercase',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'var(--color-fg-mute)'; }}
          >
            {t.nav.lang}
          </button>

          {/* Contact button — always visible */}
          <CyberBtn
            variant="accent-ghost"
            size="sm"
            showArrow={false}
            onClick={() => setContactOpen(true)}
            aria-label={t.nav.contact}
            style={{ minHeight: 44 }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <ScrambleText className="hidden sm:inline" duration={280}>{t.nav.contact}</ScrambleText>
              <span aria-hidden="true" style={{ fontSize: 13, lineHeight: 1 }}>◉</span>
            </span>
          </CyberBtn>

          {/* MENU + */}
          <button
            onClick={onMenuOpen}
            aria-label="Open navigation menu"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11, letterSpacing: '0.14em',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent', color: 'var(--color-fg)',
              padding: '8px 16px', cursor: 'pointer',
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              transition: 'border-color 0.2s, color 0.2s',
              minHeight: 44, display: 'flex', alignItems: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--color-fg)'; }}
          >
            <ScrambleText duration={260}>{t.nav.menu}</ScrambleText>
          </button>
        </div>
      </div>
    </m.nav>
    <ContactOverlay open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
