import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { MapPin, Phone, Mail } from 'lucide-react'

const navigation = {
  company: [
    { name: 'About Us', href: '/legacy' },
    { name: 'Our Projects', href: '/projects' },
    { name: 'Nashik Advantage', href: '/nashik-advantage' },
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'RERA Compliance', href: '/rera' },
  ],
  contact: [
    { name: 'Nashik, Maharashtra, India', icon: MapPin },
    { name: '+91 9371410666', icon: Phone },
    { name: 'info@ajitjgupta.com', icon: Mail },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <Container>
        <div className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
            {/* Brand */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="inline-flex items-center gap-3 group">
                {/* Text */}
                <div className="flex flex-col">
                  <span className="font-heading text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    Ajit J Gupta
                  </span>
                  <span className="text-xs font-medium tracking-wider text-muted-foreground/60 group-hover:text-primary/70 transition-colors duration-300">
                    and Associates
                  </span>
                </div>
              </Link>
              <p className="text-base leading-relaxed text-muted-foreground max-w-md">
                Premium land development opportunities in Nashik and surrounding areas. Building
                dreams, creating communities.
              </p>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="mb-6 text-sm font-heading font-semibold text-foreground uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="mb-6 text-sm font-heading font-semibold text-foreground uppercase tracking-wider">
                Legal
              </h3>
              <ul className="space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Section - Full Width */}
          <div className="mt-16 pt-12 border-t border-border/50">
            <h3 className="mb-6 text-sm font-heading font-semibold text-foreground uppercase tracking-wider">
              Contact
            </h3>
            <div className="grid gap-6 sm:grid-cols-3 max-w-3xl">
              {navigation.contact.map((item) => (
                <div key={item.name} className="flex items-start gap-3">
                  <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary/60" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border/50">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Ajit J Gupta and Associates. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
