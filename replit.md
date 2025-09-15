# Casa Flora Heritage Website

## Overview

Casa Flora is a heritage vacation rental website showcasing a century-old property in Boquete, Panama. The project positions the property as a premium cultural destination rather than standard accommodation, emphasizing four generations of family stewardship (1920-2024) through sophisticated storytelling and immersive user experiences. The website combines luxury hospitality design patterns with heritage storytelling elements, targeting cultural travelers seeking authentic experiences over generic accommodations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom glassmorphism design system
- **Component Library**: Shadcn/ui components built on Radix UI primitives
- **Animation System**: GSAP with ScrollTrigger for sophisticated heritage-themed animations and micro-interactions
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management with custom query client configuration

### Design System
- **Visual Approach**: Glassmorphism aesthetic with translucent, layered elements mirroring the property's multi-generational history
- **Color Palette**: Authentic Casa Flora colors including blue palette from exterior siding, stone & earth tones, hydrangea garden purples, and mountain greens
- **Typography**: Inter for readability and Playfair Display for heritage storytelling
- **Animation Philosophy**: Scroll-triggered timeline reveals, property parallax effects, and heritage entrance animations that serve functional storytelling purposes

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **API Design**: RESTful endpoints for booking management, guest operations, and payment processing
- **Data Validation**: Zod schemas for runtime type validation and form handling

### Data Models
- **Guests**: Core user information with contact details and special requirements
- **Bookings**: Comprehensive reservation system with pricing calculations, status tracking, and amenity management
- **Payments**: Transaction records with multiple payment method support
- **Reviews**: Guest feedback system for experience quality tracking

### Component Architecture
- **Glass Components**: Reusable glassmorphism components (GlassCard, GlassNavigation) with variant system
- **Heritage Components**: Timeline, property showcase, and experience galleries with GSAP animations
- **Form System**: Floating label inputs with heritage-appropriate animations and validation
- **Booking Flow**: Multi-step booking process with real-time pricing calculations

## External Dependencies

### Core Technologies
- **Database Provider**: Neon Database (PostgreSQL serverless)
- **Animation Libraries**: GSAP (GreenSock) with ScrollTrigger plugin for professional-grade animations
- **UI Framework**: Radix UI primitives for accessible, unstyled components
- **Font Provider**: Google Fonts (Inter, Playfair Display)

### Development Tools
- **Build System**: Vite with TypeScript support and development hot-reload
- **Database Toolkit**: Drizzle Kit for schema management and migrations
- **Code Quality**: TypeScript for type safety with strict configuration
- **Development Environment**: Replit-specific plugins for runtime error handling and debugging

### Third-Party Integrations
- **Form Handling**: React Hook Form with Zod resolvers for validation
- **Date Management**: date-fns for booking date calculations and formatting
- **Utility Libraries**: clsx and tailwind-merge for conditional CSS class management
- **Error Tracking**: Custom error boundaries with Replit integration for development

### Asset Management
- **Images**: Local asset storage in attached_assets directory with optimized loading
- **Icons**: Lucide React for consistent iconography
- **Styling**: PostCSS with Autoprefixer for CSS processing