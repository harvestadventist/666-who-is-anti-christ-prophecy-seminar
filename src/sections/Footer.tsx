import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        zIndex: 1,
        padding: '60px 0 30px',
      }}
    >
      <div className="content-container">
        {/* Brand — centered */}
        <div className="flex justify-center mb-10">
          <div className="leading-none text-center">
            <div
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontWeight: 900,
                fontSize: 24,
                color: '#f5f5f0',
              }}
            >
              666
            </div>
            <div
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontWeight: 900,
                fontSize: 32,
                letterSpacing: '0.02em',
                color: '#f5f5f0',
              }}
            >
              誰是敵基督
            </div>
          </div>
        </div>

        {/* Links row — matching reference image layout */}
        <div className="flex justify-center gap-16 sm:gap-24 mb-10">
          {/* Quick Links */}
          <div>
            <p
              className="mb-2"
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontWeight: 700,
                fontSize: 14,
                color: '#f5f5f0',
              }}
            >
              快速連結
            </p>
            <a
              href="https://wa.me/+44184158"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-[#f5f5f0]"
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontSize: 14,
                color: '#8a8a82',
              }}
            >
              聯絡我們
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Social */}
          <div>
            <p
              className="mb-2"
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontWeight: 700,
                fontSize: 14,
                color: '#f5f5f0',
              }}
            >
              社交媒體
            </p>
            <a
              href="https://www.meetup.com/liveitup-people/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-[#f5f5f0]"
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontSize: 14,
                color: '#8a8a82',
              }}
            >
              Meetup
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-center"
          style={{
            marginTop: 40,
            paddingTop: 20,
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <p
            style={{
              fontFamily: '"Noto Sans TC", sans-serif',
              fontSize: 12,
              color: 'rgba(138,138,130,0.5)',
            }}
          >
            豐盛復臨中心版權所有 &copy; 2026。保留一切權利。
          </p>
        </div>
      </div>
    </footer>
  );
}
