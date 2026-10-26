import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us',
  description:
    'ScholarScanner is a free scholarship search platform that helps students find fully funded and partial scholarships from governments, universities and foundations worldwide.',
};

const principles = [
  {
    title: 'Official sources first',
    text: 'Every scholarship links to the official provider. We summarise the key facts, but you always apply on the provider’s own website, never through us.',
  },
  {
    title: 'Free for students',
    text: 'Searching, saving scholarships and using the AI assistant are free. We are supported by advertising, and ads never change which scholarships we list.',
  },
  {
    title: 'Clear, comparable facts',
    text: 'Deadline, approximate value, study level, eligible fields, funding type and language tests are shown in the same format for every scholarship, so you can compare quickly.',
  },
  {
    title: 'Honest about uncertainty',
    text: 'Deadlines and amounts change every cycle. We show our best estimate of the next deadline and remind you to confirm details with the provider before applying.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">About ScholarScanner</h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            ScholarScanner helps students around the world find scholarships for undergraduate, master&apos;s and PhD
            study abroad. We bring prestigious, mostly fully funded opportunities from governments, universities and
            foundations into one searchable place, so you spend less time hunting and more time preparing strong
            applications.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Why we built it</h2>
          <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Scholarship information is scattered across hundreds of government portals, university pages and
              foundation websites, each with its own format and calendar. Talented students often miss deadlines simply
              because they never heard about an opportunity in time, or give up because comparing them is so hard.
            </p>
            <p>
              ScholarScanner fixes that with a single database you can filter by host country, study level, field of
              study and funding type, plus an AI assistant that can answer questions like &ldquo;fully funded
              master&apos;s scholarships in Europe closing this year&rdquo; in plain language.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">What we cover</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-gray-700">
            <li className="rounded-xl bg-white p-4 ring-1 ring-gray-100">
              <strong className="text-gray-900">Government scholarships</strong> such as Chevening, Fulbright, DAAD,
              MEXT, Global Korea, Türkiye Burslari and Stipendium Hungaricum.
            </li>
            <li className="rounded-xl bg-white p-4 ring-1 ring-gray-100">
              <strong className="text-gray-900">University awards</strong> from institutions including Oxford,
              Cambridge, Stanford, ETH Zurich, TU Delft and the National University of Singapore.
            </li>
            <li className="rounded-xl bg-white p-4 ring-1 ring-gray-100">
              <strong className="text-gray-900">Foundation programmes</strong> such as Rhodes, Gates Cambridge,
              Mastercard Foundation and Schwarzman Scholars.
            </li>
            <li className="rounded-xl bg-white p-4 ring-1 ring-gray-100">
              <strong className="text-gray-900">Research funding</strong> for PhD candidates, including Marie
              Skłodowska-Curie Doctoral Networks and the Hong Kong PhD Fellowship Scheme.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">How we work</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="rounded-xl bg-white p-5 ring-1 ring-gray-100">
                <h3 className="font-semibold text-gray-900">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-blue-600 p-6 sm:p-8 text-white">
          <h2 className="text-2xl font-semibold">Found an error or a scholarship we should add?</h2>
          <p className="mt-2 text-blue-100">
            We review every message. Tell us about outdated details or new opportunities and we will update the listing.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link href="/get-in-touch" className="rounded-lg bg-white px-5 py-2.5 text-center font-semibold text-blue-700 hover:bg-blue-50">
              Contact us
            </Link>
            <Link href="/scholarships/search" className="rounded-lg border border-white/70 px-5 py-2.5 text-center font-semibold text-white hover:bg-white/10">
              Browse scholarships
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
