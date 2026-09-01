-- AURELIS Initial Migration for PostgreSQL / Supabase
-- Creates all tables, constraints, foreign keys, and Row Level Security (RLS) policies

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  country TEXT,
  preferred_locale TEXT DEFAULT 'en',
  role TEXT DEFAULT 'member', -- guest, member, vip, editor, admin, super_admin
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MEMBERSHIP TIERS
CREATE TABLE IF NOT EXISTS public.membership_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price_usd INT NOT NULL,
  price_vnd BIGINT NOT NULL,
  period TEXT NOT NULL,
  benefits JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE
);

-- MEMBERSHIPS
CREATE TABLE IF NOT EXISTS public.memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tier_id UUID REFERENCES public.membership_tiers(id) ON DELETE RESTRICT,
  status TEXT DEFAULT 'active',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SERVICES
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  hero_image TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- DESTINATIONS
CREATE TABLE IF NOT EXISTS public.destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  country TEXT DEFAULT 'Vietnam',
  tagline TEXT,
  description TEXT,
  hero_image TEXT,
  venue_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- VENUES
CREATE TABLE IF NOT EXISTS public.venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID REFERENCES public.destinations(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  neighborhood TEXT,
  opening_hours TEXT,
  capacity INT DEFAULT 10,
  price_from_usd INT NOT NULL,
  price_from_vnd BIGINT NOT NULL,
  hero_image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  highlights JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE
);

-- PACKAGES
CREATE TABLE IF NOT EXISTS public.packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  duration_mins INT NOT NULL,
  price_usd INT NOT NULL,
  price_vnd BIGINT NOT NULL,
  max_guests INT DEFAULT 4,
  inclusions JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE
);

-- BOOKINGS
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_code TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  venue_id UUID REFERENCES public.venues(id) ON DELETE RESTRICT,
  package_id UUID REFERENCES public.packages(id) ON DELETE RESTRICT,
  destination_slug TEXT NOT NULL,
  service_slug TEXT NOT NULL,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  guest_count INT DEFAULT 2,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  preferred_language TEXT DEFAULT 'en',
  special_requests TEXT,
  total_price_usd INT NOT NULL,
  total_price_vnd BIGINT NOT NULL,
  promo_code TEXT,
  discount_usd INT DEFAULT 0,
  status TEXT DEFAULT 'pending',
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PARTNER APPLICATIONS
CREATE TABLE IF NOT EXISTS public.partner_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  website TEXT,
  service_category TEXT NOT NULL,
  destination TEXT NOT NULL,
  address TEXT,
  description TEXT NOT NULL,
  partnership_type TEXT,
  status TEXT DEFAULT 'new',
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- POSTS (JOURNAL)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT DEFAULT 'AURELIS Editorial',
  service_tag TEXT,
  destination_tag TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  published_at DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read for published services and venues"
  ON public.venues FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public read for active posts"
  ON public.posts FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Users can read their own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can read their own bookings"
  ON public.bookings FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create a booking"
  ON public.bookings FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Anyone can submit partner application"
  ON public.partner_applications FOR INSERT WITH CHECK (TRUE);
