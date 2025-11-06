'use client'

import { useState, useCallback } from 'react'
import { ProjectFilter } from '@/components/organisms/ProjectFilter'
import { ProjectsGrid } from '@/components/organisms/ProjectsGrid'
import type { Project } from '@/types'

type ProjectPreview = Pick<
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

interface ProjectsClientProps {
  projects: ProjectPreview[]
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [filteredProjects, setFilteredProjects] = useState<ProjectPreview[]>(projects)

  // Handle filter changes
  const handleFilterChange = useCallback(
    (filters: { status: 'All' | Project['status']; search: string; sort: string }) => {
      let filtered = [...projects]

      // Filter by status
      if (filters.status !== 'All') {
        filtered = filtered.filter((project) => project.status === filters.status)
      }

      // Filter by search term
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filtered = filtered.filter(
          (project) =>
            project.title.toLowerCase().includes(searchLower) ||
            project.currentPhase?.toLowerCase().includes(searchLower)
        )
      }

      // Sort projects
      switch (filters.sort) {
        case 'size':
          filtered.sort((a, b) => {
            const sizeA = a.totalArea?.squareMeters || 0
            const sizeB = b.totalArea?.squareMeters || 0
            return sizeB - sizeA
          })
          break
        case 'alphabetical':
          filtered.sort((a, b) => a.title.localeCompare(b.title))
          break
        case 'latest':
        default:
          // Already sorted by _createdAt desc from query
          break
      }

      setFilteredProjects(filtered)
    },
    [projects]
  )

  return (
    <>
      {/* Project Count */}
      <div className="mb-8 text-sm text-muted-foreground">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>

      {/* Filters */}
      <ProjectFilter onFilterChange={handleFilterChange} />

      {/* Projects Grid */}
      <ProjectsGrid projects={filteredProjects} />
    </>
  )
}
