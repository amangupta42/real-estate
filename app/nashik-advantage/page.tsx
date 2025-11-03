import { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { Heading } from '@/components/atomic/Heading'
import { NeighborhoodCard } from '@/components/molecules/NeighborhoodCard'
import { Button } from '@/components/ui/button'
import { client } from '@/lib/sanity'
import { allNeighborhoodGuidesQuery } from '@/lib/queries'
import type { NeighborhoodGuide } from '@/types'
import Link from 'next/link'
import { MapPin, TrendingUp, Building2, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nashik Advantage - Why Invest Here | Real Estate',
  description:
    "Discover why Nashik is one of India's fastest-growing real estate markets. Explore neighborhoods, amenities, and investment opportunities.",
}

const advantages = [
  {
    icon: TrendingUp,
    title: 'Rapid Growth',
    description:
      "Nashik is among India's fastest-growing tier-2 cities with robust infrastructure development.",
  },
  {
    icon: Building2,
    title: 'Strategic Location',
    description:
      'Well-connected to Mumbai and Pune via expressways, making it ideal for investment.',
  },
  {
    icon: MapPin,
    title: 'Prime Locations',
    description: 'Multiple emerging localities with excellent connectivity and modern amenities.',
  },
  {
    icon: Users,
    title: 'Quality of Life',
    description: 'Perfect blend of urban amenities and peaceful living with lower cost of living.',
  },
]

export default async function NashikAdvantagePage() {
  const neighborhoods = await client
    .fetch<
      Array<Pick<NeighborhoodGuide, '_id' | 'name' | 'slug' | 'keyAmenities'>>
    >(allNeighborhoodGuidesQuery)
    .catch(() => [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 md:py-28 bg-gradient-to-b from-primary/[0.03] via-background to-background">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              Location Advantage
            </span>
            <Heading as="h1" level="h1" className="mt-6 mb-6">
              Why Invest in Nashik?
            </Heading>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Nashik offers unmatched potential for land investment with its strategic location,
              rapid infrastructure growth, and quality of life that attracts both businesses and
              families.
            </p>
          </div>
        </Container>
      </section>

      {/* Key Advantages */}
      <section className="py-16 border-t border-border/50">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <div
                  key={index}
                  className="rounded-xl border border-border/50 bg-muted/20 p-6 text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-heading font-semibold text-foreground">
                    {advantage.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Neighborhood Guides */}
      <section className="py-16 border-t border-border/50 bg-muted/20">
        <Container>
          <div className="mb-12 text-center">
            <Heading as="h2" level="h2" className="mb-4">
              Explore Neighborhoods
            </Heading>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Discover detailed guides for each locality, including amenities, connectivity, and
              nearby facilities.
            </p>
          </div>

          {neighborhoods.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {neighborhoods.map((neighborhood) => (
                <NeighborhoodCard key={neighborhood._id} neighborhood={neighborhood} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/50 bg-background p-12 text-center">
              <MapPin className="mb-4 h-12 w-12 text-muted-foreground/40" />
              <p className="text-muted-foreground">
                Neighborhood guides coming soon. Check back later!
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-border/50">
        <Container>
          <div className="mx-auto max-w-3xl rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-12 text-center">
            <Heading as="h2" level="h3" className="mb-4">
              Ready to Explore Projects?
            </Heading>
            <p className="mb-8 text-lg text-muted-foreground">
              Browse our portfolio of premium land development projects across Nashik.
            </p>
            <Button size="lg" asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
