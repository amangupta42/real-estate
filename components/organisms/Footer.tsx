import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { MapPin, Phone, Mail } from 'lucide-react'

const navigation = {
  company: [
    { name: 'About Us', href: '/legacy' },
    { name: 'Our Projects', href: '/projects' },
    { name: 'Nashik Advantage', href: '/nashik-advantage' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'RERA Compliance', href: '/rera' },
  ],
  contact: [
    { name: 'Nashik, Maharashtra, India', icon: MapPin },
    { name: '+91 XXXXX XXXXX', icon: Phone },
    { name: 'info@realestate.com', icon: Mail },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-serif text-2xl font-bold text-primary">RealEstate</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Premium land development opportunities in Nashik and surrounding areas. Building
                dreams, creating communities.
              </p>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Legal</h3>
              <ul className="space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Contact</h3>
              <ul className="space-y-3">
                {navigation.contact.map((item) => (
                  <li key={item.name} className="flex items-start gap-2">
                    <item.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} RealEstate. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
