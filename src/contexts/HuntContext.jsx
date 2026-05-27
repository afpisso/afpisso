/**
 * HuntContext — Signal Hunt easter egg system.
 *
 * 6 signals hidden across the site. Finding all unlocks /classified.
 * Progress persists via localStorage. Proximity (0–1) tracks how close
 * the cursor is to any unfound signal — consumed by Cursor.jsx for glitch FX.
 */

import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

// ── HuntIcon — consistent logo-red symbol used everywhere in the hunt ──────────
// The site's geometric "A" mark rendered all-red. Exported so any signal
// trigger can use it without importing an image.
export function HuntIcon({ size = 12, opacity = 1, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0, opacity, ...style }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 1 L30 29 L24 29 L21 22.5 H9 L6 29 L0 29 L15 1 Z M15 8 L20 22 H10 Z"
        fill="var(--color-accent)"
      />
      <rect x="8.5" y="20" width="13" height="3" fill="var(--color-accent)" />
    </svg>
  );
}

// ── Signal registry ────────────────────────────────────────────────────────────
export const SIGNALS = [
  {
    id:    'sig-hero',
    label: 'GRID ANOMALY',
    hint:  '// somewhere in the grid',
    page:  'Command Center',
  },
  {
    id:    'sig-konami',
    label: 'LEGACY PROTOCOL',
    hint:  '// a code older than this site',
    page:  'System-wide',
  },
  {
    id:    'sig-work',
    label: 'CLASSIFIED RECORD',
    hint:  '// the record doesn\'t end there',
    page:  'Case Files',
  },
  {
    id:    'sig-about',
    label: 'OPERATOR QUERY',
    hint:  '// the question has an answer',
    page:  'Operator Profile',
  },
  {
    id:    'sig-notes',
    label: 'DEAD FREQUENCY',
    hint:  '// one section carries a signal',
    page:  'Field Notes',
  },
  {
    id:    'sig-footer',
    label: 'TERMINAL ECHO',
    hint:  '// the transmission isn\'t complete yet',
    page:  'Footer',
  },
];

const STORAGE_KEY = 'afp-hunt-v1';
const KONAMI_SEQ  = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

// ── Context ────────────────────────────────────────────────────────────────────
const HuntContext = createContext(null);

export function HuntProvider({ children }) {
  const [found, setFound] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [lastAcquired, setLastAcquired] = useState(null);

  // Set when clicking an already-found signal — triggers the "already logged" toast
  const [reacquired, setReacquired] = useState(null);

  // 0 = cursor far from all signals  /  1 = cursor on top of a signal
  const [proximity, setProximity] = useState(0);

  // Ref mirrors state so closures stay current
  const foundRef = useRef(found);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...found])); } catch {}
    foundRef.current = found;
  }, [found]);

  // ── Konami code listener ─────────────────────────────────────────────────────
  useEffect(() => {
    let seq = [];
    const onKey = (e) => {
      seq.push(e.key);
      if (seq.length > KONAMI_SEQ.length) seq = seq.slice(-KONAMI_SEQ.length);
      if (seq.length === KONAMI_SEQ.length && seq.every((k, i) => k === KONAMI_SEQ[i])) {
        acquireSignal('sig-konami');
        seq = [];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── acquireSignal ────────────────────────────────────────────────────────────
  const acquireSignal = useCallback((id) => {
    if (foundRef.current.has(id)) {
      // Already found — show the "duplicate signal" toast briefly
      setReacquired(id);
      const timer = setTimeout(() => setReacquired(null), 2500);
      return () => clearTimeout(timer);
    }
    const next = new Set([...foundRef.current, id]);
    foundRef.current = next;
    setFound(next);
    setLastAcquired(id);
    const timer = setTimeout(() => setLastAcquired(null), 4000);
    return () => clearTimeout(timer);
  }, []);

  const isFound  = useCallback((id) => foundRef.current.has(id), []);
  const allFound = found.size >= SIGNALS.length;

  return (
    <HuntContext.Provider value={{
      found, acquireSignal, isFound, allFound,
      lastAcquired, reacquired, signals: SIGNALS,
      proximity, setProximity,
    }}>
      {children}
    </HuntContext.Provider>
  );
}

export function useHunt() {
  const ctx = useContext(HuntContext);
  if (!ctx) throw new Error('useHunt must be inside HuntProvider');
  return ctx;
}
