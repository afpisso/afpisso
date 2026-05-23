import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig, m, AnimatePresence } from 'framer-motion';
import './index.css';
import { LangProvider } from './contexts/LangContext';
import { LenisProvider, useLenis } from './contexts/LenisContext';
import { usePageMeta } from './hooks/usePageMeta';
import Nav from './components/Nav';
import Hero from './components/Hero';
import CaseFiles from './components/CaseFiles';
import Footer from './components/Footer';
import MenuOverlay from './components/MenuOverlay';
import Ticker from './components/Ticker';

// Below-fold homepage sections — deferred until after hero paint
const WhatIDo    = lazy(() => import('./components/WhatIDo'));
const HowIWork   = lazy(() => import('./components/HowIWork'));
const FieldNotes = lazy(() => import('./components/FieldNotes'));
const About      = lazy(() => import('./components/About'));
const Contact    = lazy(() => import('./components/Contact'));

// Decorative / desktop-only — lowest priority
const ScrollToTopButton = lazy(() => import('./components/ScrollToTopButton'));
const Cursor            = lazy(() => import('./components/Cursor'));
const Grain             = lazy(() => import('./components/Grain'));

// Route-level code splitting — pages load only when visited
const CasePage  = lazy(() => import('./pages/CasePage'));
const WorkPage  = lazy(() => import('./pages/WorkPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const NotesPage = lazy(() => import('./pages/NotesPage'));
const NotePage  = lazy(() => import('./pages/NotePage'));

// Easing
const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_IN  = [0.4,  0, 1,  1];

// Minimal fallback — matches the dark bg, no layout shift
function PageFallback() {
  return <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }} />;
}

// Section-level lazy fallback — invisible, no shift
function SectionFallback() {
  return null;
}

// ── Ticker content ─────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  'Game UX/UI Design',
  'HUD Clarity',
  'UI Systems',
  'Player Decision-Making',
  'UX Lead',
  'LiveOps UX',
  'UEFN / Fortnite',
  'VR Interfaces',
  'Accessibility',
  '11+ Years',
  'Bogotá — Remote',
  'Clarity before polish',
];
// Accent highlight: items at these indices render in red
const TICKER_ACCENT = [0, 4, 7];

// ── HomePage ───────────────────────────────────────────────────────────────────
function HomePage({ onMenuOpen }) {
  usePageMeta({});
  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <main>
        <Hero />

        {/* Ticker — breaks the hero/work transition, establishes skill set */}
        <Ticker items={TICKER_ITEMS} accent={TICKER_ACCENT} speed={42} />

        <CaseFiles />
        <Suspense fallback={<SectionFallback />}>
          <WhatIDo />
          <HowIWork />

          {/* Second ticker — rhythm break before notes/about */}
          <Ticker
            items={TICKER_ITEMS}
            accent={[2, 5, 10]}
            speed={48}
            reverse
          />

          <FieldNotes />
          <About />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

// ── NotFoundPage ───────────────────────────────────────────────────────────────
function NotFoundPage({ onMenuOpen }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
      <Nav onMenuOpen={onMenuOpen} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '6rem', color: 'rgba(255,37,64,0.15)', lineHeight: 1 }}>404</div>
          <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '14px', color: 'var(--color-fg-dim)', marginBottom: 24 }}>Page not found.</p>
          <a href="/" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'var(--color-accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>← Back to home</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ── Page transition wrapper ────────────────────────────────────────────────────
// Applied to the Routes block, keyed by pathname.
// Exit is fast (200ms ease-in) so users don't wait.
// Enter is smooth (400ms ease-out-quart).
const pageVariants = {
  initial: { opacity: 0,  y: 14  },
  enter:   { opacity: 1,  y: 0   },
  exit:    { opacity: 0,  y: -10, transition: { duration: 0.2, ease: EASE_IN } },
};

// ── AppRoutes ──────────────────────────────────────────────────────────────────
function AppRoutes() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const lenisRef = useLenis();

  // On route change: close menu + scroll to top
  useEffect(() => {
    setMenuOpen(false);
    // Use Lenis instant scroll when available, fallback to native
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname, lenisRef]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const open  = () => setMenuOpen(true);
  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── Page transitions ── */}
      {/*
        AnimatePresence mode="wait": exit finishes before enter begins.
        initial={false}: first render doesn't animate (no entry flash on load).
        key={location.pathname}: tells AnimatePresence which child changed.
      */}
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.38, ease: EASE_OUT }}
          style={{ minHeight: '100vh' }}
        >
          <Suspense fallback={<PageFallback />}>
            <Routes location={location}>
              <Route path="/"              element={<HomePage     onMenuOpen={open} />} />
              <Route path="/work"          element={<WorkPage     onMenuOpen={open} />} />
              <Route path="/about"         element={<AboutPage    onMenuOpen={open} />} />
              <Route path="/resume"        element={<ResumePage   onMenuOpen={open} />} />
              <Route path="/notes"         element={<NotesPage    onMenuOpen={open} />} />
              <Route path="/notes/:slug"   element={<NotePage     onMenuOpen={open} />} />
              <Route path="/case/:slug"    element={<CasePage     onMenuOpen={open} />} />
              {/* Legacy routes */}
              <Route path="/case-studies/:slug" element={<CasePage onMenuOpen={open} />} />
              <Route path="*"              element={<NotFoundPage onMenuOpen={open} />} />
            </Routes>
          </Suspense>
        </m.div>
      </AnimatePresence>

      {/* MenuOverlay lives outside transition wrapper so it doesn't animate with pages */}
      <MenuOverlay open={menuOpen} onClose={close} activeSection="WORK" />

      {/* Decorative overlays — outside transitions, always-present */}
      <Suspense fallback={null}>
        <ScrollToTopButton />
        <Cursor />
        <Grain />
      </Suspense>
    </>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    // reducedMotion="user" makes every m.* component respect the OS
    // prefers-reduced-motion setting automatically — no per-component
    // boilerplate needed. Manual useReducedMotion() hooks in Hero,
    // CaseCard, GlitchStrokeText etc. remain for custom JS logic.
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <LenisProvider>
          <AppRoutes />
        </LenisProvider>
      </LangProvider>
    </MotionConfig>
  );
}
