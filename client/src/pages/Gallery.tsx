import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import SEO from "@/components/SEO";
import GlassCard from "@/components/GlassCard";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";

// Curated anchors; every other photo is discovered from the asset folders below.
import mainHouse from "@assets/foto-principal-casa-del-puente_1760137696009.jpg";
import heritageImage from "@assets/WhatsApp Image 2025-09-13 at 15.54.52_5c8d2b26_1757805248590.jpg";

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'exterior' | 'rooms' | 'gardens' | 'heritage' | 'amenities';
  title: string;
}

// Folder = category. Vite resolves these at build time; adding a photo to a
// folder is all it takes to put it in the gallery.
const globs: Record<"exterior" | "rooms" | "gardens" | "amenities", Record<string, string>> = {
  exterior: {
    ...(import.meta.glob("@assets/exteriors/*.jpg", { eager: true, query: "?url", import: "default" }) as Record<string, string>),
    ...(import.meta.glob("@assets/landscape/*.jpg", { eager: true, query: "?url", import: "default" }) as Record<string, string>),
  },
  rooms: import.meta.glob("@assets/bedrooms/*.jpg", { eager: true, query: "?url", import: "default" }) as Record<string, string>,
  gardens: import.meta.glob("@assets/gardens/*.jpg", { eager: true, query: "?url", import: "default" }) as Record<string, string>,
  amenities: {
    ...(import.meta.glob("@assets/bathrooms/*.jpg", { eager: true, query: "?url", import: "default" }) as Record<string, string>),
    ...(import.meta.glob("@assets/common-areas/*.jpg", { eager: true, query: "?url", import: "default" }) as Record<string, string>),
  },
};

// Photos that must not ship (mislabeled or previously rejected).
const EXCLUDED = ["casa-flora-exterior-wide-angle.jpg", "casa-flora-interior-common-stairs-upstairs.jpg"];

function humanize(path: string): string {
  const name = path.split("/").pop() ?? path;
  return name
    .replace(/\.jpg$/i, "")
    .replace(/^casa-(del-puente|flora)-/, "")
    .replace(/-\d+$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

const galleryImages: GalleryImage[] = [
  {
    id: "main-house",
    src: mainHouse,
    alt: "Casa Del Puente - Main House Exterior",
    category: "exterior",
    title: "Heritage House Facade",
  },
  ...(Object.entries(globs) as [GalleryImage["category"], Record<string, string>][]).flatMap(
    ([category, files]) =>
      Object.entries(files)
        .filter(([path]) => !EXCLUDED.some((name) => path.endsWith(name)))
        .sort(([a], [b]) => {
          const na = a.includes("casa-del-puente") ? 0 : 1;
          const nb = b.includes("casa-del-puente") ? 0 : 1;
          return na - nb || a.localeCompare(b);
        })
        .map(([path, src]) => ({
          id: (path.split("/").pop() ?? path).replace(/\.jpg$/i, ""),
          src,
          alt: `Casa Del Puente - ${humanize(path)}`,
          category,
          title: humanize(path),
        }))
  ),
  {
    id: "heritage-photo",
    src: heritageImage,
    alt: "Casa Del Puente Heritage Photo",
    category: "heritage",
    title: "Four Generations (1920-2024)",
  },
];

const categoryIds = ['all', 'exterior', 'rooms', 'gardens', 'heritage', 'amenities'] as const;

export default function Gallery() {
  const { t } = useTranslation();
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
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        setSelectedImage(filteredImages[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
        setSelectedImage(filteredImages[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, filteredImages]);

  return (
    <>
      <SEO
        path="/gallery"
        title="Photo Gallery | Casa Del Puente, Boquete"
        description="Photos of Casa Del Puente: heritage architecture, botanical bedrooms, gardens, kitchen, and mountain views in Boquete, Panama."
      />

      <div className="min-h-screen bg-background">
        <section className="px-6 pt-32 pb-16 md:pt-40">
          <div className="max-w-7xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t('gallery.pageTitle')}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t('gallery.description')}
              </p>
            </header>

            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categoryIds.map((id) => (
                <Button
                  key={id}
                  type="button"
                  size="sm"
                  variant={selectedCategory === id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(id)}
                  data-testid={`gallery-filter-${id}`}
                >
                  {t(`gallery.filters.${id}`)}
                </Button>
              ))}
            </div>

            {filteredImages.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No images found in this category.</p>
              </div>
            ) : (
              <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className="gallery-item cursor-pointer group"
                    onClick={() => openLightbox(image)}
                    data-testid={`gallery-image-${image.id}`}
                  >
                    <GlassCard className="overflow-hidden hover-elevate">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          decoding="async"
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

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-casa-blue-light transition-colors z-50"
              data-testid="button-close-lightbox"
            >
              <X size={32} />
            </button>

            <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white bg-black/60 backdrop-blur-sm px-6 py-4 rounded-lg">
                <h2 className="font-serif text-2xl font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-sm text-white/80">{selectedImage.alt}</p>
              </div>

              {/* Navigation hints */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
                Use arrow keys to navigate • ESC to close
              </div>
            </div>
          </div>
        )}

        <Footer />

        {/* Floating WhatsApp Button */}
        <WhatsAppButton floating />
      </div>
    </>
  );
}
