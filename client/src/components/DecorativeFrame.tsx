import topFrame from "@assets/white-top-frame-long@4x_1760140465736.png";
import bottomFrame from "@assets/white-bottom-frame-long@4x_1760140465737.png";

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
