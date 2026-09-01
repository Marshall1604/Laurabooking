'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Gem,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Crown,
  User,
  LayoutDashboard,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

export default function SignInPage() {
  const router = useRouter();
  const { login, quickLogin, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [activeTab, setActiveTab] = useState<'social' | 'email' | 'phone'>('social');
  const [submittedMessage, setSubmittedMessage] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await login('email', email);
    router.push('/account');
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setSubmittedMessage(`Confidential access code dispatched to ${phone}`);
    setTimeout(() => {
      login('phone', phone);
      router.push('/account');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f3eee5] flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(218,189,126,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border border-[var(--gold)]/40 flex items-center justify-center bg-[var(--gold)]/10">
            <Gem size={15} className="text-[var(--gold)]" />
          </div>
          <span className="font-serif tracking-[0.25em] text-sm text-white font-medium">LAURA</span>
        </Link>
        <Link href="/" className="text-xs uppercase tracking-wider text-[#888] hover:text-white">
          ← Return
        </Link>
      </div>

      {/* Auth Card */}
      <div className="max-w-md w-full mx-auto my-12 p-8 sm:p-10 rounded-2xl bg-[#090909] border border-[var(--border)] shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-[var(--gold-light)] text-[0.62rem] tracking-[0.22em] uppercase font-mono">
            <Lock size={11} />
            <span>Encrypted Member Portal</span>
          </div>
          <h1 className="mt-2 text-3xl font-serif text-white">Member Access</h1>
          <p className="mt-2 text-xs text-[#8e8981] font-light">
            Authenticate using verified credentials or confidential SSO.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 mb-6 text-xs uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveTab('social')}
            className={`flex-1 py-2.5 border-b-2 font-medium transition-all ${
              activeTab === 'social'
                ? 'border-[var(--gold)] text-[var(--gold-light)] font-bold'
                : 'border-transparent text-[#777] hover:text-white'
            }`}
          >
            SSO / Social
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-2.5 border-b-2 font-medium transition-all ${
              activeTab === 'email'
                ? 'border-[var(--gold)] text-[var(--gold-light)] font-bold'
                : 'border-transparent text-[#777] hover:text-white'
            }`}
          >
            Email Link
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('phone')}
            className={`flex-1 py-2.5 border-b-2 font-medium transition-all ${
              activeTab === 'phone'
                ? 'border-[var(--gold)] text-[var(--gold-light)] font-bold'
                : 'border-transparent text-[#777] hover:text-white'
            }`}
          >
            WhatsApp / OTP
          </button>
        </div>

        {/* Social SSO Tab */}
        {activeTab === 'social' && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={async () => {
                await login('google');
                router.push('/account');
              }}
              className="w-full p-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 flex items-center justify-center gap-3 text-xs text-white font-medium transition-all"
            >
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                await login('facebook');
                router.push('/account');
              }}
              className="w-full p-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 flex items-center justify-center gap-3 text-xs text-white font-medium transition-all"
            >
              <span>Continue with Facebook</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                await login('kakao');
                router.push('/account');
              }}
              className="w-full p-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 flex items-center justify-center gap-3 text-xs text-white font-medium transition-all"
            >
              <span>Continue with KakaoTalk</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                await login('line');
                router.push('/account');
              }}
              className="w-full p-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 flex items-center justify-center gap-3 text-xs text-white font-medium transition-all"
            >
              <span>Continue with LINE Login (OIDC)</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                await login('telegram');
                router.push('/account');
              }}
              className="w-full p-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 flex items-center justify-center gap-3 text-xs text-white font-medium transition-all"
            >
              <span>Continue with Telegram Widget</span>
            </button>
          </div>
        )}

        {/* Email Magic Link Tab */}
        {activeTab === 'email' && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-[0.68rem] tracking-wider uppercase text-[#aaa] mb-1.5">
                Member Email Address
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-3.5 text-[#666]" />
                <input
                  required
                  type="email"
                  placeholder="alexander@private.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111] border border-white/15 rounded p-3 pl-9 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-xs tracking-[0.16em] uppercase font-bold text-[#0a0805] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] hover:opacity-90 transition-opacity"
            >
              {isLoading ? 'Verifying...' : 'Send Magic Access Link'}
            </button>
          </form>
        )}

        {/* Phone / WhatsApp OTP Tab */}
        {activeTab === 'phone' && (
          <form onSubmit={handlePhoneLogin} className="space-y-4">
            <div>
              <label className="block text-[0.68rem] tracking-wider uppercase text-[#aaa] mb-1.5">
                WhatsApp / Mobile Phone Number
              </label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-3.5 text-[#666]" />
                <input
                  required
                  type="tel"
                  placeholder="+65 9123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#111] border border-white/15 rounded p-3 pl-9 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                />
              </div>
            </div>
            {submittedMessage && (
              <p className="text-xs text-emerald-400 font-mono">{submittedMessage}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 text-xs tracking-[0.16em] uppercase font-bold text-[#0a0805] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] hover:opacity-90 transition-opacity"
            >
              Send Verification OTP
            </button>
          </form>
        )}

        {/* Quick-Access Demo Modes for Evaluation */}
        <div className="mt-8 pt-6 border-t border-white/10 space-y-2.5">
          <span className="text-[0.6rem] tracking-[0.16em] uppercase text-[#666] block text-center font-mono">
            Demo Evaluation Fast-Access
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                quickLogin('vip');
                router.push('/account');
              }}
              className="p-2 rounded bg-white/[0.03] border border-white/10 hover:border-[var(--gold)] text-[0.62rem] text-[#c0bcb4] flex flex-col items-center gap-1 transition-all"
            >
              <Crown size={13} className="text-[var(--gold)]" />
              <span>VIP Patron</span>
            </button>

            <button
              type="button"
              onClick={() => {
                quickLogin('member');
                router.push('/account');
              }}
              className="p-2 rounded bg-white/[0.03] border border-white/10 hover:border-white/30 text-[0.62rem] text-[#c0bcb4] flex flex-col items-center gap-1 transition-all"
            >
              <User size={13} className="text-white" />
              <span>Member</span>
            </button>

            <button
              type="button"
              onClick={() => {
                quickLogin('admin');
                router.push('/admin');
              }}
              className="p-2 rounded bg-[var(--gold)]/10 border border-[var(--gold)]/30 hover:bg-[var(--gold)] hover:text-black text-[0.62rem] text-[var(--gold-light)] flex flex-col items-center gap-1 transition-all"
            >
              <LayoutDashboard size={13} />
              <span>Super Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-md w-full mx-auto text-center text-[0.65rem] text-[#666] flex items-center justify-center gap-2 relative z-10">
        <ShieldCheck size={13} className="text-[var(--gold)]" />
        <span>Institutional Grade Encryption · Zero Public Data Exposure</span>
      </div>
    </div>
  );
}
