import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import PropertyGallery from "@/components/PropertyGallery";
import BotanicalRoomStories from "@/components/BotanicalRoomStories";
import SleepingPlan from "@/components/SleepingPlan";
import BookingInvite from "@/components/BookingInvite";
import HouseAmenities from "@/components/HouseAmenities";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import bougainvilleaDivider from "@assets/bougainvillea-divider_1760151444026.png";

gsap.registerPlugin(ScrollTrigger);

export default function CasaFlora() {
  useEffect(() => {
    gsap.defaults({
      duration: 1.2,
      ease: "power2.out",
    });
    ScrollTrigger.refresh();

    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <SEO path="/" />

      <main>
        <section id="home">
          <HeroSection />
        </section>

        <section id="gallery">
          <PropertyGallery />
        </section>

        <SleepingPlan />

        <BookingInvite />

        <section id="rooms">
          <BotanicalRoomStories />
        </section>

        <section id="amenities" className="bg-background">
          <HouseAmenities />
        </section>

        <section id="location">
          <LocationMap />
        </section>
      </main>

      <div>
        <img
          src={bougainvilleaDivider}
          alt=""
          className="w-full h-auto opacity-90 dark:opacity-70 block"
        />
      </div>

      <Footer />
      <WhatsAppButton floating />
    </div>
  );
}
