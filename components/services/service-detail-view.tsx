'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Check,
  Clock,
  Users,
  MapPin,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import { INITIAL_VENUES, type VenueData } from '@/lib/data-store';
import { useI18n } from '@/lib/i18n/context';

interface ServiceDetailViewProps {
  service: {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    category: string;
    fromPrice: number;
    duration: string;
    guestCapacity: string;
    location: string;
    image: string;
    description: string;
    fullDetails: string;
    inclusions: string[];
    highlights: string[];
  };
}

export function ServiceDetailView({ service: initialService }: ServiceDetailViewProps) {
  const { t, locale } = useI18n();
  const [service, setService] = useState(initialService);
  const [venues, setVenues] = useState<VenueData[]>(INITIAL_VENUES);

  useEffect(() => {
    try {
      const savedVenues = localStorage.getItem('aurelis_venues');
      if (savedVenues) {
        setVenues(JSON.parse(savedVenues));
      }

      const savedServices = localStorage.getItem('aurelis_services');
      if (savedServices) {
        const parsed = JSON.parse(savedServices);
        const found = parsed.find((s: any) => s.slug === initialService.slug);
        if (found) {
          setService({
            ...initialService,
            ...found,
            image: found.image || initialService.image,
            name: found.name || initialService.name,
            tagline: found.tagline || initialService.tagline,
            description: found.description || initialService.description,
            fullDetails: found.fullDetails || initialService.fullDetails,
          });
        }
      }
    } catch {}
  }, [initialService]);

  // Filter venues matching this service category
  const relatedVenues = venues.filter((v) => v.serviceSlug === service.slug);

  const getCityLabel = (slug: string) => {
    if (slug === 'ho-chi-minh-city') return locale === 'vi' ? 'TP. Hồ Chí Minh' : 'Ho Chi Minh City';
    if (slug === 'da-nang') return locale === 'vi' ? 'Đà Nẵng & Hội An' : 'Da Nang & Hoi An';
    if (slug === 'vung-tau') return locale === 'vi' ? 'Vũng Tàu' : 'Vung Tau';
    if (slug === 'phu-quoc') return locale === 'vi' ? 'Đảo Phú Quốc' : 'Phu Quoc Island';
    if (slug === 'nha-trang') return locale === 'vi' ? 'Nha Trang & Cam Ranh' : 'Nha Trang & Cam Ranh';
    return slug;
  };

  return (
    <div className="bg-[#050505] min-h-screen text-[#f3eee5] font-sans">
      {/* Cinematic Hero */}
      <div
        className="relative min-h-[60vh] sm:min-h-[68vh] flex flex-col justify-end p-6 sm:p-14 lg:p-20 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${service.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/40 text-[var(--gold-light)] text-xs tracking-widest uppercase font-mono mb-4">
            <Sparkles size={12} />
            <span>{service.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.1] font-normal">
            {service.name}
          </h1>

          <p className="mt-2 text-base sm:text-lg font-serif italic text-[var(--gold-light)]">
            {service.tagline}
          </p>

          <p className="mt-4 text-xs sm:text-sm text-[#b8b3ab] leading-relaxed max-w-2xl font-light">
            {service.fullDetails}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href={`/booking?service=${service.slug}`}
              className="inline-flex items-center gap-2 px-7 py-3 text-xs tracking-[0.16em] uppercase font-bold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-lg shadow-lg hover:opacity-90 transition-opacity"
            >
              <span>{locale === 'vi' ? 'Đặt Trải Nghiệm Này' : 'Reserve This Collection'}</span>
              <ArrowUpRight size={14} />
            </Link>
            <span className="text-xs text-[#888] font-mono">
              {relatedVenues.length} {locale === 'vi' ? 'địa điểm đối tác đã thẩm định' : 'verified sanctuaries'}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section: Dynamic Venues List */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 space-y-16">
        <div>
          <div className="pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs tracking-wider uppercase text-[var(--gold-light)] font-semibold">
                {locale === 'vi' ? 'Địa Điểm Phục Vụ Dịch Vụ Này' : 'Sanctuaries & Exclusive Venues'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-white mt-1 font-normal">
                {locale === 'vi' ? 'Danh Sách Địa Điểm Độc Quyền' : 'Venues & Exclusive Addresses'}
              </h2>
            </div>
            <span className="text-xs text-[#888] font-mono">
              {relatedVenues.length} {locale === 'vi' ? 'Địa điểm' : 'Venues'}
            </span>
          </div>

          {relatedVenues.length === 0 ? (
            <div className="py-16 text-center text-[#888] text-xs">
              {locale === 'vi'
                ? 'Chưa có địa điểm nào được phân bổ cho dịch vụ này. Hãy thêm trong Quản trị.'
                : 'No venues currently mapped to this service.'}
            </div>
          ) : (
            <div className="mt-8 space-y-8">
              {relatedVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="rounded-2xl border border-[var(--border)] bg-[#090909] p-6 sm:p-8 hover:border-[var(--gold)]/40 transition-all shadow-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Media */}
                    <div className="lg:col-span-5 space-y-3">
                      <Link
                        href={`/venues/${venue.slug || venue.id}`}
                        className="block group overflow-hidden rounded-xl border border-white/10"
                      >
                        <div
                          className="h-56 sm:h-64 rounded-xl bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url(${venue.heroImage})` }}
                        />
                      </Link>
                      <div className="flex items-center gap-3 text-xs text-[#8e8981]">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-[var(--gold)]" /> {getCityLabel(venue.destinationSlug)} · {venue.neighborhood || venue.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#8e8981]">
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-[var(--gold)]" /> {venue.openingHours}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-7 space-y-4">
                      <div>
                        <div className="inline-block px-2.5 py-0.5 rounded-full bg-[var(--gold)]/10 text-[var(--gold-light)] border border-[var(--gold)]/20 text-xs font-mono uppercase mb-2">
                          {getCityLabel(venue.destinationSlug)}
                        </div>
                        <Link
                          href={`/venues/${venue.slug || venue.id}`}
                          className="text-2xl sm:text-3xl font-serif text-white font-normal hover:text-[var(--gold-light)] transition-colors block"
                        >
                          {venue.name}
                        </Link>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {venue.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-xs px-2.5 py-1 bg-white/[0.04] text-[#b5b0a7] rounded-md border border-white/5 font-light"
                          >
                            ✓ {h}
                          </span>
                        ))}
                      </div>

                      {/* Packages list */}
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <span className="text-xs uppercase tracking-wider text-[#888] block font-medium">
                          {locale === 'vi' ? 'Các Gói Trải Nghiệm Đang Phục Vụ:' : 'Available Packages & Menus:'}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {venue.packages.map((pkg) => (
                            <div
                              key={pkg.id}
                              className="p-3 rounded-lg bg-[#111] border border-white/5 space-y-1"
                            >
                              <h4 className="text-xs font-semibold text-white">{pkg.name}</h4>
                              <span className="text-[0.7rem] text-[#888] block">
                                {pkg.durationMins} {locale === 'vi' ? 'phút' : 'mins'} · {locale === 'vi' ? `Tối đa ${pkg.maxGuests} khách` : `Up to ${pkg.maxGuests} guests`}
                              </span>
                              <div className="space-y-0.5 pt-1">
                                {pkg.inclusions.slice(0, 2).map((inc, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5 text-[0.68rem] text-[#aaa]">
                                    <Check size={11} className="text-[var(--gold)] shrink-0" />
                                    <span className="truncate">{inc}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions: View Editorial Article Page & Booking Button */}
                      <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
                        <Link
                          href={`/venues/${venue.slug || venue.id}`}
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[var(--gold-light)] hover:text-white border border-[var(--gold)]/30 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                        >
                          <BookOpen size={13} />
                          <span>{locale === 'vi' ? 'Xem Bài Viết Giới Thiệu' : 'Read Editorial Story'} →</span>
                        </Link>

                        <Link
                          href={`/booking?service=${service.slug}&venue=${venue.id}`}
                          className="px-6 py-2.5 bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] text-[#090704] text-xs uppercase tracking-wider font-bold rounded-lg shadow-md hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
                        >
                          <span>{locale === 'vi' ? `Đặt Lịch Tại Đây` : `Book Experience`}</span>
                          <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Standards & Discretion Banner */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#090909] border border-[var(--border)] grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <ShieldCheck size={24} className="text-[var(--gold)]" />
            <h4 className="text-base font-serif text-white font-normal">
              {locale === 'vi' ? 'Lối Vào Riêng Tư Kín Đáo' : 'Private Door Policy'}
            </h4>
            <p className="text-xs text-[#8e8981] font-light leading-relaxed">
              {locale === 'vi'
                ? 'Thang máy riêng biệt và lối đi bí mật không qua khu vực chờ công cộng.'
                : 'Dedicated side elevators and confidential entrances without public waiting rooms.'}
            </p>
          </div>
          <div className="space-y-2">
            <Sparkles size={24} className="text-[var(--gold)]" />
            <h4 className="text-base font-serif text-white font-normal">
              {locale === 'vi' ? 'Thiết Kế Trải Nghiệm Riêng' : 'Bespoke Curation'}
            </h4>
            <p className="text-xs text-[#8e8981] font-light leading-relaxed">
              {locale === 'vi'
                ? 'Hương thơm tinh dầu, âm nhạc và tuyển tập rượu vang được chuẩn bị riêng trước khi đến.'
                : 'Personalized aromas, music playlists, and sommelier bottle selections confirmed prior to arrival.'}
            </p>
          </div>
          <div className="space-y-2">
            <HelpCircle size={24} className="text-[var(--gold)]" />
            <h4 className="text-base font-serif text-white font-normal">
              {locale === 'vi' ? 'Đường Dây Quản Gia 24/7' : '24/7 Host Hotline'}
            </h4>
            <p className="text-xs text-[#8e8981] font-light leading-relaxed">
              {locale === 'vi'
                ? 'Kênh liên lạc trực tiếp được mã hóa với quản gia riêng của bạn trong suốt trải nghiệm.'
                : 'Direct encrypted line with your dedicated concierge throughout your evening.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
