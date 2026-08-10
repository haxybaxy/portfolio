import Window from "./window";
import VerticalTabs from "./verticaltabs";

interface ExperienceProps {
  onClose: () => void;
  activeTab: string;
  onActiveTabChange: (value: string) => void;
  onOpenProject: (index: number) => void;
}

export default function Experience({ onClose, activeTab, onActiveTabChange, onOpenProject }: ExperienceProps) {

  return (
    <Window title="experience" id="experience" filename="experience - nvim" onClose={onClose}>
    <VerticalTabs activeTab={activeTab} onActiveTabChange={onActiveTabChange} onOpenProject={onOpenProject} />
    </Window>
  );
}
