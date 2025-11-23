import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'neighborhoodGuide',
  title: 'Neighborhood Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Neighborhood Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'keyAmenities',
      title: 'Key Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'mapCoordinates',
      title: 'Map Coordinates',
      type: 'geopoint',
      description: 'Center point for this neighborhood on the map',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
