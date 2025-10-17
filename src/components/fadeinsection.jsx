import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../styles/fadein.css'; // Make sure this path points to your CSS file

export default function FadeInSection({ children, onVisible, delay, style={}, isClosing=false }) {

  const combinedStyle = {
    height: '100%', // Default height
    transitionDelay: `${delay}`,
    ...style, // Override default styles with any provided inline styles
  };

  // Lower threshold for mobile devices to ensure animations trigger
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: isMobile ? 0.05 : 0.2, // Lower threshold on mobile (5% vs 20%)
  });

  React.useEffect(() => {
    if (inView && onVisible) {
      onVisible(); // Trigger the callback when the element is visible
    }
  }, [inView, onVisible]);

  return (
    <div ref={ref} className={`fade-in-section ${inView ? 'is-visible' : ''} ${isClosing ? 'is-closing' : ''}`} style={combinedStyle}>
      {children}
    </div>
  );
}
