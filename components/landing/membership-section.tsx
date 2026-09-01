'use client';

import Link from 'next/link';
import { Crown, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '@/data/landing';
import { FadeUp } from '@/components/motion/fade-up';
import { StaggerContainer, StaggerItem } from '@/components/motion/stagger';
import { useI18n } from '@/lib/i18n/context';

export function MembershipSection() {
  const { t } = useI18n();

  return (
    <section id="membership" className="py-24 sm:py-32 bg-[#070707] relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 text-[var(--gold-light)] text-[0.68rem] tracking-[0.24em] uppercase font-semibold">
              <Crown size={14} className="text-[var(--gold)]" />
              <span>{t('mem_eyebrow')}</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-serif text-[var(--foreground)] leading-[1.05] font-normal">
              {t('mem_title')} <br />
              <em className="text-[var(--gold-light)] font-normal italic font-serif">
                {t('mem_title_italic')}
              </em>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#a8a39a] font-light">
              {t('mem_subtitle')}
            </p>
          </FadeUp>
        </div>

        {/* Plans Grid */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isFeatured = plan.isFeatured;
            return (
              <StaggerItem key={plan.id} className="h-full">
                <div
                  className={`h-full rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative ${
                    isFeatured
                      ? 'bg-[#0e0c08] border-2 border-[var(--gold)] shadow-2xl shadow-[var(--gold)]/10 scale-102 lg:-translate-y-2'
                      : 'bg-[#090909] border border-[var(--border)] hover:border-[var(--gold)]/40'
                  }`}
                >
                  {isFeatured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--gold)] text-[#090704] text-[0.65rem] tracking-[0.16em] uppercase font-bold shadow-md">
                      Most Selected by Patrons
                    </div>
                  )}

                  <div>
                    <div className="pb-6 border-b border-white/10">
                      <span className="text-[0.68rem] tracking-[0.16em] uppercase text-[var(--gold-light)] font-semibold block">
                        {plan.name}
                      </span>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="font-serif text-4xl sm:text-5xl text-white font-normal">
                          {plan.price}
                        </span>
                        <span className="text-xs text-[#8e8981] font-mono">/ {plan.period}</span>
                      </div>
                      <p className="mt-3 text-xs sm:text-sm text-[#9b968e] leading-relaxed font-light">
                        {plan.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="mt-6 space-y-3">
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#ccc8c0] font-light">
                          <Check size={14} className="text-[var(--gold)] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-white/5">
                    <Link
                      href="/partner-with-us"
                      className={`w-full py-4 text-xs font-sans font-bold uppercase tracking-[0.16em] rounded flex items-center justify-center gap-2 transition-all ${
                        isFeatured
                          ? 'bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] text-[#090704] shadow-lg hover:opacity-90'
                          : 'bg-white/5 hover:bg-[var(--gold)] hover:text-black text-white border border-white/10'
                      }`}
                    >
                      <span>Inquire Privilege Upgrade</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
