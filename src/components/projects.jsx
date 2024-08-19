import React from "react";
import Window from "./window";
import Tmux from "./tmux";
import CarouselGallery from "./carousel";
import "../styles/projects.css";

export default function Projects() {
  return (
    <Window title="projects" id="projects" filename="projects - tmux">
    <div className="projects">
      <CarouselGallery />
    </div>
    </Window>
  );
}