import React from 'react';
import type { Metadata } from 'next';

// Login, register and password pages: crawlable (not blocked in robots.txt) but never indexed
export const metadata: Metadata = {
  title: 'Account',
  robots: { index: false, follow: true },
};

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
