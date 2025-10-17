import { useState, useEffect } from "react";
import Draggable from 'react-draggable'
import "../styles/window.css";
import FadeInSection from "./fadeinsection";
import { Typewriter } from 'react-simple-typewriter';
import useSound from 'use-sound';


export default function Window({ children, title, id, filename, headerstyle, onClose, bottomBar, hideTitle, hideLine }) {
  const [startTyping, setStartTyping] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
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
          <li className="closeWindow"
            onClick={() => {
              playClick();
              setIsClosing(true);
              // Wait for fade-out animation to complete before closing
              setTimeout(() => {
                onClose();
              }, 400); // Match the CSS transition duration
            }}
            style={{ cursor: 'pointer' }}>X</li>
        </ul>
        <div className="filename">
          <img src="folder.svg" alt="folder" className="folderIcon" />
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
    <FadeInSection onVisible={() => setStartTyping(true)} isClosing={isClosing}>
      {isMobile ? WindowContent : <Draggable handle=".windowHeader">{WindowContent}</Draggable>}
    </FadeInSection>
  );
}
