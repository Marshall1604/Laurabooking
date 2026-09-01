'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock,
  Users,
  MapPin,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Calendar,
  Building2,
  Share2,
  ChevronRight,
} from 'lucide-react';
import { INITIAL_VENUES, type VenueData } from '@/lib/data-store';
import { useI18n } from '@/lib/i18n/context';

interface VenueDetailViewProps {
  slug: string;
}

export function VenueDetailView({ slug }: VenueDetailViewProps) {
  const { t, locale } = useI18n();
  const [venues, setVenues] = useState<VenueData[]>(INITIAL_VENUES);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aurelis_venues');
      if (saved) {
        setVenues(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const venue = venues.find((v) => v.slug === slug) || venues.find((v) => v.id === slug) || venues[0];

  const getServiceLabel = (sSlug: string) => {
    if (sSlug === 'massage-spa') return 'Massage & Spa';
    if (sSlug === 'wine-tasting-cellar') return 'Wine Tasting Cellar';
    if (sSlug === 'night-club') return 'Night Club';
    return sSlug;
  };

  const getCityLabel = (dSlug: string) => {
    if (dSlug === 'ho-chi-minh-city') return locale === 'vi' ? 'TP. Hồ Chí Minh' : 'Ho Chi Minh City';
    if (dSlug === 'da-nang') return locale === 'vi' ? 'Đà Nẵng & Hội An' : 'Da Nang & Hoi An';
    if (dSlug === 'vung-tau') return locale === 'vi' ? 'Vũng Tàu' : 'Vung Tau';
    if (dSlug === 'phu-quoc') return locale === 'vi' ? 'Đảo Phú Quốc' : 'Phu Quoc Island';
    if (dSlug === 'nha-trang') return locale === 'vi' ? 'Nha Trang & Cam Ranh' : 'Nha Trang & Cam Ranh';
    return dSlug;
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!venue) {
    return (
      <div className="py-24 text-center text-white">
        <h1 className="text-2xl font-serif">Địa Điểm Không Tồn Tại</h1>
        <Link href="/services" className="mt-4 text-xs text-[var(--gold-light)] underline block">
          Quay lại danh sách dịch vụ
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-[#f3eee5] font-sans">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-white/10 bg-[#080808]/80 backdrop-blur-md sticky top-16 z-30 px-5 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between text-xs text-[#888]">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <Link href={`/services/${venue.serviceSlug}`} className="hover:text-[var(--gold-light)] transition-colors flex items-center gap-1">
            <ArrowLeft size={13} />
            <span>{getServiceLabel(venue.serviceSlug)}</span>
          </Link>
          <span>/</span>
          <Link href={`/destinations/${venue.destinationSlug}`} className="hover:text-[var(--gold-light)] transition-colors">
            {getCityLabel(venue.destinationSlug)}
          </Link>
          <span>/</span>
          <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">{venue.name}</span>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-[#aaa] hover:text-white transition-colors shrink-0"
        >
          <Share2 size={12} />
          <span>{copied ? (locale === 'vi' ? 'Đã sao chép link' : 'Link Copied') : (locale === 'vi' ? 'Chia sẻ' : 'Share')}</span>
        </button>
      </div>

      {/* Hero Header */}
      <div
        className="relative min-h-[55vh] sm:min-h-[65vh] flex flex-col justify-end p-6 sm:p-14 lg:p-20 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${venue.heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-[var(--gold-light)] text-xs font-mono uppercase font-semibold">
              {getServiceLabel(venue.serviceSlug)}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-mono uppercase">
              📍 {getCityLabel(venue.destinationSlug)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-normal leading-[1.1]">
            {venue.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#bbb] pt-2 font-light">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[var(--gold)]" />
              <span>{venue.neighborhood || venue.address}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[var(--gold)]" />
              <span>{venue.openingHours}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>{locale === 'vi' ? 'Tiêu Chuẩn Bảo Mật Kín Đáo NDA' : 'Strict NDA Discretion Protocol'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14">
        {/* Left Column: Article Story & Editorial Content */}
        <div className="lg:col-span-8 space-y-10">
          {/* Editorial Article Section */}
          <article className="space-y-6 bg-[#090909] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--gold-light)] font-mono font-semibold pb-3 border-b border-white/10">
              <BookOpen size={14} />
              <span>{locale === 'vi' ? 'Bài Viết Giới Thiệu Không Gian' : 'Editorial Feature Story'}</span>
            </div>

            {venue.promoTitle ? (
              <h2 className="text-2xl sm:text-4xl font-serif text-white font-normal leading-[1.2]">
                {venue.promoTitle}
              </h2>
            ) : (
              <h2 className="text-2xl sm:text-4xl font-serif text-white font-normal leading-[1.2]">
                {venue.name} — {locale === 'vi' ? 'Trải Nghiệm Thượng Lưu Độc Bản' : 'A Sanctuary of Refined Privacy'}
              </h2>
            )}

            {venue.promoExcerpt && (
              <p className="text-sm sm:text-base text-[#e5ded4] italic font-serif leading-relaxed border-l-2 border-[var(--gold)] pl-4 py-1 bg-white/[0.02] rounded-r-lg">
                "{venue.promoExcerpt}"
              </p>
            )}

            {venue.promoStory ? (
              <div className="text-sm sm:text-base text-[#b8b3ab] leading-relaxed font-light whitespace-pre-line space-y-4 pt-2">
                {venue.promoStory}
              </div>
            ) : (
              <div className="text-sm text-[#999] leading-relaxed font-light space-y-3">
                <p>
                  {locale === 'vi'
                    ? `${venue.name} mang đến một không gian thượng lưu kín đáo tuyệt đối, nơi quý khách tận hưởng trọn vẹn những nghi thức phục vụ đỉnh cao, ẩm thực và rượu vang thượng hạng mà không bị làm phiền.`
                    : `${venue.name} provides an impeccably discreet private sanctuary where discerning patrons experience masterfully orchestrated hospitality.`}
                </p>
              </div>
            )}

            {/* Highlights Tag Cloud */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#888] block font-medium">
                {locale === 'vi' ? 'Điểm Nhấn & Đặc Quyền Riêng Biệt:' : 'Exclusive Venue Highlights:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {venue.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 bg-white/[0.04] text-[#ccc] rounded-lg border border-white/10 font-light flex items-center gap-1.5"
                  >
                    <Check size={12} className="text-[var(--gold)]" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Photo Gallery if any */}
          {venue.gallery && venue.gallery.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-white font-normal">
                {locale === 'vi' ? 'Thư Viện Không Gian Thực Tế' : 'Sanctuary Gallery'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {venue.gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="h-56 rounded-xl bg-cover bg-center border border-white/10"
                    style={{ backgroundImage: `url(${imgUrl})` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Packages & Quick Booking Sticky Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c0c] border border-[var(--gold)]/30 shadow-2xl space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[var(--gold-light)] font-semibold block">
                  {locale === 'vi' ? 'Đặt Lịch Trải Nghiệm' : 'Reserve Experience'}
                </span>
                <h3 className="text-xl font-serif text-white mt-1">
                  {venue.name}
                </h3>
              </div>

              {/* Packages List */}
              <div className="space-y-3.5 pt-2">
                <span className="text-xs text-[#888] block font-medium">
                  {locale === 'vi' ? `Danh Sách Gói Phục Vụ (${venue.packages.length} gói):` : `Available Packages (${venue.packages.length}):`}
                </span>

                {venue.packages.map((pkg, idx) => (
                  <div
                    key={pkg.id}
                    className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-white">{pkg.name}</h4>
                      <span className="text-[0.65rem] px-2 py-0.5 bg-[var(--gold)]/10 text-[var(--gold-light)] rounded border border-[var(--gold)]/20 font-mono">
                        {pkg.durationMins} {locale === 'vi' ? 'Phút' : 'Mins'}
                      </span>
                    </div>

                    <div className="space-y-1 text-[0.7rem] text-[#aaa]">
                      {pkg.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <Check size={11} className="text-[var(--gold)] shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Booking Button */}
              <Link
                href={`/booking?service=${venue.serviceSlug}&venue=${venue.id}`}
                className="w-full text-center block py-3.5 bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] text-[#090704] text-xs uppercase tracking-widest font-bold rounded-xl shadow-lg hover:scale-[1.01] transition-all"
              >
                {locale === 'vi' ? 'Đặt Lịch Trải Nghiệm Ngay' : 'Proceed To Booking'} →
              </Link>

              <div className="pt-3 border-t border-white/10 text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <ShieldCheck size={14} />
                  <span>{locale === 'vi' ? 'Quản Gia Riêng Tiếp Nhận 24/7' : '24/7 Dedicated Concierge'}</span>
                </div>
                <p className="text-[0.68rem] text-[#777]">
                  {locale === 'vi'
                    ? 'Thông tin đặt chỗ được bảo mật và tư vấn trực tiếp không lộ danh tính.'
                    : 'All inquiries handled with strict confidentiality and bespoke host care.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
