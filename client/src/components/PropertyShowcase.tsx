import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import propertyImage from "@assets/WhatsApp Image 2025-09-13 at 15.54.05_54df4d3a_1757805248590.jpg";

gsap.registerPlugin(ScrollTrigger);

interface Property {
  id: string;
  name: string;
  description: string;
  features: string[];
  capacity: string;
  type: string;
}

const properties: Property[] = [
  {
    id: "heritage-suite",
    name: "Heritage Suite",
    description: "The original master suite with colonial charm and modern amenities, featuring hand-carved furniture and mountain views.",
    features: ["King bed", "Private terrace", "Original hardwood floors", "Coffee station"],
    capacity: "2 guests",
    type: "Suite"
  },
  {
    id: "coffee-cottage",
    name: "Coffee Cottage",
    description: "Intimate cottage surrounded by coffee plants, perfect for couples seeking authenticity and tranquility.",
    features: ["Queen bed", "Kitchenette", "Private garden", "Coffee tour included"],
    capacity: "2 guests", 
    type: "Cottage"
  },
  {
    id: "family-villa",
    name: "Family Villa",
    description: "Spacious villa accommodating families, with multiple bedrooms and a shared living area overlooking the plantation.",
    features: ["3 bedrooms", "Full kitchen", "Living room", "Mountain views"],
    capacity: "6 guests",
    type: "Villa"
  }
];

export default function PropertyShowcase() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      cardRefs.current.forEach((card) => {
        if (card) {
          gsap.set(card, {
            opacity: 0,
            y: 60,
            scale: 0.9
          });
        }
      });

      // Scroll-triggered stagger animation
      ScrollTrigger.create({
        trigger: showcaseRef.current,
        start: "top 70%",
        animation: gsap.to(cardRefs.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        })
      });

    }, showcaseRef);

    return () => {
      ctx.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  const handleCardHover = (propertyId: string | null) => {
    setHoveredCard(propertyId);
    // todo: remove mock functionality
    console.log(`Hovering ${propertyId}`);
  };

  const handleBooking = (propertyName: string) => {
    // todo: remove mock functionality
    console.log(`Booking ${propertyName}`);
  };

  return (
    <section 
      ref={showcaseRef}
      className="py-24 bg-gradient-to-b from-background to-background/50"
      data-testid="property-showcase"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Heritage Accommodations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each accommodation tells a unique story of our family's century-long journey, combining historical charm with modern comfort
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <div
              key={property.id}
              ref={(el) => setCardRef(el, index)}
              onMouseEnter={() => handleCardHover(property.id)}
              onMouseLeave={() => handleCardHover(null)}
              data-testid={`property-${property.id}`}
            >
              <GlassCard className="p-0 overflow-hidden group cursor-pointer active-elevate-2">
                <div className="relative">
                  <img 
                    src={propertyImage}
                    alt={property.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-white">
                      {property.type}
                    </Badge>
                  </div>
                  
                  {hoveredCard === property.id && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        className="bg-white text-black hover:bg-white/90"
                        onClick={() => handleBooking(property.name)}
                        data-testid={`button-book-${property.id}`}
                      >
                        Book Now
                      </Button>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {property.name}
                    </h3>
                    <span className="text-sm text-primary font-medium">
                      {property.capacity}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {property.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature, featureIndex) => (
                        <Badge 
                          key={featureIndex}
                          variant="outline"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-primary text-white hover:bg-primary/90"
            onClick={() => console.log("View all properties")}
            data-testid="button-view-all-properties"
          >
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
}