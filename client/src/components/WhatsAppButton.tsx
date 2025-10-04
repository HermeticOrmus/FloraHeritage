import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export default function WhatsAppButton({
  phoneNumber = "50768481234", // Replace with actual Casa Flora WhatsApp number
  message = "Hello! I'm interested in booking Casa Flora heritage home in Boquete.",
  className = ""
}: WhatsAppButtonProps) {

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className={`bg-[#25D366] hover:bg-[#20BA5A] text-white ${className}`}
      size="lg"
    >
      <MessageCircle className="w-5 h-5 mr-2" />
      Contact via WhatsApp
    </Button>
  );
}
