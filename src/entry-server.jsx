/**
 * SSR Entry Point — used only during pre-render build.
 * Renders each route to a static HTML string that crawlers can read.
 *
 * Uses renderToStaticMarkup (no React hydration markers) so the client
 * SPA boots cleanly without hydration mismatch errors.
 *
 * Lazy-loaded components from App.jsx are replaced here with eager
 * imports so the full page content is included in the static HTML.
 */

// ── Node.js globals polyfill (must run before any component imports) ────────
// LangContext reads localStorage + navigator.language in a useState initializer,
// so these need to exist before any module-level code runs.
const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
}
if (typeof globalThis.localStorage === 'undefined')  globalThis.localStorage  = noopStorage
if (typeof globalThis.sessionStorage === 'undefined') globalThis.sessionStorage = noopStorage
// Override navigator in Node.js — Node 21+ exposes navigator.language from the
// system locale (e.g. es-ES). Force 'en' so SSR always renders English content.
// navigator is getter-only in Node 24, so we must use defineProperty.
try {
  Object.defineProperty(globalThis, 'navigator', {
    value: { language: 'en' },
    configurable: true,
    writable: true,
  })
} catch (_) { /* already writable or not overridable — proceed */ }

// Suppress useLayoutEffect SSR warning from Framer Motion and other libs
import React from 'react'
if (typeof window === 'undefined') {
  React.useLayoutEffect = React.useEffect
}

import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { LangProvider } from './contexts/LangContext.jsx'

// Nav + Footer — always visible, include for internal link discovery
import Nav     from './components/Nav.jsx'
import Footer  from './components/Footer.jsx'

// Homepage above-fold sections (below-fold are lazy, won't render — that's fine)
import Hero      from './components/Hero.jsx'
import CaseFiles from './components/CaseFiles.jsx'

// Pages — eager imports so content is in the SSR output
import WorkPage   from './pages/WorkPage.jsx'
import AboutPage  from './pages/AboutPage.jsx'
import ResumePage from './pages/ResumePage.jsx'
import NotesPage  from './pages/NotesPage.jsx'
import NotePage   from './pages/NotePage.jsx'
import CasePage   from './pages/CasePage.jsx'

// No-op prop for event handlers that aren't needed during SSR
const noop = () => {}

function HomePageSSR() {
  return (
    <div>
      <Nav onMenuOpen={noop} />
      <main>
        <Hero />
        <CaseFiles />
      </main>
      <Footer />
    </div>
  )
}

function AppSSR() {
  return (
    <Routes>
      <Route path="/"              element={<HomePageSSR />} />
      <Route path="/work"          element={<WorkPage   onMenuOpen={noop} />} />
      <Route path="/about"         element={<AboutPage  onMenuOpen={noop} />} />
      <Route path="/resume"        element={<ResumePage onMenuOpen={noop} />} />
      <Route path="/notes"         element={<NotesPage  onMenuOpen={noop} />} />
      <Route path="/notes/:slug"   element={<NotePage  onMenuOpen={noop} />} />
      <Route path="/case/:slug"    element={<CasePage  onMenuOpen={noop} />} />
    </Routes>
  )
}

export function render(url) {
  return renderToStaticMarkup(
    <StaticRouter location={url}>
      <LangProvider>
        <AppSSR />
      </LangProvider>
    </StaticRouter>
  )
}
