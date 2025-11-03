'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, CheckCircle2, ArrowRight } from 'lucide-react'
import type { NeighborhoodGuide } from '@/types'

interface NeighborhoodCardProps {
  neighborhood: Pick<NeighborhoodGuide, '_id' | 'name' | 'slug' | 'keyAmenities'>
}

export function NeighborhoodCard({ neighborhood }: NeighborhoodCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Link href={`/nashik-advantage/${neighborhood.slug.current}`} className="block group">
        <Card className="h-full cursor-pointer">
          <CardContent className="space-y-4">
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
              <MapPin className="h-7 w-7 text-primary" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-heading font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
              {neighborhood.name}
            </h3>

            {/* Key Amenities Preview */}
            {neighborhood.keyAmenities && neighborhood.keyAmenities.length > 0 && (
              <div className="space-y-2">
                {neighborhood.keyAmenities.slice(0, 3).map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary/60" />
                    <span className="line-clamp-1">{amenity}</span>
                  </div>
                ))}
                {neighborhood.keyAmenities.length > 3 && (
                  <p className="text-xs text-muted-foreground">
                    +{neighborhood.keyAmenities.length - 3} more amenities
                  </p>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center gap-2 pt-2 text-sm font-medium text-primary transition-transform duration-200 group-hover:translate-x-1">
              <span>Explore Area</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
