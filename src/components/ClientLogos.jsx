import { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * ClientLogos — infinite marquee of brands/franchises worked with.
 *
 * Logo treatment:
 *   filter: brightness(0) invert(1) → converts any logo to white/monochromatic
 *   opacity: 0.28 idle → 0.88 hover — consistent with the site's muted-to-active pattern
 *
 * Logo sources:
 *   meta                 → Simple Icons via jsDelivr CDN
 *   Fortnite-Logo.wine.svg → logo.wine/logo/Fortnite
 *   OMDLogo.svg            → Robot Entertainment press kit
 *   TWDLogo.svg            → Skybound/AMC press kit
 *   DnDLogo.svg            → Wizards of the Coast / brandfetch.com
 *
 * If a local SVG is missing, the component falls back to the text-scramble display
 * automatically via the img onError handler.
 */

const CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons';

// height   = maxHeight inside the 44px container (optical weight control)
// maxWidth = caps wide wordmarks so they don't dominate the marquee
const CLIENTS = [
  { id: 'fortnite', name: 'Fortnite',           logo: '/logos/Fortnite-Logo.wine.svg', sub: 'UEFN · Creative',      height: 26, maxWidth: 160 },
  { id: 'starwars', name: 'Star Wars',           logo: '/logos/StarWarsLogo.svg',       sub: 'Roguelike One · UEFN', height: 30, maxWidth: 160 },
  { id: 'meta',     name: 'Meta',               logo: '/logos/metaLogo.svg',            sub: 'VR · Quest Platform',  height: 22, maxWidth: 90  },
  { id: 'omd',      name: 'Orcs Must Die',      logo: '/logos/OMDLogo.svg',             sub: 'VR · Quest 3',        height: 44, maxWidth: 120 },
  { id: 'twd',      name: 'The Walking Dead',   logo: '/logos/TWDLogo.svg',             sub: 'Survival Universe',    height: 32, maxWidth: 150 },
  { id: 'dnd',      name: 'Dungeons & Dragons', logo: '/logos/DnDLogo.svg',             sub: 'Tabletop RPG',         height: 28, maxWidth: 160 },
];

const SCRAMBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!&/*';

// LOGO_CONTAINER_H — fixed height that all items share for vertical alignment
const LOGO_CONTAINER_H = 44;

function LogoItem({ name, logo, sub, height = 30, maxWidth = 160 }) {
  const [imgFailed, setImgFailed]   = useState(false);
  const [hovered,   setHovered]     = useState(false);
  const [display,   setDisplay]     = useState(name);
  const [glitching, setGlitching]   = useState(false);
  const timer       = useRef(null);
  const shouldReduce = useReducedMotion();

  // Text scramble — only activates when image failed to load
  const startGlitch = () => {
    if (glitching || shouldReduce) return;
    setGlitching(true);
    let iter = 0;
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setDisplay(
        name.split('').map((c, i) => {
          if (c === ' ' || c === '&' || c === ':') return c;
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
      onMouseEnter={() => {
        setHovered(true);
        if (imgFailed) startGlitch();
      }}
      onMouseLeave={() => setHovered(false)}
      aria-label={name}
      style={{
        flexShrink:    0,
        padding:       '14px 36px',
        borderLeft:    '1px solid var(--color-rule)',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           6,
        userSelect:    'none',
        cursor:        'default',
      }}
    >
      {/* Fixed-height container — all logos share the same vertical footprint */}
      <div style={{
        height:         LOGO_CONTAINER_H,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
      }}>
        {!imgFailed ? (
          <img
            src={logo}
            width={maxWidth}
            height={height}
            alt={name}
            onError={() => setImgFailed(true)}
            style={{
              maxHeight:  `${height}px`,
              width:      'auto',
              maxWidth:   `${maxWidth}px`,
              objectFit:  'contain',
              filter:     'brightness(0) invert(1)',
              opacity:    hovered ? 0.88 : 0.28,
              transition: shouldReduce ? 'none' : 'opacity 0.22s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        ) : (
          /* Text fallback — scramble behavior when SVG is missing */
          <span
            className={glitching ? 'logo-name glitching' : 'logo-name'}
            data-text={name}
            style={{
              fontFamily:    '"Bebas Neue", sans-serif',
              fontSize:      'clamp(16px, 2vw, 21px)',
              letterSpacing: '0.06em',
              color:         hovered ? 'var(--color-fg)' : 'rgba(245,245,243,0.62)',
              transition:    'color 0.12s',
              whiteSpace:    'nowrap',
              lineHeight:    1,
            }}
          >
            {display}
          </span>
        )}
      </div>

      {/* Sub-label */}
      <span
        style={{
          fontFamily:   '"Play", sans-serif',
          fontSize:     '7px',
          letterSpacing:'0.20em',
          textTransform:'uppercase',
          color:        hovered ? 'var(--color-accent)' : 'rgba(245,245,243,0.22)',
          transition:   'color 0.12s',
          whiteSpace:   'nowrap',
        }}
      >
        {sub}
      </span>
    </div>
  );
}

export default function ClientLogos() {
  const shouldReduce = useReducedMotion();
  // Duplicate set for seamless infinite loop
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <div
      role="region"
      aria-label="Selected clients and franchises"
      style={{
        borderTop:       '1px solid var(--color-rule)',
        borderBottom:    '1px solid var(--color-rule)',
        overflow:        'hidden',
        position:        'relative',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {/* Edge fades */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 100,
          background: 'linear-gradient(90deg, var(--color-bg) 30%, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 100,
          background: 'linear-gradient(270deg, var(--color-bg) 30%, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />

      {/* Vertical label */}
      <div
        aria-hidden="true"
        style={{
          position:    'absolute',
          left:        24,
          top:         '50%',
          transform:   'translateY(-50%)',
          fontFamily:  '"Play", sans-serif',
          fontSize:    '8px',
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          color:       'rgba(245,245,243,0.22)',
          zIndex:      3,
          pointerEvents: 'none',
          writingMode: 'vertical-rl',
        }}
      >
        Clients
      </div>

      {/* Marquee track — 40s for 6 items (same visual speed as 32s for 8) */}
      <div
        style={{
          display:   'flex',
          width:     'max-content',
          animation: shouldReduce ? 'none' : 'marquee 40s linear infinite',
        }}
      >
        {items.map((c, i) => (
          <LogoItem key={`${c.id}-${i}`} name={c.name} logo={c.logo} sub={c.sub} height={c.height} maxWidth={c.maxWidth} />
        ))}
      </div>
    </div>
  );
}
