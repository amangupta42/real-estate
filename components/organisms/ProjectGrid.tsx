'use client'

import { useState, useMemo } from 'react'
import { ProjectCard } from '@/components/molecules/ProjectCard'
import { ProjectFilter, type FilterState } from '@/components/molecules/ProjectFilter'
import type { Project } from '@/types'

interface ProjectGridProps {
  projects: Array<
    Pick<
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
  >
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'All',
  })

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Status filter
      if (filters.status !== 'All' && project.status !== filters.status) {
        return false
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesTitle = project.title.toLowerCase().includes(searchLower)
        const matchesPhase = project.currentPhase?.toLowerCase().includes(searchLower)
        return matchesTitle || matchesPhase
      }

      return true
    })
  }, [projects, filters])

  return (
    <div className="space-y-8">
      {/* Filter */}
      <ProjectFilter onFilterChange={setFilters} />

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No projects found matching your filters. Try adjusting your search.
          </p>
        </div>
      )}
    </div>
  )
}
