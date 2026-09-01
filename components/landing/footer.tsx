'use client';

import Link from 'next/link';
import { Gem, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-white/10 bg-[#050505] text-[#918c84] pt-16 pb-12 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 rounded-full border border-[var(--gold)]/40 flex items-center justify-center bg-[var(--gold)]/10">
                <Gem size={15} className="text-[var(--gold)]" />
              </div>
              <span className="font-serif tracking-[0.25em] text-base text-white font-medium">
                LAURA
              </span>
            </Link>

            <p className="text-xs leading-relaxed max-w-sm text-[#7e7972] font-light">
              {t('hero_desc')}
            </p>

            <div className="pt-2 flex items-center gap-2 text-[0.68rem] text-[var(--gold-light)] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Concierge Desks: Operational 24/7</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3 text-xs">
            <span className="text-[0.68rem] tracking-[0.18em] uppercase text-white font-semibold block">
              {t('nav_services')}
            </span>
            <ul className="space-y-2.5 text-[#a8a39a]">
              <li>
                <Link href="/services/massage-spa" className="hover:text-[var(--gold-light)] transition-colors">
                  Massage - Spa
                </Link>
              </li>
              <li>
                <Link href="/services/wine-tasting-cellar" className="hover:text-[var(--gold-light)] transition-colors">
                  Wine Tasting Cellar
                </Link>
              </li>
              <li>
                <Link href="/services/night-club" className="hover:text-[var(--gold-light)] transition-colors">
                  Night Club
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[var(--gold-light)] hover:underline flex items-center gap-1 font-medium">
                  <span>View All Services</span>
                  <ArrowUpRight size={11} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Destinations */}
          <div className="space-y-3 text-xs">
            <span className="text-[0.68rem] tracking-[0.18em] uppercase text-white font-semibold block">
              {t('nav_destinations')}
            </span>
            <ul className="space-y-2.5 text-[#a8a39a]">
              <li>
                <Link href="/destinations/ho-chi-minh-city" className="hover:text-[var(--gold-light)] transition-colors">
                  {t('dest_hcm')}
                </Link>
              </li>
              <li>
                <Link href="/destinations/da-nang" className="hover:text-[var(--gold-light)] transition-colors">
                  {t('dest_danang')}
                </Link>
              </li>
              <li>
                <Link href="/destinations/vung-tau" className="hover:text-[var(--gold-light)] transition-colors">
                  {t('dest_vungtau')}
                </Link>
              </li>
              <li>
                <Link href="/destinations/phu-quoc" className="hover:text-[var(--gold-light)] transition-colors">
                  {t('dest_phuquoc')}
                </Link>
              </li>
              <li>
                <Link href="/destinations/nha-trang" className="hover:text-[var(--gold-light)] transition-colors">
                  {t('dest_nhatrang')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Confidentiality */}
          <div className="space-y-3 text-xs">
            <span className="text-[0.68rem] tracking-[0.18em] uppercase text-white font-semibold block">
              Confidentiality
            </span>
            <ul className="space-y-2.5 text-[#a8a39a]">
              <li>
                <Link href="/partner-with-us" className="hover:text-[var(--gold-light)] transition-colors">
                  {t('nav_partner')}
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-[var(--gold-light)] transition-colors">
                  {t('nav_journal')}
                </Link>
              </li>
              <li>
                <Link href="/auth/sign-in" className="hover:text-[var(--gold-light)] transition-colors">
                  {t('nav_member_access')}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[var(--gold-light)] transition-colors">
                  {t('nav_admin')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.68rem] text-[#6b665f]">
          <p>© 2026 LAURA Private Experiences · All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-[var(--gold-light)]">
            <ShieldCheck size={13} />
            <span>Strict Discretion & NDA Protection</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
