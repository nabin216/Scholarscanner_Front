// Landing pages served at /scholarships/<slug>/ (content lives in landingPages.ts).
// Kept in its own tiny module so client components can import it without the page text.
export const LANDING_LINKS = [
  { slug: 'uk', label: 'Scholarships in the UK' },
  { slug: 'usa', label: 'Scholarships in the USA' },
  { slug: 'fully-funded', label: 'Fully funded scholarships' },
  { slug: 'masters', label: "Master's scholarships" },
  { slug: 'phd', label: 'PhD scholarships' },
  { slug: 'bachelors', label: 'Undergraduate scholarships' },
  { slug: 'engineering', label: 'Engineering scholarships' },
  { slug: 'no-ielts', label: 'Scholarships without IELTS' },
  { slug: 'for-bangladeshi-students', label: 'For Bangladeshi students' },
  { slug: 'for-indian-students', label: 'For Indian students' },
  { slug: 'for-pakistani-students', label: 'For Pakistani students' },
  { slug: 'for-malaysian-students', label: 'For Malaysian students' },
] as const;

export const LANDING_SLUGS: string[] = LANDING_LINKS.map((l) => l.slug);
export const isLandingSlug = (slug: string) => LANDING_SLUGS.includes(slug);
