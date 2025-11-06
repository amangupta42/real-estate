'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/Container'
import { MapPin, Maximize2, FileText, Calendar, ArrowLeft } from 'lucide-react'
import { urlFor, fileUrl } from '@/lib/sanity'
import type { Project } from '@/types'

interface ProjectHeroProps {
  project: Pick<
    Project,
    | 'title'
    | 'status'
    | 'location'
    | 'projectSize'
    | 'reraNumber'
    | 'currentPhase'
    | 'heroImage'
    | 'brochureFile'
  >
}

const statusVariants: Record<Project['status'], 'default' | 'success' | 'outline'> = {
  Ongoing: 'default',
  Completed: 'success',
  Upcoming: 'outline',
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const imageUrl = project.heroImage
    ? urlFor(project.heroImage).width(1920).height(1080).url()
    : '/placeholder-project.jpg'

  const brochureUrl = project.brochureFile?.asset?._ref
    ? fileUrl(project.brochureFile.asset._ref)
    : null

  return (
    <div className="relative min-h-[70vh] flex items-end bg-muted">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={project.heroImage?.alt || project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <Container className="relative z-10 pb-12 pt-32">
        {/* Back Button */}
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          {/* Status Badge */}
          <div className="mb-4">
            <Badge variant={statusVariants[project.status]} className="shadow-lg">
              {project.status}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
            {project.title}
          </h1>

          {/* Key Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-white/90">
            {project.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm">Nashik, Maharashtra</span>
              </div>
            )}
            {project.projectSize && (
              <div className="flex items-center gap-2">
                <Maximize2 className="h-5 w-5 text-primary" />
                <span className="text-sm">{project.projectSize}</span>
              </div>
            )}
            {project.currentPhase && (
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm">{project.currentPhase}</span>
              </div>
            )}
            {project.reraNumber && (
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm">RERA: {project.reraNumber}</span>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <a href="#inquiry-form">Schedule a Visit</a>
            </Button>
            {brochureUrl && (
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                <a
                  href={brochureUrl}
                  download={`${project.title}-Brochure.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Download Brochure
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
