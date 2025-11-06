import { defineType } from 'sanity'

/**
 * Infrastructure Details
 * Captures water, electricity, roads, and other utilities information
 */
export const infrastructureDetails = defineType({
  name: 'infrastructureDetails',
  title: 'Infrastructure Details',
  type: 'object',
  fields: [
    {
      name: 'waterSupply',
      title: 'Water Supply',
      type: 'object',
      fields: [
        {
          name: 'source',
          title: 'Water Source',
          type: 'string',
          description: 'e.g., "Kadwa Reservoir", "Beze Dam", "Bore well"',
        },
        {
          name: 'pipeSize',
          title: 'Pipeline Size',
          type: 'string',
          description: 'e.g., "4-inch", "6-inch"',
        },
        {
          name: 'connectionStatus',
          title: 'Connection Status',
          type: 'string',
          options: {
            list: [
              { title: 'Connected', value: 'connected' },
              { title: 'Planned', value: 'planned' },
              { title: 'Not Available', value: 'not_available' },
            ],
            layout: 'radio',
          },
        },
        {
          name: 'additionalDetails',
          title: 'Additional Water Details',
          type: 'text',
          rows: 2,
          description: 'e.g., "Water storage tanks on site", "24/7 water availability"',
        },
      ],
    },
    {
      name: 'electricity',
      title: 'Electricity',
      type: 'object',
      fields: [
        {
          name: 'connectionStatus',
          title: 'Connection Status',
          type: 'string',
          options: {
            list: [
              { title: 'Connected', value: 'connected' },
              { title: 'Planned', value: 'planned' },
              { title: 'Not Available', value: 'not_available' },
            ],
            layout: 'radio',
          },
        },
        {
          name: 'transformerDetails',
          title: 'Transformer Details',
          type: 'text',
          rows: 2,
          description: 'e.g., "Charges paid in full", "Dedicated transformer area acquired"',
        },
        {
          name: 'chargesPaid',
          title: 'All Charges Paid',
          type: 'boolean',
          description: 'Have all electricity connection charges been paid?',
        },
      ],
    },
    {
      name: 'roadAccess',
      title: 'Road Access',
      type: 'object',
      fields: [
        {
          name: 'mainRoadAccess',
          title: 'Main Road Access',
          type: 'boolean',
          description: 'Is the property accessible from a main road?',
        },
        {
          name: 'roadType',
          title: 'Road Type',
          type: 'string',
          options: {
            list: [
              { title: 'Paved/Cement', value: 'paved' },
              { title: 'Tar Road', value: 'tar' },
              { title: 'Gravel', value: 'gravel' },
              { title: 'Dirt Road', value: 'dirt' },
            ],
          },
        },
        {
          name: 'internalRoads',
          title: 'Internal Roads',
          type: 'boolean',
          description: 'Are there internal roads within the property?',
        },
        {
          name: 'roadWidth',
          title: 'Road Width',
          type: 'string',
          description: 'e.g., "30 feet", "60 feet"',
        },
      ],
    },
    {
      name: 'otherUtilities',
      title: 'Other Utilities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'utilityType',
              title: 'Utility Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Drainage System', value: 'drainage' },
                  { title: 'Sewage', value: 'sewage' },
                  { title: 'Gas Pipeline', value: 'gas' },
                  { title: 'Street Lights', value: 'street_lights' },
                  { title: 'Security System', value: 'security' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
            {
              name: 'status',
              title: 'Status',
              type: 'string',
              options: {
                list: [
                  { title: 'Available', value: 'available' },
                  { title: 'Planned', value: 'planned' },
                  { title: 'Not Available', value: 'not_available' },
                ],
              },
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
            },
          ],
          preview: {
            select: {
              type: 'utilityType',
              status: 'status',
            },
            prepare({ type, status }) {
              return {
                title: type || 'Utility',
                subtitle: status || '',
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      waterStatus: 'waterSupply.connectionStatus',
      electricityStatus: 'electricity.connectionStatus',
      roadAccess: 'roadAccess.mainRoadAccess',
    },
    prepare({ waterStatus, electricityStatus, roadAccess }) {
      const utilities = []
      if (waterStatus === 'connected') utilities.push('Water ✓')
      if (electricityStatus === 'connected') utilities.push('Electricity ✓')
      if (roadAccess) utilities.push('Road ✓')

      return {
        title: utilities.length ? utilities.join(' | ') : 'No infrastructure set',
      }
    },
  },
})
