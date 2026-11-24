import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import type { Scholarship } from '@/types/scholarship';
import type { LandingPage } from '@/lib/landingPages';
import { LANDING_LINKS } from '@/lib/landingSlugs';
import { breadcrumbJsonLd, formatDate, isClosed, isFullyFunded, jsonLd, levelLabels, scholarshipPath } from '@/lib/seo';
import FallbackImage from './FallbackImage';

export const LANDING_PAGE_SIZE = 24;

export const landingPagePath = (slug: string, page: number) =>
  page <= 1 ? `/scholarships/${slug}/` : `/scholarships/${slug}/page/${page}/`;

interface Props {
  landing: LandingPage;
  items: Scholarship[]; // this page's scholarships
  total: number;
  fullyFunded: number;
  page: number;
  pages: number;
}

export default function LandingView({ landing, items, total, fullyFunded, page, pages }: Props) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Scholarships', path: '/scholarships/search/' },
    { name: landing.h1, path: landingPagePath(landing.slug, 1) },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd(crumbs))} />
      <div className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1">
                {i > 0 && <ChevronRightIcon className="h-3.5 w-3.5" />}
                {i < crumbs.length - 1 ? (
                  <Link href={c.path} className="hover:text-blue-700">{c.name}</Link>
                ) : (
                  <span className="text-gray-700" aria-current="page">{c.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <header className="mt-4 rounded-2xl bg-white p-5 sm:p-8 shadow-sm ring-1 ring-gray-100">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight">
            {landing.h1}
            {page > 1 && <span className="text-gray-500 font-medium"> – page {page}</span>}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {total} scholarships{fullyFunded > 0 && `, ${fullyFunded} fully funded`} · updated daily
          </p>
          {page === 1 && (
            <div className="mt-5 space-y-4 text-gray-700 leading-relaxed max-w-3xl">
              {landing.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          <Link
            href={landing.searchHref}
            className="mt-5 inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
          >
            Filter this list by level, field and deadline →
          </Link>
        </header>

        <section className="mt-6" aria-label="Scholarships">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => {
              const closed = isClosed(s);
              return (
                <li key={s.id} className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <Link href={scholarshipPath(s.slug)} className="block h-full">
                    <FallbackImage src={s.image} alt="" loading="lazy" className="h-36 w-full object-cover bg-gray-100" />
                    <div className="p-4">
                      <h2 className="font-semibold text-gray-900 leading-snug line-clamp-2">{s.title}</h2>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-1">{s.provider}</p>
                      <p className="mt-2 flex flex-wrap gap-x-2 text-xs text-gray-500">
                        <span>{s.country_name}</span>
                        <span>·</span>
                        <span>{levelLabels(s).join(', ')}</span>
                        {isFullyFunded(s) && (
                          <>
                            <span>·</span>
                            <span className="text-emerald-700 font-medium">Fully funded</span>
                          </>
                        )}
                      </p>
                      <p className={`mt-2 text-sm font-medium ${closed ? 'text-red-600' : 'text-gray-900'}`}>
                        {closed ? `Closed (last deadline ${formatDate(s.deadline, 'short')})` : `Deadline ${formatDate(s.deadline, 'short')}`}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {pages > 1 && (
            <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {page > 1 && (
                <Link href={landingPagePath(landing.slug, page - 1)} rel="prev" className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">
                  ← Previous
                </Link>
              )}
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={landingPagePath(landing.slug, n)}
                  aria-current={n === page ? 'page' : undefined}
                  className={`rounded-lg px-3 py-2 text-sm ${n === page ? 'bg-blue-600 text-white' : 'border border-gray-300 bg-white hover:bg-gray-50'}`}
                >
                  {n}
                </Link>
              ))}
              {page < pages && (
                <Link href={landingPagePath(landing.slug, page + 1)} rel="next" className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">
                  Next →
                </Link>
              )}
            </nav>
          )}
        </section>

        {page === 1 && (
          <section className="mt-10 rounded-2xl bg-white p-5 sm:p-8 shadow-sm ring-1 ring-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Frequently asked questions</h2>
            <div className="mt-4 divide-y divide-gray-100">
              {landing.faqs.map((f) => (
                <div key={f.q} className="py-4">
                  <h3 className="font-medium text-gray-900">{f.q}</h3>
                  <p className="mt-1 text-gray-700">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900">More scholarship lists</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {LANDING_LINKS.filter((l) => l.slug !== landing.slug).map((l) => (
              <li key={l.slug}>
                <Link href={`/scholarships/${l.slug}/`} className="inline-block rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:border-blue-300 hover:text-blue-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
