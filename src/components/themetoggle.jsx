import { useTheme } from "../context/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "../styles/themetoggle.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-fixed" onClick={toggleTheme}>
      {theme === 'light' ? (
        <DarkModeIcon style={{ fontSize: 24 }} />
      ) : (
        <LightModeIcon style={{ fontSize: 24 }} />
      )}
    </div>
  );
}
