import React from "react";
import "../styles/aboutme.css";

export default function AboutMe() {
  return (
    <div className="aboutme" id="aboutme">
      <h1>About Me</h1>
      <hr></hr>
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