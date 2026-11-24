import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support Team',
  description: 'Get help from the ScholarScanner support team with your account, saved scholarships or scholarship details.',
  alternates: { canonical: '/support-team/' },
};

export default function SupportTeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
