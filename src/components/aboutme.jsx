import React from "react";
import "../styles/aboutme.css";

export default function AboutMe() {
  return (
    <div className="aboutme" id="aboutme">
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
      <h1 className="sectionTitle"> &#x7E; &#x276F; about me</h1>
      <hr className="headerLine"></hr>
      </div>
      <div className="contentContainer">
      <div className="textContainer">
      <p>
        I am currently an undergrad student at IE University, pursuing a bachelors degree in Computer Science and Artificial Intelligence. I am passionate about technology and all of its interconnected facets, which drives me to learn about anything and everything.
      </p>

      <p>
        Here are some of the technologies that I've worked with:
      </p>

      <ul>
        <li>Python</li>
        <li>Java</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>Node.js</li>
      </ul>
      </div>
      <img src="../../public/myphoto.jpeg"/>
      </div>
    </div>
  );
}