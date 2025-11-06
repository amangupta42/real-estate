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

// Indian Address Type
export interface IndianAddress {
  _type: 'indianAddress'
  village?: string
  taluka: string
  district: string
  state: string
  pincode?: string
  nearestCity?: string
}

// Measurement Type
export interface Measurement {
  _type: 'measurement'
  squareMeters: number
  squareFeet?: number
  acres?: number
  hectares?: number
  gunthas?: number
}

// Legal Documentation Types
export type LandUseStatus =
  | 'final_na_residential'
  | 'final_na_commercial'
  | 'final_na_mixed'
  | 'na_in_process'
  | 'agricultural_conversion_potential'
  | 'agricultural_no_conversion'

export interface NASanctionDetails {
  sanctionedBy?: string
  letterNumber?: string
  sanctionDate?: string
}

export interface SanadDetails {
  issuedBy?: string
  issueDate?: string
}

export interface LegalDocumentation {
  _type: 'legalDocumentation'
  landUseStatus: LandUseStatus
  surveyNumbers: string[]
  naSanctionDetails?: NASanctionDetails
  sanadDetails?: SanadDetails
  governmentDuesClearedStatus?: boolean
  reraRegistered?: boolean
  reraNumber?: string
  reraWebsiteUrl?: string
  conversionPotential?: string
}

// Infrastructure Types
export type ConnectionStatus = 'connected' | 'planned' | 'not_available'
export type RoadType = 'paved' | 'tar' | 'gravel' | 'dirt'

export interface WaterSupply {
  source?: string
  pipeSize?: string
  connectionStatus?: ConnectionStatus
  additionalDetails?: string
}

export interface Electricity {
  connectionStatus?: ConnectionStatus
  transformerDetails?: string
  chargesPaid?: boolean
}

export interface RoadAccess {
  mainRoadAccess?: boolean
  roadType?: RoadType
  internalRoads?: boolean
  roadWidth?: string
}

export interface OtherUtility {
  utilityType?: 'drainage' | 'sewage' | 'gas' | 'street_lights' | 'security' | 'other'
  status?: ConnectionStatus
  description?: string
}

export interface InfrastructureDetails {
  _type: 'infrastructureDetails'
  waterSupply?: WaterSupply
  electricity?: Electricity
  roadAccess?: RoadAccess
  otherUtilities?: OtherUtility[]
}

// Nearby Landmark Types
export type LandmarkCategory =
  | 'religious'
  | 'medical'
  | 'educational'
  | 'transportation'
  | 'highway'
  | 'commercial'
  | 'natural'
  | 'industrial'
  | 'residential'
  | 'government'
  | 'other'

export type LandmarkSignificance = 'high' | 'medium' | 'low'

export interface NearbyLandmark {
  _type: 'nearbyLandmark'
  name: string
  category: LandmarkCategory
  distance: number
  significance?: LandmarkSignificance
  description?: string
}

// Available Document Types
export type DocumentType =
  | 'na_sanction'
  | 'sanad'
  | 'rera'
  | 'government_clearance'
  | 'survey'
  | 'seven_twelve'
  | 'property_tax'
  | 'utility_approval'
  | 'other_legal'

export interface AvailableDocument {
  _type: 'availableDocument'
  documentName: string
  documentType: DocumentType
  description?: string
  issueDate?: string
}

// Area Breakdown Types
export type AreaType =
  | 'plotted'
  | 'amenity'
  | 'roads'
  | 'open_space'
  | 'green_belt'
  | 'commercial'
  | 'other'

export interface AreaBreakdown {
  areaType?: AreaType
  area?: Measurement
  description?: string
}

// Expansion Opportunity Types
export type ExpansionStatus = 'available' | 'negotiation' | 'sold'

export interface ExpansionOpportunity {
  description?: string
  surveyNumber?: string
  area?: Measurement
  status?: ExpansionStatus
}

// Vastu Features Type
export interface VastuFeatures {
  vastuCompliant?: boolean
  directionFeatures?: string[]
}

// Suitability Types
export type SuitabilityType =
  | 'residential_development'
  | 'second_homes'
  | 'eco_resorts'
  | 'agri_tourism'
  | 'warehouse'
  | 'mixed_use'
  | 'farmhouse'
  | 'investment'

// Project Types
export type ProjectStatus = 'Ongoing' | 'Completed' | 'Upcoming'
export type PropertyType =
  | 'residential'
  | 'agricultural'
  | 'commercial'
  | 'mixed_use'
  | 'industrial'
export type LandCategory =
  | 'plotted_development'
  | 'agricultural_land'
  | 'open_land'
  | 'gated_community'

export interface Project {
  _id: string
  _type: 'project'
  _createdAt: string
  _updatedAt: string

  // Basic Information
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  status: ProjectStatus
  propertyType: PropertyType
  landCategory: LandCategory
  currentPhase?: string

  // Location & Address
  indianAddress: IndianAddress
  location: SanityGeopoint

  // Legal & Documentation
  legalDocumentation: LegalDocumentation
  availableDocuments?: AvailableDocument[]

  // Measurements & Area
  totalArea: Measurement
  areaBreakdown?: AreaBreakdown[]
  minimumPlotSize?: Measurement

  // Infrastructure
  infrastructure?: InfrastructureDetails

  // Location Benefits
  nearbyLandmarks?: NearbyLandmark[]
  naturalFeatures?: string[]
  vastuFeatures?: VastuFeatures

  // Development & Suitability
  suitabilityDescription?: any // Portable Text
  suitabilityTypes?: SuitabilityType[]
  investmentBenefits?: string[]
  developmentRestrictions?: string
  expansionOpportunities?: ExpansionOpportunity[]

  // Media & Gallery
  heroImage: SanityImage
  gallery?: SanityImage[]
  droneVideoUrl?: string
  virtualTourUrl?: string
  layoutPlanImage?: SanityImage
  brochureFile?: SanityFile

  // Interactive Features
  interactiveLayoutData?: Array<{
    plotNumber: string
    size: string
    status: 'Available' | 'Sold' | 'Reserved'
    price?: string
    x: number
    y: number
  }>

  // Legacy/Deprecated Fields (kept for backward compatibility with existing data)
  projectSize?: string
  plotSizesAvailable?: string[]
  locationalBenefits?: string[]
  reraNumber?: string
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
