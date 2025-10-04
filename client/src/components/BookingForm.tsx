import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, Loader2, CheckCircle } from "lucide-react";
import { insertGuestSchema, type BookingFormData } from "@shared/schema";

interface PricingData {
  numberOfNights: number;
  basePrice: string;
  taxes: string;
  fees: string;
  totalPrice: string;
}
import { z } from "zod";
import GlassCard from "@/components/GlassCard";

interface BookingStep1Data {
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
}

interface BookingStep2Data {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests: string;
}

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<BookingStep1Data>({
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 2,
  });
  const [step2Data, setStep2Data] = useState<BookingStep2Data>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    specialRequests: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const { toast } = useToast();

  // Check availability and get pricing mutation
  const checkAvailabilityMutation = useMutation({
    mutationFn: async ({ checkInDate, checkOutDate }: { checkInDate: Date; checkOutDate: Date }) => {
      const availability = await apiRequest('/api/bookings/check-availability', {
        method: 'POST',
        body: { checkInDate: checkInDate.toISOString(), checkOutDate: checkOutDate.toISOString() }
      });
      
      if (availability.data.available) {
        const pricing = await apiRequest('/api/bookings/pricing-estimate', {
          method: 'POST',
          body: { checkInDate: checkInDate.toISOString(), checkOutDate: checkOutDate.toISOString() }
        });
        return { ...availability, pricing: pricing.data };
      }
      
      return availability;
    },
    onSuccess: (data) => {
      if (!data.data.available) {
        toast({
          title: "Dates Unavailable",
          description: "The selected dates are not available. Please choose different dates.",
          variant: "destructive"
        });
        setPricing(null);
      } else {
        toast({
          title: "Dates Available",
          description: "Great! These dates are available for booking.",
        });
        setPricing(data.pricing as PricingData);
        setCurrentStep(2);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to check availability. Please try again.",
        variant: "destructive"
      });
      setPricing(null);
    }
  });

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async (formData: BookingFormData) => {
      return apiRequest('/api/bookings', {
        method: 'POST',
        body: formData
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Booking Confirmed!",
        description: `Your booking has been created successfully. Booking ID: ${data.data.booking.id.slice(0, 8)}`,
      });
      setCurrentStep(3);
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive"
      });
    }
  });


  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!step1Data.checkInDate) newErrors.checkInDate = "Check-in date is required";
    if (!step1Data.checkOutDate) newErrors.checkOutDate = "Check-out date is required";
    if (step1Data.checkInDate && step1Data.checkOutDate) {
      const checkIn = new Date(step1Data.checkInDate);
      const checkOut = new Date(step1Data.checkOutDate);
      if (checkIn >= checkOut) {
        newErrors.checkOutDate = "Check-out must be after check-in";
      }
      if (checkIn < new Date()) {
        newErrors.checkInDate = "Check-in cannot be in the past";
      }
    }
    if (step1Data.numberOfGuests < 1 || step1Data.numberOfGuests > 10) {
      newErrors.numberOfGuests = "Guests must be between 1 and 10";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!step2Data.firstName.trim()) newErrors.firstName = "First name is required";
    if (!step2Data.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!step2Data.email.trim()) newErrors.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(step2Data.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Next = async () => {
    if (!validateStep1()) return;
    
    const checkInDate = new Date(step1Data.checkInDate);
    const checkOutDate = new Date(step1Data.checkOutDate);
    await checkAvailabilityMutation.mutateAsync({ checkInDate, checkOutDate });
  };

  const handleBookingSubmit = async () => {
    if (!validateStep2()) return;
    
    try {
      const formData: BookingFormData = {
        guest: {
          firstName: step2Data.firstName,
          lastName: step2Data.lastName,
          email: step2Data.email,
          phone: step2Data.phone || undefined,
          country: step2Data.country || undefined,
          specialRequests: step2Data.specialRequests || undefined,
        },
        booking: {
          checkInDate: step1Data.checkInDate,  // Send as string
          checkOutDate: step1Data.checkOutDate,  // Send as string
          numberOfGuests: step1Data.numberOfGuests,
          status: 'pending',
          isPaid: false,
          notes: step2Data.specialRequests || undefined,
        }
      };
      
      createBookingMutation.mutate(formData);
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Please check your information and try again.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setStep1Data({ checkInDate: "", checkOutDate: "", numberOfGuests: 2 });
    setStep2Data({ firstName: "", lastName: "", email: "", phone: "", country: "", specialRequests: "" });
    setErrors({});
    setPricing(null);
  };

  if (currentStep === 3) {
    return (
      <GlassCard className="p-8 max-w-md mx-auto text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-serif font-semibold text-foreground mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-muted-foreground mb-6">
          Thank you for your booking. You will receive a confirmation email shortly.
        </p>
        <Button onClick={resetForm} className="w-full">
          Make Another Booking
        </Button>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">
          Book Your Stay at Casa Flora
        </h2>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span className={`flex items-center ${currentStep >= 1 ? 'text-foreground' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
              currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}>1</span>
            Dates & Guests
          </span>
          <span className={`flex items-center ${currentStep >= 2 ? 'text-foreground' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
              currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}>2</span>
            Guest Information
          </span>
        </div>
      </div>

      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingLabelInput
              id="checkInDate"
              label=""
              type="date"
              value={step1Data.checkInDate}
              onChange={(e) => setStep1Data({...step1Data, checkInDate: e.target.value})}
              data-testid="input-checkin"
              error={errors.checkInDate}
            />
            <FloatingLabelInput
              id="checkOutDate"
              label=""
              type="date"
              value={step1Data.checkOutDate}
              onChange={(e) => setStep1Data({...step1Data, checkOutDate: e.target.value})}
              data-testid="input-checkout"
              error={errors.checkOutDate}
            />
          </div>

          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Number of Guests
            </label>
            <Select 
              value={step1Data.numberOfGuests.toString()} 
              onValueChange={(value) => setStep1Data({...step1Data, numberOfGuests: parseInt(value)})}
            >
              <SelectTrigger data-testid="select-guests" className={errors.numberOfGuests ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({length: 10}, (_, i) => i + 1).map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Guest{num > 1 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.numberOfGuests && <p className="text-sm text-destructive mt-1">{errors.numberOfGuests}</p>}
          </div>

          {pricing && (
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Pricing Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>${pricing.basePrice} × {pricing.numberOfNights} nights</span>
                  <span>${pricing.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & fees</span>
                  <span>${(parseFloat(pricing.taxes) + parseFloat(pricing.fees)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-foreground pt-2 border-t">
                  <span>Total</span>
                  <span>${pricing.totalPrice}</span>
                </div>
              </div>
            </div>
          )}

          <Button 
            onClick={handleStep1Next} 
            className="w-full"
            disabled={checkAvailabilityMutation.isPending}
            data-testid="button-next-step"
          >
            {checkAvailabilityMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Checking Availability...
              </>
            ) : (
              'Check Availability & Continue'
            )}
          </Button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingLabelInput
              id="firstName"
              label="First Name *"
              value={step2Data.firstName}
              onChange={(e) => setStep2Data({...step2Data, firstName: e.target.value})}
              data-testid="input-firstname"
              error={errors.firstName}
            />
            <FloatingLabelInput
              id="lastName"
              label="Last Name *"
              value={step2Data.lastName}
              onChange={(e) => setStep2Data({...step2Data, lastName: e.target.value})}
              data-testid="input-lastname"
              error={errors.lastName}
            />
          </div>

          <FloatingLabelInput
            id="email"
            label="Email Address *"
            type="email"
            value={step2Data.email}
            onChange={(e) => setStep2Data({...step2Data, email: e.target.value})}
            data-testid="input-email"
            error={errors.email}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingLabelInput
              id="phone"
              label="Phone Number"
              type="tel"
              value={step2Data.phone}
              onChange={(e) => setStep2Data({...step2Data, phone: e.target.value})}
              data-testid="input-phone"
            />
            <FloatingLabelInput
              id="country"
              label="Country"
              value={step2Data.country}
              onChange={(e) => setStep2Data({...step2Data, country: e.target.value})}
              data-testid="input-country"
            />
          </div>

          <FloatingLabelInput
            id="specialRequests"
            label="Special Requests"
            as="textarea"
            rows={3}
            value={step2Data.specialRequests}
            onChange={(e) => setStep2Data({...step2Data, specialRequests: e.target.value})}
            data-testid="textarea-requests"
            placeholder="Any special requests or dietary requirements..."
          />

          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(1)}
              className="flex-1"
              data-testid="button-back"
            >
              Back
            </Button>
            <Button 
              onClick={handleBookingSubmit} 
              className="flex-1"
              disabled={createBookingMutation.isPending}
              data-testid="button-confirm-booking"
            >
              {createBookingMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Booking...
                </>
              ) : (
                'Confirm Booking'
              )}
            </Button>
          </div>
        </div>
      )}
    </GlassCard>
  );
}