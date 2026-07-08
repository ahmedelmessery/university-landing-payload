# University Landing Page - Technical Assessment

A pixel-perfect university landing page built with Next.js 16, Payload CMS 3, and TypeScript.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.20.2 or higher
- MongoDB (local or Atlas)

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment** (create `.env` file):

   ```env
   DATABASE_URL=mongodb://localhost:27017/university-landing
   PAYLOAD_SECRET=your-secret-key-here
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Create admin account:**
   - Visit http://localhost:3000/admin
   - Sign up with email/password

5. **Seed the database (Optional but recommended):**
   - Run `npm run seed` to automatically populate the 12 sections with default data.

6. **Add/Edit content:**
   - Log into the Payload Admin panel at http://localhost:3000/admin.
   - Fill in Globals: Landing Hero, Campus Experience, Admission Steps, Contact Section, Header, Footer.
   - Add items to Collections: Majors, Events, Testimonials, News, Partners.

6. **View landing page:**
   - Visit http://localhost:3000/landing

## 📋 Project Structure

```
src/
├── app/
│   ├── (frontend)/
│   │   └── landing/          # Landing page route
│   └── (payload)/            # Admin panel
├── collections/              # Payload CMS collections
│   ├── Majors.ts
│   ├── Events.ts
│   ├── Testimonials.ts
│   ├── News.ts
│   └── Partners.ts
├── globals/                  # Payload CMS globals
│   ├── LandingHero.ts
│   ├── CampusExperience.ts
│   ├── AdmissionSteps.ts
│   └── ContactSection.ts
├── components/
│   └── landing/             # Landing page components (10 sections)
└── lib/
    └── cms/                 # CMS data fetching layer
```

## 🎨 Features

### 12 Landing Page Sections

1. **Hero** - Full-screen hero with search bar
2. **Campus Experience** - Interactive accordion with tabs
3. **University Partners** - 3D perspective panels
4. **Marquee Ribbons** - Continuous scrolling partner ribbons
5. **Core Majors Slider** - Horizontal carousel
6. **Events Slider** - Upcoming events with date badges
7. **Graduate Success** - 3D coverflow testimonials
8. **Admission Steps** - 5-step process with connectors
9. **Proud News** - News cards carousel
10. **Contact Form** - Dynamic form with validation
11. **Header** - Sticky navigation
12. **Footer** - Multi-column layout

### CMS Collections

- **Majors** - Academic programs
- **Events** - Upcoming events
- **Testimonials** - Graduate success stories
- **News** - Latest news and achievements
- **Partners** - University partnerships

### Design System

- **Colors**: Orange #e84925, Navy #273480, NOVA Green #348141, Ink #101828
- **Typography**: Futura (H1: 72px, H2: 48px, H3: 32px, H4: 26px, H5: 24px, H6: 20px, Body: 18px)
- **Layout**: Max width 1920px, Pill buttons
- **Breakpoints**: 375px (mobile), 768px (tablet), 1440px (desktop)

## 🏗️ Architecture

### Next.js App Router

- Server Components by default for optimal performance
- Client Components only where interactivity is needed
- Dynamic rendering for fresh CMS content
- TypeScript throughout

### Payload CMS

- Self-hosted headless CMS
- Intuitive admin panel
- Type-safe content models
- Media management with uploads

### Data Flow & Rendering Strategy

- **CMS Data Layer**: The `src/lib/cms/getLandingPageData.ts` file acts as the single source of truth for fetching Payload globals and collections.
- **Caching**: Next.js `unstable_cache` and `cache()` are used to memoize CMS database queries, preventing redundant MongoDB calls during the same request cycle. In production, this data is cached heavily since landing pages rarely change by the minute.
- **Dynamic Revalidation**: Payload provides hooks to trigger revalidation of Next.js paths whenever content is updated in the Admin panel.
- **Architecture**:
```
Payload Admin (Content Update) → Trigger Revalidation → Next.js ISR/SSG Cache Updated
CMS → Data Layer (getLandingPageData) → Server Components (page.tsx) → Client Components (GSAP/Animations)
```

## 🔧 Available Scripts

```bash
npm run dev              # Start development with Turbopack
npm run build            # Build for production
npm start                # Start production server
npm run generate:types   # Generate Payload TypeScript types
npm run lint             # Run ESLint
```

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: Payload CMS 3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Icons**: Lucide React

## 🎯 Assessment Requirements

### Core Features ✅

- [x] Pixel-perfect UI implementation
- [x] 12 landing page sections
- [x] Payload CMS integration
- [x] TypeScript throughout
- [x] Responsive design
- [x] Advanced animations
- [x] Clean code architecture

### Performance

- Server-side rendering
- Optimized images with next/image
- Minimal client-side JavaScript
- Parallel data fetching

## 🚀 Deployment

### Build

```bash
npm run build
npm start
```

### Environment Variables (Production)

```env
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/db
PAYLOAD_SECRET=strong-random-secret
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
```

### Recommended Platforms

- **Vercel** - Easiest Next.js deployment
- **Railway** - Full-stack with MongoDB
- **DigitalOcean** - Self-hosted VPS

## 📝 Content Management

All content is managed through the Payload admin panel at `/admin`:

### Globals (Single Sections)

- Landing Hero - Hero section content
- Campus Experience - Campus tabs and stats
- Admission Steps - Application process steps
- Contact Section - Form configuration

### Collections (Repeatable Items)

- Majors - Academic programs
- Events - Upcoming events
- Testimonials - Graduate stories
- News - Latest updates
- Partners - University partnerships

## 🎨 Design Tokens

Configured in `tailwind.config.mjs` and `src/lib/designTokens.ts`:

```javascript
colors: {
  orange: '#e84925',
  navy: '#273480',
  'nova-green': '#348141',
  ink: '#101828',
}

fontSize: {
  'h1': '72px',
  'h2': '48px',
  'h3': '32px',
  // ...
}
```

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F
```

**MongoDB connection error:**

- Ensure MongoDB is running locally
- Or use MongoDB Atlas cloud database
- Check DATABASE_URL in .env

**TypeScript errors:**

```bash
npm run generate:types
```

**Chunk loading errors:**

- Hard refresh browser (Ctrl+Shift+R)
- Clear `.next` folder: `rm -rf .next`

## 📚 Documentation

- `QUICK_START.md` - 5-minute setup guide
- `ASSESSMENT_CHECKLIST.md` - Requirements checklist
- `TODO.md` - Remaining tasks
- `ERROR_RESOLUTION.md` - Troubleshooting guide

## 🎓 Assessment Details

- **Duration**: 3 days
- **Total Points**: 100
- **Focus**: Pixel-perfect UI (35pts) + CMS Integration (30pts) + Next.js Maturity (20pts)
- **Design Match**: 100% mandatory requirement

## 📞 Support

For questions about Payload CMS: https://payloadcms.com/docs
For Next.js help: https://nextjs.org/docs

---

Built for Eng Techno Full-Stack Technical Assessment
