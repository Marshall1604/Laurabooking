import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Calendar, User, Sparkles } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';
import { INITIAL_POSTS } from '@/lib/data-store';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = INITIAL_POSTS.find((x) => x.slug === slug);
  if (!post) return { title: 'Story Not Found' };
  return {
    title: `${post.title} — AURELIS Journal`,
    description: post.excerpt,
  };
}

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = INITIAL_POSTS.find((x) => x.slug === slug);
  if (!post) notFound();

  return (
    <SiteShell>
      <article className="py-16 sm:py-24 bg-[#050505] min-h-screen">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-[#888] hover:text-[var(--gold-light)] mb-8 transition-colors font-sans"
          >
            <ArrowLeft size={14} />
            <span>Back to Gazette</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[var(--gold-light)] uppercase font-sans font-semibold tracking-[0.14em] mb-4">
            <span>{post.serviceTag.replace(/-/g, ' ')}</span>
            <span className="text-white/30">·</span>
            <span>{post.destinationTag.replace(/-/g, ' ')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.15] font-normal">
            {post.title}
          </h1>

          <div className="mt-6 pb-6 border-b border-white/10 flex items-center justify-between text-xs text-[#888] font-sans">
            <div className="flex items-center gap-2">
              <User size={13} className="text-[var(--gold)]" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={13} className="text-[var(--gold)]" />
              <span>{post.publishedAt}</span>
            </div>
          </div>

          {/* Cover Photo */}
          <div
            className="my-8 h-[360px] sm:h-[480px] rounded-2xl bg-cover bg-center border border-white/10"
            style={{ backgroundImage: `url(${post.coverImage})` }}
          />

          {/* Content */}
          <div className="text-[#c9c4bb] leading-relaxed space-y-6 text-base sm:text-lg font-sans font-light">
            <p className="text-xl sm:text-2xl text-[var(--gold-light)] font-serif italic leading-relaxed font-normal">
              {post.excerpt}
            </p>
            <div className="whitespace-pre-line leading-loose text-[#d0cbc2]">{post.content}</div>
          </div>

          {/* Footer Recommendation Box */}
          <div className="mt-16 p-8 rounded-2xl bg-[#090909] border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[0.65rem] tracking-[0.18em] uppercase text-[var(--gold-light)] font-sans font-semibold">
                Curated Recommendation
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-white mt-1 font-normal">Experience this firsthand</h3>
              <p className="text-xs sm:text-sm text-[#888] mt-1 font-sans font-light">
                Our concierge can secure private reservations for addresses highlighted in this story.
              </p>
            </div>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs tracking-[0.16em] uppercase font-sans font-bold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] shrink-0 hover:opacity-90 transition-opacity"
            >
              <span>Arrange Experience</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
