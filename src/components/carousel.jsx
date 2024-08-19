import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { projectsData } from "./projectsData"; // Import the projects data
import "../styles/carousel.css"; // Custom styles

export default function ProjectsSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Show navigation arrows
  };

  return (
    <div className="projects-slider">
      <Slider {...settings}>
        {projectsData.map((project, index) => (
          <div key={index} className="slide">
            <img src={project.imageUrl} alt={project.title} className="slide-image" />
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
              View Project
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}
