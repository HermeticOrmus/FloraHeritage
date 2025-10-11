import bougainvilleaDivider from "@assets/bougainvillea-divider_1760151444026.png";
import geishaDivider from "@assets/geisha-flower-divider_1760143606913.png";
import hydrangeaDivider from "@assets/hydrangea-divider_1760143750601.png";
import orchidDivider from "@assets/orchid-divider_1760144115381.png";

interface DecorativeFrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'bougainvillea' | 'geisha' | 'hydrangea' | 'orchid';
  position?: 'top' | 'bottom' | 'both';
}

export default function DecorativeFrame({ children, className = "", variant = 'hydrangea', position = 'both' }: DecorativeFrameProps) {
  const dividers = {
    bougainvillea: bougainvilleaDivider,
    geisha: geishaDivider,
    hydrangea: hydrangeaDivider,
    orchid: orchidDivider
  };

  const selectedDivider = dividers[variant];

  return (
    <div className={`relative ${className}`}>
      {/* Top Divider */}
      {(position === 'top' || position === 'both') && (
        <div className="flex justify-center mb-6">
          <img 
            src={selectedDivider} 
            alt="" 
            className="w-full max-w-4xl h-auto opacity-90 dark:opacity-70" 
          />
        </div>
      )}
      
      {/* Content */}
      <div className="px-4">
        {children}
      </div>
      
      {/* Bottom Divider (flipped) */}
      {(position === 'bottom' || position === 'both') && (
        <div className="flex justify-center mt-6">
          <img 
            src={selectedDivider} 
            alt="" 
            className="w-full max-w-4xl h-auto opacity-90 dark:opacity-70 transform scale-y-[-1]" 
          />
        </div>
      )}
    </div>
  );
}
