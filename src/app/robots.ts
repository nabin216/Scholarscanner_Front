import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Account pages have no public content. /Authentication/ is deliberately NOT blocked:
        // Google has to crawl the login and register pages to see their noindex tag.
        disallow: ['/profile/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
