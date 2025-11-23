import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Heading } from '@/components/atomic/Heading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MapPin, TrendingUp, Building2, TrainFront, School, Hospital } from 'lucide-react'
import { LocalBusinessWithRatingSchema } from '@/components/molecules/EnhancedStructuredData'

// Define localities data
const localities = {
  'nashik-road': {
    name: 'Nashik Road',
    slug: 'nashik-road',
    description:
      'Nashik Road is a rapidly developing area with excellent connectivity to Mumbai-Nagpur Expressway and Nashik city center. Known for industrial growth and residential development.',
    metaDescription:
      'Find premium plots and land for sale in Nashik Road. RERA certified properties with 13.5% appreciation. Near Mumbai-Nagpur Expressway.',
    appreciation: '13.5%',
    connectivity: [
      'Mumbai-Nagpur Expressway - 5 km',
      'Nashik Railway Station - 8 km',
      'Ojhar Airport - 15 km',
      'Nashik City Center - 10 km',
    ],
    infrastructure: [
      { icon: School, name: 'Schools', items: ['DAV Public School', 'Kendriya Vidyalaya'] },
      { icon: Hospital, name: 'Hospitals', items: ['Wockhardt Hospital', 'Ashoka Medicover'] },
      { icon: Building2, name: 'Shopping', items: ['City Center Mall', 'Reliance Mart'] },
      { icon: TrainFront, name: 'Transport', items: ['MSRTC Bus Stand', 'Railway Station'] },
    ],
    keyHighlights: [
      'Strategic location on Mumbai-Nagpur Expressway',
      'Major industrial hub with MIDC proximity',
      '13.5% average property appreciation (2023-2024)',
      'Excellent infrastructure and amenities',
      'Growing residential and commercial demand',
    ],
    investmentRationale:
      'Nashik Road presents exceptional investment opportunities due to its strategic location, robust infrastructure development, and proximity to industrial zones. The area has witnessed consistent growth in property values and is poised for further development with upcoming infrastructure projects.',
    coordinates: { lat: 19.9975, lng: 73.7898 },
  },
  'pathardi-phata': {
    name: 'Pathardi Phata',
    slug: 'pathardi-phata',
    description:
      'Pathardi Phata is an emerging locality in Nashik with excellent growth potential. Close to major highways and industrial areas, making it ideal for investment.',
    metaDescription:
      'Explore plots and land in Pathardi Phata, Nashik. Premium RERA certified properties with 11.1% appreciation. Ideal for residential and investment.',
    appreciation: '11.1%',
    connectivity: [
      'Nashik-Pune Highway - 2 km',
      'Nashik City Center - 12 km',
      'MIDC Satpur - 8 km',
      'Ojhar Airport - 20 km',
    ],
    infrastructure: [
      { icon: School, name: 'Schools', items: ['Pathardi Public School', 'St. Joseph School'] },
      {
        icon: Hospital,
        name: 'Hospitals',
        items: ['Community Health Center', 'Jeevan Jyoti Hospital'],
      },
      { icon: Building2, name: 'Shopping', items: ['Local Markets', 'Shopping Complex'] },
      { icon: TrainFront, name: 'Transport', items: ['Bus Services', 'Auto Stand'] },
    ],
    keyHighlights: [
      'Proximity to Nashik-Pune Highway',
      'Emerging residential development area',
      '11.1% average property appreciation (2023-2024)',
      'Affordable land prices with high ROI potential',
      'Peaceful environment away from city congestion',
    ],
    investmentRationale:
      'Pathardi Phata offers excellent value for long-term investors. With growing infrastructure development and increasing connectivity, the area is expected to witness significant appreciation in the coming years. Perfect for those looking for affordable plots with strong growth potential.',
    coordinates: { lat: 19.9147, lng: 73.7632 },
  },
  sinnar: {
    name: 'Sinnar',
    slug: 'sinnar',
    description:
      'Sinnar is a town in Nashik district known for its industrial development and agricultural prosperity. Excellent infrastructure and connectivity make it a prime investment destination.',
    metaDescription:
      'Premium plots and agricultural land in Sinnar, Nashik. RERA certified properties near industrial zones. High ROI potential.',
    appreciation: '9.8%',
    connectivity: [
      'Mumbai-Agra Highway (NH-160) - 3 km',
      'Nashik City - 30 km',
      'Shirdi - 40 km',
      'MIDC Sinnar - 5 km',
    ],
    infrastructure: [
      { icon: School, name: 'Schools', items: ['Sinnar High School', 'Modern School'] },
      { icon: Hospital, name: 'Hospitals', items: ['Rural Hospital Sinnar', 'Private Clinics'] },
      { icon: Building2, name: 'Shopping', items: ['Sinnar Market', 'Local Bazaar'] },
      { icon: TrainFront, name: 'Transport', items: ['Bus Depot', 'Railway Connectivity'] },
    ],
    keyHighlights: [
      'Major industrial hub with MIDC',
      'Agricultural prosperity and food processing industries',
      '9.8% average property appreciation',
      'Excellent highway connectivity',
      'Growing residential and commercial demand',
    ],
    investmentRationale:
      'Sinnar combines industrial growth with agricultural prosperity, making it a balanced investment destination. The presence of major industries and food processing units ensures steady demand for residential and commercial properties.',
    coordinates: { lat: 19.8449, lng: 73.9976 },
  },
  satpur: {
    name: 'Satpur',
    slug: 'satpur',
    description:
      'Satpur is home to the largest industrial estate in Nashik (MIDC Satpur). Major manufacturing hub with excellent investment potential for industrial and residential plots.',
    metaDescription:
      'Industrial and residential plots in Satpur MIDC, Nashik. Premium land near manufacturing zones. High rental yield and appreciation.',
    appreciation: '10.5%',
    connectivity: [
      'Nashik City Center - 15 km',
      'Mumbai-Agra Highway - 8 km',
      'Ojhar Airport - 12 km',
      'Nashik Railway Station - 18 km',
    ],
    infrastructure: [
      { icon: School, name: 'Schools', items: ['Satpur School', 'MIDC School'] },
      {
        icon: Hospital,
        name: 'Hospitals',
        items: ['MIDC Hospital', 'Satpur Health Center'],
      },
      { icon: Building2, name: 'Shopping', items: ['MIDC Market', 'Shopping Areas'] },
      { icon: TrainFront, name: 'Transport', items: ['MSRTC Depot', 'Auto Services'] },
    ],
    keyHighlights: [
      'Largest industrial estate in Nashik',
      'Home to major manufacturing companies',
      '10.5% average property appreciation',
      'High rental demand from industrial workers',
      'Excellent infrastructure within MIDC area',
    ],
    investmentRationale:
      'Satpur MIDC is the industrial backbone of Nashik, hosting numerous national and international companies. This ensures steady demand for residential plots and rental properties, making it ideal for investors seeking rental income and capital appreciation.',
    coordinates: { lat: 19.9974, lng: 73.6821 },
  },
}

