import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "nav" | "modal";
}

export default function GlassCard({ children, className, variant = "default" }: GlassCardProps) {
  const variants = {
    default: "backdrop-blur-glass bg-glass-light border border-white/20",
    nav: "backdrop-blur-glass-nav bg-glass-light border border-white/30", 
    modal: "backdrop-blur-glass-modal bg-glass-light border border-white/25"
  };

  return (
    <div 
      className={cn(
        "rounded-2xl shadow-lg shadow-black/10 hover-elevate",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}