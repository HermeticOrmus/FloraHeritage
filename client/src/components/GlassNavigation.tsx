import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import GlassCard from "./GlassCard";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "heritage", label: "Heritage", href: "#heritage" },
  { id: "property", label: "Property", href: "#property" },
  { id: "experiences", label: "Experiences", href: "#experiences" },
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
    // todo: remove mock functionality - replace with actual scroll behavior
    console.log(`Navigating to ${href}`);
    setActiveSection(id);
    
    // Smooth scroll simulation
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <GlassCard 
      variant="nav" 
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300",
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
              "text-white font-medium transition-all duration-200",
              activeSection === item.id 
                ? "bg-primary/20 text-white" 
                : "text-white/80 hover:text-white hover:bg-white/10",
              item.id === "booking" && "ml-2 bg-primary text-white hover:bg-primary/90"
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