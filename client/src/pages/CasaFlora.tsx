import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassNavigation from "@/components/GlassNavigation";
import HeroSection from "@/components/HeroSection";
import BotanicalRoomStories from "@/components/BotanicalRoomStories";
import PropertyGallery from "@/components/PropertyGallery";
import HouseAmenities from "@/components/HouseAmenities";
import BookingForm from "@/components/BookingForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import orchidDivider from "@assets/orchid-divider_1760143606913.png";
import { CASA_DEL_PUENTE_HOUSE } from "@shared/botanicalRooms";

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

        <section id="rooms">
          <BotanicalRoomStories />
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
              Book the Entire Heritage House
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rent the complete {CASA_DEL_PUENTE_HOUSE.totalBedrooms}-bedroom home for your group in Boquete, Panama's flower capital and ideal climate, spring year round.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-glass-deep">{CASA_DEL_PUENTE_HOUSE.totalBedrooms}</div>
                <div className="text-muted-foreground">Botanical Bedrooms</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-casa-blue-deep">{CASA_DEL_PUENTE_HOUSE.totalCapacity}</div>
                <div className="text-muted-foreground">Guests Maximum</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-hydrangea-deep">100+</div>
                <div className="text-muted-foreground">Years of Heritage</div>
              </div>
            </div>
          </div>
          <div className="px-6">
            <BookingForm />
          </div>

          {/* WhatsApp Contact */}
          <div className="max-w-4xl mx-auto text-center px-6 mt-12">
            <p className="text-muted-foreground mb-4">
              Prefer to chat directly? Reach out via WhatsApp for instant assistance.
            </p>
            <WhatsAppButton />
          </div>
        </section>
      </main>

      {/* Orchid Divider before Footer */}
      <div className="flex justify-center py-12">
        <img 
          src={orchidDivider} 
          alt="" 
          className="w-full max-w-4xl h-auto opacity-90 dark:opacity-70" 
        />
      </div>

      <Footer />
    </div>
  );
}