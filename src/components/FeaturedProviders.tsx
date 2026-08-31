'use client';

import React, { useState, useEffect } from 'react';
import './scrollbar-hide.css';

interface ScholarshipProvider {
  id: number;
  slug: string;
  title: string;
  image?: string;
  country_name?: string;
  country?: {
    name: string;
  };
  country_detail?: {
    name: string;
  };
}

const FeaturedProviders = () => {
  const [providers, setProviders] = useState<ScholarshipProvider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedScholarships = async () => {
      try {
        setLoading(true);
        // Fetch featured scholarships from the backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scholarships/?is_featured=true`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch featured scholarships: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle different response formats - DRF pagination vs. direct array
        const scholarships = Array.isArray(data) ? data : 
                            data.results ? data.results : 
                            [];
                            
        console.log('Fetched scholarships:', scholarships);
        setProviders(scholarships);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured scholarships:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch featured scholarships');
        setLoading(false);
        
        // Use placeholder data in case of error
        // setProviders([
        //   {
        //     id: 1,
        //     title: 'Scholarship Hub',
        //     image: '/images/providers/scholarship-hub.jpg',
        //     country_name: 'Global',
        //   },
        //   {
        //     id: 2,
        //     title: 'Future Leaders Fund',
        //     image: '/images/providers/future-leaders.jpg',
        //     country_name: 'International',
        //   },
        //   {
        //     id: 3,
        //     title: 'Dream Achievers Program',
        //     image: '/images/providers/dream-achievers.jpg',
        //     country_name: 'National',
        //   },
        //   {
        //     id: 4,
        //     title: 'Global Scholars Network',
        //     image: '/images/providers/global-scholars.jpg',
        //     country_name: 'Regional',
        //   },
        //   {
        //     id: 5,
        //     title: 'Opportunity Seekers Club',
        //     image: '/images/providers/opportunity-seekers.jpg',
        //     country_name: 'Local',
        //   },
        // ]);
      }
    };
    
    fetchFeaturedScholarships();
  }, []);
  
  return (
    <div className="w-full">
      {/* Two-row horizontal scroll; shows 5 cards side-by-side on large screens */}
      <div
        className="providers-scroll-grid scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="providers-scroll-card bg-gray-100 p-6 rounded-lg animate-pulse flex flex-col"
            >
              <div className="w-full h-32 bg-gray-200 rounded mb-4 flex-shrink-0"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 w-1/2 bg-gray-200 rounded mb-4 flex-grow"></div>
              <div className="h-4 w-20 bg-gray-200 rounded mt-auto flex-shrink-0"></div>
            </div>
          ))
        ) : error ? (
          <div className="p-4 text-red-600">Error: {error}</div>
        ) : !Array.isArray(providers) || providers.length === 0 ? (
          <div className="p-4 text-gray-500">No featured scholarships available</div>
        ) : (
          providers.map((provider) => (
            <div
              key={provider.id}
              className="providers-scroll-card bg-white p-6 rounded-lg text-center hover:shadow-lg transition-all duration-200 flex flex-col cursor-pointer transform hover:scale-105"
              onClick={() => window.location.href = `/scholarships/scholarshipdetails?id=${provider.slug}`}
            >
              <div className="mb-4 flex-shrink-0">
                <img
                  src={provider.image || '/images/providers/scholarship-default.jpg'}
                  alt={provider.title}
                  className="w-full h-32 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = '/images/providers/scholarship-default.jpg';
                  }}
                />
              </div>
              <div className="flex-grow flex flex-col">
                <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem] leading-tight">
                  {provider.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3 mt-1">{provider.country_name || 'Global'}</p>
              </div>
              <button className="text-sm text-blue-600 hover:underline flex-shrink-0 pointer-events-none">
                View Details →
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedProviders;
