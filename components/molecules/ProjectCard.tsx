'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/lib/sanity'
import type { Project } from '@/types'
import { MapPin, Maximize2 } from 'lucide-react'

interface ProjectCardProps {
  project: Pick<
    Project,
    '_id' | 'title' | 'slug' | 'status' | 'location' | 'projectSize' | 'heroImage' | 'currentPhase'
  >
}

const statusVariants: Record<Project['status'], 'default' | 'success' | 'outline'> = {
  Ongoing: 'default',
  Completed: 'success',
  Upcoming: 'outline',
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.heroImage
    ? urlFor(project.heroImage).width(600).height(400).url()
    : '/placeholder-project.jpg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Link href={`/projects/${project.slug.current}`} className="block">
        <Card className="group overflow-hidden cursor-pointer h-full">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={imageUrl}
              alt={project.heroImage?.alt || project.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute left-6 top-6">
              <Badge variant={statusVariants[project.status]}>{project.status}</Badge>
            </div>
          </div>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-heading font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                {project.title}
              </h3>

              {project.currentPhase && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.currentPhase}
                </p>
              )}
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
              {project.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary/60" />
                  <span>Nashik</span>
                </div>
              )}
              {project.projectSize && (
                <div className="flex items-center gap-2">
                  <Maximize2 className="h-4 w-4 text-primary/60" />
                  <span>{project.projectSize}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
