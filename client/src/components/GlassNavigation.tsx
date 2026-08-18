import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetOverlay,
  SheetPortal,
} from "@/components/ui/sheet";
import logoWhite from "@assets/Logo Without Text-white@3x_1760138616483.png";
import logoBlack from "@assets/Logo Without Text-black_1760138616482.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { openErikaWhatsApp } from "@/components/BookingInvite";

const navigationItems = [
  { id: "home", key: "nav.home", href: "/" },
  { id: "rooms", key: "nav.rooms", href: "/#rooms" },
  { id: "tour", key: "nav.tour", href: "/tour" },
  { id: "gallery", key: "nav.gallery", href: "/gallery" },
  { id: "amenities", key: "nav.amenities", href: "/#amenities" },
  { id: "rules", key: "nav.rules", href: "/rules" },
] as const;

function sectionFromPath(path: string): string {
  if (path.startsWith("/gallery")) return "gallery";
  if (path.startsWith("/tour")) return "tour";
  if (path.startsWith("/rules")) return "rules";
  if (path.startsWith("/rooms")) return "rooms";
  if (path.startsWith("/heritage")) return "home";
  return "home";
}

export default function GlassNavigation() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [location, setLocation] = useLocation();
  const [activeSection, setActiveSection] = useState(() => sectionFromPath(location));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setActiveSection(sectionFromPath(location));
  }, [location]);

  const go = (href: string, id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);

    if (href.startsWith("/#")) {
      const hash = href.slice(1);
      if (window.location.pathname !== "/") {
        window.location.assign(href);
        return;
      }
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    setLocation(href);
  };

  const book = () => {
    setMobileMenuOpen(false);
    openErikaWhatsApp(t("whatsapp.message"));
  };

  if (isMobile) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[9999] px-4 py-3">
        <div className="flex items-center justify-between rounded-2xl bg-background/80 backdrop-blur-xl border border-border/70 px-3 py-2 shadow-sm">
          <button type="button" className="flex-shrink-0" data-testid="nav-logo" onClick={() => go("/", "home")}>
            <img src={logoBlack} alt="Casa Del Puente" className="h-10 w-auto dark:hidden" />
            <img src={logoWhite} alt="Casa Del Puente" className="h-10 w-auto hidden dark:block" />
          </button>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2" data-testid="button-mobile-menu" aria-label="Menu">
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6 text-foreground" strokeWidth={2} />
                  ) : (
                    <Menu className="h-6 w-6 text-foreground" strokeWidth={2} />
                  )}
                </button>
              </SheetTrigger>
              <SheetPortal>
                <SheetOverlay className="bg-black/40" />
                <SheetContent side="right" className="w-[280px] border-0 bg-background p-0 [&>button]:hidden">
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <SheetDescription className="sr-only">Casa Del Puente</SheetDescription>
                  <div className="flex flex-col h-full py-8 pt-16">
                    <div className="flex-1 px-6 space-y-1">
                      {navigationItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={cn(
                            "w-full font-serif text-lg text-left px-4 py-3.5 rounded-md",
                            activeSection === item.id
                              ? "text-casa-blue-deep font-semibold bg-casa-blue-light/30"
                              : "text-foreground hover:bg-muted",
                          )}
                          onClick={() => go(item.href, item.id)}
                          data-testid={`nav-${item.id}`}
                        >
                          {t(item.key)}
                        </button>
                      ))}
                      <button
                        type="button"
                        className="w-full font-serif text-lg text-left px-4 py-3.5 rounded-md text-white bg-casa-blue-deep mt-2"
                        onClick={book}
                        data-testid="nav-book"
                      >
                        {t("nav.book")}
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </SheetPortal>
            </Sheet>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[9999] mt-5">
      <nav className="flex items-center gap-3 rounded-2xl bg-background/95 backdrop-blur-xl border border-border/70 pl-4 pr-3 py-2 shadow-sm">
        <button type="button" className="flex-shrink-0" data-testid="nav-logo" onClick={() => go("/", "home")}>
          <img src={logoBlack} alt="Casa Del Puente" className="h-11 w-auto dark:hidden" />
          <img src={logoWhite} alt="Casa Del Puente" className="h-11 w-auto hidden dark:block" />
        </button>
        {navigationItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn(
              "font-serif text-base cursor-pointer transition-colors px-1.5 py-2",
              activeSection === item.id
                ? "text-casa-blue-deep font-semibold"
                : "text-foreground/80 hover:text-casa-blue-medium",
            )}
            onClick={() => go(item.href, item.id)}
            data-testid={`nav-${item.id}`}
          >
            {t(item.key)}
          </button>
        ))}
        <button
          type="button"
          className="font-serif text-base rounded-xl bg-casa-blue-deep text-white px-4 py-2 hover:bg-casa-blue-medium"
          onClick={book}
          data-testid="nav-book"
        >
          {t("nav.book")}
        </button>
        <div className="border-l border-border/80 pl-1">
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  );
}
