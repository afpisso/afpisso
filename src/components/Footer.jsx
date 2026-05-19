import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLang();

  return (
    <footer
      style={{ borderTop: '1px solid var(--color-rule)', backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
        <Link to="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }} aria-label="ByAndresFe home">
          <div
            className="w-6 h-6 flex items-center justify-center overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
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
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '13px', letterSpacing: '0.2em', color: 'var(--color-fg-dim)' }}
          >
            BYANDRESFE
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <span className="sys-label">byandresfe.com</span>
          <div className="h-3 w-[1px]" style={{ backgroundColor: 'var(--color-rule)' }} />
          <span className="sys-label">Game UX / UI</span>
          <div className="h-3 w-[1px]" style={{ backgroundColor: 'var(--color-rule)' }} />
          <span className="sys-label">{year}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
          <span className="sys-label" style={{ color: 'var(--color-accent)' }}>{t.nav.status}</span>
        </div>
      </div>
    </footer>
  );
}
