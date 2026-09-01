export interface VenueData {
  id: string;
  destinationSlug: string;
  serviceSlug: string;
  name: string;
  slug: string;
  address: string;
  neighborhood: string;
  openingHours: string;
  capacity: number;
  priceFromUsd: number;
  priceFromVnd: number;
  heroImage: string;
  gallery: string[];
  highlights: string[];
  promoTitle?: string;
  promoExcerpt?: string;
  promoStory?: string;
  packages: {
    id: string;
    name: string;
    durationMins: number;
    priceUsd: number;
    priceVnd: number;
    maxGuests: number;
    inclusions: string[];
  }[];
}

export interface DestinationRecord {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  venueCount: number;
  image: string;
  description: string;
  curatedVibe: string;
  isActive: boolean;
}

export interface ServiceRecord {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  fullDetails?: string;
  image: string;
  duration?: string;
  guestCapacity?: string;
  location?: string;
  fromPriceUsd?: number;
  fromPriceVnd?: number;
  iconName?: string;
  isActive: boolean;
}

export interface PostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  serviceTag: string;
  destinationTag: string;
  isPublished: boolean;
  publishedAt: string;
}

export interface BookingRecord {
  id: string;
  referenceCode: string;
  userId?: string;
  venueName: string;
  packageName: string;
  serviceSlug: string;
  destinationSlug: string;
  bookingDate: string;
  timeSlot: string;
  guestCount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  preferredLanguage: string;
  specialRequests?: string;
  totalPriceUsd: number;
  totalPriceVnd: number;
  promoCode?: string;
  discountUsd: number;
  status: 'pending' | 'confirmed' | 'declined' | 'cancelled' | 'completed' | 'no_show';
  createdAt: string;
}

export interface PartnerSubmission {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  serviceCategory: string;
  destination: string;
  address?: string;
  description: string;
  partnershipType?: string;
  status: 'new' | 'reviewing' | 'approved' | 'rejected' | 'archived';
  internalNotes?: string;
  createdAt: string;
}

export interface MemberRecord {
  id: string;
  fullName: string;
  email: string;
  role: 'member' | 'vip' | 'editor' | 'admin';
  tierName: string;
  memberSince: string;
  phone?: string;
  totalBookings: number;
  status: 'active' | 'suspended';
}

export const INITIAL_DESTINATIONS: DestinationRecord[] = [
  {
    id: 'dest-1',
    slug: 'ho-chi-minh-city',
    name: 'Ho Chi Minh City',
    tagline: 'Electric energy meets hidden heritage.',
    venueCount: 18,
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    description: 'Secret speakeasies, penthouse spas, and subterranean cellars.',
    curatedVibe: 'Sophisticated · Dynamic · Heritage',
    isActive: true,
  },
  {
    id: 'dest-2',
    slug: 'da-nang',
    name: 'Da Nang & Hoi An',
    tagline: 'Coastal serenity and lantern-lit evenings.',
    venueCount: 11,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    description: 'Marble Mountain wellness sanctuaries and beachfront private cabanas.',
    curatedVibe: 'Serene · Oceanic · Zen',
    isActive: true,
  },
  {
    id: 'dest-3',
    slug: 'vung-tau',
    name: 'Vung Tau',
    tagline: 'Intimate weekend coastal escapes.',
    venueCount: 7,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    description: 'Cliffside infinity pool villas and private wine rooms by the sea.',
    curatedVibe: 'Effortless · Coastal Retreat',
    isActive: true,
  },
  {
    id: 'dest-4',
    slug: 'phu-quoc',
    name: 'Phu Quoc Island',
    tagline: 'Tropical solitude and emerald waters.',
    venueCount: 9,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    description: 'Secluded villas on private coves, sunset yacht cruises, and bespoke oceanfront seafood dining.',
    curatedVibe: 'Island Luxury · Tropical · Pure Horizon',
    isActive: true,
  },
  {
    id: 'dest-5',
    slug: 'nha-trang',
    name: 'Nha Trang & Cam Ranh',
    tagline: 'Sun-drenched bays and world-class retreats.',
    venueCount: 8,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Exclusive bay sanctuaries with private mineral mud baths and yacht charters.',
    curatedVibe: 'Pristine · Indulgent · Secluded',
    isActive: true,
  },
];

