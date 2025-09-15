import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

import { useRippleEffect, rippleContainerClass } from "@/lib/rippleEffect";

const navigationItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "heritage", label: "Heritage", href: "/heritage" },
  { id: "amenities", label: "Amenities", href: "#amenities" },
  { id: "booking", label: "Book Now", href: "#booking" },
];

export default function GlassNavigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { createRipple } = useRippleEffect('glass');
  
  // Refs for GSAP animations
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  

  // Heritage entrance animations with GSAP
  useLayoutEffect(() => {
    if (!isInitialized && navRef.current) {
      // Filter out null refs before GSAP operations
      const items = itemRefs.current.filter((el): el is HTMLSpanElement => !!el);
      
      const ctx = gsap.context(() => {
        // Initial setup - hide elements
        gsap.set(navRef.current, {
          opacity: 0,
          y: -30,
          scale: 0.95
        });
        
        gsap.set(items, {
          opacity: 0,
          y: 20,
          scale: 0.9
        });
        
        // Heritage entrance timeline with staggered items
        const tl = gsap.timeline({ 
          delay: 0.8, // Wait for page to settle
          onComplete: () => setIsInitialized(true)
        });
        
        // Animate navigation container first
        tl.to(navRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: "power3.out"
        })
        // Then stagger animate individual items
        .to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12, // Heritage stagger timing
          ease: "power3.out"
        }, "-=0.6"); // Start before container animation completes
        
      }, navRef.current);
      
      return () => ctx.revert();
    }
  }, [isInitialized]);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced heritage hover effects
  const handleItemHover = (index: number, isEntering: boolean) => {
    const item = itemRefs.current[index];
    if (!item || !isInitialized) return;
    
    gsap.to(item, {
      scale: isEntering ? 1.05 : 1,
      rotationX: isEntering ? 2 : 0,
      boxShadow: isEntering 
        ? "0 8px 25px rgba(168, 153, 138, 0.2), 0 0 0 1px rgba(245, 241, 235, 0.3)" 
        : "0 0 0 rgba(168, 153, 138, 0), 0 0 0 1px rgba(245, 241, 235, 0)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto" // Prevent animation conflicts
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
      className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 py-6 px-8"
      style={{ position: 'fixed' }}
    >
      <nav className="flex items-center space-x-12">
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