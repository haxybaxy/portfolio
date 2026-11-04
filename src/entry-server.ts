import { createElement } from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import App from './App'
import Nav from './components/Nav'
import { navItems } from './navItems'
import StaticPage from './pages/StaticPage'
import { headTags, type Route } from './seo'

export { routes, SITE_URL } from './seo'

/** Build-time only, called by scripts/prerender.mjs. The markup has to match what src/main.tsx hydrates. */
export function render(route: Route) {
  const nav = () => renderToString(createElement(Nav, { items: navItems, activeId: '', base: '/' }))
  const body =
    route.path === '/'
      ? renderToString(createElement(App))
      : `<div id="nav">${nav()}</div>${renderToStaticMarkup(createElement(StaticPage, { path: route.path }))}`

  return { head: headTags(route), body }
}
