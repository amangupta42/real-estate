import type { Measurement } from '@/types'

/**
 * Measurement Utility Functions
 * Handles conversions, calculations, and formatting for property area measurements
 */

// Conversion constants
const CONVERSION_FACTORS = {
  SQM_TO_SQFT: 10.764,
  SQM_TO_ACRES: 1 / 4047,
  SQM_TO_HECTARES: 1 / 10000,
  SQM_TO_GUNTHAS: 1 / 101.17, // Maharashtra-specific
}

/**
 * Calculate all measurement units from square meters
 */
export function calculateMeasurements(squareMeters: number): Measurement {
  return {
    _type: 'measurement',
    squareMeters,
    squareFeet: squareMeters * CONVERSION_FACTORS.SQM_TO_SQFT,
    acres: squareMeters * CONVERSION_FACTORS.SQM_TO_ACRES,
    hectares: squareMeters * CONVERSION_FACTORS.SQM_TO_HECTARES,
    gunthas: squareMeters * CONVERSION_FACTORS.SQM_TO_GUNTHAS,
  }
}

/**
 * Calculate square meters from other units
 */
export function toSquareMeters(
  value: number,
  unit: 'sqft' | 'acres' | 'hectares' | 'gunthas'
): number {
  switch (unit) {
    case 'sqft':
      return value / CONVERSION_FACTORS.SQM_TO_SQFT
    case 'acres':
      return value / CONVERSION_FACTORS.SQM_TO_ACRES
    case 'hectares':
      return value / CONVERSION_FACTORS.SQM_TO_HECTARES
    case 'gunthas':
      return value / CONVERSION_FACTORS.SQM_TO_GUNTHAS
  }
}

/**
 * Format a number with Indian numbering system (lakhs/crores)
 */
export function formatIndianNumber(num: number): string {
  const numStr = Math.round(num).toString()
  const lastThree = numStr.substring(numStr.length - 3)
  const otherNumbers = numStr.substring(0, numStr.length - 3)

  if (otherNumbers !== '') {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
  }
  return lastThree
}

/**
 * Format measurement for display with unit
 */
export function formatMeasurement(
  measurement: Measurement | undefined,
  unit: 'sqm' | 'sqft' | 'acres' | 'hectares' | 'gunthas' = 'sqm',
  options: {
    showUnit?: boolean
    precision?: number
    useIndianFormat?: boolean
  } = {}
): string {
  const { showUnit = true, precision = 2, useIndianFormat = true } = options

  if (!measurement) return 'N/A'

  let value: number
  let unitLabel: string

  switch (unit) {
    case 'sqm':
      value = measurement.squareMeters
      unitLabel = 'sq.m'
      break
    case 'sqft':
      value = measurement.squareFeet || measurement.squareMeters * CONVERSION_FACTORS.SQM_TO_SQFT
      unitLabel = 'sq.ft'
      break
    case 'acres':
      value = measurement.acres || measurement.squareMeters * CONVERSION_FACTORS.SQM_TO_ACRES
      unitLabel = 'acres'
      break
    case 'hectares':
      value = measurement.hectares || measurement.squareMeters * CONVERSION_FACTORS.SQM_TO_HECTARES
      unitLabel = 'hectares'
      break
    case 'gunthas':
      value = measurement.gunthas || measurement.squareMeters * CONVERSION_FACTORS.SQM_TO_GUNTHAS
      unitLabel = 'gunthas'
      break
  }

  const formattedValue = useIndianFormat
    ? formatIndianNumber(value)
    : value.toLocaleString('en-IN', { maximumFractionDigits: precision })

  return showUnit ? `${formattedValue} ${unitLabel}` : formattedValue
}

/**
 * Get smart display format (automatically choose best unit)
 */
export function formatMeasurementSmart(measurement: Measurement | undefined): string {
  if (!measurement) return 'N/A'

  const sqm = measurement.squareMeters

  // For very large properties, use acres or hectares
  if (sqm >= 40470) {
    // >= 10 acres
    return formatMeasurement(measurement, 'acres', { precision: 1 })
  }

  // For medium properties, show acres and gunthas
  if (sqm >= 4047) {
    // >= 1 acre
    const acres = formatMeasurement(measurement, 'acres', { precision: 2 })
    const gunthas = formatMeasurement(measurement, 'gunthas', { precision: 1 })
    return `${acres} (${gunthas})`
  }

  // For smaller properties, show square meters and square feet
  if (sqm >= 1000) {
    const sqmFormatted = formatMeasurement(measurement, 'sqm', { precision: 0 })
    const sqftFormatted = formatMeasurement(measurement, 'sqft', { precision: 0 })
    return `${sqmFormatted} (${sqftFormatted})`
  }

  // Very small properties - just square meters
  return formatMeasurement(measurement, 'sqm', { precision: 2 })
}

