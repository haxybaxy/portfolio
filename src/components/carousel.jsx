import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { projectsData } from "./projectsData";
import "../styles/carousel.css";
import Tmux from "./tmux";
import GitHubIcon from '@mui/icons-material/GitHub'; // Import GitHub icon

export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
    className={`${className} custom-arrow`}
      style={{
        ...style,
        display: "block",
        background: "none", // Remove default background
        right: "10px", // Adjust position
        zIndex: 2, // Ensure it appears on top of the image
        width: "40px", // Adjust width
        height: "40px", // Adjust height
      }}
      onClick={onClick}
    >
    </div>
  );
}

export function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
    className={`${className} custom-arrow`}
      style={{
        ...style,
        display: "block",
        background: "none", // Remove default background
        left: "10px", // Adjust position
        zIndex: 2, // Ensure it appears on top of the image
        width: "40px", // Adjust width
        height: "40px", // Adjust height
      }}
      onClick={onClick}
    >
    </div>
  );
}

export default function ProjectsSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current) => setActiveSlide(current),
    centerMode: true, // Enable center mode to ensure slides are centered with visible gaps
    centerPadding: "10px", // Adjust the padding around the center slide
  };

  return (
    <div className="projects-slider">
      <Slider {...settings}>
        {projectsData.map((project, index) => (
          <div key={index} className="slide">
            <img src={project.imageUrl} alt={project.title} className="slide-image" />
            <div className="text-overlay">
              <h2 className="projectTitle">{project.title}</h2>
              <p className="projectDesc">{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                <GitHubIcon fontSize="large" style={{ color: "white" }} />
              </a>
            </div>
          </div>
        ))}
      </Slider>
      <Tmux activeSlide={activeSlide} />
    </div>
  );
}
