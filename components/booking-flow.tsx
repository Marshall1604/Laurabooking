'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
  Clock,
  Users,
  MapPin,
  ShieldCheck,
  Tag,
  ArrowRight,
  CheckCircle2,
  Lock,
  Building2,
  Layers,
  Coins,
  Phone,
  MessageSquare,
  User,
  Gem,
  Printer,
  Download,
  Loader2,
} from 'lucide-react';
import { INITIAL_VENUES, type VenueData } from '@/lib/data-store';
import { DESTINATIONS } from '@/data/landing';
import { useAuth } from '@/lib/auth/context';
import { useI18n } from '@/lib/i18n/context';

interface BookingFormData {
  serviceSlug: string;
  destinationSlug: string;
  venueId: string;
  packageId: string;
  guests: number;
  date: string;
  timeSlot: string;
  country: string;
  preferredLanguage: string;
  name: string;
  email: string;
  phone: string;
  messagingApp: string;
  specialRequests: string;
  promoCode: string;
  agreeNda: boolean;
}

const TIME_SLOTS = ['17:30', '18:30', '19:45', '21:00', '22:30', '23:45'];

const MESSAGING_APPS = [
  { id: 'WhatsApp', label: 'WhatsApp', icon: '💬' },
  { id: 'Telegram', label: 'Telegram', icon: '✈️' },
  { id: 'Line', label: 'Line', icon: '🟢' },
  { id: 'KakaoTalk', label: 'KakaoTalk', icon: '🟡' },
  { id: 'WeChat', label: 'WeChat', icon: '🟢' },
];

const COUNTRIES = [
  'United States (+1)',
  'China (+86)',
  'South Korea (+82)',
  'Taiwan (+886)',
  'Thailand (+66)',
  'Singapore (+65)',
  'Hong Kong (+852)',
  'Japan (+81)',
  'United Kingdom (+44)',
  'France (+33)',
  'Switzerland (+41)',
];

