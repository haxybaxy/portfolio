import { projectsData } from "./projectsData";
import "../styles/projectdetail.css";
import { Github, Link, ArrowLeft } from 'lucide-react';

export default function ProjectDetail({ projectIndex, onBack }) {
  const project = projectsData[projectIndex];

  return (
    <div className="project-detail-container">
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={24} /> Back to Projects
      </button>
      <div className="project-detail">
        <img src={project.imageUrl} alt={project.title} className="detail-image" />
        <div className="detail-overlay">
          <div className="titlediv">
            <h2 className="projectTitle">{project.title}</h2>
            <div className="project-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                  <Github size={32} color="white" />
                </a>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  <Link size={32} color="white" />
                </a>
              )}
            </div>
          </div>
          <p className="projectDesc">{project.description}</p>
          <div className="projectIcons">
            <div className="iconContainer">
              {Object.entries(project.icons).map(([name, iconUrl], iconIndex) => (
                <div key={iconIndex} className="iconWithName">
                  <img src={iconUrl} alt={name} title={name} className="projectIcon" />
                  <span className="icon-name">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
