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
      default:
        "backdrop-blur-[1px] bg-glass-blue/5 border border-glass-blue/15 hover:bg-glass-blue/15 shadow-sm shadow-glass-blue/5",
      nav: "backdrop-blur-[1px] bg-glass-blue/5 border border-glass-blue/15 hover:bg-glass-blue/15 shadow-md shadow-glass-blue/7",
      modal:
        "backdrop-blur-[1px] bg-glass-blue/5 border border-glass-blue/17 hover:bg-glass-blue/17 shadow-md shadow-glass-blue/8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative antique-glass-texture antique-glass-imperfection hover-elevate",
          variants[variant],
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
export default GlassCard;
