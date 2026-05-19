import { useEffect } from 'react';

const SITE_NAME = 'ByAndresFe';
const DEFAULT_DESCRIPTION =
  'Portfolio of Andres Felipe Pisso, UX Lead and Game UX/UI Designer focused on clarity, feedback, systems, and better player experiences across games, products, VR, and interactive media.';

/**
 * Sets document.title, meta[name="description"], og:title, og:description,
 * og:url, and link[rel="canonical"] for the current route.
 *
 * Call this at the top of any page component:
 *   usePageMeta({ title: 'Selected Work', description: 'Game UX/UI cases...' })
 *
 * @param {{ title?: string, description?: string }} options
 */
export function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${SITE_NAME}`
      : `${SITE_NAME} — Game UX/UI Designer & UX Lead`;

    const desc = description || DEFAULT_DESCRIPTION;
    const url = window.location.href.split('?')[0];

    // Page title
    document.title = fullTitle;

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url);

    // Twitter
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', fullTitle);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', desc);

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', url);
  }, [title, description]);
}
