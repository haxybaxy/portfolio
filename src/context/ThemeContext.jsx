import { createContext, useState, useEffect, useContext } from 'react';
import useSound from 'use-sound';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage on initial load
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark'; // Default to dark theme
  });

  // Sound effects for theme switching
  const [playDarkModeSound] = useSound('/sounds/cricket.wav', { volume: 0.5 });
  const [playLightModeSound] = useSound('/sounds/magic.wav', { volume: 0.5 });

  useEffect(() => {
    // Update data-theme attribute on document element
    document.documentElement.setAttribute('data-theme', theme);

    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';

      // Play sound based on the new theme
      if (newTheme === 'dark') {
        playDarkModeSound();
      } else {
        playLightModeSound();
      }

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
