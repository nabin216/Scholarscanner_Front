'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
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

const formatDeadline = (date?: string) =>
  date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

const FeaturedProviders = () => {
  const [scholarships, setScholarships] = useState<FeaturedScholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/scholarships/?is_featured=true&ordering=deadline&page_size=20`
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

  // Show or hide the arrow buttons depending on where the track is scrolled to
  const updateArrows = () => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollLeft(track.scrollLeft > 4);
    setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [scholarships]);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: 'smooth' });
  };

  if (error) {
    return <p className="text-gray-500">{error}</p>;
  }

  if (!loading && scholarships.length === 0) {
    return <p className="text-gray-500">No featured scholarships available yet.</p>;
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="featured-track scrollbar-hide"
        aria-label="Featured scholarships"
      >
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="featured-card rounded-xl bg-white shadow-sm overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-gray-200" />
                <div className="p-4 space-y-2">
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
                  className="featured-card group flex flex-col rounded-xl bg-white shadow-sm ring-1 ring-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
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
                      <span className="absolute top-2 left-2 rounded-full bg-emerald-600/90 px-2.5 py-0.5 text-xs font-semibold text-white">
                        Fully funded
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-700">
                      {scholarship.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">{scholarship.country_name || 'International'}</p>
                    <div className="mt-auto pt-3 flex items-center justify-between text-xs">
                      {scholarship.deadline && (
                        <span className="text-gray-600">
                          Deadline <span className="font-medium text-gray-900">{formatDeadline(scholarship.deadline)}</span>
                        </span>
                      )}
                      <span className="font-medium text-blue-600">View →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>

      {/* Arrow buttons (desktop); on touch screens the track is swiped */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label="Previous scholarships"
          className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gray-200 text-gray-700 hover:bg-gray-50"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label="More scholarships"
          className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gray-200 text-gray-700 hover:bg-gray-50"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default FeaturedProviders;
