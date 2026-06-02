import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, ArrowUpRight, ChevronDown } from 'lucide-react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';

// STEP 1: Create a Google Sheet
// STEP 2: Deploy the Google Apps Script (Code.gs in google-apps-script folder)
// STEP 3: Paste the Web App URL below:
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwv-l9I4RPd8UQjUZvHZJl-XEZ68WRiuWiwbEY6nBfoxBbeYozr_gnsiH3vk9skKR_MTQ/exec';

const hearAboutOptions = [
  { key: 'flyer', label: '宣傳單張' },
  { key: 'social_media', label: '社交媒體' },
  { key: 'friend', label: '朋友' },
  { key: 'church', label: '教會' },
  { key: 'online_ads', label: '網上宣傳廣告' },
  { key: 'other', label: '其他' },
];

const guestOptions = ['0', '1', '2', '3', '4', '5+'];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guests: string;
  hearAbout: string[];
  otherSource: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  hearAbout?: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guests: '0',
    hearAbout: [],
    otherSource: '',
  });

  const isOtherSelected = form.hearAbout.includes('other');
  const location = useLocation();

  // Scroll to register-header hash when navigating
  useEffect(() => {
    if (location.hash === '#register-header') {
      window.scrollTo(0, 0);
      setTimeout(() => {
        const el = document.getElementById('register-header');
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const toggleHearAbout = useCallback((key: string) => {
    setForm(prev => {
      const next = prev.hearAbout.includes(key)
        ? prev.hearAbout.filter(k => k !== key)
        : [...prev.hearAbout, key];
      return { ...prev, hearAbout: next };
    });
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = '請輸入名字';
    if (!form.lastName.trim()) newErrors.lastName = '請輸入姓氏';
    if (!form.phone.trim()) newErrors.phone = '請輸入電話號碼';
    if (form.hearAbout.length === 0) newErrors.hearAbout = '請至少選擇一項';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const hearAboutStr = form.hearAbout.join(', ');
      const params = new URLSearchParams();
      params.append('firstName', form.firstName);
      params.append('lastName', form.lastName);
      params.append('email', form.email);
      params.append('phone', form.phone);
      params.append('guests', form.guests);
      params.append('hearAbout', hearAboutStr);
      params.append('otherSource', form.otherSource);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: params,
      });
      const result = await response.json();
      if (result.status === 'ok') {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitError('提交失敗，請稍後再試。');
      }
    } catch (err) {
      setSubmitError('網絡連接失敗，請稍後再試。');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${hasError ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.12)'}`,
    borderRadius: 8,
    padding: '12px 16px',
    color: '#f5f5f0',
    fontFamily: '"Noto Sans TC", sans-serif',
    fontSize: 15,
    outline: 'none',
    transition: 'border-color 0.2s',
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: '"Noto Sans TC", sans-serif',
    fontSize: 14,
    fontWeight: 500,
    color: '#f5f5f0',
    marginBottom: 8,
    display: 'block',
  };

  if (submitted) {
    return (
      <div>
        <Navbar />
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: '#0a0a0a', padding: '120px 20px 60px' }}
        >
          <div
            className="text-center"
            style={{
              maxWidth: 520,
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '60px 40px',
            }}
          >
            <div
              className="mx-auto mb-6 flex items-center justify-center rounded-full"
              style={{
                width: 64,
                height: 64,
                background: 'rgba(245,158,11,0.15)',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                color: '#f5f5f0',
                lineHeight: 1.2,
                textWrap: 'balance',
              }}
            >
              報名成功！
            </h1>
            <p
              className="mt-4"
              style={{
                fontFamily: '"Noto Sans TC", sans-serif',
                fontSize: 16,
                color: '#8a8a82',
                lineHeight: 1.7,
              }}
            >
              感謝您的報名，{form.firstName}！我們已收到您的座位預留申請，並為您準備了免費禮物。請留意您的電子郵件收件匣，我們將發送確認信給您。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all hover:brightness-110"
                style={{
                  background: '#f59e0b',
                  color: '#0a0a0a',
                  padding: '12px 28px',
                  fontSize: 14,
                  fontFamily: '"Noto Sans TC", sans-serif',
                }}
              >
                <ArrowLeft size={14} />
                返回首頁
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen" style={{ background: '#0a0a0a', paddingTop: 72 }}>
        <div className="content-container py-10 lg:py-16">
          <div
            className="flex flex-col lg:flex-row overflow-hidden"
            style={{
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              minHeight: 'calc(100vh - 200px)',
            }}
          >
            {/* Left Panel */}
            <div
              className="w-full lg:w-[38%] p-8 lg:p-10 flex flex-col justify-center"
              style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}
            >
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 mb-10 transition-colors hover:text-[#f5f5f0]"
                style={{
                  fontFamily: '"Noto Sans TC", sans-serif',
                  fontSize: 14,
                  color: '#8a8a82',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <ArrowLeft size={16} />
                返回
              </button>

              <h1
                id="register-header"
                style={{
                  fontFamily: '"Noto Sans TC", sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#f5f5f0',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  textWrap: 'balance',
                }}
              >
                預留您的座位
                <br />
                並領取
                <br />
                <span style={{ color: '#f59e0b' }}>免費禮物！</span>
              </h1>

              <img
                src="/images/book-gift.png"
                alt="免費禮物"
                className="mt-8 rounded-lg hidden lg:block"
                style={{
                  width: 120,
                  height: 170,
                  objectFit: 'cover',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                }}
              />
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-[62%] p-8 lg:p-10 overflow-y-auto">
              <form onSubmit={handleSubmit} noValidate>
                {/* Step 1 */}
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="flex items-center justify-center rounded-lg font-bold"
                    style={{
                      width: 28,
                      height: 28,
                      background: 'rgba(245,158,11,0.2)',
                      color: '#f59e0b',
                      fontSize: 14,
                      fontFamily: '"Noto Sans TC", sans-serif',
                    }}
                  >
                    1
                  </span>
                  <h2
                    style={{
                      fontFamily: '"Noto Sans TC", sans-serif',
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#f5f5f0',
                    }}
                  >
                    填寫您的資訊
                  </h2>
                </div>
                <p
                  className="mb-6 ml-10"
                  style={{
                    fontFamily: '"Noto Sans TC", sans-serif',
                    fontSize: 14,
                    color: '#8a8a82',
                  }}
                >
                  請在下方提供這些詳細資訊以完成報名。
                </p>

                {/* Name Row */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <label style={labelStyle}>
                      名字<span style={{ color: '#f59e0b' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="請輸入名字"
                      value={form.firstName}
                      onChange={e => setForm(prev => ({ ...prev, firstName: e.target.value }))}
                      style={inputStyle(!!errors.firstName)}
                      onFocus={e => { if (!errors.firstName) e.target.style.borderColor = 'rgba(245,158,11,0.5)'; }}
                      onBlur={e => { if (!errors.firstName) e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                    />
                    {errors.firstName && (
                      <p className="mt-1" style={{ fontSize: 12, color: '#ef4444' }}>{errors.firstName}</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label style={labelStyle}>
                      姓氏<span style={{ color: '#f59e0b' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="請輸入姓氏"
                      value={form.lastName}
                      onChange={e => setForm(prev => ({ ...prev, lastName: e.target.value }))}
                      style={inputStyle(!!errors.lastName)}
                      onFocus={e => { if (!errors.lastName) e.target.style.borderColor = 'rgba(245,158,11,0.5)'; }}
                      onBlur={e => { if (!errors.lastName) e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                    />
                    {errors.lastName && (
                      <p className="mt-1" style={{ fontSize: 12, color: '#ef4444' }}>{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label style={labelStyle}>電子郵件</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                    style={inputStyle(false)}
                    onFocus={e => { e.target.style.borderColor = 'rgba(245,158,11,0.5)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  />
                </div>

                {/* Phone */}
                <div className="mb-8">
                  <label style={labelStyle}>
                    電話號碼<span style={{ color: '#f59e0b' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="請輸入電話號碼"
                    value={form.phone}
                    onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    style={inputStyle(!!errors.phone)}
                    onFocus={e => { if (!errors.phone) e.target.style.borderColor = 'rgba(245,158,11,0.5)'; }}
                    onBlur={e => { if (!errors.phone) e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  />
                  {errors.phone && (
                    <p className="mt-1" style={{ fontSize: 12, color: '#ef4444' }}>{errors.phone}</p>
                  )}
                </div>

                {/* Divider */}
                <div className="mb-8" style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />

                {/* Step 2 */}
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="flex items-center justify-center rounded-lg font-bold"
                    style={{
                      width: 28,
                      height: 28,
                      background: 'rgba(245,158,11,0.2)',
                      color: '#f59e0b',
                      fontSize: 14,
                      fontFamily: '"Noto Sans TC", sans-serif',
                    }}
                  >
                    2
                  </span>
                  <h2
                    style={{
                      fontFamily: '"Noto Sans TC", sans-serif',
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#f5f5f0',
                    }}
                  >
                    出席詳情
                  </h2>
                </div>
                <p
                  className="mb-6 ml-10"
                  style={{
                    fontFamily: '"Noto Sans TC", sans-serif',
                    fontSize: 14,
                    color: '#8a8a82',
                  }}
                >
                  請提供這些額外的詳細資訊。
                </p>

                {/* Guests dropdown */}
                <div className="mb-6">
                  <label style={labelStyle}>您會帶其他朋友或家人參加？</label>
                  <div className="relative">
                    <select
                      value={form.guests}
                      onChange={e => setForm(prev => ({ ...prev, guests: e.target.value }))}
                      style={{
                        ...inputStyle(false),
                        appearance: 'none',
                        paddingRight: 40,
                        cursor: 'pointer',
                        color: '#f5f5f0',
                        backgroundColor: '#1a1a1a',
                      }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(245,158,11,0.5)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                    >
                      {guestOptions.map(opt => (
                        <option key={opt} value={opt} style={{ backgroundColor: '#1a1a1a', color: '#f5f5f0' }}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      color="#8a8a82"
                    />
                  </div>
                </div>

                {/* Hear About */}
                <div className="mb-8">
                  <label style={labelStyle}>
                    您是如何得知我們的？（可複選）
                    <span style={{ color: '#f59e0b' }}>*</span>
                  </label>
                  <div className="flex flex-col gap-3">
                    {hearAboutOptions.map(opt => (
                      <div key={opt.key}>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <div
                            className="flex items-center justify-center shrink-0 transition-all"
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 4,
                              border: form.hearAbout.includes(opt.key)
                                ? '2px solid #f59e0b'
                                : '2px solid rgba(255,255,255,0.25)',
                              background: form.hearAbout.includes(opt.key)
                                ? '#f59e0b'
                                : 'transparent',
                            }}
                            onClick={() => toggleHearAbout(opt.key)}
                          >
                            {form.hearAbout.includes(opt.key) && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <span
                            style={{
                              fontFamily: '"Noto Sans TC", sans-serif',
                              fontSize: 15,
                              color: '#f5f5f0',
                            }}
                          >
                            {opt.label}
                          </span>
                        </label>
                        {opt.key === 'other' && isOtherSelected && (
                          <div className="mt-2 ml-8">
                            <input
                              type="text"
                              placeholder="請說明..."
                              value={form.otherSource}
                              onChange={e => setForm(prev => ({ ...prev, otherSource: e.target.value }))}
                              style={inputStyle(false)}
                              onFocus={e => { e.target.style.borderColor = 'rgba(245,158,11,0.5)'; }}
                              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {errors.hearAbout && (
                    <p className="mt-2" style={{ fontSize: 12, color: '#ef4444' }}>{errors.hearAbout}</p>
                  )}
                </div>

                {/* Error message */}
                {submitError && (
                  <p className="mb-4" style={{ fontSize: 14, color: '#ef4444' }}>{submitError}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  id="submit-btn"
                  className="flex items-center justify-center gap-2 rounded-full font-bold transition-all hover:brightness-110 w-full"
                  style={{
                    background: '#f59e0b',
                    color: '#0a0a0a',
                    padding: '14px 32px',
                    fontSize: 15,
                    fontFamily: '"Noto Sans TC", sans-serif',
                    border: 'none',
                    cursor: submitting ? 'wait' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? '提交中...' : '預留您的座位'}
                  <ArrowUpRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
