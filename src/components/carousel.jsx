import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { projectsData } from "./projectsData";
import "../styles/carousel.css";
import Tmux from "./tmux";

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
    afterChange: (current) => {
      console.log("Active slide index:", current); // Debugging: Check the active slide index
      setActiveSlide(current);
    },
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <Slider {...settings} className="slider">
        {projectsData.map((project, index) => (
          <div key={index} className="slide">
            <img src={project.imageUrl} alt={project.title} className="slide-image" />
            <div className="text-overlay">
              <h2 className="projectTitle">{project.title}</h2>
              <p className="projectDesc">{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                View Project
              </a>
            </div>
          </div>
        ))}
      </Slider>
      <Tmux activeSlide={activeSlide} />
    </>
  );
}
