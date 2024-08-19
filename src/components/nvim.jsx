import React from "react";
import "../styles/nvim.css";


export default function Nvim() {
  return (
    <div className="nvim">
      <div className="nvimLeft"><p className="mode nvimItem">NORMAL</p>
      <p className="jobfile nvimItem">filename.md</p></div>
      <div className="nvimRight">
      <p className="percent nvimItem">Top</p>
      <p className="line nvimItem">1,1</p>
      </div>
    </div>
  )
}

