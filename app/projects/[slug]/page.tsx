import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Container } from '@/components/layout/Container'
import { ProjectHero } from '@/components/organisms/ProjectHero'
import { ProjectTabs } from '@/components/organisms/ProjectTabs'
import { ProjectSchema } from '@/components/molecules/ProjectSchema'
import { Heading } from '@/components/atomic/Heading'
import { ProjectCard } from '@/components/molecules/ProjectCard'
import { Badge } from '@/components/ui/badge'

// Lazy load heavy components that are below the fold
const InteractiveLayoutPlan = dynamic(
  () =>
    import('@/components/organisms/InteractiveLayoutPlan').then((mod) => mod.InteractiveLayoutPlan),
  {
    loading: () => (
      <div className="flex items-center justify-center h-[600px] rounded-xl border-2 border-dashed border-border/50 bg-muted/20">
        <p className="text-muted-foreground">Loading interactive layout...</p>
      </div>
    ),
  }
)

const ProjectInquiryForm = dynamic(
  () => import('@/components/molecules/ProjectInquiryForm').then((mod) => mod.ProjectInquiryForm),
  {
    loading: () => (
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-muted rounded" />
        <div className="h-12 bg-muted rounded" />
        <div className="h-32 bg-muted rounded" />
      </div>
    ),
  }
)
import { client } from '@/lib/sanity'
import { projectQuery, projectSlugsQuery, relatedProjectsQuery } from '@/lib/queries'
import type { Project } from '@/types'
import {
  formatPropertyType,
  formatLandCategory,
  formatIndianAddress,
  formatLandUseStatus,
} from '@/lib/formatters'
import { formatMeasurementSmart } from '@/lib/measurements'

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60

interface ProjectPageProps {
  params: {
    slug: string
  }
}

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(projectSlugsQuery)
  // Filter out any null/undefined values and ensure we only return valid strings
  return slugs
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
    .map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await client.fetch<Project>(projectQuery, { slug: params.slug })
  // console.log(project)
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  // Safely extract description
  const getDescription = () => {
    try {
      if (Array.isArray(project.suitabilityDescription) && project.suitabilityDescription[0]) {
        const firstBlock = project.suitabilityDescription[0]
        if (firstBlock.children && Array.isArray(firstBlock.children) && firstBlock.children[0]) {
          return firstBlock.children[0].text
        }
      }
    } catch (e) {
      // Ignore
    }
    return `Explore ${project.title}, a ${project.status.toLowerCase()} land development project in Nashik`
  }

  return {
    title: `${project.title}`,
    description: getDescription(),
    openGraph: {
      title: `${project.title} - Ajit J Gupta and Associates`,
      description: getDescription(),
      images: project.heroImage
        ? [
            {
              url: `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${project.heroImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`,
              width: 1200,
              height: 630,
              alt: project.heroImage.alt || project.title,
            },
          ]
        : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Fetch project data
  const project = await client.fetch<Project>(projectQuery, { slug: params.slug })

  if (!project) {
    notFound()
  }

  // Fetch related projects
  const relatedProjects = await client
    .fetch<
      Array<
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
    >(relatedProjectsQuery, {
      status: project.status,
      slug: params.slug,
    })
    .catch(() => [])

  return (
    <>
      {/* SEO Structured Data */}
      <ProjectSchema
        project={{
          title: project.title,
          suitabilityDescription: project.suitabilityDescription,
          location: project.location,
          heroImage: project.heroImage,
          reraNumber: project.reraNumber,
          projectSize: project.projectSize,
        }}
        slug={params.slug}
      />

      {/* Project Hero */}
      <ProjectHero
        project={{
          title: project.title,
          status: project.status,
          location: project.location,
          projectSize: project.projectSize,
          reraNumber: project.reraNumber,
          currentPhase: project.currentPhase,
          heroImage: project.heroImage,
          brochureFile: project.brochureFile,
        }}
      />

      {/* Project Key Info Bar */}
      <div className="border-b border-border/50 bg-muted/20 py-6">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {project.propertyType && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Property Type</p>
                <p className="font-semibold text-foreground">
                  {formatPropertyType(project.propertyType)}
                </p>
              </div>
            )}
            {project.landCategory && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Category</p>
                <p className="font-semibold text-foreground">
                  {formatLandCategory(project.landCategory)}
                </p>
              </div>
            )}
            {project.totalArea && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Area</p>
                <p className="font-semibold text-primary">
                  {formatMeasurementSmart(project.totalArea)}
                </p>
              </div>
            )}
            {project.indianAddress && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="font-semibold text-foreground">
                  {formatIndianAddress(project.indianAddress, { format: 'short' })}
                </p>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Project Tabs */}
      <div className="py-16">
        <Container>
          <ProjectTabs
            project={{
              suitabilityDescription: project.suitabilityDescription,
              suitabilityTypes: project.suitabilityTypes,
              investmentBenefits: project.investmentBenefits,
              developmentRestrictions: project.developmentRestrictions,
              totalArea: project.totalArea,
              areaBreakdown: project.areaBreakdown,
              minimumPlotSize: project.minimumPlotSize,
              expansionOpportunities: project.expansionOpportunities,
              infrastructure: project.infrastructure,
              legalDocumentation: project.legalDocumentation,
              availableDocuments: project.availableDocuments,
              nearbyLandmarks: project.nearbyLandmarks,
              naturalFeatures: project.naturalFeatures,
              vastuFeatures: project.vastuFeatures,
              gallery: project.gallery,
              droneVideoUrl: project.droneVideoUrl,
              virtualTourUrl: project.virtualTourUrl,
              layoutPlanImage: project.layoutPlanImage,
            }}
          />
        </Container>
      </div>

      {/* Interactive Layout Plan */}
      {project.layoutPlanImage && (
        <div className="border-t border-border/50 bg-muted/20 py-16">
          <Container>
            <Heading as="h2" level="h2" className="mb-8 text-center">
              Interactive Layout Plan
            </Heading>
            <p className="mb-8 text-center text-muted-foreground max-w-2xl mx-auto">
              Click on the plot markers to view availability, size, and pricing details.
            </p>
            <InteractiveLayoutPlan
              layoutPlanImage={project.layoutPlanImage}
              interactiveLayoutData={project.interactiveLayoutData}
            />
          </Container>
        </div>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="border-t border-border/50 bg-muted/20 py-16">
          <Container>
            <Heading as="h2" level="h2" className="mb-8 text-center">
              Similar Projects
            </Heading>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((relatedProject) => (
                <ProjectCard key={relatedProject._id} project={relatedProject} />
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Inquiry Form */}
      <div id="inquiry-form" className="py-16 bg-gradient-to-b from-background to-primary/[0.02]">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <Heading as="h2" level="h2" className="mb-4">
                Interested in {project.title}?
              </Heading>
              <p className="text-lg text-muted-foreground">
                Get in touch with us to schedule a site visit or learn more about this project.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-background p-8">
              <ProjectInquiryForm
                projectName={project.title}
                propertyDetails={{
                  propertyType: project.propertyType
                    ? formatPropertyType(project.propertyType)
                    : undefined,
                  landCategory: project.landCategory
                    ? formatLandCategory(project.landCategory)
                    : undefined,
                  totalArea: project.totalArea
                    ? formatMeasurementSmart(project.totalArea)
                    : undefined,
                  location: project.indianAddress
                    ? formatIndianAddress(project.indianAddress, { format: 'short' })
                    : undefined,
                  landUseStatus: project.legalDocumentation?.landUseStatus
                    ? formatLandUseStatus(project.legalDocumentation.landUseStatus, true)
                    : undefined,
                }}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