/**
 * Format multiple units for detailed display
 */
export function formatMeasurementDetailed(measurement: Measurement | undefined): {
  squareMeters: string
  squareFeet: string
  acres: string
  hectares: string
  gunthas: string
} {
  return {
    squareMeters: formatMeasurement(measurement, 'sqm', { precision: 2 }),
    squareFeet: formatMeasurement(measurement, 'sqft', { precision: 2 }),
    acres: formatMeasurement(measurement, 'acres', { precision: 4 }),
    hectares: formatMeasurement(measurement, 'hectares', { precision: 4 }),
    gunthas: formatMeasurement(measurement, 'gunthas', { precision: 2 }),
  }
}

/**
 * Get area breakdown percentage
 */
export function getAreaPercentage(
  partArea: Measurement | undefined,
  totalArea: Measurement | undefined
): number {
  if (!partArea || !totalArea || totalArea.squareMeters === 0) return 0
  return (partArea.squareMeters / totalArea.squareMeters) * 100
}

/**
 * Format area breakdown with percentage
 */
export function formatAreaBreakdown(
  partArea: Measurement | undefined,
  totalArea: Measurement | undefined,
  options: { unit?: 'sqm' | 'sqft' | 'acres' | 'gunthas'; showPercentage?: boolean } = {}
): string {
  const { unit = 'sqm', showPercentage = true } = options

  if (!partArea) return 'N/A'

  const areaStr = formatMeasurement(partArea, unit, { precision: 0 })

  if (!showPercentage || !totalArea) return areaStr

  const percentage = getAreaPercentage(partArea, totalArea)
  return `${areaStr} (${percentage.toFixed(1)}%)`
}

/**
 * Validate measurement consistency (ensure values are within tolerance)
 */
export function validateMeasurement(measurement: Measurement): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []
  const tolerance = 0.01 // 1% tolerance

  const { squareMeters, squareFeet, acres, hectares, gunthas } = measurement

  // Validate square feet
  if (squareFeet !== undefined) {
    const expectedSqFt = squareMeters * CONVERSION_FACTORS.SQM_TO_SQFT
    const diff = Math.abs(squareFeet - expectedSqFt)
    if (diff > expectedSqFt * tolerance) {
      errors.push(`Square feet value (${squareFeet}) doesn't match square meters (${squareMeters})`)
    }
  }

  // Validate acres
  if (acres !== undefined) {
    const expectedAcres = squareMeters * CONVERSION_FACTORS.SQM_TO_ACRES
    const diff = Math.abs(acres - expectedAcres)
    if (diff > expectedAcres * tolerance && diff > 0.01) {
      errors.push(`Acres value (${acres}) doesn't match square meters (${squareMeters})`)
    }
  }

  // Validate hectares
  if (hectares !== undefined) {
    const expectedHectares = squareMeters * CONVERSION_FACTORS.SQM_TO_HECTARES
    const diff = Math.abs(hectares - expectedHectares)
    if (diff > expectedHectares * tolerance && diff > 0.01) {
      errors.push(`Hectares value (${hectares}) doesn't match square meters (${squareMeters})`)
    }
  }

  // Validate gunthas
  if (gunthas !== undefined) {
    const expectedGunthas = squareMeters * CONVERSION_FACTORS.SQM_TO_GUNTHAS
    const diff = Math.abs(gunthas - expectedGunthas)
    if (diff > expectedGunthas * tolerance && diff > 0.1) {
      errors.push(`Gunthas value (${gunthas}) doesn't match square meters (${squareMeters})`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Compare two measurements
 */
export function compareMeasurements(
  a: Measurement | undefined,
  b: Measurement | undefined
): number {
  if (!a && !b) return 0
  if (!a) return -1
  if (!b) return 1
  return a.squareMeters - b.squareMeters
}

/**
 * Sum multiple measurements
 */
export function sumMeasurements(
  measurements: (Measurement | undefined)[]
): Measurement | undefined {
  const validMeasurements = measurements.filter((m): m is Measurement => m !== undefined)

  if (validMeasurements.length === 0) return undefined

  const totalSquareMeters = validMeasurements.reduce((sum, m) => sum + m.squareMeters, 0)

  return calculateMeasurements(totalSquareMeters)
}
