// Second half of `npm run build`: turns the client build plus the SSR bundle into one HTML file per route.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const TITLE = /<title>.*<\/title>/
const MOUNT = '<div id="root"></div>'

const template = readFileSync(join(dist, 'index.html'), 'utf8')
// Without these the build would quietly ship the empty page this script exists to replace
if (!TITLE.test(template) || !template.includes(MOUNT)) throw new Error('prerender: index.html lost its <title> or #root')

const { render, routes, SITE_URL } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

for (const route of routes) {
  const { head, body } = render(route)
  // Replacer functions, because a plain string would treat any `$` in the content as a pattern
  const html = template.replace(TITLE, () => head).replace(MOUNT, () => `<div id="root">${body}</div>`)

  const file = join(dist, route.path === '/' ? 'index.html' : `${decodeURIComponent(route.path.slice(1))}.html`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
  console.log(`prerendered ${route.path}`)
}

const urls = routes.map(({ path, lastmod }) => {
  const modified = lastmod ? `<lastmod>${lastmod}</lastmod>` : ''
  return `  <url><loc>${SITE_URL}${path}</loc>${modified}</url>`
})
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
)

rmSync(ssrDir, { recursive: true, force: true })
