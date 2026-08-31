import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';
import { AuthProvider } from './Authentication/context/AuthContext';

export const metadata: Metadata = {
  title: 'Scholar Scanner - Find Your Perfect Scholarship',
  description: 'Discover thousands of scholarships tailored to your profile. Our AI-powered platform makes finding and applying for scholarships easier than ever.',
  keywords: 'scholarships, education, financial aid, college funding, university scholarships, scholar scanner',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Scholar Scanner - Find Your Perfect Scholarship',
    description: 'Discover thousands of scholarships tailored to your profile',
    type: 'website',
    images: ['/android-chrome-512x512.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AIAssistant />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}