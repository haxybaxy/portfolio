import React, { useState } from "react";
import "../styles/window.css";
import FadeInSection from "./fadeinsection";
import { Typewriter } from 'react-simple-typewriter';

export default function Window({children, title,id}) {
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

      </div>
      <div className="sectionHeader">
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
      <FadeInSection delay={'900ms'}>
      <div className="contentContainer">
      {children}
      </div>
      </FadeInSection>
    </div>
    </FadeInSection>
  );
}