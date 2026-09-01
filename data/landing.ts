export interface ExperienceItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  fullDetails: string;
  duration: string;
  guestCapacity: string;
  location: string;
  image: string;
  fromPrice: number;
  featured?: boolean;
  highlights: string[];
  inclusions: string[];
}

export interface DestinationItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  venueCount: number;
  image: string;
  description: string;
  curatedVibe: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  title: string;
  location: string;
  rating: number;
  experience: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  isPopular?: boolean;
}

export const HERO_DATA = {
  eyebrow: 'Private Access · Vietnam',
  headline: 'Exceptional nights.',
  headlineItalic: 'Entirely yours.',
  subheadline:
    'A private collection of remarkable spa rituals, hidden vintage wine rooms, and after-dark VIP enclaves—curated with uncompromising discretion.',
  primaryCta: {
    label: 'Book an Experience',
    href: '/booking',
  },
  secondaryCta: {
    label: 'Explore Collection',
    href: '#experiences',
  },
  metrics: [
    { label: 'Curated Destinations', value: '05' },
    { label: 'Private Concierge', value: '24/7' },
    { label: 'Discretion Guaranteed', value: '100%' },
    { label: 'Client Satisfaction', value: '4.98' },
  ],
  quote: '“The rarest luxury is feeling completely looked after with absolute discretion.”',
};

export const PARTNERS_PRESS = [
  { name: 'Vogue Living', role: 'Feature Luxury Editorial' },
  { name: 'Robb Report', role: 'Curated Nightlife Partner' },
  { name: 'Michelin Guide Partner Venues', role: 'Gastronomy Access' },
  { name: 'Condé Nast Traveler', role: 'Vietnam Private Picks' },
  { name: 'Prestige Asia', role: 'Elite Hospitality Circle' },
];

export const VALUE_PILLARS = [
  {
    number: '01',
    title: 'Closed-Door Access',
    subtitle: 'Beyond Public Reservations',
    description:
      'We hold direct keys to reserved penthouse spas, private sommelier cellars, and elite backstage tables unavailable to the public.',
    iconName: 'Key',
  },
  {
    number: '02',
    title: 'Absolute Discretion',
    subtitle: 'Protected Privacy & Security',
    description:
      'Every arrangement is NDA-compliant. Private side entries, discrete chauffeur escorts, and confidential host handling.',
    iconName: 'ShieldCheck',
  },
  {
    number: '03',
    title: 'Hyper-Curated Itinerary',
    subtitle: 'Tailored to Your Exact Rhythm',
    description:
      'From custom acoustic playlists and specific vintage selections to personalized aromatic spa oils tailored to your profile.',
    iconName: 'Sparkles',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    slug: 'massage-spa',
    name: 'Sanctuary Spa & Restorative Rituals',
    category: 'Wellness & Stillness',
    tagline: 'Stillness, elevated.',
    description:
      'Restorative botanical rituals in serene private penthouse suites with custom aromatics and sound therapy.',
    fullDetails:
      'Immerse in private hydrotherapy, organic thermal baths, and deep-tissue body balancing by master Vietnamese practitioners.',
    duration: '120 - 180 Mins',
    guestCapacity: '1 - 4 Guests',
    location: 'Saigon · Da Nang · Phu Quoc',
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85',
    fromPrice: 220,
    featured: true,
    highlights: ['Private Hydrotherapy Suite', 'Master Herbalists', 'Custom Scent Blending'],
    inclusions: ['Champagne Welcome', 'Signature Herbal Infusion', 'Post-Treatment Tea Lounge'],
  },
  {
    id: 'exp-2',
    slug: 'wine-tasting-cellar',
    name: 'Vintage Vault & Private Sommelier',
    category: 'Epicurean & Tasting',
    tagline: 'Rare vintages. Private rooms.',
    description:
      'Sommelier-led journeys through Grand Cru bottles, subterranean cellars, and paired artisanal charcuterie.',
    fullDetails:
      'Exclusive access to temperature-controlled private vaults housing rare Bordeaux, Burgundy, and boutique international vintages.',
    duration: '2.5 - 3 Hours',
    guestCapacity: '2 - 10 Guests',
    location: 'District 1 Saigon · French Quarter Da Nang',
    image:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85',
    fromPrice: 180,
    featured: false,
    highlights: ['Premier Cru Selections', 'Master Sommelier Guidance', 'Artisanal Pairing Menu'],
    inclusions: ['5 Vintage Pours', 'Caviar & Truffle Tasting', 'Private Room Reservation'],
  },
  {
    id: 'exp-3',
    slug: 'night-club',
    name: 'After-Dark Enclave & VIP Hosting',
    category: 'Nightlife & Energy',
    tagline: 'After dark, your way.',
    description:
      'Priority red-carpet bypass, discreet VIP host escort, and front-tier tables at Vietnam’s most magnetic night venues.',
    fullDetails:
      'Skip all lines with dedicated security escort. Premium bottle service, custom lighting presets, and elite hospitality staff.',
    duration: 'All Night Access',
    guestCapacity: '4 - 15 Guests',
    location: 'Saigon Central · Da Nang Riverfront',
    image:
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?auto=format&fit=crop&w=1600&q=85',
    fromPrice: 350,
    featured: false,
    highlights: ['Direct Red-Carpet Bypass', 'Center Stage VIP Table', 'Dedicated Host & Security'],
    inclusions: ['Pre-Ordered Champagne & Spirits', 'Discreet Private Exit', 'Chauffeur Coordination'],
  },
  {
    id: 'exp-4',
    slug: 'superyacht-sunset',
    name: 'Private Yacht Charter & Coastal Sunset',
    category: 'Ocean & Horizons',
    tagline: 'Horizon unwound.',
    description:
      'Private 68ft luxury catamaran or motoryacht cruising serene waters with private chef and live acoustic set.',
    fullDetails:
      'Sunset champagne cruise through Da Nang coastline or Phu Quoc secluded bays, complete with gourmet oyster bar.',
    duration: '4 - 6 Hours',
    guestCapacity: '2 - 12 Guests',
    location: 'Phu Quoc · Nha Trang · Vung Tau',
    image:
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1600&q=85',
    fromPrice: 650,
    featured: true,
    highlights: ['Private Captain & Crew', 'Fresh Seafood Onboard Grill', 'Sunset Deck Lounge'],
    inclusions: ['Premium Champagne Service', 'Water Sports Equipment', 'Private Berth Transfer'],
  },
];

