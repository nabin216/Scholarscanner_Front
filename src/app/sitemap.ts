import type { MetadataRoute } from 'next';
import { getAllScholarships } from '@/lib/scholarshipData';
import { LANDING_PAGES } from '@/lib/landingPages';
import { landingScholarships } from '@/lib/scholarshipQueries';
import { LANDING_PAGE_SIZE, landingPagePath } from '@/components/scholarship/LandingView';
import { absoluteUrl, scholarshipPath } from '@/lib/seo';

export const dynamic = 'force-static';

// Public, indexable pages only: no login/register/profile pages and no query-string URLs
const STATIC_PAGES = [
  { path: '/', priority: 1 },
  { path: '/scholarships/search/', priority: 0.8 },
  { path: '/admissions/', priority: 0.6 },
  { path: '/about/', priority: 0.5 },
  { path: '/how-it-works/', priority: 0.5 },
  { path: '/faq/', priority: 0.5 },
  { path: '/help-center/', priority: 0.4 },
  { path: '/get-in-touch/', priority: 0.4 },
  { path: '/support-team/', priority: 0.3 },
  { path: '/privacy-policy/', priority: 0.2 },
  { path: '/terms-of-service/', priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const all = await getAllScholarships();
  const latest = all.reduce((max, s) => (s.updated_at > max ? s.updated_at : max), '');
  const siteUpdated = latest ? new Date(latest) : new Date();

  const entries: MetadataRoute.Sitemap = [
    ...STATIC_PAGES.map((p) => ({ url: absoluteUrl(p.path), lastModified: siteUpdated, priority: p.priority })),
  ];

  for (const landing of LANDING_PAGES) {
    const list = landingScholarships(landing, all);
    const pages = Math.max(1, Math.ceil(list.length / LANDING_PAGE_SIZE));
    const updated = list.reduce((max, s) => (s.updated_at > max ? s.updated_at : max), '');
    for (let page = 1; page <= pages; page++) {
      entries.push({
        url: absoluteUrl(landingPagePath(landing.slug, page)),
        lastModified: updated ? new Date(updated) : siteUpdated,
        priority: page === 1 ? 0.9 : 0.4,
      });
    }
  }

  for (const s of all) {
    entries.push({ url: absoluteUrl(scholarshipPath(s.slug)), lastModified: new Date(s.updated_at), priority: 0.7 });
  }

  // One entry per URL
  const seen = new Set<string>();
  return entries.filter((e) => (seen.has(e.url) ? false : (seen.add(e.url), true)));
}
