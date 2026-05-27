import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const topics = [
  {
    image: '/images/topic-temple.jpg',
    title: '啟示錄的聖殿',
    description:
      '在啟示錄幾乎每一章中，您都會遇到對聖殿或其器具的引用——每個象徵都充滿意義和奧秘。深入理解聖殿及其禮儀對於解開啟示錄的真正信息至關重要。在這次探索中，我們將揭示聖殿如何成為一個具有深遠意義的強大象徵，這些古老的聖禮如何掌握理解末世預言的鑰匙——以及為什麼它們現在比以往任何時候都更重要。',
  },
  {
    image: '/images/topic-keys.jpg',
    title: '啟示錄的鑰匙',
    description:
      '許多人認為聖經預言，特別是啟示錄，是一個難解的謎——某種無法理解的事物。但如果這個謎團可以被解開呢？在這次演講中，您將發現隱藏的鑰匙，這些鑰匙不僅會照亮聖經的深層含義，還將使您能夠以從未想過的方式掌握聖經預言。準備好以全新的眼光看待啟示錄及其預言信息。',
  },
  {
    image: '/images/topic-countdown.jpg',
    title: '啟示錄的最終倒數',
    description:
      '當我們環顧這個動盪的世界時，一個令人不安的問題揮之不去：這種情況還能持續多久？我們會陷入自我毀滅的漩渦，還是一場災難性事件——隕石撞擊、自然災害——是我們不可避免的命運？在這次探索中，我們將揭示隱藏在神的話語中的深刻真理，這些真理不僅提供答案，還讓我們更深入地理解我們的未來和塑造它的力量。',
  },
  {
    image: '/images/topic-superpower.jpg',
    title: '啟示錄的下一個世界超級大國',
    description:
      '當我們想像下一個世界超級大國時，許多人都在猜測：會是俄羅斯、中國，還是另一個崛起的力量？在這次演講中，我們將深入探討一個驚人的聖經預言，這個預言不僅直接談到未來世界霸權的問題，還揭示了我們所知的世界末日。準備好發現這個非凡的預言，它揭示了塑造我們全球未來的真正力量——遠超我們今天所能看見的力量。',
  },
  {
    image: '/images/topic-throne.jpg',
    title: '啟示錄的寶座之戰',
    description:
      '每一天，新聞頭條都充滿了悲劇、痛苦和失落的故事。隨著世界變得越來越混亂，許多人都在困惑中掙扎，尋找可以責備的人或事。在這次演講中，您將發現聖經掌握著理解我們苦難的真正根源及其深刻原因的鑰匙。準備好解開這個謎團，在曾經只有混亂的地方找到清晰。',
  },
];

export default function Topics() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cardsContainer = cardsContainerRef.current;
    if (!section || !title || !cardsContainer) return;

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

    const cards = cardsContainer.querySelectorAll('.topic-card');
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

  const scrollToCard = (index: number) => {
    const container = cardsContainerRef.current;
    if (!container) return;
    const newIndex = Math.max(0, Math.min(index, topics.length - 1));
    setActiveIndex(newIndex);
    const cardWidth = 380 + 24;
    container.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' });
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
          研討主題還有更多！
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative mt-12" style={{ maxWidth: '100%' }}>
        {/* Navigation arrows */}
        <button
          onClick={() => scrollToCard(activeIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full transition-all hover:brightness-125 hidden md:flex"
          style={{
            width: 44,
            height: 44,
            background: 'rgba(255,255,255,0.08)',
          }}
        >
          <ChevronLeft size={20} color="#f5f5f0" />
        </button>
        <button
          onClick={() => scrollToCard(activeIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full transition-all hover:brightness-125 hidden md:flex"
          style={{
            width: 44,
            height: 44,
            background: 'rgba(255,255,255,0.08)',
          }}
        >
          <ChevronRight size={20} color="#f5f5f0" />
        </button>

        <div
          ref={cardsContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 px-4 lg:px-16 scrollbar-hide"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {topics.map((topic, i) => (
            <div
              key={i}
              className="topic-card shrink-0"
              style={{
                width: 'clamp(300px, 80vw, 380px)',
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                overflow: 'hidden',
                scrollSnapAlign: 'start',
              }}
            >
              <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {topic.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {topics.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className="rounded-full transition-all"
              style={{
                width: 8,
                height: 8,
                background: i === activeIndex ? '#f5f5f0' : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
