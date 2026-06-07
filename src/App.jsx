import { Component, useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig, m, AnimatePresence, animate } from 'framer-motion';
import './index.css';
import { LangProvider } from './contexts/LangContext';
import { LenisProvider, useLenis } from './contexts/LenisContext';
import { HuntProvider } from './contexts/HuntContext';
import { SignalAudioProvider } from './contexts/SignalAudioContext';
import HuntHUD from './components/HuntHUD';
import { usePageMeta } from './hooks/usePageMeta';
import Nav from './components/Nav';
import HeroStatementPin from './components/HeroStatementPin';
import CaseFiles from './components/CaseFiles';
import Footer from './components/Footer';
import MenuOverlay from './components/MenuOverlay';
import StatsStrip from './components/StatsStrip';
import HomeGeometryLayer from './components/HomeGeometryLayer';

// Below-fold homepage sections — deferred until after hero paint
const FieldNotes = lazy(() => import('./components/FieldNotes'));
const IGStrip    = lazy(() => import('./components/IGStrip'));
const Contact    = lazy(() => import('./components/Contact'));

// Decorative / desktop-only — lowest priority
const ScrollToTopButton = lazy(() => import('./components/ScrollToTopButton'));
const Cursor            = lazy(() => import('./components/Cursor'));
const Grain             = lazy(() => import('./components/Grain'));

// Route-level code splitting — pages load only when visited
const CasePage        = lazy(() => import('./pages/CasePage'));
const WorkPage        = lazy(() => import('./pages/WorkPage'));
const AboutPage       = lazy(() => import('./pages/AboutPage'));
const ResumePage      = lazy(() => import('./pages/ResumePage'));
const NotesPage       = lazy(() => import('./pages/NotesPage'));
const NotePage        = lazy(() => import('./pages/NotePage'));
const ClassifiedPage  = lazy(() => import('./pages/ClassifiedPage'));
const SpeakingPage    = lazy(() => import('./pages/SpeakingPage'));
const LabHome         = lazy(() => import('./pages/LabHome')); // isolated prototype — /lab

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

class LabErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[lab-error-boundary]', error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div style={{
        minHeight: '100vh',
        background: '#080808',
        color: '#f5f5f3',
        padding: '96px 24px',
        fontFamily: '"Play", monospace',
      }}>
        <div style={{
          maxWidth: 820,
          margin: '0 auto',
          border: '1px solid rgba(255,37,64,0.55)',
          padding: 24,
          background: 'rgba(255,37,64,0.04)',
        }}>
          <div style={{ color: 'var(--color-accent)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
            Lab runtime error
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: 12, color: 'rgba(245,245,243,0.82)' }}>
            {this.state.error?.stack || this.state.error?.message || String(this.state.error)}
          </pre>
        </div>
      </div>
    );
  }
}

function LabRoute({ onMenuOpen }) {
  return (
    <LabErrorBoundary>
      <Nav onMenuOpen={onMenuOpen} />
      <Suspense fallback={
        <div style={{
          minHeight: '100vh',
          background: '#080808',
          color: 'var(--color-accent)',
          display: 'grid',
          placeItems: 'center',
          fontFamily: '"Play", monospace',
          fontSize: 11,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
        }}>
          Loading lab
        </div>
      }>
        <LabHome />
      </Suspense>
    </LabErrorBoundary>
  );
}

// ── Ticker content ─────────────────────────────────────────────────────────────
// ── HomePage ───────────────────────────────────────────────────────────────────
function HomePage({ onMenuOpen }) {
  usePageMeta({});
  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <HomeGeometryLayer />
      <main id="main-content">
        <HeroStatementPin hideLabHeroTopBar />

        <CaseFiles />
        <Suspense fallback={<SectionFallback />}>
          <FieldNotes />
          <IGStrip />
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
          <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '6rem', color: 'var(--color-accent-15)', lineHeight: 1 }}>404</div>
          <p style={{ fontFamily: '"Play", sans-serif', fontSize: '14px', color: 'var(--color-fg-dim)', marginBottom: 24 }}>Page not found.</p>
          <a href="/" style={{ fontFamily: '"Play", sans-serif', fontSize: '11px', color: 'var(--color-accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>← Back to home</a>
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
  const flashRef = useRef(null);

  // On route change: close menu + scroll to top + red micro-flash
  useEffect(() => {
    setMenuOpen(false);
    // Use Lenis instant scroll when available, fallback to native
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    // Brand micro-flash: peaks at 7% red opacity, fades in 280ms
    // Fires on the exit beat so the enter feels clean
    if (flashRef.current) {
      animate(
        flashRef.current,
        { opacity: [0, 0.07, 0] },
        { duration: 0.28, ease: [0.16, 1, 0.3, 1], times: [0, 0.28, 1] },
      );
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
      <a href="#main-content" className="skip-to-content">Skip to content</a>

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
              <Route path="/case/:slug"    element={<CasePage        onMenuOpen={open} />} />
              <Route path="/classified"   element={<ClassifiedPage  onMenuOpen={open} />} />
              <Route path="/speaking"     element={<SpeakingPage    onMenuOpen={open} />} />
              <Route path="/lab"          element={<LabRoute onMenuOpen={open} />} />
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

      {/* Signal Hunt HUD — invisible until first signal found */}
      <HuntHUD />

      {/* Brand micro-flash — imperatively animated on route change */}
      <div
        ref={flashRef}
        aria-hidden="true"
        style={{
          position:        'fixed',
          inset:           0,
          backgroundColor: 'var(--color-accent)',
          opacity:         0,
          pointerEvents:   'none',
          zIndex:          45,
        }}
      />
    </>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────────
export default function App() {
  // Console hint — visible in browser devtools, thematic breadcrumb
  useEffect(() => {
    console.log(
      '%c// AFPISSO.SYS — 6 SIGNALS ACTIVE\n// explore the system. some layers are not obvious.',
      'color:var(--color-accent-55);font-family:monospace;font-size:11px;letter-spacing:2px;line-height:1.8',
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // reducedMotion="user" makes every m.* component respect the OS
    // prefers-reduced-motion setting automatically — no per-component
    // boilerplate needed. Manual useReducedMotion() hooks in Hero,
    // CaseCard, GlitchStrokeText etc. remain for custom JS logic.
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <LenisProvider>
          <SignalAudioProvider>
            <HuntProvider>
              <AppRoutes />
            </HuntProvider>
          </SignalAudioProvider>
        </LenisProvider>
      </LangProvider>
    </MotionConfig>
  );
}
