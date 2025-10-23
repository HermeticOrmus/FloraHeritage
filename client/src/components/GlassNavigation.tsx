import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { useRippleEffect, rippleContainerClass } from "@/lib/rippleEffect";
import logoWhite from "@assets/Logo Without Text-white@3x_1760138616483.png";
import logoBlack from "@assets/Logo Without Text-black_1760138616482.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navigationItemsKeys = [
  { id: "home", key: "nav.home", href: "/" },
  { id: "rooms", key: "nav.rooms", href: "#rooms" },
  { id: "gallery", key: "nav.gallery", href: "/gallery" },
  { id: "amenities", key: "nav.amenities", href: "#amenities" },
  { id: "location", key: "nav.location", href: "#location" },
  { id: "rules", key: "nav.rules", href: "/rules" },
  { id: "booking", key: "nav.booking", href: "#booking" },
];

export default function GlassNavigation() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState("home");
  const [isInitialized, setIsInitialized] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Subtle hover effect - color only, no scale
  const handleItemHover = (index: number, isEntering: boolean) => {
    const item = itemRefs.current[index];
    if (!item || !isInitialized) return;
    
    gsap.to(item, {
      color: isEntering ? "hsl(200, 32%, 56%)" : "", // Casa Del Puente brand blue hover
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  };
  
  // Smooth active state transitions
  const animateActiveTransition = (newActiveId: string) => {
    const currentActiveIndex = navigationItemsKeys.findIndex(item => item.id === activeSection);
    const newActiveIndex = navigationItemsKeys.findIndex(item => item.id === newActiveId);
    
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
    
    // Close mobile menu if open
    setMobileMenuOpen(false);
    
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

  // Mobile Navigation
  if (isMobile) {
    return (
      <>
        {/* Minimalist Mobile Header */}
        <div className="fixed top-0 left-0 right-0 z-[9999] px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex-shrink-0" data-testid="nav-logo">
              <img
                src={logoBlack}
                alt="Casa Del Puente Logo"
                className="h-11 w-auto dark:hidden drop-shadow-sm"
              />
              <img
                src={logoWhite}
                alt="Casa Del Puente Logo"
                className="h-11 w-auto hidden dark:block drop-shadow-lg"
              />
            </a>
            
            {/* Language & Menu */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    className="p-2"
                    data-testid="button-mobile-menu"
                    aria-label="Menu"
                  >
                    <Menu className="h-6 w-6 text-gray-900 dark:text-white drop-shadow-md" strokeWidth={2} />
                  </button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-[280px] border-0 bg-white dark:bg-gray-950 p-0"
                >
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Main navigation for Casa Del Puente
                  </SheetDescription>
                  
                  {/* Clean Navigation List */}
                  <div className="flex flex-col h-full py-8">
                    <div className="flex-1 px-6 space-y-1">
                      {navigationItemsKeys.map((item) => (
                        <button
                          key={item.id}
                          className={cn(
                            "w-full font-serif text-lg text-left transition-all duration-200 px-4 py-3.5 rounded-md",
                            activeSection === item.id 
                              ? "text-casa-blue-deep dark:text-casa-blue-light font-semibold bg-casa-blue-light/30 dark:bg-casa-blue-deep/30" 
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                          )}
                          onClick={(event) => handleNavClick(event, item.href, item.id)}
                          data-testid={`nav-${item.id}`}
                        >
                          {t(item.key)}
                        </button>
                      ))}
                    </div>
                    
                    {/* Subtle Footer */}
                    <div className="px-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                      <p className="font-serif text-sm text-gray-500 dark:text-gray-500 italic">
                        Casa Del Puente
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">
                        Boquete, Panamá
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop Navigation
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
        {navigationItemsKeys.map((item, index) => (
          <span
            key={item.id}
            ref={(el) => { itemRefs.current[index] = el; }}
            className={cn(
              "font-serif text-xl cursor-pointer transition-all duration-300",
              activeSection === item.id 
                ? "text-foreground font-semibold" 
                : "text-gray-800 dark:text-foreground"
            )}
            onClick={(event) => handleNavClick(event, item.href, item.id)}
            onMouseEnter={() => handleItemHover(index, true)}
            onMouseLeave={() => handleItemHover(index, false)}
            data-testid={`nav-${item.id}`}
          >
            {t(item.key)}
          </span>
        ))}
        
        {/* Language Switcher */}
        <div className="ml-2">
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  );
}
