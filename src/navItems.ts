// One scrolling page; the nav jumps between these anchors. Writing is hidden for now (src/pages/Writing.tsx).
// Kept apart from src/sections.tsx so pages that only need the nav don't load every section.
export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const
