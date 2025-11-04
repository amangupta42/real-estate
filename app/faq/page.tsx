'use client'

import { Container } from '@/components/layout/Container'
import { Heading } from '@/components/atomic/Heading'
import { Badge } from '@/components/ui/badge'
import { ExpandableInfoCard } from '@/components/molecules/ExpandableInfoCard'
import {
  HelpCircle,
  Building,
  Wallet,
  Shield,
  MapPin,
  Phone,
  MessageCircle,
  Award,
} from 'lucide-react'
import { useEffect } from 'react'

// Set page metadata via useEffect
function usePageMetadata() {
  useEffect(() => {
    document.title = 'Frequently Asked Questions (FAQ) | Ajit J Gupta and Associates'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Find answers to common questions about land investment, RERA compliance, project details, financing options, and the purchase process at Ajit J Gupta and Associates.'
      )
    }
  }, [])
}

// FAQ Schema for SEO
function FAQSchema() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      // General Questions
      {
        '@type': 'Question',
        name: 'What types of properties does Ajit J Gupta and Associates offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We specialize in premium land development projects in Nashik, offering well-planned residential and commercial plots with complete infrastructure, RERA certification, and clear titles.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes your projects different from others in Nashik?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our projects feature 100% RERA compliance, complete infrastructure (water, electricity, roads), strategic locations near major highways and economic zones, flexible payment plans, and a legacy of trust spanning decades.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are your projects suitable for both investment and personal use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes, our projects are designed to serve both purposes. Investors benefit from Nashik's 7.2% ROI and 22% market growth, while personal buyers get ready-to-build plots in prime locations with excellent connectivity.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the typical price range for your plots?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Plot prices vary based on location, size, and project phase. Nashik's current average land rate is approximately ₹3,000 per sq.ft. Contact us for specific project pricing and current offers.",
        },
      },
      // About Projects
      {
        '@type': 'Question',
        name: 'What infrastructure is provided in your projects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All our projects include paved internal roads, underground drainage, water supply connections, electricity infrastructure, street lighting, landscaped parks, and boundary walls with gated entry.',
        },
      },
      {
        '@type': 'Question',
        name: 'What plot sizes are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer a variety of plot sizes to suit different needs, typically ranging from 1,200 sq.ft to 5,000+ sq.ft. Specific sizes vary by project and availability.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see the layout plan before booking?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Detailed layout plans are available on each project page on our website. You can also request high-resolution plans and visit our office to review physical layouts.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I check the current status of available plots?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our website features interactive layout plans showing real-time availability of plots. You can also contact us directly at +91 9371410666 for the latest availability and best plot selection.',
        },
      },
      // Investment & Financing
      {
        '@type': 'Question',
        name: 'Do you offer payment plans?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide flexible payment plans tailored to your financial situation. Options include installment plans, construction-linked payments, and early-bird discounts. Contact us to discuss the best plan for you.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a loan for land purchase?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, land loans are available from most major banks and NBFCs. We have tie-ups with financial institutions and can assist you with the loan application process and documentation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the expected ROI on land investment in Nashik?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Nashik currently offers one of Maharashtra's highest ROIs at 7.2%. Historical data shows areas like Nashik Road appreciated by 13.5% and Pathardi Phata by 11.1% annually. However, past performance doesn't guarantee future results.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there any hidden costs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We maintain complete transparency. All costs including stamp duty, registration charges, GST, and development charges are clearly communicated upfront. No hidden costs or surprise fees.',
        },
      },
      // Legal & RERA
      {
        '@type': 'Question',
        name: 'Are all your projects RERA registered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% of our projects are registered with MahaRERA. RERA registration numbers are prominently displayed on each project page and can be independently verified on the MahaRERA website.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I verify RERA registration?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visit maharerait.mahaonline.gov.in, click on "Registered Projects", and enter the RERA number provided on our project pages. This will show complete project details, approvals, and timelines.',
        },
      },
      {
        '@type': 'Question',
        name: 'What documents will I receive after purchase?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You will receive: Sale Agreement, Receipt of Payment, Allotment Letter, Copy of Approved Layout Plan, Copy of RERA Certificate, 7/12 Extract (after registration), and Registered Sale Deed.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the land title clear and marketable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. All our land parcels have clear, marketable titles verified by legal experts. We provide title guarantee and ensure no encumbrances, litigation, or claims on the property.',
        },
      },
      // Site Visits & Purchase
      {
        '@type': 'Question',
        name: 'Can I visit the site before booking?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We highly encourage site visits! Our team can arrange guided tours of ongoing and completed projects. Contact us at +91 9371410666 to schedule a visit at your convenience.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does the purchase process take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The typical timeline is: Plot Selection (1-2 days) → Token Payment & Documentation (3-5 days) → Agreement Signing (1 week) → Payment & Registration (2-4 weeks). Total process usually completes in 4-6 weeks.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the cancellation and refund policy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cancellation terms are clearly specified in the booking agreement. Typically, cancellation before agreement signing allows refund minus processing fee. Post-agreement cancellations are subject to terms outlined in your contract.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I book a plot online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can express interest and make initial bookings through our website. However, final documentation and registration require in-person verification and signing as per legal requirements.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide assistance with construction?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "While we don't directly construct homes, we can connect you with trusted architects and contractors from our network who understand our project layouts and local regulations.",
        },
      },
      {
        '@type': 'Question',
        name: 'How can I contact you for more information?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can reach us via phone at +91 9371410666, email at info@ajitjgupta.com, WhatsApp, or visit our office. Our team is available Monday-Saturday, 9 AM to 6 PM.',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  )
}

