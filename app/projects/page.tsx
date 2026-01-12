import { Suspense } from 'react'
import { Container } from '@/components/layout/Container'
import { Heading } from '@/components/atomic/Heading'
import { ProjectsClient } from '@/components/organisms/ProjectsClient'
import { client } from '@/lib/sanity'
import { allProjectsQuery } from '@/lib/queries'
import type { Project } from '@/types'
import { Metadata } from 'next'

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60

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

export const metadata: Metadata = {
  title: 'Our Projects - RERA Certified Land Development in Nashik',
  description:
    'Explore premium RERA-certified land development opportunities across Nashik and surrounding areas. Browse ongoing, completed, and upcoming residential and commercial plot projects with complete infrastructure, strategic locations near Mumbai-Nagpur Expressway, and flexible payment plans. Each project is carefully planned to create lasting value.',
  openGraph: {
    title: 'Our Projects - RERA Certified Land Development in Nashik',
    description:
      'Browse ongoing, completed, and upcoming RERA-certified land development projects in Nashik. Prime locations, complete infrastructure, and flexible payment options.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://ajitjgupta.com/projects',
  },
  keywords: [
    'Nashik land projects',
    'RERA certified projects Nashik',
    'ongoing projects Nashik',
    'completed projects Nashik',
    'upcoming projects Nashik',
    'residential plots Nashik',
    'commercial plots Nashik',
    'land development Nashik',
    'plots for sale Nashik',
    'investment plots Nashik',
  ],
  alternates: {
    canonical: 'https://ajitjgupta.com/projects',
  },
}

function ProjectsLoading() {
  return (
    <div className="min-h-screen py-20">
      <Container>
        <div className="flex items-center justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </Container>
    </div>
  )
}

export default async function ProjectsPage() {
  // Fetch projects on the server
  const rawProjects = await client.fetch<ProjectPreview[]>(allProjectsQuery).catch((error) => {
    console.error('Error fetching projects:', error)
    return []
  })

  // Filter out projects with null/undefined slugs to prevent render errors
  const projects = rawProjects.filter(
    (project) => project.slug && typeof project.slug.current === 'string'
  )

  return (
    <Suspense fallback={<ProjectsLoading />}>
      <div className="min-h-screen py-20 md:py-28">
        <Container>
          {/* Page Header */}
          <div className="mb-12 text-center">
            <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              Our Portfolio
            </span>
            <Heading as="h1" level="h1" className="mt-6 mb-4">
              Explore Our Projects
            </Heading>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Discover premium land development opportunities across Nashik and surrounding areas.
              Each project is carefully planned to create lasting value.
            </p>
          </div>

          {/* Projects Client Component */}
          <ProjectsClient projects={projects} />
        </Container>
      </div>
    </Suspense>
  )
}
