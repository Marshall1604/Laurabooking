'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, CalendarDays, CheckCircle2, ShieldCheck, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeUp } from '@/components/motion/fade-up';
import { useI18n } from '@/lib/i18n/context';

interface ItineraryPreview {
  title: string;
  subtitle: string;
  totalEst: string;
  schedule: { time: string; activity: string; location: string; detail: string }[];
  perks: string[];
}

export function ConciergeCurator() {
  const { t, locale } = useI18n();
  const [city, setCity] = useState<'saigon' | 'danang' | 'phuquoc'>('saigon');
  const [vibe, setVibe] = useState<'wellness' | 'cellar' | 'nightlife'>('cellar');
  const [partySize, setPartySize] = useState<'2' | '4' | '8'>('2');

  const cityNames = {
    saigon: t('dest_hcm'),
    danang: t('dest_danang'),
    phuquoc: t('dest_phuquoc'),
  };

  const getCustomItinerary = (): ItineraryPreview => {
    if (vibe === 'wellness') {
      return {
        title: locale === 'vi' ? 'Liệu Trình Phục Hồi Penthouse & Trà Chiều Hoàng Hôn' : locale === 'zh-CN' ? '顶层植萃疗愈与落日养生私享' : locale === 'ko' ? '펜트하우스 보태니컬 테라피 & 선셋 리트리트' : 'The Botanical Sanctuary & Restorative Sunset',
        subtitle: `${t('curator_party_couple')} · ${cityNames[city]}`,
        totalEst: partySize === '2' ? '$440 USD' : partySize === '4' ? '$820 USD' : '$1,500 USD',
        schedule: [
          {
            time: '17:00',
            activity: locale === 'vi' ? 'Xe Riêng Đón Thượng Khách' : locale === 'zh-CN' ? '专属礼宾专车接送' : locale === 'ko' ? '프라이빗 쇼퍼 서비스' : 'Private Chauffeur Pick-up',
            location: cityNames[city],
            detail: locale === 'vi' ? 'Đón bằng xe Maybach cao cấp, bảo mật thông tin tuyệt đối.' : 'Confidential luxury escort with chilled hydration.',
          },
          {
            time: '17:30',
            activity: locale === 'vi' ? 'Thủy Liệu Pháp & Pha Trộn Tinh Dầu Riêng' : locale === 'zh-CN' ? '私密套房水疗与芳香调配' : locale === 'ko' ? '프라이빗 스위트 아로마 하이드로테라피' : 'Private Suite Hydrotherapy & Aromatics',
            location: 'The Penthouse Sanctuary',
            detail: locale === 'vi' ? 'Liệu pháp chuông xoay Tây Tạng kết hợp ngâm khoáng thảo mộc.' : 'Custom scent blending, deep thermal bath, and sound bowl harmonization.',
          },
          {
            time: '19:45',
            activity: locale === 'vi' ? 'Thưởng Trà Hoàng Hôn & Yến Chưng Thượng Hạng' : locale === 'zh-CN' ? '落日茶室与滋补养生膳' : locale === 'ko' ? '프라이빗 테라스 허브 티 라운지' : 'Herbal Infusions & Twilight Tea Lounge',
            location: 'Private Terrace Pavilion',
            detail: locale === 'vi' ? 'Trà hữu cơ tinh tuyển cùng bánh yến và view trọn thành phố.' : 'Artisanal organic snacks, bird’s nest broth, and serene skyline view.',
          },
        ],
        perks: [
          locale === 'vi' ? 'Bao trọn không gian Penthouse suốt thời gian trị liệu' : 'Full Penthouse Suite Buyout during treatment',
          locale === 'vi' ? 'Chuyên gia bấm huyệt y học cổ truyền cấp cao' : 'Master practitioners certified in ancestral acupressure',
          locale === 'vi' ? 'Lối thang máy riêng kín đáo không tiếp xúc' : 'Discreet side-elevator arrival protocol',
        ],
      };
    }

    if (vibe === 'nightlife') {
      return {
        title: locale === 'vi' ? 'Đêm Sôi Động Thượng Lưu: VIP Night Club & After-Party' : locale === 'zh-CN' ? '夜生活巅峰特权：核心VIP卡座与香槟礼遇' : locale === 'ko' ? '나이트라이프 익스클루시브: 센터 VIP 테이블 & 샴페인' : 'The Frontline Stage VIP & Nightlife Experience',
        subtitle: `${cityNames[city]} · VIP Red-Carpet`,
        totalEst: partySize === '2' ? '$650 USD' : partySize === '4' ? '$1,050 USD' : '$2,200 USD',
        schedule: [
          {
            time: '21:30',
            activity: locale === 'vi' ? 'Đón Bằng Xe Hạng Sang & Đưa Đến Hộp Đêm' : locale === 'zh-CN' ? '豪华车队接送抵达' : locale === 'ko' ? '쇼퍼 에스코트 서비스' : 'Private Chauffeur Escort',
            location: cityNames[city],
            detail: locale === 'vi' ? 'Tài xế chuyên nghiệp, đưa đón thẳng vào cổng ngầm VIP.' : 'Direct entrance into private basement elevator.',
          },
          {
            time: '22:00',
            activity: locale === 'vi' ? 'Bàn Trung Tâm Stagefront VIP & Rót Rượu Dom Pérignon' : locale === 'zh-CN' ? '舞台核心头等VIP卡座与顶级香槟' : locale === 'ko' ? '센터 스테이지 1열 VIP 테이블 & 돔페리뇽' : 'Frontline VIP Table Access & Dom Pérignon Pour',
            location: 'AURA VIP Nightlife Enclave',
            detail: locale === 'vi' ? 'Bàn trung tâm đẹp nhất sàn nhảy, vệ sĩ riêng bảo vệ.' : 'Prime tier center table with dedicated security host.',
          },
          {
            time: '02:00',
            activity: locale === 'vi' ? 'Lối Đi VIP Riêng Khi Rời Đi' : locale === 'zh-CN' ? '专属通道从容离场' : locale === 'ko' ? '대기 없는 프라이빗 귀가 서비스' : 'VIP Departure Escort',
            location: 'Private VIP Gate',
            detail: locale === 'vi' ? 'Xe nổ máy sẵn sàng tại sảnh riêng không cần chờ đợi.' : 'Car waiting curbside with private security.',
          },
        ],
        perks: [
          locale === 'vi' ? 'Lối vào thảm đỏ riêng không xếp hàng' : 'Red-carpet priority bypass with zero queue',
          locale === 'vi' ? '2 Chai Champagne Dom Pérignon ướp lạnh sẵn' : 'Pre-chilled vintage Dom Pérignon Champagne bottles',
          locale === 'vi' ? 'Vệ sĩ chuyên nghiệp túc trực suốt đêm' : 'Dedicated VIP security host escort',
        ],
      };
    }

    // Default: cellar
    return {
      title: locale === 'vi' ? 'Hành Trình Thưởng Rượu Grand Cru & Tiệc Tối Riêng Tư' : locale === 'zh-CN' ? '地下酒窖特级庄品鉴与黑松露晚宴' : locale === 'ko' ? '그랑 크뤼 빈티지 셀러 프라이빗 테이스팅 & 다이닝' : 'The Grand Cru Heritage Cellar & Caviar Flight',
      subtitle: `${cityNames[city]} · Master Sommelier`,
      totalEst: partySize === '2' ? '$390 USD' : partySize === '4' ? '$720 USD' : '$1,400 USD',
      schedule: [
        {
          time: '18:30',
          activity: locale === 'vi' ? 'Chào Đón Tại Hầm Đá Vôi Ngầm' : locale === 'zh-CN' ? '地下石灰岩酒窖迎宾' : locale === 'ko' ? '지하 와인 볼트 입장 & 웰컴 글라스' : 'Subterranean Vault Welcome',
          location: 'The Grand Cru Heritage Vault',
          detail: locale === 'vi' ? 'Ly Champagne Cristal 2012 chào đón tại hầm đá cổ.' : 'Cristal 2012 vintage welcome pour in subterranean temperature vault.',
        },
        {
          time: '19:15',
          activity: locale === 'vi' ? 'Nếm Thử 5 Niên Vụ Bordeaux & Burgundy Cổ Điển' : locale === 'zh-CN' ? '波尔多与勃艮第5款珍稀年份品鉴' : locale === 'ko' ? '보르도 & 부르고뉴 5대 빈티지 테이스팅' : 'Five-Flight Grand Cru Sommelier Tasting',
          location: 'Private Tasting Salon',
          detail: locale === 'vi' ? 'Sommelier chia sẻ lịch sử và cấu trúc từng giọt rượu quý.' : 'Sommelier-led breakdown of tertiary aromas and provenance.',
        },
        {
          time: '21:00',
          activity: locale === 'vi' ? 'Tiệc Tối Kèm Trứng Cá Tầm & Đùi Heo Iberico 5J' : locale === 'zh-CN' ? '伊比利亚5J火腿与鱼子酱晚宴' : locale === 'ko' ? '5J 이베리코 하몽 & 캐비어 페어링 다이닝' : 'Artisanal Charcuterie & Caviar Pairing',
          location: 'Cellar Dining Table',
          detail: locale === 'vi' ? 'Đầu bếp riêng chuẩn bị món ăn tôn vinh hương vị rượu.' : 'Cured meats, aged cheeses, and black caviar pairings.',
        },
      ],
      perks: [
        locale === 'vi' ? 'Chuyên gia Sommelier phục vụ riêng suốt buổi' : 'Private Sommelier exclusive accompaniment',
        locale === 'vi' ? 'Truy cập phòng xì gà và hầm rượu quý hiếm' : 'Access to private vintage archive and cigar lounge',
        locale === 'vi' ? 'Thẻ chứng nhận nếm thử rượu có chữ ký' : 'Customized wax-sealed tasting certificate',
      ],
    };
  };

  const preview = getCustomItinerary();

  return (
    <section id="curator" className="py-24 sm:py-32 bg-[#050505] relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle,rgba(218,189,126,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 text-[var(--gold-light)] text-[0.68rem] tracking-[0.24em] uppercase font-semibold">
              <Sparkles size={14} className="text-[var(--gold)]" />
              <span>{t('curator_eyebrow')}</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-serif text-[var(--foreground)] leading-[1.05] font-normal">
              {t('curator_title')} <br />
              <em className="text-[var(--gold-light)] font-normal italic font-serif">
                {t('curator_title_italic')}
              </em>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#a8a39a] leading-relaxed font-light">
              {t('curator_subtitle')}
            </p>
          </FadeUp>
        </div>

        {/* Interactive Controls & Live Display */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#090909] border border-[var(--border)] space-y-6 shadow-xl">
            {/* Step 1: City */}
            <div>
              <label className="block text-[0.68rem] tracking-[0.16em] uppercase text-[#888] font-semibold mb-3">
                {t('curator_lbl_city')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'saigon', name: 'Saigon', full: t('dest_hcm') },
                  { id: 'danang', name: 'Da Nang', full: t('dest_danang') },
                  { id: 'phuquoc', name: 'Phu Quoc', full: t('dest_phuquoc') },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCity(c.id as any)}
                    className={`py-3 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                      city === c.id
                        ? 'bg-[var(--gold)]/15 border-[var(--gold)] text-[var(--gold-light)] shadow-sm'
                        : 'bg-white/5 border-white/5 text-[#999] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="block font-serif text-sm">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Experience Vibe */}
            <div>
              <label className="block text-[0.68rem] tracking-[0.16em] uppercase text-[#888] font-semibold mb-3">
                {t('curator_lbl_world')}
              </label>
              <div className="space-y-2">
                {[
                  { id: 'cellar', title: t('service_wine_title'), desc: 'Grand Cru tastings & private vaults' },
                  { id: 'wellness', title: t('service_massage_title'), desc: 'Penthouse suites & botanical hydrotherapy' },
                  { id: 'nightlife', title: t('service_club_title'), desc: 'VIP stage tables & zero-wait bypass' },
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVibe(v.id as any)}
                    className={`w-full p-3.5 text-left rounded-xl border transition-all flex items-center justify-between ${
                      vibe === v.id
                        ? 'bg-[var(--gold)]/15 border-[var(--gold)] text-white'
                        : 'bg-white/[0.03] border-white/5 text-[#888] hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <div>
                      <span className="font-serif text-sm block text-white font-normal">{v.title}</span>
                      <span className="text-[0.68rem] text-[#888] font-light block mt-0.5">{v.desc}</span>
                    </div>
                    {vibe === v.id && (
                      <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Party Size */}
            <div>
              <label className="block text-[0.68rem] tracking-[0.16em] uppercase text-[#888] font-semibold mb-3">
                {t('curator_lbl_party')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '2', label: '2 Guests' },
                  { id: '4', label: '4 Guests' },
                  { id: '8', label: '8+ VIPs' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPartySize(p.id as any)}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                      partySize === p.id
                        ? 'bg-[var(--gold)]/20 border-[var(--gold)] text-[var(--gold-light)]'
                        : 'bg-white/5 border-white/5 text-[#999] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 text-center">
              <span className="text-[0.65rem] text-[#777] font-mono block">
                ✓ NDA Protected · Dedicated Host Confirmation
              </span>
            </div>
          </div>

          {/* Real-time Generated Itinerary Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${city}-${vibe}-${partySize}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-10 rounded-2xl bg-[#0c0c0c] border border-[var(--gold)]/40 shadow-2xl space-y-6"
              >
                {/* Itinerary Header */}
                <div className="pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[0.65rem] tracking-[0.18em] uppercase text-[var(--gold-light)] font-semibold block">
                      {preview.subtitle}
                    </span>
                    <h3 className="mt-1 text-2xl sm:text-3xl font-serif text-white font-normal leading-snug">
                      {preview.title}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[0.62rem] uppercase tracking-wider text-[#888] block">
                      {t('curator_estimate')}
                    </span>
                    <span className="font-serif text-3xl text-[var(--gold-light)] font-normal">
                      {preview.totalEst}
                    </span>
                  </div>
                </div>

                {/* 3-Step Timeline */}
                <div className="space-y-4">
                  {preview.schedule.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="px-2.5 py-1 rounded bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold-light)] font-mono text-xs font-bold shrink-0">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="font-serif text-base text-white font-normal">{item.activity}</span>
                          <span className="text-[0.65rem] text-[#888] font-mono">{item.location}</span>
                        </div>
                        <p className="text-xs text-[#a5a098] mt-1 font-light">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Perks Included */}
                <div className="pt-2">
                  <span className="text-[0.62rem] uppercase tracking-wider text-[#888] font-semibold block mb-2">
                    Complimentary Inclusions & Protocol
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {preview.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#bbb]">
                        <CheckCircle2 size={13} className="text-[var(--gold)] shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-[#777] flex items-center gap-1.5 font-light">
                    <ShieldCheck size={14} className="text-[var(--gold)]" />
                    <span>Instant hold confirmed within 15 minutes</span>
                  </span>

                  <Link
                    href={`/booking?service=${vibe === 'wellness' ? 'massage-spa' : vibe === 'nightlife' ? 'night-club' : 'wine-tasting-cellar'}&destination=${city === 'saigon' ? 'ho-chi-minh-city' : city === 'danang' ? 'da-nang' : 'phu-quoc'}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-sans font-bold uppercase tracking-[0.16em] text-[#0a0805] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded shadow-lg hover:opacity-90 transition-opacity"
                  >
                    <span>{t('curator_btn_book')}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
