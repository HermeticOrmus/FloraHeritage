import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassNavigation from "@/components/GlassNavigation";
import HeroSection from "@/components/HeroSection";
import HeritageTimeline from "@/components/HeritageTimeline";
import PropertyShowcase from "@/components/PropertyShowcase";
import ExperienceGallery from "@/components/ExperienceGallery";
import FloatingBookingWidget from "@/components/FloatingBookingWidget";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function CasaFlora() {
  useEffect(() => {
    // Set GSAP defaults for consistent feel
    gsap.defaults({
      duration: 1.2,
      ease: "power2.out"
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <GlassNavigation />
      
      <main>
        <section id="home">
          <HeroSection />
        </section>
        
        <section id="heritage">
          <HeritageTimeline />
        </section>
        
        <section id="property">
          <PropertyShowcase />
        </section>
        
        <section id="experiences">
          <ExperienceGallery />
        </section>
        
        <section id="booking" className="py-24">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Begin Your Heritage Journey
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the warmth of four generations of hospitality in the heart of Panama's coffee country
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-muted-foreground">Years of Heritage</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">4</div>
                <div className="text-muted-foreground">Generations</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">∞</div>
                <div className="text-muted-foreground">Memories Created</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <FloatingBookingWidget />
    </div>
  );
}