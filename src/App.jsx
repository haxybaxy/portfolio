import React from "react";
import Intro from "./components/intro";
import AboutMe from "./components/aboutme";
import Experience from "./components/experience";
import Projects from "./components/projects";
import NavBar from "./components/navigation";
import "./styles/app.css";

export default function App() { //Always add ambient light to the scene
  return (
    <div className="App">
      <NavBar />
      <Intro />
      <AboutMe />
      <Experience />
      <Projects />
    </div>
  );
}
