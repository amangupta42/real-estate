import type {
  IndianAddress,
  LandUseStatus,
  PropertyType,
  LandCategory,
  LandmarkCategory,
  DocumentType,
  ConnectionStatus,
  AreaType,
  SuitabilityType,
} from '@/types'

/**
 * Formatting Utility Functions
 * Handles display formatting for various property data types
 */

// ==================== ADDRESS FORMATTING ====================

/**
 * Format Indian address for display
 */
export function formatIndianAddress(
  address: IndianAddress | undefined,
  options: { format?: 'full' | 'short' | 'oneLine'; includeNearestCity?: boolean } = {}
): string {
  const { format = 'full', includeNearestCity = true } = options

  if (!address) return 'N/A'

  const parts: string[] = []

  if (address.village) parts.push(address.village)
  if (address.taluka) parts.push(address.taluka)
  if (address.district) parts.push(address.district)
  if (address.state) parts.push(address.state)

  if (format === 'short') {
    // Taluka, District format
    return [address.taluka, address.district].filter(Boolean).join(', ')
  }

  if (format === 'oneLine') {
    const line = parts.join(', ')
    if (includeNearestCity && address.nearestCity) {
      return `${line} (Near ${address.nearestCity})`
    }
    return line
  }

  // Full format with line breaks
  const lines: string[] = []
  if (address.village) lines.push(address.village)
  lines.push([address.taluka, address.district].filter(Boolean).join(', '))
  if (address.state) lines.push(address.state)
  if (address.pincode) lines.push(`PIN: ${address.pincode}`)
  if (includeNearestCity && address.nearestCity) lines.push(`Near ${address.nearestCity}`)

  return lines.join('\n')
}

// ==================== PROPERTY TYPE LABELS ====================

const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  residential: 'Residential',
  agricultural: 'Agricultural',
  commercial: 'Commercial',
  mixed_use: 'Mixed-Use',
  industrial: 'Industrial',
}

export function formatPropertyType(type: PropertyType | undefined): string {
  if (!type) return 'N/A'
  return PROPERTY_TYPE_LABELS[type] || type
}

const LAND_CATEGORY_LABELS: Record<LandCategory, string> = {
  plotted_development: 'Plotted Development',
  agricultural_land: 'Agricultural Land',
  open_land: 'Open Land',
  gated_community: 'Gated Community',
}

export function formatLandCategory(category: LandCategory | undefined): string {
  if (!category) return 'N/A'
  return LAND_CATEGORY_LABELS[category] || category
}

// ==================== LEGAL STATUS LABELS ====================

const LAND_USE_STATUS_LABELS: Record<LandUseStatus, string> = {
  final_na_residential: 'Final NA - Residential',
  final_na_commercial: 'Final NA - Commercial',
  final_na_mixed: 'Final NA - Mixed Use',
  na_in_process: 'NA in Process',
  agricultural_conversion_potential: 'Agricultural (Conversion Potential)',
  agricultural_no_conversion: 'Agricultural',
}

const LAND_USE_STATUS_SHORT: Record<LandUseStatus, string> = {
  final_na_residential: 'NA Residential',
  final_na_commercial: 'NA Commercial',
  final_na_mixed: 'NA Mixed',
  na_in_process: 'NA Processing',
  agricultural_conversion_potential: 'Agri (Conv.)',
  agricultural_no_conversion: 'Agricultural',
}

export function formatLandUseStatus(
  status: LandUseStatus | undefined,
  short: boolean = false
): string {
  if (!status) return 'N/A'
  return short ? LAND_USE_STATUS_SHORT[status] || status : LAND_USE_STATUS_LABELS[status] || status
}

/**
 * Format survey numbers for display
 */
export function formatSurveyNumbers(surveyNumbers: string[] | undefined): string {
  if (!surveyNumbers || surveyNumbers.length === 0) return 'N/A'
  return surveyNumbers.join(', ')
}

// ==================== LANDMARK FORMATTING ====================

const LANDMARK_CATEGORY_LABELS: Record<LandmarkCategory, string> = {
  religious: 'Religious/Spiritual',
  medical: 'Medical/Healthcare',
  educational: 'Educational',
  transportation: 'Transportation Hub',
  highway: 'Highway/Road',
  commercial: 'Commercial/Shopping',
  natural: 'Natural Feature',
  industrial: 'Industrial Zone',
  residential: 'Residential Area',
  government: 'Government Office',
  other: 'Other',
}

export function formatLandmarkCategory(category: LandmarkCategory | undefined): string {
  if (!category) return 'N/A'
  return LANDMARK_CATEGORY_LABELS[category] || category
}

/**
 * Format distance for display
 */
export function formatDistance(distanceKm: number | undefined): string {
  if (distanceKm === undefined) return 'N/A'

  if (distanceKm === 0) return 'On-site'
  if (distanceKm < 1) return `${(distanceKm * 1000).toFixed(0)} meters`
  if (distanceKm < 10) return `${distanceKm.toFixed(1)} km`
  return `${distanceKm.toFixed(0)} km`
}

