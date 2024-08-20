import React from "react";
import Window from "./window"; // Import the Window component
import "../styles/aboutme.css"; // Assuming this file contains styles specific to the about me content
import FadeInSection from "./fadeinsection"; // Import the Fadein component
import { GitHub, LinkedIn, Article } from "@mui/icons-material";

const skills = [
  { name: "Python", icon: "/public/python.svg" },
  { name: "C", icon: "/public/c.svg" },
  { name: "C#", icon: "/public/csharp.svg" },
  { name: "JavaScript", icon: "/public/javascript.svg" },
  { name: "TypeScript", icon: "/public/typescript.svg" },
  { name: "React", icon: "/public/react.svg" },
  { name: "Node.js", icon: "/public/nodejs.svg" },
  { name: "Express.js", icon: "/public/express.svg" },
  { name: "MySQL", icon: "/public/mysql.svg" },
  { name: "PostgreSQL", icon: "/public/postgresql.svg" },
  { name: "MongoDB", icon: "/public/mongodb.svg" },
  { name: "Azure", icon: "/public/azure.svg" },
  { name: "AWS", icon: "/public/aws.svg" },
  { name: "Firebase", icon: "/public/firebase.svg" },
  { name: "Linux", icon: "/public/linux.svg" },
  { name: "Docker", icon: "/public/docker.svg" },
  { name: "GH Actions", icon: "/public/github.svg" },
  { name: "SK-Learn", icon: "/public/scikitlearn.svg" },
  { name: "HuggingFace", icon: "/public/huggingface.svg" },
  { name: "Langchain", icon: "/public/langchain.svg" },
  { name: "PyTorch", icon: "/public/pytorch.svg" },
  { name: "TensorFlow", icon: "/public/tensorflow.svg" },
  { name: "OpenCV", icon: "/public/opencv.svg" },
  { name: "ROS", icon: "/public/ros.svg" },
  { name: "Git", icon: "/public/git.svg" },
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
          <img src="../../public/myphoto.jpeg" alt="My Photo" className="myphoto"/>
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
