import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        y: 8,
        duration: 2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      {/* Background Image */}
      <img
        src="/images/hero-banner.jpg"
        alt="啟示錄的鑰匙 — 聖經預言講座"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />

      {/* Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0) 60%)',
          zIndex: 2,
        }}
      />

      {/* Text Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          paddingBottom: 'clamp(80px, 15vh, 140px)',
          paddingLeft: 20,
          paddingRight: 20,
          maxWidth: 720,
        }}
      >
        <h1
          style={{
            fontFamily: '"Noto Sans TC", "PingFang TC", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#f5f5f0',
            textShadow: '0 2px 40px rgba(0,0,0,0.6)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textWrap: 'balance',
          }}
        >
          免費聖經預言講座！
        </h1>

        <a
          href="#locations"
          className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:brightness-110"
          style={{
            background: '#f59e0b',
            color: '#0a0a0a',
            padding: '14px 32px',
            fontSize: 15,
            fontFamily: '"Noto Sans TC", sans-serif',
            marginTop: 32,
          }}
        >
          <MapPin size={16} />
          聚會地點
        </a>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={chevronRef}
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          opacity: 0.4,
        }}
      >
        <ChevronDown size={28} color="#f5f5f0" />
      </div>
    </section>
  );
}
