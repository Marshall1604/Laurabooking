import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/site-shell';
import { EXPERIENCES } from '@/data/landing';
import { ServiceDetailView } from '@/components/services/service-detail-view';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = EXPERIENCES.find((x) => x.slug === slug);
  if (!s) return { title: 'Experience Not Found' };
  return {
    title: `${s.name} — Private Luxury Experiences`,
    description: s.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = EXPERIENCES.find((x) => x.slug === slug);
  if (!service) notFound();

  return (
    <SiteShell>
      <ServiceDetailView service={service} />
    </SiteShell>
  );
}
