# Real Estate Custom Sanity Studio

A **custom Sanity Studio** built specifically for the Real Estate CMS with enhanced UI components, intuitive workflows, and fluid content management.

## 🎨 Custom Features

This studio includes **4 custom input components**, **custom desk structure**, and **2 document actions** to streamline content management:

### Custom Input Components

#### 1. **MeasurementInput** 📏
Live unit conversion for area measurements. Enter square meters and see instant conversions to:
- Square Feet
- Acres
- Hectares
- Gunthas (Maharashtra unit)

**Used in:** Total Area, Minimum Plot Size, Area Breakdown items

#### 2. **InteractiveLayoutEditor** 🗺️
Visual drag-and-drop plot placement system:
- Click anywhere on canvas to add plots
- Drag plots to reposition them
- Color-coded by status (Green=Available, Red=Sold, Yellow=Reserved)
- Edit plot details with inline forms
- No manual X/Y coordinate entry needed!

**Used in:** Interactive Layout Data field

#### 3. **LegalDocWizard** ⚖️
Multi-step wizard for complex legal documentation:
- **Step 1:** Land Use Status
- **Step 2:** Survey Numbers
- **Step 3:** NA Sanction (conditional)
- **Step 4:** Sanad Certificate
- **Step 5:** RERA Registration
- **Step 6:** Review & Confirm

Intelligent conditional fields based on land use status.

**Used in:** Legal Documentation field

#### 4. **AreaBreakdownVisualizer** 📊
Visual pie chart + statistics for area distribution:
- Real-time pie chart visualization
- Automatic total calculation
- Percentage breakdown
- Color-coded categories
- Validation warnings if totals don't match

**Used in:** Area Breakdown field

### Custom Desk Structure

Organized navigation with projects grouped by status:
- **Dashboard** - Overview and statistics
- **Projects** - Organized by:
  - Ongoing Projects
  - Completed Projects
  - Upcoming Projects
  - All Projects
- **Testimonials** - Client reviews
- **Neighborhood Guides** - Location-based content
- **Company Legacy** - Singleton for company info

### Custom Document Actions

#### 1. **Duplicate Project** 🔄
One-click project duplication:
- Automatically generates new slug
- Resets status to "Upcoming"
- Clears interactive layout data
- Preserves all other information

#### 2. **Validate Project** ✅
Comprehensive project validation:
- Checks all required fields
- Validates RERA compliance
- Verifies area breakdown totals
- Validates plot coordinates
- Generates detailed validation report

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Access to Sanity project credentials
- Google Maps API key

### Installation

1. **Install dependencies:**
   ```bash
   cd studio
   npm install
   ```

2. **Set up environment variables:**

   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

   Edit `.env`:
   ```env
   SANITY_STUDIO_PROJECT_ID=your-project-id
   SANITY_STUDIO_DATASET=production
   SANITY_STUDIO_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   SANITY_AUTH_TOKEN=your-sanity-auth-token
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   Studio will be available at: http://localhost:3333

---

## 📦 Deployment

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd studio
   vercel --prod
   ```

3. **Set environment variables in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env.example`

4. **Configure custom domain** (optional):
   - In Vercel Dashboard, go to Domains
   - Add: `studio.yourdomain.com` or `admin.yourdomain.com`

### Option 2: Deploy to Sanity Cloud

```bash
npm run deploy
```

This will build and deploy to Sanity's hosting at: `your-project-name.sanity.studio`

---

## 🔧 Configuration

### Customize Default Location (Google Maps)

Edit `sanity.config.ts`:
```typescript
googleMapsInput({
  apiKey: process.env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY || '',
  defaultLocation: {
    lat: 19.9975, // Your default latitude
    lng: 73.7898, // Your default longitude
  },
  defaultZoom: 11,
}),
```

### Add More Custom Components

1. Create component in `/components/inputs/YourComponent.tsx`
2. Import in schema file
3. Add to field definition:
   ```typescript
   defineField({
     name: 'fieldName',
     type: 'object',
     components: {
       input: YourComponent,
     },
   })
   ```

---

## 📁 Project Structure

```
studio/
├── components/
│   ├── inputs/                  # Custom input components
│   │   ├── MeasurementInput.tsx
│   │   ├── InteractiveLayoutEditor.tsx
│   │   ├── LegalDocWizard.tsx
│   │   └── AreaBreakdownVisualizer.tsx
│   ├── previews/                # Custom preview components
│   │   └── EnhancedProjectPreview.tsx
│   └── actions/                 # Custom document actions
│       ├── DuplicateProjectAction.tsx
│       └── ValidateProjectAction.tsx
├── structure/                   # Custom desk structure
│   └── deskStructure.ts
├── lib/                         # Utility functions
│   ├── helpers.ts              # Helper utilities
│   └── validation.ts           # Validation helpers
├── schemas/                     # Content schemas (from /sanity/schemas)
│   ├── index.ts
│   ├── project.ts
│   ├── testimonial.ts
│   ├── legacyPage.ts
│   ├── neighborhoodGuide.ts
│   └── objects/
├── static/                      # Static assets
├── sanity.config.ts            # Main configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔗 Integration with Production Site