export const INITIAL_SERVICES: ServiceRecord[] = [
  {
    id: 'srv-1',
    slug: 'massage-spa',
    name: 'Penthouse Wellness & Bespoke Spa',
    category: 'Sức Khỏe & Thư Giãn',
    tagline: 'Trị liệu cá nhân hóa trên đỉnh đô thị.',
    description: 'Các liệu trình spa thảo dược bí truyền, phòng xông hơi riêng tư và bồn sục hướng view toàn cảnh thành phố.',
    fullDetails: 'Liệu trình chăm sóc sức khỏe độc quyền kết hợp giữa bấm huyệt đông y cổ truyền và thủy liệu pháp tại các penthouse biệt lập.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85',
    duration: '90 - 180 Phút',
    guestCapacity: '1 - 4 Khách',
    location: 'Sài Gòn · Đà Nẵng · Phú Quốc',
    fromPriceUsd: 220,
    fromPriceVnd: 5500000,
    iconName: 'Sparkles',
    isActive: true,
  },
  {
    id: 'srv-2',
    slug: 'wine-tasting-cellar',
    name: 'Hầm Rượu Cổ & Chuyên Gia Sommelier',
    category: 'Thưởng Rượu & Ẩm Thực',
    tagline: 'Bộ sưu tập Grand Cru cổ điển kín đáo.',
    description: 'Trải nghiệm thưởng thức các dòng vang quý hiếm dưới sự dẫn dắt của Sommelier quốc tế trong hầm rượu kiểm soát nhiệt độ.',
    fullDetails: 'Tiếp cận các hầm rượu ngầm tư nhân lưu trữ những chai vang lâu năm hiếm có từ Bordeaux, Burgundy và các vùng vang hàng đầu thế giới.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85',
    duration: '120 - 180 Phút',
    guestCapacity: '2 - 10 Khách',
    location: 'Quận 1 Sài Gòn · Phố Cổ Đà Nẵng',
    fromPriceUsd: 180,
    fromPriceVnd: 4500000,
    iconName: 'Wine',
    isActive: true,
  },
  {
    id: 'srv-3',
    slug: 'night-club',
    name: 'Nightlife VIP & Quản Gia Đón Tiếp',
    category: 'Giải Trí Đêm Thượng Lưu',
    tagline: 'Lối đi thảm đỏ riêng và bàn VIP trung tâm.',
    description: 'Không cần xếp hàng, an ninh riêng hộ tống, thưởng thức rượu ngoại hạng và âm nhạc đỉnh cao tại các club hàng đầu.',
    fullDetails: 'Trải nghiệm cuộc sống về đêm với đặc quyền thảm đỏ VIP bypass, bàn trung tâm sân khấu, dịch vụ champagne thượng hạng và quản gia bảo mật.',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?auto=format&fit=crop&w=1600&q=85',
    duration: 'Suốt Đêm',
    guestCapacity: '4 - 15 Khách',
    location: 'Trung Tâm Sài Gòn · Bờ Sông Đà Nẵng',
    fromPriceUsd: 350,
    fromPriceVnd: 8800000,
    iconName: 'Flame',
    isActive: true,
  },
];

