import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FreeGift() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
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
    <div className="content-container" style={{ position: 'relative', zIndex: 1 }}>
      <div
        ref={sectionRef}
        className="flex flex-col sm:flex-row items-center gap-6"
        style={{
          background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
          borderRadius: 16,
          padding: '24px 40px',
        }}
      >
        {/* Book Image */}
        <img
          src="/images/book-gift.png"
          alt="Kingdoms In Time 免費書籍"
          className="shrink-0 rounded-lg"
          style={{ width: 80, height: 120, objectFit: 'cover' }}
        />

        {/* Text */}
        <div className="flex-1 text-center sm:text-left">
          <p
            style={{
              fontFamily: '"Noto Sans TC", sans-serif',
              fontWeight: 700,
              fontSize: 20,
              color: '#0a0a0a',
              lineHeight: 1.3,
            }}
          >
            立即領取您的免費禮物！
          </p>
          <p
            style={{
              fontFamily: '"Noto Sans TC", sans-serif',
              fontSize: 14,
              color: 'rgba(10,10,10,0.7)',
              lineHeight: 1.4,
              marginTop: 4,
            }}
          >
            今天就報名，到場即可領取免費禮物！
          </p>
        </div>

        {/* CTA */}
        <Link
          to="/register"
          className="inline-flex items-center gap-2 rounded-full font-bold whitespace-nowrap transition-all hover:brightness-110 shrink-0"
          style={{
            background: '#0a0a0a',
            color: '#f59e0b',
            padding: '12px 24px',
            fontSize: 14,
            fontFamily: '"Noto Sans TC", sans-serif',
          }}
        >
          立即報名領取禮物
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
