# Casa Flora Heritage Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from luxury hospitality sites like Airbnb and high-end vacation rental platforms, combined with heritage storytelling elements. This experience-focused approach emphasizes visual appeal and emotional connection through the century-long family story.

## Core Design Elements

### Color Palette
**Authentic Casa Flora Colors:**

**Casa Flora Blue Palette (from exterior siding):**
- Light Blue: #8BB5C7 - headers and soft accents
- Medium Blue: #6B9BAF - primary interactive elements  
- Deep Blue: #4A7C95 - main buttons and links
- Dark Blue: #355B6D - navigation and strong text

**Stone & Earth Palette (from exterior walls):**
- Warm Stone: #A8998A - accent backgrounds
- Medium Stone: #8B7D6B - neutral elements
- Dark Stone: #6B5E4F - grounding text
- Light Cream: #F5F1EB - page backgrounds

**Hydrangea Garden Palette (from blooms):**
- Soft Purple: #B8A5C7 - special highlights
- Medium Purple: #9B7FA8 - secondary buttons
- Deep Purple: #7A6284 - strong accents
- Light Purple: #E8DFF0 - subtle backgrounds

**Mountain Green Palette (from foliage):**
- Sage Green: #7A9B6E - nature elements
- Forest Green: #5D7A52 - environmental accents
- Deep Forest: #3F5238 - strong natural text
- Light Green: #F0F5ED - success states

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

### Theme Mode
**Dark Mode Default**: The website now defaults to a sophisticated dark theme inspired by Casa Flora's warm stone colors. The dark mode uses authentic property-derived colors:
- Background: Deep warm stone (#140B08) for cozy evening ambiance
- Foreground: Light cream (#F5F1EB) for elegant text
- Cards: Rich stone tones for depth and warmth
- Preserves all authentic Casa Flora blue, hydrangea, and mountain colors

**Light Mode**: Available as alternative theme preserving the original cream-based design

### Accessibility & Responsiveness
- Sophisticated dark mode default with excellent contrast ratios
- Glass effects optimized for mobile performance  
- Touch-friendly interactive elements
- WCAG 2.1 AA compliance for contrast ratios