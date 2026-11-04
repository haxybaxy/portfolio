import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import { getScrollProgress } from './scrollProgress'
import { sections } from './sections'

/** The one scrolling page; everything else is a static page (src/pages/StaticPage.tsx) */
function App() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Track the section in view
  useEffect(() => {
    const update = () => setActiveIndex(Math.round(getScrollProgress(sections.length)))
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <>
      <Nav items={sections} activeId={sections[activeIndex].id} />
      <main>
        {sections.map(({ id, Component, centered }) => (
          <section
            key={id}
            id={id}
            // Content sections anchor to the top so expanding rows only grow downwards
            className={`flex min-h-svh flex-col items-center px-6 ${centered ? 'justify-center py-24' : 'pt-28 pb-24'}`}
          >
            <Component />
          </section>
        ))}
      </main>
    </>
  )
}

export default App
