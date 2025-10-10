import topFrame from "@assets/long-top-frame-white@4x_1760139257881.png";
import bottomFrame from "@assets/long-bottom-frame-white@4x_1760139257881.png";

interface DecorativeFrameProps {
  children: React.ReactNode;
  className?: string;
}

export default function DecorativeFrame({ children, className = "" }: DecorativeFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Top Frame */}
      <div className="flex justify-center mb-4">
        <img 
          src={topFrame} 
          alt="" 
          className="w-64 h-auto opacity-80 dark:opacity-60" 
        />
      </div>
      
      {/* Content */}
      <div className="px-4">
        {children}
      </div>
      
      {/* Bottom Frame */}
      <div className="flex justify-center mt-4">
        <img 
          src={bottomFrame} 
          alt="" 
          className="w-64 h-auto opacity-80 dark:opacity-60" 
        />
      </div>
    </div>
  );
}
