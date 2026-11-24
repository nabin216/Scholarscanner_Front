import type { Scholarship } from '@/types/scholarship';
import { htmlToText } from './sanitizeHtml';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarscanner.com').replace(/\/$/, '');
export const SITE_NAME = 'ScholarScanner';

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
export const scholarshipPath = (slug: string) => `/scholarships/${slug}/`;

const COUNTRY_SHORT: Record<string, string> = {
  'United Kingdom': 'UK',
  'United States': 'USA',
  'United Arab Emirates': 'UAE',
};
export const shortCountry = (country: string) => COUNTRY_SHORT[country] || country;

const LEVEL_ORDER = ['Bachelor', 'Master', 'PhD'];
const LEVEL_LABEL: Record<string, string> = { Bachelor: "Bachelor's", Master: "Master's", PhD: 'PhD' };

export const levelLabels = (s: Scholarship) =>
  [...(s.levels || [])]
    .sort((a, b) => LEVEL_ORDER.indexOf(a.name) - LEVEL_ORDER.indexOf(b.name))
    .map((l) => LEVEL_LABEL[l.name] || l.name);

export const isFullyFunded = (s: Scholarship) => s.fund_type?.some((f) => f.name === 'Full Funding');
export const isPartiallyFunded = (s: Scholarship) => s.fund_type?.some((f) => f.name === 'Partial Funding');
export const fundingLabel = (s: Scholarship) =>
  isFullyFunded(s) ? 'Fully Funded' : isPartiallyFunded(s) ? 'Partially Funded' : '';

export const formatDate = (date: string, month: 'short' | 'long' = 'long') =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', { year: 'numeric', month, day: 'numeric', timeZone: 'UTC' });

export const formatMonthYear = (date: Date) =>
  date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export const formatAmount = (amount: string) => {
  const value = Number(amount);
  return value > 0 ? `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : null;
};

// The site is rebuilt every day, so "today" at build time is accurate to within a day
export const isClosed = (s: Scholarship, now = new Date()) => {
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return new Date(`${s.deadline}T00:00:00Z`) < today;
};

// Most scholarships run once a year, so the next round usually closes about a year after the last one
export const nextRoundDate = (s: Scholarship) => {
  const d = new Date(`${s.deadline}T00:00:00Z`);
  d.setUTCFullYear(d.getUTCFullYear() + 1);
  return d;
};

const truncateWords = (text: string, max: number) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:–-]+$/, '')}…`;
};

/** e.g. "Gates Cambridge Scholarship 2026 – Fully Funded Master's/PhD Scholarship in UK" */
export const scholarshipTitle = (s: Scholarship) => {
  const brand = ` | ${SITE_NAME}`;
  const closed = isClosed(s);
  const year = closed ? nextRoundDate(s).getUTCFullYear() : new Date(`${s.deadline}T00:00:00Z`).getUTCFullYear();
  const name = /\b20\d\d\b/.test(s.title) ? s.title : `${s.title} ${year}`;
  const funding = fundingLabel(s);
  const levels = levelLabels(s).join('/');
  const country = shortCountry(s.country_name);

  const fundLevels = [funding, levels].filter(Boolean).join(' ');
  const candidates = [
    `${name} – ${fundLevels} Scholarship in ${country}`,
    `${name} – ${fundLevels} in ${country}`,
    funding ? `${name} – ${funding} Scholarship in ${country}` : '',
    funding ? `${name} – ${funding}, ${country}` : '',
    `${name} – ${levels} Scholarship in ${country}`,
    `${name} – ${country}`,
    name,
  ].filter(Boolean);

  // Google shows roughly 60 characters; allow a little more so the funding type usually survives
  const fit = candidates.find((c) => (c + brand).length <= 70);
  // Very long names: keep the whole name (titles must stay unique; Google trims the display itself)
  return fit ? fit + brand : name;
};

/** One sentence built from the data, aiming for 140–160 characters */
export const scholarshipDescription = (s: Scholarship) => {
  const funding = fundingLabel(s).toLowerCase();
  const levels = levelLabels(s).map((l) => (l === 'PhD' ? l : l.toLowerCase())).join(' and ');
  const lead = `${funding ? `${funding[0].toUpperCase()}${funding.slice(1)} ` : ''}${levels ? `${levels} ` : ''}scholarship in ${shortCountry(s.country_name)}`;
  const Lead = lead[0].toUpperCase() + lead.slice(1);
  const tail = isClosed(s)
    ? `Next round expected ${formatMonthYear(nextRoundDate(s))}.`
    : `Deadline ${formatDate(s.deadline)}.`;
  let sentence = (htmlToText(s.description).split(/(?<=[.!?])\s/)[0] || '').trim();
  if (sentence && !/[.!?]$/.test(sentence)) sentence += '.';
  const provider = s.provider ? ` from ${s.provider}` : '';

  const join = (...parts: string[]) => parts.filter(Boolean).join(' ');
  const options = [
    join(`${Lead}${provider}.`, sentence, tail),
    join(sentence, tail),
    join(`${Lead}.`, sentence, tail),
  ];
  const fit = options.find((o) => o.length <= 160 && o.length >= 110);
  if (fit) return fit;

  // Nothing fits whole: shorten the description sentence
  const base = `${Lead}${provider}.`.length + tail.length + 2 <= 120 ? `${Lead}${provider}.` : `${Lead}.`;
  const room = 160 - base.length - tail.length - 2;
  return room > 30 && sentence ? join(base, truncateWords(sentence, room), tail) : truncateWords(join(base, tail), 160);
};

export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') });

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
