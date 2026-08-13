/**
 * Postbuild step: give every blog post its own crawlable HTML file.
 *
 * Why this exists. The site is a client-rendered SPA, so dist/index.html ships
 * an empty <div id="root">. Googlebot will execute the JS eventually, but social
 * crawlers — Twitter/X, LinkedIn, Slack, Discord, iMessage — never do. Without
 * this step every shared post link would unfurl with the same generic title and
 * no description. Setting meta tags from React does not help: only bytes present
 * in the HTTP response body count.
 *
 * What it does. For each published post it copies the built shell, swaps in that
 * post's <title>, description, canonical, Open Graph, Twitter and JSON-LD tags,
 * and writes dist/blog/<slug>/index.html. Vercel checks the filesystem before
 * applying the SPA rewrite in vercel.json, so /blog/<slug> serves this file while
 * the JS bundle still boots and takes over for in-app navigation.
 *
 * Full SSG was rejected deliberately: the landing page renders three.js and reads
 * window.innerWidth during layout, neither of which survives a Node render pass.
 * This touches none of the app's code.
 *
 * Note this injects metadata only, not the rendered article body. Google renders
 * JS for the body; the body is what a crawler that does not would still miss.
 */

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseFrontmatter } from '../src/content/frontmatter.mjs';
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from '../src/siteConfig.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = join(ROOT, 'src/content/posts');
const DIST = join(ROOT, 'dist');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const absolute = (path) => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path}`);

async function loadPosts() {
  const files = (await readdir(POSTS_DIR)).filter((name) => name.endsWith('.md'));

  const posts = await Promise.all(
    files.map(async (name) => {
      const slug = name.replace(/\.md$/, '');
      const { data } = parseFrontmatter(await readFile(join(POSTS_DIR, name), 'utf8'), slug);

      for (const field of ['title', 'date', 'description']) {
        if (typeof data[field] !== 'string' || !data[field].trim()) {
          throw new Error(`prerender: post "${slug}" is missing frontmatter field "${field}"`);
        }
      }

      return {
        slug,
        title: data.title.trim(),
        date: data.date.trim(),
        description: data.description.trim(),
        draft: data.draft === true,
        cover: typeof data.cover === 'string' ? data.cover : DEFAULT_OG_IMAGE,
      };
    })
  );

  // Mirrors the production filter in src/components/blogData.ts
  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Substitution that fails the build instead of silently doing nothing. The tags
 * in index.html are hand-formatted and can wrap across lines, so a pattern that
 * stops matching is a realistic way to ship posts carrying the site's generic
 * metadata — which looks fine until every link preview is identical.
 */
function replaceOrThrow(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`prerender: no ${label} found in dist/index.html to replace`);
  }
  // Function form: post text is arbitrary and `$&` in a string replacement is magic
  return html.replace(pattern, () => replacement);
}

/** Replaces the shell's <title> and description, and appends page-specific tags. */
function renderShell(template, { title, description, url, image, article }) {
  const tags = [
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:type" content="${article ? 'article' : 'website'}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:image" content="${escapeHtml(absolute(image))}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(absolute(image))}" />`,
  ];

  if (article) {
    tags.push(`<meta property="article:published_time" content="${escapeHtml(article.date)}" />`);
    tags.push(
      `<script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        datePublished: article.date,
        image: absolute(image),
        author: { '@type': 'Person', name: SITE_NAME },
        mainEntityOfPage: url,
      })}</script>`
    );
  }

  let html = replaceOrThrow(
    template,
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(title)}</title>`,
    '<title>'
  );

  // [\s\S] rather than . so this survives the tag being wrapped across lines
  html = replaceOrThrow(
    html,
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    '<meta name="description">'
  );

  return replaceOrThrow(html, /<\/head>/, `  ${tags.join('\n  ')}\n</head>`, '</head>');
}

async function writePage(relativeDir, html) {
  const dir = join(DIST, relativeDir);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html, 'utf8');
  console.log(`  prerendered /${relativeDir}`);
}

async function main() {
  const template = await readFile(join(DIST, 'index.html'), 'utf8');
  const posts = await loadPosts();
  console.log(`prerender: ${posts.length} published post(s)`);

  // Root shell gets canonical + OG too, so the homepage unfurls properly
  await writeFile(
    join(DIST, 'index.html'),
    renderShell(template, {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: DEFAULT_OG_IMAGE,
    }),
    'utf8'
  );
  console.log('  prerendered /');

  await writePage(
    'blog',
    renderShell(template, {
      title: `Blog — ${SITE_NAME}`,
      description: `Writing by ${SITE_NAME} on software, tooling and machine learning.`,
      url: `${SITE_URL}/blog`,
      image: DEFAULT_OG_IMAGE,
    })
  );

  for (const post of posts) {
    await writePage(
      `blog/${post.slug}`,
      renderShell(template, {
        title: `${post.title} — ${SITE_NAME}`,
        description: post.description,
        url: `${SITE_URL}/blog/${post.slug}`,
        image: post.cover,
        article: { date: post.date },
      })
    );
  }

  const urls = [
    { loc: SITE_URL },
    { loc: `${SITE_URL}/blog` },
    ...posts.map((post) => ({ loc: `${SITE_URL}/blog/${post.slug}`, lastmod: post.date })),
  ];

  await writeFile(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls
        .map(
          ({ loc, lastmod }) =>
            `  <url><loc>${escapeHtml(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`
        )
        .join('\n') +
      `\n</urlset>\n`,
    'utf8'
  );

  await writeFile(
    join(DIST, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    'utf8'
  );

  console.log('  wrote sitemap.xml and robots.txt');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
