import type { ComponentType } from 'react'
import { navItems } from './navItems'
import About from './pages/About'
import Contact from './pages/Contact'
import Experience from './pages/Experience'
import Home from './pages/Home'
import Projects from './pages/Projects'

type Section = {
  Component: ComponentType
  /** Vertically centred in its screen; only for sections whose height never changes */
  centered?: boolean
}

const content: Record<(typeof navItems)[number]['id'], Section> = {
  home: { Component: Home, centered: true },
  about: { Component: About },
  experience: { Component: Experience },
  projects: { Component: Projects },
  contact: { Component: Contact, centered: true },
}

export const sections = navItems.map((item) => ({ ...item, ...content[item.id] }))
