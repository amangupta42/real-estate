'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import type { Testimonial } from '@/types'
import { Quote } from 'lucide-react'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card className="h-full bg-muted/30 border-0">
        <CardContent className="space-y-6">
          <Quote className="h-10 w-10 text-primary/40" />

          <blockquote className="text-lg leading-relaxed text-foreground/90">
            "{testimonial.quote}"
          </blockquote>

          <div className="space-y-1 pt-2">
            <p className="font-heading font-semibold text-foreground">{testimonial.clientName}</p>
            {testimonial.associatedProject && (
              <p className="text-sm text-muted-foreground">{testimonial.associatedProject.title}</p>
            )}
          </div>

          {testimonial.videoUrl && (
            <a
              href={testimonial.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-600 transition-colors"
            >
              Watch Video Testimonial
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
