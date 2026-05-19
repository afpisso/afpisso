import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../contexts/LangContext';
import ContactOverlay from './ContactOverlay';
import SweepFill from './SweepFill';
import { analytics } from '../utils/analytics';

export default function Nav({ onMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactHover, setContactHover] = useState(false);
  const { t, lang, toggleLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
    <motion.nav
      aria-label="Site navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'border-b' : ''}`}
      style={{
        backgroundColor: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
        borderColor: 'var(--color-rule)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1], delay: 2 }}
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
            <div
              style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '14px', letterSpacing: '0.22em', color: 'var(--color-fg)', lineHeight: 1 }}
            >
              ByAndresFe
            </div>
            <div className="sys-label" style={{ marginTop: '2px' }}>{t.nav.logoSub}</div>
          </div>
        </Link>

        {/* Right: nav links + lang switch + contact + MENU+ */}
        <div className="flex items-center gap-3">
          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { to: '/work', label: t.nav.work },
              { to: '/notes', label: t.nav.notes },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-fg-mute)',
                  textDecoration: 'none',
                  padding: '6px 12px',
                  border: '1px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg)'; e.currentTarget.style.borderColor = 'var(--color-rule)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-mute)'; e.currentTarget.style.borderColor = 'transparent'; }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Available pill — desktop only */}
          <div
            aria-label={`Status: ${t.nav.status} — ${t.nav.statusSub}`}
            className="hidden md:flex flex-col justify-center px-3 py-1.5"
            style={{ border: '1px solid var(--color-rule)' }}
          >
            <div className="flex items-center gap-2">
              <div aria-hidden="true" className="pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span className="sys-label">{t.nav.status}</span>
            </div>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', letterSpacing: '0.1em', color: 'var(--color-fg-mute)', marginTop: '2px', paddingLeft: '14px' }}>
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
              minHeight: 34,
              transition: 'border-color 0.2s, color 0.2s',
              textTransform: 'uppercase',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'var(--color-fg-mute)'; }}
          >
            {t.nav.lang}
          </button>

          {/* Contact button — always visible */}
          <button
            onClick={() => setContactOpen(true)}
            aria-label={t.nav.contact}
            onMouseEnter={() => setContactHover(true)}
            onMouseLeave={() => setContactHover(false)}
            onFocus={() => setContactHover(true)}
            onBlur={() => setContactHover(false)}
            style={{
              position: 'relative', overflow: 'hidden',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11, letterSpacing: '0.14em',
              border: '1px solid var(--color-accent)',
              background: 'transparent',
              padding: '8px 14px', cursor: 'pointer',
              clipPath: 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))',
              minHeight: 44, display: 'flex', alignItems: 'center',
              textTransform: 'uppercase',
            }}
          >
            <SweepFill active={contactHover} fillColor="var(--color-accent)" activeTextColor="#0a0a0a">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: contactHover ? '#0a0a0a' : 'var(--color-accent)', transition: 'color 0.18s' }}>
                <span className="hidden xs:inline sm:inline">{t.nav.contact}</span>
                <span aria-hidden="true" style={{ fontSize: 13, lineHeight: 1 }}>◉</span>
              </span>
            </SweepFill>
          </button>

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
            {t.nav.menu}
          </button>
        </div>
      </div>
    </motion.nav>
    <ContactOverlay open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
