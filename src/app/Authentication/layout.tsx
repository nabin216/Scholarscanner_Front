"use client";

import React from 'react';

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-blue-700">Scholarship Portal</h1>
        </div>
      </header> */}
      
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
      
      {/* <footer className="bg-white py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Scholarship Portal. All rights reserved.
        </div>
      </footer> */}
    </div>
  );
}
