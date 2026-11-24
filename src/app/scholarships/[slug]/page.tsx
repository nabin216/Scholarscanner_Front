import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ScholarshipDetail from '@/components/scholarship/ScholarshipDetail';
import LandingView, { LANDING_PAGE_SIZE, landingPagePath } from '@/components/scholarship/LandingView';
import { getAllScholarships, getScholarship } from '@/lib/scholarshipData';
import { LANDING_PAGES, getLandingPage } from '@/lib/landingPages';
import { landingScholarships, relatedScholarships } from '@/lib/scholarshipQueries';
import {
  SITE_NAME,
  absoluteUrl,
  isFullyFunded,
  scholarshipDescription,
  scholarshipPath,
  scholarshipTitle,
} from '@/lib/seo';

// /scholarships/<slug>/ is either a landing page (/scholarships/uk/) or a scholarship detail page.
// Every page is pre-rendered as full HTML when the site is built (the site is rebuilt daily).

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const all = await getAllScholarships();
  const landing = new Set(LANDING_PAGES.map((p) => p.slug));
  return [
    ...LANDING_PAGES.map((p) => ({ slug: p.slug })),
    // A scholarship slug that collides with a landing page or a fixed route can't be served here
    ...all.filter((s) => !landing.has(s.slug) && s.slug !== 'search' && s.slug !== 'scholarshipdetails').map((s) => ({ slug: s.slug })),
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;

  const landing = getLandingPage(slug);
  if (landing) {
    const url = absoluteUrl(landingPagePath(slug, 1));
    return {
      title: landing.title,
      description: landing.description,
      alternates: { canonical: url },
      openGraph: { title: `${landing.title} | ${SITE_NAME}`, description: landing.description, url, type: 'website' },
      twitter: { title: `${landing.title} | ${SITE_NAME}`, description: landing.description },
    };
  }

  const s = await getScholarship(slug);
  if (!s) return {};
  const title = scholarshipTitle(s);
  const description = scholarshipDescription(s);
  const url = absoluteUrl(scholarshipPath(s.slug));
  const images = s.image ? [{ url: s.image, alt: s.title }] : undefined;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'article', ...(images ? { images } : {}) },
    twitter: { card: s.image ? 'summary_large_image' : 'summary', title, description, ...(images ? { images: [s.image!] } : {}) },
  };
}

export default async function ScholarshipOrLandingPage({ params }: Params) {
  const { slug } = await params;
  const all = await getAllScholarships();

  const landing = getLandingPage(slug);
  if (landing) {
    const list = landingScholarships(landing, all);
    return (
      <LandingView
        landing={landing}
        items={list.slice(0, LANDING_PAGE_SIZE)}
        total={list.length}
        fullyFunded={list.filter(isFullyFunded).length}
        page={1}
        pages={Math.max(1, Math.ceil(list.length / LANDING_PAGE_SIZE))}
      />
    );
  }

  const s = all.find((x) => x.slug === slug);
  if (!s) notFound();
  return <ScholarshipDetail scholarship={s} related={relatedScholarships(s, all)} />;
}
