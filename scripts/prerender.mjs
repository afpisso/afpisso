/**
 * Pre-render script — Static HTML generation for SEO / non-JS crawlers.
 *
 * What it does:
 *   1. Reads the production HTML shell from dist/index.html
 *   2. Imports the SSR bundle from dist-ssr/entry-server.js
 *   3. For each route:
 *      a. Injects page-specific <title>, <meta description>, <canonical>, OG, Twitter
 *      b. Injects page-specific JSON-LD schema (BreadcrumbList, BlogPosting, CreativeWork, etc.)
 *      c. Injects rendered app HTML into <div id="root">
 *      d. Writes dist/{route}/index.html
 *   4. Generates dist/sitemap.xml with lastmod dates from content data
 *
 * Why renderToStaticMarkup (no hydration markers):
 *   The client-side SPA boots fresh — no hydration mismatches.
 *   Crawlers get full content. Users get the normal SPA experience.
 */

import fs   from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// ── Data imports (plain JS modules — no React deps) ─────────────────────────
import { fieldNotes } from '../src/data/fieldNotes.js'
import { cases }      from '../src/data/cases.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root      = path.resolve(__dirname, '..')
const distDir   = path.join(root, 'dist')
const ssrBundle = path.join(root, 'dist-ssr', 'entry-server.js')

const BASE      = 'https://byandresfe.com'
const SITE_NAME = 'ByAndresFe'
const BUILD_DATE = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

const DEFAULT_TITLE = 'Andres Felipe Pisso | UX Lead & Game UX/UI Designer'
const DEFAULT_DESC  =
  'Portfolio of Andres Felipe Pisso, a UX Lead and Game UX/UI Designer focused on clarity, feedback, UI systems, HUD design, LiveOps UX, UEFN and better decisions across games and digital products. 11+ years.'

// ── Routes to pre-render ────────────────────────────────────────────────────
const staticRoutes = ['/', '/work', '/about', '/notes']

const routes = [
  ...staticRoutes,
  ...fieldNotes.map(n => `/notes/${n.slug}`),
  ...cases.filter(c => c.featured).map(c => `/case/${c.slug}`),
]

// ── HTML escape helpers ─────────────────────────────────────────────────────
const esc      = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escAttr  = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
const escTitle = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// ── Schema builders ─────────────────────────────────────────────────────────
const PERSON_REF  = { '@id': `${BASE}/#person` }
const WEBSITE_REF = { '@id': `${BASE}/#website` }

function breadcrumb(...items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: item.url,
      })),
    ],
  }
}

function buildWorkSchema() {
  return [
    breadcrumb({ name: 'Case Studies', url: `${BASE}/work` }),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${BASE}/work#collection`,
      name: 'Game UX/UI Case Studies — Andres Felipe Pisso',
      description: 'Selected UX/UI case studies covering game UX, UI systems, HUD clarity, UEFN, VR interfaces, LiveOps UX, accessibility and player decision-making.',
      url: `${BASE}/work`,
      author: PERSON_REF,
      isPartOf: WEBSITE_REF,
    },
  ]
}

function buildAboutSchema() {
  return [
    breadcrumb({ name: 'About', url: `${BASE}/about` }),
  ]
}

function buildNotesIndexSchema() {
  return [
    breadcrumb({ name: 'Field Notes', url: `${BASE}/notes` }),
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${BASE}/notes#blog`,
      name: 'Field Notes on Game UX/UI Design',
      description: 'Field notes, frameworks and breakdowns by Andres Felipe Pisso on UX clarity, UI systems, HUD design, feedback, accessibility, UEFN, VR UX and digital product thinking.',
      url: `${BASE}/notes`,
      author: PERSON_REF,
      isPartOf: WEBSITE_REF,
      blogPost: fieldNotes.map(n => ({
        '@type': 'BlogPosting',
        url: `${BASE}/notes/${n.slug}`,
        headline: n.title,
        description: n.summary,
        keywords: n.category,
        datePublished: n.date,
        author: PERSON_REF,
      })),
    },
  ]
}

