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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="h-full">
        <CardContent className="p-6">
          <Quote className="mb-4 h-8 w-8 text-primary opacity-50" />

          <blockquote className="mb-4 text-lg text-foreground">"{testimonial.quote}"</blockquote>

          <div className="mt-4 border-t border-border pt-4">
            <p className="font-semibold text-foreground">{testimonial.clientName}</p>
            {testimonial.associatedProject && (
              <p className="text-sm text-muted-foreground">{testimonial.associatedProject.title}</p>
            )}
          </div>

          {testimonial.videoUrl && (
            <div className="mt-4">
              <a
                href={testimonial.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Watch Video Testimonial →
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
