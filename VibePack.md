# Casa Del Puente VibePack
*Design System & Brand Guidelines*

---

## Brand Identity

**Casa Del Puente** is a century-old heritage vacation rental in Boquete, Panama. The design embodies four generations of family stewardship (1920-2024) through sophisticated glassmorphism aesthetics, natural antique blue tones, and botanical elegance.

**Design Philosophy**: Premium cultural destination over standard accommodation. Luxury hospitality meets heritage storytelling.

---

## Typography

### Primary Font: **Inter**
- **Usage**: Body text, UI elements, navigation, forms, all readable content
- **Source**: Google Fonts
- **Weights**: 300 (Light), 400 (Regular), 600 (Semi-Bold), 700 (Bold)
- **Character**: Clean, modern, highly readable sans-serif
- **Application**: 
  - Body copy: 400 weight
  - Headings: 600-700 weight
  - Captions/metadata: 300 weight

### Accent Font: **Playfair Display**
- **Usage**: "Casa Del Puente" logo text, hero headings, heritage storytelling, emotional moments
- **Source**: Google Fonts
- **Weights**: 400 (Regular), 600 (Semi-Bold), 700 (Bold)
- **Character**: Elegant serif with high contrast, classic heritage feel
- **Application**:
  - Main hero title: "Casa Del Puente"
  - Section headings with emotional weight
  - Heritage timeline quotes
  - Storytelling elements

### Font Pairing Rules
**Do**:
- Use Playfair Display for "Casa Del Puente" brand name
- Use Playfair Display for hero headlines that need elegance
- Use Inter for all other text (navigation, body, buttons, forms)
- Combine both fonts within the same section for hierarchy

**Don't**:
- Use Playfair Display for body text (readability issues)
- Mix more than these two fonts
- Use Playfair Display in small sizes (below 18px)

---

## Color Palette

### Casa Flora Blue Palette
*Derived from the property's exterior siding*

| Color Name | Hex | HSL | Usage |
|------------|-----|-----|-------|
| **Light Blue** | `#8BB5C7` | `200 35% 67%` | Headers, soft accents, hover states |
| **Medium Blue** | `#6B9BAF` | `200 32% 56%` | Primary interactive elements, links |
| **Deep Blue** | `#4A7C95` | `200 35% 44%` | Main buttons, strong CTAs |
| **Dark Blue** | `#355B6D` | `200 36% 32%` | Navigation text, strong emphasis |

**Primary Brand Color**: Deep Blue (`#4A7C95`) — Use for CTAs, primary buttons

### Stone & Earth Palette
*Derived from the property's exterior walls and natural materials*

| Color Name | Hex | HSL | Usage |
|------------|-----|-----|-------|
| **Light Cream** | `#F5F1EB` | `45 33% 94%` | Light mode page background |
| **Warm Stone** | `#A8998A` | `30 19% 60%` | Accent backgrounds |
| **Medium Stone** | `#8B7D6B` | `30 17% 48%` | Neutral UI elements |
| **Dark Stone** | `#6B5E4F` | `30 15% 37%` | Grounding text, borders |

**Background Foundation**: Light Cream for light mode, Deep Warm Stone for dark mode

### Hydrangea Garden Palette
*Inspired by the property's blooming hydrangeas*

| Color Name | Hex | HSL | Usage |
|------------|-----|-----|-------|
| **Light Purple** | `#E8DFF0` | `285 33% 91%` | Subtle backgrounds, highlights |
| **Soft Purple** | `#B8A5C7` | `285 28% 71%` | Special highlights, decorative |
| **Medium Purple** | `#9B7FA8` | `285 23% 58%` | Secondary buttons, accents |
| **Deep Purple** | `#7A6284` | `285 21% 45%` | Strong accents, emphasis |

**Special Moments**: Use purple sparingly for botanical references and special highlights

### Mountain Green Palette
*Inspired by Boquete's mountain foliage*

| Color Name | Hex | HSL | Usage |
|------------|-----|-----|-------|
| **Light Green** | `#F0F5ED` | `95 33% 95%` | Success states, subtle backgrounds |
| **Sage Green** | `#7A9B6E` | `95 21% 52%` | Nature elements, garden references |
| **Forest Green** | `#5D7A52` | `95 21% 41%` | Environmental accents |
| **Deep Forest** | `#3F5238` | `95 21% 27%` | Strong natural text |

