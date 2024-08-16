import React from "react";
import PropellerHatModel from "./propellerhat";
import "../styles/intro.css";

export default function Intro() {
  return (
    <div className="intro-container" id="intro">
      <PropellerHatModel />
      <div id="title">
        <h1>hello, i am <span className="purpletext">zaid</span> 👋</h1>
        <p>I like making things</p>
      </div>
    </div>
  );
}