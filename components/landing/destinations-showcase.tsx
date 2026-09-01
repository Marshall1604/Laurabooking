'use client';

import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { DESTINATIONS } from '@/data/landing';
import { FadeUp } from '@/components/motion/fade-up';
import { StaggerContainer, StaggerItem } from '@/components/motion/stagger';
import { useI18n } from '@/lib/i18n/context';

export function DestinationsShowcase() {
  const { t } = useI18n();

  return (
    <section id="destinations" className="py-24 sm:py-32 bg-[#070707] relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 text-[var(--gold-light)] text-[0.68rem] tracking-[0.24em] uppercase font-semibold">
              <span className="w-6 h-px bg-[var(--gold)]" />
              <span>{t('dest_eyebrow')}</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-serif text-[var(--foreground)] leading-[1.05] font-normal">
              {t('dest_title')} <br />
              <em className="text-[var(--gold-light)] font-normal italic font-serif">
                {t('dest_title_italic')}
              </em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-xs tracking-[0.14em] uppercase text-[var(--gold-light)] hover:text-white border-b border-[var(--gold)]/40 pb-1 transition-colors font-semibold"
            >
              <span>{t('dest_explore_all')}</span>
              <ArrowUpRight size={14} />
            </Link>
          </FadeUp>
        </div>

        {/* Destination Grid */}
        <StaggerContainer className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6">
          {DESTINATIONS.map((dest, idx) => {
            const colSpan = idx < 2 ? 'md:col-span-6' : 'md:col-span-4';
            return (
              <StaggerItem key={dest.id} className={colSpan}>
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="group relative block h-[380px] sm:h-[420px] rounded-2xl overflow-hidden border border-[var(--border)] bg-[#0b0b0b] hover:border-[var(--gold)]/60 transition-all duration-500 shadow-xl"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-108"
                    style={{ backgroundImage: `url(${dest.image})` }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#050505] via-[#050505]/65 to-[#050505]/20" />

                  {/* Card Content Top */}
                  <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050505]/85 backdrop-blur-md border border-[var(--gold)]/30 text-[var(--gold-light)] text-[0.62rem] tracking-[0.16em] uppercase font-semibold">
                      <MapPin size={11} />
                      <span>{dest.venueCount} Private Venues</span>
                    </span>

                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[var(--gold)] group-hover:text-[#0a0805] transition-all">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  {/* Card Content Bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
                    <span className="text-[0.68rem] tracking-[0.16em] uppercase text-[var(--gold-light)] font-medium block">
                      {dest.curatedVibe}
                    </span>
                    <h3 className="mt-1 text-2xl sm:text-3xl font-serif text-white group-hover:text-[var(--gold-light)] transition-colors font-normal">
                      {dest.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#a5a097] leading-relaxed line-clamp-2 font-light">
                      {dest.description}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
