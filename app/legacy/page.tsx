import { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { Heading } from '@/components/atomic/Heading'
import { TeamMemberCard } from '@/components/molecules/TeamMemberCard'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity'
import { legacyPageQuery } from '@/lib/queries'
import type { LegacyPage } from '@/types'
import { Award, Target, Users, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Legacy - About Us | Real Estate',
  description:
    'Learn about our journey, mission, and the team behind premium land development in Nashik. Building communities, creating value since inception.',
}

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to the highest standards in land development and customer service.',
  },
  {
    icon: Target,
    title: 'Integrity',
    description: 'Transparent dealings and honest communication with all stakeholders.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building not just properties, but thriving communities for generations.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'Leveraging modern techniques and technology for superior project delivery.',
  },
]

export default async function LegacyPage() {
  const legacyData = await client.fetch<LegacyPage>(legacyPageQuery).catch(() => null)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 md:py-28 bg-gradient-to-b from-primary/[0.03] via-background to-background">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              About Us
            </span>
            <Heading as="h1" level="h1" className="mt-6 mb-6">
              {legacyData?.pageTitle || 'Our Legacy'}
            </Heading>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Building dreams, creating communities, and delivering excellence in land development
              across Nashik and surrounding regions.
            </p>
          </div>
        </Container>
      </section>

      {/* Founder's Story */}
      {legacyData?.founderStory &&
        Array.isArray(legacyData.founderStory) &&
        legacyData.founderStory.length > 0 && (
          <section className="py-16 border-t border-border/50">
            <Container>
              <div className="mx-auto max-w-3xl">
                <Heading as="h2" level="h2" className="mb-8 text-center">
                  Our Story
                </Heading>
                <div className="prose prose-slate prose-lg max-w-none text-muted-foreground">
                  <PortableText value={legacyData.founderStory} />
                </div>
              </div>
            </Container>
          </section>
        )}

      {/* Company Mission */}
      {legacyData?.companyMission &&
        Array.isArray(legacyData.companyMission) &&
        legacyData.companyMission.length > 0 && (
          <section className="py-16 border-t border-border/50 bg-muted/20">
            <Container>
              <div className="mx-auto max-w-3xl">
                <Heading as="h2" level="h2" className="mb-8 text-center">
                  Our Mission
                </Heading>
                <div className="rounded-xl border border-border/50 bg-background p-8 md:p-12">
                  <div className="prose prose-slate prose-lg max-w-none text-muted-foreground">
                    <PortableText value={legacyData.companyMission} />
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )}

      {/* Core Values */}
      <section className="py-16 border-t border-border/50">
        <Container>
          <Heading as="h2" level="h2" className="mb-12 text-center">
            Our Values
          </Heading>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="rounded-xl border border-border/50 bg-muted/20 p-6 text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-heading font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Team Members */}
      {legacyData?.teamMembers && legacyData.teamMembers.length > 0 && (
        <section className="py-16 border-t border-border/50 bg-muted/20">
          <Container>
            <Heading as="h2" level="h2" className="mb-12 text-center">
              Meet Our Team
            </Heading>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {legacyData.teamMembers.map((member, index) => (
                <TeamMemberCard key={index} member={member} index={index} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16 border-t border-border/50">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 sm:grid-cols-3 text-center">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary">15+</div>
                <p className="text-sm text-muted-foreground">Years of Excellence</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary">50+</div>
                <p className="text-sm text-muted-foreground">Projects Delivered</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary">
                  1000+
                </div>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
