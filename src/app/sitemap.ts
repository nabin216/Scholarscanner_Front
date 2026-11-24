import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarscanner.com';

const STATIC_PAGES = [
  { path: '/', priority: 1 },
  { path: '/scholarships/search/', priority: 0.9 },
  { path: '/admissions/', priority: 0.7 },
  { path: '/about/', priority: 0.5 },
  { path: '/how-it-works/', priority: 0.5 },
  { path: '/faq/', priority: 0.5 },
  { path: '/help-center/', priority: 0.4 },
  { path: '/get-in-touch/', priority: 0.4 },
  { path: '/privacy-policy/', priority: 0.2 },
  { path: '/terms-of-service/', priority: 0.2 },
];

// Every scholarship detail page, read from the API when the site is built
const fetchScholarships = async (): Promise<{ slug: string; updated_at: string }[]> => {
  const all: { slug: string; updated_at: string }[] = [];
  let url: string | null = `${process.env.NEXT_PUBLIC_API_URL}/scholarships/?page_size=100&ordering=deadline`;
  try {
    while (url) {
      const res: Response = await fetch(url, { cache: 'force-cache' });
      if (!res.ok) break;
      const data = await res.json();
      all.push(...(data.results || []));
      url = data.next;
    }
  } catch {
    // Build without scholarship URLs rather than failing the deploy
  }
  return all;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const scholarships = await fetchScholarships();

  return [
    ...STATIC_PAGES.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      priority: page.priority,
    })),
    ...scholarships.map((s) => ({
      url: `${SITE_URL}/scholarships/scholarshipdetails/?id=${s.slug}`,
      lastModified: new Date(s.updated_at),
      priority: 0.8,
    })),
  ];
}
