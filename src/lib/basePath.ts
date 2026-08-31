// Base path helper for assets served from the public/ folder
// In production (GitHub Pages), assets are served under the repository subpath
// For custom domains, no basePath is needed
// In development, basePath is empty

const isProd = process.env.NODE_ENV === 'production'
const useCustomDomain = process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('github.io')
const basePath = (isProd && !useCustomDomain) ? '/scholarship-portal' : ''

export default basePath
