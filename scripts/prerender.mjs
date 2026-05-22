/**
 * Pre-render script — Static HTML generation for SEO / non-JS crawlers.
 *
 * How it works:
 *   1. Reads the production HTML shell from dist/index.html (built by `vite build`)
 *   2. Imports the SSR bundle from dist-ssr/ (built by `vite build --config vite.ssr.config.js`)
 *   3. For each route, calls render(url) → HTML string via renderToStaticMarkup
 *   4. Injects the rendered HTML into the shell's <div id="root"> placeholder
 *   5. Writes dist/{route}/index.html so Vercel static file serving picks it up
 *
 * Why renderToStaticMarkup (no hydration markers):
 *   The client-side SPA boots fresh from index.html, so there are no hydration
 *   mismatches. Crawlers get full content. Users get the normal SPA experience.
 */

import fs   from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root      = path.resolve(__dirname, '..')
const distDir   = path.join(root, 'dist')
const ssrBundle = path.join(root, 'dist-ssr', 'entry-server.js')

// ── Routes to pre-render ────────────────────────────────────────────────────
const staticRoutes = [
  '/',
  '/work',
  '/about',
  '/notes',
]

const fieldNoteSlugs = [
  'what-is-a-game-ui-system',
  'clean-hud-vs-clear-hud',
  'feedback-reduces-guesswork',
  'ui-terminology-for-game-teams',
  'game-accessibility-checklist',
  'vr-ux-interface-clarity',
  'uefn-ux-lessons',
]

const caseSlugs = [
  'orcs-must-die-by-the-blade',
  'dungeons-and-dragons-fortnite',
  'the-walking-dead',
  'raptor-heist',
  'havoc-hotel',
]

const routes = [
  ...staticRoutes,
  ...fieldNoteSlugs.map(s => `/notes/${s}`),
  ...caseSlugs.map(s => `/case/${s}`),
]

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  // Verify build artifacts exist
  if (!fs.existsSync(distDir)) {
    console.error('❌  dist/ not found — run `vite build` first')
    process.exit(1)
  }
  if (!fs.existsSync(ssrBundle)) {
    console.error('❌  dist-ssr/entry-server.js not found — run `vite build --config vite.ssr.config.js` first')
    process.exit(1)
  }

  // Load HTML shell
  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')

  // Load SSR render function — must use file:// URL on Windows
  const { render } = await import(pathToFileURL(ssrBundle).href)

  let ok = 0
  let fail = 0

  for (const url of routes) {
    try {
      const appHtml = render(url)

      // Inject rendered markup into root div
      const html = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      )

      // Resolve output path: / → dist/index.html, /work → dist/work/index.html
      const outDir = url === '/'
        ? distDir
        : path.join(distDir, ...url.split('/').filter(Boolean))

      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8')

      console.log(`  ✓  ${url}`)
      ok++
    } catch (err) {
      console.error(`  ✗  ${url}  —  ${err.message}`)
      fail++
    }
  }

  console.log(`\n  Pre-rendered ${ok} routes${fail ? `, ${fail} failed` : ''}.`)
  if (fail > 0) process.exit(1)
}

main()
