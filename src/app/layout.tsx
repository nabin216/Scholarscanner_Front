import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';
import { AuthProvider } from './Authentication/context/AuthContext';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarscanner.com';
// Google AdSense publisher id; the deploy workflow can override it (an empty value falls back to this one).
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-3332315663614383';

const DESCRIPTION =
  'ScholarScanner, the scholarship scanner for international students: search 1,000+ fully funded and partial bachelor’s, master’s and PhD scholarships abroad.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ScholarScanner (Scholarship Scanner) – Find Fully Funded Scholarships',
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
    title: 'ScholarScanner (Scholarship Scanner) – Find Fully Funded Scholarships',
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'ScholarScanner',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ScholarScanner – find fully funded scholarships worldwide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScholarScanner (Scholarship Scanner) – Find Fully Funded Scholarships',
    images: ['/og-image.png'],
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
