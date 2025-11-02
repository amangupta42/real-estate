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

const statusVariants: Record<Project['status'], 'default' | 'secondary' | 'outline'> = {
  Ongoing: 'default',
  Completed: 'secondary',
  Upcoming: 'outline',
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.heroImage
    ? urlFor(project.heroImage).width(600).height(400).url()
    : '/placeholder-project.jpg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/projects/${project.slug.current}`}>
        <Card className="group overflow-hidden transition-all hover:shadow-card-hover">
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src={imageUrl}
              alt={project.heroImage?.alt || project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute right-4 top-4">
              <Badge variant={statusVariants[project.status]}>{project.status}</Badge>
            </div>
          </div>

          <CardContent className="p-6">
            <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>

            {project.currentPhase && (
              <p className="mb-3 text-sm text-muted-foreground">{project.currentPhase}</p>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {project.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>Nashik</span>
                </div>
              )}
              {project.projectSize && (
                <div className="flex items-center gap-1">
                  <Maximize2 className="h-4 w-4" />
                  <span>{project.projectSize}</span>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0">
            <Button
              variant="outline"
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            >
              View Details
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
