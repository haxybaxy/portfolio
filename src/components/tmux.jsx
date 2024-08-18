import React, {useEffect, useState} from "react";
import "../styles/tmux.css";

export default function Tmux() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Function to update time and date
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

    // Update the time and date once when the component mounts
    updateTimeAndDate();

    // Set an interval to update the time every minute
    const intervalId = setInterval(updateTimeAndDate, 60000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="tmuxContainer" id="tmux">
      <p>[0] 0:bash* </p>
      <p>"localhost" {time} {date} </p>
    </div>
  );
}