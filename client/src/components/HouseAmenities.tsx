import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/GlassCard";
import DecorativeFrame from "@/components/DecorativeFrame";
import { Badge } from "@/components/ui/badge";
import { Wifi, Bed, Users, Baby, Dog, Home, Coffee, Car } from "lucide-react";
import houseImage from "@assets/WhatsApp Image 2025-09-13 at 15.51.54_5a202e28_1757805248589.jpg";

gsap.registerPlugin(ScrollTrigger);

const mainAmenities = [
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Stay connected with reliable internet throughout the property"
  },
  {
    icon: Bed,
    title: "Up to 10 Beds",
    description: "Comfortable sleeping arrangements for large groups and families"
  },
  {
    icon: Users,
    title: "Family Friendly",
    description: "Perfect for multi-generational family gatherings and celebrations"
  },
  {
    icon: Baby,
    title: "Baby Friendly",
    description: "Safe and welcoming environment for your little ones"
  },
  {
    icon: Home,
    title: "NO PETS",
    description: "Strict no pets policy to maintain property standards"
  }
];

const additionalFeatures = [
  "Full kitchen with modern appliances",
  "Multiple bathrooms (3 full + 1 guest)",
  "Spacious and luminous living areas",
  "Bar area",
  "Office/workspace",
  "Heritage garden access",
  "Parking available",
  "Mountain and river views",
  "Walking distance to town center",
  "Fantastic hike"
];

export default function HouseAmenities() {
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        trigger: amenitiesRef.current,
        start: "top 70%",
        animation: gsap.to(cardRefs.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        })
      });

    }, amenitiesRef);

    return () => {
      ctx.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  return (
    <section 
      ref={amenitiesRef}
      className="py-24 bg-background"
      data-testid="house-amenities"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <DecorativeFrame>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              What Is Included
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience authentic Boquete living in this iconic house, with all the modern comforts
            </p>
          </DecorativeFrame>
        </div>

        {/* Featured house image with overlay */}
        <div className="mb-16">
          <div
            ref={(el) => setCardRef(el, 0)}
            className="relative overflow-hidden"
          >
            <GlassCard className="p-0 overflow-hidden">
              <div className="relative">
                <img
                  src={houseImage}
                  alt="Casa Del Puente complete house rental"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge className="bg-casa-blue-deep text-foreground text-sm px-3 py-1">
                      Entire House
                    </Badge>
                    <Badge className="bg-glass-blue/20 backdrop-blur-[1px] text-foreground text-sm px-3 py-1">
                      Up to 10 Guests
                    </Badge>
                    <Badge className="bg-red-600/80 backdrop-blur-sm text-foreground text-sm px-3 py-1">
                      NO PETS
                    </Badge>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Casa del Puente
                  </h3>
                  <p className="text-foreground/90 text-lg">
                    A home with charming details and modern amenities, in an almost perfect location, near town and immersed in nature
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Main amenities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {mainAmenities.map((amenity, index) => {
            const IconComponent = amenity.icon;
            return (
              <div
                key={amenity.title}
                ref={(el) => setCardRef(el, index + 1)}
                data-testid={`amenity-${amenity.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <GlassCard className="p-6 text-center hover-elevate h-full">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    amenity.title === "Family Friendly" || amenity.title === "Baby Friendly"
                      ? "bg-mountain-sage/20"
                      : amenity.title === "NO PETS"
                      ? "bg-red-600/20"
                      : amenity.title === "High-Speed WiFi"
                      ? "bg-casa-blue-light/20"
                      : "bg-hydrangea-soft/20"
                  }`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                    {amenity.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {amenity.description}
                  </p>
                </GlassCard>
              </div>
            );
          })}
        </div>

        {/* Additional features */}
        <div
          ref={(el) => setCardRef(el, 6)}
          className="text-center"
        >
          <GlassCard className="p-8 max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
              Additional Features
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {additionalFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-left"
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    feature.toLowerCase().includes("garden") ? "bg-mountain-sage"
                    : feature.toLowerCase().includes("kitchen") || feature.toLowerCase().includes("bathroom") ? "bg-hydrangea-deep"
                    : feature.toLowerCase().includes("bar") || feature.toLowerCase().includes("office") ? "bg-casa-blue-deep"
                    : "bg-casa-blue-medium"
                  }`} />
                  <span className="text-muted-foreground text-sm">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}