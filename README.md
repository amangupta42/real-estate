# Real Estate Land Development Platform

A state-of-the-art, performant, and SEO-optimized web application for showcasing land development projects in India. Built with Next.js 14, Sanity CMS, and deployed on Vercel.

## 🏗️ Architecture

- **Frontend**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom professional theme
- **CMS**: Sanity.io (Headless CMS)
- **Deployment**: Vercel
- **Architecture**: Jamstack (Static Site Generation + Server-Side Rendering)

## 📋 Prerequisites

- Node.js 18+ and npm
- Git
- A Sanity.io account (create one at [sanity.io](https://www.sanity.io))
- A Vercel account (optional, for deployment)

## 🚀 Getting Started

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd real-estate

# Install dependencies
npm install

# Install Sanity dependencies
cd sanity
npm install
cd ..
```

### 2. Set Up Sanity Studio

First, you need to create a Sanity project:

```bash
# Login to Sanity
cd sanity
npx sanity login

# Initialize the project
npx sanity init --project-id <your-project-id> --dataset production
```

Update the following files with your Sanity project details:

- `sanity/sanity.config.ts` - Update `projectId`
- `.env.local` - Add your `NEXT_PUBLIC_SANITY_PROJECT_ID`

### 3. Configure Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token (create in sanity.io/manage)
```

For the Sanity Studio:

```bash
cd sanity
cp .env.example .env
```

### 4. Run Development Servers

Open two terminal windows:

**Terminal 1 - Next.js App:**

```bash
npm run dev
```

Access at: http://localhost:3000

**Terminal 2 - Sanity Studio:**

```bash
cd sanity
npm run dev
```

Access at: http://localhost:3333

## 📁 Project Structure

```
real-estate/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── atomic/             # Basic UI elements (Button, Input, etc.)
│   ├── molecules/          # Composite components (ProjectCard, etc.)
│   └── organisms/          # Complex sections (Header, Footer, etc.)
├── lib/                    # Utility functions and configurations
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
├── sanity/                 # Sanity Studio
│   ├── schemas/           # Content schemas
│   │   ├── project.ts
│   │   ├── testimonial.ts
│   │   ├── legacyPage.ts
│   │   └── neighborhoodGuide.ts
│   └── sanity.config.ts   # Sanity configuration
└── styles/                # Additional styles
```

## 🛠️ Development Commands

```bash
# Development
npm run dev              # Start Next.js dev server
npm run dev -w sanity    # Start Sanity Studio

# Building
npm run build           # Build for production
npm run start          # Run production build locally

# Code Quality
npm run lint           # Run ESLint
npm run format         # Format code with Prettier

# Testing (to be added in Phase 6)
npm test              # Run tests
npm run test:e2e      # Run E2E tests
```

## 🎨 Tailwind Theme

The project uses a professional color palette optimized for real estate:

- **Primary (Blue)**: Trust & Professionalism
- **Secondary (Green)**: Growth & Investment
- **Accent (Gold/Orange)**: Premium & Warmth
- **Neutral (Stone)**: Elegance & Sophistication

## 📦 Content Management

### Sanity Schemas

The CMS includes the following content types:

1. **Project**: Land development projects
   - Title, status, location (geopoint)
   - Images, videos, brochures
   - Interactive layout data
   - RERA number and details

2. **Testimonial**: Client testimonials
   - Client name, quote
   - Optional video testimonial
   - Associated project reference

3. **Legacy Page**: Company information (singleton)
   - Founder story
   - Company mission
   - Team members

4. **Neighborhood Guide**: Local area information
   - Overview and amenities
   - Map coordinates

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

```bash
# Using Vercel CLI
npm i -g vercel
vercel
```

### Sanity Webhook Configuration

Set up webhooks in Sanity to trigger revalidation:

1. Go to sanity.io/manage → Your Project → API → Webhooks
2. Create webhook pointing to: `https://your-domain.vercel.app/api/revalidate`
3. Add your `REVALIDATION_SECRET`
4. Trigger on: Create, Update, Delete

## 📚 Development Phases

This project follows a structured development plan:

- ✅ **Phase 1**: Project Scaffolding & Foundation (Current)
- 🔄 **Phase 2**: CMS Schema Definition
- ⏳ **Phase 3**: Component Development
- ⏳ **Phase 4**: Page Assembly & API Integration
- ⏳ **Phase 5**: Core Features (Forms, Interactive Elements)
- ⏳ **Phase 6**: Optimization, SEO, Testing
- ⏳ **Phase 7**: Deployment & Monitoring

See `DEVELOPMENT_PLAN_DETAILED.md` for full implementation details.

## 🔒 Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended config + Prettier
- **Pre-commit Hooks**: Automatic linting and formatting via Husky
- **Git Workflow**: GitFlow branching model

## 🌟 Key Features (Planned)

- 📱 Mobile-first responsive design
- 🗺️ Interactive map with project locations
- 📊 Interactive plot layout with availability status
- 💬 AI chatbot for lead qualification
- 📱 WhatsApp integration
- 📧 Lead generation forms
- 🎥 Drone video showcases
- 📄 Downloadable brochures
- 🔍 Advanced project filtering
- ⚡ Optimized for Indian market (data usage, mobile experience)

## 📖 Additional Documentation

- `CLAUDE.md` - Guidance for Claude Code instances
- `DEVELOPMENT_PLAN_DETAILED.md` - Detailed implementation steps
- `development_plan.md` - Original project requirements

## 🤝 Contributing

This is a private project. Follow GitFlow branching:

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "feat: your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Create Pull Request to `develop`

## 📝 License

Private project - All rights reserved

## 🆘 Support

For issues or questions:

1. Check `DEVELOPMENT_PLAN_DETAILED.md` troubleshooting section
2. Review Sanity documentation: https://www.sanity.io/docs
3. Review Next.js documentation: https://nextjs.org/docs

## 🎯 Next Steps

1. Complete Sanity project setup and get project ID
2. Add environment variables
3. Start creating content in Sanity Studio
4. Begin Phase 2: Component Development

---

Built with ❤️ for premium land development
