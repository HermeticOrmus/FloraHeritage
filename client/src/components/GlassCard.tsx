import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "nav" | "modal";
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, variant = "default" }, ref) => {
    const variants = {
      default: "backdrop-blur-sm bg-stone-warm/30 border border-stone-warm/50 hover:bg-stone-warm/40 shadow-xl shadow-stone-warm/10",
      nav: "backdrop-blur-sm bg-stone-warm/30 border border-stone-warm/50 hover:bg-stone-warm/40 shadow-2xl shadow-stone-warm/15", 
      modal: "backdrop-blur-sm bg-stone-warm/30 border border-stone-warm/50 hover:bg-stone-warm/40 shadow-2xl shadow-stone-warm/20"
    };

    return (
      <div 
        ref={ref}
        className={cn(
          "relative antique-glass-texture antique-glass-imperfection hover-elevate",
          variants[variant],
          className
        )}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
export default GlassCard;