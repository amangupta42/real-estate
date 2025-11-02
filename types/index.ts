// Sanity CMS Types
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface SanityGeopoint {
  _type: 'geopoint'
  lat: number
  lng: number
  alt?: number
}

// Project Types
export type ProjectStatus = 'Ongoing' | 'Completed' | 'Upcoming'

export interface Project {
  _id: string
  _type: 'project'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  status: ProjectStatus
  location: SanityGeopoint
  projectSize: string
  reraNumber: string
  plotSizesAvailable: string
  currentPhase: string
  heroImage: SanityImage
  gallery?: SanityImage[]
  droneVideoUrl?: string
  layoutPlanImage?: SanityImage
  brochureFile?: SanityFile
  locationalBenefits?: any // Portable Text
  suitabilityDescription?: any // Portable Text
  interactiveLayoutData?: {
    plots: Array<{
      plotNumber: string
      status: 'Available' | 'Sold' | 'Reserved'
    }>
  }
}

// Testimonial Types
export interface Testimonial {
  _id: string
  _type: 'testimonial'
  _createdAt: string
  clientName: string
  quote: string
  videoUrl?: string
  associatedProject?: {
    title: string
    slug: {
      _type: 'slug'
      current: string
    }
  }
}

// Legacy Page Types
export interface TeamMember {
  name: string
  role: string
  photo: SanityImage
}

export interface LegacyPage {
  _id: string
  _type: 'legacyPage'
  pageTitle: string
  founderStory?: any // Portable Text
  companyMission?: any // Portable Text
  teamMembers?: TeamMember[]
}

// Neighborhood Guide Types
export interface NeighborhoodGuide {
  _id: string
  _type: 'neighborhoodGuide'
  name: string
  slug: {
    _type: 'slug'
    current: string
  }
  overview?: any // Portable Text
  keyAmenities?: string[]
  mapCoordinates?: SanityGeopoint
}
