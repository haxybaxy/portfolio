import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../styles/fadein.css'; // Make sure this path points to your CSS file

export default function FadeInSection({ children, onVisible, delay }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  React.useEffect(() => {
    if (inView && onVisible) {
      onVisible(); // Trigger the callback when the element is visible
    }
  }, [inView, onVisible]);

  return (
    <div ref={ref} className={`fade-in-section ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: `${delay}` }}>
      {children}
    </div>
  );
}
