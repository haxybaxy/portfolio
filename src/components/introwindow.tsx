import type { ReactNode } from "react";
import "../styles/introwindow.css";
import FadeInSection from "./fadeinsection";

interface IntroWindowProps {
  children: ReactNode;
  id?: string;
  filename: string;
}

export default function IntroWindow({ children, id, filename }: IntroWindowProps) {
  return (
    <FadeInSection style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
      <div className="intro-window" id={id}>
        <div className="intro-window-header">
          <div className="intro-filename">
            <img src="/folder.svg" alt="folder" className="folderIcon" />
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
