import "../styles/introwindow.css";
import FadeInSection from "./fadeinsection";

export default function IntroWindow({ children, id, filename }) {
  return (
    <FadeInSection style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
      <div className="intro-window" id={id}>
        <div className="intro-window-header">
          <div className="intro-filename">
            <img src="folder.svg" alt="folder" className="folderIcon" />
            <span>{filename}</span>
          </div>
        </div>
        <div className="intro-content-container">
          <FadeInSection delay={'900ms'}>
            {children}
          </FadeInSection>
        </div>
      </div>
    </FadeInSection>
  );
}
