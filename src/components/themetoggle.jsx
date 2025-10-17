import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from 'lucide-react';
import "../styles/themetoggle.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-fixed" onClick={toggleTheme}>
      {theme === 'light' ? (
        <Sun size={40} className="sun-icon" />
      ) : (
        <Moon size={40} />
      )}
    </div>
  );
}
