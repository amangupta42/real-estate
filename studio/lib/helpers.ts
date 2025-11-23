/**
 * Helper utilities for custom Sanity Studio components
 */

// Unit conversion constants
export const CONVERSION_FACTORS = {
  SQM_TO_SQFT: 10.7639,
  SQM_TO_ACRES: 0.000247105,
  SQM_TO_HECTARES: 0.0001,
  SQM_TO_GUNTHAS: 0.00988422, // 1 guntha = 101.17 sq meters (Maharashtra)
}

/**
 * Convert square meters to other units
 */
export function convertArea(squareMeters: number) {
  return {
    squareMeters,
    squareFeet: squareMeters * CONVERSION_FACTORS.SQM_TO_SQFT,
    acres: squareMeters * CONVERSION_FACTORS.SQM_TO_ACRES,
    hectares: squareMeters * CONVERSION_FACTORS.SQM_TO_HECTARES,
    gunthas: squareMeters * CONVERSION_FACTORS.SQM_TO_GUNTHAS,
  }
}

/**
 * Format number with Indian locale
 */
export function formatNumber(num: number, decimals: number = 2): string {
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * Validate measurement tolerance (1% difference allowed)
 */
export function isWithinTolerance(
  calculated: number,
  manual: number,
  tolerance: number = 0.01
): boolean {
  const diff = Math.abs(calculated - manual)
  const percentDiff = diff / calculated
  return percentDiff <= tolerance
}

/**
 * Calculate total from area breakdown
 */
export function calculateTotalArea(breakdown: Array<{ area?: { squareMeters?: number } }>): number {
  return breakdown.reduce((total, item) => {
    return total + (item.area?.squareMeters || 0)
  }, 0)
}

/**
 * Get status color for plot status
 */
export function getStatusColor(status: string): string {
  const colors = {
    Available: '#22c55e', // green
    Sold: '#ef4444', // red
    Reserved: '#eab308', // yellow
  }
  return colors[status as keyof typeof colors] || '#6b7280' // gray
}

/**
 * Get property type icon
 */
export function getPropertyTypeIcon(type: string): string {
  const icons = {
    residential: '🏘️',
    agricultural: '🌾',
    commercial: '🏢',
    mixed_use: '🏗️',
    industrial: '🏭',
  }
  return icons[type as keyof typeof icons] || '📍'
}

/**
 * Format Indian address
 */
export function formatIndianAddress(address: {
  village?: string
  taluka?: string
  district?: string
  state?: string
  pincode?: string
}): string {
  const parts = [
    address.village,
    address.taluka,
    address.district,
    address.state,
    address.pincode,
  ].filter(Boolean)

  return parts.join(', ')
}

/**
 * Validate RERA number format
 */
export function validateReraNumber(reraNumber: string): boolean {
  // RERA number format: State code (2 chars) + Year (4 digits) + Random (rest)
  const reraPattern = /^[A-Z]{2}\d{4}/
  return reraPattern.test(reraNumber)
}

/**
 * Generate random color for chart
 */
export function generateChartColor(index: number): string {
  const colors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#14b8a6', // teal
    '#f97316', // orange
  ]
  return colors[index % colors.length]
}
