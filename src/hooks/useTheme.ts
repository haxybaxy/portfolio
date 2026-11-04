import { useEffect, useSyncExternalStore } from 'react'
import { reducedMotion } from '../motion'

// Same key as the pre-paint script in index.html. Session storage, so a new visit follows the system again.
const STORAGE_KEY = 'theme'
const FADE_CLASS = 'theme-fade'
// On <html> while the crossfade runs, so index.css can give it its own timing
const VT_CLASS = 'vt-theme'
const FADE_MS = 450

const systemQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

const isDark = () => document.documentElement.classList.contains('dark')

function onClassChange(notify: () => void) {
  const observer = new MutationObserver(notify)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

/**
 * Light/dark theme backed by the `dark` class on <html>, which index.html sets before first paint.
 * Follows the system setting; the toggle overrides it for this tab until the system setting changes.
 */
export function useTheme() {
  // Prerendered HTML can't know the theme, so hydration starts from light. Only labels use this: the page and the
  // toggle's icons follow the class through CSS, so they are right before this catches up.
  const dark = useSyncExternalStore(onClassChange, isDark, () => false)

  const switchTo = (next: boolean) => {
    const root = document.documentElement
    if (isDark() === next) return
    const apply = () => root.classList.toggle('dark', next)

    if (reducedMotion()) {
      apply()
    } else if (typeof document.startViewTransition === 'function') {
      // Crossfade the whole page between the two palettes
      root.classList.add(VT_CLASS)
      const done = () => root.classList.remove(VT_CLASS)
      document.startViewTransition(apply).finished.then(done, done)
    } else {
      // Fallback: let colours interpolate for a moment
      root.classList.add(FADE_CLASS)
      apply()
      window.setTimeout(() => root.classList.remove(FADE_CLASS), FADE_MS)
    }
  }

  // A change to the system setting wins over the toggle
  useEffect(() => {
    const query = systemQuery()
    const follow = () => {
      try {
        sessionStorage.removeItem(STORAGE_KEY)
      } catch {
        // Storage can be unavailable (privacy modes)
      }
      switchTo(query.matches)
    }
    query.addEventListener('change', follow)
    return () => query.removeEventListener('change', follow)
  }, [])

  const toggle = () => {
    const next = !dark
    try {
      // Matching the system again needs no override
      if (next === systemQuery().matches) sessionStorage.removeItem(STORAGE_KEY)
      else sessionStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
    } catch {
      // Storage can be unavailable (privacy modes); the theme still switches for this visit
    }
    switchTo(next)
  }

  return { dark, toggle }
}
