import React from "react";
import Window from "./window";
import Tmux from "./tmux";
import CarouselGallery from "./carousel";
import "../styles/projects.css";
import zIndex from "@mui/material/styles/zIndex";

export default function Projects() {
  return (
    <Window title="projects" id="projects" filename="projects - tmux" headerstyle={{ position: 'absolute',zIndex: 20,top: '70px' }}>
    <div className="projects">
      <CarouselGallery />
    </div>
    </Window>
  );
}