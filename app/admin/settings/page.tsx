'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminSettingsPage() {
  const [currency, setCurrency] = useState('USD');
  const [minLeadHours, setMinLeadHours] = useState('6');
  const [whatsappNumber, setWhatsappNumber] = useState('+84 90 888 9999');
  const [conciergeEmail, setConciergeEmail] = useState('concierge@aurelis.com');
  const [autoConfirmVip, setAutoConfirmVip] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
              Cài Đặt Vận Hành Hệ Thống
            </h1>
          </div>
        </div>

        {saved && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            ✓ Đã lưu cài đặt cấu hình thành công!
          </div>
        )}

        <form onSubmit={handleSave} className="max-w-2xl space-y-6">
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
                className="w-full bg-[#111] border border-white/15 rounded p-2.5 text-xs text-white"
              />
              <span className="text-[0.68rem] text-[#666] mt-0.5 block">
                Áp dụng để quản gia kịp chuẩn bị xe Maybach và hầm rượu riêng.
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
                className="w-full bg-[#111] border border-white/15 rounded p-2.5 text-xs text-white font-mono"
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
                className="w-full bg-[#111] border border-white/15 rounded p-2.5 text-xs text-white"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="autoConfirm"
                checked={autoConfirmVip}
                onChange={(e) => setAutoConfirmVip(e.target.checked)}
                className="accent-[var(--gold)] w-4 h-4 rounded"
              />
              <label htmlFor="autoConfirm" className="text-xs text-white">
                Tự động ưu tiên giữ chỗ cho hội viên hạng Sovereign Black
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-bold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded shadow-lg hover:opacity-90"
          >
            <Save size={14} />
            <span>Lưu Toàn Bộ Cấu Hình</span>
          </button>
        </form>
      </main>
    </div>
  );
}
