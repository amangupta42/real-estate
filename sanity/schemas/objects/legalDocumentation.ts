import { defineType } from 'sanity'

/**
 * Legal Documentation for Indian Real Estate
 * Captures Indian-specific legal records: Survey numbers, NA sanctions, Sanad, RERA
 */
export const legalDocumentation = defineType({
  name: 'legalDocumentation',
  title: 'Legal Documentation',
  type: 'object',
  fields: [
    {
      name: 'landUseStatus',
      title: 'Land Use Status',
      type: 'string',
      options: {
        list: [
          { title: 'Final NA - Residential', value: 'final_na_residential' },
          { title: 'Final NA - Commercial', value: 'final_na_commercial' },
          { title: 'Final NA - Mixed Use', value: 'final_na_mixed' },
          { title: 'NA in Process', value: 'na_in_process' },
          {
            title: 'Agricultural with Conversion Potential',
            value: 'agricultural_conversion_potential',
          },
          { title: 'Agricultural (No Conversion)', value: 'agricultural_no_conversion' },
        ],
        layout: 'radio',
      },
      validation: (Rule) =>
        Rule.required().error('Land use status is required for legal compliance'),
    },
    {
      name: 'surveyNumbers',
      title: 'Survey Numbers (Gat Numbers)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., "Gat No. 864", "Gat No. 875"',
      validation: (Rule) => Rule.required().min(1).error('At least one survey number is required'),
    },
    {
      name: 'naSanctionDetails',
      title: 'NA Sanction Details',
      type: 'object',
      description: 'If land has NA (Non-Agricultural) sanction',
      fields: [
        {
          name: 'sanctionedBy',
          title: 'Sanctioned By (Authority)',
          type: 'string',
          description: 'e.g., "Director of Town Planning, Nashik"',
        },
        {
          name: 'letterNumber',
          title: 'Sanction Letter Number',
          type: 'string',
          description: 'e.g., "911"',
        },
        {
          name: 'sanctionDate',
          title: 'Sanction Date',
          type: 'date',
          options: {
            dateFormat: 'DD-MM-YYYY',
          },
        },
      ],
      hidden: ({ parent }) =>
        parent?.landUseStatus?.includes('agricultural') || !parent?.landUseStatus,
    },
    {
      name: 'sanadDetails',
      title: 'Sanad Details',
      type: 'object',
      description: 'Land ownership certificate',
      fields: [
        {
          name: 'issuedBy',
          title: 'Issued By',
          type: 'string',
          description: 'e.g., "Tehsildar, Igatpuri"',
        },
        {
          name: 'issueDate',
          title: 'Issue Date',
          type: 'date',
          options: {
            dateFormat: 'DD-MM-YYYY',
          },
        },
      ],
    },
    {
      name: 'governmentDuesClearedStatus',
      title: 'Government Dues Cleared',
      type: 'boolean',
      description: 'Are all government dues/taxes paid?',
      initialValue: false,
    },
    {
      name: 'reraRegistered',
      title: 'RERA Registered',
      type: 'boolean',
      description: 'Is this project registered with RERA?',
      initialValue: false,
    },
    {
      name: 'reraNumber',
      title: 'RERA Registration Number',
      type: 'string',
      description: 'e.g., "P51800000001"',
      hidden: ({ parent }) => !parent?.reraRegistered,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const reraRegistered = (context.parent as any)?.reraRegistered
          if (reraRegistered && !value) {
            return 'RERA number is required when RERA registered is checked'
          }
          return true
        }),
    },
    {
      name: 'reraWebsiteUrl',
      title: 'RERA Website URL',
      type: 'url',
      description: 'Link to RERA website listing',
      hidden: ({ parent }) => !parent?.reraRegistered,
    },
    {
      name: 'conversionPotential',
      title: 'Conversion Potential Details',
      type: 'text',
      rows: 3,
      description: 'Explain the potential for converting agricultural land to NA',
      hidden: ({ parent }) => parent?.landUseStatus !== 'agricultural_conversion_potential',
    },
  ],
  preview: {
    select: {
      status: 'landUseStatus',
      surveyNumbers: 'surveyNumbers',
      reraNumber: 'reraNumber',
    },
    prepare({ status, surveyNumbers, reraNumber }) {
      const statusLabel =
        {
          final_na_residential: 'Final NA - Residential',
          final_na_commercial: 'Final NA - Commercial',
          final_na_mixed: 'Final NA - Mixed Use',
          na_in_process: 'NA in Process',
          agricultural_conversion_potential: 'Agricultural (Conversion Potential)',
          agricultural_no_conversion: 'Agricultural',
        }[status] || 'Status not set'

      const survey = surveyNumbers?.length ? `Survey: ${surveyNumbers[0]}` : ''
      const rera = reraNumber ? `RERA: ${reraNumber}` : ''

      return {
        title: statusLabel,
        subtitle: [survey, rera].filter(Boolean).join(' | '),
      }
    },
  },
})
