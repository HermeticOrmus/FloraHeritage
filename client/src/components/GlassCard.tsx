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
      default: "backdrop-blur-sm bg-glass-blue/25 border border-glass-blue/40 hover:bg-glass-blue/35 shadow-xl shadow-glass-blue/15",
      nav: "backdrop-blur-sm bg-glass-blue/25 border border-glass-blue/40 hover:bg-glass-blue/35 shadow-2xl shadow-glass-blue/20", 
      modal: "backdrop-blur-sm bg-glass-blue/25 border border-glass-blue/40 hover:bg-glass-blue/35 shadow-2xl shadow-glass-blue/25"
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