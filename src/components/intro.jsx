import React from "react";
import PropellerHatModel from "./propellerhat";
import "../styles/intro.css";

export default function Intro() {
  return (
    <div className="intro-container" id="intro">
      <PropellerHatModel />
      <div id="title">
        <h1>Hello, I am <span className="purpletext">Zaid</span> 👋</h1>
        <h2>i like making things</h2>
        <p>Versatile full-stack software developer and AI/ML engineer based in Madrid, Spain. Known for a holistic, interdisciplinary approach, and a strong commitment to continuous learning.</p>
        <a
      href="mailto:zaidksaheb@gmail.com"
      className="contactButton"
    >
      <span>Say Hi!</span>
    </a>
      </div>
    </div>
  );
}