export const INITIAL_VENUES: VenueData[] = [
  {
    id: 'ven-1',
    destinationSlug: 'ho-chi-minh-city',
    serviceSlug: 'massage-spa',
    name: 'The Obsidian Penthouse Sanctuary',
    slug: 'obsidian-penthouse-sanctuary',
    address: 'Level 38, District 1 Skyline Tower',
    neighborhood: 'District 1, Saigon',
    openingHours: '10:00 - 23:30',
    capacity: 6,
    priceFromUsd: 220,
    priceFromVnd: 5500000,
    heroImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: ['Skyline Hydrotherapy Tub', 'Master Herbalists', 'Private Steam Chamber'],
    packages: [
      {
        id: 'pkg-1',
        name: 'The Restorative Horizon Ritual',
        durationMins: 120,
        priceUsd: 220,
        priceVnd: 5500000,
        maxGuests: 2,
        inclusions: ['Pre-treatment botanical foot bath', 'Deep tissue acupressure', 'Herbal steam & skyline tea'],
      },
      {
        id: 'pkg-2',
        name: 'The Obsidian Grand Wellness Suite (Full Buyout)',
        durationMins: 180,
        priceUsd: 480,
        priceVnd: 12000000,
        maxGuests: 4,
        inclusions: ['Full penthouse suite buyout', 'Custom oil blending', 'Dom Pérignon welcome pour', 'Caviar bites'],
      },
    ],
  },
  {
    id: 'ven-2',
    destinationSlug: 'ho-chi-minh-city',
    serviceSlug: 'wine-tasting-cellar',
    name: 'The Grand Cru Heritage Vault',
    slug: 'grand-cru-heritage-vault',
    address: '14 Pasteur, Colonial French Quarter',
    neighborhood: 'District 1, Saigon',
    openingHours: '17:00 - 01:00',
    capacity: 12,
    priceFromUsd: 180,
    priceFromVnd: 4500000,
    heroImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: ['Subterranean Cellar', 'Master Sommelier Accompaniment', 'Artisanal Charcuterie'],
    packages: [
      {
        id: 'pkg-3',
        name: 'Bordeaux & Burgundy Discovery',
        durationMins: 150,
        priceUsd: 180,
        priceVnd: 4500000,
        maxGuests: 6,
        inclusions: ['5 Vintage pours', 'Iberico 5J pairing', 'Private sommelier notes'],
      },
      {
        id: 'pkg-4',
        name: 'The Rarities & Grand Cru Private Salon',
        durationMins: 210,
        priceUsd: 390,
        priceVnd: 9800000,
        maxGuests: 8,
        inclusions: ['Château Margaux & Romanée-Conti flights', 'Black truffle & caviar dinner', 'Cigar lounge access'],
      },
    ],
  },
  {
    id: 'ven-3',
    destinationSlug: 'ho-chi-minh-city',
    serviceSlug: 'night-club',
    name: 'AURA VIP Nightlife Enclave',
    slug: 'aura-vip-nightlife-enclave',
    address: 'Prime Dong Khoi Strip',
    neighborhood: 'District 1, Saigon',
    openingHours: '21:30 - 04:00',
    capacity: 25,
    priceFromUsd: 350,
    priceFromVnd: 8800000,
    heroImage: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: ['Red-Carpet Bypass', 'Center Stage Tier 1 Table', 'Dedicated Security Host'],
    packages: [
      {
        id: 'pkg-5',
        name: 'Stage Tier Center VIP Table',
        durationMins: 360,
        priceUsd: 350,
        priceVnd: 8800000,
        maxGuests: 6,
        inclusions: ['Pre-ordered 2 Dom Pérignon bottles', 'Chauffeur coordination', 'Direct VIP side entrance'],
      },
      {
        id: 'pkg-6',
        name: 'The Obsidian Executive Suite Box',
        durationMins: 420,
        priceUsd: 750,
        priceVnd: 18800000,
        maxGuests: 12,
        inclusions: ['Elevated glass skybox', 'Custom lighting presets', 'Armand de Brignac Ace of Spades', 'Dedicated host & security team'],
      },
    ],
  },
  {
    id: 'ven-4',
    destinationSlug: 'da-nang',
    serviceSlug: 'massage-spa',
    name: 'Marble Mountain Botanical Pavilion',
    slug: 'marble-mountain-botanical-pavilion',
    address: 'Non Nuoc Coast, Da Nang',
    neighborhood: 'Da Nang Bay',
    openingHours: '09:00 - 22:00',
    capacity: 8,
    priceFromUsd: 200,
    priceFromVnd: 5000000,
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    gallery: [],
    highlights: ['Oceanview Thermal Pavilions', 'Ancestral Acupressure', 'Singing Bowl Therapy'],
    packages: [
      {
        id: 'pkg-7',
        name: 'Coastal Zen Rejuvenation',
        durationMins: 120,
        priceUsd: 200,
        priceVnd: 5000000,
        maxGuests: 2,
        inclusions: ['Private beach pavilion', 'Sea salt scrub', 'Sound bath session'],
      },
    ],
  },
  {
    id: 'ven-5',
    destinationSlug: 'phu-quoc',
    serviceSlug: 'night-club',
    name: 'Secluded Bay Sunset Club & Lounge',
    slug: 'secluded-bay-sunset-club',
    address: 'Bai Dai Cove, Phu Quoc Island',
    neighborhood: 'North Phu Quoc',
    openingHours: '16:00 - 02:00',
    capacity: 30,
    priceFromUsd: 290,
    priceFromVnd: 7300000,
    heroImage: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1600&q=85',
    gallery: [],
    highlights: ['Private Beachfront Daybeds', 'Resident Acoustic & House DJs', 'Sunset Oyster Bar'],
    packages: [
      {
        id: 'pkg-8',
        name: 'Sunset Oceanfront Cabana Pass',
        durationMins: 240,
        priceUsd: 290,
        priceVnd: 7300000,
        maxGuests: 6,
        inclusions: ['Private cabana hold', 'Seafood platter & Champagne bottle', 'Speedboat harbor transfer'],
      },
    ],
  },
];

