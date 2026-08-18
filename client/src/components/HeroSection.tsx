import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { useRippleEffect, rippleContainerClass } from "@/lib/rippleEffect";

export default function HeroSection() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { createRipple: createHeritageRipple } = useRippleEffect('heritage');
  const { createRipple: createBlueRipple } = useRippleEffect('blue');

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

  const handleCTAClick = (event: React.MouseEvent, action: string) => {
    // Create appropriate ripple effect based on action
    if (action === "Discover Home") {
      createHeritageRipple(event);
    } else {
      createBlueRipple(event);
    }
    
    // Animate the specific button that was clicked
    const clickedButton = event.currentTarget as HTMLElement;
    gsap.to(clickedButton, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
      overwrite: "auto"
    });
    
    // Navigate based on action
    if (action === "Discover Home") {
      setTimeout(() => setLocation("/tour"), 300);
    } else if (action === "Book Stay") {
      // Open WhatsApp with pre-filled message
      const message = t('whatsapp.message');
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/50764160902?text=${encodedMessage}`;
      setTimeout(() => window.open(whatsappUrl, '_blank'), 300);
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-950"
      data-testid="hero-section"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/hero-poster.jpg?v=5"
        aria-hidden="true"
      >
        <source src="/videos/hero-tour.mp4?v=5" type="video/mp4" />
      </video>
      <img
        src="/videos/hero-poster.jpg?v=5"
        alt=""
        className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
      <div className="relative z-10 text-center text-white max-w-4xl px-6">
        <h1
          ref={titleRef}
          className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight transform-gpu drop-shadow"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {t('hero.title')}
        </h1>
        
        <div ref={subtitleRef} className="mb-8 transform-gpu" style={{ backfaceVisibility: 'hidden' }}>
          <p className="text-2xl md:text-3xl font-serif text-white mb-4 leading-relaxed max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
            {t('hero.description')}
          </p>
          <div className="mt-6 inline-flex items-baseline gap-2 bg-black/55 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/25">
            <span className="text-4xl md:text-5xl font-serif font-bold text-white">{t('pricing.amount')}</span>
            <span className="text-lg text-white/95">/ {t('pricing.night')}</span>
            <span className="text-white/85 ml-2">• {t('pricing.minNights')}</span>
          </div>
        </div>
        
        <div ref={ctaRef} className="transform-gpu" style={{ backfaceVisibility: 'hidden' }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className={`bg-white/15 backdrop-blur-sm text-white border border-white/70 hover:bg-white/25 text-lg px-8 py-3 ${rippleContainerClass}`}
              onClick={(event) => handleCTAClick(event, "Discover Home")}
              data-testid="button-discover-heritage"
            >
              {t('hero.learnMore')}
            </Button>
            
            <Button 
              size="lg"
              className={`bg-casa-blue-deep text-white hover:bg-casa-blue-medium text-lg px-8 py-3 ${rippleContainerClass}`}
              onClick={(event) => handleCTAClick(event, "Book Stay")}
              data-testid="button-book-stay"
            >
              {t('hero.bookNow')}
            </Button>
          </div>
          
          <div className="text-center text-white max-w-md mx-auto">
            <h3 className="font-serif font-semibold mb-2 text-xl">{t('hero.heritageSince')}</h3>
            <p className="text-white/90 leading-relaxed">
              {t('hero.heritageDesc')}
            </p>
          </div>
        </div>
      </div>
      
    </section>
  );
}