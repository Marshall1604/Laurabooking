import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jtvktlirkjufinxqhicu.supabase.co';
const supabaseAnonKey = 'sb_publishable_YYw8la-Ccy5ns2v9o-GLpA_mN75nrK9';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const INITIAL_DESTINATIONS = [
  {
    id: 'dest-1',
    slug: 'ho-chi-minh-city',
    name: 'Ho Chi Minh City',
    tagline: 'Electric energy meets hidden heritage.',
    venue_count: 18,
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    description: 'Secret speakeasies, penthouse spas, and subterranean cellars.',
    active: true,
    sort_order: 1,
  },
  {
    id: 'dest-2',
    slug: 'da-nang',
    name: 'Da Nang & Hoi An',
    tagline: 'Coastal serenity and lantern-lit evenings.',
    venue_count: 11,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    description: 'Marble Mountain wellness sanctuaries and beachfront private cabanas.',
    active: true,
    sort_order: 2,
  },
  {
    id: 'dest-3',
    slug: 'vung-tau',
    name: 'Vung Tau',
    tagline: 'Intimate weekend coastal escapes.',
    venue_count: 7,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    description: 'Cliffside infinity pool villas and private wine rooms by the sea.',
    active: true,
    sort_order: 3,
  },
  {
    id: 'dest-4',
    slug: 'phu-quoc',
    name: 'Phu Quoc Island',
    tagline: 'Tropical solitude and emerald waters.',
    venue_count: 9,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    description: 'Secluded villas on private coves, sunset yacht cruises, and bespoke oceanfront seafood dining.',
    active: true,
    sort_order: 4,
  },
  {
    id: 'dest-5',
    slug: 'nha-trang',
    name: 'Nha Trang & Cam Ranh',
    tagline: 'Sun-drenched bays and world-class retreats.',
    venue_count: 8,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Exclusive bay sanctuaries with private mineral mud baths and yacht charters.',
    active: true,
    sort_order: 5,
  },
];

const INITIAL_SERVICES = [
  {
    id: 'srv-1',
    slug: 'massage-spa',
    title: 'Penthouse Wellness & Bespoke Spa',
    category: 'Sức Khỏe & Thư Giãn',
    tagline: 'Trị liệu cá nhân hóa trên đỉnh đô thị.',
    description: 'Các liệu trình spa thảo dược bí truyền, phòng xông hơi riêng tư và bồn sục hướng view toàn cảnh thành phố.',
    starting_price_usd: '220',
    starting_price_vnd: '5.500.000',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85',
    active: true,
    sort_order: 1,
  },
  {
    id: 'srv-2',
    slug: 'wine-tasting-cellar',
    title: 'Hầm Rượu Cổ & Chuyên Gia Sommelier',
    category: 'Thưởng Rượu & Ẩm Thực',
    tagline: 'Bộ sưu tập Grand Cru cổ điển kín đáo.',
    description: 'Trải nghiệm thưởng thức các dòng vang quý hiếm dưới sự dẫn dắt của Sommelier quốc tế trong hầm rượu kiểm soát nhiệt độ.',
    starting_price_usd: '180',
    starting_price_vnd: '4.500.000',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85',
    active: true,
    sort_order: 2,
  },
  {
    id: 'srv-3',
    slug: 'night-club',
    title: 'Nightlife VIP & Quản Gia Đón Tiếp',
    category: 'Giải Trí Đêm Thượng Lưu',
    tagline: 'Lối đi thảm đỏ riêng và bàn VIP trung tâm.',
    description: 'Không cần xếp hàng, an ninh riêng hộ tống, thưởng thức rượu ngoại hạng và âm nhạc đỉnh cao tại các club hàng đầu.',
    starting_price_usd: '350',
    starting_price_vnd: '8.800.000',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?auto=format&fit=crop&w=1600&q=85',
    active: true,
    sort_order: 3,
  },
];

const INITIAL_BOOKINGS = [
  {
    id: 'bk-101',
    full_name: 'Alexander Morgan',
    email: 'alex.morgan@private.org',
    phone: '+65 9123 4567',
    contact_app: 'WhatsApp',
    destination: 'Ho Chi Minh City',
    service_category: 'Wine Tasting Cellar',
    party_size: 4,
    booking_date: '2026-09-12',
    booking_time: '19:00',
    special_requests: 'Prefer 2010 Bordeaux vintages. Guest has slight shellfish allergy.',
    status: 'pending',
  },
  {
    id: 'bk-102',
    full_name: 'Elena Rostova',
    email: 'elena.r@luxurytravel.com',
    phone: '+852 6888 1234',
    contact_app: 'Telegram',
    destination: 'Ho Chi Minh City',
    service_category: 'Night Club',
    party_size: 6,
    booking_date: '2026-09-15',
    booking_time: '22:30',
    special_requests: 'Chilled Dom Pérignon ready upon arrival. Chauffeur escort required.',
    status: 'confirmed',
  },
];

async function seedData() {
  console.log('Seeding Supabase data...');

  // 1. Seed destinations
  console.log('Syncing Destinations...');
  const { error: destError } = await supabase.from('destinations').upsert(INITIAL_DESTINATIONS);
  if (destError) console.log('❌ Destinations error:', destError.message);
  else console.log('✅ Synced 5 Destinations!');

  // 2. Seed services
  console.log('Syncing Services...');
  const { error: srvError } = await supabase.from('services').upsert(INITIAL_SERVICES);
  if (srvError) console.log('❌ Services error:', srvError.message);
  else console.log('✅ Synced 3 Services!');

  // 3. Seed bookings
  console.log('Syncing Bookings...');
  const { error: bkError } = await supabase.from('bookings').upsert(INITIAL_BOOKINGS);
  if (bkError) console.log('❌ Bookings error:', bkError.message);
  else console.log('✅ Synced 2 Bookings!');

  console.log('Sync process completed.');
}

seedData();
