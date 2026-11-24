import type { Scholarship } from '@/types/scholarship';
import type { LandingPage } from './landingPages';
import { isClosed } from './seo';

const byDeadline = (a: Scholarship, b: Scholarship) => a.deadline.localeCompare(b.deadline);

// Open scholarships first (soonest deadline first), then closed ones (most recently closed first)
const openThenClosed = (a: Scholarship, b: Scholarship) => {
  const ca = isClosed(a);
  const cb = isClosed(b);
  if (ca !== cb) return ca ? 1 : -1;
  return ca ? -byDeadline(a, b) : byDeadline(a, b);
};

export const landingScholarships = (landing: LandingPage, all: Scholarship[]) =>
  all
    .map((s) => ({ s, score: landing.match(s) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || openThenClosed(a.s, b.s))
    .map((x) => x.s);

// Open scholarships, rotated by the page's id so different pages link to different scholarships
// (spreads internal links across the whole catalogue instead of always the same few)
const pickOpen = (list: Scholarship[], seed: number) => {
  const open = list.filter((o) => !isClosed(o)).sort(byDeadline);
  const closed = list.filter((o) => isClosed(o));
  const start = open.length ? seed % open.length : 0;
  return [...open.slice(start), ...open.slice(0, start), ...closed];
};

/** 5–8 similar scholarships: same country first, then same study level */
export const relatedScholarships = (s: Scholarship, all: Scholarship[], limit = 6) => {
  const levels = new Set(s.levels.map((l) => l.name));
  const others = all.filter((o) => o.id !== s.id);
  const sameCountry = pickOpen(others.filter((o) => o.country_name === s.country_name), s.id);
  const sameLevel = pickOpen(
    others.filter((o) => o.country_name !== s.country_name && o.levels.some((l) => levels.has(l.name))),
    s.id
  );
  // Mostly same country, but keep a couple of other-country links so the graph spreads out
  const fromCountry = sameCountry.slice(0, Math.max(limit - 2, limit - sameLevel.length));
  return [...fromCountry, ...sameLevel].slice(0, limit);
};
