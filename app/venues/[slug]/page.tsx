import { SiteShell } from '@/components/site-shell';
import { VenueDetailView } from '@/components/venues/venue-detail-view';
import { INITIAL_VENUES } from '@/lib/data-store';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = INITIAL_VENUES.find((x) => x.slug === slug || x.id === slug);
  if (!v) return { title: 'Venue Not Found — AURELIS' };
  return {
    title: `${v.name} — Exclusive Luxury Sanctuary & Experience`,
    description: v.promoExcerpt || `${v.name} in ${v.destinationSlug}.`,
  };
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <SiteShell>
      <VenueDetailView slug={slug} />
    </SiteShell>
  );
}
