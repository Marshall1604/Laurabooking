'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, ShieldCheck, User } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';
import { useAuth } from '@/lib/auth/context';

export default function AccountProfilePage() {
  const { user, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    fullName: user?.fullName || 'Alexander Morgan',
    email: user?.email || 'alex.morgan@private.org',
    phone: user?.phone || '+65 9123 4567',
    preferredLocale: user?.preferredLocale || 'en',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <SiteShell>
      <div className="py-12 sm:py-16 bg-[#050505] min-h-[85vh]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#888] hover:text-[var(--gold-light)] mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Account Overview</span>
          </Link>

          <div className="pb-6 border-b border-white/10">
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--gold-light)] font-mono">
              Confidential Profile
            </span>
            <h1 className="mt-1 text-3xl sm:text-4xl font-serif text-white">Guest Dossier & Preferences</h1>
          </div>

          {saved && (
            <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              ✓ Profile preferences successfully updated and synced with your host.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 p-8 rounded-2xl bg-[#090909] border border-[var(--border)] space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[0.68rem] tracking-wider uppercase text-[#aaa] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full bg-[#111] border border-white/15 rounded p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div>
                <label className="block text-[0.68rem] tracking-wider uppercase text-[#aaa] mb-2">
                  Confidential Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#111] border border-white/15 rounded p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[0.68rem] tracking-wider uppercase text-[#aaa] mb-2">
                  Direct Telephone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#111] border border-white/15 rounded p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div>
                <label className="block text-[0.68rem] tracking-wider uppercase text-[#aaa] mb-2">
                  Preferred Service Language
                </label>
                <select
                  value={form.preferredLocale}
                  onChange={(e) => setForm({ ...form, preferredLocale: e.target.value })}
                  className="w-full bg-[#111] border border-white/15 rounded p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                >
                  <option value="en">English</option>
                  <option value="zh-CN">Chinese (中文)</option>
                  <option value="ko">Korean (한국어)</option>
                  <option value="vi">Vietnamese (Tiếng Việt)</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#777] flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[var(--gold)]" />
                <span>NDA Protected Protocol</span>
              </span>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-wider uppercase font-bold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b]"
              >
                <Save size={14} />
                <span>Save Dossier</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </SiteShell>
  );
}
