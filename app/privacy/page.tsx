import { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { Heading } from '@/components/atomic/Heading'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Ajit J Gupta and Associates. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <Heading as="h1" level="h1" className="mb-4">
              Privacy Policy
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
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Ajit J Gupta and Associates ("we," "our," or "us") is committed to protecting your
                privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website{' '}
                <a href="https://ajitjgupta.com" className="text-primary hover:underline">
                  ajitjgupta.com
                </a>{' '}
                and use our services. This policy is in compliance with the Information Technology
                Act, 2000, and the Information Technology (Reasonable Security Practices and
                Procedures and Sensitive Personal Data or Information) Rules, 2011.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                2. Information We Collect
              </h2>

              <h3 className="mb-3 text-xl font-heading font-semibold text-foreground">
                2.1 Personal Information
              </h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We may collect personally identifiable information that you voluntarily provide to
                us when you:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Fill out contact forms or inquiry forms</li>
                <li>Subscribe to our newsletters or updates</li>
                <li>Request site visits or project information</li>
                <li>Communicate with us via email, phone, or WhatsApp</li>
                <li>Register for events or webinars</li>
              </ul>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                This information may include:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Mailing address</li>
                <li>Property preferences and requirements</li>
                <li>Financial information (only when necessary for transactions)</li>
              </ul>

              <h3 className="mb-3 text-xl font-heading font-semibold text-foreground">
                2.2 Automatically Collected Information
              </h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                When you visit our website, we may automatically collect certain information about
                your device and usage patterns, including:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Device information</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                3. How We Use Your Information
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We use the collected information for the following purposes:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>To respond to your inquiries and provide requested information</li>
                <li>To process and facilitate property transactions</li>
                <li>To send you updates about projects, offers, and events</li>
                <li>To improve our website and services</li>
                <li>To analyze website usage and user behavior</li>
                <li>To comply with legal obligations and RERA requirements</li>
                <li>To prevent fraud and enhance security</li>
                <li>To send administrative information and important notices</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                4. Information Sharing and Disclosure
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may
                share your information in the following circumstances:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>
                  <strong>Service Providers:</strong> With third-party vendors who assist in website
                  hosting, email delivery, analytics, and other services
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law, court order, or
                  governmental authority
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with merger, acquisition, or
                  sale of assets
                </li>
                <li>
                  <strong>RERA Compliance:</strong> With regulatory authorities as required under
                  the Real Estate (Regulation and Development) Act, 2016
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you explicitly consent to sharing your
                  information
                </li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                5. Cookies and Tracking Technologies
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our
                website. Cookies are small data files stored on your device. We use:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>
                  <strong>Essential Cookies:</strong> Necessary for website functionality
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> To understand how visitors use our website
                </li>
                <li>
                  <strong>Preference Cookies:</strong> To remember your settings and preferences
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                You can control cookies through your browser settings. However, disabling cookies
                may affect website functionality.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                6. Data Security
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect
                your personal information against unauthorized access, alteration, disclosure, or
                destruction. These measures include:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure data storage and backup systems</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular security audits and updates</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                However, no method of transmission over the internet is 100% secure. While we strive
                to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                7. Your Rights and Choices
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                You have the following rights regarding your personal information:
              </p>
              <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
                <li>
                  <strong>Access:</strong> Request access to your personal data we hold
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal data (subject to
                  legal obligations)
                </li>
                <li>
                  <strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time
                </li>
                <li>
                  <strong>Data Portability:</strong> Request a copy of your data in a structured
                  format
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                8. Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the
                purposes outlined in this Privacy Policy, comply with legal obligations, resolve
                disputes, and enforce our agreements. When information is no longer needed, we
                securely delete or anonymize it.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                9. Third-Party Links
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for
                the privacy practices of these external sites. We encourage you to review their
                privacy policies before providing any personal information.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                10. Children's Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not
                knowingly collect personal information from children. If you believe we have
                inadvertently collected information from a child, please contact us immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our
                practices or legal requirements. We will notify you of significant changes by
                posting the updated policy on our website with a new "Last Updated" date. Your
                continued use of our services after such changes constitutes acceptance of the
                updated policy.
              </p>
            </section>

            {/* Grievance Officer */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                12. Grievance Officer
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                In accordance with the Information Technology Act, 2000, and rules made thereunder,
                we have appointed a Grievance Officer to address your concerns regarding data
                protection and privacy.
              </p>
              <div className="rounded-lg border border-border/50 bg-muted/20 p-6">
                <p className="mb-2 font-medium text-foreground">Grievance Officer Contact:</p>
                <p className="text-muted-foreground">
                  <strong>Name:</strong> Ajit J Gupta
                  <br />
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
                </p>
              </div>
            </section>

            {/* Contact Us */}
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                13. Contact Us
              </h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or
                our data practices, please contact us at:
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
                  <strong>Website:</strong>{' '}
                  <a href="https://ajitjgupta.com" className="text-primary hover:underline">
                    https://ajitjgupta.com
                  </a>
                </p>
              </div>
            </section>

            {/* Consent */}
            <section>
              <h2 className="mb-4 text-2xl font-heading font-semibold text-foreground">
                14. Consent
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By using our website and services, you consent to the collection, use, and
                disclosure of your information as described in this Privacy Policy.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
