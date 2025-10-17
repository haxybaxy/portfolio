import "../styles/nvim.css";


export default function Nvim({filename, lineNumber, charNumber, percent, insertError, vimMode}) {

  if (percent <20) {
    percent = 'Top'
  } else if (percent > 80) {
    percent = 'Bot'
  }

  return (
  <div className="nvim">
    <p className="insertError" style={insertError =='--VISUAL--' ? {color: '#ffffff'}: {}}>{insertError}</p>
    <div className="nvimbar">
      <div className="nvimLeft"><p className="mode nvimItem" style={vimMode=='VISUAL' ? {backgroundColor: '#f5ff8b'}: {}}>{vimMode}</p>
      <p className="jobfile nvimItem">{filename}.md</p> <img src="/icons/markdown.svg" className="markdownicon"/></div>
      <div className="nvimRight">
      <p className="percent nvimItem">{percent === 'Top' || percent === 'Bot' ? percent : `${percent}%`}</p>
      <p className="line nvimItem">{lineNumber}:{charNumber}</p>
      </div>
    </div>
  </div>
  )
}

