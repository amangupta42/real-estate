'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Play, Quote, X } from 'lucide-react'
import type { Testimonial } from '@/types'

interface VideoTestimonialProps {
  testimonial: Testimonial
}

export function VideoTestimonial({ testimonial }: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = testimonial.videoUrl ? getYouTubeId(testimonial.videoUrl) : null
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="h-full"
    >
      <Card className="h-full bg-muted/30 border-0 overflow-hidden">
        {/* Video Section */}
        {testimonial.videoUrl && videoId && (
          <div className="relative">
            {!isPlaying ? (
              <div className="relative cursor-pointer group" onClick={() => setIsPlaying(true)}>
                {/* Thumbnail */}
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {thumbnailUrl && (
                    <img
                      src={thumbnailUrl}
                      alt={`${testimonial.clientName} testimonial`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 group-hover:bg-white rounded-full p-4 transition-all group-hover:scale-110">
                      <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative aspect-video">
                {/* YouTube Embed */}
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={`${testimonial.clientName} testimonial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />

                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsPlaying(false)
                  }}
                  className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white rounded-full p-2 transition-colors z-10"
                  aria-label="Close video"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        <CardContent className="space-y-4 pt-6">
          {/* Quote Icon */}
          <Quote className="h-8 w-8 text-primary/40" />

          {/* Testimonial Text */}
          <blockquote className="text-base leading-relaxed text-foreground/90">
            "{testimonial.quote}"
          </blockquote>

          {/* Client Info */}
          <div className="space-y-1 pt-2 border-t">
            <p className="font-heading font-semibold text-foreground">{testimonial.clientName}</p>
            {testimonial.associatedProject && (
              <p className="text-sm text-muted-foreground">{testimonial.associatedProject.title}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Grid Component for displaying multiple video testimonials
interface VideoTestimonialsGridProps {
  testimonials: Testimonial[]
  title?: string
  description?: string
}

export function VideoTestimonialsGrid({
  testimonials,
  title = 'What Our Clients Say',
  description = 'Hear from satisfied landowners about their experience',
}: VideoTestimonialsGridProps) {
  // Filter testimonials with video URLs
  const videoTestimonials = testimonials.filter((t) => t.videoUrl)

  if (videoTestimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoTestimonials.map((testimonial) => (
            <VideoTestimonial
              key={testimonial._id || testimonial.clientName}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
