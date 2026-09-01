import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { ValuePillars } from '@/components/landing/value-pillars';
import { ConciergeCurator } from '@/components/landing/concierge-curator';
import { DestinationsShowcase } from '@/components/landing/destinations-showcase';
import { HowItWorks } from '@/components/landing/how-it-works';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { FinalCTA } from '@/components/landing/final-cta';
import { Footer } from '@/components/landing/footer';

export const metadata = {
  title: 'LAURA — Private Luxury Experiences & VIP Access Vietnam',
  description:
    'Curated private spa rituals, rare wine tasting cellars, VIP nightclub hosting, and bespoke coastal charters in Vietnam with absolute discretion.',
};

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#050505] text-[#f3eee5] font-sans selection:bg-[var(--gold)] selection:text-[#0a0805]">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--gold)] focus:text-black font-semibold text-xs"
        >
          Skip to main content
        </a>

        {/* Global Floating Navbar */}
        <Navbar />

        {/* Hero Section */}
        <div id="content">
          <Hero />
        </div>

        {/* 6 Core Value Pillars */}
        <ValuePillars />

        {/* Interactive Evening Concierge Itinerary Generator */}
        <ConciergeCurator />

        {/* Curated Destinations Across Vietnam */}
        <DestinationsShowcase />

        {/* 4-Step How It Works Flow */}
        <HowItWorks />

        {/* Client Impressions & Testimonials */}
        <TestimonialsSection />

        {/* Final High-Impact CTA */}
        <FinalCTA />

        {/* Comprehensive Luxury Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
