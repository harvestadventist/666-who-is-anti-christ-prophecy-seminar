import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        y: 8,
        duration: 2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  return (
    <>
      {/* ===================== DESKTOP ===================== */}
      <section
        id="hero"
        className="hidden sm:block relative w-full overflow-hidden"
        style={{ height: '100vh' }}
      >
        <img
          src="/images/hero-banner.jpg"
          alt="啟示錄的鑰匙"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0) 60%)',
            zIndex: 2,
          }}
        />
        <div
          className="absolute inset-0 flex items-end justify-center pb-24 px-5"
          style={{ zIndex: 3 }}
        >
          <div className="text-center max-w-xl">
            <h1
              style={{
                fontFamily: '"Noto Sans TC", "PingFang TC", sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#f5f5f0',
                textShadow: '0 2px 40px rgba(0,0,0,0.6)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                textWrap: 'balance',
              }}
            >
              免費聖經預言講座！
            </h1>
            <a
              href="#locations"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:brightness-110 mt-8"
              style={{
                background: '#f59e0b',
                color: '#0a0a0a',
                padding: '14px 32px',
                fontSize: 15,
                fontFamily: '"Noto Sans TC", sans-serif',
              }}
            >
              <MapPin size={16} />
              聚會地點
            </a>
          </div>
        </div>
        <div
          ref={chevronRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          style={{ zIndex: 3, opacity: 0.4 }}
        >
          <ChevronDown size={28} color="#f5f5f0" />
        </div>
      </section>

      {/* ===================== MOBILE ===================== */}
      <section
        id="hero-mobile"
        className="sm:hidden relative w-full"
        style={{ height: '100dvh' }}
      >
        {/* Image fills the entire viewport */}
        <img
          src="/images/hero-banner.jpg"
          alt="啟示錄的鑰匙"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0) 70%)',
            zIndex: 2,
          }}
        />

        {/* Yellow bar — pinned at bottom using flex, NOT absolute */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            zIndex: 10,
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            padding: '16px 30px 20px',
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="text-center">
              <p
                style={{
                  fontFamily: '"Noto Sans TC", sans-serif',
                  fontWeight: 700,
                  fontSize: 24,
                  color: '#0a0a0a',
                  lineHeight: 1.3,
                }}
              >
                免費聖經預言講座舉辦地點
              </p>
              <p
                style={{
                  fontFamily: '"Noto Sans TC", sans-serif',
                  fontSize: 17,
                  color: 'rgba(10,10,10,0.7)',
                  lineHeight: 1.4,
                  marginTop: 2,
                }}
              >
                歡迎親臨現場！
              </p>
            </div>
            <a
              href="#locations"
              className="flex items-center justify-center gap-3 rounded-full font-bold transition-all hover:brightness-110 w-full"
              style={{
                background: '#ffffff',
                color: '#0a0a0a',
                padding: '14px 8px 14px 24px',
                fontSize: 18,
                fontFamily: '"Noto Sans TC", sans-serif',
              }}
            >
              <span>搜尋聚會地點</span>
              <span
                className="flex items-center justify-center rounded-full shrink-0"
                style={{ width: 44, height: 44, background: '#f59e0b' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
