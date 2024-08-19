import React, { useEffect, useState } from "react";
import "../styles/tmux.css";
import { projectsData } from "./projectsData";

export default function Tmux({ activeSlide }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const formattedDate = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      }).replace(/ /g, '-');
      setTime(formattedTime);
      setDate(formattedDate);
    };

    updateTimeAndDate();

    const intervalId = setInterval(updateTimeAndDate, 60000);

    return () => clearInterval(intervalId);
  }, []);

  console.log("Active slide in Tmux:", activeSlide); // Debugging: Check the active slide in Tmux

  return (
    <div className="tmuxContainer" id="tmux">
      <p> [projects]{" "}
        {projectsData.map((project, index) => (
          <span key={index}>
            {index + 1}:{project.tmuxname}{index === activeSlide ? "*" : ""}{" "}
          </span>
        ))}
      </p>
      <p>"localhost" {time} {date} </p>
    </div>
  );
}
