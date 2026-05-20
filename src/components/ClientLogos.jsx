import { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

const CLIENTS = [
  { id: 'dnd',    name: 'Dungeons & Dragons', sub: 'Tabletop RPG' },
  { id: 'omd',    name: 'Orcs Must Die',       sub: 'Action Tower Defense' },
  { id: 'meta',   name: 'Meta',                sub: 'Social Technologies' },
  { id: 'twd',    name: 'The Walking Dead',    sub: 'Survival Universe' },
  { id: 'mintic', name: 'MinTIC Colombia',     sub: 'Gov. Technology' },
  { id: 'sura',   name: 'Sura',                sub: 'Insurance & Finance' },
  { id: 'schick', name: 'Schick',              sub: 'Consumer Products' },
  { id: 'intel',  name: 'Intel',               sub: 'Semiconductors' },
];

const SCRAMBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!&/*';

function LogoItem({ name, sub }) {
  const [display, setDisplay] = useState(name);
  const [glitching, setGlitching] = useState(false);
  const timer = useRef(null);
  const shouldReduce = useReducedMotion();

  const startGlitch = () => {
    if (glitching || shouldReduce) return;
    setGlitching(true);
    let iter = 0;
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setDisplay(
        name.split('').map((c, i) => {
          if (c === ' ' || c === '&') return c;
          if (i < iter) return c;
          return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
        }).join('')
      );
      iter += 0.7;
      if (iter >= name.length) {
        setDisplay(name);
        clearInterval(timer.current);
        setGlitching(false);
      }
    }, 32);
  };

  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <div
      className="logo-item"
      onMouseEnter={startGlitch}
      aria-label={name}
      style={{
        flexShrink: 0,
        padding: '14px 36px',
        borderLeft: '1px solid var(--color-rule)',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        userSelect: 'none',
        cursor: 'default',
      }}
    >
      <span
        className={glitching ? 'logo-name glitching' : 'logo-name'}
        data-text={name}
        style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(16px, 2vw, 21px)',
          letterSpacing: '0.06em',
          color: glitching ? 'var(--color-fg)' : 'rgba(245,245,243,0.62)',
          transition: 'color 0.12s',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        {display}
      </span>
      <span
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '7px',
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          color: glitching ? 'var(--color-accent)' : 'rgba(245,245,243,0.28)',
          transition: 'color 0.12s',
        }}
      >
        {sub}
      </span>
    </div>
  );
}

export default function ClientLogos() {
  const shouldReduce = useReducedMotion();
  // Duplicate for seamless infinite loop
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <div
      role="region"
      aria-label="Selected clients"
      style={{
        borderTop: '1px solid var(--color-rule)',
        borderBottom: '1px solid var(--color-rule)',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {/* Left fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 100,
          background: 'linear-gradient(90deg, var(--color-bg) 30%, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />
      {/* Right fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 100,
          background: 'linear-gradient(270deg, var(--color-bg) 30%, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />

      {/* Label */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
          fontFamily: '"JetBrains Mono", monospace', fontSize: '8px',
          letterSpacing: '0.20em', textTransform: 'uppercase',
          color: 'rgba(245,245,243,0.22)', zIndex: 3, pointerEvents: 'none',
          writingMode: 'vertical-rl',
        }}
      >
        Clients
      </div>

      {/* Marquee track */}
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: shouldReduce ? 'none' : 'marquee 32s linear infinite',
        }}
      >
        {items.map((c, i) => (
          <LogoItem key={`${c.id}-${i}`} name={c.name} sub={c.sub} />
        ))}
      </div>
    </div>
  );
}
