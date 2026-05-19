import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import { LangProvider } from './contexts/LangContext';
import { usePageMeta } from './hooks/usePageMeta';
import Nav from './components/Nav';
import Hero from './components/Hero';
import CaseFiles from './components/CaseFiles';
import WhatIDo from './components/WhatIDo';
import HowIWork from './components/HowIWork';
import SystemsLab from './components/SystemsLab';
import FieldNotes from './components/FieldNotes';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MenuOverlay from './components/MenuOverlay';
import ScrollToTopButton from './components/ScrollToTopButton';
import Cursor from './components/Cursor';
import DigitalAura from './components/DigitalAura';

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
        <WhatIDo />
        <HowIWork />
        <FieldNotes />
        <About />
        <Contact />
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
      <ScrollToTopButton />
      <Cursor />
      <DigitalAura />
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
