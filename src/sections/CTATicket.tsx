import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTATicket() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const ticket = ticketRef.current;
    if (!section || !ticket) return;

    gsap.fromTo(
      ticket,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'back.out(1.2)',
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

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#0a0a0a',
        position: 'relative',
        zIndex: 1,
        padding: '80px 0',
      }}
    >
      <div className="content-container flex justify-center">
        <div
          ref={ticketRef}
          className="flex overflow-hidden w-full"
          style={{
            maxWidth: 700,
            borderRadius: 12,
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          {/* Left Stub */}
          <div
            className="hidden sm:flex flex-col items-center justify-center"
            style={{
              background: '#1a1a1a',
              width: 60,
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              borderRight: '2px dashed rgba(255,255,255,0.15)',
            }}
          >
            <span
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontWeight: 700,
                fontSize: 14,
                color: '#f5f5f0',
                letterSpacing: '0.1em',
              }}
            >
              免費入場
            </span>
          </div>

          {/* Center Image */}
          <div className="flex-1 hidden sm:block">
            <img
              src="/images/hero-banner.jpg"
              alt="啟示錄的鑰匙"
              className="w-full h-full object-cover"
              style={{ maxHeight: 240 }}
            />
          </div>

          {/* Right Panel */}
          <div
            className="flex flex-col items-center justify-center text-center p-8"
            style={{
              background: '#f59e0b',
              minWidth: 200,
              flex: 1,
            }}
          >
            <p
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                color: '#0a0a0a',
                lineHeight: 1.2,
              }}
            >
              立即報名！
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:brightness-110 mt-4"
              style={{
                background: '#0a0a0a',
                color: '#f5f5f0',
                padding: '10px 24px',
                fontSize: 14,
                fontFamily: '"Noto Sans TC", sans-serif',
              }}
            >
              預留您的座位
              <ArrowUpRight size={14} />
            </Link>
            <div className="flex items-center gap-2 mt-4">
              <img
                src="/images/book-gift.jpg"
                alt="免費書籍"
                className="rounded"
                style={{ width: 32, height: 48, objectFit: 'cover' }}
              />
              <span
                style={{
                  fontFamily: '"Noto Sans TC", sans-serif',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'rgba(10,10,10,0.7)',
                }}
              >
                領取您的免費禮物
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
