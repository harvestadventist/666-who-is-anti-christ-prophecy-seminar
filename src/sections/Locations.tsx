import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Clock, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LocationBlock {
  showCity: boolean;
  city: string;
  showDate: boolean;
  date: string;
  showAddress: boolean;
  address: string;
  showTime: boolean;
  time: string;
  showButton: boolean;
}

const locations: LocationBlock[] = [
  {
    showCity: true,
    city: '旺角',
    showDate: false,
    date: '',
    showAddress: true,
    address: '旺角彌敦道612至618號好望角大廈9樓百本人才培訓學院 (旺角地鐵站E2出口 - 2分鐘步行)',
    showTime: false,
    time: '',
    showButton: true,
  },
  {
    showCity: false,
    city: '',
    showDate: true,
    date: '8月9日 (第一場) - 誰是基督?',
    showAddress: false,
    address: '',
    showTime: true,
    time: '3:00 PM - 4:30 PM',
    showButton: false,
  },
  {
    showCity: false,
    city: '',
    showDate: true,
    date: '8月9日 (第二場) - 誰是敵基督?',
    showAddress: false,
    address: '',
    showTime: true,
    time: '6:00 PM - 7:30 PM',
    showButton: false,
  },
  {
    showCity: false,
    city: '',
    showDate: true,
    date: '8月10日 (第三場) - 聖經的666是什麼?',
    showAddress: false,
    address: '',
    showTime: true,
    time: '7:30 PM - 9:00 PM',
    showButton: false,
  },
  {
    showCity: false,
    city: '',
    showDate: true,
    date: '8月11日 (第四場) - 誰是144,000人?',
    showAddress: false,
    address: '',
    showTime: true,
    time: '7:30 PM - 9:00 PM',
    showButton: false,
  },
  {
    showCity: false,
    city: '',
    showDate: true,
    date: '8月12日 (第五場) - 善惡之爭誰會得勝?',
    showAddress: false,
    address: '',
    showTime: true,
    time: '7:30 PM - 9:00 PM',
    showButton: false,
  },
];

export default function Locations() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    gsap.fromTo(
      left,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      right,
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
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
      id="locations"
      ref={sectionRef}
      className="section-padding"
      style={{ background: '#0a0a0a', position: 'relative', zIndex: 1 }}
    >
      {/* Clouds Banner Top */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 200, overflow: 'hidden', zIndex: 0 }}
      >
        <img
          src="/images/clouds-banner.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.4 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,10,0) 0%, #0a0a0a 100%)',
          }}
        />
      </div>

      <div
        className="content-container relative flex flex-col lg:flex-row lg:items-stretch gap-8"
        style={{ zIndex: 1 }}
      >
        {/* Left Panel */}
        <div ref={leftRef} className="w-full lg:w-[35%] flex flex-col">
          <h2
            style={{
              fontFamily: '"Noto Sans TC", "PingFang TC", sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#f5f5f0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textWrap: 'balance',
              marginBottom: 24,
            }}
          >
            聚會地點和日期！
          </h2>

          {/* Section Label */}
          <p
            className="mb-3"
            style={{
              fontFamily: '"Noto Sans TC", sans-serif',
              fontWeight: 700,
              fontSize: 14,
              color: '#8a8a82',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            活動地點
          </p>

          {/* Location Cards */}
          <div className="flex flex-col gap-3">
            {locations.map((loc, i) => (
              <div
                key={i}
                style={{
                  background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  padding: '16px 20px',
                }}
              >
                {loc.showCity && (
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} color="#f59e0b" />
                    <span
                      style={{
                        fontFamily: '"Noto Sans TC", sans-serif',
                        fontWeight: 700,
                        fontSize: 20,
                        color: '#f5f5f0',
                      }}
                    >
                      {loc.city}
                    </span>
                  </div>
                )}

                {loc.showDate && (
                  <span
                    className="inline-block mb-2"
                    style={{
                      background: 'rgba(245,158,11,0.15)',
                      color: '#f59e0b',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: '"Noto Sans TC", sans-serif',
                    }}
                  >
                    <Calendar size={12} className="inline mr-1" />
                    {loc.date}
                  </span>
                )}

                {loc.showAddress && (
                  <p
                    style={{
                      fontFamily: '"Noto Sans TC", sans-serif',
                      fontSize: 14,
                      color: '#8a8a82',
                      lineHeight: 1.5,
                      marginBottom: 4,
                    }}
                  >
                    {loc.address}
                  </p>
                )}

                {loc.showTime && (
                  <p
                    style={{
                      fontFamily: '"Noto Sans TC", sans-serif',
                      fontSize: 14,
                      color: '#8a8a82',
                      lineHeight: 1.5,
                    }}
                  >
                    <Clock size={14} className="inline mr-1" />
                    {loc.time}
                  </p>
                )}

                {loc.showButton && (
                  <div className="flex items-center gap-4 mt-3">
                    <Link
                      to="/register#register-header"
                      className="inline-flex items-center gap-1 rounded-full font-bold"
                      style={{
                        background: '#f59e0b',
                        color: '#0a0a0a',
                        padding: '6px 14px',
                        fontSize: 12,
                        fontFamily: '"Noto Sans TC", sans-serif',
                      }}
                    >
                      立即報名
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Map with red marker */}
        <div ref={rightRef} className="w-full lg:w-[65%] lg:self-stretch">
          <div
            className="w-full h-full rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <iframe
              title="聚會地點地圖"
              src="https://maps.google.com/maps?saddr=%E7%B5%95%E5%91%B3%20Juewei%20HK%20%E4%B9%9D%E9%BE%8D%20%E6%97%BA%E8%A7%92%20%E6%97%BA%E8%A7%92%E6%B8%AF%E9%90%B5%E6%97%BA%E8%A7%92%E7%AB%99MOK25%E8%99%9F%E8%88%96&daddr=%E6%97%BA%E8%A7%92%E5%BD%8C%E6%95%A6%E9%81%93612%E8%87%B3618%E8%99%9F%E5%A5%BD%E6%9C%9B%E8%A7%92%E5%A4%A7%E5%BB%88&output=embed"
              className="w-full flex-1"
              style={{
                minHeight: 300,
                border: 0,
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://www.google.com/maps/dir/?api=1&origin=%E7%B5%95%E5%91%B3%20Juewei%20HK%20%E4%B9%9D%E9%BE%8D%20%E6%97%BA%E8%A7%92%20%E6%97%BA%E8%A7%92%E6%B8%AF%E9%90%B5%E6%97%BA%E8%A7%92%E7%AB%99MOK25%E8%99%9F%E8%88%96&destination=%E6%97%BA%E8%A7%92%E5%BD%8C%E6%95%A6%E9%81%93612%E8%87%B3618%E8%99%9F%E5%A5%BD%E6%9C%9B%E8%A7%92%E5%A4%A7%E5%BB%88&travelmode=walking"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 transition-colors hover:bg-white/5 shrink-0"
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontSize: 14,
                fontWeight: 600,
                color: '#f59e0b',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
              查看步行路線（旺角地鐵站 → 好望角大廈）
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
