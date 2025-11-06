import { defineType } from 'sanity'

/**
 * Indian Address Structure
 * Captures Indian administrative divisions: Village → Taluka → District → State
 */
export const indianAddress = defineType({
  name: 'indianAddress',
  title: 'Indian Address',
  type: 'object',
  fields: [
    {
      name: 'village',
      title: 'Village/Area (Mauje)',
      type: 'string',
      description: 'e.g., "Mauje Bharvir BK"',
    },
    {
      name: 'taluka',
      title: 'Taluka (Sub-District)',
      type: 'string',
      description: 'e.g., "Igatpuri"',
      validation: (Rule) => Rule.required().error('Taluka is required for Indian addresses'),
    },
    {
      name: 'district',
      title: 'District',
      type: 'string',
      description: 'e.g., "Nashik"',
      validation: (Rule) => Rule.required().error('District is required'),
      initialValue: 'Nashik',
    },
    {
      name: 'state',
      title: 'State',
      type: 'string',
      description: 'State name',
      validation: (Rule) => Rule.required(),
      initialValue: 'Maharashtra',
    },
    {
      name: 'pincode',
      title: 'Pincode',
      type: 'string',
      description: '6-digit Indian pincode',
      validation: (Rule) =>
        Rule.regex(/^[1-9][0-9]{5}$/, {
          name: 'Indian Pincode',
          invert: false,
        }).error('Please enter a valid 6-digit Indian pincode'),
    },
    {
      name: 'nearestCity',
      title: 'Nearest Major City',
      type: 'string',
      description: 'For reference, e.g., "Nashik", "Mumbai"',
    },
  ],
  preview: {
    select: {
      village: 'village',
      taluka: 'taluka',
      district: 'district',
      state: 'state',
    },
    prepare({ village, taluka, district, state }) {
      const parts = [village, taluka, district, state].filter(Boolean)
      return {
        title: parts.join(', ') || 'Address not set',
      }
    },
  },
})
