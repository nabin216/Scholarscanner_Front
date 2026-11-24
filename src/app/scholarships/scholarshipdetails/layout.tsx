import type { Metadata } from 'next';

// Old URL pattern that only redirects to /scholarships/<slug>/: keep it out of the index
export const metadata: Metadata = {
  title: 'Redirecting',
  robots: { index: false, follow: true },
};

// Runs before React loads, so the visitor (and Googlebot) is forwarded straight away
const REDIRECT_SCRIPT = `(function(){var id=new URLSearchParams(location.search).get('id');if(id&&!/^\\d+$/.test(id.trim()))location.replace('/scholarships/'+encodeURIComponent(id.trim())+'/');})();`;

export default function ScholarshipDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: REDIRECT_SCRIPT }} />
      {children}
    </>
  );
}
