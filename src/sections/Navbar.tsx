import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 72,
        background: scrolled
          ? 'rgba(10,10,10,0.6)'
          : 'linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0) 100%)',
        borderBottom: 'none',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        transition: 'background 0.4s ease',
      }}
    >
      <div className="content-container flex items-center justify-between w-full">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="leading-none">
            <div
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontWeight: 900,
                fontSize: 13,
                color: '#f5f5f0',
                lineHeight: 1,
              }}
            >
              666
            </div>
            <div
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontWeight: 900,
                fontSize: 15,
                letterSpacing: '0.02em',
                color: '#f5f5f0',
                lineHeight: 1.1,
              }}
            >
              誰是敵基督
            </div>
          </div>
          <span style={{ color: '#f5f5f0', fontSize: 13, fontWeight: 700 }}>|</span>
          <span
            style={{
              fontFamily: '"Noto Sans TC", sans-serif',
              fontWeight: 700,
              fontSize: 13,
              color: '#f5f5f0',
            }}
          >
            聖經預言講座
          </span>
        </Link>

        {/* Right CTA + Mobile Menu */}
        <div className="flex items-center gap-3">
          <Link
            to="/register"
            className="hidden sm:inline-flex items-center gap-2 rounded-full font-bold transition-all hover:brightness-110"
            style={{
              background: '#f59e0b',
              color: '#0a0a0a',
              padding: '10px 10px 10px 24px',
              fontSize: 14,
              fontFamily: '"Noto Sans TC", sans-serif',
            }}
          >
            立即報名
            <span
              className="flex items-center justify-center rounded-full"
              style={{
                width: 28,
                height: 28,
                background: '#0a0a0a',
                marginLeft: 4,
              }}
            >
              <ArrowUpRight size={14} color="#f5f5f0" />
            </span>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} color="#f5f5f0" /> : <Menu size={20} color="#f5f5f0" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed top-[72px] left-0 right-0 p-6 flex flex-col gap-4"
          style={{
            background: 'rgba(10,10,10,0.95)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 rounded-full font-bold"
            style={{
              background: '#f59e0b',
              color: '#0a0a0a',
              padding: '12px 24px',
              fontSize: 14,
            }}
            onClick={() => setMobileOpen(false)}
          >
            立即報名
            <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </nav>
  );
}
