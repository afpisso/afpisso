/**
 * Analytics utility — provider-agnostic event tracker.
 * Supports GA4 (gtag) and Plausible out of the box.
 * Falls back to console.log in dev with no provider configured.
 *
 * ─── To enable GA4 ───────────────────────────────────────────────────────────
 * Add to index.html <head>, replacing G-XXXXXXXXXX with your Measurement ID:
 *
 *   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
 *   <script>
 *     window.dataLayer = window.dataLayer || [];
 *     function gtag(){dataLayer.push(arguments)}
 *     gtag('js', new Date());
 *     gtag('config', 'G-XXXXXXXXXX');
 *   </script>
 *
 * ─── To enable Plausible ─────────────────────────────────────────────────────
 * Add to index.html <head>, replacing byandresfe.com with your domain:
 *
 *   <script defer data-domain="byandresfe.com"
 *     src="https://plausible.io/js/script.js"></script>
 */

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  // Plausible Analytics
  if (typeof window.plausible === 'function') {
    window.plausible(eventName, { props: params });
  }

  // Dev mode: visual log so events are easy to verify during development
  if (import.meta.env.DEV) {
    console.log('%c[analytics]', 'color:#ff2540;font-weight:bold', eventName, params);
  }
}

/**
 * Named event helpers — keeps call sites clean and typo-safe.
 * Import { analytics } and call analytics.heroCta('label') etc.
 */
export const analytics = {
  // Hero
  heroCta:           (label)        => trackEvent('hero_cta_click', { label }),

  // Work / Case cards
  caseCardClick:     (slug, title)  => trackEvent('case_card_click', { slug, title }),
  filterUse:         (filter)       => trackEvent('filter_use', { filter }),

  // Case scroll depth (call at 25 / 50 / 75 / 100)
  caseScroll:        (slug, depth)  => trackEvent(`case_${depth}`, { slug }),

  // Language
  languageSwitch:    (to)           => trackEvent('language_switch', { to }),

  // Resume
  resumeView:        ()             => trackEvent('resume_view'),
  resumeDownload:    ()             => trackEvent('resume_download'),

  // Contact
  contactCtaClick:   ()             => trackEvent('contact_cta_click'),
  emailClick:        (source)       => trackEvent('email_click', { source }),
  linkedinClick:     (source)       => trackEvent('linkedin_click', { source }),
  externalLinkClick: (url, label)   => trackEvent('external_link_click', { url, label }),

  // Lead
  generateLead:      (source)       => trackEvent('generate_lead', { source }),
};
