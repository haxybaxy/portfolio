import { useTheme } from '../context/ThemeContext';
import Stars from './stars';
import Clouds from './clouds';

export default function BackgroundEffects() {
  const { theme } = useTheme();

  return (
    <>
      {theme === 'dark' ? <Stars /> : <Clouds />}
    </>
  );
}
