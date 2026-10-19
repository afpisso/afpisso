// URL ↔ language mapping. English lives at the root, Spanish under /es.
// Pages written only in Spanish keep a single unprefixed URL (no /es copy,
// no English duplicate). Plain JS — imported by the app and by prerender.
import { fieldNotes } from '../data/fieldNotes.js';

export const BASE_URL = 'https://byandresfe.com';

export const SPANISH_ONLY = new Set([
  '/speaking/60s',
  ...fieldNotes.filter((n) => n.language === 'es').map((n) => `/notes/${n.slug}`),
]);

export const langFromPath = (path) => (/^\/es(\/|$)/.test(path) ? 'es' : 'en');

// '/es/work' → '/work', '/es' → '/'
export const stripLang = (path) => path.replace(/^\/es(?=\/|$|[?#])/, '') || '/';

// Equivalent URL of `path` (pathname + optional ?query/#hash) in `lang`
export function localizePath(path, lang) {
  const bare = stripLang(path);
  const i = bare.search(/[?#]/);
  const pathname = (i < 0 ? bare : bare.slice(0, i)) || '/';
  const rest = i < 0 ? '' : bare.slice(i);
  if (lang !== 'es' || SPANISH_ONLY.has(pathname)) return pathname + rest;
  return (pathname === '/' ? '/es' : `/es${pathname}`) + rest;
}

// hreflang alternates for a page, or [] when it exists in one language only
export function alternatesFor(path) {
  const pathname = stripLang(path);
  if (SPANISH_ONLY.has(pathname)) return [];
  const en = `${BASE_URL}${localizePath(pathname, 'en')}`;
  const es = `${BASE_URL}${localizePath(pathname, 'es')}`;
  return [
    { hreflang: 'en', href: en },
    { hreflang: 'es', href: es },
    { hreflang: 'x-default', href: en },
  ];
}
