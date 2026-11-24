import React from 'react';
import Link from 'next/link';
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  ClockIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import type { Scholarship } from '@/types/scholarship';
import { sanitizeHtml } from '@/lib/sanitizeHtml';
import {
  absoluteUrl,
  breadcrumbJsonLd,
  formatAmount,
  formatDate,
  formatMonthYear,
  isClosed,
  isFullyFunded,
  isPartiallyFunded,
  jsonLd,
  levelLabels,
  nextRoundDate,
  scholarshipDescription,
  scholarshipPath,
} from '@/lib/seo';
import ScholarshipActions from './ScholarshipActions';
import DaysLeft from './DaysLeft';
import FallbackImage from './FallbackImage';

// Where the country step of the breadcrumb points
const COUNTRY_LANDING: Record<string, string> = {
  'United Kingdom': '/scholarships/uk/',
  'United States': '/scholarships/usa/',
};
export const countryHref = (country: string) =>
  COUNTRY_LANDING[country] || `/scholarships/search/?country=${encodeURIComponent(country)}`;

const names = (items?: { name: string }[]) => (items || []).map((i) => i.name).join(', ');

const Fact = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4">
    <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
      <Icon className="h-5 w-5" />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <div className="mt-0.5 font-semibold text-gray-900 break-words">{children}</div>
    </div>
  </div>
);

const Row = ({ label, value }: { label: string; value?: React.ReactNode }) =>
  value ? (
    <div className="grid grid-cols-3 gap-3 py-3">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="col-span-2 text-sm text-gray-900">{value}</dd>
    </div>
  ) : null;

