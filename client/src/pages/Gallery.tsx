import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Footer from "@/components/Footer";

// Import available images
import mainHouse from "@assets/foto-principal-casa-del-puente_1760137696009.jpg";
import exteriorImage1 from "@assets/WhatsApp Image 2025-09-13 at 15.51.54_5a202e28_1757805248589.jpg";
import exteriorImage2 from "@assets/WhatsApp Image 2025-09-13 at 15.53.46_c3d0b191_1757805248589.jpg";
import exteriorImage3 from "@assets/WhatsApp Image 2025-09-13 at 15.54.05_54df4d3a_1757805248590.jpg";
import exteriorImage4 from "@assets/WhatsApp Image 2025-09-13 at 15.54.33_e68e17db_1757805248590.jpg";
import heritageImage from "@assets/WhatsApp Image 2025-09-13 at 15.54.52_5c8d2b26_1757805248590.jpg";

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'exterior' | 'rooms' | 'gardens' | 'heritage' | 'amenities';
  title: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: "main-house",
    src: mainHouse,
    alt: "Casa Flora - Main House Exterior",
    category: "exterior",
    title: "Heritage House Facade"
  },
  {
    id: "exterior-1",
    src: exteriorImage1,
    alt: "Casa Flora Exterior View",
    category: "exterior",
    title: "Mountain Vista"
  },
  {
    id: "exterior-2",
    src: exteriorImage2,
    alt: "Casa Flora Garden View",
    category: "gardens",
    title: "Tropical Gardens"
  },
  {
    id: "exterior-3",
    src: exteriorImage3,
    alt: "Casa Flora Architectural Detail",
    category: "exterior",
    title: "Colonial Architecture"
  },
  {
    id: "exterior-4",
    src: exteriorImage4,
    alt: "Casa Flora Terrace",
    category: "exterior",
    title: "Covered Terrace"
  },
  {
    id: "heritage-1",
    src: heritageImage,
    alt: "Casa Flora Heritage Photo",
    category: "heritage",
    title: "Four Generations (1920-2024)"
  },
];

const categories = [
  { id: 'all', label: 'All Photos' },
  { id: 'exterior', label: 'Exterior' },
  { id: 'rooms', label: 'Bedrooms' },
  { id: 'gardens', label: 'Gardens' },
  { id: 'heritage', label: 'Heritage' },
  { id: 'amenities', label: 'Amenities' },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    gsap.defaults({
      duration: 1,
      ease: "power2.out"
    });

    // Animate gallery items on load
    gsap.from(".gallery-item", {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".gallery-grid",
        start: "top 80%",
      }
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.killAll();
    };
  }, [selectedCategory]);

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-casa-blue-light/20 via-background to-hydrangea-soft/10">
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Photo Gallery
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Explore Casa Flora's century-old charm through our collection of heritage photos, botanical gardens, and architectural details
          </p>
        </div>
      </section>

      <main className="relative">
        {/* Category Filter */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-casa-blue-medium text-white'
                      : 'bg-glass-light text-muted-foreground hover:bg-glass-medium'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            {filteredImages.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No photos available in this category yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className="gallery-item cursor-pointer group"
                    onClick={() => openLightbox(image)}
                  >
                    <GlassCard className="overflow-hidden hover-elevate">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <h3 className="font-serif text-lg font-semibold">{image.title}</h3>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-20 bg-gradient-to-br from-background to-casa-blue-light/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <GlassCard className="p-12">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                More Photos Coming Soon
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We're continuously adding more photos of our botanical bedrooms, tropical gardens, and heritage details. Follow us on social media to see the latest updates!
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="https://instagram.com/casaflorapanama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-hydrangea-deep text-white rounded-lg hover:bg-hydrangea-medium transition-colors"
                >
                  Follow on Instagram
                </a>
                <a
                  href="https://facebook.com/casaflorapanama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-casa-blue-medium text-white rounded-lg hover:bg-casa-blue-deep transition-colors"
                >
                  Like on Facebook
                </a>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={24} className="text-white" />
          </button>

          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="font-serif text-2xl font-semibold text-white mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-white/70 capitalize">
                {selectedImage.category}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
