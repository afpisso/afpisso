import { Component, useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig, animate } from 'framer-motion';
import './index.css';
import { LangProvider } from './contexts/LangContext';
import { LenisProvider, useLenis } from './contexts/LenisContext';
import { HuntProvider } from './contexts/HuntContext';
import { SignalAudioProvider } from './contexts/SignalAudioContext';
import { TransitionProvider } from './contexts/TransitionContext';
import HuntHUD from './components/HuntHUD';
import { usePageMeta } from './hooks/usePageMeta';
import Nav from './components/Nav';
import HeroStatementPin from './components/HeroStatementPin';
import CaseFiles from './components/CaseFiles';
import Footer from './components/Footer';
import MenuOverlay from './components/MenuOverlay';
import PageTransitionOverlay from './components/PageTransitionOverlay';
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
const AIChatBot         = lazy(() => import('./components/AIChatBot'));

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
const NotFoundPage    = lazy(() => import('./pages/NotFoundPage'));

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



function getActiveMenuSection(location) {
  const path = location.pathname;

  if (path === '/' && location.hash === '#contact') return 'CONTACT';
  if (path === '/') return 'HOME';
  if (path === '/work' || path.startsWith('/case/') || path.startsWith('/case-studies/')) return 'WORK';
  if (path === '/about' || path === '/resume') return 'ABOUT';
  if (path === '/notes' || path.startsWith('/notes/')) return 'JOURNAL';
  if (path === '/speaking') return 'SPEAKING';
  if (path === '/classified') return 'WORK';

  return 'HOME';
}

// ── AppRoutes ──────────────────────────────────────────────────────────────────
function AppRoutes() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const lenisRef = useLenis();
  const flashRef = useRef(null);
  const activeMenuSection = getActiveMenuSection(location);

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

      {/* MenuOverlay lives outside Routes so it doesn't animate with pages */}
      <MenuOverlay open={menuOpen} onClose={close} activeSection={activeMenuSection} />

      {/* Page transition overlay — red wipe for case entry, soft fade for prev/next */}
      <PageTransitionOverlay />

      {/* Decorative overlays — outside transitions, always-present */}
      <Suspense fallback={null}>
        <ScrollToTopButton />
        <Cursor />
        <Grain />
      </Suspense>

      {/* Signal Hunt HUD — invisible until first signal found */}
      <HuntHUD />

      {/* AI chatbot — HR/recruiting assistant */}
      <Suspense fallback={null}>
        <AIChatBot />
      </Suspense>

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
              <TransitionProvider>
                <AppRoutes />
              </TransitionProvider>
            </HuntProvider>
          </SignalAudioProvider>
        </LenisProvider>
      </LangProvider>
    </MotionConfig>
  );
}
