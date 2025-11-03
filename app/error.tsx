'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Heading } from '@/components/atomic/Heading'
import { Button } from '@/components/ui/button'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {/* Error Illustration */}
          <div className="mb-8">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-16 w-16 text-destructive/60" />
            </div>
          </div>

          {/* Heading */}
          <Heading as="h1" level="h2" className="mb-4">
            Something Went Wrong
          </Heading>

          {/* Description */}
          <p className="mb-8 text-lg text-muted-foreground">
            We encountered an unexpected error. Don't worry, our team has been notified and is
            working on it.
          </p>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="mb-8 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-left">
              <p className="text-sm font-mono text-destructive">{error.message}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" onClick={reset} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-12 pt-12 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              If this problem persists, please{' '}
              <Link
                href="/contact"
                className="text-primary hover:text-primary-600 transition-colors"
              >
                contact us
              </Link>{' '}
              for assistance.
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
