import React, { useState } from "react";
import Window from "./window";
import Tmux from "./tmux";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FadeInSection from "./fadeinsection";

const isHorizontal = window.innerWidth < 600;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={isHorizontal ? `full-width-tabpanel-${index}` : `vertical-tabpanel-${index}`}
      aria-labelledby={isHorizontal ? `full-width-tab-${index}` : `vertical-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: isHorizontal ? `full-width-tab-${index}` : `vertical-tab-${index}`,
    "aria-controls": isHorizontal ? `full-width-tabpanel-${index}` : `vertical-tabpanel-${index}`,
  };
}

export default function Experience() {
  const [value, setValue] = useState(0);

  const experienceItems = {
    Job1: {
      jobTitle: "Job1",
      duration: "JUL 2022 - PRESENT",
      desc: [
        "Hi"
      ],
    },
    Job2: {
      jobTitle: "Job1",
      duration: "JUL 2022 - PRESENT",
      desc: [
        "Hi"
      ],
    },
    "Job3": {
      jobTitle: "Job1",
      duration: "JUL 2022 - PRESENT",
      desc: [
        "Hi"
      ],
    },
    Job4: {
      jobTitle: "Job1",
      duration: "JUL 2022 - PRESENT",
      desc: [
        "Hi"
      ],
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Window title="experience" id="experience">
    <h1>Experience</h1>
    <Tmux />
    </Window>
  );
}
