import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TopicItem {
  image: string;
  title: string;
  description: string;
}

const topics: TopicItem[] = [
  {
    image: '/images/topic-christ.jpg',
    title: '誰是基督？',
    description: '歷代以來世人一直所期待的救主應許要拯救相信祂的人。',
  },
  {
    image: '/images/topic-antichrist.jpg',
    title: '誰是敵基督？',
    description: '撒旦在末日要透過他的爪牙進行欺騙的工作並施行大逼迫。',
  },
  {
    image: '/images/topic-666.jpg',
    title: '聖經的666是什麼？',
    description: '凡有智慧的人才能明白這數目背後的真正意義。',
  },
  {
    image: '/images/topic-144000.jpg',
    title: '誰是144,000人？',
    description: '末日必有一群完全忠心耶穌的人，在黑暗的日子中彰顯祂的品格。',
  },
  {
    image: '/images/topic-good-evil.jpg',
    title: '善惡之爭誰會得勝？',
    description: '我們知道善與惡之間的鬥爭會越演越烈，問題是我們會站在哪邊？',
  },
];

const CARD_GAP = 24;

// Build infinite carousel: [last2, last1, ...all..., first0, first1, first2]
const extendedTopics = [
  ...topics.slice(-2), // card3, card4
  ...topics,           // card0, card1, card2, card3, card4
  ...topics.slice(0, 3), // card0, card1, card2
];

// Real start index (where card0 is at leftmost visible position)
const START_INDEX = 2;

