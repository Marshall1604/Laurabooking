'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, KeyRound, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

const AUTH_STORAGE_KEY = 'laura_admin_auth_v1';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const isAuth = sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
      setIsAuthenticated(isAuth);
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });
      const data = (await res.json()) as any;

      if (data?.success) {
        try {
          sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
        } catch {}
        setIsAuthenticated(true);
      } else {
        setErrorMsg(data?.message || 'Email hoặc Mật khẩu quản trị viên không chính xác. Quyền truy cập bị từ chối!');
      }
    } catch {
      setErrorMsg('Không thể kết nối đến máy chủ xác thực');
    } finally {
      setIsSubmitting(false);
    }
  };

  // While checking authentication on initial load
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[var(--gold)] animate-spin" />
      </div>
    );
  }

  // If authenticated, render admin pages directly
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If NOT authenticated, render the executive gatekeeper login screen
  return (
    <div className="min-h-screen bg-[#050505] text-[#f3eee5] flex flex-col items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] mx-auto flex items-center justify-center text-black shadow-xl shadow-[var(--gold)]/20 mb-3">
            <Lock size={26} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold-light)] text-[0.65rem] tracking-[0.2em] uppercase font-mono font-bold">
            <ShieldCheck size={12} className="text-[var(--gold)]" />
            <span>CỔNG QUẢN TRỊ BẢO MẬT CAO CẤP</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-wide">
            LAURA EXECUTIVE DESK
          </h1>
          <p className="text-xs text-[#888] max-w-sm mx-auto leading-relaxed">
            Khu vực quản trị tối mật. Vui lòng xác thực tài khoản quản trị viên được ủy quyền để truy cập hệ thống.
          </p>
        </div>

        {/* Login Form Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c0c] border border-[var(--gold)]/30 shadow-2xl space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2.5 leading-relaxed">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[0.7rem] uppercase tracking-wider text-[#aaa] font-semibold">
                Email Quản Trị Viên
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@laurabooking.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#141414] border border-white/15 focus:border-[var(--gold)] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-neutral-600 outline-none transition-colors"
                />
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777]" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-[0.7rem] uppercase tracking-wider text-[#aaa] font-semibold">
                Mật Khẩu Quản Trị
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#141414] border border-white/15 focus:border-[var(--gold)] rounded-xl pl-10 pr-11 py-3 text-xs text-white placeholder:text-neutral-600 outline-none transition-colors font-mono"
                />
                <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-widest font-bold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(218,189,126,0.3)] transition-all disabled:opacity-50 cursor-pointer pt-3.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Đang Xác Thực...</span>
                </>
              ) : (
                <>
                  <span>Xác Thực & Mở Khóa Quản Trị</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to Public Website */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-[#777] hover:text-[var(--gold-light)] transition-colors inline-flex items-center gap-1.5"
          >
            <span>← Quay về Trang Chủ Laura Booking</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
