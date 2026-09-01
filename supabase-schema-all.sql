-- ===================================================================
-- LAURA BOOKING - COMPLETE DATABASE SETUP & SEEDING SCRIPT
-- ===================================================================

-- 1. BẢNG VENUES (Địa Điểm & Gói Trải Nghiệm)
create table if not exists public.venues (
  id text primary key,
  destination_slug text not null,
  service_slug text not null,
  name text not null,
  slug text unique not null,
  address text,
  neighborhood text,
  opening_hours text,
  capacity int default 10,
  price_from_usd numeric default 0,
  price_from_vnd numeric default 0,
  hero_image text,
  gallery jsonb default '[]'::jsonb,
  highlights jsonb default '[]'::jsonb,
  promo_title text,
  promo_excerpt text,
  promo_story text,
  packages jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. BẢNG POSTS (Tạp Chí & Bài Viết)
create table if not exists public.posts (
  id text primary key,
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  cover_image text,
  author text,
  service_tag text,
  destination_tag text,
  is_published boolean default true,
  published_at text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. BẢNG MEMBERS (Hội Viên VIP)
create table if not exists public.members (
  id text primary key,
  full_name text not null,
  email text unique not null,
  phone text,
  role text default 'vip',
  tier_name text default 'The Privé Tier',
  member_since text,
  total_bookings int default 0,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. BẢNG PARTNERS (Đăng Ký Đối Tác)
create table if not exists public.partners (
  id text primary key,
  business_name text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  website text,
  service_category text,
  destination text,
  address text,
  description text,
  partnership_type text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ===================================================================
-- MỞ QUYỀN TRUY CẬP (Row Level Security - RLS)
-- ===================================================================
alter table public.venues enable row level security;
alter table public.posts enable row level security;
alter table public.members enable row level security;
alter table public.partners enable row level security;

create policy "venues_all" on public.venues for all using (true) with check (true);
create policy "posts_all" on public.posts for all using (true) with check (true);
create policy "members_all" on public.members for all using (true) with check (true);
create policy "partners_all" on public.partners for all using (true) with check (true);

-- ===================================================================
-- NẠP DỮ LIỆU MẪU (SEED DATA)
-- ===================================================================

-- Nạp Venues
insert into public.venues (id, destination_slug, service_slug, name, slug, address, neighborhood, opening_hours, capacity, price_from_usd, price_from_vnd, hero_image, highlights, packages)
values 
('ven-1', 'ho-chi-minh-city', 'massage-spa', 'The Obsidian Penthouse Sanctuary', 'obsidian-penthouse-sanctuary', 'Level 38, District 1 Skyline Tower', 'District 1, Saigon', '10:00 - 23:30', 6, 220, 5500000, 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85', '["Skyline Hydrotherapy Tub", "Master Herbalists", "Private Steam Chamber"]'::jsonb, '[{"id":"pkg-1","name":"The Restorative Horizon Ritual","durationMins":120,"priceUsd":220,"priceVnd":5500000,"maxGuests":2,"inclusions":["Pre-treatment botanical foot bath","Deep tissue acupressure","Herbal steam & skyline tea"]},{"id":"pkg-2","name":"The Obsidian Grand Wellness Suite (Full Buyout)","durationMins":180,"priceUsd":480,"priceVnd":12000000,"maxGuests":4,"inclusions":["Full penthouse suite buyout","Custom oil blending","Dom Pérignon welcome pour","Caviar bites"]}]'::jsonb),
('ven-2', 'ho-chi-minh-city', 'wine-tasting-cellar', 'The Grand Cru Heritage Vault', 'grand-cru-heritage-vault', '14 Pasteur, Colonial French Quarter', 'District 1, Saigon', '17:00 - 01:00', 12, 180, 4500000, 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85', '["Subterranean Cellar", "Master Sommelier Accompaniment", "Artisanal Charcuterie"]'::jsonb, '[{"id":"pkg-3","name":"Bordeaux & Burgundy Discovery","durationMins":150,"priceUsd":180,"priceVnd":4500000,"maxGuests":6,"inclusions":["5 Vintage pours","Iberico 5J pairing","Private sommelier notes"]},{"id":"pkg-4","name":"The Rarities & Grand Cru Private Salon","durationMins":210,"priceUsd":390,"priceVnd":9800000,"maxGuests":8,"inclusions":["Château Margaux & Romanée-Conti flights","Black truffle & caviar dinner","Cigar lounge access"]}]'::jsonb),
('ven-3', 'ho-chi-minh-city', 'night-club', 'AURA VIP Nightlife Enclave', 'aura-vip-nightlife-enclave', 'Prime Dong Khoi Strip', 'District 1, Saigon', '21:30 - 04:00', 25, 350, 8800000, 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?auto=format&fit=crop&w=1600&q=85', '["Red-Carpet Bypass", "Center Stage Tier 1 Table", "Dedicated Security Host"]'::jsonb, '[{"id":"pkg-5","name":"Stage Tier Center VIP Table","durationMins":360,"priceUsd":350,"priceVnd":8800000,"maxGuests":6,"inclusions":["Pre-ordered 2 Dom Pérignon bottles","Chauffeur coordination","Direct VIP side entrance"]},{"id":"pkg-6","name":"The Obsidian Executive Suite Box","durationMins":420,"priceUsd":750,"priceVnd":18800000,"maxGuests":12,"inclusions":["Elevated glass skybox","Custom lighting presets","Armand de Brignac Ace of Spades","Dedicated host & security team"]}]'::jsonb)
on conflict (id) do nothing;

-- Nạp Posts
insert into public.posts (id, slug, title, excerpt, content, cover_image, author, service_tag, destination_tag, is_published, published_at)
values
('post-1', 'secret-cellars-district-1', 'The Hidden Cellars of District 1: A Sommelier’s Confidential Guide', 'Behind unmarked heritage facades lie some of Southeast Asia’s most formidable private wine collections.', 'When darkness settles over Ho Chi Minh City, the true connoisseur does not look for rooftop neon...', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80', 'Jean-Luc V., Master Sommelier', 'wine-tasting-cellar', 'ho-chi-minh-city', true, '2026-08-20'),
('post-2', 'twilight-hydrotherapy-da-nang', 'Twilight Hydrotherapy: Ancestral Botanical Healing by the Sea', 'How coastal thermal suites and ancient Vietnamese herbology restore cognitive vitality.', 'The intersection of traditional Vietnamese medicine and modern ultra-luxury wellness...', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80', 'Dr. Linh Nguyen, Wellness Director', 'massage-spa', 'da-nang', true, '2026-08-28'),
('post-3', 'nightlife-etiquette-vip-patrons', 'The Unwritten Rules of VIP Nightlife Hosting in Vietnam', 'Navigating elite table reservations, discretion, and effortless front-row access.', 'From private chauffeur transfers directly into underground vehicle bays...', 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?auto=format&fit=crop&w=1200&q=80', 'Marcus Sterling, Head of Hospitality', 'night-club', 'ho-chi-minh-city', true, '2026-09-01')
on conflict (id) do nothing;

-- Nạp Members
insert into public.members (id, full_name, email, role, tier_name, member_since, phone, total_bookings, status)
values
('mem-1', 'Alexander Morgan', 'alex.morgan@private.org', 'vip', 'The Privé Tier', '2026-01-15', '+65 9123 4567', 8, 'active'),
('mem-2', 'Elena Rostova', 'elena.r@luxurytravel.com', 'vip', 'The Obsidian Reserve', '2026-03-10', '+852 6888 1234', 14, 'active'),
('mem-3', 'Min-jun Kim', 'kim.minjun@venture.kr', 'member', 'Single Access Pass', '2026-07-22', '+82 10 5555 8888', 3, 'active'),
('mem-4', 'LAURA Super Admin', 'admin@laura.vip', 'admin', 'Executive Concierge Admin', '2025-12-01', '+84 90 888 9999', 0, 'active')
on conflict (id) do nothing;

-- Nạp Partners
insert into public.partners (id, business_name, contact_name, email, phone, website, service_category, destination, address, description, partnership_type, status)
values
('part-1', 'Le Sanctuaire Spa & Wellness', 'Madame Valerie Chau', 'valerie@lesanctuaire.vn', '+84 903 111 222', 'https://lesanctuaire.vn', 'Massage & Spa', 'Ho Chi Minh City', 'District 3, Ho Chi Minh City', 'Private 4-suite luxury French-Vietnamese heritage villa providing organic thermal rituals.', 'Exclusive Venue Partner', 'new'),
('part-2', 'Château Reserve Cellars', 'Sommelier Duc Tran', 'duc@chateaucellars.vn', '+84 918 333 444', 'https://chateaucellars.vn', 'Wine Tasting Cellar', 'Da Nang & Hoi An', 'Bach Dang Riverfront, Da Nang', 'Underground private tasting room housing over 1,200 Grand Cru vintages with French trained sommeliers.', 'Tasting Partner', 'reviewing')
on conflict (id) do nothing;
