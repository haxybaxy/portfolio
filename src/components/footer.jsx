import { Mail, Github, Linkedin } from 'lucide-react';
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="socialIcons">
        <a href="mailto:zaidksaheb@gmail.com" className="socialLink" aria-label="Email">
          <Mail size={24} />
        </a>
        <a href="https://github.com/haxybaxy" target="_blank" rel="noopener noreferrer" className="socialLink" aria-label="GitHub">
          <Github size={24} />
        </a>
        <a href="https://www.linkedin.com/in/zaidalsaheb" target="_blank" rel="noopener noreferrer" className="socialLink" aria-label="LinkedIn">
          <Linkedin size={24} />
        </a>
      </div>
    </footer>
  );
}
