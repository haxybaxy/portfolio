---
title: Adding a blog to a Vite SPA without paying for hosting
date: 2026-08-11
description: Markdown files, a build-time glob, and a prerender script — how the blog you are reading works, and why the routing mattered more than the parser.
tags: [vite, react, markdown]
draft: false
---

This site is a React SPA built with Vite and deployed on Vercel's free tier. I wanted a blog on it without adding a database, a CMS, or anything that could start charging me money.

The answer turned out to be boring: markdown files committed to the repo, read at build time, bundled into the JavaScript. Publishing a post is a `git push`. There is no backend at all.

## Loading the posts

Vite's `import.meta.glob` does the heavy lifting. With `eager: true` it inlines every matching file as a string at build time, so there is no fetch and no loading state:

```ts
const modules = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;
```

The filename becomes the slug. That detail matters more than it looks: it means reordering or re-dating posts never changes a URL.

## Skip gray-matter

The obvious next step is `gray-matter` for the frontmatter. Don't — it depends on Node's `Buffer` and will throw `Buffer is not defined` the moment it runs in a browser bundle.

For a schema you control, a small parser is about twenty lines and has no polyfill story to maintain:

```js
const FENCE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function parseFrontmatter(raw, source = 'post') {
  const match = FENCE.exec(raw);
  if (!match) {
    throw new Error(`${source}: missing frontmatter block`);
  }
  // ...split lines on the first colon
  return { data, body: raw.slice(match[0].length) };
}
```

## The part that actually mattered

Rendering markdown was the easy half. The real problem was that this site had **no router** — every section was an overlay driven by a single `useState`, and the URL never changed.

That is fine for an About page nobody links to. It is fatal for a blog. A post you cannot link to is a diary.

Worse, a client-rendered SPA serves an empty HTML shell. Google will execute your JavaScript, eventually and unreliably. Social crawlers will not:

| Crawler | Runs JS | Sees your post |
| --- | --- | --- |
| Googlebot | yes | eventually |
| Twitter / X | no | no |
| LinkedIn | no | no |
| Slack / Discord | no | no |

So every link you share renders as a bare URL with whatever generic `<title>` is in `index.html`.

Full static-site generation would fix it, but this site renders three.js on the landing page and reads `window.innerWidth` during layout — both of which break under a Node render pass. Instead, a postbuild script stamps per-post metadata into copies of the built `index.html`:

1. Read `dist/index.html` as a template.
2. For each post, inject `<title>`, `<meta name="description">`, and the Open Graph tags.
3. Render the markdown to HTML and drop it into `#root` for crawlers.
4. Write `dist/blog/<slug>.html`.

React's `createRoot().render()` replaces the container's children on first paint, so that prerendered markup never has to match what React produces. It only has to be good enough for something that will never run the JavaScript.

## Cost

Nothing. It is still a static bundle on a free tier. The only ongoing cost is writing the posts, which was always going to be the hard part.
