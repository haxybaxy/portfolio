import { projectsData } from "./projectsData";
import "../styles/projectdetail.css";
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ProjectDetail({ projectIndex, onBack }) {
  const project = projectsData[projectIndex];

  return (
    <div className="project-detail-container">
      <button className="back-button" onClick={onBack}>
        <ArrowBackIcon /> Back to Projects
      </button>
      <div className="project-detail">
        <img src={project.imageUrl} alt={project.title} className="detail-image" />
        <div className="detail-overlay">
          <div className="titlediv">
            <h2 className="projectTitle">{project.title}</h2>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
              <GitHubIcon fontSize="large" style={{ color: "white" }} />
            </a>
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
