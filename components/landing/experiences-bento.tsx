'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Clock, Users, MapPin, Check } from 'lucide-react';
import { FadeUp } from '@/components/motion/fade-up';
import { StaggerContainer, StaggerItem } from '@/components/motion/stagger';
import { useI18n } from '@/lib/i18n/context';

export function ExperiencesBento() {
  const { t, locale } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t('bento_all_btn') || 'All Collections' },
    { id: 'Wellness & Stillness', label: t('service_massage_title') },
    { id: 'Epicurean & Tasting', label: t('service_wine_title') },
    { id: 'Nightlife & Energy', label: t('service_club_title') },
  ];

  const getLocalizedExperiences = () => {
    return [
      {
        id: 'exp-1',
        slug: 'massage-spa',
        name: locale === 'zh-CN' ? '水疗养生与芳香疗愈' : locale === 'ko' ? '생추어리 스파 & 리추얼' : locale === 'vi' ? 'Liệu Trình Spa & Nghi Thức Phục Hồi' : 'Sanctuary Spa & Restorative Rituals',
        category: 'Wellness & Stillness',
        tag: locale === 'zh-CN' ? '水疗与养生' : locale === 'ko' ? '스파 & 웰니스' : locale === 'vi' ? 'Nghi Thức Spa' : 'Penthouse Wellness',
        description: locale === 'zh-CN' ? '在私密顶层套房中享受定制草本芳香与声波疗愈，俯瞰绝美天际线。' : locale === 'ko' ? '도심 스카이라인을 조망하는 프라이빗 펜트하우스에서 즐기는 맞춤 아로마 & 사운드 테라피.' : locale === 'vi' ? 'Nghi thức thảo mộc phục hồi trong penthouse suite tĩnh lặng với tinh dầu riêng biệt và trị liệu chuông xoay.' : 'Restorative botanical rituals in serene private penthouse suites with custom aromatics and sound therapy.',
        duration: locale === 'zh-CN' ? '120 - 180 分钟' : locale === 'ko' ? '120 - 180분' : locale === 'vi' ? '120 - 180 Phút' : '120 - 180 Mins',
        partySize: locale === 'zh-CN' ? '1 - 4 位贵宾' : locale === 'ko' ? '1 - 4인' : locale === 'vi' ? '1 - 4 Khách' : '1 - 4 Guests',
        location: locale === 'zh-CN' ? '胡志明市 · 岘港 · 富国岛' : locale === 'ko' ? '호치민 · 다낭 · 푸꾸옥' : locale === 'vi' ? 'Sài Gòn · Đà Nẵng · Phú Quốc' : 'Saigon · Da Nang · Phu Quoc',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85',
        priceFrom: '$220 USD',
        highlights: locale === 'zh-CN' ? ['专属私密水疗套房', '资深草本疗愈大师', '专属定制调香服务'] : locale === 'ko' ? ['프라이빗 하이드로테라피 스위트', '마스터 테라피스트', '맞춤 아로마 블렌딩'] : locale === 'vi' ? ['Phòng Thủy Liệu Pháp Riêng', 'Chuyên Gia Thảo Dược Cấp Cao', 'Pha Chế Tinh Dầu Riêng'] : ['Private Hydrotherapy Suite', 'Master Herbalists', 'Custom Scent Blending'],
        reserveBtn: locale === 'zh-CN' ? '立即预订' : locale === 'ko' ? '예약하기' : locale === 'vi' ? 'Đặt Chỗ' : 'Reserve',
      },
      {
        id: 'exp-2',
        slug: 'wine-tasting-cellar',
        name: locale === 'zh-CN' ? '年份地下私藏酒窖与侍酒师' : locale === 'ko' ? '빈티지 와인 볼트 & 마스터 소믈리에' : locale === 'vi' ? 'Hầm Rượu Cổ Điển & Chuyên Gia Sommelier' : 'Vintage Vault & Private Sommelier',
        category: 'Epicurean & Tasting',
        tag: locale === 'zh-CN' ? '私藏酒窖品鉴' : locale === 'ko' ? '와인 테이스팅' : locale === 'vi' ? 'Thưởng Rượu Vang' : 'Private Oenology',
        description: locale === 'zh-CN' ? '侍酒师带领品鉴特级庄稀有年份佳酿，置身于隐秘地下石灰岩酒窖，佐以顶级火腿与鱼子酱。' : locale === 'ko' ? '마스터 소믈리에가 안내하는 그랑 크뤼 빈티지 와인 시음회와 최고급 핑거푸드 페어링.' : locale === 'vi' ? 'Hành trình cùng chuyên gia nếm thử các chai Grand Cru quý hiếm tại hầm ngầm kèm đùi heo muối 5J hảo hạng.' : 'Sommelier-led journeys through Grand Cru bottles, subterranean cellars, and paired artisanal charcuterie.',
        duration: locale === 'zh-CN' ? '2.5 - 3 小时' : locale === 'ko' ? '2.5 - 3시간' : locale === 'vi' ? '2.5 - 3 Giờ' : '2.5 - 3 Hours',
        partySize: locale === 'zh-CN' ? '2 - 10 位贵宾' : locale === 'ko' ? '2 - 10인' : locale === 'vi' ? '2 - 10 Khách' : '2 - 10 Guests',
        location: locale === 'zh-CN' ? '胡志明市第一郡 · 岘港法国区' : locale === 'ko' ? '호치민 1군 · 다낭 프렌치 쿼터' : locale === 'vi' ? 'Quận 1 Sài Gòn · Khu Pháp Cổ Đà Nẵng' : 'District 1 Saigon · French Quarter Da Nang',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85',
        priceFrom: '$180 USD',
        highlights: locale === 'zh-CN' ? ['列级名庄特级佳酿', '专业侍酒师全程指导', '定制佐酒美食品鉴'] : locale === 'ko' ? ['프리미에 크뤼 셀렉션', '마스터 소믈리에 가이드', '아티장 페어링 메뉴'] : locale === 'vi' ? ['Tuyển Chọn Premier Cru', 'Chuyên Gia Sommelier Đồng Hành', 'Thực Đơn Đồ Nhắm Hảo Hạng'] : ['Premier Cru Selections', 'Master Sommelier Guidance', 'Artisanal Pairing Menu'],
        reserveBtn: locale === 'zh-CN' ? '立即预订' : locale === 'ko' ? '예약하기' : locale === 'vi' ? 'Đặt Chỗ' : 'Reserve',
      },
      {
        id: 'exp-3',
        slug: 'night-club',
        name: locale === 'zh-CN' ? 'VIP夜生活俱乐部与红毯礼遇' : locale === 'ko' ? 'VIP 나이트라이프 & 프라이빗 호스팅' : locale === 'vi' ? 'Đặc Quyền VIP Hộp Đêm & Quản Gia Riêng' : 'After-Dark Enclave & VIP Hosting',
        category: 'Nightlife & Energy',
        tag: locale === 'zh-CN' ? 'VIP夜生活俱乐部' : locale === 'ko' ? 'VIP 클럽' : locale === 'vi' ? 'Hộp Đêm Thượng Lưu' : 'After-Dark Access',
        description: locale === 'zh-CN' ? '红毯快速免排队通道、专属安保护送及全场舞台核心头等VIP卡座。' : locale === 'ko' ? '대기 없는 레드카펫 패스트트랙, 프라이빗 의전 및 최고 명당 무대 전면 VIP 테이블.' : locale === 'vi' ? 'Lối vào riêng không xếp hàng, vệ sĩ hộ tống và vị trí bàn trung tâm VIP nhất giữa không gian âm nhạc đỉnh cao.' : 'Priority red-carpet bypass, discreet VIP host escort, and front-tier tables at Vietnam’s most magnetic night venues.',
        duration: locale === 'zh-CN' ? '整夜专属通道' : locale === 'ko' ? '올나잇 프리패스' : locale === 'vi' ? 'Trọn Đêm Riêng Tư' : 'All Night Access',
        partySize: locale === 'zh-CN' ? '4 - 15 位贵宾' : locale === 'ko' ? '4 - 15인' : locale === 'vi' ? '4 - 15 Khách' : '4 - 15 Guests',
        location: locale === 'zh-CN' ? '胡志明市核心区 · 岘港江畔' : locale === 'ko' ? '호치민 센트럴 · 다낭 리버프론트' : locale === 'vi' ? 'Trung Tâm Sài Gòn · Bờ Sông Đà Nẵng' : 'Saigon Central · Da Nang Riverfront',
        image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?auto=format&fit=crop&w=1600&q=85',
        priceFrom: '$350 USD',
        highlights: locale === 'zh-CN' ? ['独立红毯VIP免排队', '舞台核心头等卡座', '专属管家与安保人员'] : locale === 'ko' ? ['다이렉트 레드카펫 패스', '센터 스테이지 1열 테이블', '전담 호스트 & 경호'] : locale === 'vi' ? ['Lối Vào Thảm Đỏ Riêng', 'Bàn VIP Trung Tâm Sân Khấu', 'Quản Gia & Vệ Sĩ Riêng'] : ['Direct Red-Carpet Bypass', 'Center Stage VIP Table', 'Dedicated Host & Security'],
        reserveBtn: locale === 'zh-CN' ? '立即预订' : locale === 'ko' ? '예약하기' : locale === 'vi' ? 'Đặt Chỗ' : 'Reserve',
      },
    ];
  };

  const allExperiences = getLocalizedExperiences();
  const filteredExperiences =
    selectedCategory === 'all'
      ? allExperiences
      : allExperiences.filter((exp) => exp.category === selectedCategory);

  return (
    <section id="experiences" className="py-24 sm:py-32 bg-[#070707] relative overflow-hidden font-sans">
      {/* Background radial highlight */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(218,189,126,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 text-[var(--gold-light)] text-[0.68rem] tracking-[0.24em] uppercase font-semibold">
              <span className="w-6 h-px bg-[var(--gold)]" />
              <span>{t('bento_eyebrow')}</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-serif text-[var(--foreground)] leading-[1.05] font-normal">
              {t('bento_title')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#a8a39a] max-w-xl font-light">
              {t('bento_subtitle')}
            </p>
          </FadeUp>

          {/* Filter Pills */}
          <FadeUp delay={0.2}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-[0.68rem] tracking-[0.14em] uppercase font-semibold rounded-full transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[var(--gold)] text-[#0b0805] shadow-md shadow-[var(--gold)]/20'
                      : 'bg-white/5 text-[#9e9990] hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Bento Grid */}
        <StaggerContainer className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((item) => (
            <StaggerItem key={item.id}>
              <div className="h-full rounded-2xl border border-[var(--border)] bg-[#0c0c0c] overflow-hidden flex flex-col justify-between group hover:border-[var(--gold)]/60 transition-all duration-500 shadow-xl hover:shadow-2xl">
                <div>
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-108"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-black/30" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-[#050505]/85 backdrop-blur-md border border-[var(--gold)]/30 text-[var(--gold-light)] text-[0.62rem] tracking-[0.16em] uppercase font-semibold">
                        {item.tag}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-[#050505]/85 backdrop-blur-md border border-white/10 text-[#d0cbc2] text-[0.62rem] tracking-[0.14em] uppercase font-mono">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between text-xs text-[#8f8a81] pb-3 border-b border-white/5">
                      <div className="flex items-center gap-1.5 font-mono">
                        <Clock size={13} className="text-[var(--gold)]" />
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono">
                        <Users size={13} className="text-[var(--gold)]" />
                        <span>{item.partySize}</span>
                      </div>
                    </div>

                    <h3 className="mt-4 text-xl sm:text-2xl font-serif text-white group-hover:text-[var(--gold-light)] transition-colors font-normal leading-snug">
                      {item.name}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-[#9b968e] leading-relaxed font-light line-clamp-3">
                      {item.description}
                    </p>

                    {/* Inclusions */}
                    <div className="mt-6 space-y-2">
                      {item.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-[#bbb6ae] font-light">
                          <Check size={13} className="text-[var(--gold)] shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="p-6 sm:p-8 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[0.62rem] uppercase tracking-wider text-[#736e67] block">
                      {t('common_price_from')}
                    </span>
                    <span className="font-serif text-2xl text-[var(--gold-light)] font-normal">
                      {item.priceFrom}
                    </span>
                  </div>

                  <Link
                    href={`/booking?service=${item.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-white/5 border border-white/10 hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-black text-xs uppercase tracking-wider font-semibold transition-all duration-200"
                  >
                    <span>{item.reserveBtn}</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
