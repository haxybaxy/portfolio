import { useState, useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";
import Draggable from 'react-draggable'
import "../styles/window.css";
import FadeInSection from "./fadeinsection";
import { Typewriter } from 'react-simple-typewriter';
import useSound from 'use-sound';

interface WindowProps {
  children: ReactNode;
  title: string;
  filename: string;
  onClose: () => void;
  id?: string;
  headerstyle?: CSSProperties;
  bottomBar?: ReactNode;
  hideTitle?: boolean;
  hideLine?: boolean;
}

export default function Window({ children, title, id, filename, headerstyle, onClose, bottomBar, hideTitle, hideLine }: WindowProps) {
  const [startTyping, setStartTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [playClick] = useSound('/sounds/toc-click.wav', { volume: 0.5 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const WindowContent = (
    <div className="window" id={id}>
      <div className={`windowHeader ${isMobile ? 'mobile' : ''}`}>
        <ul className="windowControls">
          {/* The fade-out belongs to the overlay in App, which owns the unmount too —
              timing it from here meant two clocks that could not stay in sync. */}
          {/* No glyph inside, so the label is the only thing naming it */}
          <li className="closeWindow"
            aria-label="Close"
            onClick={() => {
              playClick();
              onClose();
            }}
            style={{ cursor: 'pointer' }}></li>
        </ul>
        <div className="filename">
          <img src="/folder.svg" alt="folder" className="folderIcon" />
          <span>{filename}</span>
        </div>
      </div>
      <div className={`sectionHeader ${hideTitle ? 'hidden' : ''}`} style={headerstyle}>
        <h1 className="promptchars"> <span style={{ color: "#74c7ec" }}> ~ </span> ❯</h1>
        <span className="typeAnimation">
          {startTyping && <Typewriter
            words={[title]}
            loop={1}
            cursor={false}
            cursorStyle='|'
            cursorBlinking={false}
            typeSpeed={70}
            delaySpeed={1000}
          />}
        </span>
        {!hideLine && <hr className="headerLine"></hr>}
      </div>
      <div className="contentContainer">
        <FadeInSection delay={'900ms'}>
          {children}
        </FadeInSection>
      </div>
      {bottomBar && (
        <div className="windowBottomBar">
          {bottomBar}
        </div>
      )}
    </div>
  );

  return (
    <FadeInSection onVisible={() => setStartTyping(true)}>
      {isMobile ? WindowContent : <Draggable handle=".windowHeader">{WindowContent}</Draggable>}
    </FadeInSection>
  );
}