function buildNoteSchema(note) {
  return [
    breadcrumb(
      { name: 'Field Notes', url: `${BASE}/notes` },
      { name: note.title, url: `${BASE}/notes/${note.slug}` }
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${BASE}/notes/${note.slug}#article`,
      headline: note.title,
      description: note.summary,
      url: `${BASE}/notes/${note.slug}`,
      datePublished: note.date,
      dateModified: note.date,
      keywords: [note.category, 'Game UX', 'Game UI', 'UX Design'].join(', '),
      author: PERSON_REF,
      publisher: PERSON_REF,
      isPartOf: { '@id': `${BASE}/notes#blog` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/notes/${note.slug}` },
    },
  ]
}

function buildCaseSchema(c) {
  return [
    breadcrumb(
      { name: 'Case Studies', url: `${BASE}/work` },
      { name: c.title, url: `${BASE}/case/${c.slug}` }
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': `${BASE}/case/${c.slug}#work`,
      name: c.title,
      description: c.description,
      url: `${BASE}/case/${c.slug}`,
      creator: PERSON_REF,
      keywords: (c.tags || []).join(', '),
      genre: 'Game UX/UI Design',
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/case/${c.slug}` },
    },
  ]
}

// ── Page meta map ───────────────────────────────────────────────────────────
function buildPageMeta() {
  const meta = {}

  // Homepage — title/desc already in index.html; schema already inline; skip injection
  meta['/'] = {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    canonical: `${BASE}/`,
    ogType: 'website',
    schema: null,
  }

  meta['/work'] = {
    title: `Game UX/UI Case Studies — Andres Felipe Pisso`,
    description:
      'Selected UX/UI case studies by Andres Felipe Pisso covering game UX, UI systems, HUD clarity, UEFN, VR interfaces, LiveOps UX, accessibility and player decision-making.',
    canonical: `${BASE}/work`,
    ogType: 'website',
    schema: buildWorkSchema(),
  }

  meta['/about'] = {
    title: `Andres Felipe Pisso — UX Lead & Game UX/UI Designer`,
    description:
      'Andres Felipe Pisso is a UX Lead and Game UX/UI Designer based in Bogotá, Colombia. 11+ years across games, VR, UEFN, LiveOps UX, and digital products. Available for freelance and remote contracts.',
    canonical: `${BASE}/about`,
    ogType: 'website',
    schema: buildAboutSchema(),
  }

  meta['/notes'] = {
    title: `Field Notes on Game UX/UI Design — Andres Felipe Pisso`,
    description:
      'Field notes, frameworks and breakdowns by Andres Felipe Pisso on UX clarity, UI systems, HUD design, feedback, accessibility, UEFN, VR UX and digital product thinking.',
    canonical: `${BASE}/notes`,
    ogType: 'website',
    schema: buildNotesIndexSchema(),
  }

  for (const note of fieldNotes) {
    const url = `/notes/${note.slug}`
    meta[url] = {
      title: `${note.title} — Field Notes | ${SITE_NAME}`,
      description: note.summary,
      canonical: `${BASE}${url}`,
      ogType: 'article',
      schema: buildNoteSchema(note),
    }
  }

  for (const c of cases) {
    const url = `/case/${c.slug}`
    // Keep description under 160 chars for meta
    const rawDesc = c.content?.summary || c.description || ''
    const desc = rawDesc.length > 155 ? rawDesc.slice(0, 152) + '...' : rawDesc
    meta[url] = {
      title: `${c.title} — Game UX/UI Case Study | ${SITE_NAME}`,
      description: desc,
      canonical: `${BASE}${url}`,
      ogType: 'article',
      schema: buildCaseSchema(c),
    }
  }

  return meta
}

// ── HTML meta injection ─────────────────────────────────────────────────────
function injectMeta(html, pageMeta) {
  const { title, description, canonical, ogType, schema } = pageMeta

  const t = escTitle(title)
  const d = escAttr(description)
  const c = canonical
  const type = ogType || 'website'

  // Title tag
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)

  // Meta description
  html = html.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${d}$2`
  )

  // Canonical
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${c}$2`
  )

  // OG type
  html = html.replace(
    /(<meta property="og:type" content=")[^"]*(")/,
    `$1${type}$2`
  )

  // OG url
  html = html.replace(
    /(<meta property="og:url" content=")[^"]*(")/,
    `$1${c}$2`
  )

  // OG title
  html = html.replace(
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${escAttr(title)}$2`
  )

  // OG description
  html = html.replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${d}$2`
  )

  // Twitter url
  html = html.replace(
    /(<meta name="twitter:url" content=")[^"]*(")/,
    `$1${c}$2`
  )

  // Twitter title
  html = html.replace(
    /(<meta name="twitter:title" content=")[^"]*(")/,
    `$1${escAttr(title)}$2`
  )

  // Twitter description
  html = html.replace(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${d}$2`
  )

  // Inject page-specific schema before </head>
  if (schema) {
    const tag = `\n    <script type="application/ld+json">\n    ${JSON.stringify(schema, null, 2)}\n    </script>`
    html = html.replace('</head>', `${tag}\n  </head>`)
  }

  return html
}

// ── Sitemap generation ──────────────────────────────────────────────────────
function generateSitemap() {
  const now = BUILD_DATE

  const noteLastmods = Object.fromEntries(fieldNotes.map(n => [`/notes/${n.slug}`, n.date]))

  const pages = [
    { loc: `${BASE}/`,         priority: '1.0', changefreq: 'monthly', lastmod: now },
    { loc: `${BASE}/work`,     priority: '0.9', changefreq: 'monthly', lastmod: now },
    { loc: `${BASE}/about`,    priority: '0.8', changefreq: 'monthly', lastmod: now },
    { loc: `${BASE}/notes`,    priority: '0.8', changefreq: 'weekly',  lastmod: now },
    ...fieldNotes.map(n => ({
      loc: `${BASE}/notes/${n.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: n.date,
    })),
    ...cases.filter(c => c.featured).map(c => ({
      loc: `${BASE}/case/${c.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: now,
    })),
  ]

  const urls = pages.map(p => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(distDir)) {
    console.error('❌  dist/ not found — run `vite build` first')
    process.exit(1)
  }
  if (!fs.existsSync(ssrBundle)) {
    console.error('❌  dist-ssr/entry-server.js not found — run `vite build --config vite.ssr.config.js` first')
    process.exit(1)
  }

  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
  const { render } = await import(pathToFileURL(ssrBundle).href)
  const pageMeta = buildPageMeta()

  let ok = 0, fail = 0

  for (const url of routes) {
    try {
      const appHtml = render(url)
      const meta = pageMeta[url] || { title: DEFAULT_TITLE, description: DEFAULT_DESC, canonical: `${BASE}${url}`, ogType: 'website', schema: null }

      // 1. Inject meta tags + schema
      let html = injectMeta(template, meta)

      // 2. Inject rendered app markup
      html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

      // 3. Write file
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

  // 4. Generate sitemap with lastmod dates
  const sitemap = generateSitemap()
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8')
  console.log(`  ✓  sitemap.xml (${routes.length} URLs with lastmod)`)

  console.log(`\n  Pre-rendered ${ok} routes${fail ? `, ${fail} failed` : ''}.`)
  if (fail > 0) process.exit(1)
}

main()
