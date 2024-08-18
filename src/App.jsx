import React, {useEffect} from "react";
import Intro from "./components/intro";
import AboutMe from "./components/aboutme";
import Experience from "./components/experience";
import Projects from "./components/projects";
import NavBar from "./components/navigation";
import "./styles/app.css";
import smoothscroll from 'smoothscroll-polyfill';

export default function App() {

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

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
