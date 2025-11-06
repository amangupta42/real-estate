'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/lib/sanity'
import { X, Play, Maximize2, ExternalLink } from 'lucide-react'
import type { SanityImage } from '@/types'

interface GalleryDisplayProps {
  gallery?: SanityImage[]
  droneVideoUrl?: string
  virtualTourUrl?: string
  layoutPlanImage?: SanityImage
}

export function GalleryDisplay({
  gallery,
  droneVideoUrl,
  virtualTourUrl,
  layoutPlanImage,
}: GalleryDisplayProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const hasGallery = gallery && gallery.length > 0
  const hasVideo = !!droneVideoUrl
  const hasTour = !!virtualTourUrl
  const hasLayoutPlan = !!layoutPlanImage
  const hasAnyMedia = hasGallery || hasVideo || hasTour || hasLayoutPlan

  if (!hasAnyMedia) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No media available for this project yet
        </CardContent>
      </Card>
    )
  }

  // Extract video ID from YouTube or Vimeo URL
  const getVideoEmbedUrl = (url: string) => {
    // YouTube
    const youtubeMatch = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    )
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }

    return url
  }

  return (
    <div className="space-y-6">
      {/* Photo Gallery */}
      {hasGallery && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Maximize2 className="h-5 w-5 text-primary" />
              Photo Gallery ({gallery.length} photos)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((image, index) => {
                const imageUrl = urlFor(image).width(600).height(400).url()
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(imageUrl)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted cursor-pointer"
                  >
                    <Image
                      src={imageUrl}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Maximize2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Drone Video */}
      {hasVideo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Play className="h-5 w-5 text-primary" />
              Drone Video Tour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video overflow-hidden rounded-lg bg-black">
              <iframe
                src={getVideoEmbedUrl(droneVideoUrl)}
                title="Drone Video Tour"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Virtual Tour */}
      {hasTour && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">🌐 360° Virtual Tour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Experience the property in immersive 360° view
              </p>
              <Button asChild className="w-full sm:w-auto">
                <a
                  href={virtualTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Launch Virtual Tour
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Layout Plan */}
      {hasLayoutPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">📐 Layout Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <Image
                src={urlFor(layoutPlanImage).width(1200).height(900).url()}
                alt={layoutPlanImage.alt || 'Layout Plan'}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Click on the image to view in full size
            </p>
          </CardContent>
        </Card>
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={selectedImage}
              alt="Gallery image"
              width={1200}
              height={800}
              className="h-auto w-auto max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
