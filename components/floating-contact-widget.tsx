'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Phone,
  Check,
  Sparkles,
  ShieldCheck,
  Headphones,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface ContactApp {
  id: string;
  name: string;
  subtext: string;
  color: string;
  hoverBorder: string;
  textColor: string;
  bgBadge: string;
  url: string;
  iconSvg: React.ReactNode;
}

export function FloatingContactWidget() {
  const { locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [whatsappPhone, setWhatsappPhone] = useState('+84 90 888 9999');

  useEffect(() => {
    try {
      const savedPhone = localStorage.getItem('laura_whatsapp');
      if (savedPhone) setWhatsappPhone(savedPhone);
    } catch {}
  }, []);

  const cleanDigits = whatsappPhone.replace(/[^0-9]/g, '');

  const contactApps: ContactApp[] = [
    {
      id: 'telegram',
      name: 'Telegram',
      subtext: '@laurabookingbot',
      color: 'from-[#2AABEE] to-[#229ED9]',
      hoverBorder: 'hover:border-[#229ED9]',
      textColor: 'text-[#229ED9]',
      bgBadge: 'bg-[#229ED9]/15 text-[#229ED9]',
      url: 'https://t.me/laurabookingbot',
      iconSvg: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 3.98-1.73 6.64-2.87 7.97-3.44 3.79-1.62 4.58-1.9 5.09-1.91.11 0 .37.03.54.18.14.12.18.28.2.45-.02.07-.02.13-.03.22z" />
        </svg>
      ),
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      subtext: whatsappPhone,
      color: 'from-[#25D366] to-[#128C7E]',
      hoverBorder: 'hover:border-[#25D366]',
      textColor: 'text-[#25D366]',
      bgBadge: 'bg-[#25D366]/15 text-[#25D366]',
      url: `https://wa.me/${cleanDigits || '84908889999'}?text=${encodeURIComponent(
        locale === 'vi'
          ? 'Xin chào Quản gia LAURA, tôi muốn tư vấn đặt chỗ dịch vụ VIP.'
          : 'Hello LAURA Concierge, I would like to inquire about VIP services.'
      )}`,
      iconSvg: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.07c-.24.67-1.39 1.29-1.92 1.38-.5.08-1.14.12-3.69-.94-3.26-1.36-5.35-4.66-5.51-4.88-.16-.22-1.32-1.76-1.32-3.36 0-1.6 1.04-2.39 1.41-2.71.37-.32.81-.4 1.08-.4.27 0 .54.01.78.02.25.01.58-.09.91.7.34.82 1.16 2.83 1.26 3.04.1.21.17.46.03.73-.14.27-.21.44-.42.68-.21.24-.44.54-.63.73-.21.21-.43.44-.19.86.25.42 1.09 1.8 2.34 2.92 1.61 1.43 2.97 1.88 3.39 2.09.42.21.67.18.92-.1.25-.28 1.08-1.26 1.37-1.69.29-.43.58-.36.98-.21.4.15 2.53 1.19 2.97 1.41.44.22.73.33.84.51.11.18.11 1.05-.13 1.72z" />
        </svg>
      ),
    },
    {
      id: 'line',
      name: 'Line',
      subtext: 'Laura Booking',
      color: 'from-[#06C755] to-[#00B900]',
      hoverBorder: 'hover:border-[#06C755]',
      textColor: 'text-[#06C755]',
      bgBadge: 'bg-[#06C755]/15 text-[#06C755]',
      url: `https://line.me/ti/p/~laurabooking`,
      iconSvg: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M22 10.5C22 5.8 17.5 2 12 2S2 5.8 2 10.5c0 4.2 3.6 7.7 8.5 8.3.3.1.8.2.9.6.1.3.1.8 0 1.1-.1.5-.6 2-.7 2.4-.1.6.2.6.5.4 1.6-1.1 4.3-3.1 5.9-4.3 3.1-1.7 4.9-4.6 4.9-7.5zM8.8 13.5H6.5c-.3 0-.5-.2-.5-.5V8.5c0-.3.2-.5.5-.5s.5.2.5.5V12.5h1.8c.3 0 .5.2.5.5s-.2.5-.5.5zm2.4 0c-.3 0-.5-.2-.5-.5V8.5c0-.3.2-.5.5-.5s.5.2.5.5v4.5c0 .3-.2.5-.5.5zm5.7 0c-.3 0-.5-.2-.5-.5V10.2l-2 3.1c-.1.2-.3.2-.5.2-.3 0-.5-.2-.5-.5V8.5c0-.3.2-.5.5-.5s.5.2.5.5v2.8l2-3.1c.1-.2.3-.2.5-.2.3 0 .5.2.5.5v4.5c0 .3-.2.5-.5.5zm3.1-4c0 .3-.2.5-.5.5h-1.8v1h1.8c.3 0 .5.2.5.5s-.2.5-.5.5h-1.8v1h1.8c.3 0 .5.2.5.5s-.2.5-.5.5h-2.3c-.3 0-.5-.2-.5-.5V8.5c0-.3.2-.5.5-.5h2.3c.3 0 .5.2.5.5s-.2.5-.5.5z" />
        </svg>
      ),
    },
    {
      id: 'kakaotalk',
      name: 'KakaoTalk',
      subtext: 'Laura VIP',
      color: 'from-[#FEE500] to-[#FADA0A]',
      hoverBorder: 'hover:border-[#FEE500]',
      textColor: 'text-[#FEE500]',
      bgBadge: 'bg-[#FEE500]/15 text-[#FEE500]',
      url: 'https://open.kakao.com',
      iconSvg: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 3c-5.52 0-10 3.58-10 8 0 2.82 1.83 5.3 4.63 6.72-.2.74-.74 2.68-.85 3.09-.13.51.19.5.39.37.16-.1 2.5-1.7 3.51-2.39.75.11 1.52.17 2.32.17 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
        </svg>
      ),
    },
  ];

  const handleCopyPhone = () => {
    try {
      navigator.clipboard.writeText(whatsappPhone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <>
      {/* 1. STICKY FLOATING TRIGGER BUTTON (Fixed bottom-6 right-6 with 3s luxury wiggle) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Subtle Tooltip on Hover */}
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a0a0a]/90 backdrop-blur-md border border-[var(--gold)]/30 text-[var(--gold-light)] text-xs font-medium shadow-xl pointer-events-none transition-all">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{locale === 'vi' ? 'Quản Gia 24/7' : 'Private Host 24/7'}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open contact channels"
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#b79051] via-[#e3c98d] to-[#b68b4b] p-[2px] shadow-2xl shadow-[var(--gold)]/30 hover:scale-105 active:scale-95 transition-transform animate-luxury-wiggle cursor-pointer group"
        >
          {/* Core Dark Orb */}
          <div className="w-full h-full rounded-full bg-[#0c0c0c] flex items-center justify-center text-[var(--gold-light)] group-hover:bg-[#151515] transition-colors relative overflow-hidden">
            {/* Ambient Shine */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--gold)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {isOpen ? (
              <X size={24} className="text-white transition-transform rotate-0" />
            ) : (
              <MessageCircle size={26} className="text-[var(--gold)] group-hover:scale-110 transition-transform" />
            )}
          </div>

          {/* Active Online Pulse Dot */}
          <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0c0c0c] animate-ping" />
          <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0c0c0c]" />
        </button>
      </div>

      {/* 2. EXPANDED HORIZONTAL BAR IN CENTER WITH ULTRA-SMOOTH ANIMATION */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#0c0c0c] border border-[var(--gold)]/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[var(--gold)]/10 space-y-6 relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-[#888] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="text-center space-y-1.5 pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold-light)] text-[0.65rem] tracking-[0.22em] uppercase font-mono font-bold">
                <Sparkles size={12} className="text-[var(--gold)]" />
                <span>{locale === 'vi' ? 'QUẢN GIA RIÊNG 24/7 · KẾT NỐI TỨC THÌ' : '24/7 PRIVATE HOST CONCIERGE'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-wide">
                {locale === 'vi' ? 'Liên Hệ Trực Tiếp Quản Gia' : 'Direct Host Connect'}
              </h3>
              <p className="text-xs sm:text-sm text-[#888] max-w-md mx-auto leading-relaxed">
                {locale === 'vi'
                  ? 'Chọn ứng dụng bạn quen thuộc để kết nối trực tiếp với Quản gia riêng của Laura Booking.'
                  : 'Choose your preferred messaging channel to connect with your private Laura host immediately.'}
              </p>
            </div>

            {/* 4 MESSAGING APPS IN A SLEEK HORIZONTAL ROW */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 pt-2">
              {contactApps.map((app) => (
                <a
                  key={app.id}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-[#121212] border border-white/10 ${app.hoverBorder} hover:bg-[#181818] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden`}
                >
                  {/* Subtle hover gradient wash */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${app.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Icon Container */}
                  <div
                    className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr ${app.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 mb-3`}
                  >
                    {app.iconSvg}
                  </div>

                  <span className="text-sm font-semibold text-white group-hover:text-[var(--gold-light)] transition-colors">
                    {app.name}
                  </span>

                  <span className="text-[0.68rem] text-[#777] block mt-0.5 truncate max-w-full font-mono">
                    {app.subtext}
                  </span>

                  <span className="mt-2.5 inline-flex items-center gap-1 text-[0.65rem] font-bold text-[var(--gold)] opacity-80 group-hover:opacity-100 uppercase tracking-wider">
                    <span>{locale === 'vi' ? 'Kết nối' : 'Connect'}</span>
                    <ExternalLink size={10} />
                  </span>
                </a>
              ))}
            </div>

            {/* Direct Phone Call & Copy Footer Strip */}
            <div className="p-4 rounded-2xl bg-black/60 border border-[var(--gold)]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] shrink-0">
                  <Phone size={18} />
                </div>
                <div className="text-left">
                  <span className="text-[0.68rem] uppercase tracking-wider text-[#888] block font-mono">
                    {locale === 'vi' ? 'HOTLINE QUẢN GIA TỐC HÀNH' : 'DIRECT HOST HOTLINE'}
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wider">
                    {whatsappPhone}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#ccc] hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? (locale === 'vi' ? 'Đã chép số' : 'Copied') : (locale === 'vi' ? 'Sao chép số' : 'Copy')}</span>
                </button>

                <a
                  href={`tel:${cleanDigits || '+84908889999'}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] text-[#090704] text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Phone size={13} />
                  <span>{locale === 'vi' ? 'Gọi Ngay' : 'Call Now'}</span>
                </a>
              </div>
            </div>

            {/* NDA Privacy Assurance */}
            <div className="text-center flex items-center justify-center gap-1.5 text-[0.7rem] text-[#666] pt-1">
              <ShieldCheck size={13} className="text-[var(--gold)]" />
              <span>{locale === 'vi' ? '100% Bảo mật thông tin thượng khách theo chuẩn NDA Hoàng Gia' : '100% Confidential under Royal NDA Protocols'}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
