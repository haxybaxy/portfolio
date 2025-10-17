import { projectsData } from "./projectsData";
import "../styles/projectgrid.css";

export default function ProjectGrid({ onSelectProject }) {
  return (
    <div className="project-grid-container">
      <div className="project-grid">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="project-thumbnail"
            onClick={() => onSelectProject(index)}
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
  );
}
