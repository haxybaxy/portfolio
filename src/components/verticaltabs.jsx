import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import Nvim from './nvim';
import '../styles/verticalTabs.css';
import {jobData} from './jobData';

export default function VerticalTabs() {
  return (
    <Tabs.Root defaultValue={jobData[jobData.length - 1].value} className="vertical-tabs-container">
      <Tabs.List className="vertical-tabs-list" orientation="vertical">
        {jobData.slice().reverse().map((tab) => ( // Reverse the order of the tabs to add new jobs to end of list
          <Tabs.Trigger key={tab.value} value={tab.value} className="vertical-tab-trigger">
            {tab.company}
          </Tabs.Trigger>
        ))}
        <p>hii</p>
      </Tabs.List>

      {jobData.map((tab) => (
        <Tabs.Content key={tab.value} value={tab.value} className="vertical-tab-content">
          <h1>{tab.role}</h1>
          <h2>@ {tab.company}</h2>
          <p>{tab.startDate} - {tab.endDate}</p>
         <ul>
            {tab.content.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <Nvim />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}