import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css'
import './index.css'
import Nav from './components/Nav'
import { navItems } from './navItems'

const root = document.getElementById('root')!
const isHome = window.location.pathname === '/'
const nav = <Nav items={navItems} activeId="" base="/" />

if (import.meta.env.DEV) {
  // Nothing is prerendered in dev, so render the page from scratch. This branch drops out of production bundles.
  const { default: App } = await import('./App')
  const { default: StaticPage } = await import('./pages/StaticPage')
  createRoot(root).render(
    <StrictMode>
      {isHome ? (
        <App />
      ) : (
        <>
          {nav}
          <StaticPage path={window.location.pathname} />
        </>
      )}
    </StrictMode>,
  )
} else if (isHome) {
  const { default: App } = await import('./App')
  hydrateRoot(
    root,
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  // Other pages are static HTML, so only the nav needs JS, and the markdown pipeline never reaches the browser
  hydrateRoot(document.getElementById('nav')!, <StrictMode>{nav}</StrictMode>)
}
