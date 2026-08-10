import {useEffect, useState} from "react";
import Intro from "./components/intro";
import AboutMe from "./components/aboutme";
import Experience from "./components/experience";
import Projects from "./components/projects";
import Footer from "./components/footer";
import ThemeToggle from "./components/themetoggle";
import WaveBackground from "./components/wavebackground";
import BackgroundEffects from "./components/backgroundeffects";
import { ThemeProvider } from "./context/ThemeContext";
import { jobData } from "./components/jobData";
import type { SectionId } from "./types";
import "./styles/app.css";
import smoothscroll from 'smoothscroll-polyfill';

export default function App() {
  const [openSection, setOpenSection] = useState<SectionId | null>(null);
  // Selection state lives here so experience and projects can navigate into each other
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeJob, setActiveJob] = useState(jobData[jobData.length - 1].value);

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  // Manage body class for overlay state to control scrolling
  useEffect(() => {
    if (openSection) {
      document.body.classList.add('overlay-open');
    } else {
      document.body.classList.remove('overlay-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('overlay-open');
    };
  }, [openSection]);

  const handleCloseSection = () => {
    setOpenSection(null);
    // Projects always reopens on the grid, as it did when its state was local
    setSelectedProject(null);
  };

  const handleOpenProject = (index: number) => {
    setSelectedProject(index);
    setOpenSection('projects');
  };

  const handleOpenJob = (value: string) => {
    setActiveJob(value);
    setOpenSection('experience');
  };

  return (
    <ThemeProvider>
      <div className="App">
        <ThemeToggle />
        <BackgroundEffects />
        <WaveBackground />
        <Intro onOpenSection={setOpenSection} />
        <Footer />

        {openSection === 'about' && (
          <div className="overlay">
            <div className="overlay-content">
              <AboutMe onClose={handleCloseSection} />
            </div>
          </div>
        )}

        {openSection === 'experience' && (
          <div className="overlay">
            <div className="overlay-content">
              <Experience
                onClose={handleCloseSection}
                activeTab={activeJob}
                onActiveTabChange={setActiveJob}
                onOpenProject={handleOpenProject}
              />
            </div>
          </div>
        )}

        {openSection === 'projects' && (
          <div className="overlay">
            <div className="overlay-content">
              <Projects
                onClose={handleCloseSection}
                selectedProject={selectedProject}
                onSelectProject={setSelectedProject}
                onOpenJob={handleOpenJob}
              />
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
