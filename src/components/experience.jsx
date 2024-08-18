import React, { useState } from "react";
import Window from "./window";
import Tmux from "./tmux";
import VerticalTabs from "./verticaltabs";
import "../styles/experience.css";
export default function Experience() {

  return (
    <Window title="experience" id="experience">
    <h1>Experience</h1>
    <VerticalTabs />
    <Tmux />
    </Window>
  );
}
