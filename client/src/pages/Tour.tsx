import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import GlassCard from "@/components/GlassCard";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";

import facadeStill from "@assets/foto-principal-casa-del-puente_1760137696009.jpg";
import gardenStill from "@assets/gardens/casa-flora-garden-covered-walkway-flowers.jpg";
import livingStill from "@assets/common-areas/casa-del-puente-interior-common-living-room-006.jpg";
import diningStill from "@assets/common-areas/casa-del-puente-interior-common-dining-room-001.jpg";
import kitchenStill from "@assets/common-areas/casa-del-puente-interior-common-kitchen-main.jpg";
import geishaStill from "@assets/bedrooms/casa-flora-room-geisha-main.jpg";
import terraceStill from "@assets/exteriors/casa-del-puente-exterior-terrace-patio-003.jpg";
import bridgeStill from "@assets/landscape/casa-flora-landscape-property-overview.jpg";

const SITE = "https://casadelpuente.site";

const CHAPTERS = [
  { id: "arrival", start: 0, still: facadeStill },
  { id: "garden", start: 3.2, still: gardenStill },
  { id: "living", start: 6.4, still: livingStill },
  { id: "dining", start: 9.6, still: diningStill },
  { id: "kitchen", start: 12.8, still: kitchenStill },
  { id: "bedrooms", start: 16, still: geishaStill },
  { id: "terrace", start: 28.8, still: terraceStill },
  { id: "bridge", start: 32, still: bridgeStill },
] as const;

export default function Tour() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seekTo = (start: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = start;
    void video.play();
  };

  return (
    <>
      <SEO
        path="/tour"
        title="House Tour | Casa Del Puente, Boquete"
        description="Walk through Casa Del Puente: the turquoise-roof facade, garden path, living rooms, kitchen, four botanical bedrooms, terrace, and the namesake bridge. $550/night, whole house."
        image="/videos/property-tour.jpg"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Casa Del Puente house tour",
            description:
              "Photo tour of Casa Del Puente in Boquete: facade, garden, interiors, bedrooms, terrace, and the river bridge.",
            thumbnailUrl: `${SITE}/videos/property-tour.jpg`,
            contentUrl: `${SITE}/videos/property-tour.mp4`,
            uploadDate: "2026-08-18",
            duration: "PT38S",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <section className="px-6 pt-32 pb-10 md:pt-40">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8 text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t("tour.pageTitle")}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t("tour.description")}
              </p>
            </header>

            <GlassCard className="p-0 overflow-hidden">
              <div className="relative aspect-video bg-stone-950">
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster="/videos/property-tour.jpg?v=2"
                  data-testid="tour-video"
                >
                  <source src="/videos/property-tour.mp4?v=2" type="video/mp4" />
                </video>
              </div>
            </GlassCard>

            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {CHAPTERS.map((chapter) => (
                <Button
                  key={chapter.id}
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => seekTo(chapter.start)}
                  data-testid={`tour-chapter-${chapter.id}`}
                >
                  {t(`tour.chapters.${chapter.id}`)}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CHAPTERS.map((chapter) => (
                <button
                  key={chapter.id}
                  type="button"
                  className="text-left"
                  onClick={() => seekTo(chapter.start)}
                  data-testid={`tour-still-${chapter.id}`}
                >
                  <GlassCard className="p-0 overflow-hidden hover-elevate">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={chapter.still}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="font-serif text-lg font-semibold text-foreground">
                        {t(`tour.chapters.${chapter.id}`)}
                      </h2>
                    </div>
                  </GlassCard>
                </button>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">{t("tour.bookHint")}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <WhatsAppButton />
                <Button asChild variant="outline">
                  <Link href="/gallery">{t("tour.seeGallery")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton floating />
      </div>
    </>
  );
}
