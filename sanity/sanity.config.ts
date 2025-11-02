import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { googleMapsInput } from '@sanity/google-maps-input'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Real Estate CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || '',

  plugins: [
    structureTool(),
    visionTool(),
    googleMapsInput({
      apiKey: process.env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY || '',
      defaultLocation: {
        lat: 19.9975,
        lng: 73.7898,
      },
      defaultZoom: 11,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
