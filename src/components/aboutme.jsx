import React from "react";
import Window from "./window"; // Import the Window component
import "../styles/aboutme.css"; // Assuming this file contains styles specific to the about me content
import FadeInSection from "./fadeinsection"; // Import the Fadein component

export default function AboutMe() {
  return (
    <Window title="about me">
      <div className="contentContainer">
        <div className="textContainer">
          <p>
            I am currently an undergrad student at IE University, pursuing a bachelors degree in Computer Science and Artificial Intelligence. I am passionate about technology and all of its interconnected facets, which drives me to learn about anything and everything.
          </p>

          <p>
            Here are some of the technologies that I've worked with:
          </p>
          <FadeInSection delay={'100ms'}>
          <ul>
            <li>Python</li>
            <li>Java</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Node.js</li>
          </ul>
          </FadeInSection>
        </div>
        <img src="../../public/myphoto.jpeg" alt="My Photo" />
      </div>
    </Window>
  );
}
