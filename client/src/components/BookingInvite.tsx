import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ERIKA_PHONE = "50764160902";
export const ERIKA_DISPLAY = "+507 6416-0902";

export function openErikaWhatsApp(message: string): void {
  const url = `https://wa.me/${ERIKA_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function BookingInvite() {
  const { t } = useTranslation();

  return (
    <section id="booking" className="py-20 bg-background" data-testid="booking-invite">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t("booking.inviteTitle")}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {t("booking.inviteBody")}
        </p>
        <p className="font-serif text-xl text-foreground mb-2">
          {t("booking.hostName")} · {ERIKA_DISPLAY}
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          {t("pricing.amount")} / {t("pricing.night")} · {t("pricing.minNights")} · {t("pricing.sleeps")}
        </p>
        <button
          type="button"
          onClick={() => openErikaWhatsApp(t("whatsapp.message"))}
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-3 rounded-md transition-colors"
          data-testid="booking-whatsapp"
        >
          <MessageCircle className="w-5 h-5" />
          {t("booking.contactWhatsApp")}
        </button>
      </div>
    </section>
  );
}
