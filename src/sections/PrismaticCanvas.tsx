import { useEffect, useRef } from 'react';

const colors = [
  { r: 245, g: 158, b: 11 },
  { r: 251, g: 191, b: 36 },
  { r: 180, g: 83, b: 9 },
  { r: 69, g: 10, b: 10 },
  { r: 20, g: 184, b: 166 },
  { r: 99, g: 102, b: 241 },
  { r: 59, g: 130, b: 246 },
  { r: 16, g: 185, b: 129 },
  { r: 245, g: 158, b: 11 },
  { r: 139, g: 92, b: 246 },
  { r: 236, g: 72, b: 153 },
  { r: 20, g: 184, b: 166 },
];

const NUM_GRADIENTS = 6;

interface Gradient {
  x: number;
  y: number;
  radius: number;
  colorIndex: number;
  speedX: number;
  speedY: number;
  phase: number;
  rotationSpeed: number;
  angle: number;
  ellipticity: number;
}

function createGradient(w: number, h: number): Gradient {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.max(w, h) * (0.4 + Math.random() * 0.3),
    colorIndex: Math.floor(Math.random() * colors.length),
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
    phase: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.001,
    angle: Math.random() * Math.PI * 2,
    ellipticity: 0.6 + Math.random() * 0.4,
  };
}

export default function PrismaticCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId = 0;
    const gradients: Gradient[] = [];

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }

    function init() {
      resize();
      gradients.length = 0;
      for (let i = 0; i < NUM_GRADIENTS; i++) {
        gradients.push(createGradient(width, height));
      }
    }

    function update(g: Gradient) {
      g.x += g.speedX;
      g.y += g.speedY;
      g.phase += 0.005;
      g.angle += g.rotationSpeed;

      if (g.x < -g.radius) g.x = width + g.radius;
      if (g.x > width + g.radius) g.x = -g.radius;
      if (g.y < -g.radius) g.y = height + g.radius;
      if (g.y > height + g.radius) g.y = -g.radius;
    }

    function draw(g: Gradient) {
      const c1 = colors[g.colorIndex];
      const c2 = colors[(g.colorIndex + 1) % colors.length];
      const t = (Math.sin(g.phase) + 1) * 0.5;
      const r = Math.round(c1.r + (c2.r - c1.r) * t);
      const gr = Math.round(c1.g + (c2.g - c1.g) * t);
      const b = Math.round(c1.b + (c2.b - c1.b) * t);

      const gradient = ctx!.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.radius);
      gradient.addColorStop(0, `rgba(${r},${gr},${b},0.12)`);
      gradient.addColorStop(0.5, `rgba(${r},${gr},${b},0.04)`);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx!.save();
      ctx!.translate(g.x, g.y);
      ctx!.rotate(g.angle);
      ctx!.scale(1, g.ellipticity);
      ctx!.beginPath();
      ctx!.arc(0, 0, g.radius, 0, Math.PI * 2);
      ctx!.fillStyle = gradient;
      ctx!.fill();
      ctx!.restore();
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);
      gradients.forEach(g => {
        update(g);
        draw(g);
      });
      animationId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      resize();
      gradients.forEach((_, i) => {
        gradients[i] = createGradient(width, height);
      });
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.25,
      }}
    />
  );
}