export const INITIAL_POSTS: PostData[] = [
  {
    id: 'post-1',
    slug: 'secret-cellars-district-1',
    title: 'The Hidden Cellars of District 1: A Sommelier’s Confidential Guide',
    excerpt: 'Behind unmarked heritage facades lie some of Southeast Asia’s most formidable private wine collections.',
    content: `When darkness settles over Ho Chi Minh City, the true connoisseur does not look for rooftop neon. They descend beneath French colonial basements where temperature-controlled vaults preserve decades of Grand Cru history.

In this exclusive report, our chief sommelier outlines the etiquette, vintage highlights, and closed-door access protocols for our discerning members.`,
    coverImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    author: 'Jean-Luc V., Master Sommelier',
    serviceTag: 'wine-tasting-cellar',
    destinationTag: 'ho-chi-minh-city',
    isPublished: true,
    publishedAt: '2026-08-20',
  },
  {
    id: 'post-2',
    slug: 'twilight-hydrotherapy-da-nang',
    title: 'Twilight Hydrotherapy: Ancestral Botanical Healing by the Sea',
    excerpt: 'How coastal thermal suites and ancient Vietnamese herbology restore cognitive vitality.',
    content: `The intersection of traditional Vietnamese medicine and modern ultra-luxury wellness takes shape in private pavilions along Da Nang’s tranquil coastline. Experience customized essential oils formulated from locally harvested mountain herbs, synchronized with acoustic sound therapy.`,
    coverImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. Linh Nguyen, Wellness Director',
    serviceTag: 'massage-spa',
    destinationTag: 'da-nang',
    isPublished: true,
    publishedAt: '2026-08-28',
  },
  {
    id: 'post-3',
    slug: 'nightlife-etiquette-vip-patrons',
    title: 'The Unwritten Rules of VIP Nightlife Hosting in Vietnam',
    excerpt: 'Navigating elite table reservations, discretion, and effortless front-row access.',
    content: `From private chauffeur transfers directly into underground vehicle bays to bespoke bottle service curated hours in advance, private hosting redefines after-dark entertainment for international guests.`,
    coverImage: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?auto=format&fit=crop&w=1200&q=80',
    author: 'Marcus Sterling, Head of Hospitality',
    serviceTag: 'night-club',
    destinationTag: 'ho-chi-minh-city',
    isPublished: true,
    publishedAt: '2026-09-01',
  },
];

