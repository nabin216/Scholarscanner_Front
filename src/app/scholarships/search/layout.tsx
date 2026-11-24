import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Scholarships',
  description:
    'Search fully funded and partial scholarships by country, study level, field of study and funding type, sorted by deadline.',
  // Every filtered variant (?levels=…, ?country=…) points back to the main search page; the
  // indexable filtered lists are the landing pages such as /scholarships/uk/
  alternates: { canonical: '/scholarships/search/' },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
