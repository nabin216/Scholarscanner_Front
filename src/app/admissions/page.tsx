import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'How to Apply for Scholarships: Timeline, Documents and Tips',
  description:
    'A step-by-step guide to applying for international scholarships: when to start, which documents you need, how to write a motivation letter and how to prepare for interviews.',
};

const timeline = [
  {
    when: '12–18 months before you start',
    title: 'Research and shortlist',
    points: [
      'Decide your study level, field and preferred countries.',
      'Shortlist 8–15 scholarships whose eligibility you clearly meet (nationality, age, degree, work experience).',
      'Note every deadline. Many major awards (Chevening, Rhodes, Knight-Hennessy, Marshall) close 9–12 months before the course begins.',
    ],
  },
  {
    when: '9–12 months before',
    title: 'Prepare tests and documents',
    points: [
      'Book IELTS/TOEFL (or the required language test) early enough to retake it if needed.',
      'Request official transcripts and degree certificates, with certified translations if they are not in English.',
      'Ask two or three referees for recommendation letters and give them at least four weeks.',
    ],
  },
  {
    when: '6–9 months before',
    title: 'Apply to universities and scholarships',
    points: [
      'Many scholarships require an offer, or a submitted application, to the university first. Check the order carefully.',
      'Tailor every essay to the specific scholarship’s mission rather than reusing one generic letter.',
      'Submit a few days before the deadline to avoid portal outages and time-zone mistakes.',
    ],
  },
  {
    when: '3–6 months before',
    title: 'Interviews and decisions',
    points: [
      'Shortlisted candidates are often interviewed. Practise answering questions about your goals, leadership and plans to return home.',
      'Compare offers: tuition coverage, stipend, travel, health insurance and any return-home conditions.',
      'Once you accept, start your visa application immediately; it can take several weeks.',
    ],
  },
];

const documents = [
  ['Passport', 'Valid for the whole study period; some portals ask for it at application stage.'],
  ['Academic transcripts', 'Official records for every degree, often with a grading-scale explanation.'],
  ['Degree certificates', 'Or a letter confirming your expected graduation date.'],
  ['CV / résumé', 'Two pages, focused on academic results, leadership, research and impact.'],
  ['Motivation letter or essays', 'Why this field, why this country, and how you will use the degree.'],
  ['Recommendation letters', 'Usually two or three, from academic supervisors or employers who know you well.'],
  ['Language test results', 'IELTS, TOEFL, or the host country’s language test where required.'],
  ['Research proposal', 'For PhD and research awards: question, methods, timeline and fit with a supervisor.'],
];

const tips = [
  {
    title: 'Answer the question that was asked',
    text: 'Scholarship committees read hundreds of essays. Mirror their criteria (leadership, networking, academic excellence, development impact) and give one concrete example for each.',
  },
  {
    title: 'Show impact, not just activities',
    text: 'Instead of “I volunteered at an NGO”, write what changed because of you: how many people, what result, what you learned.',
  },
  {
    title: 'Connect your past, the course and your future',
    text: 'The strongest applications tell one clear story: what you have done, why this specific programme is the next step, and what you will do afterwards.',
  },
  {
    title: 'Choose referees who know your work',
    text: 'A detailed letter from a lecturer who supervised your project beats a generic one from a famous name.',
  },
  {
    title: 'Check eligibility twice',
    text: 'Nationality lists, age limits, minimum work experience and degree classifications are strict. Applications that miss a rule are rejected without being read.',
  },
  {
    title: 'Beware of scams',
    text: 'Genuine scholarships never ask you to pay an application or “processing” fee to receive an award. Always apply through the official website.',
  },
];

export default function ApplicationGuidePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Application guide</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">How to apply for international scholarships</h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Winning a competitive scholarship is mostly about starting early, applying only where you truly fit, and
            presenting a clear story. This guide walks you through the timeline, the documents you will need, and the
            habits of successful applicants.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Application timeline</h2>
          <ol className="mt-6 space-y-5">
            {timeline.map((step, index) => (
              <li key={step.title} className="relative rounded-2xl bg-white p-5 sm:p-6 ring-1 ring-gray-100">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{step.when}</p>
                    <h3 className="mt-1 text-lg font-semibold text-gray-900">{step.title}</h3>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-gray-700">
                      {step.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Documents checklist</h2>
          <p className="mt-2 text-gray-600">Most international scholarships ask for some or all of the following.</p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {documents.map(([name, detail]) => (
              <div key={name} className="rounded-xl bg-white p-4 ring-1 ring-gray-100">
                <dt className="font-semibold text-gray-900">{name}</dt>
                <dd className="mt-1 text-sm text-gray-600">{detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Tips from successful applicants</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {tips.map((tip) => (
              <div key={tip.title} className="rounded-xl bg-white p-5 ring-1 ring-gray-100">
                <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Fully funded vs. partial scholarships</h2>
          <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>Fully funded</strong> scholarships usually cover tuition, a monthly living stipend, travel and
              health insurance. They are the most competitive. Examples include Chevening, Fulbright, DAAD, Erasmus
              Mundus and most government programmes.
            </p>
            <p>
              <strong>Partial</strong> scholarships cover part of the tuition or give a one-off grant, such as the
              Holland Scholarship or many university merit awards. They are often easier to win and can be combined
              with other funding, so they are worth including in your shortlist.
            </p>
          </div>
        </section>

        <section className="rounded-2xl bg-blue-600 p-6 sm:p-8 text-white">
          <h2 className="text-2xl font-semibold">Ready to build your shortlist?</h2>
          <p className="mt-2 text-blue-100">
            Filter scholarships by country, level and funding, or ask our AI assistant for recommendations.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link href="/scholarships/search" className="rounded-lg bg-white px-5 py-2.5 text-center font-semibold text-blue-700 hover:bg-blue-50">
              Search scholarships
            </Link>
            <Link href="/scholarships/search?fund_type=Full%20Funding" className="rounded-lg border border-white/70 px-5 py-2.5 text-center font-semibold text-white hover:bg-white/10">
              Fully funded only
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
