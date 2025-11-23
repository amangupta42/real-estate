import { defineField, defineType } from 'sanity'
import { InteractiveLayoutEditor } from '../components/inputs/InteractiveLayoutEditor'
import { AreaBreakdownVisualizer } from '../components/inputs/AreaBreakdownVisualizer'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Information', default: true },
    { name: 'location', title: 'Location & Address' },
    { name: 'legal', title: 'Legal & Documentation' },
    { name: 'measurements', title: 'Measurements & Area' },
    { name: 'infrastructure', title: 'Infrastructure' },
    { name: 'benefits', title: 'Location Benefits' },
    { name: 'development', title: 'Development & Suitability' },
    { name: 'media', title: 'Media & Gallery' },
    { name: 'interactive', title: 'Interactive Features' },
  ],
  fields: [
    // ==================== BASIC INFORMATION ====================
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
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
      group: 'basic',
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
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      group: 'basic',
      description: 'Primary use case for this property',
      options: {
        list: [
          { title: 'Residential', value: 'residential' },
          { title: 'Agricultural', value: 'agricultural' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Mixed-Use', value: 'mixed_use' },
          { title: 'Industrial', value: 'industrial' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Property type is required'),
    }),
    defineField({
      name: 'landCategory',
      title: 'Land Category',
      type: 'string',
      group: 'basic',
      description: 'Development stage/category',
      options: {
        list: [
          { title: 'Plotted Development', value: 'plotted_development' },
          { title: 'Agricultural Land', value: 'agricultural_land' },
          { title: 'Open Land', value: 'open_land' },
          { title: 'Gated Community', value: 'gated_community' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required().error('Land category is required'),
    }),
    defineField({
      name: 'currentPhase',
      title: 'Current Phase/Status',
      type: 'string',
      group: 'basic',
      description: 'e.g., "Phase 1 - 60% Complete", "Fully Developed", "Ready to Develop"',
    }),

    // ==================== LOCATION & ADDRESS ====================
    defineField({
      name: 'indianAddress',
      title: 'Indian Address',
      type: 'indianAddress',
      group: 'location',
      description: 'Structured Indian address with Taluka, District, State',
      validation: (Rule) => Rule.required().error('Address is required'),
    }),
    defineField({
      name: 'location',
      title: 'GPS Location (Map)',
      type: 'geopoint',
      group: 'location',
      description: 'Pin exact location on map',
      validation: (Rule) => Rule.required(),
    }),

    // ==================== LEGAL & DOCUMENTATION ====================
    defineField({
      name: 'legalDocumentation',
      title: 'Legal Documentation',
      type: 'legalDocumentation',
      group: 'legal',
      description: 'Survey numbers, NA sanction, Sanad, RERA details',
      validation: (Rule) => Rule.required().error('Legal documentation is required'),
    }),
    defineField({
      name: 'availableDocuments',
      title: 'Available Documents',
      type: 'array',
      group: 'legal',
      description: 'List documents available on request (NOT publicly downloadable)',
      of: [{ type: 'availableDocument' }],
    }),

    // ==================== MEASUREMENTS & AREA ====================
    defineField({
      name: 'totalArea',
      title: 'Total Area',
      type: 'measurement',
      group: 'measurements',
      description: 'Total property area (enter sq. meters, other units auto-calculate)',
      validation: (Rule) => Rule.required().error('Total area is required'),
    }),
    defineField({
      name: 'areaBreakdown',
      title: 'Area Breakdown',
      type: 'array',
      group: 'measurements',
      description: 'How is the total area divided? (Plotted, Amenity, Roads, etc.)',
      components: {
        input: AreaBreakdownVisualizer,
      },
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'areaType',
              title: 'Area Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Plotted Area', value: 'plotted' },
                  { title: 'Amenity Plot', value: 'amenity' },
                  { title: 'Roads', value: 'roads' },
                  { title: 'Open Space', value: 'open_space' },
                  { title: 'Green Belt', value: 'green_belt' },
                  { title: 'Commercial Area', value: 'commercial' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
            {
              name: 'area',
              title: 'Area',
              type: 'measurement',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Optional additional details',
            },
          ],
          preview: {
            select: {
              type: 'areaType',
              sqm: 'area.squareMeters',
            },
            prepare({ type, sqm }) {
              return {
                title: type || 'Area',
                subtitle: sqm ? `${sqm.toLocaleString()} sq.m` : '',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'minimumPlotSize',
      title: 'Minimum Plot Size',
      type: 'measurement',
      group: 'measurements',
      description: 'Smallest plot size available for purchase',
    }),

    // ==================== INFRASTRUCTURE ====================
    defineField({
      name: 'infrastructure',
      title: 'Infrastructure Details',
      type: 'infrastructureDetails',
      group: 'infrastructure',
      description: 'Water, electricity, roads, and other utilities',
    }),

    // ==================== LOCATION BENEFITS ====================
    defineField({
      name: 'nearbyLandmarks',
      title: 'Nearby Landmarks',
      type: 'array',
      group: 'benefits',
      description: 'Landmarks with distances (replaces simple text list)',
      of: [{ type: 'nearbyLandmark' }],
    }),
    defineField({
      name: 'naturalFeatures',
      title: 'Natural Features',
      type: 'array',
      group: 'benefits',
      description:
        'Natural surroundings (e.g., "Kadwa backwaters view", "Hill views", "River on North-East")',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'vastuFeatures',
      title: 'Vastu & Cultural Features',
      type: 'object',
      group: 'benefits',
      description: 'Vastu compliance and direction-based features',
      fields: [
        {
          name: 'vastuCompliant',
          title: 'Vastu Compliant',
          type: 'boolean',
          description: 'Is this property Vastu compliant?',
        },
        {
          name: 'directionFeatures',
          title: 'Direction-Based Features',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'e.g., "River on North-East", "Road access from South"',
        },
      ],
    }),

    // ==================== DEVELOPMENT & SUITABILITY ====================
    defineField({
      name: 'suitabilityDescription',
      title: 'Suitability Description',
      type: 'array',
      group: 'development',
      description: 'Detailed description of what this property is suitable for',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'suitabilityTypes',
      title: 'Suitability Types',
      type: 'array',
      group: 'development',
      description: 'Quick tags for property suitability',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Residential Development', value: 'residential_development' },
          { title: 'Second Homes', value: 'second_homes' },
          { title: 'Eco-Resorts', value: 'eco_resorts' },
          { title: 'Agri-Tourism', value: 'agri_tourism' },
          { title: 'Warehouse/Logistics', value: 'warehouse' },
          { title: 'Mixed-Use Development', value: 'mixed_use' },
          { title: 'Farmhouse Plots', value: 'farmhouse' },
          { title: 'Investment/Land Banking', value: 'investment' },
        ],
      },
    }),
    defineField({
      name: 'investmentBenefits',
      title: 'Investment Benefits',
      type: 'array',
      group: 'development',
      description: 'Why should someone invest in this property?',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'developmentRestrictions',
      title: 'Development Restrictions',
      type: 'text',
      group: 'development',
      rows: 3,
      description: 'Any restrictions on development (optional)',
    }),
    defineField({
      name: 'expansionOpportunities',
      title: 'Expansion Opportunities',
      type: 'array',
      group: 'development',
      description: 'Adjacent/expansion land available',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'surveyNumber',
              title: 'Survey Number',
              type: 'string',
              description: 'e.g., "Gat No. 875"',
            },
            {
              name: 'area',
              title: 'Area',
              type: 'measurement',
            },
            {
              name: 'status',
              title: 'Status',
              type: 'string',
              options: {
                list: [
                  { title: 'Available', value: 'available' },
                  { title: 'Under Negotiation', value: 'negotiation' },
                  { title: 'Sold', value: 'sold' },
                ],
              },
            },
          ],
          preview: {
            select: {
              survey: 'surveyNumber',
              sqm: 'area.squareMeters',
            },
            prepare({ survey, sqm }) {
              return {
                title: survey || 'Expansion Land',
                subtitle: sqm ? `${sqm.toLocaleString()} sq.m` : '',
              }
            },
          },
        },
      ],
    }),

    // ==================== MEDIA & GALLERY ====================
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'media',
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
      group: 'media',
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
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'droneVideoUrl',
      title: 'Drone Video URL',
      type: 'url',
      group: 'media',
      description: 'YouTube or Vimeo URL',
    }),
    defineField({
      name: 'virtualTourUrl',
      title: 'Virtual Tour URL',
      type: 'url',
      group: 'media',
      description: '360° virtual tour or similar',
    }),
    defineField({
      name: 'layoutPlanImage',
      title: 'Layout Plan Image',
      type: 'image',
      group: 'media',
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
      group: 'media',
      options: {
        accept: '.pdf',
      },
    }),

    // ==================== INTERACTIVE FEATURES ====================
    defineField({
      name: 'interactiveLayoutData',
      title: 'Interactive Layout Data',
      type: 'array',
      group: 'interactive',
      description: 'Plot-level data for interactive layout plan (position, size, status)',
      components: {
        input: InteractiveLayoutEditor,
      },
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'plotNumber',
              title: 'Plot Number',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'size',
              title: 'Plot Size',
              type: 'string',
              description: 'e.g., "1200 sq.ft", "500 sq.m"',
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
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Price (Optional)',
              type: 'string',
              description: 'Not displayed per client requirement, but can be stored',
              hidden: true,
            },
            {
              name: 'x',
              title: 'X Position (%)',
              type: 'number',
              description: 'Horizontal position as percentage from left (0-100)',
              validation: (Rule) => Rule.required().min(0).max(100),
            },
            {
              name: 'y',
              title: 'Y Position (%)',
              type: 'number',
              description: 'Vertical position as percentage from top (0-100)',
              validation: (Rule) => Rule.required().min(0).max(100),
            },
          ],
          preview: {
            select: {
              plotNumber: 'plotNumber',
              status: 'status',
              size: 'size',
            },
            prepare({ plotNumber, status, size }) {
              const statusIcon =
                {
                  Available: '✅',
                  Sold: '❌',
                  Reserved: '⏸️',
                }[status] || ''

              return {
                title: `Plot ${plotNumber}`,
                subtitle: `${status} ${statusIcon} ${size ? `| ${size}` : ''}`.trim(),
              }
            },
          },
        },
      ],
    }),

    // ==================== LEGACY FIELDS (Deprecated - kept for backward compatibility) ====================
    defineField({
      name: 'projectSize',
      title: 'Project Size (DEPRECATED)',
      type: 'string',
      group: 'measurements',
      description:
        '⚠️ DEPRECATED: Use "Total Area" instead. This field is kept for backward compatibility.',
      readOnly: true,
      hidden: ({ document }) => !!document?.totalArea,
    }),
    defineField({
      name: 'plotSizesAvailable',
      title: 'Plot Sizes Available (DEPRECATED)',
      type: 'array',
      group: 'measurements',
      of: [{ type: 'string' }],
      description:
        '⚠️ DEPRECATED: Use "Minimum Plot Size" instead. Kept for backward compatibility.',
      readOnly: true,
      hidden: ({ document }) => !!document?.minimumPlotSize,
    }),
    defineField({
      name: 'locationalBenefits',
      title: 'Locational Benefits (DEPRECATED)',
      type: 'array',
      group: 'benefits',
      of: [{ type: 'string' }],
      description:
        '⚠️ DEPRECATED: Use "Nearby Landmarks" instead. Kept for backward compatibility.',
      readOnly: true,
      hidden: ({ document }) => document?.nearbyLandmarks && document.nearbyLandmarks.length > 0,
    }),
    defineField({
      name: 'reraNumber',
      title: 'RERA Number (DEPRECATED)',
      type: 'string',
      group: 'legal',
      description:
        '⚠️ DEPRECATED: RERA info now in "Legal Documentation". Kept for backward compatibility.',
      readOnly: true,
      hidden: ({ document }) => !!document?.legalDocumentation?.reraRegistered,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      propertyType: 'propertyType',
      landUseStatus: 'legalDocumentation.landUseStatus',
      media: 'heroImage',
    },
    prepare({ title, status, propertyType, landUseStatus }) {
      const propertyTypeLabel =
        {
          residential: 'Residential',
          agricultural: 'Agricultural',
          commercial: 'Commercial',
          mixed_use: 'Mixed-Use',
          industrial: 'Industrial',
        }[propertyType] || propertyType

      const landStatusLabel =
        {
          final_na_residential: 'Final NA - Res',
          final_na_commercial: 'Final NA - Com',
          final_na_mixed: 'Final NA - Mixed',
          na_in_process: 'NA Process',
          agricultural_conversion_potential: 'Agri (Conv.)',
          agricultural_no_conversion: 'Agricultural',
        }[landUseStatus] || ''

      return {
        title,
        subtitle: [status, propertyTypeLabel, landStatusLabel].filter(Boolean).join(' • '),
      }
    },
  },
})
