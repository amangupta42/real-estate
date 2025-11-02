export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'RealEstate',
    description:
      'Premium land development opportunities in Nashik and surrounding areas with RERA certification.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com',
    telephone: '+91-XXXXX-XXXXX',
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
