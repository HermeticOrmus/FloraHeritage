import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import GlassCard from "./GlassCard";
import heroImage from "@assets/WhatsApp Image 2025-09-13 at 15.51.54_5a202e28_1757805248589.jpg";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 60
      });

      // Staggered entrance animation
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleCTAClick = (action: string) => {
    // todo: remove mock functionality
    console.log(`${action} clicked`);
    gsap.to(ctaRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.3)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="hero-section"
    >
      <div className="relative z-10 text-center text-foreground max-w-4xl px-6">
        <h1 
          ref={titleRef}
          className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Casa Flora
        </h1>
        
        <div ref={subtitleRef} className="mb-8">
          <p className="text-2xl md:text-3xl font-serif text-foreground/95 mb-4 leading-relaxed max-w-3xl mx-auto">
            One of Boquete's most Iconic houses in the heart of town
          </p>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto">
            Experience four generations of family stewardship in Panama's coffee country
          </p>
        </div>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-stone-warm/30 backdrop-blur-sm text-foreground border border-stone-warm/50 hover:bg-stone-warm/40 text-lg px-8 py-3"
            onClick={() => handleCTAClick("Discover Heritage")}
            data-testid="button-discover-heritage"
          >
            Discover Our Heritage
          </Button>
          
          <Button 
            size="lg"
            className="bg-casa-blue-deep text-foreground hover:bg-casa-blue-medium text-lg px-8 py-3"
            onClick={() => handleCTAClick("Book Stay")}
            data-testid="button-book-stay"
          >
            Book Your Stay
          </Button>
        </div>
      </div>
      
      {/* Floating glass info card */}
      <GlassCard className="absolute bottom-8 left-8 p-4 max-w-sm hidden md:block">
        <div className="text-foreground">
          <h3 className="font-serif font-semibold mb-2">Heritage Since 1920</h3>
          <p className="text-sm text-foreground/85">
            Four generations of authentic hospitality in Panama's mountain paradise
          </p>
        </div>
      </GlassCard>
    </section>
  );
}