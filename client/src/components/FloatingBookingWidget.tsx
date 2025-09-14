import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Calendar, Users, X } from "lucide-react";
import { useRippleEffect, rippleContainerClass } from "@/lib/rippleEffect";

interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  property: string;
}

export default function FloatingBookingWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: "",
    checkOut: "",
    guests: 2,
    property: ""
  });
  
  const widgetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { createRipple: createBlueRipple } = useRippleEffect('blue');
  const { createRipple: createStoneRipple } = useRippleEffect('stone');

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isExpanded]);

  const handleExpand = (event?: React.MouseEvent) => {
    if (event) {
      createBlueRipple(event);
    }
    setIsExpanded(!isExpanded);
    // todo: remove mock functionality
    console.log(`Booking widget ${isExpanded ? 'collapsed' : 'expanded'}`);
  };

  const handleNextStep = (event: React.MouseEvent) => {
    createBlueRipple(event);
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      // todo: remove mock functionality  
      console.log(`Moving to step ${currentStep + 1}`);
    } else {
      handleBookingSubmit();
    }
  };

  const handlePreviousStep = (event: React.MouseEvent) => {
    createStoneRipple(event);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // todo: remove mock functionality
      console.log(`Moving to step ${currentStep - 1}`);
    }
  };

  const handleBookingSubmit = () => {
    // todo: remove mock functionality
    console.log("Booking submitted:", bookingData);
    setIsExpanded(false);
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FloatingLabelInput
                id="check-in"
                label="Check In"
                type="date"
                value={bookingData.checkIn}
                onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                data-testid="input-check-in"
                className="transition-all duration-300"
              />
              <FloatingLabelInput
                id="check-out"
                label="Check Out"
                type="date"
                value={bookingData.checkOut}
                onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                data-testid="input-check-out"
                className="transition-all duration-300"
              />
            </div>
            <FloatingLabelInput
              id="guests"
              label="Number of Guests"
              as="select"
              value={bookingData.guests}
              onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
              data-testid="select-guests"
              className="transition-all duration-300"
            >
              {[1,2,3,4,5,6].map(num => (
                <option key={num} value={num} className="bg-background text-foreground">
                  {num} Guest{num > 1 ? 's' : ''}
                </option>
              ))}
            </FloatingLabelInput>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-foreground font-serif text-base font-semibold text-stone-warm">
              Select Your Property
            </h3>
            <div className="space-y-3">
              {['Heritage Suite', 'Coffee Cottage', 'Family Villa'].map((property, index) => (
                <label 
                  key={property} 
                  className={`
                    group flex items-center space-x-4 p-4 rounded-lg cursor-pointer
                    bg-gradient-to-br from-foreground/5 to-foreground/2
                    border border-foreground/15 backdrop-blur-sm
                    hover:bg-foreground/10 hover:border-stone-warm/30
                    transition-all duration-300 hover-elevate
                    ${bookingData.property === property ? 'bg-stone-warm/10 border-stone-warm/40' : ''}
                  `}
                >
                  <div className="relative">
                    <input
                      type="radio"
                      name="property"
                      value={property}
                      checked={bookingData.property === property}
                      onChange={(e) => setBookingData({...bookingData, property: e.target.value})}
                      className="sr-only"
                      data-testid={`radio-${property.toLowerCase().replace(' ', '-')}`}
                    />
                    <div className={`
                      w-5 h-5 rounded-full border-2 transition-all duration-300
                      ${bookingData.property === property 
                        ? 'border-stone-warm bg-stone-warm' 
                        : 'border-foreground/40 group-hover:border-stone-warm/60'
                      }
                    `}>
                      {bookingData.property === property && (
                        <div className="w-2 h-2 bg-foreground rounded-full m-auto mt-0.5" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className={`
                      font-serif font-medium transition-colors duration-300
                      ${bookingData.property === property ? 'text-stone-warm' : 'text-foreground group-hover:text-stone-warm'}
                    `}>
                      {property}
                    </span>
                    <p className="text-sm text-foreground/60 mt-1">
                      {property === 'Heritage Suite' && 'Elegant main house with antique furnishings'}
                      {property === 'Coffee Cottage' && 'Cozy cottage overlooking the coffee plantation'}
                      {property === 'Family Villa' && 'Spacious villa perfect for groups and families'}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-foreground font-serif text-lg font-semibold">Booking Summary</h3>
            <div className="space-y-2 text-sm text-foreground/80">
              <p><strong>Property:</strong> {bookingData.property}</p>
              <p><strong>Check-in:</strong> {bookingData.checkIn}</p>
              <p><strong>Check-out:</strong> {bookingData.checkOut}</p>
              <p><strong>Guests:</strong> {bookingData.guests}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isExpanded) {
    return (
      <div 
        ref={widgetRef}
        className="fixed bottom-8 right-8 z-50"
        data-testid="floating-booking-widget"
      >
        <Button
          onClick={handleExpand}
          size="lg"
          className={`font-serif bg-casa-blue-deep text-foreground hover:bg-casa-blue-medium shadow-lg hover-elevate rounded-full px-6 py-3 ${rippleContainerClass}`}
          data-testid="button-expand-booking"
        >
          <Calendar className="mr-2 h-5 w-5" />
          Book Your Stay
        </Button>
      </div>
    );
  }

  return (
    <div 
      ref={widgetRef}
      className="fixed bottom-8 right-8 z-50 w-80"
      data-testid="expanded-booking-widget"
    >
      <GlassCard variant="modal" className="p-6">
        <div ref={contentRef}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-foreground" />
              <h2 className="text-foreground font-serif text-lg font-semibold">
                Reserve Casa Flora
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleExpand}
              className={`text-foreground hover:bg-foreground/10 ${rippleContainerClass}`}
              data-testid="button-close-booking"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Step indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    step <= currentStep ? 'bg-casa-blue-deep' : 'bg-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {renderStepContent()}

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                className={`bg-foreground/10 border-foreground/30 text-foreground hover:bg-foreground/20 ${rippleContainerClass}`}
                data-testid="button-previous-step"
              >
                Previous
              </Button>
            )}
            <Button
              onClick={handleNextStep}
              className={`bg-casa-blue-deep text-foreground hover:bg-casa-blue-medium ${rippleContainerClass} ${
                currentStep === 1 ? 'ml-auto' : ''
              }`}
              data-testid="button-next-step"
            >
              {currentStep === 3 ? 'Book Now' : 'Next'}
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}