import React from "react";
import Window from "./window"; // Import the Window component
import "../styles/aboutme.css"; // Assuming this file contains styles specific to the about me content
import FadeInSection from "./fadeinsection"; // Import the Fadein component
import { GitHub, LinkedIn, Article } from "@mui/icons-material";

const skills = [
  { name: "Python", icon: "../../public/icons/python.svg" },
  { name: "C", icon: "../../public/icons/c.svg" },
  { name: "C#", icon: "../../public/icons/csharp.svg" },
  { name: "JavaScript", icon: "../../public/icons/javascript.svg" },
  { name: "TypeScript", icon: "../../public/icons/typescript.svg" },
  { name: "React", icon: "../../public/icons/react.svg" },
  { name: "Node.js", icon: "../../public/icons/nodejs.svg" },
  { name: "Express.js", icon: "../../public/icons/express.svg" },
  { name: "MySQL", icon: "../../public/icons/mysql.svg" },
  { name: "PostgreSQL", icon: "../../public/icons/postgresql.svg" },
  { name: "MongoDB", icon: "../../public/icons/mongodb.svg" },
  { name: "Azure", icon: "../../public/icons/azure.svg" },
  { name: "AWS", icon: "../../public/icons/aws.svg" },
  { name: "Firebase", icon: "../../public/icons/firebase.svg" },
  { name: "Linux", icon: "../../public/icons/linux.svg" },
  { name: "Docker", icon: "../../public/icons/docker.svg" },
  { name: "GH Actions", icon: "../../public/icons/github.svg" },
  { name: "SK-Learn", icon: "../../public/icons/scikitlearn.svg" },
  { name: "HuggingFace", icon: "../../public/icons/huggingface.svg" },
  { name: "Langchain", icon: "../../public/icons/langchain.svg" },
  { name: "PyTorch", icon: "../../public/icons/pytorch.svg" },
  { name: "TensorFlow", icon: "../../public/icons/tensorflow.svg" },
  { name: "OpenCV", icon: "../../public/icons/opencv.svg" },
  { name: "ROS", icon: "../../public/icons/ros.svg" },
  { name: "Git", icon: "../../public/icons/git.svg" },
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
                <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
                  <GitHub fontSize="large" className="socialIcon"/>
                </a>
                <a href="https://www.linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer">
                  <LinkedIn fontSize="large" className="socialIcon"/>
                </a>
                <a href="https://medium.com/@yourmedium" target="_blank" rel="noopener noreferrer">
                  <Article fontSize="large" className="socialIcon"/>
                </a>
          </div>
        </div>

      </div>
    </Window>
  );
}
