import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import GlassCard from "@/components/GlassCard";
import DecorativeFrame from "@/components/DecorativeFrame";
import orchidDivider from "@assets/orchid-divider_1760144115381.png";

// Exterior & Landscape
import houseExterior from "@assets/exteriors/casa-flora-exterior-front-view-blue-roof.jpg";
import houseWideAngle from "@assets/exteriors/casa-flora-exterior-wide-angle.jpg";
import houseSunset from "@assets/exteriors/casa-flora-exterior-sunset-view.jpg";
import houseAerial from "@assets/exteriors/casa-flora-exterior-aerial-perspective.jpg";
import terracePatio from "@assets/exteriors/casa-flora-exterior-terrace-patio.jpg";
import mountainView from "@assets/landscape/casa-flora-landscape-property-overview.jpg";
import landscapeContext from "@assets/landscape/casa-flora-landscape-context.jpg";

// Gardens & Flowers
import gardenWalkway from "@assets/gardens/casa-flora-garden-covered-walkway-flowers.jpg";
import gardenFlowers from "@assets/gardens/casa-flora-garden-flowers-orange-magenta.jpg";
import tropicalPlants from "@assets/gardens/casa-flora-garden-tropical-plants.jpg";

// Interior Common Areas
import livingRoom from "@assets/common-areas/casa-flora-interior-common-living-room.jpg";
import diningRoom from "@assets/common-areas/casa-flora-interior-common-dining-room.jpg";
import libraryBookshelf from "@assets/common-areas/casa-flora-interior-library-bookshelf.jpg";

gsap.registerPlugin(ScrollTrigger);

const getGalleryImages = (t: any) => [
  {
    src: houseWideAngle,
    title: t('gallery.images.casaDelPuente')
  },
  {
    src: gardenWalkway,
    title: t('gallery.images.heritageArchitecture')
  },
  {
    src: livingRoom,
    title: t('gallery.images.livingSpaces')
  },
  {
    src: houseSunset,
    title: t('gallery.images.gardenViews')
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
    title: t('gallery.images.coffeeFlora')
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

      // Scroll-triggered masonry animation
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

    }, galleryRef);

    return () => {
      ctx.revert();
      ScrollTrigger.killAll();
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

        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {t('gallery.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('gallery.description')}
          </p>
        </div>

        {/* Main featured image */}
        <div className="mb-12">
          <div
            ref={(el) => setImageRef(el, 0)}
            className="relative overflow-hidden"
          >
            <GlassCard className="p-0 overflow-hidden">
              <div className="relative">
                <img
                  src={galleryImages[0].src}
                  alt={galleryImages[0].title}
                  className="w-full h-[400px] md:h-[500px] object-cover hover-elevate"
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
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.title}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
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
      </div>
    </section>
  );
}