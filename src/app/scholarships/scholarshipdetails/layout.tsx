import type { Metadata } from 'next';

// The page sets the scholarship's own title once it has loaded
export const metadata: Metadata = {
  title: 'Scholarship Details',
  description: 'Deadline, value, eligibility and official application link for this scholarship.',
};

export default function ScholarshipDetailsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
