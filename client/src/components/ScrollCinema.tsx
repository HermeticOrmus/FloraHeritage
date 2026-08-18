import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BEATS = [
  { id: "bridge", from: 0, to: 0.34 },
  { id: "house", from: 0.3, to: 0.68 },
  { id: "roof", from: 0.64, to: 1 },
] as const;

export default function ScrollCinema() {
  const { t } = useTranslation();
  const pinRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const pin = pinRef.current;
    const video = videoRef.current;
    if (!pin || !video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const bind = () => {
        const duration = video.duration;
        if (!duration || Number.isNaN(duration)) return;

        video.pause();

        ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          onUpdate: (self) => {
            const next = self.progress * duration;
            if (Math.abs(video.currentTime - next) > 0.04) {
              video.currentTime = next;
            }
            BEATS.forEach((beat, i) => {
              const el = beatRefs.current[i];
              if (!el) return;
              const active = self.progress >= beat.from && self.progress <= beat.to;
              el.style.opacity = active ? "1" : "0";
              el.style.transform = active ? "translateY(0)" : "translateY(12px)";
            });
          },
        });

        ScrollTrigger.refresh();
      };

      if (video.readyState >= 1) {
        bind();
      } else {
        video.addEventListener("loadedmetadata", bind, { once: true });
      }
    }, pin);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={pinRef}
      id="fly"
      className="relative h-screen overflow-hidden bg-stone-950"
      data-testid="scroll-cinema"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        muted
        playsInline
        preload="auto"
        poster="/videos/hero-poster.jpg?v=3"
        aria-hidden="true"
      >
        <source src="/videos/hero-tour.mp4?v=3" type="video/mp4" />
      </video>
      <img
        src="/videos/hero-poster.jpg?v=3"
        alt=""
        className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/55" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.25), transparent 45%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:pb-20">
        <p className="mb-4 text-xs uppercase tracking-[0.28em] text-white/60">
          {t("cinema.kicker")}
        </p>
        <div className="relative min-h-[7.5rem] max-w-2xl">
          {BEATS.map((beat, index) => (
            <div
              key={beat.id}
              ref={(el) => {
                beatRefs.current[index] = el;
              }}
              className="absolute inset-x-0 top-0 transition-all duration-500"
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <h2 className="font-serif text-3xl font-bold text-white md:text-5xl">
                {t(`cinema.${beat.id}.title`)}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                {t(`cinema.${beat.id}.caption`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
