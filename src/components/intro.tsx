import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import PropellerHatModel from "./propellerhat";
import IntroWindow from "./introwindow";
import FadeInSection from "./fadeinsection";
import "../styles/intro.css";
import IconLucideUser from '~icons/lucide/user';
import IconLucideBriefcase from '~icons/lucide/briefcase';
import IconLucideFolderOpen from '~icons/lucide/folder-open';
import IconLucideNotebookPen from '~icons/lucide/notebook-pen';
import useSound from 'use-sound';

// The blog pulls in a markdown renderer and a syntax highlighter, which have no
// business in the landing page's bundle alongside three.js.
const Blog = lazy(() => import("./blog"));

/* Warm the chunk on intent so the fetch overlaps the expand animation instead of
   queueing behind it. The specifier must stay byte-identical to the lazy() one
   above, or Rollup emits two chunks. */
function preloadBlog() {
  void import("./blog");
}

interface IntroProps {
  isBlogOpen: boolean;
  blogSlug: string | null;
  onCloseBlog: () => void;
}

/*
 * These are <Link>s rather than <button>s so they render as real anchors: a
 * crawler can follow them to /blog, and cmd-click / middle-click / "copy link"
 * behave the way they should. .sectionButton already sets text-decoration and
 * color, so they look identical to the buttons they replaced.
 */
export default function Intro({ isBlogOpen, blogSlug, onCloseBlog }: IntroProps) {
  const [playClick] = useSound('/sounds/toc-click.wav', { volume: 0.5 });

  /* The blog outlives the URL by one collapse animation, so closing fades the post out
     with the window instead of blanking it in the first frame. Both are adjusted during
     render rather than in an effect, the same way App does it for the overlay: an effect
     runs after the commit that already dropped the content. */
  const [everOpened, setEverOpened] = useState(isBlogOpen);
  if (isBlogOpen && !everOpened) setEverOpened(true);

  // Frozen while collapsing, or a post being closed would flip back to the list mid-fade.
  const [shownSlug, setShownSlug] = useState(blogSlug);
  if (isBlogOpen && shownSlug !== blogSlug) setShownSlug(blogSlug);

  return (
    <div className="intro-container" id="intro">
      <IntroWindow
        filename={isBlogOpen ? "blog - bat" : "zaidalsaheb - fastfetch"}
        id="intro-window"
        expanded={isBlogOpen}
        onClose={onCloseBlog}
        secondary={everOpened && (
          /* An empty bounded box rather than null: on a direct /blog/:slug load the
             window is already open, and null would collapse its layer. */
          <Suspense fallback={<div className="blog-scroll" />}>
            <Blog slug={shownSlug} />
          </Suspense>
        )}
      >
        <div id="title">
          <h1 className="greeting-text"><span className="wave-emoji">👋</span> Hello! I am <span className="purpletext">Zaid </span><span className="wave-emoji">👋</span></h1>
          <FadeInSection delay={'1000ms'}>
            <div className="intro-fadein-content">
              <p className="caption">Full-stack software developer and AI/ML engineer based in Madrid, Spain.</p>

              <PropellerHatModel paused={isBlogOpen} />
              <div className="buttons-container">
              <div className="section-buttons">
                <Link to="/about" className="sectionButton" onClick={() => playClick()}>
                  <IconLucideUser className="button-icon" />
                  <span>About Me</span>
                </Link>
                <Link to="/experience" className="sectionButton" onClick={() => playClick()}>
                  <IconLucideBriefcase className="button-icon" />
                  <span>Experience</span>
                </Link>
                <Link to="/projects" className="sectionButton" onClick={() => playClick()}>
                  <IconLucideFolderOpen className="button-icon" />
                  <span>Projects</span>
                </Link>
                <Link
                  to="/blog"
                  className="sectionButton"
                  onMouseEnter={preloadBlog}
                  onFocus={preloadBlog}
                  onTouchStart={preloadBlog}
                  onClick={() => playClick()}
                >
                  <IconLucideNotebookPen className="button-icon" />
                  <span>Blog</span>
                </Link>
              </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </IntroWindow>
    </div>
  );
}
