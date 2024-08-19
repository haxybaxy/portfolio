import React, {useState, useEffect} from "react";
import "../styles/nvim.css";


export default function Nvim({lineNumber, charNumber, insertError, vimMode}) {
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

