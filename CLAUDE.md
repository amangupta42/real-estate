# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a state-of-the-art, performant, and SEO-optimized web application for a land development business targeting the Indian market. The platform serves as a digital showcase for land assets, lead generation engine, and company information hub.

## Architecture

**Jamstack Architecture**: Decoupled frontend presentation layer from backend CMS for superior performance, security, and scalability.

**Tech Stack**:
- **Frontend**: Next.js v14+ (App Router) with TypeScript and Tailwind CSS
- **CMS**: Sanity.io (Headless CMS with Sanity Studio)
- **Deployment**: Vercel with automatic CI/CD
- **Package Manager**: npm

**Key Principles**:
- Component-driven development with reusable, modular components
- Type safety enforced throughout the codebase with TypeScript
- Infrastructure as Code for CMS schema and content models
- Server-Side Rendering (SSR) and Static Site Generation (SSG) for optimal SEO

## Project Structure

```
/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Homepage (featured projects, testimonials)
│   ├── projects/
│   │   ├── page.tsx            # Projects listing with filtering/search
│   │   └── [slug]/page.tsx     # Individual project pages (SSG)
│   ├── nashik-advantage/
│   │   └── [slug]/page.tsx     # Neighborhood guide pages (SSG)
│   └── layout.tsx              # Root layout with chatbot integration
├── components/                   # React components
│   ├── atomic/                  # Foundational UI (Button, Input, Heading, Badge, Card)
│   ├── molecules/               # Composite components (ProjectCard, Testimonial, ContactForm)
│   └── organisms/               # Major sections (Header, Footer, ProjectFilter, InteractiveMap)
├── lib/                         # Utility functions and configurations
│   └── sanity.ts               # Sanity client singleton and GROQ queries
├── styles/                      # Global styles
└── sanity/                      # Sanity Studio project directory
    └── schemas/                 # CMS content schemas
```

## Sanity CMS Schema

All schemas are defined as code in the Sanity Studio project.

**Core Content Types**:

1. **project**: Central content type for land assets
   - Key fields: title, slug, status (Ongoing/Completed/Upcoming), location (geopoint), projectSize, reraNumber, plotSizesAvailable, currentPhase
   - Media: heroImage, gallery, droneVideoUrl, layoutPlanImage, brochureFile
   - Content: locationalBenefits, suitabilityDescription (portable text)
   - Interactive: interactiveLayoutData (JSON for plot-level status)

2. **testimonial**: Client social proof
   - Fields: clientName, quote, associatedProject (reference), videoUrl

3. **legacyPage**: Singleton for "Our Legacy" page
   - Fields: pageTitle, founderStory, companyMission, teamMembers array

4. **neighborhoodGuide**: Hyper-local content
   - Fields: name, slug, overview, keyAmenities, mapCoordinates

**Validation**: Required fields enforced on critical data (title, slug, status). Custom validation for formats like reraNumber.

## Development Commands

**Initial Setup**:
```bash
# Create Next.js app
npx create-next-app@latest --typescript --tailwind --app

# Initialize Sanity Studio in subdirectory
npm create sanity@latest
```

**Development**:
```bash
# Run Next.js dev server
npm run dev

# Run Sanity Studio (from sanity/ directory)
cd sanity && npm run dev

# Lint code
npm run lint

# Format code
npm run format
```

**Testing**:
```bash
# Run unit/integration tests (Jest + React Testing Library)
npm test

# Run E2E tests (Playwright or Cypress)
npm run test:e2e

# Run single test file
npm test -- path/to/test.test.tsx
```

**Build & Deploy**:
```bash
# Build for production
npm run build

# Run production build locally
npm start

# Lighthouse audit
npm run lighthouse
```

## Component Development Guidelines

**TypeScript**: All components must have defined props using TypeScript interfaces.

**Responsiveness**: Mobile-first design using Tailwind CSS responsive modifiers.

**Accessibility**: Adhere to WCAG standards with semantic HTML, ARIA attributes, and keyboard navigation.

**State Management**:
- Local component state: React hooks (useState, useReducer)
- Global state (if needed): Zustand for simplicity

## Data Fetching Patterns

**Sanity Client**: Configured as singleton in `/lib/sanity.ts`. Use GROQ queries to fetch precise data without over-fetching.

**Static Pages**: Use `generateStaticParams` for project and neighborhood guide pages.

**Server Components**: Leverage Next.js Server Components for data fetching on homepage and listings.

**Image Optimization**: Always use `<Image>` from `next/image` for automatic optimization, resizing, and WebP conversion.

## Key Features Implementation

**Lead Generation Forms**:
- Use Next.js Server Actions for secure, server-centric form handling
- Validate client-side (react-hook-form) and server-side
- Integrate with email API (e.g., Resend) for notifications

**Interactive Layout Plan**:
- Render `layoutPlanImage` with overlay interactive elements (SVG/divs)
- Parse `interactiveLayoutData` JSON to show plot status on click

**Integrations**:
- AI Chatbot: Script added to `app/layout.tsx`
- WhatsApp: Floating action button with Click-to-Chat API

## SEO & Performance

**SEO**:
- Dynamic metadata using `generateMetadata` in pages
- Structured data (JSON-LD) for RealEstateListing schema on project pages
- Auto-generated `sitemap.xml` and `robots.txt`

**Performance**:
- Lazy-load non-critical components with `next/dynamic`
- Monitor with Lighthouse and Vercel Analytics
- Efficient data fetching, minimal client-side JavaScript

**Content Updates**:
- Sanity webhooks trigger ISR or on-demand revalidation in Next.js

## Deployment

**Vercel**:
- Connect Git repository to Vercel project
- Configure environment variables: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN`
- Production deploys from `main` branch

**Monitoring**:
- Vercel Analytics for Core Web Vitals
- Sentry for error tracking (if configured)
- Google Search Console for SEO monitoring

## Git Workflow

**Branching Model**: GitFlow recommended
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature development branches

**Important**: No automatic commits. Always ask before committing changes.

## Code Quality

**Linting & Formatting**: ESLint and Prettier configured with pre-commit hooks (Husky).

**Testing**: Comprehensive coverage with unit/integration tests (Jest + RTL) and E2E tests (Playwright/Cypress).
