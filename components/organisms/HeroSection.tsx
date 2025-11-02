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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/[0.03] via-background to-background py-20 md:py-32 lg:py-40">
      <Container>
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8 text-center"
          >
            <div className="inline-flex items-center justify-center">
              <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                {subtitle}
              </span>
            </div>

            <Heading as="h1" level="h1" className="leading-tight">
              {title}
            </Heading>

            {description && (
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}

            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row sm:gap-6">
              {primaryCta && (
                <Button asChild size="lg" className="min-w-[200px]">
                  <Link href={primaryCta.href} className="group">
                    {primaryCta.text}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
              {secondaryCta && (
                <Button asChild variant="outline" size="lg" className="min-w-[200px]">
                  <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
