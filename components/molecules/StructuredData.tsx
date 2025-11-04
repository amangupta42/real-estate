export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Ajit J Gupta and Associates',
    description:
      'Premium land development opportunities in Nashik and surrounding areas with RERA certification.',
    url: 'https://ajitjgupta.com',
    telephone: '+91 9371410666',
    email: 'info@ajitjgupta.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nashik',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: 'Nashik',
    },
    priceRange: '$$',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function LocalBusinessStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': 'https://ajitjgupta.com',
    name: 'Ajit J Gupta and Associates',
    image: 'https://ajitjgupta.com/og-default.png',
    description:
      'Premium RERA-certified land development company in Nashik offering prime plots with excellent connectivity and modern infrastructure.',
    url: 'https://ajitjgupta.com',
    telephone: '+91 9371410666',
    email: 'info@ajitjgupta.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Nashik',
      addressLocality: 'Nashik',
      addressRegion: 'Maharashtra',
      postalCode: '422001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.9975,
      longitude: 73.7898,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    areaServed: [
      {
        '@type': 'City',
        name: 'Nashik',
      },
      {
        '@type': 'State',
        name: 'Maharashtra',
      },
    ],
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'EMI'],
    currenciesAccepted: 'INR',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
