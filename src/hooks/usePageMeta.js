import { useEffect } from 'react';

const SITE_NAME = 'ByAndresFe';
const BASE_URL = 'https://byandresfe.com';
const DEFAULT_DESCRIPTION =
  'Portfolio of Andres Felipe Pisso — UX Lead and Game UX/UI Designer. Clarity systems, feedback design, and player decision-making across 11+ years in games and interactive media.';

/**
 * Sets document.title, meta tags, og/twitter, canonical, and optional
 * Article JSON-LD schema for the current route.
 *
 * @param {{ title?: string, description?: string, article?: { datePublished?: string, dateModified?: string } }} options
 */
export function usePageMeta({ title, description, article } = {}) {
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

    // Article JSON-LD schema (Field Notes)
    const schemaId = 'ld-json-article';
    let existing = document.getElementById(schemaId);
    if (article) {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: fullTitle,
        description: desc,
        url,
        author: {
          '@type': 'Person',
          '@id': `${BASE_URL}/#person`,
          name: 'Andres Felipe Pisso',
          url: BASE_URL,
        },
        publisher: {
          '@type': 'Person',
          name: 'Andres Felipe Pisso',
          url: BASE_URL,
        },
        datePublished: article.datePublished || undefined,
        dateModified: article.dateModified || article.datePublished || undefined,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      };
      if (!existing) {
        existing = document.createElement('script');
        existing.type = 'application/ld+json';
        existing.id = schemaId;
        document.head.appendChild(existing);
      }
      existing.textContent = JSON.stringify(schema);
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, article]);
}