**Nature Connection**: Use greens to emphasize botanical and mountain elements

---

## Glassmorphism System

### Glass Effect Properties

**Standard Glass Card**:
```css
backdrop-filter: blur(20px);
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 16px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
```

**Glass Navigation**:
```css
backdrop-filter: blur(8px);
background: rgba(248, 245, 240, 0.35);
border-bottom: 1px solid rgba(255, 255, 255, 0.2);
```

**Glass Modal/Overlay**:
```css
backdrop-filter: blur(10px);
background: rgba(248, 246, 242, 0.4);
border: 1px solid rgba(255, 255, 255, 0.3);
```

### Glassmorphism Guidelines

**Do**:
- Layer glass elements over rich imagery
- Use subtle transparency (10-40% opacity)
- Apply backdrop blur for depth
- Maintain readability with proper contrast
- Use glass for navigation, cards, modals

**Don't**:
- Stack too many glass layers (max 3 layers)
- Use glass on plain backgrounds (defeats the purpose)
- Make text hard to read through glass
- Overuse the effect (it should feel special)

---

## Animation & Interactions

### GSAP Animation System

**Scroll-Triggered Animations**:
- Heritage timeline reveals on scroll
- Property cards stagger entrance (0.1s delay between items)
- Parallax effects for hero background
- Smooth scroll anchors with easing

**Micro-Interactions**:
- Button press: Scale 0.95 → 1.0 (0.1s duration)
- Card hover: Subtle elevation, no scale
- Navigation item hover: Color transition to Casa Blue Medium
- Ripple effects on CTAs (blue for booking, heritage for discovery)

**Page Transitions**:
- Route changes: Opacity 0 → 1 (0.8s duration)
- Hero entrance: Staggered Y-axis animation (1.2s title, 1.0s subtitle, 0.8s CTA)
- Timeline elements: Opacity + Y-axis reveal on scroll trigger

### Animation Principles

**Timing**:
- Fast interactions: 0.1-0.3s (buttons, hovers)
- Medium transitions: 0.5-0.8s (page changes, reveals)
- Slow storytelling: 1.0-1.5s (hero entrance, timeline)

**Easing**:
- Default: `power3.out` for natural deceleration
- Interactions: `power2.out` for snappy feel
- Scroll animations: `power3.inOut` for smooth flow

---

## Spacing & Layout

### Spacing System
Based on Tailwind's 4px increment system:

| Size | Pixels | Tailwind | Usage |
|------|--------|----------|--------|
| Small | 16px | `p-4` | Tight spacing, inline elements |
| Medium | 32px | `p-8` | Component padding, section gaps |
| Large | 48px | `p-12` | Section spacing |
| X-Large | 64px | `p-16` | Major section dividers |

### Border Radius
- **Small**: `0.1875rem` (3px) — Badges, small elements
- **Medium**: `0.375rem` (6px) — Buttons, inputs, standard cards
- **Large**: `0.5625rem` (9px) — Large cards, modals
- **Glass Cards**: `16px` — Special glassmorphism elements

### Container Max Width
- **Standard content**: `max-w-7xl` (1280px)
- **Narrow content**: `max-w-4xl` (896px) — Hero text, storytelling
- **Reading width**: `max-w-2xl` (672px) — Body text, paragraphs

---

## Component Usage

### Buttons

**Primary CTA** (Booking, main actions):
```jsx
<Button 
  className="bg-casa-blue-deep text-white hover-elevate active-elevate-2"
  size="lg"
>
  Book Your Stay
</Button>
```

**Secondary** (Discover, learn more):
```jsx
<Button 
  className="bg-glass-blue/20 backdrop-blur-[2px] border border-glass-blue/30"
  size="lg"
>
  Discover Our Home
</Button>
```

**Ghost** (Navigation, subtle actions):
```jsx
<Button variant="ghost">
  Learn More
</Button>
```

### Cards

**Glass Card** (Feature showcases):
```jsx
<GlassCard variant="translucent">
  <CardHeader>
    <CardTitle className="font-serif text-2xl">Heritage Since 1920</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</GlassCard>
```

