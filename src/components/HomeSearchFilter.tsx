"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { FilterOptions } from '../types/filterOptions';

const HomeSearchFilter = () => {
    const router = useRouter();
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
    const [filterOptionsLoading, setFilterOptionsLoading] = useState(true);
    const [filterValues, setFilterValues] = useState({
        level: '',
        country: '',
        field: '',
        deadline: ''
    });    // Fetch filter options from backend
    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                setFilterOptionsLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scholarships/filter-options/`);
                
                if (!response.ok) {
                    if (response.status === 429) {
                        console.warn('Rate limit exceeded. Using fallback filter options.');
                        // Set basic fallback options for filters
                        setFilterOptions({
                            levels: [
                                { id: 1, name: 'Bachelor' },
                                { id: 2, name: 'Master' },
                                { id: 3, name: 'PhD' },
                                { id: 4, name: 'Postdoc' }
                            ],
                            countries: [
                                { id: 1, name: 'Canada' },
                                { id: 2, name: 'USA' },
                                { id: 3, name: 'UK' },
                                { id: 4, name: 'Australia' },
                                { id: 5, name: 'Germany' }
                            ],
                            fields_of_study: [
                                { id: 1, name: 'Engineering' },
                                { id: 2, name: 'Computer Science' },
                                { id: 3, name: 'Business' },
                                { id: 4, name: 'Medicine' },
                                { id: 5, name: 'Arts' }
                            ],
                            fund_types: [
                                { id: 1, name: 'Full Funding' },
                                { id: 2, name: 'Partial Funding' },
                                { id: 3, name: 'Tuition Only' }
                            ],
                            categories: [
                                { id: 1, name: 'Merit-based' },
                                { id: 2, name: 'Need-based' },
                                { id: 3, name: 'Research' }
                            ]
                        });
                        return;
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setFilterOptions(data);
                
            } catch (error) {
                console.error('Error fetching filter options:', error);
                // Set basic fallback options on any error
                setFilterOptions({
                    levels: [
                        { id: 1, name: 'Bachelor' },
                        { id: 2, name: 'Master' },
                        { id: 3, name: 'PhD' },
                        { id: 4, name: 'Postdoc' }
                    ],
                    countries: [
                        { id: 1, name: 'Canada' },
                        { id: 2, name: 'USA' },
                        { id: 3, name: 'UK' },
                        { id: 4, name: 'Australia' },
                        { id: 5, name: 'Germany' }
                    ],
                    fields_of_study: [
                        { id: 1, name: 'Engineering' },
                        { id: 2, name: 'Computer Science' },
                        { id: 3, name: 'Business' },
                        { id: 4, name: 'Medicine' },
                        { id: 5, name: 'Arts' }
                    ],
                    fund_types: [
                        { id: 1, name: 'Full Funding' },
                        { id: 2, name: 'Partial Funding' },
                        { id: 3, name: 'Tuition Only' }
                    ],
                    categories: [
                        { id: 1, name: 'Merit-based' },
                        { id: 2, name: 'Need-based' },
                        { id: 3, name: 'Research' }
                    ]
                });
            } finally {
                setFilterOptionsLoading(false);
            }
        };

        fetchFilterOptions();
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilterValues(prev => ({ ...prev, [name]: value }));
    };    const handleArrowClick = () => {
        // Build query parameters from filter values
        const queryParams = new URLSearchParams();
        
        // Map home filter names to search page filter names
        const filterMapping = {
            level: 'levels',
            country: 'country',
            field: 'field_of_study',
            deadline: 'deadline_before'
        };
        
        // Only add parameters that have values
        Object.entries(filterValues).forEach(([key, value]) => {
            if (value) {
                const mappedKey = filterMapping[key as keyof typeof filterMapping];
                if (mappedKey) {
                    queryParams.append(mappedKey, value);
                }
            }
        });

        // Navigate to the scholarships search page with filters
        router.push(`/scholarships/search?${queryParams.toString()}`);
    };

    return (
        <div className="bg-[#E8EEF7] rounded-2xl md:rounded-full shadow-md flex flex-col md:flex-row md:items-center p-2 md:p-0">
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-px md:gap-0 md:divide-x divide-gray-200">                <div className="px-3 py-2 md:px-6 md:py-3 min-w-0">
                    <div className="text-sm font-medium text-gray-700 mb-1">Level</div>                    <select 
                        name="level"
                        value={filterValues.level}
                        onChange={handleFilterChange}
                        className="w-full bg-transparent text-gray-500 border-none focus:ring-0 text-sm py-1"
                        disabled={filterOptionsLoading}
                    >
                        <option value="">Select Level</option>
                        {filterOptions?.levels.map((level) => (
                            <option key={level.id} value={level.name}>
                                {level.name}
                            </option>
                        ))}
                    </select>
                </div>                <div className="px-3 py-2 md:px-6 md:py-3 min-w-0">
                    <div className="text-sm font-medium text-gray-700 mb-1">Country</div>                    <select 
                        name="country"
                        value={filterValues.country}
                        onChange={handleFilterChange}
                        className="w-full bg-transparent text-gray-500 border-none focus:ring-0 text-sm py-1"
                        disabled={filterOptionsLoading}
                    >
                        <option value="">Select Country</option>
                        {filterOptions?.countries.map((country) => (
                            <option key={country.id} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>                <div className="px-3 py-2 md:px-6 md:py-3 min-w-0">
                    <div className="text-sm font-medium text-gray-700 mb-1">Field</div>                    <select 
                        name="field"
                        value={filterValues.field}
                        onChange={handleFilterChange}
                        className="w-full bg-transparent text-gray-500 border-none focus:ring-0 text-sm py-1"
                        disabled={filterOptionsLoading}
                    >
                        <option value="">Select field</option>
                        {filterOptions?.fields_of_study.map((field) => (
                            <option key={field.id} value={field.name}>
                                {field.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="px-3 py-2 md:px-6 md:py-3 min-w-0">
                    <div className="text-sm font-medium text-gray-700 mb-1">Deadline</div>
                    <input 
                        type="date" 
                        name="deadline"
                        value={filterValues.deadline}
                        onChange={handleFilterChange}
                        className="w-full bg-transparent text-gray-500 border-none focus:ring-0 text-sm py-1"
                    />
                </div>
            </div>
            <div className="md:px-2">
                <button 
                    onClick={handleArrowClick}
                    aria-label="Search scholarships"
                    className="bg-[#FFE814] hover:bg-[#FFE200] text-black rounded-xl md:rounded-full h-12 w-full md:w-12 mt-2 md:mt-0 flex items-center justify-center gap-2 font-semibold transition-colors"
                >
                    <span className="md:hidden">Search scholarships</span>
                    <ArrowRightIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default HomeSearchFilter;
