/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repoName = 'scholarship-portal'

// Use custom domain detection: if NEXT_PUBLIC_SITE_URL is set, assume custom domain
const useCustomDomain = process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('github.io')

const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static HTML export for GitHub Pages
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'http',
        hostname: '13.61.181.192',
      },
      {
        protocol: 'http',
        hostname: '13.62.43.154',
      },
    ],
    unoptimized: true // Required for static export
  },
  // Base path: use repo name for GitHub Pages, empty for custom domain
  basePath: (isProd && !useCustomDomain) ? `/${repoName}` : '',
  // Asset prefix: match basePath behavior
  assetPrefix: (isProd && !useCustomDomain) ? `/${repoName}/` : '',
  trailingSlash: true, // Required for GitHub Pages
};

module.exports = nextConfig;