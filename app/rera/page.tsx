import { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { Heading } from '@/components/atomic/Heading'
import { Badge } from '@/components/ui/badge'
import { Shield, FileCheck, Scale, AlertCircle, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'RERA Compliance',
  description:
    'Learn about RERA compliance at Ajit J Gupta and Associates. All our projects are registered under the Real Estate (Regulation and Development) Act, 2016.',
}

export default function RERAPage() {
  return (
    <div className="py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <Badge variant="outline" className="mb-4">
              100% RERA Compliant
            </Badge>
            <Heading as="h1" level="h1" className="mb-4">
              RERA Compliance
            </Heading>
            <p className="text-lg text-muted-foreground">
              Your protection is our priority. All our projects are fully compliant with the Real
              Estate (Regulation and Development) Act, 2016.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            {/* About RERA */}
            <section className="mb-12">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-heading font-semibold text-foreground">
                    What is RERA?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The Real Estate (Regulation and Development) Act, 2016 (RERA) is a landmark
                    legislation enacted by the Parliament of India to protect homebuyers and boost
                    investments in the Indian real estate sector. RERA establishes Real Estate
                    Regulatory Authorities in each state to regulate and promote the real estate
                    sector in a fair and transparent manner.
                  </p>
                </div>
              </div>
            </section>

            {/* Key Objectives */}
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-heading font-semibold text-foreground">
                Key Objectives of RERA
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border/50 bg-muted/20 p-6">
                  <CheckCircle2 className="mb-3 h-6 w-6 text-primary" />
                  <h3 className="mb-2 text-lg font-heading font-semibold text-foreground">
                    Protect Homebuyers
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Establish transparency and accountability in real estate transactions, ensuring
                    buyers' interests are protected.
                  </p>
                </div>

                <div className="rounded-lg border border-border/50 bg-muted/20 p-6">
                  <CheckCircle2 className="mb-3 h-6 w-6 text-primary" />
                  <h3 className="mb-2 text-lg font-heading font-semibold text-foreground">
                    Promote Transparency
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ensure full disclosure of project information, including approvals, timelines,
                    and carpet area calculations.
                  </p>
                </div>

                <div className="rounded-lg border border-border/50 bg-muted/20 p-6">
                  <CheckCircle2 className="mb-3 h-6 w-6 text-primary" />
                  <h3 className="mb-2 text-lg font-heading font-semibold text-foreground">
                    Ensure Timely Delivery
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Hold developers accountable for project completion timelines and impose
                    penalties for delays.
                  </p>
                </div>

                <div className="rounded-lg border border-border/50 bg-muted/20 p-6">
                  <CheckCircle2 className="mb-3 h-6 w-6 text-primary" />
                  <h3 className="mb-2 text-lg font-heading font-semibold text-foreground">
                    Establish Fair Practices
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Create standardized agreements, regulate advertising, and establish dispute
                    resolution mechanisms.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Compliance */}
            <section className="mb-12">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-heading font-semibold text-foreground">
                    Our Commitment to RERA Compliance
                  </h2>
                  <p className="mb-4 text-muted-foreground leading-relaxed">
                    At Ajit J Gupta and Associates, we are fully committed to RERA compliance across
                    all our projects. We believe that RERA brings much-needed transparency and
                    accountability to the real estate sector, benefiting both developers and
                    homebuyers.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Every project we undertake is registered with MahaRERA (Maharashtra Real Estate
                    Regulatory Authority) before marketing or selling. We ensure complete adherence
                    to all RERA guidelines and regulations.
                  </p>
                </div>
              </div>
            </section>

            {/* Benefits for Buyers */}
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-heading font-semibold text-foreground">
                How RERA Protects You
              </h2>

              <div className="space-y-4">
                <div className="rounded-lg border border-border/50 bg-background p-6">
                  <h3 className="mb-2 text-lg font-heading font-semibold text-foreground">
                    1. Mandatory Project Registration
                  </h3>
                  <p className="text-muted-foreground">
                    All projects with plot area exceeding 500 sq.m. or having more than 8 units must
                    be registered with RERA before advertising or selling.
                  </p>
                </div>

                <div className="rounded-lg border border-border/50 bg-background p-6">
                  <h3 className="mb-2 text-lg font-heading font-semibold text-foreground">
                    2. Standardized Carpet Area Definition
                  </h3>
                  <p className="text-muted-foreground">
                    RERA mandates selling properties based on carpet area (net usable floor area),
                    not built-up or super built-up area, ensuring transparency.
                  </p>
                </div>

                <div className="rounded-lg border border-border/50 bg-background p-6">
                  <h3 className="mb-2 text-lg font-heading font-semibold text-foreground">
                    3. Escrow Account for Funds
                  </h3>
                  <p className="text-muted-foreground">
                    70% of funds collected from buyers must be deposited in a separate escrow
                    account to be used only for construction and land costs of that specific
                    project.
                  </p>
                </div>

                <div className="rounded-lg border border-border/50 bg-background p-6">
                  <h3 className="mb-2 text-lg font-heading font-semibold text-foreground">
                    4. Defect Liability Period
                  </h3>
                  <p className="text-muted-foreground">
                    Developers are liable to rectify structural defects for a period of 5 years from
                    possession, and other defects for 2 years.
                  </p>
                </div>

                <div className="rounded-lg border border-border/50 bg-background p-6">
                  <h3 className="mb-2 text-lg font-heading font-semibold text-foreground">
                    5. Penalty for Delays
                  </h3>
                  <p className="text-muted-foreground">
                    If possession is delayed, developers must pay interest at the prescribed rate to
                    buyers. Similarly, buyers are liable for interest on delayed payments.
                  </p>
                </div>

                <div className="rounded-lg border border-border/50 bg-background p-6">
                  <h3 className="mb-2 text-lg font-heading font-semibold text-foreground">
                    6. Quick Dispute Resolution
                  </h3>
                  <p className="text-muted-foreground">
                    RERA provides a fast-track dispute resolution mechanism through the Real Estate
                    Appellate Tribunal, with decisions typically within 60 days.
                  </p>
                </div>

                <div className="rounded-lg border border-border/50 bg-background p-6">
                  <h3 className="mb-2 text-lg font-heading font-semibold text-foreground">
                    7. Transparent Project Information
                  </h3>
                  <p className="text-muted-foreground">
                    Complete project details, including approvals, timelines, layout plans, and
                    progress updates, must be disclosed on the RERA website.
                  </p>
                </div>
              </div>
            </section>

            {/* Verification */}
            <section className="mb-12">
              <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-8">
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/20">
                    <AlertCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="mb-3 text-2xl font-heading font-semibold text-foreground">
                      How to Verify RERA Registration
                    </h2>
                    <p className="mb-4 text-muted-foreground leading-relaxed">
                      Before investing in any real estate project, we encourage you to verify its
                      RERA registration status:
                    </p>
                  </div>
                </div>

                <ol className="ml-6 space-y-3">
                  <li className="text-muted-foreground">
                    <strong className="text-foreground">Step 1:</strong> Visit the official MahaRERA
                    website:{' '}
                    <a
                      href="https://maharerait.mahaonline.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      maharerait.mahaonline.gov.in
                    </a>
                  </li>
                  <li className="text-muted-foreground">
                    <strong className="text-foreground">Step 2:</strong> Click on "Registered
                    Projects" or "Search Projects"
                  </li>
                  <li className="text-muted-foreground">
                    <strong className="text-foreground">Step 3:</strong> Enter the RERA registration
                    number or project name
                  </li>
                  <li className="text-muted-foreground">
                    <strong className="text-foreground">Step 4:</strong> View complete project
                    details, including approvals, timelines, and developer information
                  </li>
                </ol>

                <div className="mt-6 rounded-lg bg-background p-4">
                  <p className="text-sm font-medium text-foreground">
                    💡 Pro Tip: All RERA registration numbers are displayed prominently on our
                    project pages. We encourage you to verify this information independently.
                  </p>
                </div>
              </div>
            </section>

            {/* Documentation */}
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-heading font-semibold text-foreground">
                RERA Documents Available
              </h2>
              <p className="mb-4 text-muted-foreground">
                For each registered project, the following documents are available for buyer review:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/20 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">RERA Registration Certificate</span>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/20 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">Approved Layout Plans</span>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/20 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">Sanctioned Building Plans</span>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/20 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">Land Title Documents</span>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/20 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">Commencement Certificate</span>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/20 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">Quarterly Progress Reports</span>
                </div>
              </div>
            </section>

            {/* Contact for Queries */}
            <section>
              <div className="rounded-xl border border-border/50 bg-muted/20 p-8">
                <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                  Have Questions About RERA Compliance?
                </h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  Our team is here to help you understand RERA regulations and how they protect your
                  investment. Feel free to reach out with any queries.
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
                    className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 font-medium transition-colors hover:bg-muted"
                  >
                    Call: +91 9371410666
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
