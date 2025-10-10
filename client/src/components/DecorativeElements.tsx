import topFrameBlack from "@assets/Top Frame-black_1760138616484.png";
import topFrameWhite from "@assets/Top Frame-white@3x_1760138616485.png";
import bottomFrameBlack from "@assets/Bottom Frame-black_1760138616479.png";
import bottomFrameWhite from "@assets/Bottom Frame-white@3x_1760138616480.png";
import largeWindowBlack from "@assets/Large Window-black_1760138616480.png";
import largeWindowWhite from "@assets/Large Window-white@3x_1760138616480.png";
import smallWindowBlack from "@assets/Small Window-black_1760138616483.png";
import smallWindowWhite from "@assets/Small Window-WHITE@3x_1760138616484.png";

interface DecorativeFrameProps {
  className?: string;
}

export function TopFrame({ className = "" }: DecorativeFrameProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <img 
        src={topFrameBlack} 
        alt="" 
        className="h-8 w-auto dark:hidden opacity-60"
      />
      <img 
        src={topFrameWhite} 
        alt="" 
        className="h-8 w-auto hidden dark:block opacity-60"
      />
    </div>
  );
}

export function BottomFrame({ className = "" }: DecorativeFrameProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <img 
        src={bottomFrameBlack} 
        alt="" 
        className="h-8 w-auto dark:hidden opacity-60"
      />
      <img 
        src={bottomFrameWhite} 
        alt="" 
        className="h-8 w-auto hidden dark:block opacity-60"
      />
    </div>
  );
}

export function LargeWindow({ className = "" }: DecorativeFrameProps) {
  return (
    <div className={`inline-block ${className}`}>
      <img 
        src={largeWindowBlack} 
        alt="" 
        className="h-16 w-auto dark:hidden opacity-70"
      />
      <img 
        src={largeWindowWhite} 
        alt="" 
        className="h-16 w-auto hidden dark:block opacity-70"
      />
    </div>
  );
}

export function SmallWindow({ className = "" }: DecorativeFrameProps) {
  return (
    <div className={`inline-block ${className}`}>
      <img 
        src={smallWindowBlack} 
        alt="" 
        className="h-12 w-auto dark:hidden opacity-70"
      />
      <img 
        src={smallWindowWhite} 
        alt="" 
        className="h-12 w-auto hidden dark:block opacity-70"
      />
    </div>
  );
}
