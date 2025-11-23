import { defineType } from 'sanity'
import { MeasurementInput } from '../../components/inputs/MeasurementInput'

/**
 * Measurement Object with Auto-Calculation
 * Enter square meters, and other units will be calculated automatically on the frontend
 * Conversion factors:
 * - 1 sq. meter = 10.764 sq. feet
 * - 1 acre = 4,047 sq. meters
 * - 1 hectare = 10,000 sq. meters
 * - 1 guntha = 101.17 sq. meters
 */
export const measurement = defineType({
  name: 'measurement',
  title: 'Measurement',
  type: 'object',
  components: {
    input: MeasurementInput,
  },
  fields: [
    {
      name: 'squareMeters',
      title: 'Square Meters',
      type: 'number',
      description: 'Primary unit - enter this value first',
      validation: (Rule) =>
        Rule.required().positive().error('Square meters must be a positive number'),
    },
    {
      name: 'squareFeet',
      title: 'Square Feet',
      type: 'number',
      description: 'Auto-calculated: sq.m × 10.764 (or enter manually if you have exact value)',
      validation: (Rule) =>
        Rule.positive().custom((value, context) => {
          const sqm = (context.parent as any)?.squareMeters
          if (!sqm || !value) return true

          // Allow 1% tolerance for rounding
          const calculated = sqm * 10.764
          const diff = Math.abs(value - calculated)
          const tolerance = calculated * 0.01

          if (diff > tolerance) {
            return `Expected approximately ${calculated.toFixed(2)} sq.ft based on ${sqm} sq.m`
          }
          return true
        }),
    },
    {
      name: 'acres',
      title: 'Acres',
      type: 'number',
      description: 'Auto-calculated: sq.m ÷ 4,047',
    },
    {
      name: 'hectares',
      title: 'Hectares',
      type: 'number',
      description: 'Auto-calculated: sq.m ÷ 10,000',
    },
    {
      name: 'gunthas',
      title: 'Gunthas',
      type: 'number',
      description: 'Auto-calculated: sq.m ÷ 101.17 (Maharashtra)',
    },
  ],
  preview: {
    select: {
      sqm: 'squareMeters',
      sqft: 'squareFeet',
      acres: 'acres',
    },
    prepare({ sqm, sqft, acres }) {
      if (!sqm) return { title: 'No measurement set' }

      const parts = [`${sqm.toLocaleString()} sq.m`]
      if (sqft) parts.push(`${sqft.toLocaleString()} sq.ft`)
      if (acres && acres >= 0.1) parts.push(`${acres.toFixed(2)} acres`)

      return {
        title: parts.join(' | '),
      }
    },
  },
})
