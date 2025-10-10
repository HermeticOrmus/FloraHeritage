import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/GlassCard";

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

const galleryImages = [
  {
    src: houseWideAngle,
    title: "Casa Del Puente",
    description: "Heritage home in Panama's Flower Capital—century-old gardens cultivated across four generations."
  },
  {
    src: gardenWalkway,
    title: "Heritage Architecture",
    description: "Century-old colonial design preserved through four generations of family stewardship."
  },
  {
    src: livingRoom,
    title: "Living Spaces",
    description: "Comfortable gathering areas where our family has shared meals and memories since 1920."
  },
  {
    src: houseSunset,
    title: "Garden Views",
    description: "Covered walkways connect the house to botanical gardens cultivated across generations."
  },
  {
    src: gardenFlowers,
    title: "Botanical Heritage",
    description: "Hydrangeas, begonias, and orchids thrive in our highland gardens."
  },
  {
    src: diningRoom,
    title: "Dining Room",
    description: "Spacious dining area for family meals and celebrations."
  },
  {
    src: tropicalPlants,
    title: "Coffee & Flora",
    description: "Geisha coffee plants and native orchids create an immersive garden experience."
  },
  {
    src: landscapeContext,
    title: "Mountain Setting",
    description: "Nestled in Boquete's highlands on the slopes of Volcán Barú."
  }
];

export default function PropertyGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Casa Del Puente in Pictures
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From volcanic slopes to heritage gardens—100 years in Panama's Flower Capital
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
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {galleryImages[0].title}
                  </h3>
                  <p className="text-foreground/90 text-lg">
                    {galleryImages[0].description}
                  </p>
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
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                      {image.title}
                    </h3>
                    <p className="text-foreground/80 text-sm">
                      {image.description}
                    </p>
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