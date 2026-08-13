import { parseFrontmatter } from "../content/frontmatter.mjs";
import type { BlogPost } from "../types";

/**
 * Posts are authored as markdown in src/content/posts and inlined at build time,
 * so publishing is just a commit and the site stays a static bundle with no backend.
 *
 * The filename is the slug. Renaming a file changes its URL, but reordering or
 * re-dating posts never does — deliberately unlike projectsData, where items are
 * addressed by array index and reordering silently breaks the cross-links.
 */
const modules = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function requireString(value: unknown, field: string, source: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`blogData: post "${source}" is missing required frontmatter field "${field}"`);
  }
  return value.trim();
}

function toPost(path: string, raw: string): BlogPost {
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  const { data, body } = parseFrontmatter(raw, slug);

  const date = requireString(data.date, 'date', slug);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`blogData: post "${slug}" has date "${date}", expected YYYY-MM-DD`);
  }

  return {
    slug,
    title: requireString(data.title, 'title', slug),
    date,
    description: requireString(data.description, 'description', slug),
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: data.draft === true,
    body: body.trim(),
  };
}

/**
 * Drafts stay listed in `npm run dev` so a post can be previewed in place, and are
 * dropped from the list in production. Note this only unlists them — the markdown
 * is still inlined in the shipped bundle, so a draft is unpublished, not private.
 */
export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post) => !post.draft || !import.meta.env.PROD)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** "2026-08-11" -> "August 11, 2026", pinned to UTC so it never drifts a day. */
export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
