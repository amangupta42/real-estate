// GROQ Queries for Sanity CMS

// All projects query
export const allProjectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  status,
  location,
  projectSize,
  heroImage,
  currentPhase
}`

// Featured projects for homepage (ongoing only, limit 3)
export const featuredProjectsQuery = `*[_type == "project" && status == "Ongoing"] | order(_createdAt desc) [0..2] {
  _id,
  title,
  slug,
  status,
  location,
  projectSize,
  heroImage,
  currentPhase
}`

// Single project query
export const projectQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  status,
  location,
  projectSize,
  reraNumber,
  plotSizesAvailable,
  currentPhase,
  heroImage,
  gallery,
  droneVideoUrl,
  layoutPlanImage,
  brochureFile,
  locationalBenefits,
  suitabilityDescription,
  interactiveLayoutData
}`

// All project slugs (for generateStaticParams)
export const projectSlugsQuery = `*[_type == "project"].slug.current`

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
