import React from "react";
import PropellerHatModel from "./propellerhat";
import FadeInSection from "./fadeinsection";
import "../styles/intro.css";
import { Fade } from "react-bootstrap";

export default function Intro() {
  return (
    <div className="intro-container" id="intro">
      <PropellerHatModel />
      <FadeInSection style={{height: 'auto'}}>
      <div id="title">
        <h1>👋 Hello! I am <span className="purpletext">Zaid</span>. 👋</h1>
        <FadeInSection delay={'1000ms'}>
        <p className="caption">Versatile full-stack software developer and AI/ML engineer based in Madrid, Spain.</p>
        <a
      href="mailto:zaidksaheb@gmail.com"
      className="contactButton"
    >
      <span>Say Hi!</span>
    </a>
        </FadeInSection>
      </div>
      </FadeInSection>
    </div>
  );
}
