import Window from "./window";
import ProjectGrid from "./projectgrid";
import ProjectDetail from "./projectdetail";
import Tmux from "./tmux";
import "../styles/projects.css";

interface ProjectsProps {
  onClose: () => void;
  selectedProject: number | null;
  onSelectProject: (index: number | null) => void;
  onOpenJob: (value: string) => void;
}

export default function Projects({ onClose, selectedProject, onSelectProject, onOpenJob }: ProjectsProps) {
  const handleSelectProject = (index: number) => {
    onSelectProject(index);
  };

  const handleBack = () => {
    onSelectProject(null);
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
          <ProjectDetail projectIndex={selectedProject} onBack={handleBack} onOpenJob={onOpenJob} />
        )}
      </div>
    </Window>
  );
}
