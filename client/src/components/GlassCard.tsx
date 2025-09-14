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
      default: "backdrop-blur-glass bg-natural-glass dark:bg-clear-glass border-2 border-glass-clear/30 dark:border-glass-light/20 shadow-xl shadow-glass-deep/10",
      nav: "backdrop-blur-glass-nav bg-clear-glass dark:bg-clear-glass shadow-2xl shadow-glass-deep/20", 
      modal: "backdrop-blur-glass-modal bg-natural-glass dark:bg-clear-glass border-2 border-glass-clear/35 dark:border-glass-light/22 shadow-2xl shadow-glass-deep/15"
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