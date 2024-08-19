import React, {useState,useEffect} from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import Nvim from './nvim';
import '../styles/verticalTabs.css';
import {jobData} from './jobData';

export default function VerticalTabs() {

  const [lineNumber, setLineNumber] = useState(0);
  const [charNumber, setCharNumber] = useState(0);
  const [insertError, setInsertError] = useState("");
  const [vimMode, setVimMode] = useState("NORMAL");

  const handleClick = (event) => {
    const contentElement = event.currentTarget;
    const contentText = contentElement.innerText;

    const clickPositionY = event.clientY - contentElement.getBoundingClientRect().top;
    const clickPositionX = event.clientX - contentElement.getBoundingClientRect().left;
    const lines = contentText.split('\n');

    let cumulativeHeight = 0;
    let calculatedLineNumber = 0;
    let calculatedCharNumber = 0;

    // Loop through each line to find which line was clicked
    for (let i = 0; i < lines.length; i++) {
      const lineHeight = contentElement.getBoundingClientRect().height / lines.length;
      cumulativeHeight += lineHeight;

      if (clickPositionY <= cumulativeHeight) {
        calculatedLineNumber = i + 1;
        const lineText = lines[i];
        const lineWidth = contentElement.getBoundingClientRect().width;
        const charWidth = lineWidth / lineText.length;
        calculatedCharNumber = Math.floor(clickPositionX / charWidth) + 1;
        break;
      }
    }

    // Update state with the calculated line number and character number
    setLineNumber(calculatedLineNumber);
    setCharNumber(calculatedCharNumber);

    console.log(`Line Number: ${calculatedLineNumber}, Character Number: ${calculatedCharNumber}`);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "I" || event.key === "i") {
        setInsertError("E45: 'readonly' option is set");
      } else if (event.key === "V" || event.key === "v") {
        setVimMode("VISUAL");
      } else if (event.key === 'Escape') {
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
    <Tabs.Root defaultValue={jobData[jobData.length - 1].value} className="vertical-tabs-container">
      <Tabs.List className="vertical-tabs-list" orientation="vertical">
        {jobData.slice().reverse().map((tab) => ( // Reverse the order of the tabs to add new jobs to end of list
          <Tabs.Trigger key={tab.value} value={tab.value} className="vertical-tab-trigger">
            <img src="../../public/folder.svg" className='listBullet' />{tab.company}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {jobData.map((tab) => (
        <Tabs.Content key={tab.value} value={tab.value} className="vertical-tab-content" onClick={handleClick}>
          <h1 className='contentRole'>{tab.role}</h1>
          <div className='contentSubhead'>
          <h2 className='contentCompany'>@ {tab.company}</h2>
          <h3 className='contentDate'>{tab.startDate} - {tab.endDate}</h3>
          </div>
         <ul>
            {tab.content.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <h3 className='contentSkills'>Skills: {tab.skills.join(', ')}</h3>
          <Nvim lineNumber={lineNumber} charNumber={charNumber} insertError={insertError} vimMode={vimMode}/>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}