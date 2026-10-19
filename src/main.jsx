import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import './index.css'
import App from './App.jsx'
import { langFromPath } from './utils/i18nRoutes.js'

// Spanish pages live under /es; the router strips the prefix so routes and
// links stay language-neutral.
const lang = langFromPath(window.location.pathname)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LazyMotion features={domAnimation}>
      <BrowserRouter basename={lang === 'es' ? '/es' : undefined}>
        <App lang={lang} />
      </BrowserRouter>
    </LazyMotion>
  </StrictMode>,
)
