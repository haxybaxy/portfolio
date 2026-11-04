import { GITHUB_URL, LINKEDIN_URL } from './contact'
import { blogPosts, postHref, WRITING_HREF, type BlogPost } from './data/blog'

export const SITE_URL = 'https://www.zaidalsaheb.com'

const NAME = 'Zaid Alsaheb'
const SHARE_IMAGE = { url: `${SITE_URL}/mountain.jpg`, width: 2016, height: 954, alt: 'Sunrise at Sierra de Guadarrama' }

const PERSON = {
  '@type': 'Person',
  name: NAME,
  url: `${SITE_URL}/`,
  jobTitle: 'Software Engineer',
  homeLocation: { '@type': 'Place', name: 'Madrid, Spain' },
  sameAs: [LINKEDIN_URL, GITHUB_URL],
}

export type Route = {
  path: string
  title: string
  description: string
  type: 'website' | 'article'
  /** ISO YYYY-MM-DD, for the sitemap */
  lastmod?: string
  jsonLd?: Record<string, unknown>
}

function postRoute(post: BlogPost): Route {
  const path = postHref(post.slug)
  return {
    path,
    title: `${post.title} · ${NAME}`,
    description: post.description,
    type: 'article',
    lastmod: post.date,
    jsonLd: {
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${SITE_URL}${path}`,
      image: SHARE_IMAGE.url,
      keywords: post.tags,
      author: PERSON,
    },
  }
}

/** Every page the build generates */
export const routes: Route[] = [
  {
    path: '/',
    title: `${NAME} · Software Engineer and GTM Nerd`,
    description:
      'Zaid Alsaheb is a software engineer and GTM nerd in Madrid, Spain, building GTM automations for companies. Previously built Skoll, an AI native platform for GTM.',
    type: 'website',
    jsonLd: PERSON,
  },
  {
    path: WRITING_HREF,
    title: `Writing · ${NAME}`,
    description: 'Writing by Zaid Alsaheb on software engineering, coding agents and tooling.',
    type: 'website',
  },
  ...blogPosts.map(postRoute),
]

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const meta = (attribute: 'name' | 'property', key: string, content: string | number) =>
  `<meta ${attribute}="${key}" content="${escapeHtml(String(content))}" />`

/** Everything route-specific in <head>. Never put the email address here: it stays out of the page source (src/contact.ts). */
export function headTags({ path, title, description, type, jsonLd }: Route) {
  const url = `${SITE_URL}${path}`
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    meta('name', 'description', description),
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    meta('property', 'og:type', type),
    meta('property', 'og:site_name', NAME),
    meta('property', 'og:url', url),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:image', SHARE_IMAGE.url),
    meta('property', 'og:image:width', SHARE_IMAGE.width),
    meta('property', 'og:image:height', SHARE_IMAGE.height),
    meta('property', 'og:image:alt', SHARE_IMAGE.alt),
    meta('name', 'twitter:card', 'summary_large_image'),
  ]
  if (jsonLd) {
    // Escaped so no value can close the script tag early
    const json = JSON.stringify({ '@context': 'https://schema.org', ...jsonLd }).replace(/</g, '\\u003c')
    tags.push(`<script type="application/ld+json">${json}</script>`)
  }
  return tags.join('\n    ')
}
