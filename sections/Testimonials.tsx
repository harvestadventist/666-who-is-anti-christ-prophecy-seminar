import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    image: '/images/testimonial-1.jpg',
    quote:
      '我當時迫切地尋找平安。我知道答案在聖經裡，但我從未讀過。當我參加這個講座時，感覺就像一塊大石頭從我背上移開了。這對我的心產生了很大的改變。',
    name: 'Kimberly',
  },
  {
    image: '/images/testimonial-2.jpg',
    quote:
      '這個講座回答了我所有的問題，甚至還有我根本不知道自己有的問題。我現在有盼望了，因為我知道故事的結局。',
    name: 'Cicille',
  },
  {
    image: '/images/testimonial-3.jpg',
    quote:
      '一個非常專業的演講。這個講座將古老的聖經真理變得與我今天的生活息息相關。耶穌對我來說變得更真實了。',
    name: 'Joshua',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoCycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateCardOrder = useCallback(
    (index: number) => {
      const stack = stackRef.current;
      if (!stack) return;
      const cards = stack.querySelectorAll<HTMLDivElement>('.polaroid');
      const total = cards.length;
      cards.forEach((card, i) => {
        const offset = (i - index + total) % total;
        card.setAttribute('data-order', String(offset));
      });
    },
    []
  );

  const cycleCard = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => {
      const next = (prev + 1) % testimonials.length;
      updateCardOrder(next);
      return next;
    });
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, updateCardOrder]);

  const goToCard = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      updateCardOrder(index);
      setTimeout(() => setIsAnimating(false), 800);
    },
    [isAnimating, currentIndex, updateCardOrder]
  );

  // Auto-cycle
  useEffect(() => {
    autoCycleRef.current = setInterval(() => {
      cycleCard();
    }, 5000);
    return () => {
      if (autoCycleRef.current) clearInterval(autoCycleRef.current);
    };
  }, [cycleCard]);

  // Entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const stack = stackRef.current;
    if (!section || !title || !stack) return;

    gsap.fromTo(
      title,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      stack,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
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

  // Initialize card order
  useEffect(() => {
    updateCardOrder(0);
  }, [updateCardOrder]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        background: '#0a0a0a',
        position: 'relative',
        zIndex: 1,
        padding: '100px 0',
      }}
    >
      <div className="content-container">
        <h2
          ref={titleRef}
          className="text-center"
          style={{
            fontFamily: '"Noto Sans TC", "PingFang TC", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#f5f5f0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textWrap: 'balance',
            marginBottom: 60,
          }}
        >
          參加者的見證
        </h2>

        {/* 3D Card Stack */}
        <div className="flex justify-center items-center gap-8">
          {/* Left Arrow */}
          <button
            onClick={() => {
              const prev =
                (currentIndex - 1 + testimonials.length) % testimonials.length;
              goToCard(prev);
              if (autoCycleRef.current) clearInterval(autoCycleRef.current);
              autoCycleRef.current = setInterval(() => cycleCard(), 5000);
            }}
            className="hidden md:flex items-center justify-center rounded-full transition-all hover:bg-white/10 shrink-0"
            style={{
              width: 44,
              height: 44,
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <ChevronLeft size={20} color="#f5f5f0" />
          </button>

          <div
            id="testimonial-card-stack"
            style={{
              position: 'relative',
              width: 340,
              height: 460,
              perspective: 1000,
            }}
          >
            <div
              ref={stackRef}
              style={{
                position: 'relative',
                width: 340,
                height: 420,
                transformStyle: 'preserve-3d',
              }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="polaroid"
                  onClick={() => {
                    cycleCard();
                    if (autoCycleRef.current)
                      clearInterval(autoCycleRef.current);
                    autoCycleRef.current = setInterval(() => cycleCard(), 5000);
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    padding: '16px 16px 60px 16px',
                    background: '#f5f5f0',
                    borderRadius: 4,
                    boxShadow:
                      '0 1px 2px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.1), 0 12px 24px rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition:
                      'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s ease',
                    transformOrigin: 'center center',
                  }}
                  data-order={i === 0 ? 0 : i}
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full object-cover"
                    style={{ aspectRatio: '1/1', borderRadius: 2, flexShrink: 0 }}
                    loading="lazy"
                  />
                  <div style={{ marginTop: 'auto', paddingTop: 12 }}>
                    <p
                      style={{
                        fontFamily: '"Noto Sans TC", sans-serif',
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: '#1a1a1a',
                        maxHeight: 80,
                        overflow: 'hidden',
                      }}
                    >
                      "{t.quote}"
                    </p>
                    <p
                      style={{
                        fontFamily: '"Noto Sans TC", sans-serif',
                        fontWeight: 700,
                        fontSize: 14,
                        color: '#0a0a0a',
                        marginTop: 8,
                      }}
                    >
                      {t.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => {
              cycleCard();
              if (autoCycleRef.current) clearInterval(autoCycleRef.current);
              autoCycleRef.current = setInterval(() => cycleCard(), 5000);
            }}
            className="hidden md:flex items-center justify-center rounded-full transition-all hover:bg-white/10 shrink-0"
            style={{
              width: 44,
              height: 44,
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <ChevronRight size={20} color="#f5f5f0" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                goToCard(i);
                if (autoCycleRef.current)
                  clearInterval(autoCycleRef.current);
                autoCycleRef.current = setInterval(() => cycleCard(), 5000);
              }}
              className="rounded-full transition-all"
              style={{
                width: 8,
                height: 8,
                background:
                  i === currentIndex
                    ? '#f5f5f0'
                    : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .polaroid[data-order="0"] {
          z-index: 5;
          transform: translateZ(0) rotateX(0deg) rotateY(0deg);
          opacity: 1;
        }
        .polaroid[data-order="1"] {
          z-index: 4;
          transform: translateZ(-40px) rotateX(2deg) rotateY(-2deg);
          opacity: 0.85;
        }
        .polaroid[data-order="2"] {
          z-index: 3;
          transform: translateZ(-80px) rotateX(4deg) rotateY(-4deg);
          opacity: 0.6;
        }
      `}</style>
    </section>
  );
}
