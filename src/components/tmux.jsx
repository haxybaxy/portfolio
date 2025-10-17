import { useEffect, useState } from "react";
import "../styles/tmux.css";
import { projectsData } from "./projectsData";

export default function Tmux({ selectedProject }) {
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

  const projectName = selectedProject === null
    ? "projects"
    : projectsData[selectedProject].tmuxname;

  const modeIndicator = selectedProject === null ? "0:fzf*" : "0:[tmux]*";

  return (
    <div className="tmuxContainer" id="tmux">
      <p className="tmuxItem">[{projectName}] {modeIndicator}</p>
      <p className="tmuxItem datetime">&quot;localhost&quot; {time} {date} </p>
    </div>
  );
}
