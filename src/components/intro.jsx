import React from "react";
import PropellerHatModel from "./propellerhat";
import "../styles/intro.css";

export default function Intro() {
  return (
    <div className="intro-container">
      <PropellerHatModel />
      <div id="title">
        <h1>Zaid Alsaheb</h1>
        <p>Welcome to my portfolio!</p>
      </div>
    </div>
  );
}