"use client";

// Old URL: /scholarships/scholarshipdetails/?id=<slug>. Scholarship pages now live at
// /scholarships/<slug>/. GitHub Pages can't send a server-side 301, so this page is marked noindex
// (see layout.tsx) and forwards the visitor immediately; Google follows the redirect when it renders.

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL;

const Redirect = () => {
  const id = useSearchParams()?.get('id')?.trim();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!id) {
      window.location.replace('/scholarships/search/');
      return;
    }
    if (!/^\d+$/.test(id)) {
      window.location.replace(`/scholarships/${encodeURIComponent(id)}/`);
      return;
    }
    // Some older links use the numeric id: look up the slug first
    fetch(`${API}/scholarships/${id}/`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((s) => window.location.replace(`/scholarships/${s.slug}/`))
      .catch(() => setFailed(true));
  }, [id]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 text-center">
      {failed ? (
        <p className="text-gray-700">
          We couldn’t find that scholarship.{' '}
          <Link href="/scholarships/search/" className="text-blue-700 underline">Browse all scholarships</Link>
        </p>
      ) : (
        <p className="text-gray-600">
          Redirecting…{' '}
          {id && !/^\d+$/.test(id) && (
            <Link href={`/scholarships/${id}/`} className="text-blue-700 underline">Continue to the scholarship</Link>
          )}
        </p>
      )}
    </div>
  );
};

export default function OldScholarshipDetailsUrl() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <Redirect />
    </Suspense>
  );
}
