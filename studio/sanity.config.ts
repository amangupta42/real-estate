import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { googleMapsInput } from '@sanity/google-maps-input'
import { schemaTypes } from './schemas'
import { deskStructure } from './structure/deskStructure'
import { DuplicateProjectAction } from './components/actions/DuplicateProjectAction'
import { ValidateProjectAction } from './components/actions/ValidateProjectAction'

export default defineConfig({
  name: 'default',
  title: 'Real Estate CMS - Custom Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || '',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    googleMapsInput({
      apiKey: process.env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY || '',
      defaultLocation: {
        lat: 19.9975, // Nashik, Maharashtra
        lng: 73.7898,
      },
      defaultZoom: 11,
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      // Add custom actions to project documents
      if (context.schemaType === 'project') {
        return [...prev, DuplicateProjectAction, ValidateProjectAction]
      }
      return prev
    },
  },

  tools: (prev) => {
    // You can add custom tools here in the future
    return prev
  },
})
