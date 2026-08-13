import { useRef } from "react";
import type { ReactNode } from "react";
import "../styles/introwindow.css";
import FadeInSection from "./fadeinsection";

interface IntroWindowProps {
  /** The landing content. Stays mounted while `secondary` is showing — see .intro-primary. */
  children: ReactNode;
  /** Rendered in an out-of-flow layer over the children when expanded. Its wrapper is
   *  always in the DOM so both directions of the cross-fade have a value to animate
   *  from — mounting it with the expanded styles already applied would skip the fade. */
  secondary?: ReactNode;
  id?: string;
  filename: string;
  expanded?: boolean;
  /** Rendered as the window's close control, visible only while expanded. */
  onClose?: () => void;
}

export default function IntroWindow({ children, secondary, id, filename, expanded = false, onClose }: IntroWindowProps) {
  // Captured on the first render only. A direct load of /blog/:slug boots already expanded,
  // and FadeInSection's 20px entry drift would show as a gap under a window whose whole
  // point is that its bottom edge is the viewport bottom. The opacity fade still plays.
  const bootedExpanded = useRef(expanded).current;

  return (
    <FadeInSection
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible',
        ...(bootedExpanded ? { transform: 'none' } : null),
      }}
    >
      <div className={`intro-window-frame ${expanded ? 'is-expanded' : ''}`}>
        <div className="intro-window" id={id}>
          <div className="intro-window-header">
            {onClose && (
              <button
                type="button"
                className="intro-close"
                aria-label="Close"
                tabIndex={expanded ? 0 : -1}
                onClick={onClose}
              />
            )}
            <div className="intro-filename">
              <img src="/folder.svg" alt="folder" className="folderIcon" />
              {/* Keyed so a name swap replays the fade instead of hard-cutting mid-morph */}
              <span key={filename} className="intro-filename-text">{filename}</span>
            </div>
          </div>
          <div className="intro-content-container">
            {/* Not `visibility: hidden` — that would stop the browser painting the
                three.js canvas inside, see introwindow.css. inert does the job that
                visibility was doing for focus and screen readers. Spread because
                React 18 has no typed `inert` prop. */}
            <div
              className="intro-primary"
              {...((expanded ? { inert: '' } : {}) as Record<string, unknown>)}
            >
              <FadeInSection delay={'900ms'}>
                {children}
              </FadeInSection>
            </div>
            <div className="intro-secondary">{secondary}</div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
