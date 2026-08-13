/**
 * Canonical site metadata, shared by the app bundle and the Node prerender
 * script — hence plain .mjs, same reason as src/content/frontmatter.mjs.
 *
 * SITE_URL is used for <link rel="canonical">, og:url, og:image and the sitemap.
 * Social crawlers resolve those as absolute URLs, so a wrong value here produces
 * exactly the broken link previews the prerender step exists to prevent.
 * No trailing slash.
 */

export const SITE_URL = 'https://zaidalsaheb.com';

export const SITE_NAME = 'Zaid Alsaheb';

export const SITE_DESCRIPTION =
  'Full-stack software developer and AI/ML engineer based in Madrid, Spain.';

/** Fallback link-preview image. Ideally replaced with a 1200x630 image. */
export const DEFAULT_OG_IMAGE = '/myphoto.jpeg';
