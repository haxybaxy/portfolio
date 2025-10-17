import { projectsData } from "./projectsData";
import "../styles/projectgrid.css";
import useSound from 'use-sound';

export default function ProjectGrid({ onSelectProject }) {
  const [playClick] = useSound('/sounds/toc-click.wav', { volume: 0.5 });

  // Group projects by category
  const projectsByCategory = projectsData.reduce((acc, project, index) => {
    const category = project.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ ...project, originalIndex: index });
    return acc;
  }, {});

  const handleSelectProject = (index) => {
    playClick();
    onSelectProject(index);
  };

  return (
    <div className="project-grid-container">
      {Object.entries(projectsByCategory).map(([category, projects]) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <div
                key={project.originalIndex}
                className="project-thumbnail"
                onClick={() => handleSelectProject(project.originalIndex)}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="thumbnail-image"
                />
                <div className="thumbnail-overlay">
                  <h3 className="thumbnail-title">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
