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
  description: 'Discover premium land development opportunities in Nashik and surrounding areas',
  keywords: [
    'Ajit J Gupta and Associates',
    'Land Development',
    'Property',
    'Investment',
    'Nashik',
    'RERA',
  ],
  openGraph: {
    title: 'Ajit J Gupta and Associates - Premium Land Development',
    description: 'Discover premium land development opportunities in Nashik and surrounding areas',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: {
    canonical: 'https://ajitjgupta.com',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
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
