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
import { pageMeta } from '../src/data/pageMeta.js'
import { SPANISH_ONLY, localizePath, alternatesFor } from '../src/utils/i18nRoutes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root      = path.resolve(__dirname, '..')
const distDir   = path.join(root, 'dist')
const ssrBundle = path.join(root, 'dist-ssr', 'entry-server.js')

const BASE      = 'https://byandresfe.com'
const SITE_NAME = 'ByAndresFe'

// Pixel size of a PNG or WebP in public/ (from its header), so og:image can
// declare real dimensions. Returns null for other formats or missing files.
function imageSize(publicPath) {
  try {
    const b = fs.readFileSync(path.join(root, 'public', publicPath))
    if (b.toString('ascii', 1, 4) === 'PNG') return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }
    if (b.toString('ascii', 0, 4) !== 'RIFF') return null
    const chunk = b.toString('ascii', 12, 16)
    if (chunk === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff }
    if (chunk === 'VP8X') return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) }
    if (chunk === 'VP8L') {
      const bits = b.readUInt32LE(21)
      return { w: 1 + (bits & 0x3fff), h: 1 + ((bits >> 14) & 0x3fff) }
    }
  } catch { /* missing file */ }
  return null
}

const DEFAULT_TITLE = pageMeta['/'].en.title
const DEFAULT_DESC = pageMeta['/'].en.description

// ── Routes to pre-render ────────────────────────────────────────────────────
// Language-neutral paths; each one renders in English and, unless it is
// Spanish-only, again under /es.
const staticRoutes = ['/', '/work', '/about', '/notes', '/resume', '/speaking', '/speaking/60s', '/speaking/game-ui-systems']

const routes = [
  ...staticRoutes,
  ...fieldNotes.map(n => `/notes/${n.slug}`),
  ...cases.filter(c => c.content).map(c => `/case/${c.slug}`),
]

// [{ route, lang, url }] — url is the published path
const pages = routes.flatMap(route => SPANISH_ONLY.has(route)
  ? [{ route, lang: 'es', url: route }]
  : ['en', 'es'].map(lang => ({ route, lang, url: localizePath(route, lang) })))

// ── HTML escape helpers ─────────────────────────────────────────────────────
const escAttr  = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
const escTitle = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// ── Schema builders ─────────────────────────────────────────────────────────
const PERSON_REF  = { '@id': `${BASE}/#person` }
const WEBSITE_REF = { '@id': `${BASE}/#website` }

const LABELS = {
  en: { home: 'Home', work: 'Case Studies', notes: 'Field Notes', about: 'About', resume: 'Resume', speaking: 'Speaking' },
  es: { home: 'Inicio', work: 'Casos de estudio', notes: 'Notas de campo', about: 'Sobre mí', resume: 'CV', speaking: 'Charlas' },
}

// Absolute URL of a route in a language
const abs = (route, lang) => `${BASE}${localizePath(route, lang)}`

function breadcrumb(lang, ...items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: LABELS[lang].home, item: abs('/', lang) },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: abs(item.route, lang),
      })),
    ],
  }
}

// Spanish-only notes publish their Spanish title/summary in every language
const noteTitle = (note, lang) => (note.language === 'es' || lang === 'es' ? note.titleEs || note.title : note.title)
const noteSummary = (note, lang) => (note.language === 'es' || lang === 'es' ? note.summaryEs || note.summary : note.summary)

// Notes over ~60 chars drop the section label so the title is not truncated
function noteMetaTitle(note, lang) {
  if (note.seoTitle) return `${note.seoTitle} | ${SITE_NAME}`
  const title = noteTitle(note, lang)
  const full = `${title} — ${LABELS[lang].notes} | ${SITE_NAME}`
  return full.length > 60 ? `${title} | ${SITE_NAME}` : full
}
const noteImage = (note) => note.ogImage || note.cover

function buildWorkSchema(lang) {
  return [
    breadcrumb(lang, { name: LABELS[lang].work, route: '/work' }),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${abs('/work', lang)}#collection`,
      name: pageMeta['/work'][lang].title,
      description: pageMeta['/work'][lang].description,
      url: abs('/work', lang),
      inLanguage: lang,
      author: PERSON_REF,
      isPartOf: WEBSITE_REF,
    },
  ]
}

function buildNotesIndexSchema(lang) {
  return [
    breadcrumb(lang, { name: LABELS[lang].notes, route: '/notes' }),
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${abs('/notes', lang)}#blog`,
      name: pageMeta['/notes'][lang].title,
      description: pageMeta['/notes'][lang].description,
      url: abs('/notes', lang),
      inLanguage: lang,
      author: PERSON_REF,
      isPartOf: WEBSITE_REF,
      blogPost: fieldNotes.map(n => ({
        '@type': 'BlogPosting',
        url: abs(`/notes/${n.slug}`, lang),
        headline: noteTitle(n, lang),
        description: noteSummary(n, lang),
        keywords: lang === 'es' ? n.categoryEs || n.category : n.category,
        datePublished: n.date,
        author: PERSON_REF,
      })),
    },
  ]
}

