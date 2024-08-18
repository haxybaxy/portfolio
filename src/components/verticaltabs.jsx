import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import '../styles/verticalTabs.css';

export default function VerticalTabs() {
  return (
    <Tabs.Root defaultValue="tab1" className="vertical-tabs-container">
      <Tabs.List className="vertical-tabs-list" orientation="vertical">
        <Tabs.Trigger value="tab1" className="vertical-tab-trigger">
          Tab 1
        </Tabs.Trigger>
        <Tabs.Trigger value="tab2" className="vertical-tab-trigger">
          Tab 2
        </Tabs.Trigger>
        <Tabs.Trigger value="tab3" className="vertical-tab-trigger">
          Tab 3
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="tab1" className="vertical-tab-content">
        <p>Content for Tab 1</p>
      </Tabs.Content>
      <Tabs.Content value="tab2" className="vertical-tab-content">
        <p>Content for Tab 2</p>
      </Tabs.Content>
      <Tabs.Content value="tab3" className="vertical-tab-content">
        <p>Content for Tab 3</p>
      </Tabs.Content>
    </Tabs.Root>
  );
}