export const INITIAL_MEMBERS: MemberRecord[] = [
  {
    id: 'mem-1',
    fullName: 'Alexander Morgan',
    email: 'alex.morgan@private.org',
    role: 'vip',
    tierName: 'The Privé Tier',
    memberSince: '2026-01-15',
    phone: '+65 9123 4567',
    totalBookings: 8,
    status: 'active',
  },
  {
    id: 'mem-2',
    fullName: 'Elena Rostova',
    email: 'elena.r@luxurytravel.com',
    role: 'vip',
    tierName: 'The Obsidian Reserve',
    memberSince: '2026-03-10',
    phone: '+852 6888 1234',
    totalBookings: 14,
    status: 'active',
  },
  {
    id: 'mem-3',
    fullName: 'Min-jun Kim',
    email: 'kim.minjun@venture.kr',
    role: 'member',
    tierName: 'Single Access Pass',
    memberSince: '2026-07-22',
    phone: '+82 10 5555 8888',
    totalBookings: 3,
    status: 'active',
  },
  {
    id: 'mem-4',
    fullName: 'AURELIS Super Admin',
    email: 'admin@aurelis.vip',
    role: 'admin',
    tierName: 'Executive Concierge Admin',
    memberSince: '2025-12-01',
    phone: '+84 90 888 9999',
    totalBookings: 0,
    status: 'active',
  },
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'bk-101',
    referenceCode: 'AUR-2026-9K2L',
    venueName: 'The Grand Cru Heritage Vault',
    packageName: 'Bordeaux & Burgundy Discovery',
    serviceSlug: 'wine-tasting-cellar',
    destinationSlug: 'ho-chi-minh-city',
    bookingDate: '2026-09-12',
    timeSlot: '19:00',
    guestCount: 4,
    guestName: 'Alexander Morgan',
    guestEmail: 'alex.morgan@private.org',
    guestPhone: '+65 9123 4567',
    preferredLanguage: 'en',
    specialRequests: 'Prefer 2010 Bordeaux vintages. Guest has slight shellfish allergy.',
    totalPriceUsd: 720,
    totalPriceVnd: 18000000,
    discountUsd: 0,
    status: 'pending',
    createdAt: '2026-09-01T10:30:00Z',
  },
  {
    id: 'bk-102',
    referenceCode: 'AUR-2026-4V7M',
    venueName: 'AURA VIP Nightlife Enclave',
    packageName: 'Stage Tier Center VIP Table',
    serviceSlug: 'night-club',
    destinationSlug: 'ho-chi-minh-city',
    bookingDate: '2026-09-15',
    timeSlot: '22:30',
    guestCount: 6,
    guestName: 'Elena Rostova',
    guestEmail: 'elena.r@luxurytravel.com',
    guestPhone: '+852 6888 1234',
    preferredLanguage: 'en',
    specialRequests: 'Chilled Dom Pérignon ready upon arrival. Chauffeur escort required.',
    totalPriceUsd: 1050,
    totalPriceVnd: 26250000,
    discountUsd: 100,
    status: 'confirmed',
    createdAt: '2026-08-30T14:15:00Z',
  },
];

export const INITIAL_PARTNERS: PartnerSubmission[] = [
  {
    id: 'part-1',
    businessName: 'Le Sanctuaire Spa & Wellness',
    contactName: 'Madame Valerie Chau',
    email: 'valerie@lesanctuaire.vn',
    phone: '+84 903 111 222',
    website: 'https://lesanctuaire.vn',
    serviceCategory: 'Massage & Spa',
    destination: 'Ho Chi Minh City',
    address: 'District 3, Ho Chi Minh City',
    description: 'Private 4-suite luxury French-Vietnamese heritage villa providing organic thermal rituals.',
    partnershipType: 'Exclusive Venue Partner',
    status: 'new',
    createdAt: '2026-08-31T09:00:00Z',
  },
  {
    id: 'part-2',
    businessName: 'Château Reserve Cellars',
    contactName: 'Sommelier Duc Tran',
    email: 'duc@chateaucellars.vn',
    phone: '+84 918 333 444',
    website: 'https://chateaucellars.vn',
    serviceCategory: 'Wine Tasting Cellar',
    destination: 'Da Nang & Hoi An',
    address: 'Bach Dang Riverfront, Da Nang',
    description: 'Underground private tasting room housing over 1,200 Grand Cru vintages with French trained sommeliers.',
    partnershipType: 'Tasting Partner',
    status: 'reviewing',
    createdAt: '2026-08-25T16:20:00Z',
  },
];
