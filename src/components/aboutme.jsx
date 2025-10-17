import Window from "./window"; // Import the Window component
import "../styles/aboutme.css"; // Assuming this file contains styles specific to the about me content
import FadeInSection from "./fadeinsection"; // Import the Fadein component
import { GitHub, LinkedIn } from "@mui/icons-material";

const skills = [
  { name: "Python", icon: "/icons/python.svg" },
  { name: "C", icon: "/icons/c.svg" },
  { name: "C#", icon: "/icons/csharp.svg" },
  { name: "C++", icon: "/icons/cpp.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "React", icon: "/icons/react.svg" },
  { name: "React Native", icon: "/icons/react.svg" },
  { name: "Expo", icon: "/icons/expo.svg" },
  { name: "Next.js", icon: "/icons/nextjs.svg" },
  { name: "NestJS", icon: "/icons/nestjs.svg" },
  { name: "Node.js", icon: "/icons/nodejs.svg" },
  { name: "Express.js", icon: "/icons/express.svg" },
  { name: "MySQL", icon: "/icons/mysql.svg" },
  { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
  { name: "MongoDB", icon: "/icons/mongodb.svg" },
  { name: "Azure", icon: "/icons/azure.svg" },
  { name: "AWS", icon: "/icons/aws.svg" },
  { name: "Firebase", icon: "/icons/firebase.svg" },
  { name: "Linux", icon: "/icons/linux.svg" },
  { name: "Docker", icon: "/icons/docker.svg" },
  { name: "GH Actions", icon: "/icons/github.svg" },
  { name: "SK-Learn", icon: "/icons/scikitlearn.svg" },
  { name: "HF", icon: "/icons/huggingface.svg" },
  { name: "Langchain", icon: "/icons/langchain.svg" },
  { name: "Langgraph", icon: "/icons/langgraph.svg" },
  { name: "PyTorch", icon: "/icons/pytorch.svg" },
  { name: "TensorFlow", icon: "/icons/tensorflow.svg" },
  { name: "OpenCV", icon: "/icons/opencv.svg" },
  { name: "ROS", icon: "/icons/ros.svg" },
  { name: "Git", icon: "/icons/git.svg" },
];


export default function AboutMe({ onClose }) {
  return (
    <Window title="about me" id="aboutme" filename="zaidalsaheb - whoami" onClose={onClose}>
      <div className="aboutMeContainer">
        <div className="textContainer">
          <p>
            I am currently an <span className="purpleText boldText">undergrad student at IE University</span>, pursuing a bachelors degree in <span className="purpleText boldText">Computer Science and Artificial Intelligence</span>. I am very passionate about <span className="boldText">technology</span> and all of its <span className="boldText">interconnected facets</span>, which drives me to learn about <span className="boldText">anything and everything</span>.
          </p>

          <p>
            Here are some of the technologies that I&apos;ve worked with:
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
                <a href="https://www.linkedin.com/in/zaid-saheb" target="_blank" rel="noopener noreferrer">
                  <LinkedIn fontSize="large" className="socialIcon"/>
                </a>
          </div>
        </div>

      </div>
    </Window>
  );
}
