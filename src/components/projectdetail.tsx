import { projectsData } from "./projectsData";
import { getRelatedJobs } from "./relatedWork";
import "../styles/projectdetail.css";
import { Github, Link, ArrowLeft, ArrowRight, Briefcase } from 'lucide-react';
import useSound from 'use-sound';

interface ProjectDetailProps {
  projectIndex: number;
  onBack: () => void;
  onOpenJob: (value: string) => void;
}

export default function ProjectDetail({ projectIndex, onBack, onOpenJob }: ProjectDetailProps) {
  const project = projectsData[projectIndex];
  const relatedJobs = getRelatedJobs(project.title);
  const [playClick] = useSound('/sounds/toc-click.wav', { volume: 0.5 });

  const handleBack = () => {
    playClick();
    onBack();
  };

  const handleOpenJob = (value: string) => {
    playClick();
    onOpenJob(value);
  };

  return (
    <div className="project-detail-container">
      <button className="back-button" onClick={handleBack}>
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
          {relatedJobs.length > 0 && (
            <div className="related-experience">
              {relatedJobs.map((job) => (
                <button
                  key={job.value}
                  className="related-experience-link"
                  onClick={() => handleOpenJob(job.value)}
                >
                  <Briefcase size={16} />
                  <span>Built at: {job.company}</span>
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>
          )}
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