// ==================== DOCUMENT TYPE LABELS ====================

const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  na_sanction: 'NA Sanction Letter',
  sanad: 'Sanad Certificate',
  rera: 'RERA Certificate',
  government_clearance: 'Government Clearance',
  survey: 'Survey Document',
  seven_twelve: '7/12 Extract',
  property_tax: 'Property Tax Receipt',
  utility_approval: 'Utility Connection Approval',
  other_legal: 'Legal Document',
}

export function formatDocumentType(type: DocumentType | undefined): string {
  if (!type) return 'N/A'
  return DOCUMENT_TYPE_LABELS[type] || type
}

// ==================== INFRASTRUCTURE STATUS ====================

const CONNECTION_STATUS_LABELS: Record<ConnectionStatus, { label: string; color: string }> = {
  connected: { label: 'Connected', color: 'text-green-600' },
  planned: { label: 'Planned', color: 'text-yellow-600' },
  not_available: { label: 'Not Available', color: 'text-gray-400' },
}

export function formatConnectionStatus(status: ConnectionStatus | undefined): {
  label: string
  color: string
} {
  if (!status) return { label: 'N/A', color: 'text-gray-400' }
  return CONNECTION_STATUS_LABELS[status] || { label: status, color: 'text-gray-600' }
}

// ==================== AREA TYPE LABELS ====================

const AREA_TYPE_LABELS: Record<AreaType, string> = {
  plotted: 'Plotted Area',
  amenity: 'Amenity Plot',
  roads: 'Roads',
  open_space: 'Open Space',
  green_belt: 'Green Belt',
  commercial: 'Commercial Area',
  other: 'Other',
}

export function formatAreaType(type: AreaType | undefined): string {
  if (!type) return 'N/A'
  return AREA_TYPE_LABELS[type] || type
}

// ==================== SUITABILITY TYPE LABELS ====================

const SUITABILITY_TYPE_LABELS: Record<SuitabilityType, string> = {
  residential_development: 'Residential Development',
  second_homes: 'Second Homes',
  eco_resorts: 'Eco-Resorts',
  agri_tourism: 'Agri-Tourism',
  warehouse: 'Warehouse/Logistics',
  mixed_use: 'Mixed-Use Development',
  farmhouse: 'Farmhouse Plots',
  investment: 'Investment/Land Banking',
}

export function formatSuitabilityType(type: SuitabilityType | undefined): string {
  if (!type) return 'N/A'
  return SUITABILITY_TYPE_LABELS[type] || type
}

/**
 * Format suitability types as comma-separated list
 */
export function formatSuitabilityTypes(types: SuitabilityType[] | undefined): string {
  if (!types || types.length === 0) return 'N/A'
  return types.map((t) => formatSuitabilityType(t)).join(', ')
}

// ==================== DATE FORMATTING ====================

/**
 * Format date for Indian locale
 */
export function formatDate(
  dateString: string | undefined,
  options: { format?: 'short' | 'long' | 'relative' } = {}
): string {
  const { format = 'short' } = options

  if (!dateString) return 'N/A'

  const date = new Date(dateString)

  if (format === 'relative') {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  if (format === 'long') {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // Short format: DD-MM-YYYY
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// ==================== BADGE COLOR HELPERS ====================

/**
 * Get color classes for property status badges
 */
export function getStatusBadgeColor(status: 'Ongoing' | 'Completed' | 'Upcoming'): {
  bg: string
  text: string
  border: string
} {
  switch (status) {
    case 'Ongoing':
      return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' }
    case 'Completed':
      return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' }
    case 'Upcoming':
      return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' }
  }
}

/**
 * Get color classes for land use status badges
 */
export function getLandUseBadgeColor(status: LandUseStatus): {
  bg: string
  text: string
  border: string
} {
  if (status.startsWith('final_na')) {
    return { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' }
  }
  if (status === 'na_in_process') {
    return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' }
  }
  if (status === 'agricultural_conversion_potential') {
    return { bg: 'bg-lime-100', text: 'text-lime-800', border: 'border-lime-200' }
  }
  return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' }
}

/**
 * Get icon for landmark category
 */
export function getLandmarkIcon(category: LandmarkCategory): string {
  const icons: Record<LandmarkCategory, string> = {
    religious: '🛕',
    medical: '🏥',
    educational: '🎓',
    transportation: '🚉',
    highway: '🛣️',
    commercial: '🏪',
    natural: '🌳',
    industrial: '🏭',
    residential: '🏘️',
    government: '🏛️',
    other: '📍',
  }
  return icons[category] || '📍'
}

/**
 * Get icon for infrastructure utility
 */
export function getUtilityIcon(
  utility:
    | 'water'
    | 'electricity'
    | 'road'
    | 'drainage'
    | 'sewage'
    | 'gas'
    | 'street_lights'
    | 'security'
): string {
  const icons = {
    water: '💧',
    electricity: '⚡',
    road: '🛣️',
    drainage: '🌊',
    sewage: '🚰',
    gas: '🔥',
    street_lights: '💡',
    security: '🔒',
  }
  return icons[utility] || '🔧'
}