export default function FAQPage() {
  usePageMetadata()

  return (
    <>
      <FAQSchema />
      <div className="py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <Badge variant="outline" className="mb-4">
                Got Questions? We've Got Answers
              </Badge>
              <Heading as="h1" level="h1" className="mb-4">
                Frequently Asked Questions
              </Heading>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about our projects, investment opportunities, RERA
                compliance, and the purchase process.
              </p>
            </div>

            {/* General Questions */}
            <section className="mb-12">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <Heading as="h2" level="h2">
                  General Questions
                </Heading>
              </div>
              <div className="space-y-4">
                <ExpandableInfoCard
                  icon={<Building className="h-5 w-5 text-primary" />}
                  title="What types of properties does Ajit J Gupta and Associates offer?"
                  preview="Learn about our property offerings"
                  content={
                    <p>
                      We specialize in premium land development projects in Nashik, offering
                      well-planned residential and commercial plots with complete infrastructure,
                      RERA certification, and clear titles. Each project is strategically located
                      near major highways, economic zones, and essential amenities.
                    </p>
                  }
                  index={0}
                />
                <ExpandableInfoCard
                  icon={<Award className="h-5 w-5 text-primary" />}
                  title="What makes your projects different from others in Nashik?"
                  preview="Our unique value proposition"
                  content={
                    <>
                      <p className="mb-3">Our projects stand out due to:</p>
                      <ul className="space-y-2">
                        <li>
                          <strong>100% RERA Compliance:</strong> All projects registered with
                          MahaRERA before marketing
                        </li>
                        <li>
                          <strong>Complete Infrastructure:</strong> Paved roads, water, electricity,
                          drainage, and landscaping
                        </li>
                        <li>
                          <strong>Strategic Locations:</strong> Near Mumbai-Nagpur Expressway and
                          MIDC industrial areas
                        </li>
                        <li>
                          <strong>Flexible Payment Plans:</strong> Tailored financing options to
                          suit your budget
                        </li>
                        <li>
                          <strong>Legacy of Trust:</strong> Decades of experience in Nashik real
                          estate
                        </li>
                      </ul>
                    </>
                  }
                  index={1}
                />
                <ExpandableInfoCard
                  icon={<Wallet className="h-5 w-5 text-primary" />}
                  title="Are your projects suitable for both investment and personal use?"
                  preview="Dual-purpose opportunities"
                  content={
                    <p>
                      Absolutely! Our projects are designed to serve both purposes excellently.
                      Investors benefit from Nashik's impressive 7.2% ROI (highest in Maharashtra)
                      and 22% market growth in apartment sales. Personal buyers get ready-to-build
                      plots in prime locations with excellent connectivity, complete infrastructure,
                      and all necessary approvals to start construction immediately.
                    </p>
                  }
                  index={2}
                />
                <ExpandableInfoCard
                  icon={<Wallet className="h-5 w-5 text-primary" />}
                  title="What is the typical price range for your plots?"
                  preview="Pricing information"
                  content={
                    <p>
                      Plot prices vary based on location, size, and project phase. Nashik's current
                      average land rate is approximately ₹3,000 per sq.ft, though this varies by
                      area. We offer competitive pricing with transparent cost breakdowns and
                      flexible payment plans. Contact us at +91 9371410666 for specific project
                      pricing, current offers, and special early-bird discounts.
                    </p>
                  }
                  index={3}
                />
              </div>
            </section>

            {/* About Projects */}
            <section className="mb-12">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <Heading as="h2" level="h2">
                  About Our Projects
                </Heading>
              </div>
              <div className="space-y-4">
                <ExpandableInfoCard
                  icon={<MapPin className="h-5 w-5 text-primary" />}
                  title="What infrastructure is provided in your projects?"
                  preview="Complete modern amenities"
                  content={
                    <>
                      <p className="mb-3">All our projects include comprehensive infrastructure:</p>
                      <ul className="space-y-2">
                        <li>
                          <strong>Roads:</strong> Paved internal roads with proper drainage
                        </li>
                        <li>
                          <strong>Water Supply:</strong> Underground pipeline connections to each
                          plot
                        </li>
                        <li>
                          <strong>Electricity:</strong> Individual meter connections and street
                          lighting
                        </li>
                        <li>
                          <strong>Drainage:</strong> Underground sewerage system
                        </li>
                        <li>
                          <strong>Landscaping:</strong> Parks, green spaces, and tree-lined avenues
                        </li>
                        <li>
                          <strong>Security:</strong> Boundary walls with gated entry points
                        </li>
                      </ul>
                    </>
                  }
                  index={0}
                />
                <ExpandableInfoCard
                  icon={<MapPin className="h-5 w-5 text-primary" />}
                  title="What plot sizes are available?"
                  preview="Flexible sizing options"
                  content={
                    <p>
                      We offer a variety of plot sizes to suit different needs and budgets,
                      typically ranging from 1,200 sq.ft (ideal for compact homes) to 5,000+ sq.ft
                      (perfect for spacious villas or commercial ventures). Specific sizes vary by
                      project and current availability. Check individual project pages or contact us
                      for detailed plot dimension options.
                    </p>
                  }
                  index={1}
                />
                <ExpandableInfoCard
                  icon={<MapPin className="h-5 w-5 text-primary" />}
                  title="Can I see the layout plan before booking?"
                  preview="Complete transparency"
                  content={
                    <p>
                      Absolutely! Detailed layout plans with plot dimensions, road widths, and
                      amenity locations are available on each project page on our website. You can
                      download high-resolution PDFs, view interactive maps, and even use our
                      real-time availability checker. We also welcome you to visit our office to
                      review physical layouts and discuss plot selection with our team.
                    </p>
                  }
                  index={2}
                />
                <ExpandableInfoCard
                  icon={<MapPin className="h-5 w-5 text-primary" />}
                  title="How can I check the current status of available plots?"
                  preview="Real-time availability"
                  content={
                    <p>
                      Our website features interactive layout plans that show real-time availability
                      status (available, booked, or sold) for each plot. The system is updated daily
                      to reflect the latest status. For the most current information and to reserve
                      your preferred plot, contact us directly at +91 9371410666 or schedule a site
                      visit where our team can show you available options.
                    </p>
                  }
                  index={3}
                />
              </div>
            </section>

            {/* Investment & Financing */}
            <section className="mb-12">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <Heading as="h2" level="h2">
                  Investment & Financing
                </Heading>
              </div>
              <div className="space-y-4">
                <ExpandableInfoCard
                  icon={<Wallet className="h-5 w-5 text-primary" />}
                  title="Do you offer payment plans?"
                  preview="Flexible financing options"
                  content={
                    <>
                      <p className="mb-3">
                        Yes, we provide flexible payment plans tailored to your financial situation.
                        Options include:
                      </p>
                      <ul className="space-y-2">
                        <li>
                          <strong>Installment Plans:</strong> Spread payments over 12-24 months
                        </li>
                        <li>
                          <strong>Construction-Linked:</strong> Pay in phases as you build
                        </li>
                        <li>
                          <strong>Early-Bird Discounts:</strong> Special offers for immediate
                          payment
                        </li>
                        <li>
                          <strong>Custom Plans:</strong> Tailored to your specific needs
                        </li>
                      </ul>
                      <p className="mt-3">
                        Contact us to discuss the best payment plan for your situation.
                      </p>
                    </>
                  }
                  index={0}
                />
                <ExpandableInfoCard
                  icon={<Wallet className="h-5 w-5 text-primary" />}
                  title="Can I get a loan for land purchase?"
                  preview="Bank financing available"
                  content={
                    <p>
                      Yes, land loans are available from most major banks and NBFCs (Non-Banking
                      Financial Companies). We have established tie-ups with several financial
                      institutions and can assist you throughout the loan application process. We
                      help with documentation, property valuation coordination, and ensuring all
                      legal requirements are met for loan approval. Typical land loans cover 70-80%
                      of the property value.
                    </p>
                  }
                  index={1}
                />
                <ExpandableInfoCard
                  icon={<Wallet className="h-5 w-5 text-primary" />}
                  title="What is the expected ROI on land investment in Nashik?"
                  preview="Investment returns"
                  content={
                    <p>
                      Nashik currently offers one of Maharashtra's highest returns on investment at
                      7.2% (as per recent market analysis). Historical data shows impressive
                      appreciation: Nashik Road area appreciated by 13.5% annually, while Pathardi
                      Phata saw 11.1% annual growth. Apartment sales grew by 22% in 2024, indicating
                      strong demand. However, it's important to note that past performance doesn't
                      guarantee future results. We recommend land investment as a medium to
                      long-term wealth creation strategy.
                    </p>
                  }
                  index={2}
                />
                <ExpandableInfoCard
                  icon={<Wallet className="h-5 w-5 text-primary" />}
                  title="Are there any hidden costs?"
                  preview="Complete transparency"
                  content={
                    <>
                      <p className="mb-3">
                        We maintain complete transparency in all transactions. All costs are clearly
                        communicated upfront:
                      </p>
                      <ul className="space-y-2">
                        <li>
                          <strong>Plot Cost:</strong> Base price of the land
                        </li>
                        <li>
                          <strong>Development Charges:</strong> For infrastructure (if applicable)
                        </li>
                        <li>
                          <strong>GST:</strong> As per government regulations
                        </li>
                        <li>
                          <strong>Stamp Duty & Registration:</strong> Government charges (varies by
                          state)
                        </li>
                        <li>
                          <strong>Legal Fees:</strong> For documentation and title verification
                        </li>
                      </ul>
                      <p className="mt-3">
                        No hidden costs or surprise fees. You'll receive a detailed cost breakdown
                        before booking.
                      </p>
                    </>
                  }
                  index={3}
                />
              </div>
            </section>

            {/* Legal & RERA */}
            <section className="mb-12">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <Heading as="h2" level="h2">
                  Legal & RERA Compliance
                </Heading>
              </div>
              <div className="space-y-4">
                <ExpandableInfoCard
                  icon={<Shield className="h-5 w-5 text-primary" />}
                  title="Are all your projects RERA registered?"
                  preview="100% RERA compliant"
                  content={
                    <p>
                      Yes, 100% of our projects are registered with MahaRERA (Maharashtra Real
                      Estate Regulatory Authority) before any marketing or sales activities begin.
                      RERA registration numbers are prominently displayed on each project page and
                      in all marketing materials. This ensures complete transparency, buyer
                      protection, and adherence to all regulatory guidelines. You can independently
                      verify our RERA registration on the official MahaRERA website.
                    </p>
                  }
                  index={0}
                />
                <ExpandableInfoCard
                  icon={<Shield className="h-5 w-5 text-primary" />}
                  title="How can I verify RERA registration?"
                  preview="Easy verification process"
                  content={
                    <>
                      <p className="mb-3">Verifying RERA registration is simple:</p>
                      <ol className="space-y-2">
                        <li>
                          <strong>Step 1:</strong> Visit{' '}
                          <a
                            href="https://maharerait.mahaonline.gov.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            maharerait.mahaonline.gov.in
                          </a>
                        </li>
                        <li>
                          <strong>Step 2:</strong> Click on "Registered Projects" or "Search
                          Projects"
                        </li>
                        <li>
                          <strong>Step 3:</strong> Enter the RERA registration number from our
                          project page
                        </li>
                        <li>
                          <strong>Step 4:</strong> View complete project details including
                          approvals, timelines, and developer information
                        </li>
                      </ol>
                      <p className="mt-3">
                        We encourage all buyers to independently verify RERA registration before
                        making any investment decisions.
                      </p>
                    </>
                  }
                  index={1}
                />
                <ExpandableInfoCard
                  icon={<Shield className="h-5 w-5 text-primary" />}
                  title="What documents will I receive after purchase?"
                  preview="Complete documentation"
                  content={
                    <>
                      <p className="mb-3">
                        You will receive comprehensive documentation including:
                      </p>
                      <ul className="space-y-2">
                        <li>
                          <strong>Sale Agreement:</strong> Legal contract between buyer and
                          developer
                        </li>
                        <li>
                          <strong>Receipts:</strong> All payment receipts and transaction records
                        </li>
                        <li>
                          <strong>Allotment Letter:</strong> Official plot allotment confirmation
                        </li>
                        <li>
                          <strong>Layout Plan:</strong> Copy of approved layout showing your plot
                        </li>
                        <li>
                          <strong>RERA Certificate:</strong> Copy of project RERA registration
                        </li>
                        <li>
                          <strong>7/12 Extract:</strong> Land records (after registration)
                        </li>
                        <li>
                          <strong>Registered Sale Deed:</strong> Final ownership document
                        </li>
                      </ul>
                    </>
                  }
                  index={2}
                />
                <ExpandableInfoCard
                  icon={<Shield className="h-5 w-5 text-primary" />}
                  title="Is the land title clear and marketable?"
                  preview="Verified clear titles"
                  content={
                    <p>
                      Absolutely. All our land parcels undergo rigorous title verification by
                      experienced legal experts before acquisition. We ensure that every property
                      has a clear, marketable title with no encumbrances, litigation, or third-party
                      claims. We provide title guarantee and title insurance options for additional
                      peace of mind. Complete chain of ownership documentation is available for
                      review before purchase.
                    </p>
                  }
                  index={3}
                />
              </div>
            </section>

            {/* Site Visits & Purchase Process */}
            <section className="mb-12">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <Heading as="h2" level="h2">
                  Site Visits & Purchase Process
                </Heading>
              </div>
              <div className="space-y-4">
                <ExpandableInfoCard
                  icon={<MapPin className="h-5 w-5 text-primary" />}
                  title="Can I visit the site before booking?"
                  preview="Site visits encouraged"
                  content={
                    <p>
                      We highly encourage site visits! Seeing the project location, infrastructure,
                      and surroundings in person helps you make an informed decision. Our team can
                      arrange guided tours of ongoing and completed projects at your convenience.
                      We'll show you available plots, explain the layout, demonstrate infrastructure
                      quality, and answer all your questions. Contact us at +91 9371410666 to
                      schedule a visit. Weekend visits are also available.
                    </p>
                  }
                  index={0}
                />
                <ExpandableInfoCard
                  icon={<MapPin className="h-5 w-5 text-primary" />}
                  title="How long does the purchase process take?"
                  preview="Timeline breakdown"
                  content={
                    <>
                      <p className="mb-3">
                        The typical purchase timeline from plot selection to final registration:
                      </p>
                      <ul className="space-y-2">
                        <li>
                          <strong>Plot Selection:</strong> 1-2 days (site visit and decision)
                        </li>
                        <li>
                          <strong>Token Payment:</strong> Immediate (to reserve the plot)
                        </li>
                        <li>
                          <strong>Documentation:</strong> 3-5 days (KYC, paperwork preparation)
                        </li>
                        <li>
                          <strong>Agreement Signing:</strong> Within 1 week of token payment
                        </li>
                        <li>
                          <strong>Payment & Registration:</strong> 2-4 weeks (as per payment plan)
                        </li>
                      </ul>
                      <p className="mt-3">
                        Total process typically completes in 4-6 weeks. Expedited processing is
                        available for immediate full payment.
                      </p>
                    </>
                  }
                  index={1}
                />
                <ExpandableInfoCard
                  icon={<MapPin className="h-5 w-5 text-primary" />}
                  title="What is the cancellation and refund policy?"
                  preview="Transparent policies"
                  content={
                    <p>
                      Cancellation terms are clearly specified in the booking agreement. Typically,
                      cancellation before agreement signing allows a refund of the token amount
                      minus a small processing fee (usually 2-5%). Post-agreement cancellations are
                      subject to the terms outlined in your specific contract, which may include
                      deductions for administrative costs and potential losses. We recommend
                      reviewing the cancellation clause carefully before booking. Contact us for
                      specific policy details.
                    </p>
                  }
                  index={2}
                />
                <ExpandableInfoCard
                  icon={<Phone className="h-5 w-5 text-primary" />}
                  title="Can I book a plot online?"
                  preview="Online and offline options"
                  content={
                    <p>
                      Yes! You can express interest and make initial plot reservations through our
                      website by filling out the inquiry form or using our interactive layout plans.
                      Our team will contact you within 24 hours to confirm availability and guide
                      you through the next steps. However, final documentation, agreement signing,
                      and registration require in-person verification and physical signatures as per
                      legal requirements and RERA guidelines.
                    </p>
                  }
                  index={3}
                />
                <ExpandableInfoCard
                  icon={<Building className="h-5 w-5 text-primary" />}
                  title="Do you provide assistance with construction?"
                  preview="Construction support"
                  content={
                    <p>
                      While we don't directly undertake residential construction, we can connect you
                      with a network of trusted architects, structural engineers, and contractors
                      who have experience working in our projects. They understand our layout
                      specifications, local building regulations, and soil conditions. We can also
                      help you navigate the building plan approval process with local authorities.
                      Many of our plot owners have successfully built their dream homes with these
                      recommended partners.
                    </p>
                  }
                  index={4}
                />
              </div>
            </section>

            {/* Contact CTA */}
            <section className="rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-12">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <Heading as="h2" level="h3">
                  Still Have Questions?
                </Heading>
              </div>
              <p className="mb-6 text-muted-foreground">
                Can't find the answer you're looking for? Our team is here to help you with any
                queries about our projects, investment opportunities, or the purchase process.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Contact Us
                </a>
                <a
                  href="tel:+919371410666"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-medium transition-colors hover:bg-muted"
                >
                  <Phone className="h-4 w-4" />
                  Call: +91 9371410666
                </a>
                <a
                  href="https://wa.me/919371410666"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-medium transition-colors hover:bg-muted"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </section>
          </div>
        </Container>
      </div>
    </>
  )
}
