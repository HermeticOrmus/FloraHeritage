import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertGuestSchema,
  insertBookingSchema,
  insertPaymentSchema,
  insertReviewSchema,
  type BookingFormData,
  type BookingStatus,
  type ServerBookingData
} from "@shared/schema";
import { z } from "zod";

// Server-side pricing calculation
function calculateBookingPricing(checkInDate: Date, checkOutDate: Date): {
  numberOfNights: number;
  basePrice: string;
  taxes: string;
  fees: string;
  totalPrice: string;
} {
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (nights <= 0) {
    throw new Error("Invalid date range: check-out must be after check-in");
  }
  
  const basePrice = nights * 250; // $250 per night base rate
  const taxes = basePrice * 0.12; // 12% taxes
  const fees = 50; // Flat cleaning fee
  const total = basePrice + taxes + fees;
  
  return {
    numberOfNights: nights,
    basePrice: basePrice.toFixed(2),
    taxes: taxes.toFixed(2),
    fees: fees.toFixed(2),
    totalPrice: total.toFixed(2)
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Booking endpoints
  
  // Create a complete booking (guest + booking)
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingFormSchema = z.object({
        guest: insertGuestSchema,
        booking: insertBookingSchema.omit({ guestId: true })
      });
      
      const formData = bookingFormSchema.parse(req.body) as BookingFormData;
      
      // Validate date range
      if (formData.booking.checkInDate >= formData.booking.checkOutDate) {
        return res.status(400).json({ 
          error: "Check-out date must be after check-in date" 
        });
      }
      
      if (formData.booking.checkInDate < new Date()) {
        return res.status(400).json({ 
          error: "Check-in date cannot be in the past" 
        });
      }
      
      // Check availability first
      const isAvailable = await storage.checkAvailability(
        formData.booking.checkInDate,
        formData.booking.checkOutDate
      );
      
      if (!isAvailable) {
        return res.status(400).json({ 
          error: "Selected dates are not available" 
        });
      }
      
      // Calculate pricing server-side
      const pricing = calculateBookingPricing(
        formData.booking.checkInDate,
        formData.booking.checkOutDate
      );
      
      // Create complete booking data with server-calculated pricing
      const completeBookingData: ServerBookingData = {
        checkInDate: formData.booking.checkInDate,
        checkOutDate: formData.booking.checkOutDate,
        numberOfGuests: formData.booking.numberOfGuests,
        numberOfNights: pricing.numberOfNights,
        basePrice: pricing.basePrice,
        taxes: pricing.taxes,
        fees: pricing.fees,
        totalPrice: pricing.totalPrice,
        status: 'pending',
        isPaid: false,
        notes: formData.booking.notes,
        amenities: formData.booking.amenities,
      };
      
      const result = await storage.createCompleteBookingWithPricing(formData.guest, completeBookingData);
      
      res.status(201).json({
        success: true,
        data: result,
        message: "Booking created successfully"
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation error", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to create booking" });
    }
  });
  
  // Get all bookings (for admin)
  app.get("/api/bookings", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const bookings = await storage.getAllBookings(limit, offset);
      
      res.json({
        success: true,
        data: bookings,
        pagination: { limit, offset }
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });
  
  // Get booking by ID
  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      res.json({
        success: true,
        data: booking
      });
    } catch (error) {
      console.error("Error fetching booking:", error);
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });
  
  // Update booking status
  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const statusSchema = z.object({
        status: z.enum(['pending', 'confirmed', 'cancelled', 'completed'])
      });
      
      const { status } = statusSchema.parse(req.body);
      
      const booking = await storage.updateBookingStatus(req.params.id, status as BookingStatus);
      
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      res.json({
        success: true,
        data: booking,
        message: `Booking ${status} successfully`
      });
    } catch (error) {
      console.error("Error updating booking status:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation error", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to update booking status" });
    }
  });
  
  // Cancel booking
  app.delete("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.cancelBooking(req.params.id);
      
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      res.json({
        success: true,
        data: booking,
        message: "Booking cancelled successfully"
      });
    } catch (error) {
      console.error("Error cancelling booking:", error);
      res.status(500).json({ error: "Failed to cancel booking" });
    }
  });
  
  // Check availability
  app.post("/api/bookings/check-availability", async (req, res) => {
    try {
      const availabilitySchema = z.object({
        checkInDate: z.string().pipe(z.coerce.date()),
        checkOutDate: z.string().pipe(z.coerce.date())
      });
      
      const { checkInDate, checkOutDate } = availabilitySchema.parse(req.body);
      
      // Validate dates
      if (checkInDate >= checkOutDate) {
        return res.status(400).json({ 
          error: "Check-out date must be after check-in date" 
        });
      }
      
      if (checkInDate < new Date()) {
        return res.status(400).json({ 
          error: "Check-in date cannot be in the past" 
        });
      }
      
      const isAvailable = await storage.checkAvailability(checkInDate, checkOutDate);
      
      res.json({
        success: true,
        data: { 
          available: isAvailable,
          checkInDate: checkInDate.toISOString(),
          checkOutDate: checkOutDate.toISOString()
        }
      });
    } catch (error) {
      console.error("Error checking availability:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation error", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to check availability" });
    }
  });
  
  // Get pricing estimate
  app.post("/api/bookings/pricing-estimate", async (req, res) => {
    try {
      const pricingSchema = z.object({
        checkInDate: z.string().pipe(z.coerce.date()),
        checkOutDate: z.string().pipe(z.coerce.date())
      });
      
      const { checkInDate, checkOutDate } = pricingSchema.parse(req.body);
      
      // Validate dates
      if (checkInDate >= checkOutDate) {
        return res.status(400).json({ 
          error: "Check-out date must be after check-in date" 
        });
      }
      
      if (checkInDate < new Date()) {
        return res.status(400).json({ 
          error: "Check-in date cannot be in the past" 
        });
      }
      
      const pricing = calculateBookingPricing(checkInDate, checkOutDate);
      
      res.json({
        success: true,
        data: {
          checkInDate: checkInDate.toISOString(),
          checkOutDate: checkOutDate.toISOString(),
          ...pricing
        }
      });
    } catch (error) {
      console.error("Error calculating pricing:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation error", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to calculate pricing" });
    }
  });
  
  // Guest endpoints
  
  // Get guest by email
  app.get("/api/guests/by-email/:email", async (req, res) => {
    try {
      const guest = await storage.getGuestByEmail(req.params.email);
      
      if (!guest) {
        return res.status(404).json({ error: "Guest not found" });
      }
      
      res.json({
        success: true,
        data: guest
      });
    } catch (error) {
      console.error("Error fetching guest:", error);
      res.status(500).json({ error: "Failed to fetch guest" });
    }
  });
  
  // Get guest bookings
  app.get("/api/guests/:id/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookingsByGuest(req.params.id);
      
      res.json({
        success: true,
        data: bookings
      });
    } catch (error) {
      console.error("Error fetching guest bookings:", error);
      res.status(500).json({ error: "Failed to fetch guest bookings" });
    }
  });
  
  // Payment endpoints
  
  // Create payment
  app.post("/api/payments", async (req, res) => {
    try {
      const paymentData = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(paymentData);
      
      res.status(201).json({
        success: true,
        data: payment,
        message: "Payment created successfully"
      });
    } catch (error) {
      console.error("Error creating payment:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation error", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to create payment" });
    }
  });
  
  // Update payment status
  app.patch("/api/payments/:id/status", async (req, res) => {
    try {
      const statusSchema = z.object({
        status: z.string(),
        transactionId: z.string().optional()
      });
      
      const { status, transactionId } = statusSchema.parse(req.body);
      
      const payment = await storage.updatePaymentStatus(req.params.id, status, transactionId);
      
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      
      // If payment is completed, update booking as paid
      if (status === 'completed' && payment.bookingId) {
        await storage.updateBooking(payment.bookingId, { isPaid: true });
      }
      
      res.json({
        success: true,
        data: payment,
        message: "Payment status updated successfully"
      });
    } catch (error) {
      console.error("Error updating payment status:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation error", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to update payment status" });
    }
  });
  
  // Review endpoints
  
  // Create review
  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      
      res.status(201).json({
        success: true,
        data: review,
        message: "Review created successfully"
      });
    } catch (error) {
      console.error("Error creating review:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation error", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to create review" });
    }
  });
  
  // Get public reviews
  app.get("/api/reviews/public", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const reviews = await storage.getPublicReviews(limit);
      
      res.json({
        success: true,
        data: reviews
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });
  
  // Analytics endpoints
  
  // Get booking statistics
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getBookingStats();
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });
  
  // Get bookings by date range
  app.get("/api/admin/bookings/date-range", async (req, res) => {
    try {
      const dateRangeSchema = z.object({
        startDate: z.string().pipe(z.coerce.date()),
        endDate: z.string().pipe(z.coerce.date())
      });
      
      const { startDate, endDate } = dateRangeSchema.parse(req.query);
      
      const bookings = await storage.getBookingsByDateRange(startDate, endDate);
      
      res.json({
        success: true,
        data: bookings
      });
    } catch (error) {
      console.error("Error fetching bookings by date range:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation error", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}