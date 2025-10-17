import Wave from 'react-wavify';
import '../styles/wavebackground.css';
import { useTheme } from '../context/ThemeContext';

export default function WaveBackground() {
  const { theme } = useTheme();

  // Define colors based on theme
  const waveColor1 = theme === 'light' ? 'hsl(130, 60%, 45%)' : 'hsla(195, 71%, 47%, 1)';
  const waveColor2 = theme === 'light' ? 'hsl(130, 60%, 45%)' : 'hsla(195, 46%, 57%, 1)';

  // Pause waves in light mode
  const isPaused = theme === 'light';

  return (
    <div className="wave-container">
      {/* Base fill - color managed via CSS variables */}
      <div className="wave-base" />

      {/* Animated waves */}
      <Wave
        fill={waveColor1}
        paused={isPaused}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '40vh',
          zIndex: 2
        }}
        options={{
          height: 40,
          amplitude: 60,
          speed: 0.15,
          points: 3
        }}
      />
      <Wave
        fill={waveColor2}
        paused={isPaused}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '30vh',
          zIndex: 1
        }}
        options={{
          height: 50,
          amplitude: 50,
          speed: 0.2,
          points: 4
        }}
      />
    </div>
  );
}
