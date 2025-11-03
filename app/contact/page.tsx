import { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { Heading } from '@/components/atomic/Heading'
import { ContactForm } from '@/components/molecules/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | Real Estate',
  description:
    "Get in touch with us for any inquiries about our land development projects in Nashik. We're here to help you find your perfect investment.",
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['Nashik, Maharashtra', 'India - 422101'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 9371410666', 'Mon-Sat: 9:00 AM - 6:00 PM'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@ajitjgupta.com', 'sales@ajitjgupta.com'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Monday - Saturday', '9:00 AM - 5:00 PM IST'],
  },
]

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      {/* <section className="relative min-h-screen flex items-center justify-center py-20 md:py-28 bg-gradient-to-b from-primary/[0.03] via-background to-background">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              Get In Touch
            </span>
            <Heading as="h1" level="h1" className="mt-6 mb-6">
              Contact Us
            </Heading>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Have questions about our projects or want to schedule a site visit? We're here to help
              you make the right investment decision.
            </p>
          </div>
        </Container>
        
      </section> */}

      {/* Contact Info Cards */}
      {/* <section className="py-16 border-t border-border/50">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div
                  key={index}
                  className="rounded-xl border border-border/50 bg-muted/20 p-6 text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-lg font-heading font-semibold text-foreground">
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
              )
            })}
          </div>
        </Container>
      </section> */}

      {/* Hero Section & Cards (Merged) */}
      <section className="min-h-screen flex items-center justify-center relative py-20 md:py-28 bg-gradient-to-b from-primary/[0.03] via-background to-background">
        <Container>
          {/* Hero Text */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              Get In Touch
            </span>
            <Heading as="h1" level="h1" className="mt-6 mb-6">
              Contact Us
            </Heading>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Have questions about our projects or want to schedule a site visit? We're here to help
              you make the right investment decision.
            </p>
          </div>

          {/* Contact Info Cards (Moved Here) */}
          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div
                  key={index}
                  className="rounded-xl border border-border/50 bg-muted/20 p-6 text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-lg font-heading font-semibold text-foreground">
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 border-t border-border/50 bg-muted/20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Form */}
            <div>
              <Heading as="h2" level="h3" className="mb-2">
                Send Us a Message
              </Heading>
              <p className="mb-8 text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
              <div className="rounded-xl border border-border/50 bg-background p-8">
                <ContactForm />
              </div>
            </div>

            {/* Map */}
            <div>
              <Heading as="h2" level="h3" className="mb-2">
                Find Us
              </Heading>
              <p className="mb-8 text-muted-foreground">
                Visit our office in Nashik to discuss your requirements in person.
              </p>
              <div className="rounded-xl overflow-hidden border border-border/50 h-[600px] bg-muted/30">
                <iframe
                  src="https://www.google.com/maps?q=19.9975,73.7898&z=12&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section (Optional) */}
      <section className="py-16 border-t border-border/50">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading as="h2" level="h2" className="mb-8 text-center">
              Frequently Asked Questions
            </Heading>
            <div className="space-y-6">
              {[
                {
                  q: 'What are your office hours?',
                  a: 'We are open Monday through Saturday from 9:00 AM to 6:00 PM IST. Sunday by appointment only.',
                },
                {
                  q: 'How can I schedule a site visit?',
                  a: 'You can schedule a site visit by filling out the contact form, calling us directly, or clicking the "Schedule Visit" button on any project page.',
                },
                {
                  q: 'Do you offer financing options?',
                  a: 'Yes, we work with several financial institutions to provide flexible payment and financing options. Contact us to learn more about available schemes.',
                },
              ].map((faq, index) => (
                <div key={index} className="rounded-lg border border-border/50 bg-muted/20 p-6">
                  <h3 className="mb-2 text-lg font-heading font-semibold text-foreground">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
