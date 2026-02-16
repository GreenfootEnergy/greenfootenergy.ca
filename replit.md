# Greenfoot Energy Solutions - Heat Pump Services Website

## Overview

This project is a bilingual (EN/FR-CA) TypeScript marketing website for Greenfoot Energy Solutions, a Canadian company specializing in mini-split heat pump installation, repair, and maintenance across Atlantic Canada and British Columbia. The site aims to attract and inform customers, providing details on services, locations, and frequently asked questions, with a focus on SEO and user experience.

### Deployment Architecture
- **Frontend**: Static SPA deployed to Cloudflare Pages (no runtime API calls)
- **Admin Dashboard**: Stays on Replit with Express.js backend for content management
- **Static Data**: All public-facing data (locations, FAQs, blogs, promotions) is embedded as TypeScript files in `client/src/data/` — no API calls needed at runtime
- **Build Output**: `dist/public/` — deploy this directory to Cloudflare Pages
- **SPA Routing**: `_redirects` and `_headers` files in `client/public/` handle Cloudflare Pages SPA routing and caching

## User Preferences

Preferred communication style: Simple, everyday language.

### Page Creation Standards (MANDATORY)
All new pages MUST follow these rules:

**Navigation Components (CRITICAL)**:
- ALWAYS use the main `<SiteHeader />` component from `@/components/ui/site-header` for navigation
- ALWAYS use the main `<SiteFooter />` component from `@/components/ui/site-footer` for the footer
- NEVER create custom/simplified nav components or inline headers for landing pages
- This ensures consistent navigation across all pages

**"Invest In Your Home" Section (MANDATORY)**:
- ALWAYS use the dark background version (`bg-[#333333]`) matching the homepage style
- Layout: Image on left, text content on right (grid lg:grid-cols-2)
- White text with white/80 opacity for body text
- Green CTA box with `bg-[#8dc63f]` for "THAT IS THE GREENFOOT APPROACH!" tagline
- NEVER use the white background variant for this section

**SEO/AEO/GEO optimization rules**:
1. **Question-based headings**: Use question format for H2 headings (e.g., "What Heat Pump System is Right for Your Home?" instead of "Heat Pump Systems")
2. **JSON-LD structured data**: Include Product, FAQPage, BreadcrumbList, and Service schemas as appropriate
3. **Meta tags (REQUIRED for all pages)**:
   - `<title>`: Descriptive page title with brand name
   - `<meta name="description">`: 150-160 char description starting with a question when possible
   - `<meta name="keywords">`: Relevant keywords including question phrases
   - `<link rel="canonical">`: Full canonical URL
4. **Open Graph tags (REQUIRED for all pages)**:
   - `og:title`: Page title optimized for social sharing
   - `og:description`: Compelling description for social previews
   - `og:type`: Usually "website" or "article"
   - `og:url`: Full page URL
5. **Twitter Card tags (REQUIRED for all pages)**:
   - `twitter:card`: "summary_large_image"
   - `twitter:title`: Page title
   - `twitter:description`: Brief description for Twitter
6. **FAQ schema**: Include at least 3-4 common questions with detailed answers in FAQPage schema
7. **Descriptive alt text**: All images must have descriptive alt text for accessibility and SEO
8. **Green glow on product images**: Brand pages should use `drop-shadow-[0_0_30px_rgba(141,198,63,0.3)]` and `bg-[#8dc63f]/20 rounded-full blur-3xl` for product image highlights

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS v4, shadcn/ui (New York style)
- **Animations**: Framer Motion
- **State Management**: TanStack React Query (admin only; public pages use static data imports)
- **Design System**: Greenfoot's brand colors (primary green #8dc63f, secondary blue #1E5AA8), Proxima Nova font.
- **Structure**: Page-based (`client/src/pages/`), reusable components (`client/src/components/ui/`).
- **SEO**: JSON-LD structured data (`LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`) and dynamic FAQ filtering by service category.
- **Commercial Solar Page Features**: Includes parallax hero, benefits grid, industry carousel, solar savings calculator, system type tabs, province incentives, and a 5-step installation process.
- **Location Pages**: Dynamic content for 17 mini-split, 16 residential solar, and 16 commercial solar location-specific pages, including climate data, local FAQs, and province-specific solar details.
- **Commercial Solar Location Pages**: Province-specific timelines (BC: 4-7 weeks, NB: 6-10 weeks, NS: 8-12 weeks, PEI: 8-12 weeks), utility names (BC Hydro, NB Power, Nova Scotia Power, Maritime Electric), and local incentives. Route pattern: `/services/commercial-solar/:slug`.
- **Styling Guidelines**: Consistent use of `rounded-xl` for buttons and icons (except hero rating badge), specific color palette, and defined section structure for service pages.
- **Internal Linking Strategy**: Cross-linking between related pages for SEO. Pattern:
  - Brand pages: "Explore Other Brands We Install" sections linking to other brands, mini-split service, and `/provincial-incentives`
  - Mini-split service page: "Brands We Install" section linking to all 4 brand pages, financing, and incentives
  - Location pages: "Premium Heat Pump Brands in {city}" section linking to brands, services, financing, and incentives
  - Important: Incentives page route is `/provincial-incentives` (NOT `/rebates`)
