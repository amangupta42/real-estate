import { defineType } from 'sanity'

/**
 * Available Document
 * Lists documents that are available but NOT publicly downloadable
 * Users must contact to request access (per client requirement)
 */
export const availableDocument = defineType({
  name: 'availableDocument',
  title: 'Available Document',
  type: 'object',
  description:
    'Document names are shown to users, but files are NOT downloadable. Users must contact to request.',
  fields: [
    {
      name: 'documentName',
      title: 'Document Name',
      type: 'string',
      description:
        'e.g., "NA Sanction Letter No. 911", "Sanad Document", "Government Dues Clearance Certificate"',
      validation: (Rule) => Rule.required().error('Document name is required'),
    },
    {
      name: 'documentType',
      title: 'Document Type',
      type: 'string',
      options: {
        list: [
          { title: 'NA Sanction Letter', value: 'na_sanction' },
          { title: 'Sanad Certificate', value: 'sanad' },
          { title: 'RERA Certificate', value: 'rera' },
          { title: 'Government Clearance', value: 'government_clearance' },
          { title: 'Survey Document', value: 'survey' },
          { title: '7/12 Extract', value: 'seven_twelve' },
          { title: 'Property Tax Receipt', value: 'property_tax' },
          { title: 'Utility Connection Approval', value: 'utility_approval' },
          { title: 'Other Legal Document', value: 'other_legal' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Brief description of this document (shown to users)',
    },
    {
      name: 'issueDate',
      title: 'Issue/Document Date',
      type: 'date',
      description: 'When was this document issued? (optional)',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
    },
  ],
  preview: {
    select: {
      name: 'documentName',
      type: 'documentType',
      date: 'issueDate',
    },
    prepare({ name, type, date }) {
      const typeLabel =
        {
          na_sanction: 'NA Sanction',
          sanad: 'Sanad',
          rera: 'RERA',
          government_clearance: 'Govt. Clearance',
          survey: 'Survey',
          seven_twelve: '7/12 Extract',
          property_tax: 'Tax Receipt',
          utility_approval: 'Utility Approval',
          other_legal: 'Legal Doc',
        }[type] || type

      return {
        title: name || 'Unnamed Document',
        subtitle: `${typeLabel}${date ? ` | ${new Date(date).getFullYear()}` : ''}`,
      }
    },
  },
})
