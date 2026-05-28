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
        {/* Three Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="leading-none">
              <div
                style={{
                  fontFamily: '"Noto Sans TC", sans-serif',
                  fontWeight: 900,
                  fontSize: 13,
                  color: '#f5f5f0',
                }}
              >
                666
              </div>
              <div
                style={{
                  fontFamily: '"Noto Sans TC", sans-serif',
                  fontWeight: 900,
                  fontSize: 18,
                  letterSpacing: '0.02em',
                  color: '#f5f5f0',
                }}
              >
                誰是敵基督
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p
              className="mb-3"
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontWeight: 700,
                fontSize: 13,
                color: '#8a8a82',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              快速連結
            </p>
            <a
              href="#contact"
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
              className="mb-3"
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontWeight: 700,
                fontSize: 13,
                color: '#8a8a82',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              社交媒體
            </p>
            <a
              href="https://www.facebook.com/harvestadventistcentre/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-[#f5f5f0]"
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontSize: 14,
                color: '#8a8a82',
              }}
            >
              Facebook
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
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