function buildNoteSchema(note, lang) {
  const route = `/notes/${note.slug}`
  const url = abs(route, lang)
  const posting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: noteTitle(note, lang),
    description: noteSummary(note, lang),
    url,
    datePublished: note.date,
    dateModified: note.dateModified || note.date,
    inLanguage: lang,
    keywords: note.keywords || [note.category, 'Game UX', 'Game UI', 'UX Design'].join(', '),
    author: PERSON_REF,
    publisher: PERSON_REF,
    isPartOf: { '@id': `${abs('/notes', lang)}#blog` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
  if (noteImage(note)) posting.image = `${BASE}${noteImage(note)}`
  return [
    breadcrumb(lang,
      { name: LABELS[lang].notes, route: '/notes' },
      { name: noteTitle(note, lang), route },
    ),
    posting,
  ]
}

function buildCaseSchema(c, lang) {
  const route = `/case/${c.slug}`
  const url = abs(route, lang)
  const work = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#work`,
    name: c.title,
    description: lang === 'es' ? c.descriptionEs || c.description : c.description,
    url,
    inLanguage: lang,
    creator: PERSON_REF,
    keywords: (c.tags || []).join(', '),
    genre: 'Game UX/UI Design',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: `${BASE}/thumbnails/${c.slug}.webp`,
  }
  const headline = lang === 'es' ? c.headlineEs : c.headline
  if (headline) work.alternativeHeadline = headline
  return [
    breadcrumb(lang,
      { name: LABELS[lang].work, route: '/work' },
      { name: c.title, route },
    ),
    work,
  ]
}

const clip = (s = '') => (s.length > 155 ? s.slice(0, 152) + '...' : s)

// ── Page meta map ───────────────────────────────────────────────────────────
// Keyed by language-neutral route; titles/descriptions of static pages come
// from src/data/pageMeta.js so the SPA and the prerender stay in sync.
function buildPageMeta(lang) {
  const meta = {}
  const L = LABELS[lang]
  const page = (route, extra) => {
    meta[route] = { ...pageMeta[route][lang], ogType: 'website', schema: null, ...extra }
  }

  // Homepage — schema already inline in index.html
  page('/')
  page('/work', { schema: buildWorkSchema(lang) })
  page('/resume', { schema: [breadcrumb(lang, { name: L.resume, route: '/resume' })] })
  page('/about', { schema: [breadcrumb(lang, { name: L.about, route: '/about' })] })
  page('/speaking', { schema: [breadcrumb(lang, { name: L.speaking, route: '/speaking' })] })
  page('/speaking/game-ui-systems', {
    schema: [breadcrumb(lang,
      { name: L.speaking, route: '/speaking' },
      { name: 'Game UI Systems', route: '/speaking/game-ui-systems' },
    )],
  })
  page('/speaking/60s', {
    schema: [breadcrumb(lang,
      { name: L.speaking, route: '/speaking' },
      { name: '60 segundos', route: '/speaking/60s' },
    )],
  })
  page('/notes', { schema: buildNotesIndexSchema(lang) })

  for (const note of fieldNotes) {
    meta[`/notes/${note.slug}`] = {
      title: noteMetaTitle(note, lang),
      description: noteSummary(note, lang),
      ogType: 'article',
      ogImage: noteImage(note) && `${BASE}${noteImage(note)}`,
      ogImageAlt: noteTitle(note, lang),
      schema: buildNoteSchema(note, lang),
    }
  }

  for (const c of cases) {
    const es = lang === 'es'
    const desc = clip(es
      ? c.contentEs?.summary || c.descriptionEs || c.content?.summary || c.description
      : c.content?.summary || c.description)
    meta[`/case/${c.slug}`] = {
      title: es
        ? `${c.title} — Caso de estudio Game UX/UI | ${SITE_NAME}`
        : c.seoTitle || `${c.title} — Game UX/UI Case Study | ${SITE_NAME}`,
      description: es ? desc : c.seoDescription || desc,
      socialTitle: es ? undefined : c.ogTitle,
      socialDescription: es ? undefined : c.ogDescription,
      ogType: 'article',
      ogImage: `${BASE}/thumbnails/${c.slug}.webp`,
      ogImageAlt: c.thumbnailAlt || c.title,
      schema: buildCaseSchema(c, lang),
    }
  }

  return meta
}

