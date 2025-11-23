/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Vercel optimizations
  poweredByHeader: false,
  compress: true,
  // Production optimizations
  productionBrowserSourceMaps: false,
  swcMinify: true,
  // Exclude studio directory from Next.js compilation
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/studio/**', '**/sanity/**', '**/node_modules/**'],
    }
    return config
  },
}

module.exports = nextConfig
