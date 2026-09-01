'use client';

import { PARTNERS_PRESS } from '@/data/landing';
import { FadeIn } from '@/components/motion/fade-in';
import { useI18n } from '@/lib/i18n/context';

export function BrandStrip() {
  const { t } = useI18n();

  return (
    <section className="py-12 border-y border-white/[0.08] bg-[#070707] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <div className="text-center mb-6">
            <span className="text-[0.62rem] tracking-[0.25em] uppercase text-[#736e67] font-sans font-medium">
              {t('brand_strip_title')}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity">
            {PARTNERS_PRESS.map((partner, index) => (
              <div key={index} className="text-center group">
                <span className="font-serif text-sm sm:text-base tracking-[0.15em] text-[#d0cbc2] group-hover:text-[var(--gold-light)] transition-colors uppercase font-normal">
                  {partner.name}
                </span>
                <p className="text-[0.6rem] tracking-[0.1em] uppercase text-[#6e6962] mt-0.5 font-sans">
                  {partner.role}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
