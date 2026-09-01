'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Settings,
  Building2,
  CalendarDays,
  MapPin,
  Layers,
  Users,
  Handshake,
  BookOpen,
  Save,
  Check,
  ShieldCheck,
  SlidersHorizontal,
  Send,
  Loader2,
  MessageCircle,
} from 'lucide-react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminSettingsPage() {
  const [currency, setCurrency] = useState('USD');
  const [minLeadHours, setMinLeadHours] = useState('6');
  const [whatsappNumber, setWhatsappNumber] = useState('+84 90 888 9999');
  const [conciergeEmail, setConciergeEmail] = useState('concierge@laurabooking.com');
  const [autoConfirmVip, setAutoConfirmVip] = useState(true);

  // Telegram settings
  const [telegramBotToken, setTelegramBotToken] = useState('');
  const [telegramChatId, setTelegramChatId] = useState('');
  const [isTestingTelegram, setIsTestingTelegram] = useState(false);
  const [telegramTestResult, setTelegramTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('laura_telegram_bot_token');
      const savedChatId = localStorage.getItem('laura_telegram_chat_id');
      const savedHours = localStorage.getItem('laura_min_lead_hours');
      const savedWhatsapp = localStorage.getItem('laura_whatsapp');
      const savedEmail = localStorage.getItem('laura_email');

      if (savedToken) setTelegramBotToken(savedToken);
      if (savedChatId) setTelegramChatId(savedChatId);
      if (savedHours) setMinLeadHours(savedHours);
      if (savedWhatsapp) setWhatsappNumber(savedWhatsapp);
      if (savedEmail) setConciergeEmail(savedEmail);
    } catch {}
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('laura_telegram_bot_token', telegramBotToken);
      localStorage.setItem('laura_telegram_chat_id', telegramChatId);
      localStorage.setItem('laura_min_lead_hours', minLeadHours);
      localStorage.setItem('laura_whatsapp', whatsappNumber);
      localStorage.setItem('laura_email', conciergeEmail);
    } catch {}

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleTestTelegram = async () => {
    if (!telegramBotToken.trim() || !telegramChatId.trim()) {
      setTelegramTestResult({
        success: false,
        message: 'Vui lòng nhập đầy đủ Telegram Bot Token và Chat ID trước khi test!',
      });
      return;
    }

    setIsTestingTelegram(true);
    setTelegramTestResult(null);

    try {
      const res = await fetch('/api/telegram-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dossierCode: 'TEST-LAURA-' + Math.floor(1000 + Math.random() * 9000),
          date: '2026-09-02',
          timeSlot: '21:00',
          partySize: 2,
          venueName: 'The Penthouse Royal Spa',
          packageName: 'Obsidian Imperial Ritual',
          guestName: 'Nguyễn Văn A (VIP Test)',
          phone: '+84 901 234 567',
          messagingApp: 'Telegram',
          totalPriceUsd: 850,
          totalPriceVnd: 21250000,
          customToken: telegramBotToken.trim(),
          customChatId: telegramChatId.trim(),
        }),
      });

      const data = (await res.json()) as any;
      if (data?.success) {
        setTelegramTestResult({
          success: true,
          message: '✓ Đã gửi tin nhắn thử nghiệm thành công! Hãy kiểm tra ứng dụng Telegram của bạn.',
        });
      } else {
        setTelegramTestResult({
          success: false,
          message: `Lỗi: ${data.error || data.message || 'Không thể kết nối Telegram'}`,
        });
      }
    } catch (err: any) {
      setTelegramTestResult({
        success: false,
        message: `Lỗi kết nối: ${err.message}`,
      });
    } finally {
      setIsTestingTelegram(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#f3eee5] flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[var(--gold-light)] text-[0.68rem] tracking-[0.2em] uppercase font-semibold">
              <Settings size={13} />
              <span>Cấu Hình Nền Tảng</span>
            </div>
            <h1 className="mt-1 text-3xl font-serif text-white font-normal">
              Cài Đặt Vận Hành & Thông Báo
            </h1>
          </div>
        </div>

        {saved && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <Check size={16} />
            <span>✓ Đã lưu cài đặt cấu hình và Telegram thành công!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="max-w-2xl space-y-6">
          {/* Telegram Notifications */}
          <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-[var(--gold)]/30 space-y-4 shadow-lg shadow-[var(--gold)]/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Send size={16} />
                </div>
                <div>
                  <h3 className="font-serif text-base text-white">Tự Động Trả Tin Nhắn Telegram Khi Có Booking</h3>
                  <p className="text-xs text-[#888]">Thông báo ngay lập tức về điện thoại khi khách đặt chỗ thành công</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase text-[#aaa] mb-1 font-semibold">
                Telegram Bot Token (Từ @BotFather)
              </label>
              <input
                type="text"
                placeholder="Ví dụ: 7891234567:AAH1234567890abcdef..."
                value={telegramBotToken}
                onChange={(e) => setTelegramBotToken(e.target.value)}
                className="w-full bg-[#111] border border-white/15 rounded p-2.5 text-xs text-white font-mono placeholder:text-neutral-600 focus:border-[var(--gold)] outline-none"
              />
              <span className="text-[0.68rem] text-[#666] mt-1 block">
                Tạo bot miễn phí bằng cách chat với <span className="text-[var(--gold)] font-mono">@BotFather</span> trên Telegram và lấy Token.
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase text-[#aaa] mb-1 font-semibold">
                Telegram Chat ID (ID Cá Nhân hoặc ID Nhóm Quản Trị)
              </label>
              <input
                type="text"
                placeholder="Ví dụ: 123456789 hoặc -100123456789"
                value={telegramChatId}
                onChange={(e) => setTelegramChatId(e.target.value)}
                className="w-full bg-[#111] border border-white/15 rounded p-2.5 text-xs text-white font-mono placeholder:text-neutral-600 focus:border-[var(--gold)] outline-none"
              />
              <span className="text-[0.68rem] text-[#666] mt-1 block">
                Lấy Chat ID cá nhân bằng cách chat <span className="text-[var(--gold)] font-mono">/start</span> với bot <span className="text-[var(--gold)] font-mono">@userinfobot</span> hoặc <span className="text-[var(--gold)] font-mono">@getmyid_bot</span>.
              </span>
            </div>

            {telegramTestResult && (
              <div
                className={`p-3 rounded-xl text-xs font-mono ${
                  telegramTestResult.success
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                    : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                }`}
              >
                {telegramTestResult.message}
              </div>
            )}

            <div className="pt-1 flex items-center gap-3">
              <button
                type="button"
                onClick={handleTestTelegram}
                disabled={isTestingTelegram}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded-lg transition-colors disabled:opacity-50"
              >
                {isTestingTelegram ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                <span>Gửi Thử Tin Nhắn Test Qua Telegram</span>
              </button>
            </div>
          </div>

          {/* General Platform Settings */}
          <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-[var(--border)] space-y-4">
            <h3 className="font-serif text-lg text-white">Quy Chuẩn Vận Hành & Quản Gia</h3>

            <div>
              <label className="block text-xs uppercase text-[#aaa] mb-1 font-semibold">
                Thời Gian Yêu Cầu Đặt Chỗ Trước Tối Thiểu (Giờ)
              </label>
              <input
                type="number"
                value={minLeadHours}
                onChange={(e) => setMinLeadHours(e.target.value)}
                className="w-full bg-[#111] border border-white/15 rounded p-2.5 text-xs text-white focus:border-[var(--gold)] outline-none"
              />
              <span className="text-[0.68rem] text-[#666] mt-0.5 block">
                Áp dụng để quản gia kịp chuẩn bị xe đưa đón và phòng riêng.
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase text-[#aaa] mb-1 font-semibold">
                Hotline WhatsApp Quản Gia Riêng 24/7
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full bg-[#111] border border-white/15 rounded p-2.5 text-xs text-white font-mono focus:border-[var(--gold)] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-[#aaa] mb-1 font-semibold">
                Email Tiếp Nhận Hồ Sơ Bí Mật (NDA Desk)
              </label>
              <input
                type="email"
                value={conciergeEmail}
                onChange={(e) => setConciergeEmail(e.target.value)}
                className="w-full bg-[#111] border border-white/15 rounded p-2.5 text-xs text-white focus:border-[var(--gold)] outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="autoConfirm"
                checked={autoConfirmVip}
                onChange={(e) => setAutoConfirmVip(e.target.checked)}
                className="accent-[var(--gold)] w-4 h-4 rounded cursor-pointer"
              />
              <label htmlFor="autoConfirm" className="text-xs text-white cursor-pointer select-none">
                Tự động ưu tiên giữ chỗ cho thượng khách đặt trực tuyến
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-bold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-lg shadow-lg hover:opacity-90 transition-opacity"
          >
            <Save size={14} />
            <span>Lưu Toàn Bộ Cấu Hình</span>
          </button>
        </form>
      </main>
    </div>
  );
}
