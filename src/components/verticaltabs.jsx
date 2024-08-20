import React, { useState, useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import Nvim from './nvim';
import '../styles/verticaltabs.css';
import { jobData } from './jobData';

export default function VerticalTabs() {
  const [lineNumber, setLineNumber] = useState(1);
  const [charNumber, setCharNumber] = useState(1);
  const [percent, setPercent] = useState(0);
  const [insertError, setInsertError] = useState("");
  const [vimMode, setVimMode] = useState("NORMAL");
  const [activeTab, setActiveTab] = useState(jobData[jobData.length - 1].value);

  const handleClick = (event) => {
    const contentElement = event.currentTarget;
    const contentText = contentElement.innerText;

    const clickPositionY = event.clientY - contentElement.getBoundingClientRect().top;
    const clickPositionX = event.clientX - contentElement.getBoundingClientRect().left;
    const lines = contentText.split('\n');

    let cumulativeHeight = 0;
    let calculatedLineNumber = 0;
    let calculatedCharNumber = 0;

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

    setLineNumber(calculatedLineNumber);
    setCharNumber(calculatedCharNumber);
    setPercent(Math.floor(calculatedLineNumber / lines.length * 100));
    if (insertError !== "--VISUAL--" && vimMode === "VISUAL") {
      setInsertError("--VISUAL--");
    } else if (insertError !== "--VISUAL--" || vimMode === "NORMAL") {
      setInsertError("");
    }

  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "I" || event.key === "i") {
        setInsertError("E45: 'readonly' option is set");
      } else if (event.key === "V" || event.key === "v") {
        setVimMode("VISUAL");
        setInsertError("--VISUAL--");
      } else if (event.key === 'Escape') {
        setVimMode("NORMAL");
        setInsertError("");
      } else if (event.key === 'k') {
        moveToNextTab();
      } else if (event.key === 'j') {
        moveToPreviousTab();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeTab]); // Adding activeTab as a dependency ensures the key press handler always has the latest activeTab value

  const moveToNextTab = () => {
    const currentIndex = jobData.findIndex((tab) => tab.value === activeTab);
    const nextIndex = (currentIndex + 1) % jobData.length;
    setActiveTab(jobData[nextIndex].value);
  };

  const moveToPreviousTab = () => {
    const currentIndex = jobData.findIndex((tab) => tab.value === activeTab);
    const previousIndex = (currentIndex - 1 + jobData.length) % jobData.length;
    setActiveTab(jobData[previousIndex].value);
  };

  return (
    <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="vertical-tabs-container">
      <Tabs.List className="vertical-tabs-list" orientation="vertical">
        {jobData.slice().reverse().map((tab) => (
          <Tabs.Trigger key={tab.value} value={tab.value} className="vertical-tab-trigger">
            <img src="public/folder.svg" className='listBullet' />{tab.company}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {jobData.map((tab) => (
        <Tabs.Content
          key={tab.value}
          value={tab.value}
          className="vertical-tab-content"
          onClick={handleClick}
          style={vimMode === 'VISUAL' ? { fontFamily: 'monospace' } : {}}
        >
          <h1 className='contentRole'>{vimMode === 'VISUAL' ? '# ' : ''}{tab.role}</h1>
          <div className='contentSubhead'>
            <h2 className='contentCompany'>{vimMode === 'VISUAL' ? '## **' : ''}@ {tab.company}{vimMode === 'VISUAL' ? '**' : ''}</h2>
            <h3 className='contentDate'>{tab.startDate} - {tab.endDate}</h3>
          </div>
          <ul style={vimMode === 'VISUAL' ? { listStyleType: `'- '` } : {}} className='contentList'>
            {tab.content.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <h3 className='contentSkills'>{vimMode === 'VISUAL' ? '**' : ''}Skills: {tab.skills.join(', ')}.{vimMode === 'VISUAL' ? '**' : ''}</h3>
          <Nvim filename={tab.company}lineNumber={lineNumber} charNumber={charNumber} percent={percent} insertError={insertError} vimMode={vimMode} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
