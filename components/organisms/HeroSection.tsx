'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/Container'
import { Heading } from '@/components/atomic/Heading'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface HeroSectionProps {
  title: string
  subtitle: string
  description?: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-28 lg:py-36">
      <Container className="text-center">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
              {subtitle}
            </p>

            <Heading as="h1" level="h1" className="mb-6">
              {title}
            </Heading>

            {description && (
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">{description}</p>
            )}

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {primaryCta && (
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href={primaryCta.href}>
                    {primaryCta.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              {secondaryCta && (
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
          <div className="h-96 w-96 rounded-full bg-primary blur-3xl" />
        </div>
      </Container>
    </section>
  )
}
