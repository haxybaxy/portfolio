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

/*
 * These are <Link>s rather than <button>s so they render as real anchors: a
 * crawler can follow them to /blog, and cmd-click / middle-click / "copy link"
 * behave the way they should. .sectionButton already sets text-decoration and
 * color, so they look identical to the buttons they replaced.
 */
export default function Intro() {
  const [playClick] = useSound('/sounds/toc-click.wav', { volume: 0.5 });
  return (
    <div className="intro-container" id="intro">
      <IntroWindow
        filename="zaidalsaheb - fastfetch"
        id="intro-window"
      >
        <div id="title">
          <h1 className="greeting-text"><span className="wave-emoji">👋</span> Hello! I am <span className="purpletext">Zaid </span><span className="wave-emoji">👋</span></h1>
          <FadeInSection delay={'1000ms'}>
            <div className="intro-fadein-content">
              <p className="caption">Full-stack software developer and AI/ML engineer based in Madrid, Spain.</p>

              <PropellerHatModel />
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
                <Link to="/blog" className="sectionButton" onClick={() => playClick()}>
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
