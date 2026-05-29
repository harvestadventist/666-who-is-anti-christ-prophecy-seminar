import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    if (!section || !image || !text) return;

    gsap.fromTo(
      image,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      text,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
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
    <section
      id="about"
      ref={sectionRef}
      className="section-padding"
      style={{ background: '#0a0a0a', position: 'relative', zIndex: 1 }}
    >
      <div className="content-container flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Image */}
        <div ref={imageRef} className="w-full lg:w-[45%]">
          <img
            src="/images/about-jesus.jpg"
            alt="耶穌基督騎著白馬"
            className="w-full rounded-2xl"
            style={{
              aspectRatio: '1/1',
              objectFit: 'cover',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          />
        </div>

        {/* Text */}
        <div ref={textRef} className="w-full lg:w-[55%]">
          <h2
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
            啟示錄這本書
          </h2>

          <p
            className="mt-6"
            style={{
              fontFamily: '"Noto Sans TC", "PingFang TC", sans-serif',
              fontWeight: 400,
              fontSize: 16,
              color: '#8a8a82',
              lineHeight: 1.8,
              maxWidth: 520,
            }}
          >
            在這個充滿活力的講座中，您將發現關於聖經預言和啟示錄的內容，遠超您的想像。啟示錄充滿了神秘的徵兆、奇異的獸和令人困惑的數字，但這一切究竟意味著什麼？是否有鑰匙能為我們今天解開啟示錄的奧秘？有了這些鑰匙，我們能夠理解啟示錄嗎？我們的世界將走向何方？在這些末世預言中是否有盼望？我們能從這本書的頁面中為今天的生活找到平安嗎？發現當您理解這本常被誤解的聖經書卷時，可以找到的真理和盼望。不要錯過這個激動人心的機會——今天就報名參加這個免費講座！
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:brightness-110 mt-8"
            style={{
              background: '#f59e0b',
              color: '#0a0a0a',
              padding: '12px 28px',
              fontSize: 14,
              fontFamily: '"Noto Sans TC", sans-serif',
            }}
          >
            預留您的座位
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
