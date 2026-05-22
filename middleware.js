/**
 * Vercel Edge Middleware — Markdown for Agents
 *
 * When a client sends `Accept: text/markdown` (e.g. an AI agent),
 * return the site's llms.txt as Content-Type: text/markdown instead
 * of the default HTML SPA shell.
 *
 * Browsers never send `Accept: text/markdown`, so normal visitors
 * are completely unaffected.
 *
 * Docs: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 * RFC:  https://www.rfc-editor.org/rfc/rfc9110 (HTTP content negotiation)
 */

export const config = {
  // Only intercept the root and common entry paths.
  // All other paths (assets, API, etc.) pass through unchanged.
  matcher: ['/', '/index.html'],
};

export default async function middleware(request) {
  const accept = request.headers.get('accept') ?? '';

  if (!accept.includes('text/markdown')) {
    // Not a markdown request — pass through to normal Vercel routing.
    return;
  }

  try {
    // Fetch the pre-built markdown representation of this site.
    const llmsUrl = new URL('/llms.txt', request.url);
    const upstream = await fetch(llmsUrl.toString());

    if (!upstream.ok) {
      // llms.txt missing — fall through to normal response.
      return;
    }

    const content = await upstream.text();

    return new Response(content, {
      status: 200,
      headers: {
        'Content-Type':  'text/markdown; charset=utf-8',
        'Vary':          'Accept',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    // On any error, fall through to normal response.
    return;
  }
}
