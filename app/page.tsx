import { Suspense } from 'react'
import { HeroSection } from '@/components/organisms/HeroSection'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Heading } from '@/components/atomic/Heading'
import { ProjectCard } from '@/components/molecules/ProjectCard'
import { TestimonialCard } from '@/components/molecules/TestimonialCard'
import {
  OrganizationStructuredData,
  LocalBusinessStructuredData,
} from '@/components/molecules/StructuredData'
import { Button } from '@/components/ui/button'
import { client } from '@/lib/sanity'
import { featuredProjectsQuery, testimonialsQuery } from '@/lib/queries'
import type { Project, Testimonial } from '@/types'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, Shield, Wallet, MapPin, Clock, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ajit J Gupta and Associates - Premium Land Development in Nashik',
  description:
    "Discover premium RERA-certified land development projects in Nashik with 7.2% ROI. Invest in prime residential and commercial plots near Mumbai-Nagpur Expressway with complete infrastructure, flexible payment plans, and clear titles. Maharashtra's 3rd largest industrial hub.",
  openGraph: {
    title: 'Ajit J Gupta and Associates - Premium Land Development in Nashik',
    description:
      'Explore top-rated RERA-certified land development opportunities in Nashik with 7.2% ROI. Prime locations near Mumbai-Nagpur Expressway, complete infrastructure, and flexible financing options.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://ajitjgupta.com',
  },
  keywords: [
    'Nashik real estate',
    'land development Nashik',
    'RERA certified plots Nashik',
    'residential plots Nashik',
    'commercial plots Nashik',
    'investment property Nashik',
    'Mumbai-Nagpur Expressway plots',
    'Nashik land investment',
    'plots near MIDC Nashik',
    'Nashik property ROI',
    'Ajit J Gupta',
    'land for sale Nashik',
    'plots with infrastructure Nashik',
  ],
  alternates: {
    canonical: 'https://ajitjgupta.com',
  },
}

// Fetch data on the server
async function getFeaturedProjects() {
  try {
    const projects = await client.fetch<Project[]>(featuredProjectsQuery)
    console.log(projects)
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

async function getTestimonials() {
  try {
    const testimonials = await client.fetch<Testimonial[]>(testimonialsQuery)
    console.log(testimonials)
    return testimonials.slice(0, 3) // Limit to 3 testimonials
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

// Why Choose Us Features
const features = [
  {
    icon: MapPin,
    title: 'Prime Locations',
    description:
      'Strategic locations in Nashik with excellent connectivity to major highways and city center.',
  },
  {
    icon: Shield,
    title: 'RERA Certified',
    description: 'All projects are RERA registered, ensuring transparency and legal compliance.',
  },
  {
    icon: Wallet,
    title: 'Flexible Payments',
    description: 'Easy EMI options and flexible payment plans to make your dream home affordable.',
  },
  {
    icon: Building2,
    title: 'Quality Development',
    description: 'Premium infrastructure with modern amenities and sustainable practices.',
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description: 'Committed to on-time project completion with transparent progress updates.',
  },
  {
    icon: Award,
    title: '20+ Years Experience',
    description: 'Trusted name in Nashik real estate with a proven track record of excellence.',
  },
]

// Featured Projects Component
async function FeaturedProjects() {
  const projects = await getFeaturedProjects()
  console.log(projects)
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No projects available at the moment. Check back soon!
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  )
}

// Testimonials Component
async function Testimonials() {
  const testimonials = await getTestimonials()
  console.log(testimonials)
  if (testimonials.length === 0) {
    return null
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial._id} testimonial={testimonial} />
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <OrganizationStructuredData />
      <LocalBusinessStructuredData />

      {/* Hero Section */}
      <HeroSection
        title="Discover Premium Land Opportunities in Nashik"
        subtitle="Your Dream Project Starts Here"
        description="Explore RERA-certified land development projects with excellent connectivity, modern amenities, and flexible payment options. We are a trusted name in Nashik real estate with a proven track record of excellence."
        primaryCta={{
          text: 'View Projects',
          href: '/projects',
        }}
        secondaryCta={{
          text: 'Contact Us',
          href: '/contact',
        }}
      />

      {/* Featured Projects Section */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
              Our Projects
            </p>
            <Heading as="h2" level="h2" className="mb-4">
              Featured Developments
            </Heading>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Explore our handpicked selection of premium land development projects in prime Nashik
              locations.
            </p>
          </div>

          <Suspense fallback={<ProjectsLoading />}>
            <FeaturedProjects />
          </Suspense>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Why Choose Us Section */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
              Why Choose Us
            </p>
            <Heading as="h2" level="h2" className="mb-4">
              Your Trusted Real Estate Partner
            </Heading>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We bring transparency, trust, and expertise to every land development project.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-border bg-background p-6 transition-shadow hover:shadow-card"
              >
                <feature.icon className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
              Testimonials
            </p>
            <Heading as="h2" level="h2" className="mb-4">
              What Our Clients Say
            </Heading>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Hear from satisfied clients who have invested in their future with us.
            </p>
          </div>

          <Suspense fallback={<TestimonialsLoading />}>
            <Testimonials />
          </Suspense>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Heading as="h2" level="h2" className="mb-4">
              Ready to Invest in Your Future?
            </Heading>
            <p className="mb-8 text-lg text-muted-foreground">
              Schedule a site visit today and explore the perfect plot for your dream home.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Schedule Visit</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

// Loading Skeletons
function ProjectsLoading() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
      ))}
    </div>
  )
}

function TestimonialsLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-64 animate-pulse rounded-lg bg-muted" />
      ))}
    </div>
  )
}
