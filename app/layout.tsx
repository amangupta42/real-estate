import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { WhatsAppButton } from '@/components/molecules/WhatsAppButton'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: {
    default: 'Real Estate - Premium Land Development',
    template: '%s | Real Estate',
  },
  description: 'Discover premium land development opportunities in Nashik and surrounding areas',
  keywords: ['real estate', 'land development', 'property', 'investment', 'Nashik'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
