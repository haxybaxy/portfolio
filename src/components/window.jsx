import React, { useState } from "react";
import "../styles/window.css";
import FadeInSection from "./fadeinsection";
import { Typewriter } from 'react-simple-typewriter';

export default function Window({children, title, id, filename, headerstyle}) {
  const [startTyping, setStartTyping] = useState(false);
  return (
    <FadeInSection onVisible={() => setStartTyping(true)}>
    <div className="window" id={id}>
      <div className="windowHeader">
        <ul className="windowControls">
          <li className="closeWindow">X</li>
          <li className="minWindow">&ndash;</li>
          <li className="expandWindow">
            <span className="triangle">&#x25E4;</span>
            <span className="triangle">&#x25E2;</span>
          </li>
        </ul>
        <div className="filename">
        <img src="public/folder.svg" alt="folder" className="folderIcon" />
        <span>{filename}</span>
        </div>
      </div>
      <div className="sectionHeader" style={headerstyle}>
        <h1 className="promptchars"> <span style={{color:"#74c7ec"}}> ~ </span> ❯</h1>
        <span className="typeAnimation">
        {startTyping && <Typewriter
            words={[title]}
            loop={1}
            cursor = {false}
            cursorStyle='|'
            cursorBlinking = {false}
            typeSpeed={70}
            delaySpeed={1000}
          />}
        </span>
      <hr className="headerLine"></hr>
      </div>
      <div className="contentContainer">
      <FadeInSection delay={'900ms'}>
      {children}
      </FadeInSection>
      </div>

    </div>
    </FadeInSection>
  );
}