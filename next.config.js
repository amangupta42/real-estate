const withNextIntl = require('next-intl/plugin')('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  // Vercel optimizations
  poweredByHeader: false,
  compress: true,
  // Production optimizations
  productionBrowserSourceMaps: false,
  swcMinify: true,
}

module.exports = withNextIntl(nextConfig)
