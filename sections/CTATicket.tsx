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
          className="w-full overflow-hidden"
          style={{
            maxWidth: 900,
            borderRadius: 12,
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          {/* ==================== DESKTOP LAYOUT (horizontal) ==================== */}
          <div className="hidden sm:flex" style={{ minHeight: 320 }}>
            {/* Left Stub - 免費入場 */}
            <div
              className="flex flex-col items-center justify-center"
              style={{
                background: '#1a1a1a',
                width: 70,
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                borderRight: '2px dashed rgba(255,255,255,0.15)',
              }}
            >
              <span
                style={{
                  fontFamily: '"Noto Sans TC", sans-serif',
                  fontWeight: 700,
                  fontSize: 24,
                  color: '#f5f5f0',
                  letterSpacing: '0.15em',
                }}
              >
                免費入場
              </span>
            </div>

            {/* Center Image - 2/3 width */}
            <div className="flex-[2] relative">
              <img
                src="/images/hero-banner.jpg"
                alt="啟示錄的鑰匙"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Panel - 1/3 width, amber */}
            <div
              className="flex-1 flex flex-col items-start justify-center p-6 lg:p-8"
              style={{
                background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                minWidth: 220,
              }}
            >
              <p
                style={{
                  fontFamily: '"Noto Sans TC", sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  color: '#0a0a0a',
                  lineHeight: 1.15,
                }}
              >
                立即報名！
              </p>
              <Link
                to="/register#register-header"
                className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:brightness-110 mt-5"
                style={{
                  background: '#0a0a0a',
                  color: '#f5f5f0',
                  padding: '12px 28px',
                  fontSize: 15,
                  fontFamily: '"Noto Sans TC", sans-serif',
                }}
              >
                預留您的座位
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* ==================== MOBILE LAYOUT (vertical stack) ==================== */}
          <div className="flex flex-col sm:hidden">
            {/* 1. Top header: 免費入場 */}
            <div
              className="flex items-center justify-center py-4"
              style={{
                background: '#1a1a1a',
                borderBottom: '2px dashed rgba(255,255,255,0.2)',
              }}
            >
              <span
                style={{
                  fontFamily: '"Noto Sans TC", "Arial Black", sans-serif',
                  fontWeight: 900,
                  fontSize: 22,
                  color: '#f5f5f0',
                  letterSpacing: '0.1em',
                }}
              >
                免費入場
              </span>
            </div>

            {/* 2. Theme image */}
            <div className="w-full">
              <img
                src="/images/hero-banner.jpg"
                alt="啟示錄的鑰匙"
                className="w-full object-cover"
                style={{ aspectRatio: '4/5', maxHeight: 400 }}
              />
            </div>

            {/* 3. Orange panel: 立即報名！ */}
            <div
              className="flex flex-col items-center text-center py-8 px-6"
              style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }}
            >
              <p
                style={{
                  fontFamily: '"Noto Sans TC", "Arial Black", sans-serif',
                  fontWeight: 900,
                  fontSize: 32,
                  color: '#ffffff',
                  lineHeight: 1.1,
                }}
              >
                立即報名！
              </p>
              <Link
                to="/register#register-header"
                className="w-full flex items-center justify-center gap-3 rounded-full font-bold transition-all hover:brightness-95 mt-6"
                style={{
                  background: '#ffffff',
                  color: '#1a1a1a',
                  padding: '16px 24px',
                  fontSize: 16,
                  fontFamily: '"Noto Sans TC", sans-serif',
                  maxWidth: 320,
                }}
              >
                預留您的座位
                <span
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: 32,
                    height: 32,
                    background: '#1a1a1a',
                  }}
                >
                  <ArrowUpRight size={16} color="#ffffff" />
                </span>
              </Link>
            </div>

            {/* 4. Black bar: 領取您的免費禮物 */}
            <div
              className="flex items-center gap-4 px-6 py-4"
              style={{
                background: '#1a1a1a',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <img
                src="/images/book-gift.png"
                alt="免費禮物"
                className="rounded"
                style={{
                  width: 52,
                  height: 74,
                  objectFit: 'cover',
                }}
              />
              <span
                style={{
                  fontFamily: '"Noto Sans TC", "Arial Black", sans-serif',
                  fontWeight: 900,
                  fontSize: 18,
                  color: '#f5f5f0',
                  letterSpacing: '0.02em',
                }}
              >
                領取您的免費禮物
              </span>
            </div>
          </div>

          {/* ==================== DESKTOP BOTTOM GIFT BAR ==================== */}
          <div
            className="hidden sm:flex items-center gap-4 px-6 py-3"
            style={{
              background: '#1a1a1a',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <img
              src="/images/book-gift.png"
              alt="免費禮物"
              className="rounded"
              style={{
                width: 48,
                height: 68,
                objectFit: 'cover',
              }}
            />
            <span
              style={{
                fontFamily: '"Noto Sans TC", "Arial Black", sans-serif',
                fontWeight: 700,
                fontSize: 16,
                color: '#f5f5f0',
                letterSpacing: '0.02em',
              }}
            >
              領取您的免費禮物
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
