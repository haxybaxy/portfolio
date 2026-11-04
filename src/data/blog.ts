/**
 * Posts are markdown files in src/content/posts, inlined at build time.
 * The filename is the slug.
 */
export type BlogPost = {
  slug: string
  title: string
  /** ISO YYYY-MM-DD */
  date: string
  description: string
  tags: string[]
  draft: boolean
  /** Raw markdown, everything after the frontmatter block */
  body: string
}

const modules = import.meta.glob<string>('../content/posts/*.md', { query: '?raw', import: 'default', eager: true })

const FENCE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

function unquote(value: string) {
  const trimmed = value.trim()
  const quoted = /^(["']).*\1$/.test(trimmed)
  return quoted ? trimmed.slice(1, -1) : trimmed
}

/** Just enough frontmatter for the posts' fixed schema: strings, [a, b] lists and booleans */
function parseFrontmatter(raw: string, slug: string) {
  const match = FENCE.exec(raw)
  if (!match) throw new Error(`blog: post "${slug}" is missing its frontmatter block`)

  const data: Record<string, string | string[] | boolean> = {}
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue
    const sep = line.indexOf(':')
    if (sep === -1) throw new Error(`blog: post "${slug}" has a malformed frontmatter line: ${line}`)

    const value = line.slice(sep + 1).trim()
    data[line.slice(0, sep).trim()] =
      value === 'true' || value === 'false'
        ? value === 'true'
        : value.startsWith('[') && value.endsWith(']')
          ? value.slice(1, -1).split(',').map(unquote).filter(Boolean)
          : unquote(value)
  }
  return { data, body: raw.slice(match[0].length) }
}

function requireString(value: unknown, field: string, slug: string) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`blog: post "${slug}" is missing required frontmatter field "${field}"`)
  }
  return value.trim()
}

function toPost(path: string, raw: string): BlogPost {
  const slug = path.split('/').pop()!.replace(/\.md$/, '')
  const { data, body } = parseFrontmatter(raw, slug)

  const date = requireString(data.date, 'date', slug)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`blog: post "${slug}" has date "${date}", expected YYYY-MM-DD`)

  return {
    slug,
    title: requireString(data.title, 'title', slug),
    date,
    description: requireString(data.description, 'description', slug),
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: data.draft === true,
    body: body.trim(),
  }
}

// Drafts show in dev for previewing and are dropped from production builds
export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post) => !post.draft || !import.meta.env.PROD)
  .sort((a, b) => b.date.localeCompare(a.date))

/** The full list of posts, outside the nav while Writing is hidden from the scrolling page */
export const WRITING_HREF = '/writing'

/** Each post is prerendered to its own page */
export const postHref = (slug: string) => `${WRITING_HREF}/${encodeURIComponent(slug)}`

/** "2026-08-11" -> "August 11, 2026", pinned to UTC so it never drifts a day */
export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
