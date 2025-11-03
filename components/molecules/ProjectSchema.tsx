import type { Project } from '@/types'

interface ProjectSchemaProps {
  project: Pick<
    Project,
    'title' | 'suitabilityDescription' | 'location' | 'heroImage' | 'reraNumber' | 'projectSize'
  >
  slug: string
}

export function ProjectSchema({ project, slug }: ProjectSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

  // Safely extract description from Portable Text
  const getDescription = () => {
    try {
      if (Array.isArray(project.suitabilityDescription) && project.suitabilityDescription[0]) {
        const firstBlock = project.suitabilityDescription[0]
        if (firstBlock.children && Array.isArray(firstBlock.children) && firstBlock.children[0]) {
          return firstBlock.children[0].text || `Premium land development project in Nashik`
        }
      }
    } catch (e) {
      // Ignore errors
    }
    return `Premium land development project in Nashik`
  }

  const description = getDescription()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: project.title,
    description,
    url: `${baseUrl}/projects/${slug}`,
    ...(project.heroImage && {
      image: `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${project.heroImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`,
    }),
    ...(project.location && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: project.location.lat,
        longitude: project.location.lng,
      },
    }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nashik',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    ...(project.reraNumber && {
      identifier: {
        '@type': 'PropertyValue',
        name: 'RERA Registration',
        value: project.reraNumber,
      },
    }),
    ...(project.projectSize && {
      floorSize: {
        '@type': 'QuantitativeValue',
        value: project.projectSize,
      },
    }),
    provider: {
      '@type': 'Organization',
      name: 'RealEstate',
      url: baseUrl,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
