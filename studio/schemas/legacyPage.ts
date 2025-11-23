import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'legacyPage',
  title: 'Legacy Page',
  type: 'document',
  // Singleton document - only one instance allowed (configure in sanity.config.ts structure)
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'founderStory',
      title: 'Founder Story',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'companyMission',
      title: 'Company Mission',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'photo',
              title: 'Photo',
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
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'photo',
            },
          },
        },
      ],
    }),
  ],
})