- **Deep Knowledge Network (DKN)**: Topic cluster-based internal linking system for SEO topical authority.
  - **Data**: `client/src/data/topic-clusters.ts` — defines 5 clusters (heat-pumps, solar, insulation, home-comfort, commercial) with pillar pages, spoke services, brands, blogs, resources. Includes `pageToCluster` and `blogToCluster` mappings.
  - **Component**: `client/src/components/ui/related-content.tsx` — `RelatedContent` (full/compact variants) and `BlogRelatedContent` components.
  - **Coverage**: 14 service pages (full), 6 brand pages (compact), 4 location page types (compact), blog posts (BlogRelatedContent).
  - **How it works**: Each page passes its `currentPath` to the component, which looks up its topic cluster(s) and renders contextually relevant links to related services, brands, blogs, and resources — excluding the current page to avoid self-linking.

### Backend (Admin Dashboard Only)
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **API Pattern**: RESTful endpoints (`/api/`) — used only by admin dashboard, NOT by public-facing pages
- **CMS Admin Dashboard**: Accessible at `/admin` for managing content via CSV uploads. Supports `locations`, `brands`, `authors`, `blogCategories`, `blogs`, `faqs`, `promotions`. Includes automatic image downloading and re-hosting for blog imports.
- **Content Update Workflow**: After updating content via admin dashboard, re-export data to `client/src/data/` and rebuild for Cloudflare Pages deployment.

### Static Data Layer
- **Location**: `client/src/data/` directory
- **Files**: `locations.ts`, `faqs.ts`, `blogs.ts`, `promotions.ts`, `index.ts`
- **Pattern**: TypeScript files exporting `as const` arrays — imported directly by frontend components (zero API calls at runtime)
- **Source**: Data exported from PostgreSQL database via admin dashboard

### Data Storage (Admin)
- **Database**: PostgreSQL
- **Schema**: `shared/schema.ts` (Drizzle ORM)
- **Migrations**: Drizzle Kit
- **Tables**: `users`, `locations`, `brands`, `authors`, `blogCategories`, `blogs`, `faqs`, `promotions`.
- **Auto-Seeding**: Seeds initial locations and FAQs on server startup.

### Shared Code
- `shared/` directory for common definitions like Drizzle table schemas and Zod validation schemas.

## External Dependencies

### Third-Party Services
- **Adobe Typekit**: Font hosting for Proxima Nova.
- **External Booking**: `scheduling.greenfootenergy.ca` for appointment scheduling.

### Database
- **PostgreSQL**: Primary data store.
- **connect-pg-simple**: For Express session storage.

### Key NPM Packages
- **shadcn/ui**: UI component library.
- **Zod**: Data validation.
- **Framer Motion**: Animation library.
- **TanStack React Query**: Server state management.
- **Resend**: Email sending (optional, requires RESEND_API_KEY secret).

### Pending Integrations
- **Feedback Email**: The `/api/feedback` endpoint can send emails to info@greenfootenergy.ca if a RESEND_API_KEY secret is configured. Without it, feedback is logged to the server console. To enable email sending, add a RESEND_API_KEY secret and verify domain ownership at resend.com.

### Replit-Specific Integrations
- `@replit/vite-plugin-runtime-error-modal`
- `@replit/vite-plugin-cartographer`
- `@replit/vite-plugin-dev-banner`
- `vite-plugin-meta-images` (custom)