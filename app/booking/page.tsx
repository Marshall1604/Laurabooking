import { SiteShell } from '@/components/site-shell';
import { BookingFlow } from '@/components/booking-flow';

export const metadata = {
  title: 'Arrange Your Experience — Private Concierge Booking',
  description:
    'Confidential reservations for massage & spa sanctuaries, wine tasting cellars, and VIP nightclub table holds across Vietnam.',
};

export default function BookingPage() {
  return (
    <SiteShell>
      <div className="py-12 bg-[#050505] relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(circle,rgba(218,189,126,0.1)_0%,transparent_70%)] blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center mb-6">
          <div className="inline-flex items-center gap-2.5 text-[var(--gold-light)] text-[0.68rem] tracking-[0.24em] uppercase font-medium">
            <span className="w-6 h-px bg-[var(--gold)]" />
            <span>Private Concierge Desk</span>
            <span className="w-6 h-px bg-[var(--gold)]" />
          </div>
          <h1 className="mt-3 text-4xl sm:text-6xl font-serif text-[var(--foreground)] leading-[1.05]">
            Arrange your <br />
            <em className="text-[var(--gold-light)] font-normal italic font-serif">private experience.</em>
          </h1>
          <p className="mt-4 text-sm text-[#a8a39a] max-w-xl mx-auto font-light leading-relaxed">
            Specify your desired evening parameters below. Every arrangement is confirmed personally by your dedicated LAURA host.
          </p>
        </div>

        <BookingFlow />
      </div>
    </SiteShell>
  );
}
