import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassNavigation from "@/components/GlassNavigation";
import HeroSection from "@/components/HeroSection";
import BotanicalRoomStories from "@/components/BotanicalRoomStories";
import PropertyGallery from "@/components/PropertyGallery";
import HouseAmenities from "@/components/HouseAmenities";
import LocationMap from "@/components/LocationMap";
import BookingForm from "@/components/BookingForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import bougainvilleaDivider from "@assets/bougainvillea-divider_1760151444026.png";
import { CASA_DEL_PUENTE_HOUSE } from "@shared/botanicalRooms";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function CasaFlora() {
  const { t } = useTranslation();
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

        <section id="booking" className="py-24">
          <div className="max-w-4xl mx-auto text-center px-6 mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('booking.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('booking.description', { bedrooms: CASA_DEL_PUENTE_HOUSE.totalBedrooms })}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-glass-deep">{CASA_DEL_PUENTE_HOUSE.totalBedrooms}</div>
                <div className="text-muted-foreground">{t('booking.bedrooms')}</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-casa-blue-deep">{CASA_DEL_PUENTE_HOUSE.totalCapacity}</div>
                <div className="text-muted-foreground">{t('booking.guests')}</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-hydrangea-deep">100+</div>
                <div className="text-muted-foreground">{t('booking.heritage')}</div>
              </div>
            </div>
          </div>
          <div className="px-6">
            <BookingForm />
          </div>

          {/* WhatsApp Contact */}
          <div className="max-w-4xl mx-auto text-center px-6 mt-12">
            <p className="text-muted-foreground mb-4">
              {t('booking.whatsapp')}
            </p>
            <WhatsAppButton />
          </div>
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