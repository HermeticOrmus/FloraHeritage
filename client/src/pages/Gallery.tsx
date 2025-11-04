import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import SEO from "@/components/SEO";
import GlassCard from "@/components/GlassCard";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Import exterior images
import mainHouse from "@assets/foto-principal-casa-del-puente_1760137696009.jpg";
import ext1 from "@assets/exteriors/casa-flora-exterior-front-view-blue-roof.jpg";
import ext2 from "@assets/exteriors/casa-flora-exterior-front-view-garden-flowers.jpg";
import ext3 from "@assets/exteriors/casa-flora-exterior-full-house-landscape.jpg";
import ext4 from "@assets/exteriors/casa-flora-exterior-side-angle-gardens.jpg";
import ext5 from "@assets/exteriors/casa-flora-exterior-wide-angle.jpg";
import ext6 from "@assets/exteriors/casa-flora-exterior-entrance-perspective.jpg";
import ext7 from "@assets/exteriors/casa-flora-exterior-terrace-patio.jpg";
import ext8 from "@assets/exteriors/casa-flora-exterior-terrace-entrance-door.jpg";
import ext9 from "@assets/exteriors/casa-flora-exterior-aerial-perspective.jpg";
import ext10 from "@assets/exteriors/casa-flora-exterior-sunset-view.jpg";
import ext11 from "@assets/exteriors/casa-flora-detail-architectural-feature.jpg";
import ext12 from "@assets/exteriors/casa-flora-detail-exterior-close-up.jpg";

// Import garden images
import garden1 from "@assets/gardens/casa-flora-garden-covered-walkway-flowers.jpg";
import garden2 from "@assets/gardens/casa-flora-garden-entrance-gate.jpg";
import garden3 from "@assets/gardens/casa-flora-garden-flowers-orange-magenta.jpg";
import garden4 from "@assets/gardens/casa-flora-garden-tropical-plants.jpg";
import garden5 from "@assets/gardens/casa-flora-detail-garden-close-up.jpg";

// Import bedroom images
import bedroom1 from "@assets/bedrooms/casa-flora-room-geisha-main.jpg";
import bedroom2 from "@assets/bedrooms/casa-flora-room-orquidea-main.jpg";
import bedroom3 from "@assets/bedrooms/casa-flora-room-hortensia-twin-beds.jpg";
import bedroom4 from "@assets/bedrooms/casa-flora-room-veranera-bunk-beds.jpg";

// Import bathroom images (amenities)
import bath1 from "@assets/bathrooms/casa-flora-bathroom-geisha-ensuite.jpg";
import bath2 from "@assets/bathrooms/casa-flora-bathroom-geisha-ensuite-angle2.jpg";
import bath3 from "@assets/bathrooms/casa-flora-bathroom-geisha-ensuite-shower.jpg";
import bath4 from "@assets/bathrooms/casa-flora-bathroom-orquidea-ensuite.jpg";
import bath5 from "@assets/bathrooms/casa-flora-bathroom-upstairs-shared.jpg";
import bath6 from "@assets/bathrooms/casa-flora-bathroom-groundfloor-guest.jpg";

// Import common area images (amenities)
import common1 from "@assets/common-areas/casa-flora-interior-common-living-room.jpg";
import common2 from "@assets/common-areas/casa-flora-interior-common-living-room-angle2.jpg";
import common3 from "@assets/common-areas/casa-flora-interior-common-living-room-bridge-view.jpg";
import common4 from "@assets/common-areas/casa-flora-interior-common-dining-room.jpg";
import common5 from "@assets/common-areas/casa-flora-interior-common-entryway.jpg";
import common6 from "@assets/common-areas/casa-flora-interior-common-tv-room.jpg";
import common7 from "@assets/common-areas/casa-flora-interior-common-stairs-upstairs.jpg";
import common8 from "@assets/common-areas/casa-flora-interior-hallway.jpg";
import common9 from "@assets/common-areas/casa-flora-interior-library-bookshelf.jpg";

// Import landscape images
import landscape1 from "@assets/landscape/casa-flora-landscape-context.jpg";
import landscape2 from "@assets/landscape/casa-flora-landscape-property-overview.jpg";

