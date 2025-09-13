import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "./GlassCard";
import houseImage1 from "@assets/WhatsApp Image 2025-09-13 at 15.51.54_5a202e28_1757805248589.jpg";
import houseImage2 from "@assets/WhatsApp Image 2025-09-13 at 15.54.05_54df4d3a_1757805248590.jpg";
import gardenImage from "@assets/WhatsApp Image 2025-09-13 at 15.54.33_e68e17db_1757805248590.jpg";
import pathwayImage from "@assets/WhatsApp Image 2025-09-13 at 15.54.52_5c8d2b26_1757805248590.jpg";
import flowerImage from "@assets/WhatsApp Image 2025-09-13 at 15.53.46_c3d0b191_1757805248589.jpg";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: houseImage1,
    title: "Casa Flora Main House",
    description: "One of Boquete's most iconic houses, surrounded by lush tropical gardens and century-old trees."
  },
  {
    src: houseImage2,
    title: "Architectural Details", 
    description: "Traditional design elements that reflect our family's commitment to preserving authentic style."
  },
  {
    src: gardenImage,
    title: "Vibrant Gardens",
    description: "Colorful bougainvillea and native plants create a paradise for nature lovers."
  },
  {
    src: pathwayImage,
    title: "Garden Pathways",
    description: "Winding paths through our botanical paradise, perfect for morning walks and meditation."
  },
  {
    src: flowerImage,
    title: "Tropical Flora",
    description: "Indigenous flowers and plants that showcase the natural beauty of Boquete's ecosystem."
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
      className="py-24 bg-gradient-to-b from-stone-cream to-mountain-light/30"
      data-testid="property-gallery"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Casa Flora in Pictures
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the natural beauty and architectural charm that makes Casa Flora a unique destination
          </p>
        </div>

        {/* Main featured image */}
        <div className="mb-12">
          <div
            ref={(el) => setImageRef(el, 0)}
            className="relative overflow-hidden rounded-2xl"
          >
            <GlassCard className="p-0 overflow-hidden">
              <div className="relative">
                <img
                  src={galleryImages[0].src}
                  alt={galleryImages[0].title}
                  className="w-full h-[400px] md:h-[500px] object-cover hover-elevate"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-cream mb-2">
                    {galleryImages[0].title}
                  </h3>
                  <p className="text-stone-cream/90 text-lg">
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
                    <h3 className="font-serif text-lg font-semibold text-stone-cream mb-1">
                      {image.title}
                    </h3>
                    <p className="text-stone-cream/80 text-sm">
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