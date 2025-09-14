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
      default: "backdrop-blur-[2px] bg-glass-blue/20 border border-glass-blue/30 hover:bg-glass-blue/25 shadow-md shadow-glass-blue/10",
      nav: "backdrop-blur-[2px] bg-glass-blue/20 border border-glass-blue/30 hover:bg-glass-blue/25 shadow-lg shadow-glass-blue/12", 
      modal: "backdrop-blur-[3px] bg-glass-blue/22 border border-glass-blue/35 hover:bg-glass-blue/28 shadow-lg shadow-glass-blue/15"
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