export function BookingFlow() {
  const { user } = useAuth();
  const { t, locale } = useI18n();
  const [venuesList, setVenuesList] = useState<VenueData[]>(INITIAL_VENUES);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aurelis_venues');
      if (saved) {
        setVenuesList(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const STEP_TITLES = [
    t('step_service'),
    t('step_destination'),
    t('step_package'),
    t('step_guests'),
    t('step_contact'),
    t('step_review'),
  ];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const [formData, setFormData] = useState<BookingFormData>({
    serviceSlug: 'massage-spa',
    destinationSlug: 'ho-chi-minh-city',
    venueId: '',
    packageId: '',
    guests: 2,
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    timeSlot: '19:45',
    country: 'United States (+1)',
    preferredLanguage: locale === 'vi' ? 'Tiếng Việt' : 'English',
    name: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    messagingApp: 'WhatsApp',
    specialRequests: '',
    promoCode: '',
    agreeNda: true,
  });

  const availableVenues = useMemo(() => {
    const list = venuesList.filter(
      (v) =>
        v.serviceSlug === formData.serviceSlug &&
        (formData.destinationSlug ? v.destinationSlug === formData.destinationSlug : true)
    );
    return list.length > 0 ? list : venuesList.filter((v) => v.serviceSlug === formData.serviceSlug);
  }, [venuesList, formData.serviceSlug, formData.destinationSlug]);

  const selectedVenue = useMemo(() => {
    return (
      venuesList.find((v) => v.id === formData.venueId) ||
      availableVenues[0] ||
      venuesList[0]
    );
  }, [venuesList, formData.venueId, availableVenues]);

  const selectedPackage = useMemo(() => {
    if (!selectedVenue || !selectedVenue.packages || selectedVenue.packages.length === 0) {
      return {
        id: 'default-pkg',
        name: locale === 'vi' ? 'Gói Trải Nghiệm Thượng Lưu' : 'Luxury Bespoke Package',
        durationMins: 120,
        priceUsd: 0,
        priceVnd: 0,
        maxGuests: 4,
        inclusions: locale === 'vi' ? ['Đồ uống chào mừng', 'Phục vụ riêng tư', 'Hỗ trợ quản gia'] : ['Champagne Welcome', 'Private Suite Buyout', 'Dedicated Host Escort'],
      };
    }
    return (
      selectedVenue.packages.find((p) => p.id === formData.packageId) ||
      selectedVenue.packages[0]
    );
  }, [selectedVenue, formData.packageId, locale]);

  const handleApplyPromo = () => {
    if (
      formData.promoCode.trim().toUpperCase() === 'AURELISVIP' ||
      formData.promoCode.trim().toUpperCase() === 'PRIVELUXURY'
    ) {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError(locale === 'vi' ? 'Mã ưu đãi không hợp lệ' : 'Invalid promo code');
    }
  };

  const handleConfirmReservation = () => {
    const generatedRef = `LAURA-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setBookingRef(generatedRef);

    // Save to bookings list in localStorage
    try {
      const savedBookings = JSON.parse(localStorage.getItem('aurelis_bookings') || '[]');
      const newBooking = {
        id: `book-${Date.now()}`,
        referenceCode: generatedRef,
        guestName: formData.name || (locale === 'vi' ? 'Thượng Khách Bí Mật' : 'Discreet Guest'),
        guestEmail: formData.email || 'guest@laura.vip',
        guestPhone: formData.phone || '',
        messagingApp: formData.messagingApp || 'WhatsApp',
        country: formData.country || 'United States (+1)',
        venueName: selectedVenue.name,
        packageName: selectedPackage.name,
        serviceSlug: formData.serviceSlug,
        destinationSlug: formData.destinationSlug,
        date: formData.date,
        timeSlot: formData.timeSlot,
        guests: formData.guests,
        totalAmountUsd: selectedPackage.priceUsd || 0,
        status: 'pending',
        specialRequests: formData.specialRequests,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('aurelis_bookings', JSON.stringify([newBooking, ...savedBookings]));
    } catch {}

    setIsSubmitted(true);
  };

  const handleDownloadPng = () => {
    setIsDownloading(true);
    try {
      const width = 1000;
      const height = 1380;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsDownloading(false);
        return;
      }

      // 1. Luxury Dark Obsidian Background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Outer Luxury Gold Border
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 3;
      ctx.strokeRect(35, 35, width - 70, height - 70);

      // Inner Border
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
      ctx.lineWidth = 1;
      ctx.strokeRect(45, 45, width - 90, height - 90);

      // 2. Gold Badge Header
      ctx.fillStyle = 'rgba(212, 175, 55, 0.12)';
      ctx.beginPath();
      ctx.roundRect(width / 2 - 210, 70, 420, 36, 18);
      ctx.fill();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#e6c88b';
      ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        locale === 'vi' ? '◆ THẺ VÉ ĐẶC QUYỀN VIP · XUẤT TRÌNH TẠI CƠ SỞ ◆' : '◆ OFFICIAL VIP ACCESS PASS & TICKET ◆',
        width / 2,
        93
      );

      // 3. Brand Title: LAURA BOOKING
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 54px Georgia, "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.fillText('LAURA BOOKING', width / 2, 170);

      ctx.fillStyle = '#9d9890';
      ctx.font = '15px system-ui, -apple-system, sans-serif';
      ctx.fillText(
        locale === 'vi'
          ? 'Thẻ thông hành điện tử chính thức dành cho thượng khách tại cơ sở'
          : 'Official digital VIP pass to be presented upon arrival at reception',
        width / 2,
        205
      );

      // 4. Dossier Code Strip
      ctx.fillStyle = '#121212';
      ctx.beginPath();
      ctx.roundRect(75, 235, width - 150, 75, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#888888';
      ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
      ctx.fillText(locale === 'vi' ? 'MÃ VÉ ĐẶC QUYỀN (DOSSIER CODE)' : 'OFFICIAL DOSSIER CODE', 100, 263);

      ctx.fillStyle = '#e6c88b';
      ctx.font = 'bold 26px monospace';
      ctx.fillText(bookingRef || 'LAURA-2026-VIP', 100, 293);

      // Confirmed Badge Right
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.beginPath();
      ctx.roundRect(width - 250, 253, 145, 36, 8);
      ctx.fill();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.stroke();

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(locale === 'vi' ? '● ĐÃ XÁC NHẬN VIP' : '● VIP CONFIRMED', width - 177, 276);

      // 5. Venue Box
      ctx.fillStyle = '#121212';
      ctx.beginPath();
      ctx.roundRect(75, 330, width - 150, 100, 12);
      ctx.fill();
      ctx.strokeStyle = '#222222';
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px Georgia, "Playfair Display", serif';
      ctx.fillText(selectedVenue.name, 100, 365);

      ctx.fillStyle = '#e6c88b';
      ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
      ctx.fillText(selectedPackage.name, 100, 392);

      ctx.fillStyle = '#888888';
      ctx.font = '13px system-ui, -apple-system, sans-serif';
      ctx.fillText('📍 ' + (selectedVenue.neighborhood || selectedVenue.address), 100, 415);

      // 6. Grid Items
      const gridItems = [
        { label: locale === 'vi' ? '📅 Ngày Đến:' : '📅 Date:', val: formData.date },
        { label: locale === 'vi' ? '⏰ Khung Giờ:' : '⏰ Time Slot:', val: formData.timeSlot },
        { label: locale === 'vi' ? '👥 Số Khách:' : '👥 Party Size:', val: `${formData.guests} ${locale === 'vi' ? 'Khách' : 'Guests'}` },
        { label: locale === 'vi' ? '🥞 Thời Lượng:' : '🥞 Duration:', val: `${selectedPackage.durationMins} ${locale === 'vi' ? 'Phút' : 'Mins'}` },
        { label: locale === 'vi' ? '👤 Họ và Tên:' : '👤 Guest Name:', val: formData.name || (locale === 'vi' ? 'Thượng Khách' : 'Discreet Guest') },
        { label: locale === 'vi' ? '📞 Số ĐT:' : '📞 Phone:', val: formData.phone || '—' },
        { label: locale === 'vi' ? '💬 Kênh Liên Hệ:' : '💬 Contact App:', val: formData.messagingApp },
        {
          label: locale === 'vi' ? '🪙 Giá Gói:' : '🪙 Price:',
          val: locale === 'vi'
            ? (selectedPackage.priceVnd > 0 ? `${selectedPackage.priceVnd.toLocaleString('vi-VN')} đ` : `$${selectedPackage.priceUsd}`)
            : `$${selectedPackage.priceUsd}`,
          highlight: true,
        },
      ];

      const startY = 450;
      const boxW = (width - 150 - 20) / 2;
      const boxH = 70;

      gridItems.forEach((item, idx) => {
        const row = Math.floor(idx / 2);
        const col = idx % 2;
        const x = 75 + col * (boxW + 20);
        const y = startY + row * (boxH + 12);

        ctx.fillStyle = item.highlight ? 'rgba(212, 175, 55, 0.12)' : '#121212';
        ctx.beginPath();
        ctx.roundRect(x, y, boxW, boxH, 8);
        ctx.fill();
        ctx.strokeStyle = item.highlight ? 'rgba(212, 175, 55, 0.5)' : '#222222';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillStyle = item.highlight ? '#e6c88b' : '#888888';
        ctx.font = '12px system-ui, -apple-system, sans-serif';
        ctx.fillText(item.label, x + 16, y + 26);

        ctx.fillStyle = item.highlight ? '#e6c88b' : '#ffffff';
        ctx.font = item.highlight ? 'bold 17px monospace' : 'bold 15px monospace';
        ctx.fillText(item.val, x + 16, y + 54);
      });

      // 7. Inclusions Box
      const incY = 795;
      ctx.fillStyle = '#121212';
      ctx.beginPath();
      ctx.roundRect(75, incY, width - 150, 200, 12);
      ctx.fill();
      ctx.strokeStyle = '#222222';
      ctx.stroke();

      ctx.fillStyle = '#e6c88b';
      ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(locale === 'vi' ? 'ĐẶC QUYỀN ĐÃ BAO GỒM TRONG VÉ:' : 'COMPLIMENTARY INCLUSIONS:', 100, incY + 34);

      selectedPackage.inclusions.slice(0, 4).forEach((inc, i) => {
        const iy = incY + 68 + i * 32;
        ctx.fillStyle = '#34d399';
        ctx.font = '14px system-ui, -apple-system, sans-serif';
        ctx.fillText('✓', 100, iy);

        ctx.fillStyle = '#cccccc';
        ctx.font = '14px system-ui, -apple-system, sans-serif';
        ctx.fillText(inc, 125, iy);
      });

      // 8. Protocol Notice
      const footY = 1020;
      ctx.fillStyle = 'rgba(212, 175, 55, 0.08)';
      ctx.beginPath();
      ctx.roundRect(75, footY, width - 150, 60, 10);
      ctx.fill();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.stroke();

      ctx.fillStyle = '#e6c88b';
      ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        locale === 'vi' ? '🛡️ LỐI ĐI RIÊNG FAST-TRACK · KHÔNG CẦN XẾP HÀNG CHỜ ĐỢI' : '🛡️ ZERO-QUEUE VIP FAST-TRACK ACCESS',
        width / 2,
        footY + 36
      );

      // Copyright
      ctx.fillStyle = '#555555';
      ctx.font = '12px monospace';
      ctx.fillText('LAURA PRIVATE EXPERIENCES · OFFICIAL VIP RESERVATION', width / 2, height - 75);

      // Export to Blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          setIsDownloading(false);
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `LAURA-BOOKING-${bookingRef || 'VIP'}.png`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          setIsDownloading(false);
        }, 400);
      }, 'image/png');
    } catch (err) {
      console.error('Download ticket error:', err);
      setIsDownloading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-10 sm:py-14 max-w-xl mx-auto px-3 sm:px-5 font-sans">
        {/* Success Icon */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[var(--gold)] to-[var(--gold-light)] mx-auto flex items-center justify-center text-black shadow-xl shadow-[var(--gold)]/20 mb-5">
          <CheckCircle2 size={30} />
        </div>

        <div className="text-center mb-6">
          <span className="text-[0.7rem] uppercase tracking-widest text-[var(--gold-light)] font-mono font-semibold">
            {locale === 'vi' ? 'Hồ Sơ Đặt Chỗ Đã Được Xác Nhận' : 'Reservation Dossier Confirmed'}
          </span>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-serif text-white font-normal">
            {locale === 'vi' ? 'Sắp Đặt Trải Nghiệm Thành Công' : 'Bespoke Experience Arranged'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#a8a39a] leading-relaxed max-w-md mx-auto font-light">
            {locale === 'vi'
              ? 'Mọi thông tin đã được mã hóa bảo mật. Quản gia riêng LAURA sẽ liên hệ qua ứng dụng bạn đã chọn trong vòng 15 phút.'
              : 'Your request is secured under NDA standards. Your personal LAURA host will connect via your selected messaging app within 15 minutes.'}
          </p>
        </div>

        {/* OFFICIAL VIP ACCESS PASS / E-TICKET CARD (Exportable to .PNG) */}
        <div
          id="laura-vip-ticket-pass"
          className="p-5 sm:p-7 rounded-2xl bg-[#0c0c0c] border border-[var(--gold)]/40 shadow-2xl space-y-5 relative overflow-hidden text-left"
        >
          {/* Subtle Ambient Gold Aura Glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-[var(--gold)]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Ticket Header Banner */}
          <div className="text-center pb-5 border-b border-white/10 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold-light)] text-[0.65rem] tracking-[0.2em] uppercase font-mono font-bold mb-2.5">
              <Gem size={12} className="text-[var(--gold)]" />
              <span>{locale === 'vi' ? 'THẺ VÉ ĐẶC QUYỀN VIP · XUẤT TRÌNH TẠI CƠ SỞ' : 'OFFICIAL VIP ACCESS PASS & TICKET'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-[0.05em] leading-tight">
              LAURA BOOKING
            </h1>
            <p className="text-[0.72rem] text-[#9d9890] mt-1.5 font-light">
              {locale === 'vi'
                ? 'Thẻ thông hành điện tử chính thức dành riêng cho thượng khách khi đến cơ sở.'
                : 'Official digital VIP pass to be presented upon arrival at the sanctuary reception.'}
            </p>
          </div>

          {/* Official Dossier Reference Strip */}
          <div className="flex flex-row items-center justify-between p-3.5 rounded-xl bg-black/60 border border-[var(--gold)]/30 gap-2">
            <div>
              <span className="text-[0.6rem] tracking-[0.15em] uppercase text-[#888] font-mono block">
                {locale === 'vi' ? 'MÃ VÉ ĐẶC QUYỀN' : 'DOSSIER CODE'}
              </span>
              <span className="font-mono text-base sm:text-xl font-bold text-[var(--gold-light)] tracking-wider">
                {bookingRef}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[0.68rem] text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-lg shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono font-semibold">{locale === 'vi' ? 'ĐÃ XÁC NHẬN' : 'CONFIRMED'}</span>
            </div>
          </div>

          {/* Selected Venue Header */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-cover bg-center shrink-0 border border-white/10 bg-[#161616]"
              style={{ backgroundImage: `url(${selectedVenue.heroImage})` }}
            />
            <div className="min-w-0">
              <h4 className="text-sm sm:text-base font-serif text-white truncate">{selectedVenue.name}</h4>
              <p className="text-xs text-[var(--gold-light)] font-medium truncate">{selectedPackage.name}</p>
              <p className="text-[0.7rem] text-[#888] flex items-center gap-1 mt-0.5 truncate">
                <MapPin size={11} className="text-[var(--gold)] shrink-0" />
                <span className="truncate">{selectedVenue.neighborhood || selectedVenue.address}</span>
              </p>
            </div>
          </div>

          {/* Full Breakdown (Compact, Mobile-Optimized Grid) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 text-xs text-[#9d9890] pt-1">
            {/* Date */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="flex items-center gap-1 text-[0.68rem] text-[#888] mb-0.5">
                <Calendar size={11} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Ngày Đến:' : 'Date:'}
              </span>
              <span className="text-white font-mono font-medium block truncate">{formData.date}</span>
            </div>

            {/* Time Slot */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="flex items-center gap-1 text-[0.68rem] text-[#888] mb-0.5">
                <Clock size={11} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Khung Giờ:' : 'Time Slot:'}
              </span>
              <span className="text-white font-mono font-medium block truncate">{formData.timeSlot}</span>
            </div>

            {/* Party Size */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="flex items-center gap-1 text-[0.68rem] text-[#888] mb-0.5">
                <Users size={11} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Số Khách:' : 'Party Size:'}
              </span>
              <span className="text-white font-mono font-medium block truncate">
                {formData.guests} {locale === 'vi' ? 'Khách' : 'Guests'}
              </span>
            </div>

            {/* Duration */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="flex items-center gap-1 text-[0.68rem] text-[#888] mb-0.5">
                <Layers size={11} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Thời Lượng:' : 'Duration:'}
              </span>
              <span className="text-white font-mono font-medium block truncate">
                {selectedPackage.durationMins} {locale === 'vi' ? 'Phút' : 'Mins'}
              </span>
            </div>

            {/* Guest Name */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="flex items-center gap-1 text-[0.68rem] text-[#888] mb-0.5">
                <User size={11} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Họ và Tên:' : 'Guest Name:'}
              </span>
              <span className="text-white font-medium block truncate">
                {formData.name || (locale === 'vi' ? 'Thượng Khách' : 'Discreet Guest')}
              </span>
            </div>

            {/* Phone Number */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="flex items-center gap-1 text-[0.68rem] text-[#888] mb-0.5">
                <Phone size={11} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Số ĐT:' : 'Phone:'}
              </span>
              <span className="text-white font-mono font-medium block truncate">{formData.phone || '—'}</span>
            </div>

            {/* Contact Via App */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="flex items-center gap-1 text-[0.68rem] text-[#888] mb-0.5">
                <MessageSquare size={11} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Kênh Liên Hệ:' : 'App:'}
              </span>
              <span className="text-[var(--gold-light)] font-mono font-semibold block truncate">{formData.messagingApp}</span>
            </div>

            {/* Package Investment */}
            <div className="p-2.5 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/30">
              <span className="flex items-center gap-1 text-[0.68rem] text-[var(--gold-light)] font-semibold mb-0.5">
                <Coins size={11} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Giá Gói:' : 'Price:'}
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[var(--gold-light)] block truncate">
                {locale === 'vi'
                  ? (selectedPackage.priceVnd > 0 ? `${selectedPackage.priceVnd.toLocaleString('vi-VN')} đ` : `$${selectedPackage.priceUsd}`)
                  : `$${selectedPackage.priceUsd}`}
              </span>
            </div>
          </div>

          {/* Inclusions & Privileges */}
          <div className="pt-3 border-t border-white/10 space-y-1.5">
            <span className="text-[0.7rem] text-[var(--gold-light)] uppercase tracking-wider font-semibold block">
              {locale === 'vi' ? 'Đặc Quyền Đã Bao Gồm Trong Vé:' : 'Complimentary Inclusions:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {selectedPackage.inclusions.map((inc, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[0.72rem] text-[#ccc]">
                  <Check size={12} className="text-[var(--gold)] shrink-0" />
                  <span className="truncate">{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Requests if provided */}
          {formData.specialRequests && (
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-[0.72rem] text-[#aaa]">
              <span className="text-[var(--gold-light)] font-medium block mb-0.5">
                {locale === 'vi' ? 'Ghi Chú Đón Tiếp Riêng:' : 'Special Accommodations:'}
              </span>
              <p className="italic text-white/90">{formData.specialRequests}</p>
            </div>
          )}

          {/* VIP Fast-Track Entrance Notice */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[0.68rem] text-[#777]">
            <div className="flex items-center gap-1.5 text-[var(--gold-light)] font-medium">
              <ShieldCheck size={13} />
              <span>{locale === 'vi' ? 'Lối Đi Riêng & Không Chờ Đợi' : 'Zero-Queue VIP Fast Track'}</span>
            </div>
            <span className="font-mono text-[0.62rem] text-[#888]">LAURA VIP PROTOCOL</span>
          </div>
        </div>

        {/* Action Buttons (Optimized for iPhone / Mobile & Desktop) */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Download PNG Button */}
          <button
            type="button"
            disabled={isDownloading}
            onClick={handleDownloadPng}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-bold text-[#0a0805] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(218,189,126,0.3)] transition-all disabled:opacity-50 cursor-pointer"
          >
            {isDownloading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>{locale === 'vi' ? 'Đang Tạo Ảnh...' : 'Generating Image...'}</span>
              </>
            ) : (
              <>
                <Download size={15} />
                <span>{locale === 'vi' ? 'Tải Ảnh Vé VIP .PNG' : 'Save Ticket .PNG'}</span>
              </>
            )}
          </button>

          {/* Return Home */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-wider text-white border border-white/15 hover:border-[var(--gold)] rounded-lg transition-colors font-medium cursor-pointer"
          >
            {locale === 'vi' ? 'Về Trang Chủ' : 'Return Home'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 font-sans">
      {/* Mobile Step Header (Sleek progress bar on phones) */}
      <div className="md:hidden mb-6 p-4 rounded-xl bg-[#0e0e0e] border border-[var(--gold)]/20">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-[var(--gold-light)] font-bold uppercase tracking-wider">
            {locale === 'vi' ? `Bước ${currentStep + 1} / 5` : `Step ${currentStep + 1} of 5`}
          </span>
          <span className="text-white font-medium">{STEP_TITLES[currentStep]}</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] transition-all duration-300 rounded-full"
            style={{ width: `${((currentStep + 1) / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop & Tablet Step Indicator */}
      <div className="hidden md:block mb-10 overflow-x-auto pb-4">
        <div className="flex items-center justify-between min-w-[650px] relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 z-0" />
          {STEP_TITLES.map((title, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => idx <= currentStep && setCurrentStep(idx)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs transition-all ${
                    isCurrent
                      ? 'bg-[var(--gold)] text-[#090704] font-bold shadow-lg shadow-[var(--gold)]/25 ring-4 ring-[var(--gold)]/20'
                      : isCompleted
                      ? 'bg-white/15 text-white border border-[var(--gold)]/50'
                      : 'bg-[#111] text-[#666] border border-white/10'
                  }`}
                >
                  {isCompleted ? <Check size={14} /> : idx + 1}
                </button>
                <span
                  className={`text-[0.7rem] uppercase tracking-wider whitespace-nowrap font-medium ${
                    isCurrent ? 'text-[var(--gold-light)]' : isCompleted ? 'text-white' : 'text-[#666]'
                  }`}
                >
                  {title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Step Form Container */}
        <div className="lg:col-span-7 bg-[#0a0a0a] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* STEP 0: Select Collection */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif text-white font-normal">
                {locale === 'vi' ? 'Chọn Bộ Sưu Tập Trải Nghiệm' : 'Select Experience Collection'}
              </h2>
              <p className="text-xs text-[#9c978f] font-light">
                {locale === 'vi'
                  ? 'Lựa chọn phong cách và không gian trải nghiệm bạn muốn sắp đặt.'
                  : 'Choose the world of luxury relaxation or entertainment.'}
              </p>

              <div className="space-y-3 pt-2">
                {[
                  {
                    slug: 'massage-spa',
                    name: locale === 'vi' ? 'Massage & Spa Penthouse Suite' : 'Penthouse Botanical Massage & Spa',
                    tag: locale === 'vi' ? 'Penthouse Wellness' : 'Penthouse Wellness',
                    desc: locale === 'vi' ? 'Nghi thức thảo mộc phục hồi, khoáng nóng và suite riêng trên tầng cao.' : 'Restorative botanical rituals in serene private penthouse suites.',
                    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
                  },
                  {
                    slug: 'wine-tasting-cellar',
                    name: locale === 'vi' ? 'Wine Tasting Cellar & Grand Cru Vault' : 'Wine Tasting Cellar & Sommelier Vault',
                    tag: locale === 'vi' ? 'Private Oenology' : 'Private Oenology',
                    desc: locale === 'vi' ? 'Hầm đá vôi ngầm cùng chuyên gia Sommelier nếm thử các niên vụ quý hiếm.' : 'Sommelier-led journeys through Grand Cru bottles in hidden cellars.',
                    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
                  },
                  {
                    slug: 'night-club',
                    name: locale === 'vi' ? 'VIP Night Club & Stagefront Tables' : 'VIP Night Club & Stagefront Enclaves',
                    tag: locale === 'vi' ? 'After-Dark Access' : 'After-Dark Access',
                    desc: locale === 'vi' ? 'Lối vào riêng không xếp hàng, vị trí bàn trung tâm VIP nhất và vệ sĩ riêng.' : 'Priority red-carpet bypass, discreet security, and frontline stage tables.',
                    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?auto=format&fit=crop&w=800&q=80',
                  },
                ].map((item) => {
                  const isSelected = formData.serviceSlug === item.slug;
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          serviceSlug: item.slug,
                          venueId: '',
                          packageId: '',
                        }));
                      }}
                      className={`w-full text-left p-4 rounded-xl border flex items-center gap-4 transition-all ${
                        isSelected
                          ? 'bg-[#12100d] border-[var(--gold)] shadow-lg shadow-[var(--gold)]/10 ring-1 ring-[var(--gold)]/40'
                          : 'bg-[#090909] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div
                        className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0 border border-white/10"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[0.65rem] tracking-wider uppercase text-[var(--gold-light)] font-mono block">
                          {item.tag}
                        </span>
                        <h3 className="text-base font-serif text-white mt-0.5">{item.name}</h3>
                        <p className="text-xs text-[#8f8a82] mt-0.5 font-light line-clamp-1">{item.desc}</p>
                      </div>
                      {isSelected && <Check size={18} className="text-[var(--gold)] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 1: Destination & Venue */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif text-white font-normal">
                {locale === 'vi' ? 'Điểm Đến & Địa Điểm Độc Quyền' : 'Destination & Partner Venue'}
              </h2>
              <p className="text-xs text-[#9c978f] font-light">
                {locale === 'vi'
                  ? 'Chọn thành phố và địa chỉ đối tác sang trọng trong hệ thống.'
                  : 'Select your preferred city and exclusive venue address.'}
              </p>

              {/* Destination Filter Tabs */}
              <div className="flex flex-wrap gap-2 pt-2">
                {DESTINATIONS.map((d) => (
                  <button
                    key={d.slug}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, destinationSlug: d.slug, venueId: '' }))}
                    className={`px-3.5 py-1.5 text-xs rounded-full transition-all font-medium ${
                      formData.destinationSlug === d.slug
                        ? 'bg-[var(--gold)] text-[#090704] font-bold shadow-sm'
                        : 'bg-white/5 text-[#999] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>

              {/* Venues List */}
              <div className="space-y-3 pt-3">
                {availableVenues.map((v) => {
                  const isSelected = selectedVenue.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          venueId: v.id,
                          packageId: v.packages[0]?.id || '',
                        }))
                      }
                      className={`w-full text-left p-4 rounded-xl border flex flex-col sm:flex-row gap-4 transition-all ${
                        isSelected
                          ? 'bg-[#12100d] border-[var(--gold)] shadow-md shadow-[var(--gold)]/10 ring-1 ring-[var(--gold)]/30'
                          : 'bg-[#090909] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div
                        className="w-full sm:w-24 h-20 rounded-lg bg-cover bg-center shrink-0 border border-white/10"
                        style={{ backgroundImage: `url(${v.heroImage})` }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-serif text-white">{v.name}</h4>
                          <span className="text-[0.68rem] text-[var(--gold-light)] font-mono">
                            {v.packages.length} {locale === 'vi' ? 'gói dịch vụ' : 'curated packages'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#8e8981] mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin size={12} className="text-[var(--gold)]" /> {v.neighborhood || v.address}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-[var(--gold)]" /> {v.openingHours}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {v.highlights.slice(0, 3).map((h, i) => (
                            <span
                              key={i}
                              className="text-[0.62rem] px-2 py-0.5 bg-white/[0.04] text-[#b5b0a7] rounded border border-white/5"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Choose Package (NO PUBLIC PRICES DISPLAYED) */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif text-white font-normal">
                {locale === 'vi' ? 'Chọn Gói Trải Nghiệm & Đặc Quyền' : 'Select Experience Package & Inclusions'}
              </h2>
              <p className="text-xs text-[#9c978f] font-light">
                {locale === 'vi'
                  ? 'Tùy chọn thời lượng, các nghi thức và đặc quyền phục vụ của gói.'
                  : 'Tailor the duration, vintage selections, and tier of hospitality.'}
              </p>

              <div className="space-y-3.5 pt-2">
                {selectedVenue.packages.map((pkg) => {
                  const isSelected = selectedPackage.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, packageId: pkg.id }))}
                      className={`w-full text-left p-5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#12100d] border-[var(--gold)] ring-1 ring-[var(--gold)]/30'
                          : 'bg-[#090909] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div>
                          <h4 className="text-lg font-serif text-white">{pkg.name}</h4>
                          <span className="text-xs text-[#888]">
                            {locale === 'vi'
                              ? `Thời lượng: ${pkg.durationMins} phút · Phục vụ tối đa ${pkg.maxGuests} khách`
                              : `Duration: ${pkg.durationMins} Mins · Up to ${pkg.maxGuests} Guests`}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[var(--gold-light)] text-xs font-semibold">
                          <Sparkles size={14} />
                          <span>{locale === 'vi' ? 'Đặc Quyền Riêng' : 'Private Inclusions'}</span>
                        </div>
                      </div>

                      <div className="mt-3 space-y-1.5">
                        {pkg.inclusions.map((inc, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#b8b3aa] font-light">
                            <Check size={13} className="text-[var(--gold)] shrink-0" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>

                      {/* Dynamic Price Display upon Click / Selection */}
                      {isSelected && (
                        <div className="mt-4 pt-3.5 border-t border-[var(--gold)]/30 flex items-center justify-between bg-[var(--gold)]/10 -mx-5 -mb-5 p-4 rounded-b-xl transition-all">
                          <div className="flex items-center gap-2 text-xs text-[var(--gold-light)] font-medium">
                            <Coins size={15} className="text-[var(--gold)]" />
                            <span>{locale === 'vi' ? 'Giá Gói Dịch Vụ:' : 'Package Investment:'}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-base sm:text-lg font-mono font-bold text-[var(--gold-light)]">
                              {locale === 'vi'
                                ? (pkg.priceVnd > 0 ? `${pkg.priceVnd.toLocaleString('vi-VN')} đ` : `$${pkg.priceUsd}`)
                                : `$${pkg.priceUsd}`}
                            </span>
                            {pkg.priceVnd > 0 && locale !== 'vi' && (
                              <span className="block text-[0.62rem] text-[#999] font-mono">
                                ≈ {pkg.priceVnd.toLocaleString('vi-VN')} đ
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Party Size & Date */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-white font-normal">
                  {locale === 'vi' ? 'Số Lượng Khách & Khung Giờ Đón Tiếp' : 'Party Size & Schedule'}
                </h2>
                <p className="text-xs text-[#9c978f] font-light">
                  {locale === 'vi'
                    ? 'Chỉ định quy mô đoàn và giờ đón tiếp mong muốn.'
                    : 'Specify party size and desired arrival slot.'}
                </p>
              </div>

              {/* Guest Count Stepper */}
              <div className="p-5 rounded-xl bg-[#090909] border border-white/10">
                <label className="block text-xs uppercase tracking-wider text-[var(--gold-light)] mb-3 font-semibold">
                  {locale === 'vi' ? 'Số Lượng Thượng Khách' : 'Party Size'}
                </label>
                <div className="flex items-center gap-4">
                  {[1, 2, 4, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, guests: num }))}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono text-sm font-semibold transition-all ${
                        formData.guests === num
                          ? 'bg-[var(--gold)] text-[#090704] shadow-md shadow-[var(--gold)]/20'
                          : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Input */}
              <div className="p-5 rounded-xl bg-[#090909] border border-white/10">
                <label className="block text-xs uppercase tracking-wider text-[var(--gold-light)] mb-3 font-semibold">
                  {locale === 'vi' ? 'Ngày Diễn Ra Trải Nghiệm' : 'Reservation Date'}
                </label>
                <input
                  type="date"
                  value={formData.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                  className="w-full bg-[#111] border border-white/15 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              {/* Time Slots */}
              <div className="p-5 rounded-xl bg-[#090909] border border-white/10">
                <label className="block text-xs uppercase tracking-wider text-[var(--gold-light)] mb-3 font-semibold">
                  {locale === 'vi' ? 'Khung Giờ Đón Tiếp' : 'Arrival Time Slot'}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot }))}
                      className={`py-2 text-xs font-mono font-semibold rounded-lg border transition-all ${
                        formData.timeSlot === slot
                          ? 'bg-[var(--gold)] text-[#0a0805] border-[var(--gold)]'
                          : 'bg-white/[0.03] border-white/10 text-[#aaa] hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Guest Dossier & Contact */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif text-white font-normal">
                {locale === 'vi' ? 'Thông Tin Thượng Khách & Yêu Cầu Riêng' : 'Guest Dossier & Privacy Contact'}
              </h2>
              <p className="text-xs text-[#9c978f] font-light">
                {locale === 'vi'
                  ? 'Mọi thông tin danh tính được bảo vệ tuyệt đối theo chuẩn bảo mật NDA.'
                  : 'Your credentials are kept under strict confidentiality protocols.'}
              </p>

              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-[#aaa] mb-1.5 font-medium">
                      {locale === 'vi' ? 'Họ và Tên / Bí Danh' : 'Full Name / Alias'} *
                    </label>
                    <input
                      type="text"
                      placeholder={locale === 'vi' ? 'VD: Nguyễn Hoàng Nam' : 'e.g. Lord Alexander Hamilton'}
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-[#111] border border-white/15 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-[#aaa] mb-1.5 font-medium">
                      {locale === 'vi' ? 'Email Liên Hệ Kín Đáo' : 'Confidential Email'} *
                    </label>
                    <input
                      type="email"
                      placeholder="alexander@private.org"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-[#111] border border-white/15 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* 1. Country & Dialing Code */}
                  <div>
                    <label className="block text-xs uppercase text-[#aaa] mb-1.5 font-medium">
                      {locale === 'vi' ? 'Quốc Gia / Mã Vùng' : 'Country & Dialing Code'}
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                      className="w-full bg-[#111] border border-white/15 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)] cursor-pointer"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Phone Number */}
                  <div>
                    <label className="block text-xs uppercase text-[#aaa] mb-1.5 font-medium">
                      {locale === 'vi' ? 'Số Điện Thoại' : 'Phone Number'} *
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-[#111] border border-white/15 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                    />
                  </div>

                  {/* 3. Contact Via App */}
                  <div>
                    <label className="block text-xs uppercase text-[#aaa] mb-1.5 font-medium">
                      {locale === 'vi' ? 'Liên Hệ Qua App *' : 'Contact Via App *'}
                    </label>
                    <select
                      value={formData.messagingApp}
                      onChange={(e) => setFormData((prev) => ({ ...prev, messagingApp: e.target.value }))}
                      className="w-full bg-[#111] border border-white/15 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)] cursor-pointer"
                    >
                      {MESSAGING_APPS.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.icon} {app.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase text-[#aaa] mb-1.5 font-medium">
                    {locale === 'vi'
                      ? 'Ghi Chú Đón Tiếp / Dị Ứng / Yêu Cầu Xe Riêng'
                      : 'Special Accommodations / Dietary / Chauffeur Requests'}
                  </label>
                  <textarea
                    rows={3}
                    maxLength={500}
                    placeholder={
                      locale === 'vi'
                        ? 'Sở thích rượu vang, nhiệt độ champagne, kỷ niệm ngày cưới, xe Maybach đón tận nơi, lối đi riêng...'
                        : 'Dietary allergies, vintage preferences, champagne temperature, anniversary celebration, private side-entrance escort...'
                    }
                    value={formData.specialRequests}
                    onChange={(e) => setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))}
                    className="w-full bg-[#111] border border-white/15 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                  />
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-[#a39e95]">
                  <input
                    type="checkbox"
                    id="nda-checkbox"
                    checked={formData.agreeNda}
                    onChange={(e) => setFormData((prev) => ({ ...prev, agreeNda: e.target.checked }))}
                    className="mt-0.5 accent-[var(--gold)]"
                  />
                  <label htmlFor="nda-checkbox" className="text-xs leading-relaxed cursor-pointer">
                    {locale === 'vi'
                      ? 'Tôi xác nhận tất cả thông tin đặt chỗ được bảo mật tuyệt đối theo tiêu chuẩn quản gia LAURA NDA.'
                      : 'I acknowledge that all details of this reservation are protected under LAURA non-disclosure and private hosting standards.'}
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Confirm */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-serif text-white font-normal">
                {locale === 'vi' ? 'Kiểm Tra & Xác Nhận Đặt Chỗ' : 'Review & Authorize Reservation'}
              </h2>
              <p className="text-xs text-[#9c978f] font-light">
                {locale === 'vi'
                  ? 'Vui lòng kiểm tra lại thông tin trước khi chuyển hồ sơ cho quản gia riêng.'
                  : 'Please review your comprehensive itinerary summary before dispatching to your private concierge.'}
              </p>

              {/* Final Checklist */}
              <div className="p-5 rounded-xl bg-[#0a0a0a] border border-[var(--border)] space-y-3 text-xs text-[#bbb]">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[#888]">{locale === 'vi' ? 'Thượng Khách:' : 'Guest Name:'}</span>
                  <span className="text-white font-medium">{formData.name || (locale === 'vi' ? 'Thượng Khách' : 'Discreet Guest')}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[#888]">{locale === 'vi' ? 'Gói Đã Chọn:' : 'Selected Package:'}</span>
                  <span className="text-[var(--gold-light)] font-medium">
                    {selectedPackage.name} (
                    {locale === 'vi'
                      ? (selectedPackage.priceVnd > 0 ? `${selectedPackage.priceVnd.toLocaleString('vi-VN')} đ` : `$${selectedPackage.priceUsd}`)
                      : `$${selectedPackage.priceUsd}`}
                    )
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[#888]">{locale === 'vi' ? 'Email:' : 'Contact Email:'}</span>
                  <span className="text-white font-mono">{formData.email}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[#888]">{locale === 'vi' ? 'Số Điện Thoại / Kênh Nhận Tin:' : 'Phone & Contact App:'}</span>
                  <span className="text-white font-mono">
                    {formData.phone || 'Chưa nhập'}{' '}
                    <span className="text-[var(--gold-light)] font-sans font-semibold">({formData.messagingApp})</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#888]">{locale === 'vi' ? 'Quy Chuẩn Thanh Toán:' : 'Payment Mode:'}</span>
                  <span className="text-[var(--gold-light)] font-medium">
                    {locale === 'vi'
                      ? 'Quản gia riêng phục vụ trực tiếp · Không thu trước'
                      : 'Concierge Invoicing / No Public Prepayment'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((s) => s - 1)}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#999] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <ChevronLeft size={16} />
              <span>{t('common_back')}</span>
            </button>

            {currentStep < STEP_TITLES.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s + 1)}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-wider uppercase font-bold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-lg hover:opacity-90 transition-opacity"
              >
                <span>{t('common_continue')}</span>
                <ChevronRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmReservation}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-xs tracking-wider uppercase font-bold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-lg shadow-lg hover:scale-[1.01] transition-all"
              >
                <Lock size={14} />
                <span>{locale === 'vi' ? 'Xác Nhận & Gửi Hồ Sơ' : 'Confirm & Dispatch Dossier'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Sticky Summary Pane (NO PRICES SHOWN) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-[var(--border)] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs tracking-wider uppercase text-[var(--gold-light)] font-semibold">
                {locale === 'vi' ? 'Tóm Tắt Lịch Trình Đặt Chỗ' : 'Live Itinerary Summary'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Selected Venue Preview */}
            <div className="flex items-center gap-3.5">
              <div
                className="w-14 h-14 rounded-lg bg-cover bg-center shrink-0 border border-white/10 bg-[#161616]"
                style={{ backgroundImage: `url(${selectedVenue.heroImage})` }}
              />
              <div className="min-w-0">
                <h4 className="text-sm font-serif text-white truncate">
                  {currentStep >= 1 ? selectedVenue.name : (locale === 'vi' ? 'Chọn Địa Điểm' : 'Select Venue')}
                </h4>
                <p className="text-xs text-[var(--gold-light)] mt-0.5 truncate">
                  {currentStep >= 2 ? selectedPackage.name : (locale === 'vi' ? 'Đang chọn gói...' : 'Pending package...')}
                </p>
                <p className="text-xs text-[#777]">
                  {selectedVenue.neighborhood || selectedVenue.address}
                </p>
              </div>
            </div>

            {/* Breakdown (Step by Step sync with left side) */}
            <div className="space-y-2.5 text-xs text-[#9d9890] pt-3 border-t border-white/10">
              {/* Date */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Ngày:' : 'Date:'}
                </span>
                <span className={`font-mono ${currentStep >= 3 ? 'text-white font-medium' : 'text-[#555]'}`}>
                  {currentStep >= 3 ? formData.date : '—'}
                </span>
              </div>

              {/* Time Slot */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Khung Giờ:' : 'Time Slot:'}
                </span>
                <span className={`font-mono ${currentStep >= 3 ? 'text-white font-medium' : 'text-[#555]'}`}>
                  {currentStep >= 3 ? formData.timeSlot : '—'}
                </span>
              </div>

              {/* Party Size */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Users size={13} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Số Khách:' : 'Party Size:'}
                </span>
                <span className={`font-mono ${currentStep >= 3 ? 'text-white font-medium' : 'text-[#555]'}`}>
                  {currentStep >= 3 ? `${formData.guests} ${locale === 'vi' ? 'Khách' : 'Guests'}` : '—'}
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers size={13} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Thời Lượng:' : 'Duration:'}
                </span>
                <span className={`font-mono ${currentStep >= 2 ? 'text-white font-medium' : 'text-[#555]'}`}>
                  {currentStep >= 2 ? `${selectedPackage.durationMins} ${locale === 'vi' ? 'Phút' : 'Mins'}` : '—'}
                </span>
              </div>

              {/* Guest Name Row */}
              <div className="flex items-center justify-between pt-1">
                <span className="flex items-center gap-1.5">
                  <User size={13} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Họ và Tên:' : 'Guest Name:'}
                </span>
                <span className={`font-mono truncate max-w-[170px] ${formData.name ? 'text-white font-medium' : 'text-[#555]'}`}>
                  {formData.name ? formData.name : (currentStep >= 4 ? (locale === 'vi' ? 'Đang nhập...' : 'Entering...') : '—')}
                </span>
              </div>

              {/* Phone Number Row */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Phone size={13} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Số Điện Thoại:' : 'Phone Number:'}
                </span>
                <span className={`font-mono ${formData.phone ? 'text-white font-medium' : 'text-[#555]'}`}>
                  {formData.phone ? formData.phone : (currentStep >= 4 ? (locale === 'vi' ? 'Đang nhập...' : 'Entering...') : '—')}
                </span>
              </div>

              {/* Contact Via App Row */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MessageSquare size={13} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Kênh Nhận Tin:' : 'Contact Via:'}
                </span>
                <span className={`font-mono ${currentStep >= 4 || formData.phone ? 'text-[var(--gold-light)] font-medium' : 'text-[#555]'}`}>
                  {currentStep >= 4 || formData.phone ? formData.messagingApp : '—'}
                </span>
              </div>

              {/* Package Investment */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="flex items-center gap-1.5 text-[var(--gold-light)] font-medium">
                  <Coins size={13} className="text-[var(--gold)]" /> {locale === 'vi' ? 'Giá Gói:' : 'Package Investment:'}
                </span>
                <span className="font-mono text-sm font-bold text-[var(--gold-light)]">
                  {currentStep >= 2
                    ? (locale === 'vi'
                        ? (selectedPackage.priceVnd > 0 ? `${selectedPackage.priceVnd.toLocaleString('vi-VN')} đ` : `$${selectedPackage.priceUsd}`)
                        : `$${selectedPackage.priceUsd}`)
                    : '—'}
                </span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="pt-3 border-t border-white/10 space-y-1.5">
              <span className="text-xs text-[#777] block mb-1 font-medium">
                {locale === 'vi' ? 'Đặc Quyền Bao Gồm Trong Gói:' : 'Complimentary Inclusions & Protocol:'}
              </span>
              {selectedPackage.inclusions.map((inc, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#ccc]">
                  <Check size={12} className="text-[var(--gold)] shrink-0" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-[#777] space-y-1">
              <div className="flex items-center gap-2 text-[var(--gold-light)] font-medium">
                <ShieldCheck size={14} />
                <span>
                  {locale === 'vi'
                    ? 'Bảo Mật Kín Đáo & Quản Gia Xác Nhận 24/7'
                    : 'Strict Discretion & 24/7 Concierge Verification'}
                </span>
              </div>
              <p className="text-[0.68rem] text-[#666]">
                {locale === 'vi'
                  ? 'Quản gia riêng sẽ liên hệ và cung cấp tư vấn chi tiết không công khai giá trên web.'
                  : 'Your private host will reach out with bespoke consultation without public pricing.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
