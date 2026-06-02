import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SearchBar() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
        padding: '18px 0',
      }}
    >
      <div className="content-container flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Desktop: bold text + pin icon + address */}
        <div className="hidden sm:flex items-center gap-4">
          <span
            style={{
              fontFamily: '"Noto Sans TC", "Arial Black", sans-serif',
              fontWeight: 900,
              fontSize: 20,
              color: '#0a0a0a',
              letterSpacing: '0.02em',
              lineHeight: 1.2,
            }}
          >
            8月9日正式開始
          </span>
          <span
            className="flex items-center justify-center rounded-full"
            style={{
              width: 36,
              height: 36,
              background: 'rgba(10,10,10,0.15)',
            }}
          >
            <MapPin size={18} color="#0a0a0a" />
          </span>
          <span
            style={{
              fontFamily: '"Noto Sans TC", sans-serif',
              fontSize: 16,
              fontWeight: 600,
              color: '#0a0a0a',
              lineHeight: 1.3,
            }}
          >
            旺角好望角大廈9樓百本人才培訓學院
          </span>
        </div>

        {/* Mobile text */}
        <div className="flex flex-col items-center sm:hidden text-center">
          <p
            style={{
              fontFamily: '"Noto Sans TC", sans-serif',
              fontWeight: 700,
              fontSize: 24,
              color: '#0a0a0a',
              lineHeight: 1.3,
            }}
          >
            8月9日正式開始
          </p>
          <p
            style={{
              fontFamily: '"Noto Sans TC", sans-serif',
              fontSize: 17,
              color: 'rgba(10,10,10,0.7)',
              lineHeight: 1.4,
              marginTop: 2,
            }}
          >
            免費聖經預言講座!
          </p>
        </div>

        {/* Button - white pill with amber circle icon */}
        <a
          href="#locations"
          className="inline-flex items-center gap-3 rounded-full font-bold whitespace-nowrap transition-all hover:brightness-110"
          style={{
            background: '#ffffff',
            color: '#0a0a0a',
            padding: '12px 12px 12px 28px',
            fontSize: 15,
            fontFamily: '"Noto Sans TC", sans-serif',
          }}
        >
          搜尋聚會地點
          <span
            className="flex items-center justify-center rounded-full"
            style={{
              width: 36,
              height: 36,
              background: '#f59e0b',
            }}
          >
            <Search size={18} color="#0a0a0a" />
          </span>
        </a>
      </div>
    </div>
  );
}
