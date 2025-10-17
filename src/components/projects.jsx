import Window from "./window";
import CarouselGallery from "./carousel";
import "../styles/projects.css";

export default function Projects({ onClose }) {
  return (
    <Window title="projects" id="projects" filename="projects - tmux" headerstyle={{ position: 'absolute',zIndex: 20,top: '70px' }} onClose={onClose}>
    <div className="projects">
      <CarouselGallery />
    </div>
    </Window>
  );
}