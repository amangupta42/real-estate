import type { NeighborhoodGuide } from '@/types'

interface NeighborhoodSchemaProps {
  neighborhood: Pick<NeighborhoodGuide, 'name' | 'overview' | 'keyAmenities' | 'mapCoordinates'>
  slug: string
}

export function NeighborhoodSchema({ neighborhood, slug }: NeighborhoodSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

  const description =
    neighborhood.overview?.[0]?.children?.[0]?.text ||
    `Explore ${neighborhood.name} in Nashik - amenities, connectivity, and more`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: neighborhood.name,
    description,
    url: `${baseUrl}/nashik-advantage/${slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: neighborhood.name,
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    ...(neighborhood.mapCoordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: neighborhood.mapCoordinates.lat,
        longitude: neighborhood.mapCoordinates.lng,
      },
    }),
    ...(neighborhood.keyAmenities &&
      neighborhood.keyAmenities.length > 0 && {
        amenityFeature: neighborhood.keyAmenities.map((amenity) => ({
          '@type': 'LocationFeatureSpecification',
          name: amenity,
        })),
      }),
    containedInPlace: {
      '@type': 'City',
      name: 'Nashik',
      '@id': 'https://en.wikipedia.org/wiki/Nashik',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
