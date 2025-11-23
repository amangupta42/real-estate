import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Heading } from '@/components/atomic/Heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { HowToSchema } from '@/components/molecules/EnhancedStructuredData'

// Sample blog post data (In production, fetch from Sanity CMS)
const blogPosts: Record<string, any> = {
  'complete-guide-buying-land-maharashtra': {
    title: 'Complete Guide to Buying Land in Maharashtra 2024',
    excerpt:
      'Everything you need to know about purchasing land in Maharashtra, from documentation to legal compliance.',
    content: `
      <h2>Introduction to Land Purchase in Maharashtra</h2>
      <p>Buying land in Maharashtra is a significant investment decision that requires thorough understanding of legal processes, documentation, and market dynamics. This comprehensive guide will walk you through every step of the land buying process.</p>

      <h2>1. Determine Your Purpose and Budget</h2>
      <p>Before starting your search, clearly define why you're buying land:</p>
      <ul>
        <li><strong>Residential construction:</strong> Building your dream home</li>
        <li><strong>Investment:</strong> Capital appreciation over time</li>
        <li><strong>Commercial use:</strong> Business or rental income</li>
        <li><strong>Agricultural purposes:</strong> Farming or agricultural activities</li>
      </ul>

      <h2>2. Research and Location Selection</h2>
      <p>Nashik offers excellent opportunities with strategic locations near:</p>
      <ul>
        <li>Mumbai-Nagpur Expressway for excellent connectivity</li>
        <li>MIDC industrial zones for employment and rental demand</li>
        <li>Emerging localities like Nashik Road and Pathardi Phata</li>
      </ul>

      <h2>3. Verify RERA Registration</h2>
      <p>All real estate projects in Maharashtra must be RERA registered. Check:</p>
      <ul>
        <li>RERA registration number on maharera.mahaonline.gov.in</li>
        <li>Project details, approvals, and timeline</li>
        <li>Developer's track record and previous projects</li>
      </ul>

      <h2>4. Document Verification Checklist</h2>
      <p>Critical documents to verify before purchase:</p>
      <ul>
        <li><strong>Title Deed:</strong> Establishes ownership history</li>
        <li><strong>7/12 Extract:</strong> Land records (Satbara Utara)</li>
        <li><strong>Property Card (8A):</strong> Mutation entry</li>
        <li><strong>Encumbrance Certificate:</strong> Confirms no legal dues</li>
        <li><strong>Non-Agricultural (NA) Order:</strong> For non-agricultural use</li>
        <li><strong>Layout Approval:</strong> From local development authority</li>
      </ul>

      <h2>5. Stamp Duty and Registration</h2>
      <p>Maharashtra stamp duty rates (2024):</p>
      <ul>
        <li><strong>Male buyers:</strong> 7% stamp duty</li>
        <li><strong>Female buyers:</strong> 6% stamp duty (1% concession)</li>
        <li><strong>Registration fee:</strong> 1% of property value</li>
      </ul>
      <p>Consider registering in a woman's name to save 1% on stamp duty!</p>

      <h2>6. Financing Options</h2>
      <p>Land purchase financing options include:</p>
      <ul>
        <li>Plot loans from banks (typically 70-80% LTV)</li>
        <li>Interest rates: 8.5% - 12% per annum</li>
        <li>Tenure: Up to 15-20 years</li>
        <li>Documentation: Income proof, property papers, ID proof</li>
      </ul>

      <h2>7. Due Diligence Process</h2>
      <p>Professional verification steps:</p>
      <ol>
        <li>Hire a lawyer to verify title and documents</li>
        <li>Conduct physical site inspection</li>
        <li>Check for encroachments or disputes</li>
        <li>Verify access to basic infrastructure</li>
        <li>Confirm zoning and land use permissions</li>
      </ol>

      <h2>8. Booking and Payment Process</h2>
      <p>Typical payment structure:</p>
      <ul>
        <li>Token/booking amount: ₹10,000 - ₹50,000</li>
        <li>Down payment: 10-20% within 30 days</li>
        <li>Remaining amount: As per payment plan (lump sum or installments)</li>
      </ul>

      <h2>9. Registration Process</h2>
      <p>Steps for property registration in Maharashtra:</p>
      <ol>
        <li>Draft sale deed with lawyer's assistance</li>
        <li>Pay stamp duty online or through authorized banks</li>
        <li>Submit documents at Sub-Registrar office</li>
        <li>Both parties present with ID proof and witnesses</li>
        <li>Biometric verification and deed signing</li>
        <li>Receive registered sale deed within 7 days</li>
      </ol>

      <h2>10. Post-Purchase Formalities</h2>
      <p>After registration, complete these steps:</p>
      <ul>
        <li>Update mutation records (7/12 and Property Card)</li>
        <li>Apply for electricity and water connections</li>
        <li>Pay property tax to local municipal corporation</li>
        <li>Obtain building plan approval (if constructing)</li>
      </ul>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li>Skipping legal verification to save costs</li>
        <li>Not checking RERA registration</li>
        <li>Ignoring zoning regulations and land use restrictions</li>
        <li>Paying in cash without proper receipts</li>
        <li>Not reading payment terms and cancellation clauses</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Buying land in Maharashtra is straightforward if you follow proper procedures and conduct thorough due diligence. Work with reputable developers, verify all documents, and take professional legal advice to ensure a smooth transaction.</p>

      <p>At Ajit J Gupta and Associates, all our projects are 100% RERA certified with verified documentation and clear titles. Contact us for hassle-free land purchase in Nashik.</p>
    `,
    category: 'Legal & Documentation',
    readTime: '10 min read',
    publishedDate: '2024-01-15',
    author: {
      name: 'Ajit J Gupta',
      bio: 'Founder, Ajit J Gupta and Associates',
    },
  },
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = blogPosts[params.slug]

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  return {
    title: `${post.title} | Ajit J Gupta and Associates Blog`,
    description: post.excerpt,
    keywords: [
      'land buying guide',
      'Maharashtra property',
      'RERA compliance',
      'real estate documentation',
      'Nashik land purchase',
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author.name],
      url: `https://ajitjgupta.com/blog/${params.slug}`,
    },
    alternates: {
      canonical: `https://ajitjgupta.com/blog/${params.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    notFound()
  }

  // Extract steps for How-To schema
  const steps = [
    {
      name: 'Determine Purpose and Budget',
      text: 'Define why you are buying land and establish a realistic budget for your purchase.',
    },
    {
      name: 'Research Location',
      text: 'Select strategic locations with good connectivity, infrastructure, and growth potential.',
    },
    {
      name: 'Verify RERA Registration',
      text: 'Check project RERA registration on maharera.mahaonline.gov.in for compliance.',
    },
    {
      name: 'Document Verification',
      text: 'Verify title deed, 7/12 extract, encumbrance certificate, and NA order.',
    },
    {
      name: 'Calculate Costs',
      text: 'Account for stamp duty (6-7%), registration (1%), and legal fees in your budget.',
    },
    {
      name: 'Arrange Financing',
      text: 'Apply for plot loan if needed, comparing interest rates across banks.',
    },
    {
      name: 'Conduct Due Diligence',
      text: 'Hire lawyer, inspect site physically, and verify all legal documents.',
    },
    {
      name: 'Book Property',
      text: 'Pay token amount and sign booking agreement with clear terms.',
    },
    {
      name: 'Register Property',
      text: 'Pay stamp duty, complete registration formalities at Sub-Registrar office.',
    },
    {
      name: 'Post-Purchase Formalities',
      text: 'Update mutation records and apply for utility connections.',
    },
  ]

  return (
    <>
      {/* Structured Data */}
      <HowToSchema name={post.title} description={post.excerpt} totalTime="P30D" steps={steps} />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            author: {
              '@type': 'Person',
              name: post.author.name,
            },
            datePublished: post.publishedDate,
            publisher: {
              '@type': 'Organization',
              name: 'Ajit J Gupta and Associates',
              logo: {
                '@type': 'ImageObject',
                url: 'https://ajitjgupta.com/logo.png',
              },
            },
          }),
        }}
      />

      {/* Back Button */}
      <Section className="pt-24 pb-8">
        <Container>
          <Link href="/blog">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </Container>
      </Section>

      {/* Article Header */}
      <Section className="pb-8">
        <Container>
          <article className="max-w-4xl mx-auto">
            <Badge className="mb-4">{post.category}</Badge>
            <Heading level={1} className="mb-6">
              {post.title}
            </Heading>

            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishedDate}>
                    {new Date(post.publishedDate).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="mt-8 prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{post.author.name}</h3>
                  <p className="text-muted-foreground text-sm">{post.author.bio}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Invest in Nashik Land?</h3>
              <p className="mb-6 text-white/90">
                Explore our RERA-certified projects with complete documentation and infrastructure
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/projects">
                  <Button size="lg" variant="secondary">
                    View Projects
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
          </article>
        </Container>
      </Section>
    </>
  )
}