export const DESTINATIONS: DestinationItem[] = [
  {
    id: 'dest-1',
    slug: 'ho-chi-minh-city',
    name: 'Ho Chi Minh City',
    tagline: 'Electric energy meets hidden heritage.',
    venueCount: 18,
    image:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    description:
      'Secret speakeasies tucked inside colonial mansions, rooftop spas overlooking the skyline, and subterranean cellars.',
    curatedVibe: 'Sophisticated · Dynamic · Heritage',
  },
  {
    id: 'dest-2',
    slug: 'da-nang',
    name: 'Da Nang & Hoi An',
    tagline: 'Coastal serenity and lantern-lit evenings.',
    venueCount: 11,
    image:
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    description:
      'Marble Mountain wellness sanctuaries, beachfront private cabanas, and riverside dining retreats.',
    curatedVibe: 'Serene · Oceanic · Zen',
  },
  {
    id: 'dest-3',
    slug: 'phu-quoc',
    name: 'Phu Quoc Island',
    tagline: 'Tropical solitude and emerald waters.',
    venueCount: 9,
    image:
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    description:
      'Secluded villas on private coves, sunset yacht cruises, and bespoke oceanfront seafood dining.',
    curatedVibe: 'Island Luxury · Tropical · Pure Horizon',
  },
  {
    id: 'dest-4',
    slug: 'vung-tau',
    name: 'Vung Tau',
    tagline: 'Intimate weekend coastal escapes.',
    venueCount: 7,
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    description:
      'Cliffside infinity pool villas, private wine rooms by the sea, and quick luxury helicopter or limousine transfers.',
    curatedVibe: 'Effortless · Coastal Retreat',
  },
  {
    id: 'dest-5',
    slug: 'nha-trang',
    name: 'Nha Trang & Cam Ranh',
    tagline: 'Sun-drenched bays and world-class retreats.',
    venueCount: 8,
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description:
      'Exclusive bay sanctuaries with private mineral mud baths, yacht charters, and private island dinners.',
    curatedVibe: 'Pristine · Indulgent · Secluded',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Select or Request',
    description:
      'Browse our curated collection or submit an unlisted bespoke wish via our secure booking portal.',
    details: 'Immediate reservation holds with zero friction.',
  },
  {
    step: '02',
    title: 'Concierge Alignment',
    description:
      'Your dedicated AURELIS host confirms all nuanced preferences—temperature, scents, dietary, and privacy.',
    details: 'Direct encrypted line with your dedicated host.',
  },
  {
    step: '03',
    title: 'VIP Arrival & Hosting',
    description:
      'Arrive via discrete private access. Everything is pre-arranged, pre-paid, and effortlessly attended to.',
    details: 'Zero waiting lines, immediate entry.',
  },
  {
    step: '04',
    title: 'Uncompromised Discretion',
    description:
      'Your experience remains strictly confidential. We protect client profiles with institutional care.',
    details: 'Complete privacy assurance guaranteed.',
  },
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan-pass',
    name: 'Bespoke Single Pass',
    price: '$250',
    period: 'per booking / service',
    description: 'Perfect for travelers and occasional luxury experiences in Vietnam.',
    features: [
      'Single event booking access',
      'Priority table & room reservation',
      'Welcome champagne or pairing',
      'Dedicated host on evening of event',
      'Discreet side entry coordination',
    ],
    ctaText: 'Reserve Single Pass',
    ctaLink: '/booking',
    isPopular: false,
  },
  {
    id: 'plan-prive',
    name: 'The Privé Tier',
    badge: 'Most Preferred',
    price: '$2,400',
    period: 'annual membership',
    description: 'Designed for frequent patrons who require seamless priority and bespoke attention.',
    features: [
      'Unlimited priority reservations across all 5 cities',
      'Dedicated 24/7 personal AURELIS concierge',
      'Complimentary welcome prestige bottle upon arrival',
      'Invitation to private closed-door cellar tastings',
      'Preferred rates on superyacht & helicopter transfers',
      'Complimentary booking modifications & cancel grace',
    ],
    ctaText: 'Apply for Privé Tier',
    ctaLink: '/booking?tier=prive',
    isPopular: true,
  },
  {
    id: 'plan-obsidian',
    name: 'The Obsidian Reserve',
    badge: 'By Invitation Only',
    price: 'Custom',
    period: 'curated bespoke agreement',
    description: 'Ultra-exclusive tier for family offices, executives, and discerning high-profile guests.',
    features: [
      'Full custom buyouts of top private venues',
      'Direct executive host & private security coordination',
      'Customized private jet & superyacht fleet access',
      'Personal master sommelier & private chef on call',
      'Maximum tier confidentiality with legal NDA protocol',
      'Global sister-club reciprocal privileges in Tokyo & Singapore',
    ],
    ctaText: 'Inquire for Invitation',
    ctaLink: '/partner-with-us',
    isPopular: false,
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quote:
      'AURELIS transformed our stay in Saigon. The private spa suite and cellar tasting felt completely secluded, yet right in the heart of the city.',
    author: 'Alexander V.',
    title: 'Managing Partner',
    location: 'Singapore',
    rating: 5,
    experience: 'Private Cellar & Penthouse Spa',
  },
  {
    id: 'test-2',
    quote:
      'The discretion is unmatched. Our nightlife table was prepped with our exact bottle choices, and the security host took care of every transition seamlessly.',
    author: 'Elena R.',
    title: 'Creative Director',
    location: 'Hong Kong',
    rating: 5,
    experience: 'VIP Club Hosting',
  },
  {
    id: 'test-3',
    quote:
      'Booking the sunset catamaran in Phu Quoc through AURELIS was the highlight of our vacation. From the onboard chef to the champagne, pure perfection.',
    author: 'Marcus & Chloe T.',
    title: 'Private Clients',
    location: 'London',
    rating: 5,
    experience: 'Private Yacht Charter',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Discretion',
    question: 'How do you protect guest privacy and confidentiality?',
    answer:
      'All partner venues sign strict non-disclosure agreements. We utilize discreet side entrances where available, ensure no unauthorized photography, and coordinate direct private chauffeur hand-offs upon request.',
  },
  {
    id: 'faq-2',
    category: 'Booking',
    question: 'How far in advance should I book an experience?',
    answer:
      'For popular spa sanctuaries and weekend nightlife tables, we recommend reserving 48 hours in advance. For yacht charters and rare cellar tastings, 3–5 days notice allows our master sommelier and culinary teams to tailor your vintage pairing.',
  },
  {
    id: 'faq-3',
    category: 'Customization',
    question: 'Can I request completely bespoke experiences not listed on the site?',
    answer:
      'Yes. Our concierge specializes in bespoke arrangements: private villa buyouts, helicopter transfers, custom private dinners, and multi-city itineraries throughout Vietnam.',
  },
  {
    id: 'faq-4',
    category: 'Payment',
    question: 'What payment and cancellation policies are supported?',
    answer:
      'We accept all major international cards, wire transfers, and confidential payment links. Standard bookings offer free cancellation or rescheduling up to 24 hours prior to the scheduled start time.',
  },
  {
    id: 'faq-5',
    category: 'Membership',
    question: 'Is membership mandatory to book an experience?',
    answer:
      'No. Guests can book individual experiences using our Bespoke Single Pass. However, Privé and Obsidian members receive guaranteed last-minute table holds, dedicated concierge routing, and complimentary upgrades.',
  },
];
