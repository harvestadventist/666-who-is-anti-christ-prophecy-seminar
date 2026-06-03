import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  '出生於馬來西亞，是一位擁有近二十年經驗的牧師、聖經教師和神學家。他專攻歷史神學和系統神學，擁有兩個碩士學位（教牧碩士和神學碩士），目前正在攻讀博士學位。',
  '他建立T.R.U.S.T國際媒體事工，透過數位和社交平台傳播佈道、神學研究和福音信息。',
  '他週遊世界，舉行福音佈道和復興聚會，包括在中國、泰國、新加坡和東非等地方開展活動，以深入淺出的方式解讀啟示錄、但以理書等先知書卷，幫助信徒明白末日徵兆與基督再來的盼望。',
];

export default function Speaker() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  const displayParagraphs = expanded ? paragraphs : paragraphs.slice(0, 1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Card animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Text animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="speaker"
      style={{ background: '#0a0a0a', padding: '80px 0' }}
    >
      <div
        className="speaker-container"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
        }}
      >
        {/* Section Title */}
        <h2
          ref={titleRef}
          style={{
            fontFamily: '"Noto Sans TC", "PingFang TC", sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#f5f5f0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textWrap: 'balance',
            textAlign: 'center',
            marginBottom: 48,
          }}
        >
          預言講座講者
        </h2>

        {/* Speaker Card */}
        <div
          ref={cardRef}
          style={{
            background: '#1a1a1a',
            borderRadius: 16,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          }}
          className="speaker-card"
        >
          {/* Speaker Photo */}
          <div
            ref={imageRef}
            style={{
              flex: '0 0 40%',
              minHeight: 400,
              position: 'relative',
              overflow: 'hidden',
            }}
            className="speaker-image-wrapper"
          >
            <img
              src="/images/speaker.jpg"
              alt="戴雄漢牧師"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Gradient overlay on image edge */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '30%',
                height: '100%',
                background: 'linear-gradient(to right, transparent, #1a1a1a)',
                pointerEvents: 'none',
              }}
              className="image-gradient-overlay"
            />
          </div>

          {/* Speaker Info */}
          <div
            ref={textRef}
            style={{
              flex: 1,
              padding: '48px 40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            className="speaker-info"
          >
            <h3
              style={{
                fontFamily: "'Oswald', 'Noto Sans TC', sans-serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                color: '#f5f2eb',
                marginBottom: 8,
                lineHeight: 1.2,
              }}
            >
              戴雄漢
            </h3>
            <p
              style={{
                fontFamily: "'Noto Sans TC', sans-serif",
                fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                fontWeight: 500,
                color: '#f59e0b',
                marginBottom: 24,
                letterSpacing: '0.05em',
              }}
            >
              牧師
            </p>

            {/* Description paragraphs */}
            <div style={{ marginBottom: 24 }}>
              {displayParagraphs.map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Noto Sans TC', sans-serif",
                    fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                    lineHeight: 1.8,
                    color: 'rgba(245, 242, 235, 0.8)',
                    marginBottom: i < displayParagraphs.length - 1 ? 12 : 0,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Expand/Collapse Button */}
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'transparent',
                border: '2px solid #f59e0b',
                color: '#f59e0b',
                padding: '12px 28px',
                borderRadius: 50,
                fontFamily: "'Oswald', 'Noto Sans TC', sans-serif",
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                alignSelf: 'flex-start',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f59e0b';
                e.currentTarget.style.color = '#0a0a0a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#f59e0b';
              }}
            >
              {expanded ? '收起內容' : '了解更多'}
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 767px) {
          .speaker-card {
            flex-direction: column !important;
          }
          .speaker-image-wrapper {
            flex: none !important;
            width: 100% !important;
            min-height: 300px !important;
            max-height: 350px;
          }
          .image-gradient-overlay {
            display: none !important;
          }
          .speaker-info {
            padding: 32px 20px !important;
            text-align: center;
          }
          .speaker-info button {
            align-self: center !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .speaker-image-wrapper {
            flex: 0 0 45% !important;
            min-height: 350px !important;
          }
          .speaker-info {
            padding: 36px 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
