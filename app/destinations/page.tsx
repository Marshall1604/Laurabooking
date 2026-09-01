import Link from 'next/link';
import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';
import { DESTINATIONS } from '@/data/landing';

export const metadata = {
  title: 'Destinations — Ho Chi Minh City, Da Nang, Phu Quoc & Vietnam',
  description:
    'Discover private luxury venues and exclusive addresses across Vietnam: Saigon, Da Nang, Phu Quoc, Nha Trang, and Vung Tau.',
};

export default function DestinationsPage() {
  return (
    <SiteShell>
      <div className="py-16 sm:py-24 bg-[#050505] relative overflow-hidden">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center relative z-10 mb-16">
          <div className="inline-flex items-center gap-2.5 text-[var(--gold-light)] text-[0.68rem] tracking-[0.24em] uppercase font-medium">
            <span className="w-6 h-px bg-[var(--gold)]" />
            <span>Private Access Network</span>
            <span className="w-6 h-px bg-[var(--gold)]" />
          </div>
          <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-serif text-[var(--foreground)] leading-[1.05]">
            Five magnetic cities. <br />
            <em className="text-[var(--gold-light)] font-normal italic font-serif">Infinite discretion.</em>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#a8a39a] max-w-2xl mx-auto font-light leading-relaxed">
            From electric subterranean cellars in Saigon to tranquil beachfront wellness sanctuaries in Phu Quoc and Da Nang.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="rounded-xl border border-[var(--border)] bg-[#090909] overflow-hidden group hover:border-[var(--gold)]/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div
                className="h-64 bg-cover bg-center relative transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${dest.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/30" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#050505]/80 backdrop-blur-md border border-[var(--gold)]/30 text-[var(--gold-light)] text-[0.62rem] tracking-wider uppercase font-mono">
                  <MapPin size={11} className="inline mr-1" />
                  {dest.venueCount} Private Venues
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--gold-light)] font-serif italic block">
                    {dest.curatedVibe}
                  </span>
                  <h2 className="mt-1 text-2xl font-serif text-white group-hover:text-[var(--gold-light)] transition-colors">
                    {dest.name}
                  </h2>
                  <p className="mt-2 text-xs text-[#a5a097] leading-relaxed font-light">
                    {dest.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[var(--gold-light)]">
                  <span>Explore City Dossier</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
