import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "./GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import gardenImage from "@assets/WhatsApp Image 2025-09-13 at 15.54.33_e68e17db_1757805248590.jpg";

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  includes: string[];
  category: "Coffee" | "Nature" | "Culture";
}

const experiences: Experience[] = [
  {
    id: "coffee-heritage-tour",
    title: "Coffee Heritage Tour",
    description: "Discover the art of coffee cultivation from bean to cup with our family's traditional methods passed down through generations.",
    duration: "3 hours",
    difficulty: "Easy",
    includes: ["Coffee tasting", "Roasting demo", "Take-home beans"],
    category: "Coffee"
  },
  {
    id: "mountain-hiking",
    title: "Mountain Trail Adventure", 
    description: "Explore pristine mountain trails with breathtaking views of the Central American highlands and diverse wildlife.",
    duration: "5 hours",
    difficulty: "Moderate",
    includes: ["Professional guide", "Packed lunch", "Equipment"],
    category: "Nature"
  },
  {
    id: "cultural-exchange",
    title: "Local Cultural Exchange",
    description: "Immerse yourself in authentic Panamanian culture through cooking classes, artisan workshops, and community visits.",
    duration: "4 hours", 
    difficulty: "Easy",
    includes: ["Cooking class", "Artisan visit", "Traditional meal"],
    category: "Culture"
  }
];

export default function ExperienceGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.set(card, {
            opacity: 0,
            y: 80,
            rotationY: index % 2 === 0 ? -15 : 15
          });
        }
      });

      // Scroll-triggered animations
      ScrollTrigger.create({
        trigger: galleryRef.current,
        start: "top 70%",
        animation: gsap.to(cardRefs.current, {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out"
        })
      });

    }, galleryRef);

    return () => {
      ctx.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  const handleBookExperience = (experienceTitle: string) => {
    // todo: remove mock functionality
    console.log(`Booking experience: ${experienceTitle}`);
  };

  const getCategoryColor = (category: Experience["category"]) => {
    const colors = {
      Coffee: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      Nature: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", 
      Culture: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    };
    return colors[category];
  };

  return (
    <section 
      ref={galleryRef}
      className="py-24 bg-gradient-to-b from-background/50 to-accent/5"
      data-testid="experience-gallery"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Authentic Experiences
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Immerse yourself in the rich culture, pristine nature, and coffee heritage that defines our region
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              ref={(el) => setCardRef(el, index)}
              data-testid={`experience-${experience.id}`}
            >
              <GlassCard className="h-full hover-elevate group">
                <div className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={gardenImage}
                      alt={experience.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getCategoryColor(experience.category)}>
                        {experience.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge variant="outline" className="bg-white/90 text-black text-xs">
                        {experience.duration}
                      </Badge>
                      <Badge variant="outline" className="bg-white/90 text-black text-xs">
                        {experience.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                      {experience.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                      {experience.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Includes:</h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.includes.map((item, itemIndex) => (
                            <Badge 
                              key={itemIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-primary text-white hover:bg-primary/90"
                        onClick={() => handleBookExperience(experience.title)}
                        data-testid={`button-book-${experience.id}`}
                      >
                        Book Experience
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}