export default function ScholarshipDetail({ scholarship: s, related }: { scholarship: Scholarship; related: Scholarship[] }) {
  const closed = isClosed(s);
  const nextRound = formatMonthYear(nextRoundDate(s));
  const amount = formatAmount(s.amount);
  const fully = isFullyFunded(s);
  const funding = fully ? 'Fully funded' : isPartiallyFunded(s) ? 'Partially funded' : '';
  const levels = levelLabels(s).join(', ');
  const url = absoluteUrl(scholarshipPath(s.slug));

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Scholarships', path: '/scholarships/search/' },
    { name: s.country_name, path: countryHref(s.country_name) },
    { name: s.title, path: scholarshipPath(s.slug) },
  ];

  const grant = {
    '@context': 'https://schema.org',
    '@type': 'MonetaryGrant',
    name: s.title,
    url,
    description: scholarshipDescription(s),
    ...(s.provider ? { funder: { '@type': 'Organization', name: s.provider } } : {}),
    ...(s.image ? { image: s.image } : {}),
    sameAs: s.application_url,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd(crumbs))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(grant)} />

      <div className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1 min-w-0">
                {i > 0 && <ChevronRightIcon className="h-3.5 w-3.5 flex-shrink-0" />}
                {i < crumbs.length - 1 ? (
                  <Link href={c.path} className="hover:text-blue-700">
                    {c.name}
                  </Link>
                ) : (
                  <span className="truncate text-gray-700" aria-current="page">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Hero */}
        <div className="relative mt-3 overflow-hidden rounded-2xl bg-gray-900">
          <FallbackImage
            src={s.image}
            alt={s.title}
            className="aspect-[4/3] sm:aspect-[21/8] w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
                <GlobeAltIcon className="h-3.5 w-3.5" /> {s.country_name}
              </span>
              {fully && <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">Fully funded</span>}
              {closed ? (
                <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">Closed</span>
              ) : (
                <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">Open</span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight">{s.title}</h1>
            {s.provider && (
              <p className="mt-2 flex items-center gap-1.5 text-sm sm:text-base text-white/85">
                <BuildingLibraryIcon className="h-4 w-4 flex-shrink-0" /> {s.provider}
              </p>
            )}
          </div>
        </div>

        {closed && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <strong>Closed — next round expected {nextRound}.</strong> The last deadline was {formatDate(s.deadline)}. This
            scholarship usually runs every year; check the official website for the next round’s dates.
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Fact icon={CalendarDaysIcon} label={closed ? 'Last deadline' : 'Deadline'}>
                <time dateTime={s.deadline}>{formatDate(s.deadline)}</time>
                <p className="text-xs font-medium">
                  {closed ? <span className="text-red-600">Next round expected {nextRound}</span> : <DaysLeft deadline={s.deadline} />}
                </p>
              </Fact>
              {(funding || amount) && (
                <Fact icon={CurrencyDollarIcon} label="Funding">
                  {[funding, amount ? `about ${amount} / year` : ''].filter(Boolean).join(', ')}
                </Fact>
              )}
              {s.open_date && (
                <Fact icon={ClockIcon} label="Applications open">
                  <time dateTime={s.open_date}>{formatDate(s.open_date)}</time>
                </Fact>
              )}
              {levels && (
                <Fact icon={AcademicCapIcon} label="Study level">
                  {levels}
                </Fact>
              )}
            </div>

            <section className="rounded-2xl bg-white p-5 sm:p-7 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About the {s.title}</h2>
              <div className="rich-text text-gray-700" dangerouslySetInnerHTML={{ __html: sanitizeHtml(s.description) }} />
              {s.requirements && (
                <>
                  <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Requirements and documents</h2>
                  <div className="rich-text text-gray-700" dangerouslySetInnerHTML={{ __html: sanitizeHtml(s.requirements) }} />
                </>
              )}
            </section>

            <section className="rounded-2xl bg-white p-5 sm:p-7 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Key facts</h2>
              <dl className="divide-y divide-gray-100">
                <Row label="Provider" value={s.provider} />
                <Row label="Host country" value={<Link href={countryHref(s.country_name)} className="text-blue-700 hover:underline">{s.country_name}</Link>} />
                <Row label="Study level" value={levels} />
                <Row label="Fields of study" value={names(s.field_of_study)} />
                <Row label="Funding" value={[funding, amount ? `approx. ${amount} per year (estimate in USD)` : ''].filter(Boolean).join(', ')} />
                <Row label="Selection" value={names(s.scholarship_category)} />
                <Row label="Sponsor type" value={names(s.sponsor_type)} />
                <Row label="Language tests" value={names(s.language_requirement)} />
                <Row label="Applications open" value={s.open_date ? formatDate(s.open_date) : undefined} />
                <Row
                  label={closed ? 'Last deadline' : 'Deadline'}
                  value={closed ? `${formatDate(s.deadline)} (closed — next round expected ${nextRound})` : formatDate(s.deadline)}
                />
                <Row
                  label="Official website"
                  value={
                    <a href={s.application_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline break-all">
                      {s.application_url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                  }
                />
              </dl>
            </section>

            <section className="rounded-2xl bg-white p-5 sm:p-7 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">How to apply</h2>
              <p className="text-gray-700">
                Applications are made on the official {s.provider || 'scholarship'} website
                {closed ? `. The next round is expected around ${nextRound}.` : `, before ${formatDate(s.deadline)}.`} Read the
                eligibility rules and the list of required documents there before you start, and confirm the deadline for your
                country, as dates can change between rounds.
              </p>
              <a
                href={s.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Go to the official {s.title} page
              </a>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <div className="hidden lg:block rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <p className="text-sm text-gray-500">{closed ? 'Last deadline' : 'Deadline'}</p>
              <p className="text-xl font-bold text-gray-900">{formatDate(s.deadline)}</p>
              <p className="text-sm font-medium">
                {closed ? <span className="text-red-600">Next round expected {nextRound}</span> : <DaysLeft deadline={s.deadline} />}
              </p>
              <ScholarshipActions scholarshipId={s.id} title={s.title} applicationUrl={s.application_url} closed={closed} variant="sidebar" />
              <p className="mt-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
                Details change every year. Always confirm the deadline and eligibility on the official website.
              </p>
            </div>

            {related.length > 0 && (
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                <h2 className="font-semibold text-gray-900 mb-3">Related scholarships</h2>
                <ul className="space-y-1">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={scholarshipPath(r.slug)}
                        className="group flex gap-3 rounded-lg p-2 -mx-2 hover:bg-gray-50 transition-colors"
                      >
                        <FallbackImage
                          src={r.image}
                          alt=""
                          loading="lazy"
                          className="h-16 w-20 flex-shrink-0 rounded-lg object-cover bg-gray-100"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-700">
                            {r.title}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {r.country_name} · {isClosed(r) ? 'Closed' : `Due ${formatDate(r.deadline, 'short')}`}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={countryHref(s.country_name)}
                  className="mt-4 block border-t border-gray-100 pt-4 text-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  More scholarships in {s.country_name} →
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>

      <ScholarshipActions scholarshipId={s.id} title={s.title} applicationUrl={s.application_url} closed={closed} variant="mobile" />
    </div>
  );
}
