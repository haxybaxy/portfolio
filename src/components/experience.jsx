import React, { useState } from "react";
import Window from "./window";
import Tmux from "./tmux";
import VerticalTabs from "./verticaltabs";
import "../styles/experience.css";
export default function Experience({ onClose }) {

  return (
    <Window title="experience" id="experience" filename="experience - nvim" onClose={onClose}>
    <VerticalTabs />
    </Window>
  );
}
