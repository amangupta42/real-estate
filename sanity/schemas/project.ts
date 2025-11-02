import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ongoing', value: 'Ongoing' },
          { title: 'Completed', value: 'Completed' },
          { title: 'Upcoming', value: 'Upcoming' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'geopoint',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectSize',
      title: 'Project Size',
      type: 'string',
      description: 'e.g., "5 acres" or "2 hectares"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reraNumber',
      title: 'RERA Number',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return 'RERA number is required'
          // Basic validation for RERA format
          if (!/^[A-Z0-9/-]+$/.test(value)) {
            return 'Invalid RERA number format'
          }
          return true
        }),
    }),
    defineField({
      name: 'plotSizesAvailable',
      title: 'Plot Sizes Available',
      type: 'string',
      description: 'e.g., "1200-2500 sq ft"',
    }),
    defineField({
      name: 'currentPhase',
      title: 'Current Phase',
      type: 'string',
      description: 'e.g., "Phase 1" or "Phase 2"',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'droneVideoUrl',
      title: 'Drone Video URL',
      type: 'url',
      description: 'YouTube or Vimeo URL',
    }),
    defineField({
      name: 'layoutPlanImage',
      title: 'Layout Plan Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'brochureFile',
      title: 'Brochure PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'locationalBenefits',
      title: 'Locational Benefits',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'suitabilityDescription',
      title: 'Suitability Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'interactiveLayoutData',
      title: 'Interactive Layout Data',
      type: 'object',
      description: 'JSON data for interactive plot status',
      fields: [
        {
          name: 'plots',
          title: 'Plots',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'plotNumber',
                  title: 'Plot Number',
                  type: 'string',
                },
                {
                  name: 'status',
                  title: 'Status',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Available', value: 'Available' },
                      { title: 'Sold', value: 'Sold' },
                      { title: 'Reserved', value: 'Reserved' },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      media: 'heroImage',
    },
    prepare(selection) {
      const { title, status } = selection
      return {
        ...selection,
        subtitle: status,
      }
    },
  },
})
