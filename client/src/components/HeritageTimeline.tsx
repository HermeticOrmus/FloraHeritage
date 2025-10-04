import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/GlassCard";
import heritageImage from "@assets/WhatsApp Image 2025-09-13 at 15.54.52_5c8d2b26_1757805248590.jpg";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  details: string;
  generation: number;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1920s",
    title: "The Founding",
    description: "Don Miguel establishes Casa Flora coffee plantation",
    details: "The original homestead was built with locally sourced materials in the heart of Boquete's emerging coffee industry. The first Geisha coffee plants arrived from Ethiopia, beginning Panama's legendary coffee heritage.",
    generation: 1
  },
  {
    year: "1950s-60s",
    title: "Botanical Gardens Take Root",
    description: "Second generation cultivates the heritage gardens",
    details: "Carlos Miguel expands the gardens with orchids, hydrangeas, and bougainvillea. The covered walkways are built, creating shaded paths through our botanical paradise. The five bedrooms take shape, each with views of different garden areas.",
    generation: 2
  },
  {
    year: "1990s-2000s",
    title: "Heritage Preservation",
    description: "Third generation embraces Boquete's Flower Fair tradition",
    details: "María Elena transforms the property into a cultural destination, naming it 'Casa Flora' to honor Boquete's identity as Panama's flower capital. The botanical gardens mature into a living museum of highland tropical flora.",
    generation: 3
  },
  {
    year: "2020s",
    title: "Botanical Bedroom Heritage",
    description: "Fourth generation names each room for our garden flowers",
    details: "Today's Casa Flora celebrates its century of botanical stewardship by giving each bedroom a flower name: Geisha for world-famous coffee, Orquídea for Panama's national treasure, Hortensia for romantic hydrangeas, Veranera for vibrant bougainvillea, and Begonia for cheerful shade gardens. Each room tells a living story.",
    generation: 4
  }
];

export default function HeritageTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      itemRefs.current.forEach((item, index) => {
        if (item) {
          gsap.set(item, {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            scale: 0.8
          });
        }
      });

      // Create scroll-triggered animations
      itemRefs.current.forEach((item, index) => {
        if (item) {
          ScrollTrigger.create({
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            animation: gsap.to(item, {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out"
            }),
            toggleActions: "play none none reverse"
          });
        }
      });

    }, timelineRef);

    return () => {
      ctx.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    itemRefs.current[index] = el;
  };

  return (
    <section 
      ref={timelineRef}
      className="py-24 bg-background"
      data-testid="heritage-timeline"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Four Generations of Heritage
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the story of Casa Flora through a century of family stewardship and authentic hospitality
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-mountain-sage"></div>

          {/* Timeline events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                ref={(el) => setItemRef(el, index)}
                className={`flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
                data-testid={`timeline-${event.year}`}
              >
                <div className="flex-1 px-8">
                  <GlassCard className="p-8 hover-elevate">
                    <div className="flex items-start space-x-4">
                      {index === 0 && (
                        <img 
                          src={heritageImage} 
                          alt="Casa Flora heritage architecture"
                          className="w-24 h-24 object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <span className={`inline-block w-3 h-3 rounded-full mr-3 ${
                            event.generation === 1 ? "bg-glass-blue" 
                            : event.generation === 2 ? "bg-casa-blue-medium"
                            : event.generation === 3 ? "bg-mountain-sage" 
                            : "bg-hydrangea-medium"
                          }`}></span>
                          <span className={`font-bold text-lg ${
                            event.generation === 1 ? "text-stone-dark" 
                            : event.generation === 2 ? "text-casa-blue-deep"
                            : event.generation === 3 ? "text-mountain-forest" 
                            : "text-hydrangea-deep"
                          }`}>{event.year}</span>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                          {event.title}
                        </h3>
                        <p className="text-lg text-muted-foreground mb-3">
                          {event.description}
                        </p>
                        <p className="text-foreground/80 leading-relaxed">
                          {event.details}
                        </p>
                        <div className="mt-4">
                          <span className={`text-sm font-medium ${
                            event.generation === 1 ? "text-stone-dark" 
                            : event.generation === 2 ? "text-casa-blue-deep"
                            : event.generation === 3 ? "text-mountain-forest" 
                            : "text-hydrangea-deep"
                          }`}>
                            Generation {event.generation}
                          </span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>

                {/* Timeline dot */}
                <div className={`relative z-10 w-6 h-6 rounded-full border-4 border-background shadow-lg flex-shrink-0 ${
                  event.generation === 1 ? "bg-glass-blue" 
                  : event.generation === 2 ? "bg-casa-blue-medium"
                  : event.generation === 3 ? "bg-mountain-sage" 
                  : "bg-hydrangea-medium"
                }`}></div>

                <div className="flex-1 px-8"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}