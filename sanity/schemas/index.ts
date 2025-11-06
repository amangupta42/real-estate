// Document Types
import project from './project'
import testimonial from './testimonial'
import legacyPage from './legacyPage'
import neighborhoodGuide from './neighborhoodGuide'

// Object Types (Reusable Components)
import { indianAddress } from './objects/indianAddress'
import { measurement } from './objects/measurement'
import { legalDocumentation } from './objects/legalDocumentation'
import { infrastructureDetails } from './objects/infrastructureDetails'
import { nearbyLandmark } from './objects/nearbyLandmark'
import { availableDocument } from './objects/availableDocument'

export const schemaTypes = [
  // Document Types
  project,
  testimonial,
  legacyPage,
  neighborhoodGuide,
  // Object Types
  indianAddress,
  measurement,
  legalDocumentation,
  infrastructureDetails,
  nearbyLandmark,
  availableDocument,
]