// ── HTML meta injection ─────────────────────────────────────────────────────
function injectMeta(html, pageMeta) {
  const { title, description, canonical, ogType, schema, ogImage, ogImageAlt, socialTitle, socialDescription, lang, alternates = [] } = pageMeta

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
    /(<meta property="og:type"\s+content=")[^"]*(")/,
    `$1${type}$2`
  )

  // OG url
  html = html.replace(
    /(<meta property="og:url"\s+content=")[^"]*(")/,
    `$1${c}$2`
  )

  // Social title/description default to the page title/description unless a page overrides them
  const st = escAttr(socialTitle || title)
  const sd = socialDescription ? escAttr(socialDescription) : d

  // OG title
  html = html.replace(
    /(<meta property="og:title"\s+content=")[^"]*(")/,
    `$1${st}$2`
  )

  // OG description
  html = html.replace(
    /(<meta property="og:description"\s+content=")[^"]*(")/,
    `$1${sd}$2`
  )

  // Twitter url
  html = html.replace(
    /(<meta name="twitter:url"\s+content=")[^"]*(")/,
    `$1${c}$2`
  )

  // Twitter title
  html = html.replace(
    /(<meta name="twitter:title"\s+content=")[^"]*(")/,
    `$1${st}$2`
  )

  // Twitter description
  html = html.replace(
    /(<meta name="twitter:description"\s+content=")[^"]*(")/,
    `$1${sd}$2`
  )

  // OG image + Twitter image — page-specific override (e.g. case thumbnails)
  if (ogImage) {
    html = html.replace(
      /(<meta property="og:image"\s+content=")[^"]*(")/,
      `$1${escAttr(ogImage)}$2`
    )
    html = html.replace(
      /(<meta name="twitter:image"\s+content=")[^"]*(")/,
      `$1${escAttr(ogImage)}$2`
    )
    // Real dimensions of the override image; drop the tags when they are unknown
    const size = imageSize(ogImage.replace(BASE, ''))
    for (const [k, v] of [['width', size?.w], ['height', size?.h]]) {
      const re = new RegExp(`\\s*<meta property="og:image:${k}" content="[^"]*" />`)
      html = v ? html.replace(re, (m) => m.replace(/content="[^"]*"/, `content="${v}"`)) : html.replace(re, '')
    }
    if (ogImageAlt) {
      html = html.replace(/(<meta property="og:image:alt"\s+content=")[^"]*(")/, `$1${escAttr(ogImageAlt)}$2`)
      html = html.replace(/(<meta name="twitter:image:alt"\s+content=")[^"]*(")/, `$1${escAttr(ogImageAlt)}$2`)
    }
  }

  // Page language: Spanish pages declare es and swap the OG locales
  if (lang === 'es') {
    html = html.replace(/<html lang="en"/, '<html lang="es"')
    html = html.replace(/(<meta property="og:locale"\s+content=")en_US(")/, '$1es_CO$2')
    html = html.replace(/(<meta property="og:locale:alternate" content=")es_CO(")/, '$1en_US$2')
  }

  // Reciprocal hreflang; single-language pages have no alternate locale
  if (alternates.length) {
    const links = alternates.map(a => `\n    <link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('')
    html = html.replace(/(<link rel="canonical" href="[^"]*" \/>)/, `$1${links}`)
  } else {
    html = html.replace(/\s*<meta property="og:locale:alternate" content="[^"]*" \/>/, '')
  }

  // Inject page-specific schema before </head>
  if (schema) {
    const tag = `\n    <script type="application/ld+json">\n    ${JSON.stringify(schema, null, 2)}\n    </script>`
    html = html.replace('</head>', `${tag}\n  </head>`)
  }

  return html
}

// ── Sitemap generation ──────────────────────────────────────────────────────
function generateSitemap() {
  const noteDates = new Map(fieldNotes.map(n => [`/notes/${n.slug}`, n.dateModified || n.date]))
  const urls = pages.map(({ route, url }) => {
    const lastmod = noteDates.get(route)
    const links = alternatesFor(route)
      .map(a => `\n    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('')
    return `  <url>
    <loc>${BASE}${url}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}${links}
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
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
  const pageMeta = { en: buildPageMeta('en'), es: buildPageMeta('es') }

  let ok = 0, fail = 0

  for (const { route, lang, url } of pages) {
    try {
      // /es pages render under the /es basename so in-app links keep the prefix
      const appHtml = render(url, url.startsWith('/es') ? 'es' : 'en')
      const meta = {
        title: DEFAULT_TITLE, description: DEFAULT_DESC, ogType: 'website', schema: null,
        ...pageMeta[lang][route],
        canonical: `${BASE}${url}`,
        lang,
        alternates: alternatesFor(route),
      }

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

  // A real 404 document lets Vercel keep HTTP status 404 for unknown routes.
  let notFound = injectMeta(template, { title: 'Page not found — ByAndresFe', description: 'This page could not be found. Explore the portfolio, case studies and field notes.', canonical: `${BASE}/404`, ogType: 'website', schema: null })
  notFound = notFound.replace(/(<meta name="robots" content=")[^"]*(")/, '$1noindex, follow$2')
  notFound = notFound.replace('<div id="root"></div>', `<div id="root">${render('/__not_found__')}</div>`)
  fs.writeFileSync(path.join(distDir, '404.html'), notFound, 'utf-8')

  // 4. Generate sitemap with lastmod dates
  const sitemap = generateSitemap()
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8')
  console.log(`  ✓  sitemap.xml (${pages.length} URLs with hreflang alternates)`)

  console.log(`\n  Pre-rendered ${ok} routes${fail ? `, ${fail} failed` : ''}.`)
  if (fail > 0) process.exit(1)
}

main()
