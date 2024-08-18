import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import '../styles/verticalTabs.css';
import {jobData} from './jobData';

export default function VerticalTabs() {
  return (
    <Tabs.Root defaultValue={jobData[0].value} className="vertical-tabs-container">
      <Tabs.List className="vertical-tabs-list" orientation="vertical">
        {jobData.map((tab) => (
          <Tabs.Trigger key={tab.value} value={tab.value} className="vertical-tab-trigger">
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {jobData.map((tab) => (
        <Tabs.Content key={tab.value} value={tab.value} className="vertical-tab-content">
         <ul>
            {tab.content.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}