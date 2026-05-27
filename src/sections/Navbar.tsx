import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 72,
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
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
          <span className="hidden sm:inline text-[#8a8a82] text-xs">|</span>
          <span
            className="hidden sm:inline"
            style={{
              fontFamily: '"Noto Sans TC", sans-serif',
              fontWeight: 400,
              fontSize: 13,
              color: '#8a8a82',
            }}
          >
            聖經預言研討會
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
              padding: '10px 24px',
              fontSize: 14,
              fontFamily: '"Noto Sans TC", sans-serif',
            }}
          >
            立即報名
            <ArrowUpRight size={14} />
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
