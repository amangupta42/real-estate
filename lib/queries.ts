// GROQ Queries for Sanity CMS

// All projects query
export const allProjectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  status,
  propertyType,
  landCategory,
  location,
  indianAddress,
  totalArea,
  legalDocumentation {
    landUseStatus,
    reraRegistered
  },
  heroImage,
  currentPhase,
  nearbyLandmarks[] {
    name,
    category,
    distance,
    significance
  }
}`

// Featured projects for homepage (ongoing only, limit 3)
export const featuredProjectsQuery = `*[_type == "project" && status == "Ongoing"] | order(_createdAt desc) [0..2] {
  _id,
  title,
  slug,
  status,
  propertyType,
  landCategory,
  location,
  indianAddress,
  totalArea,
  legalDocumentation {
    landUseStatus,
    reraRegistered
  },
  heroImage,
  currentPhase,
  nearbyLandmarks[] {
    name,
    category,
    distance,
    significance
  }
}`

// Single project query (comprehensive - for project detail pages)
export const projectQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  status,
  propertyType,
  landCategory,
  currentPhase,

  indianAddress,
  location,

  legalDocumentation {
    landUseStatus,
    surveyNumbers,
    naSanctionDetails {
      sanctionedBy,
      letterNumber,
      sanctionDate
    },
    sanadDetails {
      issuedBy,
      issueDate
    },
    governmentDuesClearedStatus,
    reraRegistered,
    reraNumber,
    reraWebsiteUrl,
    conversionPotential
  },
  availableDocuments[] {
    documentName,
    documentType,
    description,
    issueDate
  },

  totalArea,
  areaBreakdown[] {
    areaType,
    area,
    description
  },
  minimumPlotSize,

  infrastructure {
    waterSupply {
      source,
      pipeSize,
      connectionStatus,
      additionalDetails
    },
    electricity {
      connectionStatus,
      transformerDetails,
      chargesPaid
    },
    roadAccess {
      mainRoadAccess,
      roadType,
      internalRoads,
      roadWidth
    },
    otherUtilities[] {
      utilityType,
      status,
      description
    }
  },

  nearbyLandmarks[] {
    name,
    category,
    distance,
    significance,
    description
  },
  naturalFeatures,
  vastuFeatures {
    vastuCompliant,
    directionFeatures
  },

  suitabilityDescription,
  suitabilityTypes,
  investmentBenefits,
  developmentRestrictions,
  expansionOpportunities[] {
    description,
    surveyNumber,
    area,
    status
  },

  heroImage,
  gallery,
  droneVideoUrl,
  virtualTourUrl,
  layoutPlanImage,
  brochureFile,

  interactiveLayoutData
}`

// All project slugs (for generateStaticParams)
export const projectSlugsQuery = `*[_type == "project"].slug.current`

// Related projects query (same status, exclude current)
export const relatedProjectsQuery = `*[_type == "project" && status == $status && slug.current != $slug] | order(_createdAt desc) [0..2] {
  _id,
  title,
  slug,
  status,
  propertyType,
  landCategory,
  location,
  indianAddress,
  totalArea,
  legalDocumentation {
    landUseStatus,
    reraRegistered
  },
  heroImage,
  currentPhase,
  nearbyLandmarks[] {
    name,
    category,
    distance,
    significance
  }
}`

// Testimonials query
export const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  clientName,
  quote,
  videoUrl,
  "associatedProject": associatedProject->{
    title,
    slug
  }
}`

// Legacy page query (singleton)
export const legacyPageQuery = `*[_type == "legacyPage"][0] {
  _id,
  pageTitle,
  founderStory,
  companyMission,
  teamMembers
}`

// Neighborhood guide query
export const neighborhoodGuideQuery = `*[_type == "neighborhoodGuide" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  overview,
  keyAmenities,
  mapCoordinates
}`

// All neighborhood guide slugs
export const neighborhoodGuideSlugsQuery = `*[_type == "neighborhoodGuide"].slug.current`

// All neighborhood guides
export const allNeighborhoodGuidesQuery = `*[_type == "neighborhoodGuide"] | order(name asc) {
  _id,
  name,
  slug,
  keyAmenities
}`
