import PropellerHatModel from "./propellerhat";
import IntroWindow from "./introwindow";
import FadeInSection from "./fadeinsection";
import "../styles/intro.css";
import IconLucideUser from '~icons/lucide/user';
import IconLucideBriefcase from '~icons/lucide/briefcase';
import IconLucideFolderOpen from '~icons/lucide/folder-open';
import useSound from 'use-sound';

export default function Intro({ onOpenSection }) {
  const [playClick] = useSound('/sounds/toc-click.wav', { volume: 0.5 });
  return (
    <div className="intro-container" id="intro">
      <IntroWindow
        filename="zaidalsaheb - fastfetch"
        id="intro-window"
      >
        <PropellerHatModel />
        <div id="title">
          <h1 className="greeting-text"><span className="wave-emoji">👋</span> Hello! I am <span className="purpletext">Zaid</span>. <span className="wave-emoji">👋</span></h1>
          <FadeInSection delay={'1000ms'}>
            <p className="caption">Full-stack software developer and AI/ML engineer based in Madrid, Spain.</p>

            <div className="buttons-container">
              <div className="section-buttons">
                <button
                  className="sectionButton"
                  onClick={() => {
                    playClick();
                    onOpenSection('about');
                  }}
                >
                  <IconLucideUser className="button-icon" />
                  <span>About Me</span>
                </button>
                <button
                  className="sectionButton"
                  onClick={() => {
                    playClick();
                    onOpenSection('experience');
                  }}
                >
                  <IconLucideBriefcase className="button-icon" />
                  <span>Experience</span>
                </button>
                <button
                  className="sectionButton"
                  onClick={() => {
                    playClick();
                    onOpenSection('projects');
                  }}
                >
                  <IconLucideFolderOpen className="button-icon" />
                  <span>Projects</span>
                </button>
              </div>
            </div>
          </FadeInSection>
        </div>
      </IntroWindow>
    </div>
  );
}
