import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video Testimonial URL',
      type: 'url',
      description: 'Optional video testimonial (YouTube or Vimeo)',
    }),
    defineField({
      name: 'associatedProject',
      title: 'Associated Project',
      type: 'reference',
      to: [{ type: 'project' }],
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'quote',
    },
  },
})
