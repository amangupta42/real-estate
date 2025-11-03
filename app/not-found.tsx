import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Heading } from '@/components/atomic/Heading'
import { Button } from '@/components/ui/button'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
              <Search className="h-16 w-16 text-primary/60" />
            </div>
          </div>

          {/* Error Code */}
          <div className="mb-4 text-6xl font-heading font-bold text-primary">404</div>

          {/* Heading */}
          <Heading as="h1" level="h2" className="mb-4">
            Page Not Found
          </Heading>

          {/* Description */}
          <p className="mb-8 text-lg text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved or
            deleted.
          </p>

          {/* Actions */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects" className="flex items-center gap-2">
                Browse Projects
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-12 border-t border-border/50">
            <p className="mb-4 text-sm font-medium text-foreground">You might be looking for:</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/projects"
                className="text-sm text-primary hover:text-primary-600 transition-colors"
              >
                Our Projects
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href="/nashik-advantage"
                className="text-sm text-primary hover:text-primary-600 transition-colors"
              >
                Nashik Advantage
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href="/legacy"
                className="text-sm text-primary hover:text-primary-600 transition-colors"
              >
                Our Legacy
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href="/contact"
                className="text-sm text-primary hover:text-primary-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
