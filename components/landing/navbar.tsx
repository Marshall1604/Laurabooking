'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Gem,
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  User,
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  Wine,
  Flame,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useAuth } from '@/lib/auth/context';
import { useI18n } from '@/lib/i18n/context';
import {
  INITIAL_DESTINATIONS,
  INITIAL_SERVICES,
  type DestinationRecord,
  type ServiceRecord,
} from '@/lib/data-store';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [destinationsDropdownOpen, setDestinationsDropdownOpen] = useState(false);
  const [destinations, setDestinations] = useState<DestinationRecord[]>(INITIAL_DESTINATIONS);
  const [services, setServices] = useState<ServiceRecord[]>(INITIAL_SERVICES);

  const servicesRef = useRef<HTMLDivElement>(null);
  const destinationsRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { t, locale } = useI18n();

  const isServicesActive = pathname === '/services' || pathname?.startsWith('/services/');
  const isDestinationsActive = pathname === '/destinations' || pathname?.startsWith('/destinations/');
  const isPartnerActive = pathname === '/partner-with-us';
  const isJournalActive = pathname === '/journal' || pathname?.startsWith('/journal/');
  const isBookingActive = pathname === '/booking';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadData = () => {
      try {
        const savedD = localStorage.getItem('aurelis_destinations');
        if (savedD) {
          setDestinations(JSON.parse(savedD));
        }
        const savedS = localStorage.getItem('aurelis_services');
        if (savedS) {
          setServices(JSON.parse(savedS));
        }
      } catch {}
    };

    loadData();
    window.addEventListener('aurelis_destinations_updated', loadData);
    window.addEventListener('aurelis_services_updated', loadData);
    return () => {
      window.removeEventListener('aurelis_destinations_updated', loadData);
      window.removeEventListener('aurelis_services_updated', loadData);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (destinationsRef.current && !destinationsRef.current.contains(event.target as Node)) {
        setDestinationsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeDestinations = destinations.filter((d) => d.isActive !== false);

  const getDestinationName = (slug: string, defaultName: string) => {
    if (slug === 'ho-chi-minh-city') return t('dest_hcm');
    if (slug === 'da-nang') return t('dest_danang');
    if (slug === 'vung-tau') return t('dest_vungtau');
    if (slug === 'phu-quoc') return t('dest_phuquoc');
    if (slug === 'nha-trang') return t('dest_nhatrang');
    return defaultName;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[rgba(218,189,126,0.18)] shadow-xl shadow-black/50 py-3.5'
            : 'bg-transparent border-b border-white/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full border border-[var(--gold)]/40 flex items-center justify-center bg-[var(--gold)]/10 group-hover:border-[var(--gold)] transition-colors">
              <Gem size={15} className="text-[var(--gold)] transition-transform group-hover:scale-110" />
            </div>
            <span className="font-serif tracking-[0.25em] text-sm md:text-base text-[var(--foreground)] font-medium">
              LAURA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[0.72rem] tracking-[0.12em] uppercase font-sans font-medium text-[#c5c0b8]">
            {/* Services Dropdown */}
            <div
              className="relative py-2"
              ref={servicesRef}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center gap-1.5 hover:text-[var(--gold-light)] transition-colors uppercase cursor-pointer ${
                  isServicesActive || servicesDropdownOpen ? 'text-[var(--gold-light)] font-semibold' : ''
                }`}
              >
                <span>{t('nav_services')}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-[var(--gold)]' : ''
                  }`}
                />
              </button>

              {/* Gold Underline Indicator */}
              {isServicesActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent rounded-full shadow-[0_0_8px_rgba(218,189,126,0.9)]" />
              )}

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-88 rounded-xl bg-[#0c0c0c]/98 border border-[var(--border)] shadow-2xl p-3 z-50 backdrop-blur-xl"
                  >
                    <div className="px-3 py-1.5 text-[0.6rem] tracking-[0.16em] uppercase text-[#736e67] border-b border-white/5 font-sans font-semibold">
                      {locale === 'zh-CN' ? '甄选体验领域' : locale === 'ko' ? '프라이빗 서비스' : locale === 'vi' ? 'Lĩnh Vực Trải Nghiệm' : 'Curated Domains'}
                    </div>

                    <div className="mt-1.5 space-y-1">
                      {services.filter((s) => s.isActive !== false).map((s) => (
                        <Link
                          key={s.id}
                          href={`/services/${s.slug}`}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="p-2.5 rounded-lg hover:bg-white/[0.04] flex items-center justify-between transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-[var(--gold)]/10 border border-[var(--gold)]/25 flex items-center justify-center text-[var(--gold)] shrink-0 group-hover:bg-[var(--gold)] group-hover:text-black transition-colors">
                              {s.iconName === 'Wine' || s.slug.includes('wine') ? (
                                <Wine size={14} />
                              ) : s.iconName === 'Flame' || s.slug.includes('club') || s.slug.includes('night') ? (
                                <Flame size={14} />
                              ) : (
                                <Sparkles size={14} />
                              )}
                            </div>
                            <span className="text-[0.84rem] font-sans font-medium text-white group-hover:text-[var(--gold-light)] transition-colors truncate max-w-[200px]">
                              {s.name}
                            </span>
                          </div>
                          <ArrowRight size={13} className="text-[#666] group-hover:text-[var(--gold-light)] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>

                    <div className="mt-2 pt-2 border-t border-white/5 px-3 py-1">
                      <Link
                        href="/services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="text-[0.68rem] text-[var(--gold-light)] hover:text-white flex items-center justify-between font-sans uppercase tracking-wider font-semibold"
                      >
                        <span>{t('bento_all_btn')}</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Destinations Dropdown */}
            <div
              className="relative py-2"
              ref={destinationsRef}
              onMouseEnter={() => setDestinationsDropdownOpen(true)}
              onMouseLeave={() => setDestinationsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDestinationsDropdownOpen(!destinationsDropdownOpen)}
                className={`flex items-center gap-1.5 hover:text-[var(--gold-light)] transition-colors uppercase cursor-pointer ${
                  isDestinationsActive || destinationsDropdownOpen ? 'text-[var(--gold-light)] font-semibold' : ''
                }`}
              >
                <span>{t('nav_destinations')}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    destinationsDropdownOpen ? 'rotate-180 text-[var(--gold)]' : ''
                  }`}
                />
              </button>

              {/* Gold Underline Indicator */}
              {isDestinationsActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent rounded-full shadow-[0_0_8px_rgba(218,189,126,0.9)]" />
              )}

              <AnimatePresence>
                {destinationsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-72 rounded-xl bg-[#0c0c0c]/98 border border-[var(--border)] shadow-2xl p-3 z-50 backdrop-blur-xl"
                  >
                    <div className="px-3.5 py-1.5 text-[0.6rem] tracking-[0.16em] uppercase text-[#736e67] border-b border-white/5 font-sans font-semibold">
                      {locale === 'zh-CN' ? `活跃度假圣所 (${activeDestinations.length})` : locale === 'ko' ? `활성 목적지 (${activeDestinations.length})` : locale === 'vi' ? `Điểm Đến Đang Hoạt Động (${activeDestinations.length})` : `Active Sanctuaries (${activeDestinations.length})`}
                    </div>

                    <div className="mt-1.5 space-y-1">
                      {activeDestinations.map((d) => (
                        <Link
                          key={d.id}
                          href={`/destinations/${d.slug}`}
                          onClick={() => setDestinationsDropdownOpen(false)}
                          className="p-2.5 rounded-lg hover:bg-white/[0.04] flex items-center justify-between transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] shrink-0">
                              <MapPin size={12} />
                            </div>
                            <span className="text-[0.84rem] font-sans font-medium text-white group-hover:text-[var(--gold-light)] transition-colors">
                              {getDestinationName(d.slug, d.name)}
                            </span>
                          </div>
                          <ArrowRight size={13} className="text-[#666] group-hover:text-[var(--gold-light)] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-white/5 px-3 py-1 flex items-center justify-between">
                      <Link
                        href="/destinations"
                        onClick={() => setDestinationsDropdownOpen(false)}
                        className="text-[0.68rem] text-[var(--gold-light)] hover:text-white flex items-center gap-1 font-sans uppercase tracking-wider font-semibold"
                      >
                        <span>{t('dest_explore_all')}</span>
                        <ArrowRight size={13} />
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          href="/admin/destinations"
                          onClick={() => setDestinationsDropdownOpen(false)}
                          className="text-[0.65rem] text-[#888] hover:text-[var(--gold-light)] font-sans"
                        >
                          ⚙️ {locale === 'zh-CN' ? '管理城市' : locale === 'ko' ? '도시 관리' : locale === 'vi' ? 'Quản lý' : 'Manage'}
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Partner Link */}
            <div className="relative py-2">
              <Link
                href="/partner-with-us"
                className={`hover:text-[var(--gold-light)] transition-colors uppercase ${
                  isPartnerActive ? 'text-[var(--gold-light)] font-semibold' : ''
                }`}
              >
                {t('nav_partner')}
              </Link>
              {isPartnerActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent rounded-full shadow-[0_0_8px_rgba(218,189,126,0.9)]" />
              )}
            </div>

            {/* Journal Link */}
            <div className="relative py-2">
              <Link
                href="/journal"
                className={`hover:text-[var(--gold-light)] transition-colors uppercase ${
                  isJournalActive ? 'text-[var(--gold-light)] font-semibold' : ''
                }`}
              >
                {t('nav_journal')}
              </Link>
              {isJournalActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent rounded-full shadow-[0_0_8px_rgba(218,189,126,0.9)]" />
              )}
            </div>

            {/* Booking Link */}
            <div className="relative py-2">
              <Link
                href="/booking"
                className={`hover:text-[var(--gold-light)] transition-colors uppercase ${
                  isBookingActive ? 'text-[var(--gold-light)] font-semibold' : ''
                }`}
              >
                Booking
              </Link>
              {isBookingActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent rounded-full shadow-[0_0_8px_rgba(218,189,126,0.9)]" />
              )}
            </div>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />

            {user?.role === 'admin' ? (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-[0.68rem] tracking-[0.1em] uppercase text-[var(--gold-light)] hover:text-white bg-[var(--gold)]/10 border border-[var(--gold)]/30 px-3 py-1.5 rounded transition-colors"
              >
                <LayoutDashboard size={13} />
                <span>{t('nav_admin')}</span>
              </Link>
            ) : user ? (
              <Link
                href="/account"
                className="flex items-center gap-1.5 text-[0.68rem] tracking-[0.1em] uppercase text-[#c5c0b8] hover:text-[var(--gold-light)] px-2.5 py-1.5 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center text-[0.6rem] font-bold">
                  {user.fullName[0]}
                </div>
                <span>{user.fullName.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link
                href="/auth/sign-in"
                className="flex items-center gap-1.5 text-[0.68rem] tracking-[0.1em] uppercase text-[#a5a098] hover:text-[var(--gold-light)] transition-colors px-2 py-1.5"
              >
                <User size={13} />
                <span>{t('nav_member_access')}</span>
              </Link>
            )}

            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-[0.68rem] tracking-[0.14em] uppercase font-sans font-semibold text-[#0a0805] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] hover:opacity-90 transition-opacity border border-[var(--gold-light)] shadow-sm"
            >
              <span>{t('nav_book_now')}</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              aria-label="Toggle Navigation Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[var(--gold)] transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[64px] z-40 bg-[#070707]/95 backdrop-blur-xl border-b border-[var(--border)] p-6 lg:hidden max-h-[85vh] overflow-y-auto font-sans"
          >
            <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.14em] text-[#d5d0c8]">
              {/* Mobile Services Section */}
              <div className="space-y-2 border-b border-white/5 pb-3">
                <span className="text-[var(--gold-light)] font-bold text-[0.68rem] block">
                  {t('nav_services')}
                </span>
                <div className="pl-3 space-y-2 text-[0.72rem] text-[#aaa]">
                  <Link
                    href="/services/massage-spa"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-white flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                    <span>{t('service_massage_title')}</span>
                  </Link>
                  <Link
                    href="/services/wine-tasting-cellar"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-white flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                    <span>{t('service_wine_title')}</span>
                  </Link>
                  <Link
                    href="/services/night-club"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-white flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                    <span>{t('service_club_title')}</span>
                  </Link>
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-[var(--gold-light)]"
                  >
                    {t('bento_all_btn')} →
                  </Link>
                </div>
              </div>

              {/* Mobile Destinations Section */}
              <div className="space-y-2 border-b border-white/5 pb-3">
                <span className="text-[var(--gold-light)] font-bold text-[0.68rem] block">
                  {t('nav_destinations')}
                </span>
                <div className="pl-3 space-y-2 text-[0.72rem] text-[#aaa]">
                  {activeDestinations.map((d) => (
                    <Link
                      key={d.id}
                      href={`/destinations/${d.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 hover:text-white flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                      <span>{getDestinationName(d.slug, d.name)}</span>
                    </Link>
                  ))}
                  <Link
                    href="/destinations"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-[var(--gold-light)]"
                  >
                    {t('dest_explore_all')} →
                  </Link>
                </div>
              </div>

              <Link
                href="/partner-with-us"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-[var(--gold-light)]"
              >
                {t('nav_partner')}
              </Link>
              <Link
                href="/journal"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-[var(--gold-light)]"
              >
                {t('nav_journal')}
              </Link>
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-[var(--gold-light)]"
              >
                Booking
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 flex items-center justify-between hover:text-[var(--gold-light)]"
              >
                <span>{t('nav_member_access')}</span>
                <ShieldCheck size={16} className="text-[var(--gold)]" />
              </Link>
              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 text-[var(--gold-light)] font-bold flex items-center gap-2"
                >
                  <LayoutDashboard size={14} />
                  <span>{t('nav_admin')}</span>
                </Link>
              )}
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 text-center py-3.5 font-bold text-xs tracking-[0.16em] uppercase text-[#0a0805] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b]"
              >
                {t('nav_book_now')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
