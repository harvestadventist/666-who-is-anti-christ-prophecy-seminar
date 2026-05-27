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
    address: '旺角彌敦道612至618號好望角大廈9樓百本人才培訓學院',
    showTime: false,
    time: '',
    showButton: true,
  },
  {
    showCity: false,
    city: '',
    showDate: true,
    date: '8月9日 (第一場)',
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
    date: '8月9日 (第二場)',
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
    date: '8月10日 (第三場)',
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
    date: '8月11日 (第四場)',
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
    date: '8月12日 (第五場)',
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
        className="content-container relative flex flex-col lg:flex-row gap-8"
        style={{ zIndex: 1 }}
      >
        {/* Left Panel */}
        <div ref={leftRef} className="w-full lg:w-[35%]">
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
                      to="/register"
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
        <div ref={rightRef} className="w-full lg:w-[65%]">
          <div
            className="w-full h-full rounded-2xl overflow-hidden"
            style={{
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.08)',
              minHeight: 500,
            }}
          >
            <iframe
              title="聚會地點地圖"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0781!2d114.1694!3d22.3173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340400c7b5e0c65f%3A0x2e68ef8c6537b33f!2z5YWs6Jek6YGT5bqc6Jm55aSn5YWr5a6J5aSn6IKy5Y6f5qGf6JGj5qGf6KGT!5e0!3m2!1szh-TW!2shk!4v1700000000000!5m2!1szh-TW!2shk&q=%E6%97%BA%E8%A7%92%E5%BD%8C%E6%95%A6%E9%81%93612%E8%87%B3618%E8%99%9F%E5%A5%BD%E6%9C%9B%E8%A7%92%E5%A4%A7%E5%BB%88"
              className="w-full h-full"
              style={{
                minHeight: 500,
                border: 0,
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
