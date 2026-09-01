'use client';

import Link from 'next/link';
import { CalendarDays, ArrowUpRight, Sparkles } from 'lucide-react';
import { FadeUp } from '@/components/motion/fade-up';
import { useI18n } from '@/lib/i18n/context';

export function FinalCTA() {
  const { t } = useI18n();

  return (
    <section className="py-24 sm:py-36 bg-[#050505] relative overflow-hidden text-center font-sans">
      {/* Intense Gold Ambient Bloom */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(circle,rgba(218,189,126,0.14)_0%,rgba(183,144,81,0.03)_60%,transparent_80%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <FadeUp>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold-light)] text-[0.68rem] tracking-[0.24em] uppercase font-semibold mb-6">
            <Sparkles size={13} className="text-[var(--gold)]" />
            <span>{t('cta_eyebrow')}</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[var(--foreground)] leading-[1.05] tracking-tight font-normal">
            {t('cta_title')} <br />
            <em className="text-[var(--gold-light)] font-normal italic font-serif">
              {t('cta_title_italic')}
            </em>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#bbb6ae] max-w-xl mx-auto font-light leading-relaxed">
            {t('cta_desc')}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 px-8 py-4 text-xs font-sans font-bold uppercase tracking-[0.16em] text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded shadow-xl hover:shadow-[0_0_40px_rgba(218,189,126,0.45)] transition-all duration-300"
            >
              <CalendarDays size={16} />
              <span>{t('cta_btn_primary')}</span>
            </Link>

            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-6 py-4 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-white hover:text-[var(--gold-light)] bg-white/5 border border-white/10 hover:border-white/20 rounded transition-colors"
            >
              <span>{t('cta_btn_secondary')}</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
