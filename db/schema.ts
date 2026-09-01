import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const profiles = sqliteTable('profiles', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  phone: text('phone'),
  country: text('country'),
  preferredLocale: text('preferred_locale').default('en'),
  role: text('role').default('member'), // guest, member, vip, editor, admin, super_admin
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const membershipTiers = sqliteTable('membership_tiers', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  priceUsd: integer('price_usd').notNull(),
  priceVnd: integer('price_vnd').notNull(),
  period: text('period').notNull(), // 'single', 'annual', 'bespoke'
  benefits: text('benefits').notNull(), // JSON string array
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

export const memberships = sqliteTable('memberships', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => profiles.id),
  tierId: text('tier_id').notNull().references(() => membershipTiers.id),
  status: text('status').default('active'), // active, suspended, expired
  startedAt: text('started_at').notNull(),
  expiresAt: text('expires_at'),
  createdAt: text('created_at').notNull(),
});

export const services = sqliteTable('services', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  tagline: text('tagline'),
  description: text('description'),
  heroImage: text('hero_image'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

export const destinations = sqliteTable('destinations', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  country: text('country').default('Vietnam'),
  tagline: text('tagline'),
  description: text('description'),
  heroImage: text('hero_image'),
  venueCount: integer('venue_count').default(0),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

export const venues = sqliteTable('venues', {
  id: text('id').primaryKey(),
  destinationId: text('destination_id').notNull().references(() => destinations.id),
  serviceId: text('service_id').notNull().references(() => services.id),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  address: text('address'),
  neighborhood: text('neighborhood'),
  openingHours: text('opening_hours'),
  capacity: integer('capacity').default(10),
  priceFromUsd: integer('price_from_usd').notNull(),
  priceFromVnd: integer('price_from_vnd').notNull(),
  heroImage: text('hero_image'),
  gallery: text('gallery'), // JSON string array
  highlights: text('highlights'), // JSON string array
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

export const packages = sqliteTable('packages', {
  id: text('id').primaryKey(),
  venueId: text('venue_id').notNull().references(() => venues.id),
  slug: text('slug').notNull(),
  name: text('name').notNull(),
  durationMins: integer('duration_mins').notNull(),
  priceUsd: integer('price_usd').notNull(),
  priceVnd: integer('price_vnd').notNull(),
  maxGuests: integer('max_guests').default(4),
  inclusions: text('inclusions'), // JSON string array
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey(),
  referenceCode: text('reference_code').notNull().unique(),
  userId: text('user_id'),
  venueId: text('venue_id').notNull().references(() => venues.id),
  packageId: text('package_id').notNull().references(() => packages.id),
  destinationSlug: text('destination_slug').notNull(),
  serviceSlug: text('service_slug').notNull(),
  bookingDate: text('booking_date').notNull(),
  timeSlot: text('time_slot').notNull(),
  guestCount: integer('guest_count').notNull().default(2),
  guestName: text('guest_name').notNull(),
  guestEmail: text('guest_email').notNull(),
  guestPhone: text('guest_phone'),
  preferredLanguage: text('preferred_language').default('en'),
  specialRequests: text('special_requests'),
  totalPriceUsd: integer('total_price_usd').notNull(),
  totalPriceVnd: integer('total_price_vnd').notNull(),
  promoCode: text('promo_code'),
  discountUsd: integer('discount_usd').default(0),
  status: text('status').notNull().default('pending'), // draft, pending, confirmed, declined, cancelled, completed, no_show
  internalNotes: text('internal_notes'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const bookingStatusHistory = sqliteTable('booking_status_history', {
  id: text('id').primaryKey(),
  bookingId: text('booking_id').notNull().references(() => bookings.id),
  fromStatus: text('from_status'),
  toStatus: text('to_status').notNull(),
  changedBy: text('changed_by'),
  note: text('note'),
  createdAt: text('created_at').notNull(),
});

export const promoCodes = sqliteTable('promo_codes', {
  id: text('id').primaryKey(),
  code: text('code').notNull().unique(),
  discountPercent: integer('discount_percent').default(0),
  discountUsd: integer('discount_usd').default(0),
  minSpendUsd: integer('min_spend_usd').default(0),
  maxUses: integer('max_uses').default(100),
  currentUses: integer('current_uses').default(0),
  validUntil: text('valid_until'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

export const partnerApplications = sqliteTable('partner_applications', {
  id: text('id').primaryKey(),
  businessName: text('business_name').notNull(),
  contactName: text('contact_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  website: text('website'),
  serviceCategory: text('service_category').notNull(),
  destination: text('destination').notNull(),
  address: text('address'),
  description: text('description').notNull(),
  partnershipType: text('partnership_type'),
  status: text('status').notNull().default('new'), // new, reviewing, approved, rejected, archived
  internalNotes: text('internal_notes'),
  createdAt: text('created_at').notNull(),
});

export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  coverImage: text('cover_image'),
  author: text('author').default('AURELIS Editorial'),
  serviceTag: text('service_tag'), // massage-spa, wine-tasting-cellar, night-club
  destinationTag: text('destination_tag'), // ho-chi-minh-city, da-nang, vung-tau, phu-quoc, nha-trang
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false),
  isPublished: integer('is_published', { mode: 'boolean' }).default(true),
  publishedAt: text('published_at'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const auditLogs = sqliteTable('audit_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id'),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id').notNull(),
  metadata: text('metadata'), // JSON string
  createdAt: text('created_at').notNull(),
});

export const siteSettings = sqliteTable('site_settings', {
  id: text('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  description: text('description'),
  updatedAt: text('updated_at').notNull(),
});
