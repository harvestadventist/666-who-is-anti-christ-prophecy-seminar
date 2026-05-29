import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search } from 'lucide-react';

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
        {/* Text - centered on mobile, left on desktop */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <p
            className="sm:text-[18px]"
            style={{
              fontFamily: '"Noto Sans TC", sans-serif',
              fontWeight: 700,
              fontSize: 20,
              color: '#0a0a0a',
              lineHeight: 1.3,
            }}
          >
            免費聖經預言講座舉辦地點
          </p>
          <p
            className="sm:text-[14px]"
            style={{
              fontFamily: '"Noto Sans TC", sans-serif',
              fontSize: 16,
              color: 'rgba(10,10,10,0.7)',
              lineHeight: 1.4,
            }}
          >
            歡迎親臨現場！
          </p>
        </div>

        {/* Button - full width on mobile with 30px margins */}
        <a
          href="#locations"
          className="inline-flex items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap transition-all hover:brightness-110 w-full sm:w-auto"
          style={{
            background: '#ffffff',
            color: '#0a0a0a',
            padding: '14px 10px 14px 24px',
            fontSize: 15,
            fontFamily: '"Noto Sans TC", sans-serif',
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          搜尋聚會地點
          <span
            className="flex items-center justify-center rounded-full shrink-0"
            style={{
              width: 36,
              height: 36,
              background: '#f59e0b',
              marginLeft: 4,
            }}
          >
            <Search size={18} color="#0a0a0a" />
          </span>
        </a>
      </div>
    </div>
  );
}
