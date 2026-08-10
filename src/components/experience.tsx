import Window from "./window";
import VerticalTabs from "./verticaltabs";

interface ExperienceProps {
  onClose: () => void;
}

export default function Experience({ onClose }: ExperienceProps) {

  return (
    <Window title="experience" id="experience" filename="experience - nvim" onClose={onClose}>
    <VerticalTabs />
    </Window>
  );
}
