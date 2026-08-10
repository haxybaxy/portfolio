import { useState } from "react";
import Window from "./window";
import ProjectGrid from "./projectgrid";
import ProjectDetail from "./projectdetail";
import Tmux from "./tmux";
import "../styles/projects.css";

interface ProjectsProps {
  onClose: () => void;
}

export default function Projects({ onClose }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleSelectProject = (index: number) => {
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
