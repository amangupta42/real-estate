import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Heading } from '@/components/atomic/Heading'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/molecules/ProjectCard'
import { NeighborhoodSchema } from '@/components/molecules/NeighborhoodSchema'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity'
import {
  neighborhoodGuideQuery,
  neighborhoodGuideSlugsQuery,
  allProjectsQuery,
} from '@/lib/queries'
import type { NeighborhoodGuide, Project } from '@/types'
import { MapPin, CheckCircle2, ArrowLeft } from 'lucide-react'

interface NeighborhoodPageProps {
  params: {
    slug: string
  }
}

// Generate static params for all neighborhoods
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(neighborhoodGuideSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: NeighborhoodPageProps): Promise<Metadata> {
  const neighborhood = await client.fetch<NeighborhoodGuide>(neighborhoodGuideQuery, {
    slug: params.slug,
  })

  if (!neighborhood) {
    return {
      title: 'Neighborhood Not Found',
    }
  }

  return {
    title: `${neighborhood.name} - Nashik Advantage`,
    description:
      neighborhood.overview?.[0]?.children?.[0]?.text ||
      `Explore ${neighborhood.name} in Nashik - amenities, connectivity, and nearby facilities`,
    openGraph: {
      title: `${neighborhood.name} - Nashik Advantage`,
      description:
        neighborhood.overview?.[0]?.children?.[0]?.text ||
        `Explore ${neighborhood.name} in Nashik - amenities, connectivity, and nearby facilities`,
      type: 'website',
      locale: 'en_IN',
    },
    keywords: [
      'Nashik Advantage',
      'Neighborhood',
      'Amenities',
      'Connectivity',
      'Nearby Facilities',
      'Nashik',
      'RERA',
    ],
    alternates: {
      canonical: `https://ajitjgupta.com/nashik-advantage/${params.slug}`,
    },
  }
}

export default async function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  // Fetch neighborhood data
  const neighborhood = await client.fetch<NeighborhoodGuide>(neighborhoodGuideQuery, {
    slug: params.slug,
  })

  if (!neighborhood) {
    notFound()
  }

  // Fetch all projects (we'll show a few nearby ones)
  const allProjects = await client
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
    >(allProjectsQuery)
    .catch(() => [])

  // For simplicity, show first 3 projects as "nearby"
  // In a real app, you'd calculate distance from neighborhood coordinates
  const nearbyProjects = allProjects.slice(0, 3)

  return (
    <>
      {/* SEO Structured Data */}
      <NeighborhoodSchema
        neighborhood={{
          name: neighborhood.name,
          overview: neighborhood.overview,
          keyAmenities: neighborhood.keyAmenities,
          mapCoordinates: neighborhood.mapCoordinates,
        }}
        slug={params.slug}
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary/[0.03] via-background to-background">
        <Container>
          {/* Back Button */}
          <Link
            href="/nashik-advantage"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Nashik Advantage
          </Link>

          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 text-primary">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Nashik, Maharashtra</span>
            </div>
            <Heading as="h1" level="h1" className="mb-6">
              {neighborhood.name}
            </Heading>
          </div>
        </Container>
      </section>

      {/* Overview */}
      {neighborhood.overview &&
        Array.isArray(neighborhood.overview) &&
        neighborhood.overview.length > 0 && (
          <section className="py-16 border-t border-border/50">
            <Container>
              <div className="mx-auto max-w-3xl">
                <Heading as="h2" level="h3" className="mb-6">
                  About This Area
                </Heading>
                <div className="prose prose-slate max-w-none text-muted-foreground">
                  <PortableText value={neighborhood.overview} />
                </div>
              </div>
            </Container>
          </section>
        )}

      {/* Key Amenities */}
      {neighborhood.keyAmenities && neighborhood.keyAmenities.length > 0 && (
        <section className="py-16 border-t border-border/50 bg-muted/20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Heading as="h2" level="h3" className="mb-8">
                Key Amenities
              </Heading>
              <div className="grid gap-4 sm:grid-cols-2">
                {neighborhood.keyAmenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-border/50 bg-background p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Location Map */}
      {neighborhood.mapCoordinates && (
        <section className="py-16 border-t border-border/50">
          <Container>
            <div className="mx-auto max-w-4xl">
              <Heading as="h2" level="h3" className="mb-8 text-center">
                Location
              </Heading>
              <div className="rounded-xl overflow-hidden border border-border/50 h-[500px] bg-muted/30">
                <iframe
                  src={`https://www.google.com/maps?q=${neighborhood.mapCoordinates.lat},${neighborhood.mapCoordinates.lng}&z=14&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Nearby Projects */}
      {nearbyProjects.length > 0 && (
        <section className="py-16 border-t border-border/50 bg-muted/20">
          <Container>
            <Heading as="h2" level="h2" className="mb-8 text-center">
              Projects in This Area
            </Heading>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {nearbyProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
