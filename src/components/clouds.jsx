import { useEffect, useRef } from 'react';
import '../styles/clouds.css';

export default function Clouds() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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

        // Fixed circle positions and sizes (calculated once)
        this.circles = [];
        const numCircles = 5;

        // Bottom arc circles
        for (let i = 0; i < numCircles; i++) {
          this.circles.push({
            offsetX: (i * this.width) / (numCircles - 1),
            offsetY: Math.sin((i / (numCircles - 1)) * Math.PI) * this.height * 0.3,
            radius: this.height * 0.4
          });
        }

        // Top puff circles (2-3 circles on top)
        const topCircles = 3;
        for (let i = 0; i < topCircles; i++) {
          this.circles.push({
            offsetX: this.width * 0.25 + (i * this.width * 0.3),
            offsetY: -this.height * 0.2,
            radius: this.height * 0.35
          });
        }
      }

      draw() {
        ctx.fillStyle = 'white';

        // Draw cloud using fixed circles
        this.circles.forEach(circle => {
          ctx.beginPath();
          ctx.arc(this.x + circle.offsetX, this.y + circle.offsetY, circle.radius, 0, Math.PI * 2);
          ctx.fill();
        });
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

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="clouds-canvas" />;
}
