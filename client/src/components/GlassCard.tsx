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
      default: "backdrop-blur-glass bg-antique-amber dark:bg-antique-sepia border-2 border-stone-warm/30 dark:border-stone-cream/20 shadow-xl shadow-stone-dark/10",
      nav: "backdrop-blur-glass-nav bg-antique-sepia dark:bg-antique-sepia border-2 border-stone-warm/40 dark:border-stone-cream/25 shadow-2xl shadow-stone-dark/20", 
      modal: "backdrop-blur-glass-modal bg-antique-amber dark:bg-antique-sepia border-2 border-stone-warm/35 dark:border-stone-cream/22 shadow-2xl shadow-stone-dark/15"
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