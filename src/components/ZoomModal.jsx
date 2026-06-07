/**
 * ZoomModal — shared fullscreen image viewer used across case studies and articles.
 *
 * Exports:
 *   ZoomModal       — fullscreen lightbox (multi-image with nav, or single)
 *   ZoomableImage   — drop-in wrapper: any image gets cursor:zoom-in + ZoomModal on click
 *   ScanSweep       — horizontal glare sweep (shared with gallery tiles)
 */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';

const ACCENT = '#ff2540';
const MONO   = '"Play", sans-serif';

const CORNER_STYLES = [
  { top: 0,    left: 0,    borderTop:    `1px solid ${ACCENT}`, borderLeft:   `1px solid ${ACCENT}` },
  { top: 0,    right: 0,   borderTop:    `1px solid ${ACCENT}`, borderRight:  `1px solid ${ACCENT}` },
  { bottom: 0, left: 0,    borderBottom: `1px solid ${ACCENT}`, borderLeft:   `1px solid ${ACCENT}` },
  { bottom: 0, right: 0,   borderBottom: `1px solid ${ACCENT}`, borderRight:  `1px solid ${ACCENT}` },
];

// ── Glare sweep (transform-only, Emil: props-transform-opacity) ──────────────
export function ScanSweep({ active, scanKey }) {
  return (
    <m.div
      key={scanKey}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 3 }}
    >
      <m.div
        style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%',
          background: 'linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.055) 50%, transparent 100%)',
        }}
        initial={{ x: '-100%' }}
        animate={active ? { x: '320%' } : { x: '-100%' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      />
    </m.div>
  );
}

// ── Fullscreen modal ──────────────────────────────────────────────────────────
// items: string[]  — array of image srcs
// activeIndex: number
// onClose / onNav(dir: +1 | -1)
// title: string — shown at bottom
export function ZoomModal({ items, activeIndex, onClose, onNav, title }) {
  const reduced = useReducedMotion();
  const [scanKey, setScanKey] = useState(0);
  const validItems = items.filter(Boolean);
  const total = validItems.length;
  const src   = items[activeIndex];
  const num   = String(activeIndex + 1).padStart(2, '0');

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft')  onNav(-1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNav]);

  useEffect(() => { setScanKey(k => k + 1); }, [activeIndex]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return createPortal(
    <m.div
      key="zoom-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.15 : 0.22, ease: 'easeOut' }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: 'rgba(8,8,8,0.96)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 64px)',
      }}
    >
      <m.div
        key={activeIndex}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
        transition={{ duration: reduced ? 0.2 : 0.38, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', width: '100%', maxWidth: '1200px',
          aspectRatio: '16/9', backgroundColor: '#060606', flexShrink: 0,
        }}
      >
        {src && (
          <img
            src={src}
            alt={total > 1 ? `${title} — ${activeIndex + 1} / ${total}` : (title || 'Image')}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        )}

        {CORNER_STYLES.map((s, i) => (
          <div key={i} aria-hidden="true" style={{ position: 'absolute', width: 28, height: 28, ...s }} />
        ))}

        <ScanSweep active={true} scanKey={scanKey} />

        {/* Counter (hidden when single image) */}
        {total > 1 && (
          <div style={{
            position: 'absolute', top: 10, left: 14, zIndex: 10,
            fontFamily: MONO, fontSize: '9px', letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', pointerEvents: 'none',
          }}>
            {num} / {String(total).padStart(2, '0')}
          </div>
        )}

        {total > 1 && (
          <>
            <button
              onClick={e => { e.stopPropagation(); onNav(-1); }}
              aria-label="Previous image"
              style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: '15%',
                background: 'linear-gradient(to right, rgba(8,8,8,0.55) 0%, transparent 100%)',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'flex-start', paddingLeft: 14, zIndex: 10,
                color: 'rgba(255,255,255,0.6)', fontFamily: MONO, fontSize: '11px',
                letterSpacing: '0.12em',
              }}
            >
              {'←'}
            </button>
            <button
              onClick={e => { e.stopPropagation(); onNav(1); }}
              aria-label="Next image"
              style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: '15%',
                background: 'linear-gradient(to left, rgba(8,8,8,0.55) 0%, transparent 100%)',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'flex-end', paddingRight: 14, zIndex: 10,
                color: 'rgba(255,255,255,0.6)', fontFamily: MONO, fontSize: '11px',
                letterSpacing: '0.12em',
              }}
            >
              {'→'}
            </button>
          </>
        )}
      </m.div>

      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: 20, right: 24, zIndex: 10000,
          fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none',
          cursor: 'pointer', padding: '8px 4px',
        }}
      >
        [ CLOSE ]
      </button>

      {title && (
        <div style={{
          position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.22)', whiteSpace: 'nowrap', pointerEvents: 'none',
        }}>
          {title}
        </div>
      )}
    </m.div>,
    document.body
  );
}

// ── ZoomableImage — drop-in wrapper ──────────────────────────────────────────
// Wraps any image src with hover state + ZoomModal on click.
// aspect: CSS aspect-ratio string e.g. '16/9'
// objectFit: 'cover' | 'contain'
export function ZoomableImage({ src, alt, aspect = '16/9', objectFit = 'cover', caption }) {
  const [open,    setOpen]    = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scanKey, setScanKey] = useState(0);

  if (!src) return null;

  return (
    <div>
      <m.div
        style={{
          position: 'relative', overflow: 'hidden',
          aspectRatio: aspect, backgroundColor: '#060606',
          cursor: 'zoom-in',
          border: `1px solid ${hovered ? 'rgba(255,37,64,0.35)' : 'rgba(255,255,255,0.07)'}`,
          transition: 'border-color 0.2s ease',
        }}
        onMouseEnter={() => { setHovered(true); setScanKey(k => k + 1); }}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpen(true)}
      >
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit, display: 'block' }}
        />

        <m.div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.18 }}
        >
          {CORNER_STYLES.map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 20, height: 20, ...s }} />
          ))}
        </m.div>

        <m.div
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: 10, right: 12, zIndex: 5,
            fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
            pointerEvents: 'none',
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.18 }}
        >
          [ zoom ]
        </m.div>

        <ScanSweep active={hovered} scanKey={scanKey} />
      </m.div>

      {caption && (
        <p style={{
          marginTop: '10px',
          fontFamily: MONO, fontSize: '12px',
          color: 'rgba(240,238,234,0.5)', letterSpacing: '0.04em', lineHeight: 1.6,
        }}>
          {caption}
        </p>
      )}

      <AnimatePresence>
        {open && (
          <ZoomModal
            items={[src]}
            activeIndex={0}
            onClose={() => setOpen(false)}
            onNav={() => {}}
            title={alt}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
