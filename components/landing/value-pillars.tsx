'use client';

import React from 'react';
import {
  Crown,
  ShieldCheck,
  Globe2,
  Compass,
  Lock,
  Coins,
  Sparkles,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';
import { FadeUp } from '@/components/motion/fade-up';
import { StaggerContainer, StaggerItem } from '@/components/motion/stagger';
import { useI18n } from '@/lib/i18n/context';

export function ValuePillars() {
  const { t, locale } = useI18n();

  const pillars = [
    {
      number: '01',
      icon: Crown,
      title: t('pillar1_title'),
      desc: t('pillar1_desc'),
      tag: t('pillar1_tag') || 'Giải Trí Hàng Đầu',
    },
    {
      number: '02',
      icon: ShieldCheck,
      title: t('pillar2_title'),
      desc: t('pillar2_desc'),
      tag: t('pillar2_tag') || 'Kiểm Duyệt Khách Quan',
    },
    {
      number: '03',
      icon: Globe2,
      title: t('pillar3_title'),
      desc: t('pillar3_desc'),
      tag: t('pillar3_tag') || 'Đa Ngôn Ngữ 24/7',
    },
    {
      number: '04',
      icon: Compass,
      title: t('pillar4_title'),
      desc: t('pillar4_desc'),
      tag: t('pillar4_tag') || 'Chuyên Nghiệp Tận Tâm',
    },
    {
      number: '05',
      icon: Lock,
      title: t('pillar5_title'),
      desc: t('pillar5_desc'),
      tag: t('pillar5_tag') || 'Bảo Mật Kín Đáo',
    },
    {
      number: '06',
      icon: Coins,
      title: t('pillar6_title'),
      desc: t('pillar6_desc'),
      tag: t('pillar6_tag') || 'Minh Bạch Rõ Ràng',
    },
  ];

  return (
    <section className="pt-28 sm:pt-40 pb-24 sm:pb-32 bg-[#050505] relative overflow-hidden font-sans">
      {/* Ambient background gold glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(circle,rgba(218,189,126,0.07)_0%,transparent_70%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 text-[var(--gold-light)] text-[0.68rem] tracking-[0.24em] uppercase font-semibold">
              <span className="w-6 h-px bg-[var(--gold)]" />
              <span>{t('pillar_eyebrow')}</span>
            </div>

            <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-serif text-[var(--foreground)] leading-[1.08] font-normal">
              {t('pillar_title')} <br />
              <em className="text-[var(--gold-light)] font-normal italic font-serif">
                {t('pillar_title_italic')}
              </em>
            </h2>

            {t('pillar_subtitle') && (
              <p className="mt-4 text-xs sm:text-base text-[#9f9990] font-light leading-relaxed max-w-2xl">
                {t('pillar_subtitle')}
              </p>
            )}
          </FadeUp>
        </div>

        {/* 6 Value Pillars Grid: 2 columns on mobile (3 rows x 2 cards), 3 columns on desktop */}
        <StaggerContainer className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem key={pillar.number}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="h-full p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-[#090909] border border-[var(--border)] hover:border-[var(--gold)]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_10px_30px_rgba(218,189,126,0.08)] relative overflow-hidden"
                >
                  {/* Subtle hover gradient glow */}
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-[var(--gold)]/5 rounded-full blur-2xl group-hover:bg-[var(--gold)]/15 transition-all pointer-events-none" />

                  <div>
                    {/* Header: Number & Motion Icon */}
                    <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
                      <span className="font-mono text-[0.6rem] sm:text-xs tracking-wider sm:tracking-widest text-[var(--gold-light)] uppercase font-semibold">
                        0{pillar.number.slice(-1)} / PROTOCOL
                      </span>

                      {/* Animated Motion Icon */}
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-black group-hover:shadow-[0_0_15px_rgba(218,189,126,0.4)] transition-all shrink-0"
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 transition-transform group-hover:scale-105" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="mt-3 sm:mt-5">
                      <span className="text-[0.58rem] sm:text-[0.65rem] tracking-[0.14em] uppercase text-[var(--gold-light)] font-medium block">
                        {pillar.tag}
                      </span>
                      <h3 className="mt-1 sm:mt-2 text-xs sm:text-lg font-serif text-white group-hover:text-[var(--gold-light)] transition-colors font-normal leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 sm:mt-2.5 text-[0.68rem] sm:text-xs text-[#938e86] leading-relaxed font-light line-clamp-4 sm:line-clamp-none">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Badge */}
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5 flex items-center gap-1.5 sm:gap-2 text-[0.58rem] sm:text-[0.65rem] tracking-[0.12em] uppercase text-[#6e6962] group-hover:text-[var(--gold-light)] transition-colors font-medium">
                    <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[var(--gold)] opacity-60 group-hover:opacity-100 shrink-0" />
                    <span className="truncate">{locale === 'vi' ? 'Cam Kết Chuẩn Mực' : 'Verified Protocol'}</span>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
