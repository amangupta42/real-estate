import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { WhatsAppButton } from '@/components/molecules/WhatsAppButton'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'Ajit J Gupta and Associates - Premium Land Development',
    template: '%s | Ajit J Gupta and Associates',
  },
  description:
    'Discover premium RERA-certified land development opportunities in Nashik with 7.2% ROI. Prime residential and commercial plots near Mumbai-Nagpur Expressway with complete infrastructure and flexible payment plans.',
  keywords: [
    'Ajit J Gupta and Associates',
    'Land Development Nashik',
    'RERA Certified Plots',
    'Real Estate Investment',
    'Nashik Property',
    'Mumbai-Nagpur Expressway',
    'Residential Plots',
    'Commercial Land',
  ],
  openGraph: {
    title: 'Ajit J Gupta and Associates - Premium Land Development in Nashik',
    description:
      'Discover premium RERA-certified land development opportunities in Nashik with 7.2% ROI. Prime locations, complete infrastructure, flexible payment plans.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://ajitjgupta.com',
    siteName: 'Ajit J Gupta and Associates',
    images: [
      {
        url: '/og-image-template.svg',
        width: 1200,
        height: 630,
        alt: 'Ajit J Gupta and Associates - Premium Land Development in Nashik',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajit J Gupta and Associates - Premium Land Development',
    description:
      'Premium RERA-certified land development in Nashik. 7.2% ROI, prime locations, complete infrastructure.',
    images: ['/og-image-template.svg'],
  },
  alternates: {
    canonical: 'https://ajitjgupta.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://ajitjgupta.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
