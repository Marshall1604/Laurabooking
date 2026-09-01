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
  BookOpen,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { INITIAL_VENUES, type VenueData } from '@/lib/data-store';
import { EXPERIENCES } from '@/data/landing';
import { useI18n } from '@/lib/i18n/context';

interface DestinationDetailViewProps {
  destination: {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    curatedVibe: string;
    description: string;
    venueCount: number;
    image: string;
  };
}

export function DestinationDetailView({ destination: initialDestination }: DestinationDetailViewProps) {
  const { t, locale } = useI18n();
  const [destination, setDestination] = useState(initialDestination);
  const [venues, setVenues] = useState<VenueData[]>(INITIAL_VENUES);

  useEffect(() => {
    try {
      const savedVenues = localStorage.getItem('aurelis_venues');
      if (savedVenues) {
        setVenues(JSON.parse(savedVenues));
      }

      const savedDests = localStorage.getItem('aurelis_destinations');
      if (savedDests) {
        const parsed = JSON.parse(savedDests);
        const found = parsed.find((d: any) => d.slug === initialDestination.slug);
        if (found) {
          setDestination({
            ...initialDestination,
            ...found,
            image: found.image || initialDestination.image,
            name: found.name || initialDestination.name,
            tagline: found.tagline || initialDestination.tagline,
            description: found.description || initialDestination.description,
          });
        }
      }
    } catch {}
  }, [initialDestination]);

  // Filter venues matching this city
  const cityVenues = venues.filter((v) => v.destinationSlug === destination.slug);

  const getServiceLabel = (slug: string) => {
    if (slug === 'massage-spa') return 'Massage & Spa';
    if (slug === 'wine-tasting-cellar') return 'Wine Tasting Cellar';
    if (slug === 'night-club') return 'Night Club';
    return slug;
  };

  return (
    <div className="bg-[#050505] min-h-screen text-[#f3eee5] font-sans">
      {/* Destination Hero Banner */}
      <div
        className="relative min-h-[60vh] sm:min-h-[68vh] flex flex-col justify-end p-6 sm:p-14 lg:p-20 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${destination.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/40 text-[var(--gold-light)] text-xs tracking-widest uppercase font-mono mb-4">
            <MapPin size={12} />
            <span>
              {cityVenues.length} {locale === 'vi' ? 'Địa Điểm Thượng Lưu Độc Quyền' : 'Private Sanctuaries Available'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.1] font-normal">
            {destination.name}
          </h1>

          <p className="mt-2 text-base sm:text-lg font-serif italic text-[var(--gold-light)]">
            {destination.tagline}
          </p>

          <p className="mt-4 text-xs sm:text-sm text-[#b8b3ab] leading-relaxed max-w-xl font-light">
            {destination.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href={`/booking?destination=${destination.slug}`}
              className="inline-flex items-center gap-2 px-7 py-3 text-xs tracking-[0.16em] uppercase font-bold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-lg shadow-lg hover:opacity-90 transition-opacity"
            >
              <span>{locale === 'vi' ? `Đặt Lịch Tại ${destination.name}` : `Book In ${destination.name}`}</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Content: All Venues located in this City */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 space-y-16">
        <div>
          <div className="pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs tracking-wider uppercase text-[var(--gold-light)] font-semibold">
                {locale === 'vi' ? `Bộ Sưu Tập Địa Điểm Tại ${destination.name}` : `Curated Addresses in ${destination.name}`}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-white mt-1 font-normal">
                {locale === 'vi' ? 'Khám Phá Không Gian Độc Quyền' : 'Explore Venues & Sanctuaries'}
              </h2>
            </div>
            <span className="text-xs text-[#888] font-mono">
              {cityVenues.length} {locale === 'vi' ? 'Địa điểm' : 'Venues'}
            </span>
          </div>

          {cityVenues.length === 0 ? (
            <div className="py-16 text-center text-[#888] text-xs">
              {locale === 'vi'
                ? `Chưa có địa điểm nào được thêm tại ${destination.name}. Hãy thêm trong trang Quản trị.`
                : `No venues currently active in ${destination.name}.`}
            </div>
          ) : (
            <div className="mt-8 space-y-8">
              {cityVenues.map((venue) => (
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
                          <MapPin size={12} className="text-[var(--gold)]" /> {venue.neighborhood || venue.address}
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
                          {getServiceLabel(venue.serviceSlug)}
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
                          href={`/booking?destination=${destination.slug}&venue=${venue.id}`}
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
      </div>
    </div>
  );
}
