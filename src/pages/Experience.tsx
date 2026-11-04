import { useEffect, useRef, useState } from 'react'
import Disclosure from '../components/Disclosure'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import TechChip from '../components/TechChip'
import { jobs } from '../data/jobs'
import { projectSlug } from '../data/projects'
import { skillCategories } from '../data/skills'
import { useReveal } from '../hooks/useReveal'
import { CASCADE, REVEAL, TURN } from '../motion'
import { LINK, MUTED, SECTION_TITLE } from '../surface'

// Every role starts collapsed; the row shows dates, role and company. Only the latest few show until "See more".
const latestFirst = jobs.toReversed()
const INITIAL_ROLES = 4
const STAGGER_MS = 40

function Experience() {
  const [showAll, setShowAll] = useState(false)
  const [openIds, setOpenIds] = useState<readonly string[]>([])
  const [focus, setFocus] = useState<string | null>(null)
  const { ref: listRef, shown: listShown } = useReveal<HTMLOListElement>()
  const visible = showAll ? latestFirst : latestFirst.slice(0, INITIAL_ROLES)

  const toggle = (id: string) =>
    setOpenIds((ids) => (ids.includes(id) ? ids.filter((other) => other !== id) : [...ids, id]))

  // A #job-<id> link (e.g. from a project's "Built at") reveals the list if needed, opens that role and scrolls to it
  useEffect(() => {
    const readHash = () => {
      const match = /^#job-([\w-]+)$/.exec(window.location.hash)
      if (!match) return
      const id = match[1]
      if (latestFirst.findIndex((job) => job.id === id) >= INITIAL_ROLES) setShowAll(true)
      setOpenIds((ids) => (ids.includes(id) ? ids : [...ids, id]))
      setFocus(id)
    }
    readHash()
    window.addEventListener('hashchange', readHash)
    return () => window.removeEventListener('hashchange', readHash)
  }, [])

  // Scrolls once the row exists in the DOM (it may only mount after showAll); each linked role is handled once
  const handled = useRef<string | null>(null)
  useEffect(() => {
    if (!focus || handled.current === focus) return
    const row = document.getElementById(`job-${focus}`)
    if (!row) return
    row.scrollIntoView({ block: 'start' })
    handled.current = focus
  }, [focus, showAll])

  return (
    <div className="flex w-full max-w-3xl flex-col gap-10">
      <Reveal>
        <h2 className={SECTION_TITLE}>Experience</h2>
      </Reveal>

      {/* Opacity only: the rows are scroll targets, and a translate would throw scrollIntoView off */}
      <ol ref={listRef} className={`flex flex-col gap-6 ${REVEAL} ${listShown ? '' : 'js:motion-safe:opacity-0'}`}>
        {visible.map((job, i) => {
          const open = openIds.includes(job.id)
          // Rows revealed by "See more" cascade in; the one a #job- link targets appears in place so scrollIntoView lands exactly
          const cascades = i >= INITIAL_ROLES && job.id !== focus
          return (
            <li
              key={job.id}
              id={`job-${job.id}`}
              style={cascades ? { transitionDelay: `${(i - INITIAL_ROLES) * STAGGER_MS}ms` } : undefined}
              className={`scroll-mt-28 ${cascades ? CASCADE : ''}`}
            >
              <Disclosure
                id={`job-${job.id}`}
                open={open}
                onToggle={() => toggle(job.id)}
                summaryClassName="grid gap-x-8 gap-y-1 sm:grid-cols-[10rem_1fr]"
                contentClassName="flex flex-col gap-4 pt-4 sm:pl-[calc(10rem+2rem)]"
                summary={
                  <>
                    {/* Inline on phones, two stacked lines beside the role on wider screens */}
                    <span className={`${MUTED} sm:flex sm:flex-col`}>
                      <span>{job.startDate} –</span> <span>{job.endDate}</span>
                    </span>
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="font-bold">
                        {job.role}
                        <span className="font-normal opacity-70"> · {job.company}</span>
                      </span>
                      <Icon
                        name="chevronDown"
                        className={`size-4 shrink-0 self-center opacity-50 ${TURN} ${open ? 'rotate-180' : ''}`}
                      />
                    </span>
                  </>
                }
              >
                <ul className="flex list-['→_'] flex-col gap-2 pl-6 text-sm leading-relaxed opacity-85">
                  {job.content.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {job.relatedProjects?.map((title) => (
                  <a key={title} href={`#project-${projectSlug(title)}`} className={`inline-flex items-center gap-2 text-sm ${LINK}`}>
                    {title}
                    <Icon name="arrowRight" />
                  </a>
                ))}
                <ul className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <TechChip key={skill} name={skill} />
                  ))}
                </ul>
              </Disclosure>
            </li>
          )
        })}
      </ol>

      {latestFirst.length > INITIAL_ROLES && (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          aria-expanded={showAll}
          className={`inline-flex cursor-pointer items-center gap-2 self-start text-sm ${LINK}`}
        >
          {showAll ? 'See less' : `See ${latestFirst.length - INITIAL_ROLES} more`}
          <Icon name="chevronDown" className={`size-4 ${TURN} ${showAll ? 'rotate-180' : ''}`} />
        </button>
      )}

      <Reveal className="flex flex-col gap-6 border-t border-fg/10 pt-10">
        {skillCategories.map((category) => (
          <div key={category.title} className="flex flex-col gap-3">
            <h3 className={MUTED}>{category.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <TechChip key={skill} name={skill} />
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </div>
  )
}

export default Experience
