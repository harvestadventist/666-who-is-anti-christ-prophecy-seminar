import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 120;
const MAX_CONNECTIONS = 4;
const MOUSE_RADIUS = 150;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  baseColor: { h: number; s: number; l: number };
  activeColor: { h: number; s: number; l: number };
  isActive: boolean;
  alpha: number;
  pulsePhase: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let pWidth = 0;
    let pHeight = 0;
    let particles: Particle[] = [];
    let animationId = 0;
    const mouse = { x: null as number | null, y: null as number | null };

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 40 : PARTICLE_COUNT;

    function resize() {
      pWidth = canvas!.width = window.innerWidth;
      pHeight = canvas!.height = window.innerHeight;
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * pWidth,
        y: Math.random() * pHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseRadius: 1.5 + Math.random() * 1.5,
        radius: 1.5 + Math.random() * 1.5,
        baseColor: { h: 38 + Math.random() * 8, s: 90, l: 55 },
        activeColor: { h: 45, s: 100, l: 60 },
        isActive: false,
        alpha: 0.3 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    }

    function update(p: Particle) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > pWidth) p.vx *= -1;
      if (p.y < 0 || p.y > pHeight) p.vy *= -1;

      p.pulsePhase += 0.03;
      p.radius = p.baseRadius + Math.sin(p.pulsePhase) * 0.4;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        p.isActive = dist < MOUSE_RADIUS;
      } else {
        p.isActive = false;
      }
    }

    function drawParticle(p: Particle) {
      const color = p.isActive ? p.activeColor : p.baseColor;
      const a = p.isActive ? 0.9 : p.alpha;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.fillStyle = `hsla(${color.h},${color.s}%,${color.l}%,${a})`;
      ctx!.fill();
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < particles.length; j++) {
          if (connections >= MAX_CONNECTIONS) break;
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const bothActive = particles[i].isActive && particles[j].isActive;
            const alpha = bothActive
              ? 0.6 * (1 - dist / CONNECTION_DISTANCE)
              : 0.15 * (1 - dist / CONNECTION_DISTANCE);
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = bothActive
              ? `hsla(45,100%,60%,${alpha})`
              : `hsla(38,90%,55%,${alpha})`;
            ctx!.lineWidth = bothActive ? 1.5 : 0.5;
            ctx!.stroke();
            connections++;
          }
        }
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, pWidth, pHeight);
      particles.forEach(p => {
        update(p);
        drawParticle(p);
      });
      drawConnections();
      animationId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      init();
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
