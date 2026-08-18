import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/GlassCard";
import DecorativeFrame from "@/components/DecorativeFrame";

gsap.registerPlugin(ScrollTrigger);

const CLIPS = [
  { id: "hall", src: "/videos/walk-hall.mp4", poster: "/videos/walk-hall.jpg" },
  { id: "kitchen", src: "/videos/walk-kitchen.mp4", poster: "/videos/walk-kitchen.jpg" },
  { id: "garden", src: "/videos/walk-garden.mp4", poster: "/videos/walk-garden.jpg" },
  { id: "bridge", src: "/videos/walk-bridge.mp4", poster: "/videos/walk-bridge.jpg" },
] as const;

export default function PropertyWalkthroughs() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.set(card, { opacity: 0, y: 60, scale: 0.95 });
        }
        const video = videoRefs.current[index];
        if (!reduce && card && video) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
              void video.play();
            },
            onEnterBack: () => {
              void video.play();
            },
            onLeave: () => {
              video.pause();
            },
            onLeaveBack: () => {
              video.pause();
            },
          });
        }
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        animation: gsap.to(cardRefs.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        }),
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tour"
      className="py-24 bg-background"
      data-testid="property-walkthroughs"
    >
      <div className="max-w-7xl mx-auto px-6">
        <DecorativeFrame variant="hydrangea" position="top">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("walkthroughs.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("walkthroughs.subtitle")}
            </p>
            <a
              href="/tour"
              className="inline-block mt-6 font-serif text-lg text-casa-blue-deep dark:text-casa-blue-light underline-offset-4 hover:underline"
              data-testid="walkthroughs-full-tour"
            >
              {t("walkthroughs.watchFull")}
            </a>
          </div>
        </DecorativeFrame>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CLIPS.map((clip, index) => (
            <div
              key={clip.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            >
              <GlassCard className="p-0 overflow-hidden">
                <div className="relative aspect-video bg-stone-950">
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={clip.poster}
                    aria-hidden="true"
                  >
                    <source src={clip.src} type="video/mp4" />
                  </video>
                  <img
                    src={clip.poster}
                    alt=""
                    className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {t(`walkthroughs.${clip.id}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`walkthroughs.${clip.id}.caption`)}
                  </p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
