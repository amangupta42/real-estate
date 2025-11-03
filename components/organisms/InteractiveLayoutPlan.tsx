'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

interface PlotData {
  plotNumber: string
  size: string
  status: 'Available' | 'Sold' | 'Reserved'
  price?: string
  x: number // Percentage from left
  y: number // Percentage from top
}

interface InteractiveLayoutPlanProps {
  layoutPlanImage: Project['layoutPlanImage']
  interactiveLayoutData?: PlotData[]
}

const statusColors = {
  Available: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
  },
  Sold: {
    bg: 'bg-red-500/20',
    border: 'border-red-500',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
  Reserved: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
}

export function InteractiveLayoutPlan({
  layoutPlanImage,
  interactiveLayoutData,
}: InteractiveLayoutPlanProps) {
  const [selectedPlot, setSelectedPlot] = useState<PlotData | null>(null)

  if (!layoutPlanImage) {
    return (
      <div className="flex items-center justify-center h-[600px] rounded-xl border-2 border-dashed border-border/50 bg-muted/20">
        <p className="text-muted-foreground">Layout plan not available</p>
      </div>
    )
  }

  const imageUrl = urlFor(layoutPlanImage).width(1600).height(1200).url()

  return (
    <div className="space-y-6">
      {/* Legend */}
      {interactiveLayoutData && interactiveLayoutData.length > 0 && (
        <div className="flex flex-wrap gap-4 rounded-lg border border-border/50 bg-muted/20 p-4">
          <div className="text-sm font-medium text-foreground">Plot Status:</div>
          {Object.entries(statusColors).map(([status, colors]) => (
            <div key={status} className="flex items-center gap-2">
              <div className={cn('h-3 w-3 rounded-full', colors.dot)} />
              <span className="text-sm text-muted-foreground">{status}</span>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Layout Plan */}
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-muted">
        <div className="relative aspect-[4/3]">
          <Image
            src={imageUrl}
            alt={layoutPlanImage.alt || 'Layout Plan'}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />

          {/* Interactive Plot Markers */}
          {interactiveLayoutData &&
            interactiveLayoutData.map((plot, index) => {
              const colors = statusColors[plot.status]
              return (
                <button
                  key={index}
                  onClick={() => setSelectedPlot(plot)}
                  className={cn(
                    'absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-200 hover:scale-125',
                    colors.border,
                    colors.dot,
                    'shadow-lg hover:shadow-xl'
                  )}
                  style={{
                    left: `${plot.x}%`,
                    top: `${plot.y}%`,
                  }}
                  aria-label={`Plot ${plot.plotNumber}`}
                >
                  <span className="sr-only">Plot {plot.plotNumber}</span>
                </button>
              )
            })}
        </div>
      </div>

      {/* Plot Details Modal */}
      <AnimatePresence>
        {selectedPlot && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlot(null)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-6 shadow-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPlot(null)}
                className="absolute right-4 top-4 rounded-lg p-1 hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-heading font-semibold text-foreground">
                    Plot {selectedPlot.plotNumber}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <div
                      className={cn(
                        'rounded-full px-3 py-1 text-sm font-medium border',
                        statusColors[selectedPlot.status].bg,
                        statusColors[selectedPlot.status].border,
                        statusColors[selectedPlot.status].text
                      )}
                    >
                      {selectedPlot.status}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Plot Size</span>
                    <span className="text-sm font-medium text-foreground">{selectedPlot.size}</span>
                  </div>
                  {selectedPlot.price && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Price</span>
                      <span className="text-sm font-medium text-foreground">
                        {selectedPlot.price}
                      </span>
                    </div>
                  )}
                </div>

                {selectedPlot.status === 'Available' && (
                  <div className="pt-4">
                    <a
                      href="#inquiry-form"
                      onClick={() => setSelectedPlot(null)}
                      className="block w-full rounded-lg bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-600"
                    >
                      Inquire About This Plot
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
