# Detailed Development Plan

This document breaks down the development plan into actionable implementation steps.

## Phase 1: Project Scaffolding & Foundational Setup

### 1.1 Initialize Next.js Application
```bash
npx create-next-app@latest real-estate-app
```
**Options to select**:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ App Router
- ❌ src/ directory
- ✅ Import alias (@/*)

### 1.2 Initialize Sanity Studio
```bash
mkdir sanity
cd sanity
npm create sanity@latest
```
**Configuration**:
- Project name: Real Estate CMS
- Dataset: production
- Output path: Current directory
- Template: Clean project

### 1.3 Configure Development Tools

**ESLint & Prettier**:
1. Install Prettier: `npm install --save-dev prettier eslint-config-prettier`
2. Create `.prettierrc`:
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```
3. Update `.eslintrc.json` to extend Prettier config

**Husky for Pre-commit Hooks**:
```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

Create `package.json` entry:
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### 1.4 Directory Structure Setup

Create directories:
```bash
mkdir -p components/atomic components/molecules components/organisms
mkdir -p lib styles
```

### 1.5 Tailwind CSS Configuration

Update `tailwind.config.ts` with custom theme:
```typescript
// Add custom colors for brand identity
// Configure responsive breakpoints for Indian market devices
// Add custom spacing, typography scales
```

---

## Phase 2: CMS Schema Definition & Content Modeling

### 2.1 Define Project Schema

**File**: `sanity/schemas/project.ts`

Key implementation details:
- Use `defineType` and `defineField` for type safety
- Slug auto-generation from title
- Status options: 'Ongoing', 'Completed', 'Upcoming'
- Geopoint validation for location
- Image fields with alt text requirements
- Custom validation for RERA number format
- Portable Text with custom blocks for locationalBenefits
- JSON field for interactiveLayoutData with structure:
  ```json
  {
    "plots": [
      {"plotNumber": "A1", "status": "Available"},
      {"plotNumber": "A2", "status": "Sold"}
    ]
  }
  ```

### 2.2 Define Testimonial Schema

**File**: `sanity/schemas/testimonial.ts`

- Reference field to project
- Optional video URL validation
- Required quote field

### 2.3 Define Legacy Page Schema

**File**: `sanity/schemas/legacyPage.ts`

- Singleton document (use `name: 'legacyPage'` and limit to 1)
- Team members as array of objects with image

### 2.4 Define Neighborhood Guide Schema

**File**: `sanity/schemas/neighborhoodGuide.ts`

- Geopoint for map integration
- Key amenities as tags/array

### 2.5 Register Schemas

**File**: `sanity/sanity.config.ts`

Import and register all schemas in config.

---

## Phase 3: Frontend Component Development

### 3.1 Atomic Components

Create in `components/atomic/`:

**Button.tsx**:
- Variants: primary, secondary, outline
- Sizes: sm, md, lg
- Loading state with spinner
- Disabled state
- ARIA labels

**Input.tsx**:
- Types: text, email, tel, textarea
- Error state styling
- Label integration
- Accessibility (ARIA attributes)

**Heading.tsx**:
- Levels: h1-h6 with semantic HTML
- Size variants independent of level
- Responsive typography

**Badge.tsx**:
- Color variants for project status
- Sizes: sm, md

**Card.tsx**:
- Base card component with padding, shadow
- Hover effects

### 3.2 Molecule Components

Create in `components/molecules/`:

**ProjectCard.tsx**:
```typescript
interface ProjectCardProps {
  title: string
  slug: string
  status: 'Ongoing' | 'Completed' | 'Upcoming'
  heroImage: SanityImage
  location: string
  projectSize: string
}
```
- Image with Next/Image optimization
- Status badge
- Hover effect with CTA
- Link to project detail page

**Testimonial.tsx**:
- Client name, quote
- Optional video player
- Associated project reference

**ContactForm.tsx**:
- Fields: name, email, phone, message, project interest
- Client-side validation with react-hook-form
- Server Action integration
- Loading and success states
- Error handling

### 3.3 Organism Components

Create in `components/organisms/`:

**Header.tsx**:
- Responsive navigation
- Mobile menu with hamburger
- Sticky header on scroll
- Active route highlighting

**Footer.tsx**:
- Company info
- Quick links
- Social media links
- Copyright

**ProjectFilter.tsx**:
- Filter by status
- Search by location/name
- Sort options (price, size, date)
- Clear filters button

**InteractiveMap.tsx**:
- Map library integration (Mapbox or Google Maps)
- Markers for all projects using geopoint data
- Popup on marker click with project preview
- Cluster markers when zoomed out

---

## Phase 4: Page Assembly & API Integration

### 4.1 Setup Sanity Client

**File**: `lib/sanity.ts`

```typescript
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

### 4.2 Define GROQ Queries

**File**: `lib/queries.ts`

```typescript
// All projects query
export const allProjectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  status,
  location,
  projectSize,
  heroImage
}`

// Single project query
export const projectQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  status,
  location,
  projectSize,
  reraNumber,
  plotSizesAvailable,
  currentPhase,
  heroImage,
  gallery,
  droneVideoUrl,
  layoutPlanImage,
  brochureFile,
  locationalBenefits,
  suitabilityDescription,
  interactiveLayoutData
}`

// Featured projects for homepage
export const featuredProjectsQuery = `*[_type == "project" && status == "Ongoing"] | order(_createdAt desc) [0..2]`

// Testimonials query
export const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  clientName,
  quote,
  videoUrl,
  associatedProject->{
    title,
    slug
  }
}`
```

### 4.3 Build Pages

**Homepage** (`app/page.tsx`):
- Server Component
- Fetch featured projects and testimonials
- Hero section with CTA
- Featured projects grid
- Testimonials carousel
- Contact form

**Projects Listing** (`app/projects/page.tsx`):
- Fetch all projects
- Implement ProjectFilter component
- Grid/List view toggle
- InteractiveMap component
- Pagination or infinite scroll

**Project Detail** (`app/projects/[slug]/page.tsx`):
- Use `generateStaticParams` for SSG
- Implement `generateMetadata` for SEO
- Image gallery component
- Video player for drone footage
- Interactive layout plan
- Download brochure button
- Contact form with pre-filled project interest
- Structured data (JSON-LD) for SEO

**Neighborhood Guide** (`app/nashik-advantage/[slug]/page.tsx`):
- Use `generateStaticParams` for SSG
- Map integration with highlighted area
- Amenities list
- Nearby projects

**Legacy Page** (`app/legacy/page.tsx`):
- Fetch singleton legacyPage document
- Team member grid
- Founder story section
- Company mission

---

## Phase 5: Core Feature Implementation

### 5.1 Lead Generation Forms

**Create Server Action** (`app/actions/submitLead.ts`):
```typescript
'use server'

export async function submitLead(formData: FormData) {
  // Server-side validation
  // Send email via Resend API
  // Optionally store in Sanity or external CRM
  // Return success/error response
}
```

**Integrate in ContactForm**:
- Use useFormState hook
- Display success/error messages
- Reset form on success

### 5.2 Interactive Layout Plan

**Component**: `components/InteractiveLayoutPlan.tsx`
- Accept interactiveLayoutData as prop
- Render layout plan image
- Overlay clickable areas (SVG or absolute positioned divs)
- Show plot details on click/hover
- Color-code by status (Available, Sold, Reserved)

### 5.3 AI Chatbot Integration

**In** `app/layout.tsx`:
- Add chatbot script to head or body
- Configure widget with company info
- Train on FAQs and lead qualification questions

### 5.4 WhatsApp Integration

**Component**: `components/WhatsAppButton.tsx`
- Floating action button (fixed position)
- WhatsApp icon
- Link format: `https://wa.me/91XXXXXXXXXX?text=Hello%20I%20am%20interested%20in%20your%20projects`
- Pre-filled message based on current page context

---

## Phase 6: Optimization, SEO, and Testing

### 6.1 SEO Implementation

**Dynamic Metadata**:
Each page implements `generateMetadata`:
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await client.fetch(projectQuery, { slug: params.slug })

  return {
    title: `${project.title} | Real Estate Company`,
    description: project.suitabilityDescription,
    openGraph: {
      title: project.title,
      description: project.suitabilityDescription,
      images: [urlFor(project.heroImage).url()],
    },
  }
}
```

**Structured Data** (Project Detail Page):
```typescript
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateListing',
  name: project.title,
  description: project.suitabilityDescription,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: project.location.lat,
    longitude: project.location.lng,
  },
}

// In page component:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>
```

**Sitemap** (`app/sitemap.ts`):
```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await client.fetch(allProjectsQuery)

  return [
    { url: 'https://example.com', lastModified: new Date() },
    ...projects.map((project) => ({
      url: `https://example.com/projects/${project.slug.current}`,
      lastModified: project._updatedAt,
    })),
  ]
}
```

**Robots.txt** (`app/robots.ts`):
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://example.com/sitemap.xml',
  }
}
```

### 6.2 Performance Optimization

**Image Optimization**:
- All images use `next/image`
- Specify width/height to prevent layout shift
- Use priority prop for above-fold images

**Code Splitting**:
```typescript
import dynamic from 'next/dynamic'

const InteractiveMap = dynamic(() => import('@/components/organisms/InteractiveMap'), {
  loading: () => <MapSkeleton />,
  ssr: false, // Disable SSR for map component
})
```

**Font Optimization**:
```typescript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
```

**Lighthouse Audit**:
- Run regular audits during development
- Target: 90+ scores in all categories
- Fix identified issues iteratively

### 6.3 Testing Setup

**Unit/Integration Tests**:

Install dependencies:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

**Jest Config** (`jest.config.js`):
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

**Example Test** (`components/__tests__/Button.test.tsx`):
```typescript
import { render, screen } from '@testing-library/react'
import Button from '../atomic/Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

**E2E Tests**:

Install Playwright:
```bash
npm init playwright@latest
```

**Example E2E Test** (`e2e/projects.spec.ts`):
```typescript
import { test, expect } from '@playwright/test'

test('should filter projects by status', async ({ page }) => {
  await page.goto('/projects')
  await page.click('button:has-text("Ongoing")')
  const projectCards = await page.locator('[data-testid="project-card"]')
  await expect(projectCards).toHaveCountGreaterThan(0)
})
```

---

## Phase 7: Deployment & Post-Launch Operations

### 7.1 Environment Variables Setup

**Create** `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
RESEND_API_KEY=your_resend_key
```

**Add to** `.gitignore`:
```
.env.local
```

**Configure in Vercel**:
- Go to Project Settings → Environment Variables
- Add all variables for Production, Preview, and Development

### 7.2 Sanity Webhook Configuration

**In Sanity Studio**:
1. Go to API → Webhooks
2. Create new webhook
3. URL: `https://your-domain.vercel.app/api/revalidate`
4. Trigger on: Create, Update, Delete
5. Filter: `_type in ["project", "testimonial", "legacyPage", "neighborhoodGuide"]`

**Create Revalidation API Route** (`app/api/revalidate/route.ts`):
```typescript
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  // Validate webhook secret
  if (body.secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  // Revalidate specific paths based on document type
  if (body._type === 'project') {
    revalidatePath('/projects')
    revalidatePath(`/projects/${body.slug.current}`)
  }

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
```

### 7.3 Vercel Deployment

**Initial Deployment**:
1. Push code to GitHub repository
2. Go to Vercel → New Project
3. Import Git repository
4. Configure build settings (auto-detected for Next.js)
5. Add environment variables
6. Deploy

**Custom Domain**:
1. Go to Project Settings → Domains
2. Add custom domain
3. Configure DNS records as instructed
4. Verify and enable

### 7.4 Monitoring Setup

**Vercel Analytics**:
- Enable in Project Settings → Analytics
- Monitor Core Web Vitals, page views, top pages

**Sentry Integration** (Optional):
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

Configure `sentry.client.config.ts` and `sentry.server.config.ts`

**Google Search Console**:
1. Verify site ownership
2. Submit sitemap: `https://your-domain.com/sitemap.xml`
3. Monitor indexing status and search performance

---

## Development Workflow

### Feature Development Process

1. **Create Feature Branch**:
```bash
git checkout develop
git pull
git checkout -b feature/your-feature-name
```

2. **Development**:
- Make changes
- Test locally
- Ensure all tests pass
- Lint and format code

3. **Commit** (only when user approves):
```bash
git add .
git commit -m "feat: descriptive commit message"
```

4. **Push and Create PR**:
```bash
git push origin feature/your-feature-name
# Create PR to develop branch
```

5. **Review and Merge**:
- Code review
- Merge to develop
- Test on preview deployment
- Merge develop to main for production

### Testing Checklist Before Commit

- [ ] All TypeScript errors resolved
- [ ] ESLint passes
- [ ] Prettier formatting applied
- [ ] Unit tests pass
- [ ] E2E tests pass (for critical paths)
- [ ] Lighthouse audit scores acceptable
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Accessibility tested (keyboard navigation, screen reader)
- [ ] Cross-browser tested (Chrome, Firefox, Safari)

---

## Troubleshooting Common Issues

### Sanity Studio Not Loading
- Check NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
- Verify dataset name is correct
- Ensure Sanity Studio is running on separate port

### Images Not Displaying
- Verify Sanity image URLs in next.config.js domains
- Check image fields in schema have proper validation
- Ensure urlFor function is used correctly

### Build Errors
- Clear .next cache: `rm -rf .next`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

### Slow Performance
- Check for unnecessary client components (use Server Components when possible)
- Verify images are optimized with next/image
- Review bundle size: `npm run build` and check output
- Use React DevTools Profiler to identify slow components

---

## Key Considerations for Indian Market

- **Mobile-First**: Most users will access via mobile devices
- **Data Usage**: Optimize image sizes for slower connections
- **Localization**: Consider adding Hindi language support
- **Payment Integration**: Integrate with Indian payment gateways if needed
- **Legal Compliance**: Ensure RERA number display is prominent
- **Timezone**: IST (Asia/Kolkata) for timestamps
- **Contact Methods**: WhatsApp is crucial for lead generation

---

## Next Steps After Initial Setup

1. Populate Sanity with sample content
2. Design and implement custom brand theme in Tailwind config
3. Create high-fidelity designs for all components
4. Implement analytics tracking for user behavior
5. Set up email automation for lead nurturing
6. Create content strategy and SEO keyword plan
7. Plan and execute user acceptance testing
8. Prepare marketing materials for launch
