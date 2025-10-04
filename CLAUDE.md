# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Casa Flora is a heritage vacation rental website for a century-old property in Boquete, Panama. The project emphasizes four generations of family stewardship (1920-2024) through sophisticated storytelling, glassmorphism design, and GSAP animations. It's built as a full-stack TypeScript application using React + Vite on the frontend and Express + PostgreSQL on the backend.

## Development Commands

```bash
# Development server (frontend + backend with hot-reload)
npm run dev

# Type checking (run before committing changes)
npm run check

# Build for production (builds both client and server)
npm run build

# Start production server
npm start

# Database operations
npm run db:push  # Push schema changes to database
```

## Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript (run via tsx)
- **Database**: PostgreSQL (Neon serverless) + Drizzle ORM
- **Styling**: Tailwind CSS 3 with custom glassmorphism design system
- **Animations**: GSAP with ScrollTrigger for heritage timeline and scroll effects
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **Routing**: Wouter (client-side)
- **State**: TanStack Query for server state
- **Validation**: Zod schemas for runtime validation

### Directory Structure
```
client/
  src/
    components/        # React components
      ui/              # Shadcn/ui components (Radix UI based)
      examples/        # Example implementations of main components
      *.tsx            # Main heritage components (GlassNavigation, HeroSection, HeritageTimeline, etc.)
    pages/             # Route pages (CasaFlora.tsx, Heritage.tsx)
    lib/               # Utilities (queryClient.ts, utils.ts, rippleEffect.ts)
    hooks/             # React hooks (use-toast.ts, use-mobile.tsx)
    index.css          # Global styles with CSS variables for theme system
    App.tsx            # Main app component with Wouter routing
    main.tsx           # React entry point
  index.html           # HTML entry point

server/
  index.ts             # Express server setup with middleware
  routes.ts            # All API endpoints (bookings, guests, payments, reviews, analytics)
  storage.ts           # Database operations using Drizzle ORM
  vite.ts              # Vite dev server integration

shared/
  schema.ts            # Drizzle schema + Zod validation schemas (single source of truth for data models)

migrations/            # Drizzle database migrations
attached_assets/       # Local images and assets

Configuration files:
  vite.config.ts       # Vite build config with path aliases (@, @shared, @assets)
  tailwind.config.ts   # Tailwind with Casa Flora color system
  drizzle.config.ts    # Database connection config
  tsconfig.json        # TypeScript config
```

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

### Database Schema
Core tables defined in `shared/schema.ts`:
- **guests**: Guest contact info and special requirements
- **bookings**: Reservations with pricing, dates, status, amenities (JSON array)
- **payments**: Transaction records with payment method and status
- **reviews**: Guest feedback with ratings and public visibility

All schemas use Drizzle ORM with Zod validation. Server calculates pricing fields (numberOfNights, basePrice, taxes, fees, totalPrice) - clients should NOT send these.

## Design System

### Casa Flora Color Palette
The design uses authentic colors from the property:
- **Blue Palette** (from exterior siding): Light, Medium, Deep, Dark blues
- **Stone & Earth** (from walls): Warm stone, Medium stone, Dark stone, Light cream backgrounds
- **Hydrangea Garden** (from blooms): Soft, Medium, Deep purple accents
- **Mountain Green** (from foliage): Sage, Forest, Deep greens

All colors are defined in `client/src/index.css` as CSS variables and exposed via Tailwind config.

### Glassmorphism System
The site uses a sophisticated glassmorphism aesthetic with:
- Backdrop blur effects (`backdrop-blur-glass`, `backdrop-blur-glass-nav`)
- Semi-transparent backgrounds (`bg-glass`, `bg-glass-light`, `bg-clear-glass`)
- Border highlights with rgba white borders
- Layered depth with shadow effects

See `design_guidelines.md` for complete specifications.

### Typography
- **Primary**: Inter (readability)
- **Accent**: Playfair Display (heritage storytelling)
- Configured in `tailwind.config.ts` as `font-sans` and `font-serif`

### Animation Philosophy
GSAP with ScrollTrigger powers:
- Heritage timeline scroll-triggered reveals
- Property card stagger animations
- Parallax hero backgrounds
- Glass card hover micro-interactions
- Smooth scroll navigation

Animations should serve functional storytelling purposes, not be purely decorative.

## API Endpoints

All endpoints return JSON with `{ success: boolean, data: any, message?: string }` structure.

### Bookings
- `POST /api/bookings` - Create booking (requires guest + booking data)
- `GET /api/bookings` - List all bookings (supports ?limit, ?offset)
- `GET /api/bookings/:id` - Get booking details
- `PATCH /api/bookings/:id/status` - Update status (pending/confirmed/cancelled/completed)
- `DELETE /api/bookings/:id` - Cancel booking
- `POST /api/bookings/check-availability` - Check date availability
- `POST /api/bookings/pricing-estimate` - Calculate pricing for dates

### Guests
- `GET /api/guests/by-email/:email` - Find guest by email
- `GET /api/guests/:id/bookings` - Get guest's booking history

### Payments
- `POST /api/payments` - Create payment record
- `PATCH /api/payments/:id/status` - Update payment status (auto-updates booking isPaid)

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/public` - Get public reviews (supports ?limit)

### Admin/Analytics
- `GET /api/admin/stats` - Booking statistics
- `GET /api/admin/bookings/date-range` - Bookings by date range (?startDate, ?endDate)

## Important Patterns

### Server-Side Pricing Calculation
The server ALWAYS calculates pricing fields. Clients should send only:
- `checkInDate`, `checkOutDate`, `numberOfGuests`, `notes`, `amenities`

Server computes: `numberOfNights`, `basePrice`, `taxes`, `fees`, `totalPrice`

See `server/routes.ts:calculateBookingPricing()` for pricing logic ($250/night + 12% tax + $50 cleaning fee).

### Form Validation
All forms use React Hook Form + Zod resolvers. Schemas are imported from `@shared/schema` for consistency.

### Component Organization
- **Heritage components** (HeroSection, HeritageTimeline, etc.) are in `client/src/components/`
- **Shadcn/ui components** are in `client/src/components/ui/` and should not be heavily modified
- **Example implementations** are in `client/src/components/examples/` for reference

### Theme System
The site defaults to dark mode with light mode available. Theme is managed by next-themes via ThemeProvider. CSS variables in `index.css` define colors for both modes.

## Development Notes

### Running Development Server
`npm run dev` starts both Vite dev server and Express backend. The Express server proxies Vite in development mode (see `server/vite.ts`).

### Database Changes
1. Edit `shared/schema.ts`
2. Run `npm run db:push` to apply changes
3. Migrations are generated in `migrations/`

### Type Safety
- TypeScript strict mode is enabled
- Always run `npm run check` before committing
- Shared types from `@shared/schema` ensure frontend/backend consistency

### Replit-Specific
- Uses Replit-specific Vite plugins for error overlays and cartographer
- Server listens on PORT environment variable (default 5000)
- Database URL from DATABASE_URL environment variable

### Asset Management
Images are stored in `attached_assets/` and referenced via `@assets` alias. Use optimized loading for large heritage photos.

## Design Reference Files
- `design_guidelines.md` - Complete design specifications and color system
- `replit.md` - Project overview and architecture details

## Current Project Status

**Phase**: Concept & Planning
**Location**: C:\Users\ormus\Downloads\Casa Flora

This directory currently contains:
- Photo gallery (37 heritage and property images)
- Core documentation (README, CONCEPT, DEVELOPMENT, ROADMAP, CLAUDE)

The full-stack application described above exists separately and will be integrated once the design and planning phase is complete.
