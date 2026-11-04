// Shared motion. The curve (--ease-out-soft) and the 250ms default live in index.css @theme, so every
// transition-* utility already uses them; these add properties, longer durations and hidden states.
// Reduced motion is handled once, globally, in index.css.

/** Opacity plus a small translate: toasts, icon pairs that swap */
export const FADE = 'transition-[opacity,translate] duration-300'
/** FADE plus rotation, for stacked icon pairs (menu/close, sun/moon) */
export const SWAP = 'transition-[opacity,translate,rotate] duration-300'
/** Chevrons and other things that turn */
export const TURN = 'transition-transform duration-300'
/** Hover and press feedback on icon buttons */
export const PRESS = 'transition-[opacity,scale] active:scale-95'
/** Collapsible panel height (grid-template-rows 0fr → 1fr) */
export const EXPAND = 'transition-[grid-template-rows] duration-300'
/** An element mounting into a list fades up from @starting-style; stagger siblings with transitionDelay */
export const CASCADE = `${FADE} starting:translate-y-2 starting:opacity-0`
/** Scroll reveal (useReveal): longer and softer; the hidden state needs motion allowed and JS running to undo it */
export const REVEAL = 'transition-[opacity,translate] duration-500'
export const REVEAL_HIDDEN = 'js:motion-safe:translate-y-3 js:motion-safe:opacity-0'

/** True when the user asked for less motion; used to skip a behaviour (e.g. a view transition), not just shorten it */
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
