import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';
import { AuthProvider } from './Authentication/context/AuthContext';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarscanner.com';
// Google AdSense publisher id, e.g. ca-pub-1234567890123456 (set in the deploy workflow).
// The workflow passes an empty string until it is configured; treat that as "not set".
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || null;

const DESCRIPTION =
  'Find fully funded and partial scholarships for bachelor’s, master’s and PhD study abroad. Search prestigious government, university and foundation scholarships by country, level and field, with deadlines and official links.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ScholarScanner - Find Fully Funded Scholarships Worldwide',
    template: '%s | ScholarScanner',
  },
  description: DESCRIPTION,
  keywords: [
    'scholarships',
    'fully funded scholarships',
    'study abroad scholarships',
    'international scholarships',
    "master's scholarships",
    'PhD scholarships',
    'undergraduate scholarships',
    'Chevening',
    'DAAD',
    'Erasmus Mundus',
  ],
  applicationName: 'ScholarScanner',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'ScholarScanner - Find Fully Funded Scholarships Worldwide',
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'ScholarScanner',
    type: 'website',
    images: ['/android-chrome-512x512.png'],
  },
  twitter: {
    card: 'summary',
    title: 'ScholarScanner - Find Fully Funded Scholarships Worldwide',
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  ...(ADSENSE_CLIENT ? { other: { 'google-adsense-account': ADSENSE_CLIENT } } : {}),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {ADSENSE_CLIENT ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
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
