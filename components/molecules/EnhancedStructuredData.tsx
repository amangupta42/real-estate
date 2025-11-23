// Enhanced Structured Data components for better SEO

interface AggregateRatingProps {
  ratingValue: number
  reviewCount: number
  bestRating?: number
}

export function AggregateRatingSchema({
  ratingValue,
  reviewCount,
  bestRating = 5,
}: AggregateRatingProps) {
  const schema = {
    '@type': 'AggregateRating',
    ratingValue: ratingValue.toString(),
    reviewCount: reviewCount.toString(),
    bestRating: bestRating.toString(),
    worstRating: '1',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ReviewSchemaProps {
  author: string
  reviewBody: string
  ratingValue: number
  datePublished: string
  itemReviewed: {
    name: string
    type: string
  }
}

export function ReviewSchema({
  author,
  reviewBody,
  ratingValue,
  datePublished,
  itemReviewed,
}: ReviewSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: author,
    },
    reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: ratingValue.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    datePublished,
    itemReviewed: {
      '@type': itemReviewed.type,
      name: itemReviewed.name,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface PropertyValueSchemaProps {
  name: string
  value: string | number
  minValue?: number
  maxValue?: number
  unitText?: string
}

export function PropertyValueSchema({
  name,
  value,
  minValue,
  maxValue,
  unitText,
}: PropertyValueSchemaProps) {
  const schema: any = {
    '@type': 'PropertyValue',
    name,
    value: value.toString(),
  }

  if (minValue !== undefined) schema.minValue = minValue.toString()
  if (maxValue !== undefined) schema.maxValue = maxValue.toString()
  if (unitText) schema.unitText = unitText

  return schema
}

interface RealEstateListingSchemaProps {
  name: string
  description: string
  url: string
  images: string[]
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode?: string
    addressCountry: string
  }
  geo?: {
    latitude: number
    longitude: number
  }
  priceRange?: string
  numberOfRooms?: number
  floorSize?: {
    value: number
    unitText: string
  }
  amenityFeature?: string[]
  datePosted?: string
  availableFrom?: string
}

export function RealEstateListingSchema({
  name,
  description,
  url,
  images,
  address,
  geo,
  priceRange,
  numberOfRooms,
  floorSize,
  amenityFeature,
  datePosted,
  availableFrom,
}: RealEstateListingSchemaProps) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name,
    description,
    url,
    image: images,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
  }

  if (geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude.toString(),
      longitude: geo.longitude.toString(),
    }
  }

  if (priceRange) schema.price = priceRange
  if (numberOfRooms) schema.numberOfRooms = numberOfRooms.toString()
  if (floorSize) {
    schema.floorSize = {
      '@type': 'QuantitativeValue',
      value: floorSize.value.toString(),
      unitText: floorSize.unitText,
    }
  }
  if (amenityFeature) {
    schema.amenityFeature = amenityFeature.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
    }))
  }
  if (datePosted) schema.datePosted = datePosted
  if (availableFrom) schema.availableFrom = availableFrom

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface LocalBusinessWithRatingProps {
  name: string
  description: string
  url: string
  telephone: string
  email: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode?: string
    addressCountry: string
  }
  geo?: {
    latitude: number
    longitude: number
  }
  openingHours?: string[]
  priceRange?: string
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
  image?: string
  sameAs?: string[]
}

export function LocalBusinessWithRatingSchema({
  name,
  description,
  url,
  telephone,
  email,
  address,
  geo,
  openingHours,
  priceRange,
  aggregateRating,
  image,
  sameAs,
}: LocalBusinessWithRatingProps) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name,
    description,
    url,
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
  }

  if (geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude.toString(),
      longitude: geo.longitude.toString(),
    }
  }

  if (openingHours) schema.openingHoursSpecification = openingHours
  if (priceRange) schema.priceRange = priceRange
  if (image) schema.image = image
  if (sameAs) schema.sameAs = sameAs

  if (aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue.toString(),
      reviewCount: aggregateRating.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQSchemaItem {
  question: string
  answer: string
}

export function FAQPageSchema({ faqs }: { faqs: FAQSchemaItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface HowToSchemaProps {
  name: string
  description: string
  image?: string
  totalTime?: string
  steps: Array<{
    name: string
    text: string
    image?: string
  }>
}

export function HowToSchema({ name, description, image, totalTime, steps }: HowToSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    image,
    totalTime,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
