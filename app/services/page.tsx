import Link from 'next/link';
import { ArrowUpRight, Sparkles, Clock, Users, MapPin, Check } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';
import { EXPERIENCES } from '@/data/landing';

export const metadata = {
  title: 'Curated Experiences — Massage, Wine Cellars & VIP Nightlife',
  description:
    'Explore our three signature private collections across Vietnam: Massage & Botanical Spas, Grand Cru Wine Cellars, and VIP Nightclub Hosting.',
};

export default function ServicesPage() {
  return (
    <SiteShell>
      <div className="py-16 sm:py-24 bg-[#050505] relative overflow-hidden">
        {/* Header Banner */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center relative z-10 mb-16">
          <div className="inline-flex items-center gap-2.5 text-[var(--gold-light)] text-[0.68rem] tracking-[0.24em] uppercase font-medium">
            <span className="w-6 h-px bg-[var(--gold)]" />
            <span>The Master Collection</span>
            <span className="w-6 h-px bg-[var(--gold)]" />
          </div>
          <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-serif text-[var(--foreground)] leading-[1.05]">
            Experiences, <br />
            <em className="text-[var(--gold-light)] font-normal italic font-serif">personally curated.</em>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#a8a39a] max-w-2xl mx-auto font-light leading-relaxed">
            Three signature domains of indulgence across Vietnam’s most compelling destinations. Each arranged with discreet private hosting and white-glove execution.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={exp.id}
              className="rounded-2xl border border-[var(--border)] bg-[#090909] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl hover:border-[var(--gold)]/50 transition-all duration-300 group"
            >
              {/* Media Col */}
              <div
                className="lg:col-span-6 min-h-[340px] sm:min-h-[420px] bg-cover bg-center relative transition-transform duration-700 group-hover:scale-102"
                style={{ backgroundImage: `url(${exp.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#090909]" />
                <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-[#050505]/80 backdrop-blur-md border border-[var(--gold)]/30 text-[var(--gold-light)] text-[0.62rem] tracking-wider uppercase font-mono">
                  Collection 0{idx + 1}
                </div>
              </div>

              {/* Content Col */}
              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-xs uppercase tracking-widest text-[var(--gold-light)] font-mono">
                      {exp.category}
                    </span>
                    <span className="font-mono text-sm text-white font-bold">
                      From ${exp.fromPrice} / Guest
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl sm:text-4xl font-serif text-white group-hover:text-[var(--gold-light)] transition-colors">
                    {exp.name}
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-[#b0aba2] leading-relaxed font-light">
                    {exp.fullDetails}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#8f8a82] font-mono">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[var(--gold)]" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={14} className="text-[var(--gold)]" />
                      <span>{exp.guestCapacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-[var(--gold)]" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
                    <span className="text-[0.65rem] uppercase tracking-wider text-[#777] block font-medium">
                      Featured Inclusions
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {exp.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#ccc]">
                          <Check size={13} className="text-[var(--gold)] shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href={`/services/${exp.slug}`}
                    className="text-xs uppercase tracking-wider text-[#a5a097] hover:text-white transition-colors"
                  >
                    Explore Dossier & Venues →
                  </Link>

                  <Link
                    href={`/booking?service=${exp.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.16em] uppercase font-bold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] hover:opacity-90 transition-opacity"
                  >
                    <span>Reserve Collection</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
