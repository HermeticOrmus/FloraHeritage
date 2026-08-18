import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HouseWalkthrough from "@/components/HouseWalkthrough";
import { Button } from "@/components/ui/button";

export default function Tour() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        path="/tour"
        title="Walk the House | Casa Del Puente, Boquete"
        description="Walk through Casa Del Puente room by room: garden, hall, living room, dining room, kitchen, four botanical bedrooms, terrace, and the namesake bridge."
      />

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

            <HouseWalkthrough />

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
