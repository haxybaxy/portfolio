import { Fragment, useRef } from 'react'
import { useGlyphRipple } from '../hooks/useGlyphRipple'
import art from './koi.txt?raw'

const LINES = art.replace(/\s+$/, '').split('\n')
const ROWS = LINES.length

// Each row is 1em with leading-none, so the art is ROWS em tall; size it from the height the parent sets.
const FONT_SIZE = `calc(var(--koi-h, 12rem) / ${ROWS})`

/** Split a row into runs of spaces (plain text) and single inked glyphs (one span each, so the hover effect can move them) */
function renderRow(line: string, row: number) {
  const nodes = []
  let spaces = ''
  for (let col = 0; col < line.length; col++) {
    const ch = line[col]
    if (ch === ' ') {
      spaces += ch
      continue
    }
    if (spaces) {
      nodes.push(spaces)
      spaces = ''
    }
    nodes.push(
      <span key={col} data-row={row} data-col={col} className="inline-block">
        {ch}
      </span>,
    )
  }
  if (spaces) nodes.push(spaces)
  return nodes
}

function Koi({ className = '' }: { className?: string }) {
  const preRef = useRef<HTMLPreElement>(null)
  useGlyphRipple(preRef)

  return (
    <div role="img" aria-label="A koi fish drawn in ASCII characters" data-nosnippet className={className}>
      {/* Ligatures must stay off: JetBrains Mono would fuse runs like // and || and break the grid */}
      <pre
        ref={preRef}
        aria-hidden="true"
        style={{ fontSize: FONT_SIZE }}
        className="font-mono leading-none whitespace-pre text-fg antialiased selection:bg-fg selection:text-bg [font-variant-ligatures:none]"
      >
        {LINES.map((line, row) => (
          <Fragment key={row}>
            {row > 0 && '\n'}
            {renderRow(line, row)}
          </Fragment>
        ))}
      </pre>
    </div>
  )
}

export default Koi
