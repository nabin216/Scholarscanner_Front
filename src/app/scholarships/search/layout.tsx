import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Scholarships',
  description:
    'Search fully funded and partial scholarships by country, study level, field of study and funding type, sorted by deadline.',
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
