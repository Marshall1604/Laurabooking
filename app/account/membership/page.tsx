'use client';

import Link from 'next/link';
import { ArrowLeft, Crown, Check, Sparkles, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';
import { useAuth } from '@/lib/auth/context';
import { MEMBERSHIP_PLANS } from '@/data/landing';

export default function AccountMembershipPage() {
  const { user } = useAuth();

  return (
    <SiteShell>
      <div className="py-12 sm:py-16 bg-[#050505] min-h-[85vh]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#888] hover:text-[var(--gold-light)] mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Account Overview</span>
          </Link>

          <div className="pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--gold-light)] font-mono">
                Privilege Program
              </span>
              <h1 className="mt-1 text-3xl sm:text-4xl font-serif text-white">Membership Status & Tiers</h1>
            </div>

            <div className="p-3 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center gap-2 text-xs text-[var(--gold-light)] font-mono">
              <Crown size={15} />
              <span>Current Status: {user?.membershipTier || 'The Privé Tier'}</span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.id}
                className="p-8 rounded-2xl bg-[#090909] border border-[var(--border)] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-serif text-white flex items-center gap-2">
                    <Crown size={16} className="text-[var(--gold)]" />
                    <span>{plan.name}</span>
                  </h3>
                  <p className="text-xs text-[#888] mt-2 font-light">{plan.description}</p>

                  <div className="mt-6">
                    <span className="font-serif text-3xl text-[var(--gold-light)]">{plan.price}</span>
                    <span className="text-xs text-[#777] ml-2 font-mono">/ {plan.period}</span>
                  </div>

                  <div className="mt-6 space-y-2.5 pt-6 border-t border-white/10">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#bbb]">
                        <Check size={13} className="text-[var(--gold)] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <Link
                    href="/partner-with-us"
                    className="w-full text-center block py-2.5 bg-white/5 hover:bg-[var(--gold)] hover:text-black text-white text-xs uppercase tracking-wider font-semibold rounded border border-white/10 transition-all"
                  >
                    Inquire Privilege Upgrade
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
