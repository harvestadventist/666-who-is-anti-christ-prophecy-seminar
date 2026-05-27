import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: '誰可以參加這個研討會？',
    answer:
      '這個研討會歡迎所有信仰和背景的人參加。無論您是剛開始信仰之旅，還是已經研究聖經預言數十年，這個研討會都將加強、激勵和教育您的信仰。歡迎所有人參加！',
  },
  {
    question: '為什麼要研究啟示錄？',
    answer:
      '啟示錄揭示了關於我們世界未來的深刻真理，並為今天的生活提供了盼望和平安。理解這本書可以幫助您看到歷史的大圖景，並在動盪的時代中找到確定性。',
  },
  {
    question: '我們的信仰是什麼？',
    answer:
      '我們相信聖經是神的話語，是信仰和實踐的權威。我們的研討會基於聖經的教導，旨在幫助人們更親近基督並理解祂為我們預備的未來。',
  },
  {
    question: '這個研討會真的是免費的嗎？',
    answer:
      '是的！這個研討會完全免費。我們相信每個人都應該有機會了解聖經預言，因此我們提供免費入場、免費材料，甚至還有免費禮物給所有參與者！',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    if (!section || !left) return;

    gsap.fromTo(
      left,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    const items = section.querySelectorAll('.faq-item');
    gsap.fromTo(
      items,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
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
      id="faq"
      ref={sectionRef}
      className="section-padding"
      style={{ background: '#0a0a0a', position: 'relative', zIndex: 1 }}
    >
      <div className="content-container flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left Column */}
        <div ref={leftRef} className="w-full lg:w-[30%]">
          <h2
            style={{
              fontFamily: '"Noto Sans TC", "PingFang TC", sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#f5f5f0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textWrap: 'balance',
            }}
          >
            常見問題
          </h2>
          <p
            className="mt-4"
            style={{
              fontFamily: '"Noto Sans TC", sans-serif',
              fontWeight: 400,
              fontSize: 16,
              color: '#8a8a82',
              lineHeight: 1.7,
            }}
          >
            如果您還有其他問題，請隨時與我們聯繫。
          </p>
          <a
            href="#contact"
            className="inline-block mt-3 transition-colors hover:underline"
            style={{
              fontFamily: '"Noto Sans TC", sans-serif',
              fontSize: 14,
              fontWeight: 600,
              color: '#f59e0b',
            }}
          >
            聯絡我們
          </a>
        </div>

        {/* Right Column - Accordion */}
        <div className="w-full lg:w-[70%]">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-item"
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                padding: '20px 0',
              }}
            >
              <button
                className="w-full flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ cursor: 'pointer' }}
              >
                <span
                  style={{
                    fontFamily: '"Noto Sans TC", sans-serif',
                    fontWeight: 600,
                    fontSize: 16,
                    color: '#f5f5f0',
                    paddingRight: 16,
                  }}
                >
                  {faq.question}
                </span>
                <Plus
                  size={20}
                  color="#8a8a82"
                  className="shrink-0 transition-transform duration-300"
                  style={{
                    transform:
                      openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-400"
                style={{
                  maxHeight: openIndex === i ? 300 : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <p
                  className="pt-3"
                  style={{
                    fontFamily: '"Noto Sans TC", sans-serif',
                    fontWeight: 400,
                    fontSize: 15,
                    color: '#8a8a82',
                    lineHeight: 1.7,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
