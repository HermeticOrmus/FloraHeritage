import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/GlassCard";
import DecorativeFrame from "@/components/DecorativeFrame";
import { Badge } from "@/components/ui/badge";
import { Wifi, Bed, Users, Baby, Dog, Home, Coffee, Car } from "lucide-react";
import houseImage from "@assets/WhatsApp Image 2025-09-13 at 15.51.54_5a202e28_1757805248589.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function HouseAmenities() {
  const { t } = useTranslation();
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const mainAmenities = [
    {
      icon: Wifi,
      title: t('amenities.highSpeedWifi'),
      description: t('amenities.wifiDesc'),
      color: 'bg-casa-blue-light/20'
    },
    {
      icon: Bed,
      title: t('amenities.beds'),
      description: t('amenities.bedsDesc'),
      color: 'bg-hydrangea-soft/20'
    },
    {
      icon: Users,
      title: t('amenities.familyFriendly'),
      description: t('amenities.familyDesc'),
      color: 'bg-mountain-sage/20'
    },
    {
      icon: Baby,
      title: t('amenities.babyFriendly'),
      description: t('amenities.babyDesc'),
      color: 'bg-mountain-sage/20'
    },
    {
      icon: Home,
      title: t('amenities.gardenCare'),
      description: t('amenities.gardenCareDesc'),
      color: 'bg-mountain-sage/20'
    }
  ];

  const additionalFeatures = [
    { text: t('amenities.fullKitchen'), color: 'bg-hydrangea-deep' },
    { text: t('amenities.bathrooms'), color: 'bg-hydrangea-deep' },
    { text: t('amenities.livingAreas'), color: 'bg-casa-blue-medium' },
    { text: t('amenities.barArea'), color: 'bg-casa-blue-deep' },
    { text: t('amenities.office'), color: 'bg-casa-blue-deep' },
    { text: t('amenities.gardenAccess'), color: 'bg-mountain-sage' },
    { text: t('amenities.parking'), color: 'bg-casa-blue-medium' },
    { text: t('amenities.mountainViews'), color: 'bg-casa-blue-medium' },
    { text: t('amenities.walkingDistance'), color: 'bg-mountain-forest' },
    { text: t('amenities.riverside'), color: 'bg-mountain-forest' },
    { text: `${t('amenities.hiking')} ${t('amenities.hikingDistance')}`, color: 'bg-mountain-forest' },
    { text: t('amenities.exploreLocation'), color: 'bg-mountain-forest' }
  ];

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
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('amenities.title')}
          </h2>
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
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${amenity.color}`}>
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
              {t('amenities.additionalTitle')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {additionalFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-left"
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${feature.color}`} />
                  <span className="text-muted-foreground text-sm">
                    {feature.text}
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