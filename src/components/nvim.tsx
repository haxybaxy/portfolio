import "../styles/nvim.css";
import type { VimMode } from "../types";

interface NvimProps {
  filename: string;
  lineNumber: number;
  charNumber: number;
  percent: number;
  insertError: string;
  vimMode: VimMode;
}

export default function Nvim({filename, lineNumber, charNumber, percent, insertError, vimMode}: NvimProps) {

  const percentLabel = percent < 20 ? 'Top' : percent > 80 ? 'Bot' : `${percent}%`;

  return (
  <div className="nvim">
    <p className="insertError" style={insertError =='--VISUAL--' ? {color: '#ffffff'}: {}}>{insertError}</p>
    <div className="nvimbar">
      <div className="nvimLeft"><p className="mode nvimItem" style={vimMode=='VISUAL' ? {backgroundColor: '#f5ff8b'}: {}}>{vimMode}</p>
      <p className="jobfile nvimItem">{filename}.md</p> <img src="/icons/markdown.svg" className="markdownicon"/></div>
      <div className="nvimRight">
      <p className="percent nvimItem">{percentLabel}</p>
      <p className="line nvimItem">{lineNumber}:{charNumber}</p>
      </div>
    </div>
  </div>
  )
}
