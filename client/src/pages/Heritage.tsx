import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassNavigation from "@/components/GlassNavigation";
import HeritageTimeline from "@/components/HeritageTimeline";
import GlassCard from "@/components/GlassCard";
import heroImage from "@assets/WhatsApp Image 2025-09-13 at 15.54.52_5c8d2b26_1757805248590.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Heritage() {
  useEffect(() => {
    gsap.defaults({
      duration: 1.2,
      ease: "power2.out"
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <GlassNavigation />
      
      {/* Heritage Hero Section */}
      <section 
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
            Our Heritage Story
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            A century of family stewardship in the mountains of Boquete, where every generation has added their unique chapter to Casa Flora's story
          </p>
        </div>
      </section>

      <main className="relative">
        <HeritageTimeline />
        
        {/* Heritage Values Section */}
        <section className="py-24 bg-gradient-to-b from-background/50 to-background">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                Our Values Through Time
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Four core principles have guided our family through every generation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Stewardship",
                  description: "Caring for the land and preserving its natural beauty for future generations"
                },
                {
                  title: "Authenticity", 
                  description: "Maintaining genuine connections to local culture and traditional practices"
                },
                {
                  title: "Hospitality",
                  description: "Welcoming guests as family with warmth and genuine Panamanian spirit"
                },
                {
                  title: "Sustainability",
                  description: "Living in harmony with nature while supporting the local community"
                }
              ].map((value, index) => (
                <GlassCard key={value.title} className="p-8 text-center hover-elevate">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    value.title === "Stewardship" ? "bg-stone-warm/20" 
                    : value.title === "Authenticity" ? "bg-casa-blue-light/20"
                    : value.title === "Hospitality" ? "bg-hydrangea-soft/20"
                    : "bg-mountain-sage/20"
                  }`}>
                    <span className={`text-2xl font-serif font-bold ${
                      value.title === "Stewardship" ? "text-stone-dark" 
                      : value.title === "Authenticity" ? "text-casa-blue-deep"
                      : value.title === "Hospitality" ? "text-hydrangea-deep"
                      : "text-mountain-forest"
                    }`}>
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}