import React, {useState, useEffect} from "react";
import "../styles/nvim.css";


export default function Nvim({lineNumber, charNumber}) {
  const [insertError, setInsertError] = useState("");
  const [vimMode, setVimMode] = useState("NORMAL");

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "I" || event.key === "i") {
        setInsertError("E45: 'readonly' option is set");
      } else if (event.key === "V" || event.key === "v") {
        setVimMode("VISUAL");
      } else if (event.key === "N" || event.key === "n") {
        setVimMode("NORMAL");
      }

    };

    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
  <div className="nvim">
    <p className="insertError">{insertError}</p>
    <div className="nvimbar">
      <div className="nvimLeft"><p className="mode nvimItem" style={vimMode=='VISUAL' ? {backgroundColor: '#f5ff8b'}: {}}>{vimMode}</p>
      <p className="jobfile nvimItem">filename.md</p></div>
      <div className="nvimRight">
      <p className="percent nvimItem">Top</p>
      <p className="line nvimItem">{lineNumber}:{charNumber}</p>
      </div>
    </div>
  </div>
  )
}

