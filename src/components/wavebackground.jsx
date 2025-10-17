import Wave from 'react-wavify';
import '../styles/wavebackground.css';

export default function WaveBackground() {
  return (
    <div className="wave-container">
      {/* Base purple fill */}
      <div className="wave-base" />

      {/* Animated waves */}
      <Wave
        fill="hsla(295, 71%, 67%, 1)"
        paused={false}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '60vh',
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
        fill="hsla(295, 46%, 57%, 1)"
        paused={false}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50vh',
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
