import React from "react";
import Intro from "./components/intro";
import AboutMe from "./components/aboutme";
import "./styles/app.css";

export default function App() { //Always add ambient light to the scene
  return (
    <div className="App">
      <Intro />
      <AboutMe />
    </div>
  );
}
