import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import { LangProvider } from './contexts/LangContext';
import { usePageMeta } from './hooks/usePageMeta';
import Nav from './components/Nav';
import Hero from './components/Hero';
import CaseFiles from './components/CaseFiles';
import Footer from './components/Footer';
import MenuOverlay from './components/MenuOverlay';

// Below-fold homepage sections — deferred until after hero paint
const WhatIDo  = lazy(() => import('./components/WhatIDo'));
const HowIWork = lazy(() => import('./components/HowIWork'));
const FieldNotes = lazy(() => import('./components/FieldNotes'));
const About    = lazy(() => import('./components/About'));
const Contact  = lazy(() => import('./components/Contact'));

// Decorative / desktop-only — lowest priority
const ScrollToTopButton = lazy(() => import('./components/ScrollToTopButton'));
const Cursor      = lazy(() => import('./components/Cursor'));
const DigitalAura = lazy(() => import('./components/DigitalAura'));

// Route-level code splitting — pages load only when visited
const CasePage    = lazy(() => import('./pages/CasePage'));
const WorkPage    = lazy(() => import('./pages/WorkPage'));
const AboutPage   = lazy(() => import('./pages/AboutPage'));
const ResumePage  = lazy(() => import('./pages/ResumePage'));
const NotesPage   = lazy(() => import('./pages/NotesPage'));
const NotePage    = lazy(() => import('./pages/NotePage'));

// Minimal fallback — matches the dark bg, no layout shift
function PageFallback() {
  return <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }} />;
}

// Section-level lazy fallback — invisible, no shift
function SectionFallback() {
  return null;
}

function HomePage({ onMenuOpen }) {
  // Default title/description handled by index.html; just ensure OG URL is correct
  usePageMeta({});
  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <main>
        <Hero />
        <CaseFiles />
        <Suspense fallback={<SectionFallback />}>
          <WhatIDo />
          <HowIWork />
          <FieldNotes />
          <About />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

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

function AppRoutes() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const open = () => setMenuOpen(true);
  const close = () => setMenuOpen(false);

  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage onMenuOpen={open} />} />
          <Route path="/work" element={<WorkPage onMenuOpen={open} />} />
          <Route path="/about" element={<AboutPage onMenuOpen={open} />} />
          <Route path="/resume" element={<ResumePage onMenuOpen={open} />} />
          <Route path="/notes" element={<NotesPage onMenuOpen={open} />} />
          <Route path="/notes/:slug" element={<NotePage onMenuOpen={open} />} />
          <Route path="/case/:slug" element={<CasePage onMenuOpen={open} />} />
          {/* Legacy routes */}
          <Route path="/case-studies/:slug" element={<CasePage onMenuOpen={open} />} />
          <Route path="*" element={<NotFoundPage onMenuOpen={open} />} />
        </Routes>
      </Suspense>
      <MenuOverlay
        open={menuOpen}
        onClose={close}
        activeSection="WORK"
      />
      <Suspense fallback={null}>
        <ScrollToTopButton />
        <Cursor />
        <DigitalAura />
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppRoutes />
    </LangProvider>
  );
}