type LocalitySlug = keyof typeof localities

export async function generateStaticParams() {
  return Object.keys(localities).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const locality = localities[params.slug as LocalitySlug]

  if (!locality) {
    return {
      title: 'Locality Not Found',
    }
  }

  return {
    title: `Plots for Sale in ${locality.name} | RERA Certified Land - Nashik`,
    description: locality.metaDescription,
    keywords: [
      `${locality.name} plots`,
      `${locality.name} land for sale`,
      `${locality.name} real estate`,
      `${locality.name} property`,
      'Nashik plots',
      'RERA certified plots',
      `${locality.name} investment`,
    ],
    openGraph: {
      title: `Premium Plots in ${locality.name} - Ajit J Gupta and Associates`,
      description: locality.metaDescription,
      type: 'website',
      url: `https://ajitjgupta.com/localities/${params.slug}`,
      images: ['/og-image-template.svg'],
    },
    alternates: {
      canonical: `https://ajitjgupta.com/localities/${params.slug}`,
    },
  }
}

export default function LocalityPage({ params }: { params: { slug: string } }) {
  const locality = localities[params.slug as LocalitySlug]

  if (!locality) {
    notFound()
  }

  return (
    <>
      {/* Structured Data */}
      <LocalBusinessWithRatingSchema
        name={`Ajit J Gupta and Associates - ${locality.name}`}
        description={locality.description}
        url={`https://ajitjgupta.com/localities/${params.slug}`}
        telephone="+919876543210"
        email="info@ajitjgupta.com"
        address={{
          streetAddress: 'Nashik',
          addressLocality: locality.name,
          addressRegion: 'Maharashtra',
          postalCode: '422001',
          addressCountry: 'IN',
        }}
        geo={{
          latitude: locality.coordinates.lat,
          longitude: locality.coordinates.lng,
        }}
        aggregateRating={{
          ratingValue: 4.8,
          reviewCount: 150,
        }}
      />

      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-primary/10 via-background to-background pt-24 pb-12">
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Nashik, Maharashtra</span>
            </div>
            <Heading level="h1" className="mb-4">
              Premium Plots for Sale in {locality.name}
            </Heading>
            <p className="text-xl text-muted-foreground mb-6">{locality.description}</p>

            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-muted-foreground">Appreciation</div>
                  <div className="text-lg font-semibold text-green-600">
                    {locality.appreciation}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Link href="/projects">
                <Button size="lg">View Available Plots</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Schedule Site Visit
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Key Highlights */}
      <Section>
        <Container>
          <Heading level="h2" className="mb-8">
            Why Invest in {locality.name}?
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locality.keyHighlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-foreground">{highlight}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Connectivity */}
      <Section className="bg-muted/30">
        <Container>
          <Heading level="h2" className="mb-8">
            Connectivity & Location
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locality.connectivity.map((connection, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{connection}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Infrastructure */}
      <Section>
        <Container>
          <Heading level="h2" className="mb-8">
            Infrastructure & Amenities
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locality.infrastructure.map((infra, index) => {
              const Icon = infra.icon
              return (
                <div key={index} className="p-6 border rounded-lg">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-3">{infra.name}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {infra.items.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Investment Rationale */}
      <Section className="bg-primary/5">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Heading level="h2" className="mb-6">
              Investment Opportunity
            </Heading>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {locality.investmentRationale}
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg">Speak with Investment Advisor</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section>
        <Container>
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-8 md:p-12 text-center">
            <Heading level="h2" className="text-white mb-4">
              Find Your Perfect Plot in {locality.name}
            </Heading>
            <p className="text-lg mb-8 text-white/90">
              Browse our RERA-certified projects and secure your investment today
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/projects">
                <Button size="lg" variant="secondary">
                  View All Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white hover:bg-white/20"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
