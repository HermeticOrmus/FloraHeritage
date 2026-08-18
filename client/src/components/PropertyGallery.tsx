import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import GlassCard from "@/components/GlassCard";
import orchidDivider from "@assets/orchid-divider_1760144115381.png";

import houseExterior from "@assets/exteriors/casa-flora-exterior-front-view-blue-roof.jpg";
import houseSunset from "@assets/exteriors/casa-flora-exterior-sunset-view.jpg";
import landscapeContext from "@assets/landscape/casa-flora-landscape-context.jpg";
import gardenWalkway from "@assets/gardens/casa-flora-garden-covered-walkway-flowers.jpg";
import gardenFlowers from "@assets/gardens/casa-flora-garden-flowers-orange-magenta.jpg";
import tropicalPlants from "@assets/gardens/casa-flora-garden-tropical-plants.jpg";
import livingRoom from "@assets/common-areas/casa-flora-interior-common-living-room.jpg";
import diningRoom from "@assets/common-areas/casa-flora-interior-common-dining-room.jpg";

gsap.registerPlugin(ScrollTrigger);

const getGalleryImages = (t: any) => [
  {
    src: houseExterior,
    title: t('gallery.images.casaDelPuente')
  },
  {
    src: gardenWalkway,
    title: t('gallery.images.gardenPath')
  },
  {
    src: livingRoom,
    title: t('gallery.images.livingSpaces')
  },
  {
    src: houseSunset,
    title: t('gallery.images.sunset')
  },
  {
    src: gardenFlowers,
    title: t('gallery.images.botanicalHeritage')
  },
  {
    src: diningRoom,
    title: t('gallery.images.diningRoom')
  },
  {
    src: tropicalPlants,
    title: t('gallery.images.tropicalGarden')
  },
  {
    src: landscapeContext,
    title: t('gallery.images.mountainSetting')
  }
];

export default function PropertyGallery() {
  const { t } = useTranslation();
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const galleryImages = getGalleryImages(t);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      imageRefs.current.forEach((img, index) => {
        if (img) {
          gsap.set(img, {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotation: index % 2 === 0 ? -5 : 5
          });
        }
      });

      ScrollTrigger.create({
        trigger: galleryRef.current,
        start: "top 70%",
        animation: gsap.to(imageRefs.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out"
        })
      });

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) {
        imageRefs.current.forEach((wrap) => {
          const img = wrap?.querySelector("img");
          if (!wrap || !img) return;
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: wrap,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      }

    }, galleryRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const setImageRef = (el: HTMLDivElement | null, index: number) => {
    imageRefs.current[index] = el;
  };

  return (
    <section 
      ref={galleryRef}
      className="py-24 bg-background"
      data-testid="property-gallery"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Orchid Divider */}
        <div className="flex justify-center mb-12">
          <img 
            src={orchidDivider} 
            alt="" 
            className="w-full max-w-4xl h-auto opacity-90 dark:opacity-70" 
          />
        </div>

        {/* Main featured image */}
        <div className="mb-12">
          <div
            ref={(el) => setImageRef(el, 0)}
            className="relative overflow-hidden"
          >
            <GlassCard className="p-0 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={galleryImages[0].src}
                  alt={galleryImages[0].title}
                  className="w-full h-[400px] md:h-[500px] object-cover scale-110 hover-elevate"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
                    {galleryImages[0].title}
                  </h3>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.slice(1).map((image, index) => (
            <div
              key={index + 1}
              ref={(el) => setImageRef(el, index + 1)}
              className={index === 1 ? "lg:col-span-2" : ""}
            >
              <GlassCard className="p-0 overflow-hidden group hover-elevate">
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    loading="lazy"
                    decoding="async"
                    className={`w-full object-cover scale-110 transition-transform duration-500 ${
                      index === 1 ? "h-[250px]" : "h-[300px]"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-lg font-semibold text-white">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link href="/gallery" className="font-serif text-lg text-casa-blue-deep hover:underline" data-testid="gallery-see-all">
            {t("gallery.seeAll")}
          </Link>
          <Link href="/tour" className="font-serif text-lg text-casa-blue-deep hover:underline" data-testid="gallery-walk-house">
            {t("tour.walkCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}