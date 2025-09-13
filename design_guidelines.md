# Casa Flora Heritage Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from luxury hospitality sites like Airbnb and high-end vacation rental platforms, combined with heritage storytelling elements. This experience-focused approach emphasizes visual appeal and emotional connection through the century-long family story.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Mountain Blue: 208 45% 60% (#6B9BC3) - primary brand color
- Sage Green: 95 15% 66% (#A8B5A0) - secondary natural tone
- Heritage Cream: 45 25% 95% - warm neutral background
- Glass White: 0 0% 100% 20% opacity - glassmorphism elements

**Dark Mode:**
- Deep Mountain: 208 35% 15% - dark primary
- Forest Sage: 95 20% 25% - dark secondary
- Charcoal: 0 0% 12% - dark background

### Typography
- **Primary**: Inter (Google Fonts) - clean, modern readability
- **Accent**: Playfair Display (Google Fonts) - elegant serif for heritage storytelling
- Font weights: 300, 400, 600, 700

### Layout System
**Tailwind Spacing Primitives**: 4, 8, 12, 16, 24
- Consistent spacing using p-4, m-8, gap-12, etc.
- Generous whitespace for premium feel

### Glassmorphism Design System
**Glass Cards:**
- backdrop-filter: blur(20px)
- background: rgba(255, 255, 255, 0.1)
- border: 1px solid rgba(255, 255, 255, 0.2)
- border-radius: 16px
- box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1)

**Navigation:**
- Floating glass header with blur effect
- Smooth scroll anchors with GSAP
- Micro-interactions on hover

**Interactive Elements:**
- Glass booking widget with multi-step forms
- Heritage timeline with scroll-triggered reveals
- Property showcase cards with hover animations

### Component Library
**Core Components:**
- Glass navigation bar with smooth scroll
- Hero section with mountain gradient overlay
- Interactive heritage timeline (1920s-2024)
- Property showcase grid with glass cards
- Experience gallery with GSAP transitions
- Floating booking widget
- Glass modals and overlays

### GSAP Animation System
**ScrollTrigger Animations:**
- Heritage timeline reveals on scroll
- Property cards stagger animations
- Parallax effects for hero background

**Micro-interactions:**
- Glass card hover states
- Navigation smooth scroll
- Form step transitions
- Loading skeleton screens

**Page Transitions:**
- GSAP-powered route changes
- Smooth opacity and scale transitions

### Images
**Large Hero Image**: Yes - Mountain landscape with coffee plantation view as background with gradient overlay
**Additional Images:**
- Heritage family photos for timeline sections
- Property interior and exterior shots for showcase cards
- Coffee farm and hiking activity images for experience gallery
- Generational portraits for storytelling sections

### Layout Sections (Maximum 5)
1. **Hero**: Mountain background with glass navigation and animated CTA
2. **Heritage Timeline**: Interactive 100-year family story with scroll animations
3. **Property Showcase**: Glass cards with amenities and booking integration
4. **Experiences**: Coffee farm tours, hiking, cultural activities
5. **Booking**: Floating glass widget with multi-step form

### Accessibility & Responsiveness
- Consistent dark mode across all components
- Glass effects optimized for mobile performance
- Touch-friendly interactive elements
- WCAG 2.1 AA compliance for contrast ratios