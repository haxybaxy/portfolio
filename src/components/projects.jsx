import React from "react";
import Window from "./window";
import Tmux from "./tmux";
import "../styles/projects.css";

export default function Projects() {
  return (
    <Window title="projects" id="projects" filename="tmux">
    <div className="projects">
      <h1>Projects</h1>
      <p>
        I am a software developer with a passion for learning and creating. I have experience with a variety of technologies, including React, Node.js, and Python. I am always looking for new challenges and opportunities to grow as a developer.
      </p>
    </div>
    <Tmux />
    </Window>
  );
}