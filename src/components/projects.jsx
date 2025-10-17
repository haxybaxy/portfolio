import { useState } from "react";
import Window from "./window";
import ProjectGrid from "./projectgrid";
import ProjectDetail from "./projectdetail";
import Tmux from "./tmux";
import "../styles/projects.css";

export default function Projects({ onClose }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelectProject = (index) => {
    setSelectedProject(index);
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  return (
    <Window
      title="projects"
      id="projects"
      filename="projects - tmux"
      onClose={onClose}
      bottomBar={<Tmux selectedProject={selectedProject} />}
      hideTitle={selectedProject !== null}
    >
      <div className={`projects ${selectedProject === null ? 'grid-view' : 'detail-view'}`}>
        {selectedProject === null ? (
          <ProjectGrid onSelectProject={handleSelectProject} />
        ) : (
          <ProjectDetail projectIndex={selectedProject} onBack={handleBack} />
        )}
      </div>
    </Window>
  );
}