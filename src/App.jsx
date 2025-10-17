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
import "./styles/app.css";
import smoothscroll from 'smoothscroll-polyfill';

export default function App() {
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  const handleCloseSection = () => {
    setOpenSection(null);
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
            <AboutMe onClose={handleCloseSection} />
          </div>
        )}

        {openSection === 'experience' && (
          <div className="overlay">
            <Experience onClose={handleCloseSection} />
          </div>
        )}

        {openSection === 'projects' && (
          <div className="overlay">
            <Projects onClose={handleCloseSection} />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
