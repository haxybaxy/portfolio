import {useCallback, useEffect, useRef, useState} from "react";
import type { TransitionEvent } from "react";
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

const SECTION_PATHS: Record<SectionId, string> = {
  about: '/about',
  experience: '/experience',
  projects: '/projects',
  blog: '/blog',
};

/* The blog is not one of these: it expands the landing page's own window in place
   rather than opening over it, so it never enters the overlay machinery below. */
type OverlaySection = Exclude<SectionId, 'blog'>;

const OVERLAY_SECTION_IDS: OverlaySection[] = ['about', 'experience', 'projects'];

/** A watchdog, not a timing source: the CSS transition in app.css times the fade, this
 *  only stops the overlay wedging on screen if transitionend is lost (backgrounded tab,
 *  interrupted transition). Deliberately well clear of the 260ms exit so it can never be
 *  the clock that cuts the animation short. */
const EXIT_WATCHDOG_MS = 600;

/** What the overlay is currently showing, which outlives the URL by one exit animation. */
type OverlayView = { section: OverlaySection };

/**
 * Sections are addressed by URL rather than local state so posts are linkable and
 * indexable, and so the back button closes an overlay instead of leaving the site.
 * The overlay renders from `view` rather than straight off this, so that a section
 * closed by the back button gets the same fade-out as one closed by its X button.
 */
function pathToSection(pathname: string): OverlaySection | null {
  return OVERLAY_SECTION_IDS.find((id) =>
    pathname === SECTION_PATHS[id] || pathname.startsWith(`${SECTION_PATHS[id]}/`)
  ) ?? null;
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const blogMatch = useMatch('/blog/:slug');

  const openSection = pathToSection(location.pathname);
  // Matched off the pathname rather than the route so anything under /blog still lands
  // on the blog, as it did when the blog was one of the sections above.
  const isBlogOpen = location.pathname === SECTION_PATHS.blog
    || location.pathname.startsWith(`${SECTION_PATHS.blog}/`);
  const blogSlug = blogMatch?.params.slug ?? null;

  // Selection state lives here so experience and projects can navigate into each other
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeJob, setActiveJob] = useState(jobData[jobData.length - 1].value);

  // The overlay lags the URL by one exit animation: when the route leaves a section we
  // keep rendering it, so the backdrop and the window can fade out together instead of
  // both vanishing in the frame the URL changes.
  const [view, setView] = useState<OverlayView | null>(
    openSection ? { section: openSection } : null
  );

  // Adjusted during render rather than in an effect: an effect would run after the commit
  // that already unmounted the overlay, which shows up as an unmount/remount flash.
  if (openSection && (view === null || view.section !== openSection)) {
    setView({ section: openSection });
  }

  const isClosing = openSection === null && view !== null;
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  // Manage body class for overlay state to control scrolling. Keyed to `view` rather than
  // `openSection` so the scroll lock outlasts the fade.
  useEffect(() => {
    if (view) {
      document.body.classList.add('overlay-open');
    } else {
      document.body.classList.remove('overlay-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('overlay-open');
    };
  }, [view]);

  // One overlay node now serves every section, so its scroll offset would otherwise carry
  // over when a cross-link swaps the section underneath it.
  useEffect(() => {
    overlayRef.current?.scrollTo({ top: 0 });
  }, [view?.section]);

  const finishClose = useCallback(() => {
    setView(null);
    // Projects always reopens on the grid, as it did when its state was local. Resetting at
    // click time instead would flip a detail view back to the grid mid-fade.
    setSelectedProject(null);
  }, []);

  // transitionend does not fire if the tab is backgrounded, and an overlay stuck at
  // opacity 0 would swallow every click on the page behind it.
  useEffect(() => {
    if (!isClosing) return;
    const timer = setTimeout(finishClose, EXIT_WATCHDOG_MS);
    return () => clearTimeout(timer);
  }, [isClosing, finishClose]);

  const handleOverlayTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (!isClosing) return;                             // reopened mid-fade
    if (event.target !== event.currentTarget) return;   // .overlay-content's transform bubbles
    if (event.propertyName !== 'opacity') return;
    finishClose();
  };

  const handleCloseSection = () => {
    navigate('/');
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
        {/* Stays mounted with a section open: at z-index 100 it sits under the backdrop
            and dims along with the rest of the landing page, rather than vanishing from
            it. */}
        <ThemeToggle />
        <BackgroundEffects />
        <WaveBackground />
        {/* The blog lives inside the landing page's own window rather than over it, so
            it is driven from here rather than from the overlay below. */}
        <Intro isBlogOpen={isBlogOpen} blogSlug={blogSlug} onCloseBlog={handleCloseSection} />
        <Footer atTop={isBlogOpen} />

        {view && (
          <div
            ref={overlayRef}
            className={`overlay ${isClosing ? 'is-closing' : ''}`}
            onTransitionEnd={handleOverlayTransitionEnd}
          >
            <div className="overlay-content">
              {view.section === 'about' && <AboutMe onClose={handleCloseSection} />}

              {view.section === 'experience' && (
                <Experience
                  onClose={handleCloseSection}
                  activeTab={activeJob}
                  onActiveTabChange={setActiveJob}
                  onOpenProject={handleOpenProject}
                />
              )}

              {view.section === 'projects' && (
                <Projects
                  onClose={handleCloseSection}
                  selectedProject={selectedProject}
                  onSelectProject={setSelectedProject}
                  onOpenJob={handleOpenJob}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
