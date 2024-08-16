import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import "../styles/experience.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Experience() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="experience" id="experience">
      <h1>Experience</h1>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Job 1" {...a11yProps(0)} />
          <Tab label="Job 2" {...a11yProps(1)} />
          <Tab label="Job 3" {...a11yProps(2)} />
          <Tab label="Job 4" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <h2>Job 1</h2>
          <p>Details about Job 1...</p>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h2>Job 2</h2>
          <p>Details about Job 2...</p>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h2>Job 3</h2>
          <p>Details about Job 3...</p>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <h2>Job 4</h2>
          <p>Details about Job 4...</p>
        </TabPanel>
      </Box>
    </div>
  );
}
