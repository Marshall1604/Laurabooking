import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/site-shell';
import { DESTINATIONS } from '@/data/landing';
import { DestinationDetailView } from '@/components/destinations/destination-detail-view';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = DESTINATIONS.find((x) => x.slug === slug);
  if (!d) return { title: 'Destination Not Found' };
  return {
    title: `${d.name} — Private Luxury Sanctuaries & Nightlife`,
    description: d.description,
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = DESTINATIONS.find((x) => x.slug === slug);
  if (!destination) notFound();

  return (
    <SiteShell>
      <DestinationDetailView destination={destination} />
    </SiteShell>
  );
}