### How It Works

```
┌────────────────────┐
│  Custom Studio     │
│  (This Project)    │
└─────────┬──────────┘
          │
          ├── Writes to Sanity Cloud
          ↓
┌────────────────────┐
│  Sanity Cloud      │
│  (Content Lake)    │
└─────────┬──────────┘
          │
          ├── Webhook triggers revalidation
          ↓
┌────────────────────┐
│  Next.js Frontend  │
│  (Production Site) │
└────────────────────┘
```

### Set up Webhooks (Optional but Recommended)

To automatically revalidate your production site when content changes:

1. **In Sanity Dashboard:**
   - Go to: https://www.sanity.io/manage
   - Select your project
   - Go to: API → Webhooks
   - Click "Create webhook"

2. **Configure webhook:**
   ```
   Name: Production Revalidation
   URL: https://yourdomain.com/api/revalidate
   Trigger on: Create, Update, Delete
   Secret: your-secret-key
   ```

3. **In your Next.js API route** (`/api/revalidate/route.ts`):
   ```typescript
   export async function POST(request: Request) {
     // Verify webhook secret
     const secret = request.headers.get('x-sanity-webhook-secret')
     if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
       return new Response('Invalid secret', { status: 401 })
     }

     // Revalidate
     revalidatePath('/')
     revalidatePath('/projects')

     return Response.json({ revalidated: true })
   }
   ```

---

## 🧪 Testing Custom Components

### Start development server:
```bash
npm run dev
```

### Test each component:

1. **MeasurementInput:**
   - Create/edit a project
   - Go to "Measurements & Area" tab
   - Enter a value in "Total Area"
   - Verify live conversions appear

2. **InteractiveLayoutEditor:**
   - Create/edit a project
   - Go to "Interactive Features" tab
   - Click canvas to add plots
   - Drag plots to reposition
   - Verify coordinates update automatically

3. **LegalDocWizard:**
   - Create/edit a project
   - Go to "Legal & Documentation" tab
   - Click "Legal Documentation"
   - Walk through wizard steps
   - Verify conditional fields work

4. **AreaBreakdownVisualizer:**
   - Create/edit a project
   - Go to "Measurements & Area" tab
   - Add items to "Area Breakdown"
   - Verify pie chart updates in real-time

---

## 🐛 Troubleshooting

### Studio won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Custom components not appearing
- Verify imports in schema files
- Check browser console for errors
- Ensure component is registered in field definition

### Google Maps not loading
- Verify `SANITY_STUDIO_GOOGLE_MAPS_API_KEY` is set
- Check API key has "Maps JavaScript API" enabled
- Verify billing is enabled in Google Cloud Console

### Deployment fails
- Verify all environment variables are set in Vercel
- Check build logs for errors
- Ensure `sanity build` runs locally without errors

---

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity UI Components](https://www.sanity.io/ui)
- [Custom Input Components Guide](https://www.sanity.io/docs/custom-input-widgets)
- [Desk Structure API](https://www.sanity.io/docs/structure-builder-reference)

---

## 🎯 Future Enhancements

Potential additions for future versions:

- **Dashboard:** Project statistics, recent updates, quick actions
- **Bulk Operations:** Bulk edit, bulk status updates
- **Document Templates:** Pre-filled project templates
- **Custom Validators:** Real-time validation feedback
- **AI Integration:** Auto-generate descriptions from data
- **Analytics:** Track content changes and user activity
- **Revision History:** Visual diff viewer for changes

---

## 📄 License

This custom studio is part of the Real Estate CMS project.

---

## 🤝 Support

For issues or questions:
1. Check this README
2. Review Sanity documentation
3. Check browser console for errors
4. Contact development team

---

**Built with ❤️ for streamlined real estate content management**
