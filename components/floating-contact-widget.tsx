'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  X,
  ChevronRight,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface ContactApp {
  id: string;
  name: string;
  subtext: string;
  color: string;
  url: string;
  animationClass: string;
  iconSvg: React.ReactNode;
}

export function FloatingContactWidget() {
  const { locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const contactApps: ContactApp[] = [
    {
      id: 'telegram',
      name: 'Telegram',
      subtext: locale === 'vi' ? 'Chat trực tiếp Quản gia VIP (@laurabookingbot)' : 'Chat with Private Host (@laurabookingbot)',
      color: 'from-[#2AABEE] to-[#229ED9]',
      url: 'https://t.me/laurabookingbot',
      animationClass: 'animate-ios-spring-1',
      iconSvg: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 3.98-1.73 6.64-2.87 7.97-3.44 3.79-1.62 4.58-1.9 5.09-1.91.11 0 .37.03.54.18.14.12.18.28.2.45-.02.07-.02.13-.03.22z" />
        </svg>
      ),
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      subtext: locale === 'vi' ? 'Hỗ trợ tư vấn tức thì 24/7' : 'Instant 24/7 Concierge Support',
      color: 'from-[#25D366] to-[#128C7E]',
      url: `https://wa.me/84908889999?text=${encodeURIComponent(
        locale === 'vi'
          ? 'Xin chào Quản gia LAURA, tôi muốn tư vấn đặt chỗ dịch vụ VIP.'
          : 'Hello LAURA Concierge, I would like to inquire about VIP services.'
      )}`,
      animationClass: 'animate-ios-spring-2',
      iconSvg: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.07c-.24.67-1.39 1.29-1.92 1.38-.5.08-1.14.12-3.69-.94-3.26-1.36-5.35-4.66-5.51-4.88-.16-.22-1.32-1.76-1.32-3.36 0-1.6 1.04-2.39 1.41-2.71.37-.32.81-.4 1.08-.4.27 0 .54.01.78.02.25.01.58-.09.91.7.34.82 1.16 2.83 1.26 3.04.1.21.17.46.03.73-.14.27-.21.44-.42.68-.21.24-.44.54-.63.73-.21.21-.43.44-.19.86.25.42 1.09 1.8 2.34 2.92 1.61 1.43 2.97 1.88 3.39 2.09.42.21.67.18.92-.1.25-.28 1.08-1.26 1.37-1.69.29-.43.58-.36.98-.21.4.15 2.53 1.19 2.97 1.41.44.22.73.33.84.51.11.18.11 1.05-.13 1.72z" />
        </svg>
      ),
    },
    {
      id: 'line',
      name: 'Line',
      subtext: 'Laura Booking · ID: laurabooking',
      color: 'from-[#06C755] to-[#00B900]',
      url: `https://line.me/ti/p/~laurabooking`,
      animationClass: 'animate-ios-spring-3',
      iconSvg: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M22 10.5C22 5.8 17.5 2 12 2S2 5.8 2 10.5c0 4.2 3.6 7.7 8.5 8.3.3.1.8.2.9.6.1.3.1.8 0 1.1-.1.5-.6 2-.7 2.4-.1.6.2.6.5.4 1.6-1.1 4.3-3.1 5.9-4.3 3.1-1.7 4.9-4.6 4.9-7.5zM8.8 13.5H6.5c-.3 0-.5-.2-.5-.5V8.5c0-.3.2-.5.5-.5s.5.2.5.5V12.5h1.8c.3 0 .5.2.5.5s-.2.5-.5.5zm2.4 0c-.3 0-.5-.2-.5-.5V8.5c0-.3.2-.5.5-.5s.5.2.5.5v4.5c0 .3-.2.5-.5.5zm5.7 0c-.3 0-.5-.2-.5-.5V10.2l-2 3.1c-.1.2-.3.2-.5.2-.3 0-.5-.2-.5-.5V8.5c0-.3.2-.5.5-.5s.5.2.5.5v2.8l2-3.1c.1-.2.3-.2.5-.2.3 0 .5.2.5.5v4.5c0 .3-.2.5-.5.5zm3.1-4c0 .3-.2.5-.5.5h-1.8v1h1.8c.3 0 .5.2.5.5s-.2.5-.5.5h-1.8v1h1.8c.3 0 .5.2.5.5s-.2.5-.5.5h-2.3c-.3 0-.5-.2-.5-.5V8.5c0-.3.2-.5.5-.5h2.3c.3 0 .5.2.5.5s-.2.5-.5.5z" />
        </svg>
      ),
    },
    {
      id: 'kakaotalk',
      name: 'KakaoTalk',
      subtext: 'Laura VIP Concierge',
      color: 'from-[#FEE500] to-[#FADA0A]',
      url: 'https://open.kakao.com',
      animationClass: 'animate-ios-spring-4',
      iconSvg: (
        <svg className="w-6 h-6 fill-current text-[#191919]" viewBox="0 0 24 24">
          <path d="M12 3c-5.52 0-10 3.58-10 8 0 2.82 1.83 5.3 4.63 6.72-.2.74-.74 2.68-.85 3.09-.13.51.19.5.39.37.16-.1 2.5-1.7 3.51-2.39.75.11 1.52.17 2.32.17 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* 1. STICKY FLOATING TRIGGER BUTTON (Clean round gold button with 3s luxury wiggle) */}
      <div className="fixed bottom-24 sm:bottom-32 right-6 sm:right-14 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open contact channels"
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#b79051] via-[#e3c98d] to-[#b68b4b] p-[2px] shadow-2xl shadow-[var(--gold)]/30 hover:scale-105 active:scale-95 transition-transform animate-luxury-wiggle cursor-pointer group"
        >
          {/* Core Dark Orb */}
          <div className="w-full h-full rounded-full bg-[#0c0c0c] flex items-center justify-center text-[var(--gold-light)] group-hover:bg-[#151515] transition-colors relative overflow-hidden">
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

      {/* 2. PURE BLUR BACKDROP WITH VERTICAL STACK (KHÔNG BACKGROUND SAU LƯNG, CHỈ LÀM MỜ, MOTION IPHONE) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-2xl transition-all duration-300"
          onClick={() => setIsOpen(false)}
        >
          {/* Vertical Capsule Container (No Solid Box) */}
          <div
            className="w-full max-w-md space-y-3 relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button Floating in Glass */}
            <div className="flex justify-end pb-1 px-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#aaa] hover:text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* VERTICAL LIST OF 4 MESSAGING APPS (HÀNG DỌC CỰC MƯỢT NHƯ IPHONE) */}
            <div className="space-y-2.5">
              {contactApps.map((app) => (
                <a
                  key={app.id}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${app.animationClass} group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 hover:border-[var(--gold)]/50 backdrop-blur-xl shadow-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-all duration-200 cursor-pointer`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* App Icon Orb */}
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${app.color} flex items-center justify-center text-white shadow-lg group-hover:scale-108 transition-transform duration-200 shrink-0`}
                    >
                      {app.iconSvg}
                    </div>

                    {/* App Label & Subtext */}
                    <div className="text-left">
                      <h4 className="text-base font-semibold text-white group-hover:text-[var(--gold-light)] transition-colors">
                        {app.name}
                      </h4>
                      <p className="text-xs text-[#aaa] group-hover:text-[#ccc] transition-colors leading-tight">
                        {app.subtext}
                      </p>
                    </div>
                  </div>

                  {/* Connect Indicator Arrow */}
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[var(--gold)] group-hover:text-black flex items-center justify-center text-[#888] transition-all duration-200 shrink-0 ml-2">
                    <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