export default function Topics() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [slideIndex, setSlideIndex] = useState(START_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isResetting = useRef(false);

  const maxRealIndex = START_INDEX + topics.length - 1; // 2 + 5 - 1 = 6

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

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
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    const cards = section.querySelectorAll('.topic-card');
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
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

  // Get real card index (0-4) for dot indicators
  const getRealIndex = useCallback((si: number) => {
    if (si >= START_INDEX && si <= maxRealIndex) {
      return si - START_INDEX;
    }
    if (si < START_INDEX) {
      return topics.length - (START_INDEX - si);
    }
    return si - maxRealIndex - 1;
  }, [maxRealIndex]);

  const currentRealIndex = getRealIndex(slideIndex);

  const goTo = useCallback((targetIndex: number) => {
    if (isResetting.current) return;
    setIsTransitioning(true);
    setSlideIndex(targetIndex);
  }, []);

  const goPrev = useCallback(() => {
    if (isResetting.current) return;
    setIsTransitioning(true);
    setSlideIndex(prev => prev - 1);
  }, []);

  const goNext = useCallback(() => {
    if (isResetting.current) return;
    setIsTransitioning(true);
    setSlideIndex(prev => prev + 1);
  }, []);

  // Handle infinite loop reset
  const handleTransitionEnd = useCallback(() => {
    if (slideIndex > maxRealIndex) {
      // We're in clone zone at end, jump to start
      isResetting.current = true;
      setIsTransitioning(false);
      const offset = slideIndex - maxRealIndex;
      setSlideIndex(START_INDEX - 1 + offset);
      setTimeout(() => {
        isResetting.current = false;
      }, 50);
    } else if (slideIndex < START_INDEX) {
      // We're in clone zone at start, jump to end
      isResetting.current = true;
      setIsTransitioning(false);
      const offset = START_INDEX - slideIndex;
      setSlideIndex(maxRealIndex + 1 - offset);
      setTimeout(() => {
        isResetting.current = false;
      }, 50);
    }
  }, [slideIndex, maxRealIndex]);

  const trackStyle: React.CSSProperties = {
    display: 'flex',
    gap: CARD_GAP,
    transform: `translateX(calc(-${slideIndex} * (100% + ${CARD_GAP}px) / 3))`,
    transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
    willChange: 'transform',
  };

  return (
    <section
      id="topics"
      ref={sectionRef}
      style={{
        background: '#0a0a0a',
        position: 'relative',
        zIndex: 1,
        padding: '100px 0',
        overflow: 'hidden',
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
          }}
        >
          預言講座研討主題簡介
        </h2>
      </div>

      {/* Desktop Carousel */}
      <div className="relative mt-12 hidden md:block">
        {/* Left Arrow */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-[150px] z-10 flex items-center justify-center rounded-full transition-all hover:bg-white/20"
          style={{
            width: 44,
            height: 44,
            background: 'rgba(255,255,255,0.12)',
            cursor: 'pointer',
          }}
        >
          <ChevronLeft size={20} color="#f5f5f0" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goNext}
          className="absolute right-4 top-[150px] z-10 flex items-center justify-center rounded-full transition-all hover:bg-white/20"
          style={{
            width: 44,
            height: 44,
            background: 'rgba(255,255,255,0.12)',
            cursor: 'pointer',
          }}
        >
          <ChevronRight size={20} color="#f5f5f0" />
        </button>

        {/* Viewport */}
        <div
          style={{
            margin: '0 clamp(60px, 8vw, 80px)',
            overflow: 'hidden',
          }}
        >
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            style={trackStyle}
          >
            {extendedTopics.map((topic, i) => (
              <div
                key={i}
                className="topic-card shrink-0"
                style={{
                  width: `calc((100% - ${CARD_GAP * 2}px) / 3)`,
                  background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                  <img
                    src={topic.image}
                    alt={topic.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div style={{ padding: 24 }}>
                  <h3
                    style={{
                      fontFamily: '"Noto Sans TC", sans-serif',
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#f5f5f0',
                      lineHeight: 1.3,
                    }}
                  >
                    {topic.title}
                  </h3>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: '"Noto Sans TC", sans-serif',
                      fontWeight: 400,
                      fontSize: 14,
                      color: '#8a8a82',
                      lineHeight: 1.7,
                    }}
                  >
                    {topic.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {topics.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(START_INDEX + i)}
              className="rounded-full transition-all"
              style={{
                width: 8,
                height: 8,
                background: i === currentRealIndex ? '#f5f5f0' : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile Coverflow Carousel */}
      <div className="mt-12 md:hidden">
        <MobileCoverflow topics={topics} />
      </div>
    </section>
  );
}

/* Mobile Coverflow Component */
function MobileCoverflow({ topics }: { topics: TopicItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTrans, setIsTrans] = useState(true);
  const isResetting = useRef(false);

  const extTopics = [
    ...topics.slice(-1),
    ...topics,
    ...topics.slice(0, 1),
  ];
  const START = 1;
  const MAX = START + topics.length - 1;

  const realIndex = activeIdx >= START && activeIdx <= MAX
    ? activeIdx - START
    : activeIdx < START
      ? topics.length - 1
      : 0;

  const goTo = (idx: number) => {
    if (isResetting.current) return;
    setIsTrans(true);
    setActiveIdx(idx);
  };

  const goPrev = () => {
    if (isResetting.current) return;
    setIsTrans(true);
    setActiveIdx(p => p - 1);
  };

  const goNext = () => {
    if (isResetting.current) return;
    setIsTrans(true);
    setActiveIdx(p => p + 1);
  };

  const handleTransEnd = () => {
    if (activeIdx > MAX) {
      isResetting.current = true;
      setIsTrans(false);
      setActiveIdx(START);
      setTimeout(() => { isResetting.current = false; }, 50);
    } else if (activeIdx < START) {
      isResetting.current = true;
      setIsTrans(false);
      setActiveIdx(MAX);
      setTimeout(() => { isResetting.current = false; }, 50);
    }
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={goPrev}
        className="absolute left-2 top-[80px] z-10 flex items-center justify-center rounded-full"
        style={{
          width: 36,
          height: 36,
          background: 'rgba(255,255,255,0.12)',
          cursor: 'pointer',
        }}
      >
        <ChevronLeft size={18} color="#f5f5f0" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goNext}
        className="absolute right-2 top-[80px] z-10 flex items-center justify-center rounded-full"
        style={{
          width: 36,
          height: 36,
          background: 'rgba(255,255,255,0.12)',
          cursor: 'pointer',
        }}
      >
        <ChevronRight size={18} color="#f5f5f0" />
      </button>

      {/* Viewport */}
      <div
        className="overflow-hidden"
        style={{ margin: '0 44px' }}
      >
        <div
          className="flex"
          style={{
            gap: 12,
            transform: `translateX(calc(-${activeIdx} * (100% + 12px)))`,
            transition: isTrans ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            willChange: 'transform',
          }}
          onTransitionEnd={handleTransEnd}
        >
          {extTopics.map((topic, i) => {
            const dist = Math.abs(i - activeIdx);
            return (
              <div
                key={i}
                className="shrink-0"
                style={{
                  width: '100%',
                  transform: dist === 0 ? 'scale(1)' : 'scale(0.95)',
                  opacity: dist === 0 ? 1 : 0.5,
                  transition: 'transform 0.4s ease, opacity 0.4s ease',
                  background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                  <img
                    src={topic.image}
                    alt={topic.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div style={{ padding: 16 }}>
                  <h3
                    style={{
                      fontFamily: '"Noto Sans TC", sans-serif',
                      fontWeight: 700,
                      fontSize: 15,
                      color: '#f5f5f0',
                      lineHeight: 1.3,
                    }}
                  >
                    {topic.title}
                  </h3>
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: '"Noto Sans TC", sans-serif',
                      fontWeight: 400,
                      fontSize: 12,
                      color: '#8a8a82',
                      lineHeight: 1.6,
                    }}
                  >
                    {topic.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {topics.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(START + i)}
            className="rounded-full transition-all"
            style={{
              width: 8,
              height: 8,
              background: i === realIndex ? '#f5f5f0' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
