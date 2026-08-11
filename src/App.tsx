import {lazy, Suspense, useEffect, useState} from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
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

// The blog pulls in a markdown renderer and a syntax highlighter, which have no
// business in the landing page's bundle alongside three.js.
const Blog = lazy(() => import("./components/blog"));

const SECTION_PATHS: Record<SectionId, string> = {
  about: '/about',
  experience: '/experience',
  projects: '/projects',
  blog: '/blog',
};

const SECTION_IDS = Object.keys(SECTION_PATHS) as SectionId[];

/**
 * Sections are addressed by URL rather than local state so posts are linkable and
 * indexable, and so the back button closes an overlay instead of leaving the site.
 * Everything below still reads `openSection`, so the overlays and their close
 * animations are unchanged by this.
 */
function pathToSection(pathname: string): SectionId | null {
  return SECTION_IDS.find((id) =>
    pathname === SECTION_PATHS[id] || pathname.startsWith(`${SECTION_PATHS[id]}/`)
  ) ?? null;
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const blogMatch = useMatch('/blog/:slug');

  const openSection = pathToSection(location.pathname);
  const selectedPost = blogMatch?.params.slug ?? null;

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
    navigate('/');
    // Projects always reopens on the grid, as it did when its state was local
    setSelectedProject(null);
  };

  const handleOpenProject = (index: number) => {
    setSelectedProject(index);
    navigate(SECTION_PATHS.projects);
  };

  const handleOpenJob = (value: string) => {
    setActiveJob(value);
    navigate(SECTION_PATHS.experience);
  };

  return (
    <ThemeProvider>
      <div className="App">
        <ThemeToggle />
        <BackgroundEffects />
        <WaveBackground />
        <Intro />
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

        {openSection === 'blog' && (
          <div className="overlay">
            <div className="overlay-content">
              <Suspense fallback={null}>
                <Blog onClose={handleCloseSection} slug={selectedPost} />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
