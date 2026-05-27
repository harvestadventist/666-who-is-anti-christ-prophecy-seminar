import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Search, ArrowRight } from 'lucide-react';

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
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-full shrink-0"
            style={{ width: 40, height: 40, background: '#0a0a0a' }}
          >
            <MapPin size={20} color="#f59e0b" />
          </div>
          <div>
            <p
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontWeight: 700,
                fontSize: 18,
                color: '#0a0a0a',
                lineHeight: 1.3,
              }}
            >
              免費聖經預言講座舉辦地點
            </p>
            <p
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontSize: 14,
                color: 'rgba(10,10,10,0.7)',
                lineHeight: 1.4,
              }}
            >
              歡迎親臨現場！
            </p>
          </div>
        </div>

        <a
          href="#locations"
          className="inline-flex items-center gap-2 rounded-full font-bold whitespace-nowrap transition-all hover:brightness-110"
          style={{
            background: '#0a0a0a',
            color: '#f59e0b',
            padding: '10px 24px',
            fontSize: 14,
            fontFamily: '"Noto Sans TC", sans-serif',
          }}
        >
          <Search size={16} />
          搜尋聚會地點
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
