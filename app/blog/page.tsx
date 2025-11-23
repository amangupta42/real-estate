import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Heading } from '@/components/atomic/Heading'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Real Estate Investment Blog | Land Buying Guides - Nashik',
  description:
    'Expert insights on land investment, RERA compliance, property buying in Nashik, Maharashtra. Learn about real estate trends, financing options, and investment strategies.',
  keywords: [
    'real estate blog',
    'land investment guide',
    'RERA compliance',
    'Nashik property',
    'plot buying tips',
    'real estate investment India',
  ],
  openGraph: {
    title: 'Real Estate Investment Blog - Ajit J Gupta and Associates',
    description:
      'Expert insights on land investment, RERA compliance, and property buying in Nashik.',
    type: 'website',
    url: 'https://ajitjgupta.com/blog',
  },
  alternates: {
    canonical: 'https://ajitjgupta.com/blog',
  },
}

// Blog posts data (In production, this would come from Sanity CMS)
const blogPosts = [
  {
    slug: 'complete-guide-buying-land-maharashtra',
    title: 'Complete Guide to Buying Land in Maharashtra 2024',
    excerpt:
      'Everything you need to know about purchasing land in Maharashtra, from documentation to legal compliance, stamp duty, and registration process.',
    category: 'Legal & Documentation',
    readTime: '10 min read',
    publishedDate: '2024-01-15',
    author: 'Ajit J Gupta',
    image: '/blog/land-buying-guide.jpg',
  },
  {
    slug: 'understanding-rera-compliance',
    title: "Understanding RERA Compliance: A Buyer's Guide",
    excerpt:
      'Learn about RERA regulations, how to verify RERA certification, buyer rights, and why RERA compliance is crucial for your land investment.',
    category: 'RERA & Compliance',
    readTime: '8 min read',
    publishedDate: '2024-01-20',
    author: 'Legal Team',
    image: '/blog/rera-guide.jpg',
  },
  {
    slug: 'nashik-real-estate-market-trends-2024',
    title: 'Nashik Real Estate Market Trends & Investment Outlook 2024',
    excerpt:
      'Comprehensive analysis of Nashik property market, growth projections, emerging localities, and why Nashik is the next big investment destination.',
    category: 'Market Analysis',
    readTime: '12 min read',
    publishedDate: '2024-02-01',
    author: 'Market Research Team',
    image: '/blog/nashik-market-trends.jpg',
  },
  {
    slug: 'stamp-duty-registration-charges-maharashtra',
    title: 'Stamp Duty and Registration Charges in Maharashtra: Complete Breakdown',
    excerpt:
      'Detailed guide on stamp duty rates for men and women, registration fees, calculation methods, and how to save on property transaction costs.',
    category: 'Legal & Documentation',
    readTime: '7 min read',
    publishedDate: '2024-02-10',
    author: 'Finance Team',
    image: '/blog/stamp-duty-guide.jpg',
  },
  {
    slug: 'plot-vs-apartment-investment-comparison',
    title: 'Plot vs Apartment: Which is a Better Investment in 2024?',
    excerpt:
      'Comprehensive comparison of plot and apartment investments, analyzing ROI, appreciation potential, maintenance costs, and liquidity factors.',
    category: 'Investment Strategies',
    readTime: '9 min read',
    publishedDate: '2024-02-15',
    author: 'Investment Advisory',
    image: '/blog/plot-vs-apartment.jpg',
  },
  {
    slug: 'land-loan-options-financing-guide',
    title: 'Land Loan Options: Complete Financing Guide for Plot Purchase',
    excerpt:
      'Explore different land loan options, eligibility criteria, interest rates, documentation, and tips to get the best financing deal for your plot purchase.',
    category: 'Financing',
    readTime: '11 min read',
    publishedDate: '2024-02-20',
    author: 'Finance Team',
    image: '/blog/land-loan-guide.jpg',
  },
  {
    slug: 'due-diligence-checklist-land-purchase',
    title: '15-Point Due Diligence Checklist Before Buying Land',
    excerpt:
      'Essential due diligence steps including title verification, encumbrance check, land use verification, and other critical checks before purchasing land.',
    category: 'Legal & Documentation',
    readTime: '10 min read',
    publishedDate: '2024-03-01',
    author: 'Legal Team',
    image: '/blog/due-diligence.jpg',
  },
  {
    slug: 'tax-benefits-land-investment-india',
    title: 'Tax Benefits and Implications of Land Investment in India',
    excerpt:
      'Understand capital gains tax, indexation benefits, exemptions under Section 54F, and how to optimize your tax liability on land investments.',
    category: 'Taxation',
    readTime: '8 min read',
    publishedDate: '2024-03-05',
    author: 'Tax Advisory',
    image: '/blog/tax-benefits.jpg',
  },
]

const categories = [
  'All Categories',
  'Legal & Documentation',
  'RERA & Compliance',
  'Market Analysis',
  'Investment Strategies',
  'Financing',
  'Taxation',
]

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-primary/10 via-background to-background pt-24 pb-12">
        <Container>
          <div className="max-w-3xl">
            <Badge className="mb-4">Investment Insights</Badge>
            <Heading level="h1" className="mb-4">
              Real Estate Investment Blog
            </Heading>
            <p className="text-xl text-muted-foreground">
              Expert insights, guides, and market analysis to help you make informed land investment
              decisions in Nashik and Maharashtra.
            </p>
          </div>
        </Container>
      </Section>

      {/* Categories */}
      <Section className="py-8 border-b">
        <Container>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="whitespace-nowrap cursor-pointer hover:bg-primary hover:text-white transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </Container>
      </Section>

      {/* Blog Posts Grid */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <span className="text-sm">Blog Image</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <time dateTime={post.publishedDate}>
                          {new Date(post.publishedDate).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter CTA */}
      <Section className="bg-primary/5">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Heading level="h2" className="mb-4">
              Stay Updated with Market Insights
            </Heading>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for exclusive real estate tips, market updates, and
              investment opportunities in Nashik.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
