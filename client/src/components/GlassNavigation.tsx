import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

import { useRippleEffect, rippleContainerClass } from "@/lib/rippleEffect";
import logoWhite from "@assets/Logo Without Text-white@3x_1760138616483.png";
import logoBlack from "@assets/Logo Without Text-black_1760138616482.png";

const navigationItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "rooms", label: "Rooms", href: "#rooms" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "amenities", label: "Amenities", href: "#amenities" },
  { id: "rules", label: "Rules", href: "/rules" },
  { id: "booking", label: "Book Now", href: "#booking" },
];

export default function GlassNavigation() {
  const [activeSection, setActiveSection] = useState("home");
  // Removed isScrolled state - navigation stays fixed
  const [isInitialized, setIsInitialized] = useState(false);
  const { createRipple } = useRippleEffect('glass');
  
  // Refs for GSAP animations
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  

  // Simple initialization without transforms that interfere with fixed positioning
  useLayoutEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Removed scroll effects - navigation stays fixed

  // Color change and upscale hover effects
  const handleItemHover = (index: number, isEntering: boolean) => {
    const item = itemRefs.current[index];
    if (!item || !isInitialized) return;
    
    gsap.to(item, {
      scale: isEntering ? 1.1 : 1,
      color: isEntering ? "hsl(200, 32%, 56%)" : "", // Casa Del Puente brand blue hover
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  };
  
  // Smooth active state transitions
  const animateActiveTransition = (newActiveId: string) => {
    const currentActiveIndex = navigationItems.findIndex(item => item.id === activeSection);
    const newActiveIndex = navigationItems.findIndex(item => item.id === newActiveId);
    
    // Create a timeline for coordinated transitions
    const tl = gsap.timeline();
    
    if (currentActiveIndex >= 0) {
      const currentItem = itemRefs.current[currentActiveIndex];
      if (currentItem) {
        tl.to(currentItem, {
          scale: 0.95,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto"
        })
        .to(currentItem, {
          scale: 1,
          duration: 0.15,
          ease: "power2.out"
        }, "-=0.05");
      }
    }
    
    if (newActiveIndex >= 0) {
      const newItem = itemRefs.current[newActiveIndex];
      if (newItem) {
        tl.fromTo(newItem, 
          { scale: 1 },
          {
            scale: 1.08,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto"
          }, "-=0.1")
        .to(newItem, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        }, "-=0.05");
      }
    }
  };

  const handleNavClick = (event: React.MouseEvent, href: string, id: string) => {
    // Create heritage glass ripple effect
    createRipple(event);
    
    // Animate active state transition if changing sections
    if (id !== activeSection) {
      animateActiveTransition(id);
    }
    
    // todo: remove mock functionality - replace with actual navigation
    console.log(`Navigating to ${href}`);
    setActiveSection(id);
    
    if (href.startsWith('/')) {
      // Page navigation with heritage timing
      setTimeout(() => {
        window.location.href = href;
      }, 300); // Allow time for animations
    } else {
      // Smooth scroll for anchors
      const element = document.querySelector(href);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  };

  return (
    <div
      ref={navRef}
      className="fixed top-0 left-1/2 transform -translate-x-1/2 z-[9999] mt-6"
      style={{ position: 'fixed' }}
    >
      <nav className="flex items-center gap-8 px-8 py-5">
        {/* Casa Del Puente Logo */}
        <a href="#home" className="mr-2 flex-shrink-0" data-testid="nav-logo">
          <img
            src={logoBlack}
            alt="Casa Del Puente Logo"
            className="h-14 w-auto dark:hidden transition-transform duration-300 hover:scale-105"
          />
          <img
            src={logoWhite}
            alt="Casa Del Puente Logo"
            className="h-14 w-auto hidden dark:block transition-transform duration-300 hover:scale-105"
          />
        </a>
        
        {/* Navigation Items */}
        {navigationItems.map((item, index) => (
          <span
            key={item.id}
            ref={(el) => { itemRefs.current[index] = el; }}
            className={cn(
              "font-serif text-xl cursor-pointer transition-all duration-300",
              activeSection === item.id 
                ? "text-foreground font-semibold" 
                : "text-gray-800 dark:text-foreground hover:text-gray-900 dark:hover:text-foreground"
            )}
            onClick={(event) => handleNavClick(event, item.href, item.id)}
            onMouseEnter={() => handleItemHover(index, true)}
            onMouseLeave={() => handleItemHover(index, false)}
            data-testid={`nav-${item.id}`}
          >
            {item.label}
          </span>
        ))}
      </nav>
    </div>
  );
}