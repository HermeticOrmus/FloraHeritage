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
      default: "backdrop-blur-[1px] bg-glass-blue/15 border border-glass-blue/25 hover:bg-glass-blue/20 shadow-sm shadow-glass-blue/8",
      nav: "backdrop-blur-[1px] bg-glass-blue/15 border border-glass-blue/25 hover:bg-glass-blue/20 shadow-md shadow-glass-blue/10", 
      modal: "backdrop-blur-[2px] bg-glass-blue/18 border border-glass-blue/30 hover:bg-glass-blue/23 shadow-md shadow-glass-blue/12"
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