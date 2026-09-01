'use client';

import { Star, ShieldCheck, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/landing';
import { FadeUp } from '@/components/motion/fade-up';
import { StaggerContainer, StaggerItem } from '@/components/motion/stagger';
import { useI18n } from '@/lib/i18n/context';

export function TestimonialsSection() {
  const { t } = useI18n();

  return (
    <section className="py-24 sm:py-32 bg-[#050505] relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-2xl">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 text-[var(--gold-light)] text-[0.68rem] tracking-[0.24em] uppercase font-semibold">
              <span className="w-6 h-px bg-[var(--gold)]" />
              <span>{t('test_eyebrow')}</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-serif text-[var(--foreground)] leading-[1.05] font-normal">
              {t('test_title')}
            </h2>
          </FadeUp>
        </div>

        <StaggerContainer className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <StaggerItem key={item.id}>
              <div className="h-full p-8 rounded-2xl bg-[#090909] border border-[var(--border)] flex flex-col justify-between hover:border-[var(--gold)]/40 transition-colors">
                <div>
                  <div className="flex items-center gap-1 text-[var(--gold)] mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-sm sm:text-base text-[#d0cbc2] font-serif italic leading-relaxed">
                    “{item.quote}”
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-sans font-medium text-white block">
                      {item.author}
                    </span>
                    <span className="text-xs text-[#8e8981] font-light mt-0.5 block">
                      {item.role} · {item.city}
                    </span>
                  </div>
                  <ShieldCheck size={16} className="text-[var(--gold)]/60" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
