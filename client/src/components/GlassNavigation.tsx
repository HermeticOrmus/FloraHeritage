import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import GlassCard from "./GlassCard";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "heritage", label: "Heritage", href: "/heritage" },
  { id: "amenities", label: "Amenities", href: "#amenities" },
  { id: "booking", label: "Book Now", href: "#booking" },
];

export default function GlassNavigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, id: string) => {
    // todo: remove mock functionality - replace with actual navigation
    console.log(`Navigating to ${href}`);
    setActiveSection(id);
    
    if (href.startsWith('/')) {
      // Page navigation
      window.location.href = href;
    } else {
      // Smooth scroll for anchors
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <GlassCard 
      variant="nav" 
      className={cn(
        "fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300",
        isScrolled ? "py-2 px-4" : "py-3 px-6"
      )}
    >
      <nav className="flex items-center space-x-1">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "default" : "ghost"}
            size="sm"
            className={cn(
              "font-medium transition-all duration-200 text-shadow-sm",
              activeSection === item.id 
                ? "bg-casa-blue-deep text-stone-cream shadow-md" 
                : "text-gray-800 dark:text-stone-cream hover:text-gray-900 dark:hover:text-stone-cream hover:bg-stone-cream/20 dark:hover:bg-stone-cream/10",
              item.id === "booking" && "ml-2 bg-casa-blue-deep text-stone-cream hover:bg-casa-blue-medium shadow-md"
            )}
            onClick={() => handleNavClick(item.href, item.id)}
            data-testid={`nav-${item.id}`}
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </GlassCard>
  );
}