**Standard Card** (Content blocks):
```jsx
<Card className="border-card-border">
  {/* Content */}
</Card>
```

---

## Bilingual Implementation

### Language Support
- **Primary**: English (en)
- **Secondary**: Spanish (es)

### Translation Keys Structure
```
nav.home → "Home" / "Inicio"
hero.title → "Casa Del Puente" (same in both languages)
hero.subtitle → "4 Bedrooms, One Century-Old Story" / "4 Habitaciones, Una Historia Centenaria"
```

### Language Switcher
- Toggle in navigation (top-right)
- Saves preference to localStorage
- All content dynamically updates via `useTranslation()` hook

---

## Dark Mode

### Default Theme: Dark
The website defaults to a sophisticated dark theme inspired by warm evening ambiance.

**Dark Mode Colors**:
- Background: `#140B08` (Deep warm stone)
- Foreground: `#F5F1EB` (Light cream)
- Cards: Rich stone tones with depth
- All blue/purple/green colors preserved from light mode

**Light Mode Colors**:
- Background: `#F5F1EB` (Light cream)
- Foreground: `#2D4552` (Dark blue-gray)
- Cards: White with subtle shadows

### Theme Toggle
- Available in navigation
- Smooth transitions between modes
- Glass effects adapt to theme automatically

---

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Considerations
- Navigation: Hamburger menu with slide-in drawer
- Hero text: Responsive font sizes (text-5xl → text-7xl on desktop)
- Cards: Stack vertically on mobile, grid on desktop
- Glass effects: Optimized blur values for performance

---

## Brand Voice & Tone

### Messaging Style
- **Elegant but approachable**: Heritage without stuffiness
- **Storytelling-focused**: Emphasize four generations, century-old history
- **Premium positioning**: Boutique experience, not mass-market rental
- **Cultural authenticity**: "Flower Capital", "Geisha coffee", local context

### Key Messaging Points
- **Heritage**: "Since 1920", "Four Generations", "Century-Old Story"
- **Location**: "Boquete, Panama's Flower Capital"
- **Uniqueness**: Flower-named bedrooms (Geisha, Orquídea, Hortensia, Veranera)
- **Experience**: Rent the entire house, not individual rooms

---

## Technical Implementation

### Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Components**: Shadcn/ui (Radix UI primitives)
- **Animation**: GSAP with ScrollTrigger
- **Routing**: Wouter (lightweight)
- **i18n**: react-i18next for bilingual support
- **Backend**: Express.js + PostgreSQL (Drizzle ORM)

### Key Utilities
- **Glass Effects**: Custom Tailwind classes (`backdrop-blur-glass`, `bg-glass`)
- **Hover Elevations**: `hover-elevate`, `active-elevate-2`
- **Ripple Effects**: Custom hook `useRippleEffect()` with color variants
- **Responsive**: `useIsMobile()` hook for device detection

---

## Contact & Social

### Contact Information
- **WhatsApp**: +507 6416-0902
- **Location**: Boquete, Chiriquí, Panama

### Social Media
- **Instagram**: @casadelpuente
- **TikTok**: @casadelpuentepanama

### WhatsApp Pre-filled Messages
- **English**: "Hello! I'm interested in renting Casa Del Puente in Boquete, Panama."
- **Spanish**: "¡Hola! Estoy interesado en alquilar Casa Del Puente en Boquete, Panamá."

---

## Design Checklist

When creating new components or pages, ensure:

- [ ] Uses Inter for body text, Playfair Display for headlines
- [ ] Follows Casa Flora blue palette for primary actions
- [ ] Implements glassmorphism on cards/navigation where appropriate
- [ ] Includes GSAP animations for key interactions
- [ ] Supports both English and Spanish via translation keys
- [ ] Works in both dark and light modes
- [ ] Responsive on mobile, tablet, and desktop
- [ ] Maintains heritage brand voice in copy
- [ ] Includes appropriate data-testid attributes
- [ ] Uses proper spacing (4, 8, 12, 16, 24 increments)

---

*Casa Del Puente VibePack v1.0*  
*Last Updated: October 2025*
