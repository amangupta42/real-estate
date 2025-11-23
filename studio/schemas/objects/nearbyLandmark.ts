import { defineType } from 'sanity'

/**
 * Nearby Landmark
 * Structured information about nearby landmarks with distances
 */
export const nearbyLandmark = defineType({
  name: 'nearbyLandmark',
  title: 'Nearby Landmark',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Landmark Name',
      type: 'string',
      description: 'e.g., "Taked Pilgrimage Site", "SMBT Medical Institute"',
      validation: (Rule) => Rule.required().error('Landmark name is required'),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Religious/Spiritual', value: 'religious' },
          { title: 'Medical/Healthcare', value: 'medical' },
          { title: 'Educational', value: 'educational' },
          { title: 'Transportation Hub', value: 'transportation' },
          { title: 'Highway/Road', value: 'highway' },
          { title: 'Commercial/Shopping', value: 'commercial' },
          { title: 'Natural Feature', value: 'natural' },
          { title: 'Industrial Zone', value: 'industrial' },
          { title: 'Residential Development', value: 'residential' },
          { title: 'Government Office', value: 'government' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'distance',
      title: 'Distance (in kilometers)',
      type: 'number',
      description: 'Distance in kilometers. Use 0 for adjacent/on-site features',
      validation: (Rule) => Rule.required().min(0).error('Distance must be 0 or greater'),
    },
    {
      name: 'significance',
      title: 'Significance',
      type: 'string',
      description: 'Why is this landmark important? (optional)',
      options: {
        list: [
          { title: 'High - Major selling point', value: 'high' },
          { title: 'Medium - Notable feature', value: 'medium' },
          { title: 'Low - General reference', value: 'low' },
        ],
      },
      initialValue: 'medium',
    },
    {
      name: 'description',
      title: 'Additional Description',
      type: 'text',
      rows: 2,
      description: 'Any additional context about this landmark (optional)',
    },
  ],
  preview: {
    select: {
      name: 'name',
      distance: 'distance',
      category: 'category',
      significance: 'significance',
    },
    prepare({ name, distance, category, significance }) {
      const distanceText = distance === 0 ? 'On-site' : `${distance} km`

      const significanceIcon = {
        high: '⭐',
        medium: '',
        low: '',
      }[significance || 'medium']

      return {
        title: `${significanceIcon} ${name}`.trim(),
        subtitle: `${distanceText} | ${category || ''}`,
      }
    },
  },
})
