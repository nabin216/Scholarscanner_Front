import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LandingView, { LANDING_PAGE_SIZE, landingPagePath } from '@/components/scholarship/LandingView';
import { getAllScholarships } from '@/lib/scholarshipData';
import { LANDING_PAGES, getLandingPage } from '@/lib/landingPages';
import { landingScholarships } from '@/lib/scholarshipQueries';
import { SITE_NAME, absoluteUrl, isFullyFunded } from '@/lib/seo';

// Page 2, 3, … of a landing page: /scholarships/uk/page/2/ (each one self-canonical)

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string; page: string }> };

export async function generateStaticParams() {
  const all = await getAllScholarships();
  return LANDING_PAGES.flatMap((landing) => {
    const pages = Math.ceil(landingScholarships(landing, all).length / LANDING_PAGE_SIZE);
    return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ slug: landing.slug, page: String(i + 2) }));
  });
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, page } = await params;
  const landing = getLandingPage(slug);
  if (!landing) return {};
  const title = `${landing.title} – Page ${page}`;
  const url = absoluteUrl(landingPagePath(slug, Number(page)));
  return {
    title,
    description: `Page ${page}: ${landing.description}`.slice(0, 160),
    alternates: { canonical: url },
    openGraph: { title: `${title} | ${SITE_NAME}`, url, type: 'website' },
  };
}

export default async function LandingPaginated({ params }: Params) {
  const { slug, page: pageParam } = await params;
  const landing = getLandingPage(slug);
  const page = Number(pageParam);
  if (!landing || !Number.isInteger(page) || page < 2) notFound();

  const list = landingScholarships(landing, await getAllScholarships());
  const pages = Math.ceil(list.length / LANDING_PAGE_SIZE);
  if (page > pages) notFound();

  return (
    <LandingView
      landing={landing}
      items={list.slice((page - 1) * LANDING_PAGE_SIZE, page * LANDING_PAGE_SIZE)}
      total={list.length}
      fullyFunded={list.filter(isFullyFunded).length}
      page={page}
      pages={pages}
    />
  );
}
