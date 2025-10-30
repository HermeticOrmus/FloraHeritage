import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  floating?: boolean;
  className?: string;
}

export default function WhatsAppButton({
  phoneNumber = "50764160902",
  floating = false,
  className = ""
}: WhatsAppButtonProps) {
  const { t } = useTranslation();

  const handleWhatsAppClick = () => {
    const message = t('whatsapp.message');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (floating) {
    return (
      <button
        onClick={handleWhatsAppClick}
        className={`fixed bottom-6 right-6 z-[9998] bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${className}`}
        aria-label="Contact via WhatsApp"
        data-testid="floating-whatsapp-button"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-md flex items-center gap-2 transition-colors ${className}`}
      data-testid="whatsapp-button"
    >
      <MessageCircle className="w-5 h-5" />
      Contact via WhatsApp
    </button>
  );
}
