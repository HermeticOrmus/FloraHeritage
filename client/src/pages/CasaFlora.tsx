import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassNavigation from "@/components/GlassNavigation";
import HeroSection from "@/components/HeroSection";
import PropertyGallery from "@/components/PropertyGallery";
import HouseAmenities from "@/components/HouseAmenities";
import BookingForm from "@/components/BookingForm";

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
      
      <main>
        <section id="home">
          <HeroSection />
        </section>
        
        <section id="gallery">
          <PropertyGallery />
        </section>
        
        <section id="amenities" className="bg-background">
          <HouseAmenities />
        </section>
        
        
        <section id="booking" className="py-24">
          <div className="max-w-4xl mx-auto text-center px-6 mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Begin Your Heritage Journey
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the warmth of four generations of hospitality in the heart of Panama's coffee country
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-glass-deep">100+</div>
                <div className="text-muted-foreground">Years of Heritage</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-casa-blue-deep">4</div>
                <div className="text-muted-foreground">Generations</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-hydrangea-deep">∞</div>
                <div className="text-muted-foreground">Memories Created</div>
              </div>
            </div>
          </div>
          <div className="px-6">
            <BookingForm />
          </div>
        </section>
      </main>
    </div>
  );
}