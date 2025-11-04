import { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { Heading } from '@/components/atomic/Heading'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for Ajit J Gupta and Associates. Read about the terms and conditions for using our website and services.',
}

export default function TermsPage() {
  return (
    <div className="py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <Heading as="h1" level="h1" className="mb-4">
              Terms of Service
            </Heading>
            <p className="text-lg text-muted-foreground">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Ajit J Gupta and Associates. By accessing or using our website{' '}
                <a href="https://ajitjgupta.com" className="text-primary hover:underline">
                  ajitjgupta.com
                </a>{' '}
                ("Website") and our services, you agree to be bound by these Terms of Service
                ("Terms"). If you do not agree to these Terms, please do not use our Website or
                services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                These Terms constitute a legally binding agreement between you and Ajit J Gupta and
                Associates ("Company," "we," "us," or "our"), a real estate development company
                operating in Nashik, Maharashtra, India.
              </p>
            </section>

            {/* Use of Website */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                2. Use of Website
              </h2>

              <h3 className="mb-3 text-xl font-heading font-semibold text-foreground">
                2.1 Eligibility
              </h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                You must be at least 18 years old and legally capable of entering into contracts
                under Indian law to use our services. By using this Website, you represent and
                warrant that you meet these requirements.
              </p>

              <h3 className="mb-3 text-xl font-heading font-semibold text-foreground">
                2.2 Permitted Use
              </h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                You may use our Website for lawful purposes only. You agree not to use the Website:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>In any way that violates applicable laws or regulations</li>
                <li>To transmit harmful, offensive, or unlawful content</li>
                <li>To impersonate any person or entity</li>
                <li>To interfere with or disrupt the Website's functionality</li>
                <li>To collect or harvest information about other users</li>
                <li>For any commercial purpose without our written consent</li>
              </ul>

              <h3 className="mb-3 text-xl font-heading font-semibold text-foreground">
                2.3 Account Security
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                If you create an account on our Website, you are responsible for maintaining the
                confidentiality of your account credentials and for all activities under your
                account. You must notify us immediately of any unauthorized use.
              </p>
            </section>

            {/* Property Information */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                3. Property Information and Listings
              </h2>

              <h3 className="mb-3 text-xl font-heading font-semibold text-foreground">
                3.1 Accuracy of Information
              </h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We strive to provide accurate and up-to-date information about our projects.
                However, the information on this Website is subject to change without notice. We
                make no representations or warranties regarding the accuracy, completeness, or
                timeliness of any information.
              </p>

              <h3 className="mb-3 text-xl font-heading font-semibold text-foreground">
                3.2 Not an Offer
              </h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                The property listings and project information on this Website do not constitute an
                offer to sell. All offers are subject to formal agreements, RERA approval, and
                availability. Prices, specifications, and amenities are subject to change.
              </p>

              <h3 className="mb-3 text-xl font-heading font-semibold text-foreground">
                3.3 RERA Compliance
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                All our projects are registered with RERA (Real Estate Regulatory Authority) as
                applicable. RERA registration numbers, project details, and compliance certificates
                are available on the respective project pages and the official RERA website.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                4. Intellectual Property Rights
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                All content on this Website, including but not limited to text, graphics, logos,
                images, videos, audio clips, digital downloads, and software, is the property of
                Ajit J Gupta and Associates or its licensors and is protected by Indian and
                international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">You may not:</p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Copy, reproduce, or distribute Website content without permission</li>
                <li>Modify, adapt, or create derivative works</li>
                <li>Use content for commercial purposes</li>
                <li>Remove copyright or proprietary notices</li>
              </ul>
            </section>

            {/* User Content */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                5. User-Generated Content
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                If you submit feedback, reviews, testimonials, or other content to our Website, you
                grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify,
                and display such content for business purposes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You represent that any content you submit does not violate third-party rights and
                complies with applicable laws.
              </p>
            </section>

            {/* Disclaimers */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                6. Disclaimers and Limitations of Liability
              </h2>

              <h3 className="mb-3 text-xl font-heading font-semibold text-foreground">
                6.1 "As Is" Basis
              </h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                This Website and all information, content, and services are provided on an "as is"
                and "as available" basis without any warranties of any kind, either express or
                implied.
              </p>

              <h3 className="mb-3 text-xl font-heading font-semibold text-foreground">
                6.2 No Warranty
              </h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">We do not warrant that:</p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>The Website will be uninterrupted, secure, or error-free</li>
                <li>The information will be accurate or complete</li>
                <li>Any defects will be corrected</li>
                <li>The Website is free of viruses or harmful components</li>
              </ul>

              <h3 className="mb-3 text-xl font-heading font-semibold text-foreground">
                6.3 Limitation of Liability
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, Ajit J Gupta and Associates shall not be
                liable for any indirect, incidental, special, consequential, or punitive damages,
                including but not limited to loss of profits, data, or business opportunities,
                arising from your use or inability to use this Website or services.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                7. Third-Party Links and Services
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Website may contain links to third-party websites or services. We do not
                endorse, control, or assume responsibility for any third-party content. Your use of
                third-party sites is at your own risk and subject to their terms and conditions.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                8. Indemnification
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify, defend, and hold harmless Ajit J Gupta and Associates, its
                officers, directors, employees, and agents from any claims, liabilities, damages,
                losses, or expenses (including legal fees) arising from your use of the Website,
                violation of these Terms, or infringement of third-party rights.
              </p>
            </section>

            {/* Privacy */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                9. Privacy Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your use of our Website is also governed by our{' '}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                . Please review it to understand our data collection and use practices.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                10. Termination
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to suspend or terminate your access to the Website at any time,
                without notice, for any reason, including violation of these Terms. Upon
                termination, your right to use the Website will immediately cease.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                11. Governing Law and Dispute Resolution
              </h2>

              <h3 className="mb-3 text-xl font-heading font-semibold text-foreground">
                11.1 Governing Law
              </h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India,
                without regard to conflict of law principles.
              </p>

              <h3 className="mb-3 text-xl font-heading font-semibold text-foreground">
                11.2 Jurisdiction
              </h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Any disputes arising from these Terms or your use of the Website shall be subject to
                the exclusive jurisdiction of the courts in Nashik, Maharashtra, India.
              </p>

              <h3 className="mb-3 text-xl font-heading font-semibold text-foreground">
                11.3 Arbitration
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Any dispute shall first be attempted to be resolved through good-faith negotiations.
                If negotiations fail, disputes may be referred to arbitration under the Arbitration
                and Conciliation Act, 1996, before a sole arbitrator appointed mutually.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                12. Changes to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of
                significant changes by posting the updated Terms on this page with a new "Last
                Updated" date. Your continued use of the Website after changes constitutes
                acceptance of the modified Terms.
              </p>
            </section>

            {/* Severability */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                13. Severability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is found to be invalid or unenforceable, the
                remaining provisions shall continue in full force and effect.
              </p>
            </section>

            {/* Entire Agreement */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                14. Entire Agreement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms, together with our Privacy Policy and any other legal notices published
                on the Website, constitute the entire agreement between you and Ajit J Gupta and
                Associates regarding your use of the Website.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                15. Contact Information
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="rounded-lg border border-border/50 bg-muted/20 p-6">
                <p className="mb-2 font-semibold text-foreground">Ajit J Gupta and Associates</p>
                <p className="text-muted-foreground">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@ajitjgupta.com" className="text-primary hover:underline">
                    info@ajitjgupta.com
                  </a>
                  <br />
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+919371410666" className="text-primary hover:underline">
                    +91 9371410666
                  </a>
                  <br />
                  <strong>Address:</strong> Nashik, Maharashtra, India
                  <br />
                  <strong>Website:</strong>{' '}
                  <a href="https://ajitjgupta.com" className="text-primary hover:underline">
                    https://ajitjgupta.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
