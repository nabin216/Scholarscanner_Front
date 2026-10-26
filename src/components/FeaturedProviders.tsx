'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './scrollbar-hide.css';

interface FeaturedScholarship {
  id: number;
  slug: string;
  title: string;
  image?: string;
  provider?: string;
  deadline?: string;
  country_name?: string;
  fund_type?: { id: number; name: string }[];
}

const DEFAULT_IMAGE = '/images/providers/scholarship-default.jpg';
const SHOWN = 20;

const formatDeadline = (date?: string) =>
  date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

const FeaturedProviders = () => {
  const [scholarships, setScholarships] = useState<FeaturedScholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Featured scholarships still open, soonest deadline first
        const today = new Date().toISOString().slice(0, 10);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/scholarships/?is_featured=true&deadline_after=${today}&ordering=deadline&page_size=${SHOWN}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch featured scholarships: ${response.status}`);
        }
        const data = await response.json();
        setScholarships(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error('Error fetching featured scholarships:', err);
        setError('Could not load featured scholarships right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (error) {
    return <p className="text-gray-500">{error}</p>;
  }

  if (!loading && scholarships.length === 0) {
    return <p className="text-gray-500">No featured scholarships available yet.</p>;
  }

  return (
    <div>
      {/* 2 per row on phones, 3 on tablets, 5 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4" aria-label="Featured scholarships">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="rounded-xl bg-white shadow-sm overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-gray-200" />
                <div className="p-3 sm:p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded" />
                </div>
              </div>
            ))
          : scholarships.map((scholarship) => {
              const fullyFunded = scholarship.fund_type?.some((f) => f.name === 'Full Funding');
              return (
                <Link
                  key={scholarship.id}
                  href={`/scholarships/scholarshipdetails?id=${scholarship.slug}`}
                  className="group flex flex-col rounded-xl bg-white shadow-sm ring-1 ring-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <img
                      src={scholarship.image || DEFAULT_IMAGE}
                      alt={scholarship.title}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_IMAGE;
                      }}
                    />
                    {fullyFunded && (
                      <span className="absolute top-2 left-2 rounded-full bg-emerald-600/90 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-white">
                        Fully funded
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-700">
                      {scholarship.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 truncate">{scholarship.country_name || 'International'}</p>
                    <div className="mt-auto pt-2 sm:pt-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs">
                      {scholarship.deadline && (
                        <span className="text-gray-600">
                          Deadline <span className="font-medium text-gray-900">{formatDeadline(scholarship.deadline)}</span>
                        </span>
                      )}
                      <span className="hidden sm:inline font-medium text-blue-600">View →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>

      {!loading && (
        <div className="mt-8 text-center">
          <Link
            href="/scholarships/search"
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            See more scholarships
          </Link>
        </div>
      )}
    </div>
  );
};

export default FeaturedProviders;
