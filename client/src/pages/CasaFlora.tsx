import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassNavigation from "@/components/GlassNavigation";
import HeroSection from "@/components/HeroSection";
import BotanicalRoomStories from "@/components/BotanicalRoomStories";
import PropertyGallery from "@/components/PropertyGallery";
import HouseAmenities from "@/components/HouseAmenities";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";
import bougainvilleaDivider from "@assets/bougainvillea-divider_1760151444026.png";

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

        <section id="location">
          <LocationMap />
        </section>

        <section id="rooms">
          <BotanicalRoomStories />
        </section>

        <section id="gallery">
          <PropertyGallery />
        </section>

        <section id="amenities" className="bg-background">
          <HouseAmenities />
        </section>
      </main>

      {/* Bougainvillea Divider before Footer */}
      <div>
        <img 
          src={bougainvilleaDivider} 
          alt="" 
          className="w-full h-auto opacity-90 dark:opacity-70 block" 
        />
      </div>

      <Footer />
    </div>
  );
}