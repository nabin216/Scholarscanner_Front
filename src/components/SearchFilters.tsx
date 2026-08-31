import React from 'react';

const SearchFilters: React.FC = () => {
    return (
        <div className="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Filter Scholarships</h2>
            <div className="flex flex-col">
                <label htmlFor="keyword" className="text-sm font-medium">Keyword</label>
                <input type="text" id="keyword" className="p-2 border border-gray-300 rounded" placeholder="Enter keywords..." />
            </div>
            <div className="flex flex-col">
                <label htmlFor="amount" className="text-sm font-medium">Amount</label>
                <input type="number" id="amount" className="p-2 border border-gray-300 rounded" placeholder="Maximum amount..." />
            </div>
            <div className="flex flex-col">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <select id="category" className="p-2 border border-gray-300 rounded">
                    <option value="">Select a category</option>
                    <option value="merit">Merit-based</option>
                    <option value="need">Need-based</option>
                    <option value="athletic">Athletic</option>
                    <option value="art">Art</option>
                </select>
            </div>
            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Search</button>
        </div>
    );
};

export default SearchFilters;