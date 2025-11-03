'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { MapPin, CheckCircle2, FileText } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

interface ProjectDetailsProps {
  project: Pick<
    Project,
    | 'suitabilityDescription'
    | 'locationalBenefits'
    | 'location'
    | 'gallery'
    | 'plotSizesAvailable'
    | 'brochureFile'
    | 'reraNumber'
  >
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'location', label: 'Location' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'details', label: 'Details' },
]

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="py-16">
      {/* Tabs */}
      <div className="mb-12 border-b border-border/50">
        <div className="flex gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative pb-4 text-sm font-medium transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Suitability Description */}
            {project.suitabilityDescription &&
              Array.isArray(project.suitabilityDescription) &&
              project.suitabilityDescription.length > 0 && (
                <div>
                  <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                    About This Project
                  </h2>
                  <div className="prose prose-slate max-w-none text-muted-foreground">
                    <PortableText value={project.suitabilityDescription} />
                  </div>
                </div>
              )}

            {/* Locational Benefits */}
            {project.locationalBenefits &&
              Array.isArray(project.locationalBenefits) &&
              project.locationalBenefits.length > 0 && (
                <div>
                  <h2 className="mb-6 text-2xl font-heading font-semibold text-foreground">
                    Key Highlights
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.locationalBenefits
                      .filter((benefit: any) => typeof benefit === 'string')
                      .map((benefit: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/20 p-4"
                        >
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="text-sm text-foreground">{benefit}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

            {/* Plot Sizes */}
            {project.plotSizesAvailable &&
              Array.isArray(project.plotSizesAvailable) &&
              project.plotSizesAvailable.length > 0 && (
                <div>
                  <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                    Available Plot Sizes
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {project.plotSizesAvailable
                      .filter((size: any) => typeof size === 'string')
                      .map((size: string, index: number) => (
                        <div
                          key={index}
                          className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
                        >
                          {size}
                        </div>
                      ))}
                  </div>
                </div>
              )}
          </motion.div>
        )}

        {activeTab === 'location' && (
          <motion.div
            key="location"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {project.location ? (
              <>
                <div className="rounded-xl overflow-hidden border border-border/50 h-[500px] bg-muted/30">
                  <iframe
                    src={`https://www.google.com/maps?q=${project.location.lat},${project.location.lng}&z=15&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">
                    Coordinates: {project.location.lat.toFixed(6)},{' '}
                    {project.location.lng.toFixed(6)}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-[400px] rounded-xl border-2 border-dashed border-border/50 bg-muted/20">
                <p className="text-muted-foreground">Location map not available</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.gallery && project.gallery.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/50 bg-muted"
                  >
                    <Image
                      src={urlFor(image).width(800).height(600).url()}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] rounded-xl border-2 border-dashed border-border/50 bg-muted/20">
                <p className="text-muted-foreground">No gallery images available</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-border/50 bg-muted/20 p-8">
              <h2 className="mb-6 text-2xl font-heading font-semibold text-foreground">
                Project Documentation
              </h2>
              <div className="space-y-4">
                {project.reraNumber && (
                  <div className="flex items-center justify-between py-3 border-b border-border/50">
                    <span className="text-sm font-medium text-foreground">RERA Registration</span>
                    <span className="text-sm text-muted-foreground">{project.reraNumber}</span>
                  </div>
                )}
                {project.brochureFile && (
                  <div className="flex items-center justify-between py-3 border-b border-border/50">
                    <span className="text-sm font-medium text-foreground">Project Brochure</span>
                    <a
                      href="#"
                      download
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-600 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      Download PDF
                    </a>
                  </div>
                )}
                {project.plotSizesAvailable && (
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm font-medium text-foreground">Plot Options</span>
                    <span className="text-sm text-muted-foreground">
                      {project.plotSizesAvailable.length} variants available
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
