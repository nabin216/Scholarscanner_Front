"use client";

import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  BookmarkIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  ShareIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { Scholarship } from '../../../types/scholarship';
import { useAuth } from '../../Authentication/context/AuthContext';
import { loginHref } from '../../Authentication/utils/authUtils';
import { sanitizeHtml, htmlToText } from '@/lib/sanitizeHtml';

const API = process.env.NEXT_PUBLIC_API_URL;
const DEFAULT_IMAGE = '/images/providers/scholarship-default.jpg';

const formatDate = (date: string, month: 'short' | 'long' = 'long') =>
  new Date(date).toLocaleDateString('en-US', { year: 'numeric', month, day: 'numeric' });

// Whole days from today until the date (negative once it has passed)
const daysUntil = (date: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((new Date(date).getTime() - today.getTime()) / 86_400_000);
};

const formatAmount = (amount: string) => {
  const value = Number(amount);
  return value > 0 ? `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : null;
};

const authHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  return token ? { Authorization: `Bearer ${token}` } : null;
};

/* ---------- Small pieces ---------- */

const Chips = ({ label, items }: { label: string; items?: { id: number; name: string }[] }) =>
  items && items.length > 0 ? (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">{label}</dt>
      <dd className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item.id} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
            {item.name}
          </span>
        ))}
      </dd>
    </div>
  ) : null;

const Fact = ({
  icon: Icon,
  label,
  value,
  hint,
  tone = 'default',
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
  tone?: 'default' | 'urgent' | 'closed';
}) => (
  <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4">
    <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
      <Icon className="h-5 w-5" />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-0.5 font-semibold text-gray-900 break-words">{value}</p>
      {hint && (
        <p
          className={`mt-0.5 text-xs font-medium ${
            tone === 'urgent' ? 'text-amber-600' : tone === 'closed' ? 'text-red-600' : 'text-gray-500'
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  </div>
);

/* ---------- Related scholarships: same country first, then same level ---------- */

const RelatedScholarships = ({ scholarship }: { scholarship: Scholarship }) => {
  const [related, setRelated] = useState<Scholarship[] | null>(null);

  useEffect(() => {
    const fetchRelated = async () => {
      const queries = [
        `country=${encodeURIComponent(scholarship.country_name)}`,
        scholarship.levels?.[0] ? `levels=${encodeURIComponent(scholarship.levels[0].name)}` : '',
      ].filter(Boolean);

      try {
        const results = await Promise.all(
          queries.map((q) =>
            fetch(`${API}/scholarships/?${q}&ordering=deadline&page_size=6`)
              .then((r) => (r.ok ? r.json() : { results: [] }))
              .then((d) => (d.results || d) as Scholarship[])
          )
        );
        const seen = new Set([scholarship.id]);
        const merged: Scholarship[] = [];
        results.flat().forEach((s) => {
          if (!seen.has(s.id)) {
            seen.add(s.id);
            merged.push(s);
          }
        });
        setRelated(merged.slice(0, 4));
      } catch {
        setRelated([]);
      }
    };
    fetchRelated();
  }, [scholarship]);

  if (related === null) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3 animate-pulse">
            <div className="h-16 w-20 rounded-lg bg-gray-200" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-3 rounded bg-gray-200" />
              <div className="h-3 w-2/3 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (related.length === 0) return null;

  return (
    <div className="space-y-1">
      {related.map((s) => {
        const left = daysUntil(s.deadline);
        return (
          <Link
            key={s.id}
            href={`/scholarships/scholarshipdetails?id=${s.slug}`}
            className="group flex gap-3 rounded-lg p-2 -mx-2 hover:bg-gray-50 transition-colors"
          >
            <img
              src={s.image || DEFAULT_IMAGE}
              alt=""
              loading="lazy"
              className="h-16 w-20 flex-shrink-0 rounded-lg object-cover bg-gray-100"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_IMAGE;
              }}
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-700">
                {s.title}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                {s.country_name} ·{' '}
                <span className={left < 0 ? 'text-red-600' : left <= 30 ? 'text-amber-600' : ''}>
                  {left < 0 ? 'Closed' : `Due ${formatDate(s.deadline, 'short')}`}
                </span>
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

/* ---------- Page ---------- */

const ScholarshipDetailsContent = () => {
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [shareNote, setShareNote] = useState<string | null>(null);

  const slug = searchParams?.get('id');

  useEffect(() => {
    const fetchScholarship = async () => {
      if (!slug) {
        setError('No scholarship was selected.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API}/scholarships/${slug}/`);
        if (!response.ok) {
          setError(
            response.status === 404
              ? 'We could not find this scholarship. It may have been removed.'
              : response.status === 429
                ? 'You are browsing very fast. Please wait a minute and try again.'
                : 'Something went wrong while loading this scholarship. Please try again.'
          );
          return;
        }
        setScholarship(await response.json());
      } catch {
        setError('Could not reach the server. Check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchScholarship();
  }, [slug]);

  // Page title and description for browser tabs, sharing and search engines
  useEffect(() => {
    if (!scholarship) return;
    document.title = `${scholarship.title} (${scholarship.country_name}) | ScholarScanner`;
    const description = htmlToText(scholarship.description).slice(0, 155);
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [scholarship]);

  // Saved / applied state for logged-in users (matched by numeric id, not the slug in the URL)
  useEffect(() => {
    const headers = authHeaders();
    if (!isAuthenticated || !scholarship || !headers) return;

    const ids = (data: any) => (data.results || data).map((item: any) => item.scholarship);
    fetch(`${API}/user/saved-scholarships/`, { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setIsSaved(ids(d).includes(scholarship.id)))
      .catch(() => {});
    fetch(`${API}/user/applications/`, { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setHasApplied(ids(d).includes(scholarship.id)))
      .catch(() => {});
  }, [isAuthenticated, scholarship]);

  const descriptionHtml = useMemo(() => (scholarship ? sanitizeHtml(scholarship.description) : ''), [scholarship]);

  const handleSave = async () => {
    const headers = authHeaders();
    if (!isAuthenticated || !headers || !scholarship) {
      window.location.href = loginHref();
      return;
    }
    setSaving(true);
    try {
      if (isSaved) {
        const list = await fetch(`${API}/user/saved-scholarships/`, { headers }).then((r) => r.json());
        const item = (list.results || list).find((i: any) => i.scholarship === scholarship.id);
        if (item) {
          const res = await fetch(`${API}/user/saved-scholarships/${item.id}/`, { method: 'DELETE', headers });
          if (res.ok) setIsSaved(false);
        }
      } else {
        const res = await fetch(`${API}/user/saved-scholarships/`, {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ scholarship: scholarship.id }),
        });
        if (res.ok) setIsSaved(true);
      }
    } catch (err) {
      console.error('Error saving scholarship:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    if (!scholarship) return;
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: scholarship.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareNote('Link copied');
      setTimeout(() => setShareNote(null), 2000);
    } catch {
      /* user cancelled the share sheet */
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-6 animate-pulse">
          <div className="h-4 w-32 rounded bg-gray-200 mb-4" />
          <div className="aspect-[16/9] sm:aspect-[21/8] rounded-2xl bg-gray-200" />
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-3">
              <div className="h-24 rounded-xl bg-gray-200" />
              <div className="h-64 rounded-xl bg-gray-200" />
            </div>
            <div className="h-48 rounded-xl bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !scholarship) {
    return (
      <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold text-gray-900">Scholarship unavailable</h1>
          <p className="mt-2 text-gray-600">{error || 'We could not find this scholarship.'}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Try again
            </button>
            <Link
              href="/scholarships/search"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Browse scholarships
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const left = daysUntil(scholarship.deadline);
  const closed = left < 0;
  const amount = formatAmount(scholarship.amount);
  const fullyFunded = scholarship.fund_type?.some((f) => f.name === 'Full Funding');
  const opensLater = scholarship.open_date ? daysUntil(scholarship.open_date) > 0 : false;
  const deadlineHint = closed
    ? 'Deadline has passed'
    : left === 0
      ? 'Closes today'
      : `${left} day${left === 1 ? '' : 's'} left`;

  const applyButton = hasApplied ? (
    <span className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white">
      <CheckCircleIcon className="h-5 w-5" /> Applied
    </span>
  ) : (
    <a
      href={scholarship.application_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
    >
      <span className="lg:hidden">Apply now</span>
      <span className="hidden lg:inline">Apply on official site</span>
      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
    </a>
  );

  const saveButton = (
    <button
      onClick={handleSave}
      disabled={saving}
      aria-pressed={isSaved}
      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition-colors disabled:opacity-60 ${
        isSaved ? 'border-amber-300 bg-amber-50 text-amber-700' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      {isSaved ? <BookmarkSolidIcon className="h-5 w-5" /> : <BookmarkIcon className="h-5 w-5" />}
      <span>{saving ? 'Saving…' : isSaved ? 'Saved' : 'Save'}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-12">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
        <Link
          href="/scholarships/search"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-700"
        >
          <ArrowLeftIcon className="h-4 w-4" /> All scholarships
        </Link>

        {/* Hero */}
        <div className="relative mt-3 overflow-hidden rounded-2xl bg-gray-900">
          <img
            src={scholarship.image || DEFAULT_IMAGE}
            alt={scholarship.title}
            className="aspect-[4/3] sm:aspect-[21/8] w-full object-cover opacity-90"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_IMAGE;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
                <GlobeAltIcon className="h-3.5 w-3.5" /> {scholarship.country_name}
              </span>
              {fullyFunded && (
                <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">Fully funded</span>
              )}
              {closed ? (
                <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">Closed</span>
              ) : opensLater ? (
                <span className="rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white">Opens soon</span>
              ) : (
                <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">Open now</span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight">{scholarship.title}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm sm:text-base text-white/85">
              <BuildingLibraryIcon className="h-4 w-4 flex-shrink-0" /> {scholarship.provider}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Fact
                icon={CalendarDaysIcon}
                label="Deadline"
                value={formatDate(scholarship.deadline)}
                hint={deadlineHint}
                tone={closed ? 'closed' : left <= 30 ? 'urgent' : 'default'}
              />
              {amount && <Fact icon={CurrencyDollarIcon} label="Approx. value" value={`${amount} / year`} hint="Estimate in USD" />}
              {scholarship.open_date && (
                <Fact
                  icon={ClockIcon}
                  label="Applications open"
                  value={formatDate(scholarship.open_date)}
                  hint={opensLater ? 'Not open yet' : 'Already open'}
                />
              )}
              {scholarship.levels?.length > 0 && (
                <Fact icon={AcademicCapIcon} label="Study level" value={scholarship.levels.map((l) => l.name).join(', ')} />
              )}
            </div>

            <section className="rounded-2xl bg-white p-5 sm:p-7 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About this scholarship</h2>
              <div className="rich-text text-gray-700" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
              {scholarship.requirements && (
                <>
                  <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Requirements</h2>
                  <div
                    className="rich-text text-gray-700"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(scholarship.requirements) }}
                  />
                </>
              )}
            </section>

            <section className="rounded-2xl bg-white p-5 sm:p-7 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Eligibility at a glance</h2>
              <dl className="grid gap-5 sm:grid-cols-2">
                <Chips label="Fields of study" items={scholarship.field_of_study} />
                <Chips label="Funding" items={scholarship.fund_type} />
                <Chips label="Sponsor" items={scholarship.sponsor_type} />
                <Chips label="Selection" items={scholarship.scholarship_category} />
                <Chips label="Language tests" items={scholarship.language_requirement} />
              </dl>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <div className="hidden lg:block rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <p className="text-sm text-gray-500">Deadline</p>
              <p className="text-xl font-bold text-gray-900">{formatDate(scholarship.deadline)}</p>
              <p className={`text-sm font-medium ${closed ? 'text-red-600' : left <= 30 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {deadlineHint}
              </p>
              <div className="mt-5 space-y-3">
                {applyButton}
                <div className="grid grid-cols-2 gap-3">
                  {saveButton}
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <ShareIcon className="h-5 w-5" /> {shareNote || 'Share'}
                  </button>
                </div>
              </div>
              {!isAuthenticated && (
                <p className="mt-4 text-xs text-gray-500">
                  <Link href={loginHref()} className="font-medium text-blue-600 hover:underline">
                    Log in
                  </Link>{' '}
                  to save scholarships and track your applications.
                </p>
              )}
              <p className="mt-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
                Details change every year. Always confirm the deadline and eligibility on the official website.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <h2 className="font-semibold text-gray-900 mb-3">Similar scholarships</h2>
              <RelatedScholarships scholarship={scholarship} />
              <Link
                href="/scholarships/search"
                className="mt-4 block border-t border-gray-100 pt-4 text-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Browse all scholarships →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile action bar */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-3">
          <div className="flex-1">{applyButton}</div>
          {saveButton}
          <button
            onClick={handleShare}
            aria-label="Share"
            className="rounded-xl border border-gray-300 bg-white p-3 text-gray-700 hover:bg-gray-50"
          >
            <ShareIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ScholarshipDetails = () => (
  <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
    <ScholarshipDetailsContent />
  </Suspense>
);

export default ScholarshipDetails;
