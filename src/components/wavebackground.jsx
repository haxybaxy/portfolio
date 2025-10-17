import Wave from 'react-wavify';
import '../styles/wavebackground.css';
import { useTheme } from '../context/ThemeContext';

export default function WaveBackground() {
  const { theme } = useTheme();

  // Define colors based on theme
  const waveColor1 = theme === 'light' ? 'url(#waveGradientLight)' : 'url(#waveGradientDark)';
  const waveColor2 = theme === 'light' ? 'url(#waveGradientLight)' : 'url(#waveGradientDark)';

  // Pause waves in light mode
  const isPaused = theme === 'light';

  return (
    <div className="wave-container">
      {/* SVG gradient definitions */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {/* Light mode gradient - green meadow */}
          <linearGradient id="waveGradientLight" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1e8e00" />
            <stop offset="35%" stopColor="#3cb521" />
            <stop offset="70%" stopColor="#6cd43f" />
            <stop offset="100%" stopColor="#9ce86f" />
          </linearGradient>

          {/* Dark mode gradient - deep blue ocean */}
          <linearGradient id="waveGradientDark" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#001f3f" />
            <stop offset="35%" stopColor="#003d7a" />
            <stop offset="70%" stopColor="#0074d9" />
            <stop offset="100%" stopColor="#4da6ff" />
          </linearGradient>
        </defs>
      </svg>

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
