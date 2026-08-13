import { useState, useEffect } from 'react';
import type { MouseEventHandler } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { ArrowRight } from 'lucide-react';
import useSound from 'use-sound';
import Nvim from './nvim';
import '../styles/verticaltabs.css';
import { jobData } from './jobData';
import { getRelatedProjects } from './relatedWork';
import type { VimMode } from '../types';

interface VerticalTabsProps {
  activeTab: string;
  onActiveTabChange: (value: string) => void;
  onOpenProject: (index: number) => void;
}

export default function VerticalTabs({ activeTab, onActiveTabChange, onOpenProject }: VerticalTabsProps) {
  const [lineNumber, setLineNumber] = useState(1);
  const [charNumber, setCharNumber] = useState(1);
  const [percent, setPercent] = useState(0);
  const [insertError, setInsertError] = useState("");
  const [vimMode, setVimMode] = useState<VimMode>("NORMAL");
  const [playClick] = useSound('/sounds/toc-click.wav', { volume: 0.5 });

  const handleOpenProject = (index: number) => {
    playClick();
    onOpenProject(index);
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
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
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "I" || event.key === "i") {
        setInsertError("E45: 'readonly' option is set");
      } else if (event.key === "V" || event.key === "v") {
        setVimMode("VISUAL");
        setInsertError("--VISUAL--");
      } else if (event.key === 'Escape') {
        setVimMode("NORMAL");
        setInsertError("");
      } else if (event.key === 'k') {
        onActiveTabChange(jobData[jobData.length - 1].value);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeTab, onActiveTabChange]); // Adding activeTab as a dependency ensures the key press handler always has the latest activeTab value



  return (
    <Tabs.Root value={activeTab} onValueChange={onActiveTabChange} className="vertical-tabs-container">
      <Tabs.List className="vertical-tabs-list">
        {jobData.slice().reverse().map((tab) => (
          <Tabs.Trigger key={tab.value} value={tab.value} className="vertical-tab-trigger">
            <div className="tab-trigger-content">
              <img src="/folder.svg" className='listBullet' />
              <div className="tab-text">
                <div className="tab-company">{tab.company}</div>
                <div className="tab-role">{tab.role}</div>
              </div>
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {jobData.map((tab) => {
        const relatedProjects = getRelatedProjects(tab);

        return (
          <Tabs.Content
            key={tab.value}
            value={tab.value}
            className="vertical-tab-content"
            onClick={handleClick}
            style={vimMode === 'VISUAL' ? { fontFamily: 'monospace' } : {}}
          >
            <div className='tab-content-body'>
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
              {relatedProjects.length > 0 && (
                <div className='relatedProjects'>
                  {relatedProjects.map(({ project, index }) => (
                    <button
                      key={project.title}
                      className='relatedProjectLink'
                      onClick={() => handleOpenProject(index)}
                    >
                      <img src="/folder.svg" className='listBullet' alt="" />
                      {vimMode === 'VISUAL' ? (
                        <span>[{project.title}](projects)</span>
                      ) : (
                        <>
                          <span>Related project: {project.title}</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  ))}
                </div>
              )}
              <h3 className='contentSkills'>{vimMode === 'VISUAL' ? '**' : ''}Skills: {tab.skills.join(', ')}.{vimMode === 'VISUAL' ? '**' : ''}</h3>
            </div>
            <Nvim filename={tab.company} lineNumber={lineNumber} charNumber={charNumber} percent={percent} insertError={insertError} vimMode={vimMode} />
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
