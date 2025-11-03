'use client'

import { ProjectCard } from '@/components/molecules/ProjectCard'
import type { Project } from '@/types'
import { motion } from 'framer-motion'

interface ProjectsGridProps {
  projects: Array<
    Pick<
      Project,
      | '_id'
      | 'title'
      | 'slug'
      | 'status'
      | 'location'
      | 'projectSize'
      | 'heroImage'
      | 'currentPhase'
    >
  >
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/50 bg-muted/20 p-12 text-center">
        <svg
          className="mb-4 h-16 w-16 text-muted-foreground/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <h3 className="mb-2 text-xl font-heading font-semibold text-foreground">
          No projects found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  )
}
