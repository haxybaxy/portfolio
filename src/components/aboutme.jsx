import React from "react";
import Window from "./window"; // Import the Window component
import "../styles/aboutme.css"; // Assuming this file contains styles specific to the about me content
import FadeInSection from "./fadeinsection"; // Import the Fadein component
import { GitHub, LinkedIn, Article } from "@mui/icons-material";

const skills = [
  { name: "Python", icon: "python.svg" },
  { name: "C", icon: "c.svg" },
  { name: "C#", icon: "csharp.svg" },
  { name: "JavaScript", icon: "javascript.svg" },
  { name: "TypeScript", icon: "typescript.svg" },
  { name: "React", icon: "react.svg" },
  { name: "Node.js", icon: "nodejs.svg" },
  { name: "Express.js", icon: "express.svg" },
  { name: "MySQL", icon: "mysql.svg" },
  { name: "PostgreSQL", icon: "postgresql.svg" },
  { name: "MongoDB", icon: "mongodb.svg" },
  { name: "Azure", icon: "azure.svg" },
  { name: "AWS", icon: "aws.svg" },
  { name: "Firebase", icon: "firebase.svg" },
  { name: "Linux", icon: "linux.svg" },
  { name: "Docker", icon: "docker.svg" },
  { name: "GH Actions", icon: "github.svg" },
  { name: "SK-Learn", icon: "scikitlearn.svg" },
  { name: "HuggingFace", icon: "huggingface.svg" },
  { name: "Langchain", icon: "langchain.svg" },
  { name: "PyTorch", icon: "pytorch.svg" },
  { name: "TensorFlow", icon: "tensorflow.svg" },
  { name: "OpenCV", icon: "opencv.svg" },
  { name: "ROS", icon: "ros.svg" },
  { name: "Git", icon: "git.svg" },
];


export default function AboutMe() {
  return (
    <Window title="about me" id="aboutme" filename="zaidalsaheb - fastfetch">
      <div className="aboutMeContainer">
        <div className="textContainer">
          <p>
            I am currently an <span className="purpleText boldText">undergrad student at IE University</span>, pursuing a bachelors degree in <span className="purpleText boldText">Computer Science and Artificial Intelligence</span>. I am very passionate about <span className="boldText">technology</span> and all of its <span className="boldText">interconnected facets</span>, which drives me to learn about <span className="boldText">anything and everything</span>.
          </p>

          <p>
            Here are some of the technologies that I've worked with:
          </p>
          <FadeInSection delay={'1000ms'}>
          <ul className="skillsList">
          {skills.map((skill, index) => (
                <li key={index} className="skillItem">
                  <img src={skill.icon} alt={`${skill.name} icon`} className="skillIcon" />
                  {skill.name}
                </li>
              ))}
          </ul>
          </FadeInSection>
          <p></p>
        </div>
        <div className="imgAndSocials">
        <div className="tape"></div>
          <img src="myphoto.jpeg" alt="My Photo" className="myphoto"/>
          <p className="photoCaption">You can also check out my socials here:</p>
          <div className="socialIcons">
                <a href="https://github.com/haxybaxy" target="_blank" rel="noopener noreferrer">
                  <GitHub fontSize="large" className="socialIcon"/>
                </a>
                <a href="www.linkedin.com/in/zaid-saheb" target="_blank" rel="noopener noreferrer">
                  <LinkedIn fontSize="large" className="socialIcon"/>
                </a>
                <a href="https://medium.com/@haxybaxy" target="_blank" rel="noopener noreferrer">
                  <Article fontSize="large" className="socialIcon"/>
                </a>
          </div>
        </div>

      </div>
    </Window>
  );
}
