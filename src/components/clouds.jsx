import { useEffect, useRef } from 'react';
import '../styles/clouds.css';

export default function Clouds() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Load cloud image
    const cloudImage = new Image();
    cloudImage.src = '/cloud.png';

    // Set canvas size with high DPI support
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cloud configuration
    class Cloud {
      constructor() {
        this.x = Math.random() * (canvas.width + 400) - 200;
        this.y = Math.random() * canvas.height * 0.7;
        this.width = Math.random() * 150 + 100;
        this.height = this.width * 0.6;
        this.speed = Math.random() * 0.3 + 0.2;
        this.opacity = Math.random() * 0.3 + 0.7; // Random opacity between 0.7 and 1
      }

      draw() {
        if (!cloudImage.complete) return;

        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(cloudImage, this.x, this.y, this.width, this.height);
        ctx.restore();
      }

      update() {
        this.x += this.speed;

        // Wrap around
        if (this.x > canvas.width + 200) {
          this.x = -200;
          this.y = Math.random() * canvas.height * 0.7;
        }
      }
    }

    // Create clouds
    const clouds = [];
    const cloudCount = 8;
    for (let i = 0; i < cloudCount; i++) {
      clouds.push(new Cloud());
    }

    // Animation loop
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      clouds.forEach((cloud) => {
        cloud.update();
        cloud.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation after image loads
    cloudImage.onload = () => {
      animate();
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="clouds-canvas" />;
}