// Import heritage images
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
  // Main exterior
  {
    id: "main-house",
    src: mainHouse,
    alt: "Casa Del Puente - Main House Exterior",
    category: "exterior",
    title: "Heritage House Facade"
  },
  
  // Exterior images
  {
    id: "ext-1",
    src: ext1,
    alt: "Casa Del Puente front view with blue roof",
    category: "exterior",
    title: "Classic Blue Roof"
  },
  {
    id: "ext-2",
    src: ext2,
    alt: "Casa Del Puente front view with garden flowers",
    category: "exterior",
    title: "Garden Entrance"
  },
  {
    id: "ext-3",
    src: ext3,
    alt: "Casa Del Puente full house landscape",
    category: "exterior",
    title: "Mountain Setting"
  },
  {
    id: "ext-4",
    src: ext4,
    alt: "Casa Del Puente side angle with gardens",
    category: "exterior",
    title: "Garden Perspective"
  },
  {
    id: "ext-5",
    src: ext5,
    alt: "Casa Del Puente wide angle view",
    category: "exterior",
    title: "Wide Angle Vista"
  },
  {
    id: "ext-6",
    src: ext6,
    alt: "Casa Del Puente entrance perspective",
    category: "exterior",
    title: "Welcoming Entrance"
  },
  {
    id: "ext-7",
    src: ext7,
    alt: "Casa Del Puente terrace patio",
    category: "exterior",
    title: "Terrace Living"
  },
  {
    id: "ext-8",
    src: ext8,
    alt: "Casa Del Puente terrace entrance door",
    category: "exterior",
    title: "Heritage Doorway"
  },
  {
    id: "ext-9",
    src: ext9,
    alt: "Casa Del Puente aerial perspective",
    category: "exterior",
    title: "Aerial View"
  },
  {
    id: "ext-10",
    src: ext10,
    alt: "Casa Del Puente at sunset",
    category: "exterior",
    title: "Golden Hour"
  },
  {
    id: "ext-11",
    src: ext11,
    alt: "Casa Del Puente architectural detail",
    category: "exterior",
    title: "Architectural Detail"
  },
  {
    id: "ext-12",
    src: ext12,
    alt: "Casa Del Puente exterior close-up",
    category: "exterior",
    title: "Colonial Craftsmanship"
  },
  
  // Garden images
  {
    id: "garden-1",
    src: garden1,
    alt: "Casa Del Puente covered walkway with flowers",
    category: "gardens",
    title: "Floral Walkway"
  },
  {
    id: "garden-2",
    src: garden2,
    alt: "Casa Del Puente garden entrance gate",
    category: "gardens",
    title: "Garden Gate"
  },
  {
    id: "garden-3",
    src: garden3,
    alt: "Casa Del Puente garden orange and magenta flowers",
    category: "gardens",
    title: "Tropical Blooms"
  },
  {
    id: "garden-4",
    src: garden4,
    alt: "Casa Del Puente tropical plants",
    category: "gardens",
    title: "Lush Greenery"
  },
  {
    id: "garden-5",
    src: garden5,
    alt: "Casa Del Puente garden close-up detail",
    category: "gardens",
    title: "Garden Details"
  },
  
  // Bedroom images
  {
    id: "room-geisha",
    src: bedroom1,
    alt: "Geisha Room - Main bedroom with en-suite",
    category: "rooms",
    title: "Geisha Suite"
  },
  {
    id: "room-orquidea",
    src: bedroom2,
    alt: "Orquídea Room - Orchid themed bedroom",
    category: "rooms",
    title: "Orquídea Suite"
  },
  {
    id: "room-hortensia",
    src: bedroom3,
    alt: "Hortensia Room - Twin beds upstairs",
    category: "rooms",
    title: "Hortensia Room"
  },
  {
    id: "room-veranera",
    src: bedroom4,
    alt: "Veranera Room - Bunk bed room",
    category: "rooms",
    title: "Veranera Room"
  },
  
  // Bathroom images (amenities)
  {
    id: "bath-geisha-1",
    src: bath1,
    alt: "Geisha en-suite bathroom",
    category: "amenities",
    title: "En-suite Bathroom"
  },
  {
    id: "bath-geisha-2",
    src: bath2,
    alt: "Geisha bathroom alternative angle",
    category: "amenities",
    title: "En-suite Detail"
  },
  {
    id: "bath-geisha-3",
    src: bath3,
    alt: "Geisha bathroom shower",
    category: "amenities",
    title: "Modern Shower"
  },
  {
    id: "bath-orquidea",
    src: bath4,
    alt: "Orquídea en-suite bathroom",
    category: "amenities",
    title: "Orquídea Bathroom"
  },
  {
    id: "bath-shared",
    src: bath5,
    alt: "Upstairs shared bathroom",
    category: "amenities",
    title: "Shared Bathroom"
  },
  {
    id: "bath-guest",
    src: bath6,
    alt: "Ground floor guest bathroom",
    category: "amenities",
    title: "Guest Bathroom"
  },
  
  // Common areas (amenities)
  {
    id: "common-living-1",
    src: common1,
    alt: "Casa Del Puente living room",
    category: "amenities",
    title: "Living Room"
  },
  {
    id: "common-living-2",
    src: common2,
    alt: "Casa Del Puente living room angle 2",
    category: "amenities",
    title: "Cozy Seating"
  },
  {
    id: "common-living-3",
    src: common3,
    alt: "Casa Del Puente living room with bridge view",
    category: "amenities",
    title: "Bridge View Lounge"
  },
  {
    id: "common-dining",
    src: common4,
    alt: "Casa Del Puente dining room",
    category: "amenities",
    title: "Dining Room"
  },
  {
    id: "common-entry",
    src: common5,
    alt: "Casa Del Puente entryway",
    category: "amenities",
    title: "Grand Entryway"
  },
  {
    id: "common-tv",
    src: common6,
    alt: "Casa Del Puente TV room",
    category: "amenities",
    title: "TV Room"
  },
  {
    id: "common-stairs",
    src: common7,
    alt: "Casa Del Puente upstairs stairway",
    category: "amenities",
    title: "Heritage Staircase"
  },
  {
    id: "common-hallway",
    src: common8,
    alt: "Casa Del Puente interior hallway",
    category: "amenities",
    title: "Interior Hallway"
  },
  {
    id: "common-library",
    src: common9,
    alt: "Casa Del Puente library bookshelf",
    category: "amenities",
    title: "Library Corner"
  },
  
  // Landscape images
  {
    id: "landscape-1",
    src: landscape1,
    alt: "Casa Del Puente landscape context",
    category: "exterior",
    title: "Mountain Context"
  },
  {
    id: "landscape-2",
    src: landscape2,
    alt: "Casa Del Puente property overview",
    category: "exterior",
    title: "Property Overview"
  },
  
  // Heritage images
  {
    id: "heritage-1",
    src: heritageImage,
    alt: "Casa Del Puente Heritage Photo",
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
        title="Photo Gallery | Casa Del Puente - Heritage Home in Boquete"
        description="Explore our stunning photo gallery showcasing Casa Del Puente's colonial architecture, botanical bedrooms, tropical gardens, and breathtaking mountain views in Boquete, Panama."
      />

      <div className="min-h-screen bg-background">
        {/* Gallery Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
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
