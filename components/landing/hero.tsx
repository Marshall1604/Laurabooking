'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarDays, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { TRANSITION_EASE } from '@/lib/motion';
import { useI18n } from '@/lib/i18n/context';

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative pt-32 sm:pt-40 pb-36 sm:pb-48 flex flex-col justify-center overflow-hidden bg-[#050505] font-sans">
      {/* Cinematic Background Imagery & Ambient Lighting */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-35 mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=85')`,
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />

      {/* Gold Ambient Aura Glows */}
      <div
        className="absolute top-1/4 right-[25%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(218,189,126,0.15)_0%,rgba(183,144,81,0.04)_50%,transparent_70%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-10 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(218,189,126,0.08)_0%,transparent_60%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full my-auto">
        <div className="max-w-3xl flex flex-col items-start">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.1, ease: TRANSITION_EASE }}
            className="text-5xl sm:text-7xl lg:text-8xl font-serif font-normal text-[var(--foreground)] tracking-tight leading-[1.0]"
          >
            {t('hero_headline')}
            <br />
            <em className="text-[var(--gold-light)] font-normal italic font-serif">
              {t('hero_headline_italic')}
            </em>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: TRANSITION_EASE }}
            className="mt-6 max-w-2xl text-base sm:text-lg text-[#bbb6ae] font-sans font-light leading-relaxed"
          >
            {t('hero_desc')}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: TRANSITION_EASE }}
            className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <Link
              href="/booking"
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-xs font-sans font-bold uppercase tracking-[0.18em] text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-lg shadow-xl hover:shadow-[0_0_30px_rgba(218,189,126,0.4)] transition-all duration-300 active:scale-98"
            >
              <CalendarDays size={16} />
              <span>{t('hero_cta_primary')}</span>
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-[var(--foreground)] hover:text-[var(--gold-light)] transition-colors py-2 border-b border-[var(--border)] group"
            >
              <span>{t('hero_cta_secondary')}</span>
              <ArrowUpRight size={14} className="text-[var(--gold)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
