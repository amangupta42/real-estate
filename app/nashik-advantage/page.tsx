import { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { Heading } from '@/components/atomic/Heading'
import { NeighborhoodCard } from '@/components/molecules/NeighborhoodCard'
import { StatCard } from '@/components/molecules/StatCard'
import { ExpandableInfoCard } from '@/components/molecules/ExpandableInfoCard'
import { CitationList, Citation } from '@/components/molecules/CitationList'
import { Button } from '@/components/ui/button'
import { client } from '@/lib/sanity'
import { allNeighborhoodGuidesQuery } from '@/lib/queries'
import type { NeighborhoodGuide } from '@/types'
import Link from 'next/link'
import {
  MapPin,
  TrendingUp,
  Building2,
  Users,
  Route,
  Train,
  Plane,
  Factory,
  Briefcase,
  Home,
  BarChart3,
  DollarSign,
  Target,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nashik Advantage - Why Invest Here',
  description:
    "Discover why Nashik is Maharashtra's third-largest industrial hub with 22% real estate growth in 2024. Explore infrastructure, economic opportunities, and market trends with verified data.",
  openGraph: {
    title: 'Nashik Advantage - Investment Opportunities in Maharashtra',
    description:
      'Comprehensive guide to investing in Nashik real estate with market data, ROI statistics, and infrastructure insights.',
    type: 'website',
    locale: 'en_IN',
  },
  keywords: [
    'Nashik real estate',
    'Nashik investment',
    'Mumbai Nagpur Expressway',
    'Nashik IT Park',
    'MIDC Nashik',
    'property rates Nashik',
    'ROI Nashik',
  ],
  alternates: {
    canonical: 'https://ajitjgupta.com/nashik-advantage',
  },
}

const citations: Citation[] = [
  {
    id: 1,
    title: "Nashik's apartment sales rise 22 percent in 2024 as demand outpaces new supply",
    source: 'PropNewsTime',
    date: '2024',
    url: 'https://propnewstime.com',
  },
  {
    id: 2,
    title: 'Property Rates in Nashik: Latest Updates and Trends',
    source: 'Bajaj Finserv',
    date: '2024',
    url: 'https://www.bajajfinserv.in/know-about-property-rates-nashik',
  },
  {
    id: 3,
    title: 'Final Stretch of Mumbai-Nagpur Expressway to Open by March 2025',
    source: 'Construction World',
    date: 'March 2025',
    url: 'https://www.constructionworld.in',
  },
  {
    id: 4,
    title: 'MIDC designates 100 acres in Rajur Bahula for Nashik IT Park',
    source: 'PropNewsTime',
    date: '2024',
    url: 'https://propnewstime.com',
  },
  {
    id: 5,
    title: 'Property Rates in Nashik 2024 | Real Estate Prices and Trends',
    source: 'SBI Realty',
    date: '2024',
    url: 'https://www.sbirealty.in',
  },
  {
    id: 6,
    title: 'Nashik Economy Overview',
    source: 'Nashik District, Government of Maharashtra',
    date: '2024',
    url: 'https://nashik.gov.in/en/about-district/economy/',
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
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-primary/[0.03] via-background to-background">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-6">
              <TrendingUp className="h-4 w-4" />
              Maharashtra's 3rd Largest Industrial Hub
            </span>
            <Heading as="h1" level="h1" className="mb-6">
              The Nashik Advantage
            </Heading>
            <p className="text-xl leading-relaxed text-muted-foreground mb-8">
              Discover why Nashik is emerging as Maharashtra's premier investment destination with
              22% real estate growth, world-class infrastructure, and strategic location just 180 km
              from Mumbai.
            </p>
            <p className="text-sm text-muted-foreground/80">
              All data sourced from government authorities and verified industry reports • Last
              updated: November 2024
            </p>
          </div>
        </Container>
      </section>

      {/* Key Statistics */}
      <section className="py-16 border-t border-border/50">
        <Container>
          <div className="mb-12 text-center">
            <Heading as="h2" level="h2" className="mb-4">
              Market Snapshot 2024
            </Heading>
            <p className="text-muted-foreground">Key statistics driving Nashik's growth story</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<BarChart3 className="h-6 w-6 text-primary" />}
              stat="22%"
              label="Sales Growth"
              description="Apartment sales increased by 22% in 2024 compared to 2023"
              index={0}
            />
            <StatCard
              icon={<DollarSign className="h-6 w-6 text-primary" />}
              stat="₹3,000/sq.ft"
              label="Avg. Price"
              description="Average residential property price with affordable options from ₹15L"
              index={1}
            />
            <StatCard
              icon={<Target className="h-6 w-6 text-primary" />}
              stat="7.2%"
              label="Highest ROI"
              description="Pipeline Road area offers the highest rental returns in Nashik"
              index={2}
            />
            <StatCard
              icon={<Route className="h-6 w-6 text-primary" />}
              stat="180 km"
              label="From Mumbai"
              description="Connected via 8-lane expressway, reducing travel time significantly"
              index={3}
            />
          </div>
        </Container>
      </section>

      {/* Infrastructure & Connectivity */}
      <section className="py-16 border-t border-border/50 bg-muted/10">
        <Container>
          <div className="mb-12 text-center">
            <Heading as="h2" level="h2" className="mb-4">
              World-Class Infrastructure
            </Heading>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Nashik's connectivity is transforming with major infrastructure projects connecting it
              to Mumbai, Pune, and Nagpur
            </p>
          </div>

          <div className="space-y-4">
            <ExpandableInfoCard
              icon={<Route className="h-5 w-5 text-primary" />}
              title="Mumbai-Nagpur Samruddhi Expressway"
              preview="701 km expressway with 76 km connecting Nashik to Mumbai, reducing travel time from 3.5 hours to just 2 hours"
              references={[3]}
              index={0}
              content={
                <>
                  <p>
                    The Mumbai-Nagpur Samruddhi Mahamarg is a game-changing infrastructure project
                    for Nashik. The 76 km stretch connecting Igatpuri (Nashik) to Amane (Thane) was
                    officially inaugurated on June 5, 2025, completing the entire 701 km expressway.
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <strong>Travel Time:</strong> Mumbai to Nashik now takes just 2 hours (reduced
                      from 3.5 hours)
                    </li>
                    <li>
                      <strong>Lane Configuration:</strong> 6-lane wide, expandable to 8 lanes
                    </li>
                    <li>
                      <strong>Type:</strong> Access-controlled expressway with world-class
                      facilities
                    </li>
                    <li>
                      <strong>Impact:</strong> Boosts real estate demand and makes Nashik an ideal
                      location for weekend homes and commercial investments
                    </li>
                  </ul>
                </>
              }
            />

            <ExpandableInfoCard
              icon={<Route className="h-5 w-5 text-primary" />}
              title="Mumbai-Nashik Route Expansion"
              preview="Existing 4-lane highway being upgraded to 8 lanes, completed by end of 2024"
              references={[3]}
              index={1}
              content={
                <>
                  <p>
                    The government is developing the existing four-lane Mumbai-Nashik highway into
                    eight lanes. Work started in 2023, and the highway extension was completed by
                    the end of 2024, providing additional connectivity options.
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <strong>Current Status:</strong> Completed (December 2024)
                    </li>
                    <li>
                      <strong>Benefit:</strong> Reduced congestion and improved traffic flow
                    </li>
                    <li>
                      <strong>Impact:</strong> Enhanced accessibility for daily commuters and
                      logistics operations
                    </li>
                  </ul>
                </>
              }
            />

            <ExpandableInfoCard
              icon={<Train className="h-5 w-5 text-primary" />}
              title="Railway Connectivity"
              preview="Well-connected to major cities with regular train services and upcoming high-speed rail corridor"
              references={[6]}
              index={2}
              content={
                <>
                  <p>
                    Nashik is well-connected via the Central Railway network, with Nashik Road being
                    a major railway junction. The city has excellent rail connectivity to Mumbai,
                    Pune, Delhi, and other major metros.
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <strong>Major Stations:</strong> Nashik Road, Nashik City, Deolali
                    </li>
                    <li>
                      <strong>Frequency:</strong> Multiple daily trains to Mumbai (10+), Pune (5+)
                    </li>
                    <li>
                      <strong>Travel Time:</strong> 3-4 hours to Mumbai, 4-5 hours to Pune via rail
                    </li>
                    <li>
                      <strong>Future:</strong> Proposed high-speed rail corridor to further reduce
                      travel time
                    </li>
                  </ul>
                </>
              }
            />

            <ExpandableInfoCard
              icon={<Plane className="h-5 w-5 text-primary" />}
              title="Airport Development"
              preview="Gandhinagar Airport operational with domestic flights, with plans for expansion and international connectivity"
              references={[6]}
              index={3}
              content={
                <>
                  <p>
                    Nashik's Gandhinagar (Ozar) Airport is operational and serves domestic flights.
                    The airport is undergoing expansion to accommodate more flights and potentially
                    international connectivity in the future.
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <strong>Distance:</strong> 20 km from Nashik city center
                    </li>
                    <li>
                      <strong>Current Operations:</strong> Domestic flights to major metros
                    </li>
                    <li>
                      <strong>Future Plans:</strong> Expansion for international flights
                    </li>
                    <li>
                      <strong>Additional Connectivity:</strong> Mumbai's Navi Mumbai International
                      Airport (operational 2025) just 180 km away
                    </li>
                  </ul>
                </>
              }
            />
          </div>
        </Container>
      </section>

      {/* Economic Growth */}
      <section className="py-16 border-t border-border/50">
        <Container>
          <div className="mb-12 text-center">
            <Heading as="h2" level="h2" className="mb-4">
              Thriving Economic Hub
            </Heading>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Maharashtra's third-largest industrial center with diverse industries and emerging IT
              sector
            </p>
          </div>

          <div className="space-y-4">
            <ExpandableInfoCard
              icon={<Briefcase className="h-5 w-5 text-primary" />}
              title="New IT Park in Rajur Bahula"
              preview="100-acre IT park allocation by MIDC to transform Nashik into a technology hub, generating thousands of jobs"
              references={[4]}
              index={0}
              content={
                <>
                  <p>
                    The Maharashtra Industrial Development Corporation (MIDC) has allocated 100
                    acres in Rajur Bahula, located 20 km from Nashik city, for establishing a new
                    state-of-the-art IT park.
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <strong>Total Land Acquisition:</strong> 350 acres for industrial use, 100
                      acres for IT Park
                    </li>
                    <li>
                      <strong>Location Advantage:</strong> Close to Samruddhi Expressway, excellent
                      connectivity
                    </li>
                    <li>
                      <strong>Job Creation:</strong> Expected to generate thousands of direct and
                      indirect employment opportunities
                    </li>
                    <li>
                      <strong>Impact:</strong> Retain skilled professionals who previously migrated
                      to larger cities
                    </li>
                    <li>
                      <strong>Facilities:</strong> Research centers, data centers, training
                      institutes planned
                    </li>
                  </ul>
                </>
              }
            />

            <ExpandableInfoCard
              icon={<Factory className="h-5 w-5 text-primary" />}
              title="Major Industrial Areas (MIDC)"
              preview="Maharashtra's 3rd industrial hub after Mumbai and Pune, with 6 established MIDC areas"
              references={[6]}
              index={1}
              content={
                <>
                  <p>
                    Nashik ranks as Maharashtra's third-largest industrial hub, hosting diverse
                    manufacturing and processing industries across multiple MIDC areas.
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <strong>Existing Industrial Areas:</strong> Satpur, Ambad, Sinnar, Igatpuri,
                      Dindori, Vinchur
                    </li>
                    <li>
                      <strong>Proposed Areas:</strong> Additional Sinnar, Malegaon MIDC
                    </li>
                    <li>
                      <strong>Key Industries:</strong> Auto parts, pharmaceuticals, food processing,
                      textiles
                    </li>
                    <li>
                      <strong>Ambad MIDC:</strong> Rapidly becoming a go-to destination for IT and
                      software development companies
                    </li>
                    <li>
                      <strong>Employment:</strong> Major source of jobs for the region's workforce
                    </li>
                  </ul>
                </>
              }
            />

            <ExpandableInfoCard
              icon={<Building2 className="h-5 w-5 text-primary" />}
              title="Diverse Industry Base"
              preview="Strong presence of auto, pharma, food processing, and wine production industries"
              references={[6]}
              index={2}
              content={
                <>
                  <p>
                    Nashik's economy is powered by a diverse industrial base, making it resilient to
                    economic fluctuations and providing multiple growth drivers.
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <strong>Wine Capital of India:</strong> Over 50% of India's wine production
                      comes from Nashik
                    </li>
                    <li>
                      <strong>Automotive:</strong> Major auto component manufacturers with supply to
                      leading OEMs
                    </li>
                    <li>
                      <strong>Pharmaceuticals:</strong> Growing pharma industry with R&D facilities
                    </li>
                    <li>
                      <strong>Food Processing:</strong> Leveraging agricultural hinterland for
                      agro-processing
                    </li>
                    <li>
                      <strong>Emerging Sectors:</strong> IT/IT ES, renewable energy, logistics
                    </li>
                  </ul>
                </>
              }
            />
          </div>
        </Container>
      </section>

      {/* Real Estate Market Data */}
      <section className="py-16 border-t border-border/50 bg-muted/10">
        <Container>
          <div className="mb-12 text-center">
            <Heading as="h2" level="h2" className="mb-4">
              Real Estate Market Insights
            </Heading>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Comprehensive market data showing strong growth trajectory and investment potential
            </p>
          </div>

          <div className="space-y-4">
            <ExpandableInfoCard
              icon={<TrendingUp className="h-5 w-5 text-primary" />}
              title="Strong Market Growth (22% YoY)"
              preview="Apartment sales rose 22% in 2024 while new supply dropped 30%, indicating strong demand"
              references={[1]}
              index={0}
              content={
                <>
                  <p>
                    Nashik's real estate market demonstrated robust growth in 2024, with apartment
                    sales increasing by 22% compared to 2023. Simultaneously, new supply decreased
                    by 30% from 6,205 units in 2023 to 4,325 units in 2024.
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <strong>Sales Growth:</strong> 22% increase in apartment sales (2024 vs. 2023)
                    </li>
                    <li>
                      <strong>Supply Shortage:</strong> 30% decrease in new units, from 6,205 to
                      4,325 units
                    </li>
                    <li>
                      <strong>Market Dynamics:</strong> Demand outpacing supply creates favorable
                      conditions for investors
                    </li>
                    <li>
                      <strong>Inventory:</strong> Substantial decrease in unsold inventory indicates
                      healthy market
                    </li>
                  </ul>
                </>
              }
            />

            <ExpandableInfoCard
              icon={<DollarSign className="h-5 w-5 text-primary" />}
              title="Affordable Property Rates"
              preview="Average ₹3,000/sq.ft with 2 BHK flats from ₹20L to ₹80L - significantly lower than Mumbai/Pune"
              references={[2, 5]}
              index={1}
              content={
                <>
                  <p>
                    Nashik offers exceptional value for money with property rates significantly
                    lower than Mumbai and Pune, while providing similar amenities and quality of
                    life.
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <strong>Average Residential:</strong> ₹3,000 per sq.ft (varies by location)
                    </li>
                    <li>
                      <strong>2 BHK Apartments:</strong> ₹20 Lakhs to ₹80 Lakhs depending on
                      location and amenities
                    </li>
                    <li>
                      <strong>Commercial Property:</strong> ₹4,000 to ₹7,000 per sq.ft in prime
                      locations (Ambad, Satpur, Pathardi Phata)
                    </li>
                    <li>
                      <strong>Land Rates:</strong> ₹500 to ₹5,000 per sq.ft in prime areas; ₹200+
                      per sq.ft in developing regions
                    </li>
                    <li>
                      <strong>Affordable Housing:</strong> Options starting from ₹15 Lakhs
                    </li>
                  </ul>
                </>
              }
            />

            <ExpandableInfoCard
              icon={<Target className="h-5 w-5 text-primary" />}
              title="High ROI & Rental Yields"
              preview="Pipeline Road offers 7.2% rental yield, with multiple localities showing 5%+ returns"
              references={[2, 5]}
              index={2}
              content={
                <>
                  <p>
                    Nashik offers attractive rental yields and capital appreciation potential,
                    making it an excellent choice for both end-users and investors.
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <strong>Pipeline Road:</strong> 7.2% rental yield (highest in Nashik)
                    </li>
                    <li>
                      <strong>Pathardi:</strong> 5.7% rental yield
                    </li>
                    <li>
                      <strong>Indira Nagar:</strong> 5.2% rental yield + 8.5% price appreciation
                      (3-year)
                    </li>
                    <li>
                      <strong>Deolali Gaon:</strong> 5.0% rental yield
                    </li>
                    <li>
                      <strong>Panchavati:</strong> 4.4% rental yield
                    </li>
                  </ul>
                </>
              }
            />

            <ExpandableInfoCard
              icon={<Home className="h-5 w-5 text-primary" />}
              title="Top Appreciating Localities"
              preview="Nashik Road (13.5%), Pathardi Phata (11.1%), and Indira Nagar (8.5%) lead price growth"
              references={[2, 5]}
              index={3}
              content={
                <>
                  <p>
                    Several localities in Nashik have shown exceptional price appreciation over the
                    past 3 years, driven by infrastructure improvements and increasing demand.
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <strong>Nashik Road:</strong> 13.5% price appreciation (3-year CAGR)
                    </li>
                    <li>
                      <strong>Pathardi Phata:</strong> 11.1% price appreciation
                    </li>
                    <li>
                      <strong>Indira Nagar:</strong> 8.5% price appreciation
                    </li>
                    <li>
                      <strong>Growth Drivers:</strong> Improved connectivity, new infrastructure,
                      increasing employment opportunities
                    </li>
                    <li>
                      <strong>Future Outlook:</strong> Expected to continue strong performance with
                      expressway completion
                    </li>
                  </ul>
                </>
              }
            />
          </div>
        </Container>
      </section>

      {/* Neighborhood Guides */}
      {neighborhoods.length > 0 && (
        <section className="py-16 border-t border-border/50">
          <Container>
            <div className="mb-12 text-center">
              <Heading as="h2" level="h2" className="mb-4">
                Explore Neighborhoods
              </Heading>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Discover detailed guides for each locality, including amenities, connectivity, and
                nearby facilities
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {neighborhoods.map((neighborhood) => (
                <NeighborhoodCard key={neighborhood._id} neighborhood={neighborhood} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* References */}
      <section className="py-16 border-t border-border/50 bg-muted/10">
        <Container>
          <CitationList citations={citations} />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-border/50">
        <Container>
          <div className="mx-auto max-w-3xl rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-12 text-center">
            <Heading as="h2" level="h3" className="mb-4">
              Ready to Invest in Nashik?
            </Heading>
            <p className="mb-8 text-lg text-muted-foreground">
              Explore our portfolio of RERA-certified land development projects across Nashik's
              prime locations.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/projects">View All Projects</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Schedule Site Visit</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
