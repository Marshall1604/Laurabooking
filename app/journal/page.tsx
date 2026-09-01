import Link from 'next/link';
import { ArrowUpRight, BookOpen, Calendar } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';
import { INITIAL_POSTS } from '@/lib/data-store';

export const metadata = {
  title: 'The Journal — Insider Guides & Stories for Discerning Travellers',
  description:
    'Editorial dossiers on hidden wine cellars, wellness sanctuaries, and VIP nightlife culture in Vietnam.',
};

export default function JournalPage() {
  return (
    <SiteShell>
      <div className="py-16 sm:py-24 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center relative z-10 mb-16">
          <div className="inline-flex items-center gap-2.5 text-[var(--gold-light)] text-[0.68rem] tracking-[0.24em] uppercase font-sans font-semibold">
            <span className="w-6 h-px bg-[var(--gold)]" />
            <span>The AURELIS Gazette</span>
            <span className="w-6 h-px bg-[var(--gold)]" />
          </div>
          <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-serif text-[var(--foreground)] leading-[1.1] font-normal">
            Stories for the <br />
            <em className="text-[var(--gold-light)] font-normal italic font-serif">curious connoisseur.</em>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#a8a39a] max-w-xl mx-auto font-sans font-light leading-relaxed">
            Our editors gather the addresses, sommelier secrets, and after-dark rituals worth knowing across Vietnam.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_POSTS.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.slug}`}
              className="rounded-2xl border border-[var(--border)] bg-[#090909] overflow-hidden group hover:border-[var(--gold)]/50 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl"
            >
              <div
                className="h-60 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${post.coverImage})` }}
              />

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[0.68rem] text-[var(--gold-light)] uppercase font-sans font-semibold tracking-[0.14em] mb-2.5">
                    <span>{post.serviceTag.replace(/-/g, ' ')}</span>
                    <span className="text-white/30">·</span>
                    <span>{post.destinationTag.replace(/-/g, ' ')}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif text-white group-hover:text-[var(--gold-light)] transition-colors leading-[1.3] font-normal">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#a5a098] mt-3 font-sans font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#888] font-sans">
                  <span>{post.author}</span>
                  <div className="w-7 h-7 rounded-full bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-black transition-colors">
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
