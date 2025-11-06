'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { urlFor } from '@/lib/sanity'
import type { Project } from '@/types'
import { MapPin, Maximize2, FileCheck, MapPinned } from 'lucide-react'
import {
  formatPropertyType,
  formatLandCategory,
  formatLandUseStatus,
  formatIndianAddress,
  getStatusBadgeColor,
  getLandUseBadgeColor,
} from '@/lib/formatters'
import { formatMeasurementSmart } from '@/lib/measurements'

interface ProjectCardProps {
  project: Pick<
    Project,
    | '_id'
    | 'title'
    | 'slug'
    | 'status'
    | 'propertyType'
    | 'landCategory'
    | 'location'
    | 'indianAddress'
    | 'totalArea'
    | 'legalDocumentation'
    | 'heroImage'
    | 'currentPhase'
    | 'nearbyLandmarks'
  >
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.heroImage
    ? urlFor(project.heroImage).width(600).height(400).url()
    : '/placeholder-project.jpg'

  const statusColors = getStatusBadgeColor(project.status)
  const landUseColors = project.legalDocumentation?.landUseStatus
    ? getLandUseBadgeColor(project.legalDocumentation.landUseStatus)
    : null

  const topLandmark = project.nearbyLandmarks?.[0]
  const isReraRegistered = project.legalDocumentation?.reraRegistered

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Link href={`/projects/${project.slug.current}`} className="block">
        <Card className="group overflow-hidden cursor-pointer h-full hover:shadow-lg transition-shadow duration-300">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={imageUrl}
              alt={project.heroImage?.alt || project.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Status and RERA badges */}
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <Badge
                className={`${statusColors.bg} ${statusColors.text} border ${statusColors.border}`}
              >
                {project.status}
              </Badge>
              {isReraRegistered && (
                <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
                  <FileCheck className="h-3 w-3 mr-1" />
                  RERA
                </Badge>
              )}
            </div>

            {/* Property type badge */}
            {project.propertyType && (
              <div className="absolute right-4 top-4">
                <Badge variant="secondary" className="bg-black/50 text-white border-0">
                  {formatPropertyType(project.propertyType)}
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="space-y-4 p-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-heading font-semibold text-foreground transition-colors duration-200 group-hover:text-primary line-clamp-2">
                {project.title}
              </h3>

              {/* Land Use Status */}
              {landUseColors && project.legalDocumentation?.landUseStatus && (
                <Badge
                  className={`${landUseColors.bg} ${landUseColors.text} border ${landUseColors.border} text-xs`}
                >
                  {formatLandUseStatus(project.legalDocumentation.landUseStatus, true)}
                </Badge>
              )}

              {/* Land Category */}
              {project.landCategory && (
                <p className="text-sm text-muted-foreground">
                  {formatLandCategory(project.landCategory)}
                </p>
              )}
            </div>

            {/* Location and Size */}
            <div className="space-y-2 pt-2 border-t">
              {project.indianAddress && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary/60 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {formatIndianAddress(project.indianAddress, { format: 'short' })}
                  </span>
                </div>
              )}

              {project.totalArea && (
                <div className="flex items-center gap-2">
                  <Maximize2 className="h-4 w-4 text-primary/60 flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">
                    {formatMeasurementSmart(project.totalArea)}
                  </span>
                </div>
              )}

              {/* Top Nearby Landmark */}
              {topLandmark && (
                <div className="flex items-start gap-2">
                  <MapPinned className="h-4 w-4 text-primary/60 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground line-clamp-1">
                    {topLandmark.name} ({topLandmark.distance} km)
                  </span>
                </div>
              )}
            </div>

            {/* Current Phase */}
            {project.currentPhase && (
              <p className="text-sm text-muted-foreground border-t pt-3 line-clamp-2">
                {project.currentPhase}
              </p>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
