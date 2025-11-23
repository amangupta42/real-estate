/**
 * Custom validation helpers for Sanity Studio
 */

import type { ValidationContext } from 'sanity'

/**
 * Validate that area breakdown totals match the total area
 */
export function validateAreaBreakdown(
  breakdown: Array<{ area?: { squareMeters?: number } }>,
  totalArea: number,
  tolerance: number = 0.01
): string | true {
  if (!breakdown || breakdown.length === 0) {
    return true // Optional field
  }

  const breakdownTotal = breakdown.reduce((sum, item) => {
    return sum + (item.area?.squareMeters || 0)
  }, 0)

  const diff = Math.abs(breakdownTotal - totalArea)
  const percentDiff = diff / totalArea

  if (percentDiff > tolerance) {
    return `Area breakdown total (${breakdownTotal.toFixed(2)} sq.m) doesn't match total area (${totalArea.toFixed(2)} sq.m). Difference: ${diff.toFixed(2)} sq.m`
  }

  return true
}

/**
 * Validate RERA requirements
 */
export function validateReraRequirements(
  context: ValidationContext
): string | true {
  const parent = context.parent as any

  if (parent?.reraRegistered && !parent?.reraNumber) {
    return 'RERA number is required when RERA registered is checked'
  }

  if (parent?.reraRegistered && !parent?.reraRegistrationDate) {
    return 'RERA registration date is required when RERA registered is checked'
  }

  return true
}

/**
 * Validate NA sanction requirements
 */
export function validateNaSanctionRequirements(
  context: ValidationContext
): string | true {
  const parent = context.parent as any

  const naStatuses = [
    'final_na_residential',
    'final_na_commercial',
    'final_na_mixed',
    'na_in_process',
  ]

  if (naStatuses.includes(parent?.landUseStatus)) {
    if (!parent?.naSanctionNumber) {
      return 'NA sanction number is required for NA land'
    }
    if (!parent?.naSanctionDate) {
      return 'NA sanction date is required for NA land'
    }
  }

  return true
}

/**
 * Validate plot coordinates are within bounds
 */
export function validatePlotCoordinates(
  x: number | undefined,
  y: number | undefined
): string | true {
  if (x === undefined || y === undefined) {
    return 'Plot coordinates are required'
  }

  if (x < 0 || x > 100) {
    return 'X coordinate must be between 0 and 100'
  }

  if (y < 0 || y > 100) {
    return 'Y coordinate must be between 0 and 100'
  }

  return true
}

/**
 * Validate Indian pincode format
 */
export function validatePincode(pincode: string): string | true {
  const pincodePattern = /^\d{6}$/

  if (!pincodePattern.test(pincode)) {
    return 'Pincode must be exactly 6 digits'
  }

  return true
}

/**
 * Validate minimum plot size is not larger than total area
 */
export function validateMinimumPlotSize(
  minimumPlotSize: number,
  totalArea: number
): string | true {
  if (minimumPlotSize > totalArea) {
    return 'Minimum plot size cannot be larger than total area'
  }

  return true
}

/**
 * Validate that at least one utility is provided
 */
export function validateInfrastructure(
  infrastructure: any
): string | true {
  if (!infrastructure) {
    return true // Optional field
  }

  const hasWater = infrastructure.waterSupply?.available
  const hasElectricity = infrastructure.electricity?.connected
  const hasRoad = infrastructure.roadAccess?.type

  if (!hasWater && !hasElectricity && !hasRoad) {
    return 'At least one infrastructure facility (water, electricity, or road access) should be specified'
  }

  return true
}
