'use client';

import { FadeUp } from '@/components/motion/fade-up';
import { StaggerContainer, StaggerItem } from '@/components/motion/stagger';
import { useI18n } from '@/lib/i18n/context';

export function HowItWorks() {
  const { t } = useI18n();

  const steps = [
    {
      step: t('how_step1_num'),
      title: t('how_step1_title'),
      desc: t('how_step1_desc'),
      detail: t('how_step1_detail') || 'Curated Private Inventory',
    },
    {
      step: t('how_step2_num'),
      title: t('how_step2_title'),
      desc: t('how_step2_desc'),
      detail: t('how_step2_detail') || 'Encrypted Discretion Protocol',
    },
    {
      step: t('how_step3_num'),
      title: t('how_step3_title'),
      desc: t('how_step3_desc'),
      detail: t('how_step3_detail') || 'Direct Host Liaison',
    },
    {
      step: t('how_step4_num'),
      title: t('how_step4_title'),
      desc: t('how_step4_desc'),
      detail: t('how_step4_detail') || 'Red-Carpet & Zero-Wait Bypass',
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-[#050505] relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <FadeUp>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 text-[var(--gold-light)] text-[0.68rem] tracking-[0.24em] uppercase font-semibold">
              <span className="w-6 h-px bg-[var(--gold)]" />
              <span>{t('how_eyebrow')}</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-serif text-[var(--foreground)] leading-[1.05] font-normal">
              {t('how_title')}
            </h2>
          </div>
        </FadeUp>

        {/* Steps Grid: 2 columns on mobile (2 rows x 2 cards), 4 columns on desktop */}
        <StaggerContainer className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {steps.map((step) => (
            <StaggerItem key={step.step}>
              <div className="h-full p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-[#090909] border border-[var(--border)] hover:border-[var(--gold)]/50 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
                    <span className="font-mono text-[0.6rem] sm:text-xs tracking-wider sm:tracking-widest text-[var(--gold-light)] uppercase font-bold">
                      Step {step.step}
                    </span>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--gold)]/40 group-hover:bg-[var(--gold)] transition-colors" />
                  </div>

                  <h3 className="mt-3 sm:mt-5 text-xs sm:text-lg font-serif text-white group-hover:text-[var(--gold-light)] transition-colors font-normal leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2.5 text-[0.68rem] sm:text-xs text-[#938e86] leading-relaxed font-light line-clamp-5 sm:line-clamp-none">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5">
                  <span className="text-[0.58rem] sm:text-[0.68rem] text-[var(--gold-light)] font-sans font-medium block truncate">
                    ✓ {step.detail}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
