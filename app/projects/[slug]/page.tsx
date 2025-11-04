import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { ProjectHero } from '@/components/organisms/ProjectHero'
import { ProjectDetails } from '@/components/organisms/ProjectDetails'
import { InteractiveLayoutPlan } from '@/components/organisms/InteractiveLayoutPlan'
import { ProjectInquiryForm } from '@/components/molecules/ProjectInquiryForm'
import { ProjectSchema } from '@/components/molecules/ProjectSchema'
import { Heading } from '@/components/atomic/Heading'
import { ProjectCard } from '@/components/molecules/ProjectCard'
import { client } from '@/lib/sanity'
import { projectQuery, projectSlugsQuery, relatedProjectsQuery } from '@/lib/queries'
import type { Project } from '@/types'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(projectSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await client.fetch<Project>(projectQuery, { slug: params.slug })
  console.log(project)
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
          | 'location'
          | 'projectSize'
          | 'heroImage'
          | 'currentPhase'
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

      {/* Project Details */}
      <Container>
        <ProjectDetails
          project={{
            suitabilityDescription: project.suitabilityDescription,
            locationalBenefits: project.locationalBenefits,
            location: project.location,
            gallery: project.gallery,
            plotSizesAvailable: project.plotSizesAvailable,
            brochureFile: project.brochureFile,
            reraNumber: project.reraNumber,
          }}
        />
      </Container>

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
              <ProjectInquiryForm projectName={project.title} />
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
