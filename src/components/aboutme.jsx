import Window from "./window"; // Import the Window component
import "../styles/aboutme.css"; // Assuming this file contains styles specific to the about me content
import FadeInSection from "./fadeinsection"; // Import the Fadein component
import { GitHub, LinkedIn } from "@mui/icons-material";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: "/icons/python.svg" },
      { name: "JavaScript", icon: "/icons/javascript.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "C", icon: "/icons/c.svg" },
      { name: "C++", icon: "/icons/cpp.svg" },
      { name: "C#", icon: "/icons/csharp.svg" },
    ]
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "React Native", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "Express.js", icon: "/icons/express.svg" },
      { name: "NestJS", icon: "/icons/nestjs.svg" },
      { name: "Expo", icon: "/icons/expo.svg" },
      { name: "Django", icon: "/icons/django.svg" },
      { name: "FastAPI", icon: "/icons/fastapi.svg" },
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", icon: "/icons/mysql.svg" },
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "MongoDB", icon: "/icons/mongodb.svg" },
      { name: "SQLite", icon: "/icons/sqlite.svg" },
    ]
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "Azure", icon: "/icons/azure.svg" },
      { name: "AWS", icon: "/icons/aws.svg" },
      { name: "Firebase", icon: "/icons/firebase.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "Linux", icon: "/icons/linux.svg" },
      { name: "GH Actions", icon: "/icons/github.svg" },
      { name: "DigitalOcean", icon: "/icons/digitalocean.svg" },
      { name: "Git", icon: "/icons/git.svg" },
    ]
  },
  {
    title: "AI & ML",
    skills: [
      { name: "PyTorch", icon: "/icons/pytorch.svg" },
      { name: "TensorFlow", icon: "/icons/tensorflow.svg" },
      { name: "SK-Learn", icon: "/icons/scikitlearn.svg" },
      { name: "Hugging Face", icon: "/icons/huggingface.svg" },
      { name: "Langchain", icon: "/icons/langchain.svg" },
      { name: "Langgraph", icon: "/icons/langgraph.svg" },
      { name: "OpenCV", icon: "/icons/opencv.svg" },
      { name: "ROS", icon: "/icons/ros.svg" },
    ]
  },
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
            <div className="skillsContainer">
              {skillCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="skillCategory">
                  <h3 className="categoryTitle">{category.title}</h3>
                  <ul className="skillsList">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="skillItem">
                        <span className="skillName">{skill.name}</span>
                        <img src={skill.icon} alt={`${skill.name} icon`} className="skillIcon" />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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
