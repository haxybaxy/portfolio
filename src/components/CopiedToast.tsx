import { useState } from 'react'
import { CASCADE } from '../motion'
import Icon from './Icon'

/**
 * Fixed pill at the bottom of the viewport while the address is on the clipboard.
 * Mounts on the first copy, which keeps its text out of the prerendered page, then stays mounted so it can fade out.
 */
function CopiedToast({ visible }: { visible: boolean }) {
  const [used, setUsed] = useState(false)
  if (visible && !used) setUsed(true)
  if (!visible && !used) return null

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 bottom-8 z-30 flex justify-center px-6 ${CASCADE} ${visible ? '' : 'translate-y-2 opacity-0'}`}
    >
      <span className="flex items-center gap-2 rounded-full border border-fg/15 bg-bg px-4 py-2 text-sm shadow-lg shadow-black/20">
        <Icon name="check" />
        Email copied to clipboard
      </span>
    </div>
  )
}

export default CopiedToast
