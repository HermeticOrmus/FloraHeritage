import { 
  type Guest, 
  type InsertGuest,
  type Booking,
  type InsertBooking,
  type BookingWithGuest,
  type Payment,
  type InsertPayment,
  type Review,
  type InsertReview,
  type BookingFormData,
  type BookingStatus,
  type ServerBookingData,
  guests,
  bookings,
  payments,
  reviews
} from "@shared/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, and, gte, lte, desc } from "drizzle-orm";

// Database connection
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client);

export interface IStorage {
  // Guest management
  createGuest(guest: InsertGuest): Promise<Guest>;
  getGuest(id: string): Promise<Guest | undefined>;
  getGuestByEmail(email: string): Promise<Guest | undefined>;
  updateGuest(id: string, guest: Partial<InsertGuest>): Promise<Guest | undefined>;
  
  // Booking management
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBooking(id: string): Promise<BookingWithGuest | undefined>;
  getBookingsByGuest(guestId: string): Promise<BookingWithGuest[]>;
  getBookingsByDateRange(startDate: Date, endDate: Date): Promise<BookingWithGuest[]>;
  getAllBookings(limit?: number, offset?: number): Promise<BookingWithGuest[]>;
  updateBookingStatus(id: string, status: BookingStatus): Promise<Booking | undefined>;
  updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking | undefined>;
  cancelBooking(id: string): Promise<Booking | undefined>;
  
  // Complete booking flow
  createCompleteBooking(formData: BookingFormData): Promise<{ guest: Guest; booking: Booking }>;
  createCompleteBookingWithPricing(guestData: InsertGuest, bookingData: ServerBookingData): Promise<{ guest: Guest; booking: Booking }>;
  
  // Payment management
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPaymentsByBooking(bookingId: string): Promise<Payment[]>;
  updatePaymentStatus(id: string, status: string, transactionId?: string): Promise<Payment | undefined>;
  
  // Review management
  createReview(review: InsertReview): Promise<Review>;
  getReviewsByBooking(bookingId: string): Promise<Review[]>;
  getPublicReviews(limit?: number): Promise<Review[]>;
  
  // Analytics and availability
  getBookingStats(): Promise<{
    totalBookings: number;
    confirmedBookings: number;
    pendingBookings: number;
    totalRevenue: string;
  }>;
  checkAvailability(checkIn: Date, checkOut: Date): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  
  // Guest management
  async createGuest(guest: InsertGuest): Promise<Guest> {
    const [newGuest] = await db.insert(guests).values({
      ...guest,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
    return newGuest;
  }
  
  async getGuest(id: string): Promise<Guest | undefined> {
    const [guest] = await db.select().from(guests).where(eq(guests.id, id));
    return guest;
  }
  
  async getGuestByEmail(email: string): Promise<Guest | undefined> {
    const [guest] = await db.select().from(guests).where(eq(guests.email, email));
    return guest;
  }
  
  async updateGuest(id: string, guest: Partial<InsertGuest>): Promise<Guest | undefined> {
    const [updatedGuest] = await db.update(guests)
      .set({ ...guest, updatedAt: new Date() })
      .where(eq(guests.id, id))
      .returning();
    return updatedGuest;
  }
  
  // Booking management (legacy - not used, kept for interface compatibility)
  async createBooking(booking: InsertBooking): Promise<Booking> {
    // This method requires all pricing fields to be pre-calculated
    // Use createCompleteBookingWithPricing instead for server-side pricing
    const [newBooking] = await db.insert(bookings).values(booking as any).returning();
    return newBooking;
  }
  
  async getBooking(id: string): Promise<BookingWithGuest | undefined> {
    const [result] = await db
      .select()
      .from(bookings)
      .leftJoin(guests, eq(bookings.guestId, guests.id))
      .leftJoin(payments, eq(bookings.id, payments.bookingId))
      .where(eq(bookings.id, id));
      
    if (!result || !result.guests) return undefined;
    
    return {
      ...result.bookings,
      guest: result.guests,
      payment: result.payments || undefined,
    };
  }
  
  async getBookingsByGuest(guestId: string): Promise<BookingWithGuest[]> {
    const results = await db
      .select()
      .from(bookings)
      .leftJoin(guests, eq(bookings.guestId, guests.id))
      .leftJoin(payments, eq(bookings.id, payments.bookingId))
      .where(eq(bookings.guestId, guestId))
      .orderBy(desc(bookings.createdAt));
      
    return results
      .filter(result => result.guests)
      .map(result => ({
        ...result.bookings,
        guest: result.guests!,
        payment: result.payments || undefined,
      }));
  }
  
  async getBookingsByDateRange(startDate: Date, endDate: Date): Promise<BookingWithGuest[]> {
    const results = await db
      .select()
      .from(bookings)
      .leftJoin(guests, eq(bookings.guestId, guests.id))
      .leftJoin(payments, eq(bookings.id, payments.bookingId))
      .where(
        and(
          gte(bookings.checkInDate, startDate),
          lte(bookings.checkOutDate, endDate)
        )
      )
      .orderBy(desc(bookings.checkInDate));
      
    return results
      .filter(result => result.guests)
      .map(result => ({
        ...result.bookings,
        guest: result.guests!,
        payment: result.payments || undefined,
      }));
  }
  
  async getAllBookings(limit = 50, offset = 0): Promise<BookingWithGuest[]> {
    const results = await db
      .select()
      .from(bookings)
      .leftJoin(guests, eq(bookings.guestId, guests.id))
      .leftJoin(payments, eq(bookings.id, payments.bookingId))
      .orderBy(desc(bookings.createdAt))
      .limit(limit)
      .offset(offset);
      
    return results
      .filter(result => result.guests)
      .map(result => ({
        ...result.bookings,
        guest: result.guests!,
        payment: result.payments || undefined,
      }));
  }
  
  async updateBookingStatus(id: string, status: BookingStatus): Promise<Booking | undefined> {
    const updateData: any = { status, updatedAt: new Date() };
    if (status === 'confirmed') {
      updateData.confirmedAt = new Date();
    }
    
    const [updatedBooking] = await db.update(bookings)
      .set(updateData)
      .where(eq(bookings.id, id))
      .returning();
    return updatedBooking;
  }
  
  async updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking | undefined> {
    const updateData: any = { ...booking };
    const [updatedBooking] = await db.update(bookings)
      .set(updateData)
      .where(eq(bookings.id, id))
      .returning();
    return updatedBooking;
  }
  
  async cancelBooking(id: string): Promise<Booking | undefined> {
    return this.updateBookingStatus(id, 'cancelled');
  }
  
  // Complete booking flow
  async createCompleteBooking(formData: BookingFormData): Promise<{ guest: Guest; booking: Booking }> {
    // Check if guest already exists by email
    let guest = await this.getGuestByEmail(formData.guest.email);
    
    // Create new guest if doesn't exist
    if (!guest) {
      guest = await this.createGuest(formData.guest);
    } else {
      // Update existing guest info
      guest = await this.updateGuest(guest.id, formData.guest) || guest;
    }
    
    // Create booking
    const booking = await this.createBooking({
      ...formData.booking,
      guestId: guest.id,
    });
    
    return { guest, booking };
  }
  
  // Complete booking flow with server-side pricing
  async createCompleteBookingWithPricing(guestData: InsertGuest, bookingData: ServerBookingData): Promise<{ guest: Guest; booking: Booking }> {
    // Check if guest already exists by email
    let guest = await this.getGuestByEmail(guestData.email);
    
    // Create new guest if doesn't exist
    if (!guest) {
      guest = await this.createGuest(guestData);
    } else {
      // Update existing guest info
      guest = await this.updateGuest(guest.id, guestData) || guest;
    }
    
    // Create booking with server-calculated pricing
    const [newBooking] = await db.insert(bookings).values({
      guestId: guest.id,
      checkInDate: bookingData.checkInDate,
      checkOutDate: bookingData.checkOutDate,
      numberOfGuests: bookingData.numberOfGuests,
      numberOfNights: bookingData.numberOfNights,
      basePrice: bookingData.basePrice,
      taxes: bookingData.taxes,
      fees: bookingData.fees,
      totalPrice: bookingData.totalPrice,
      status: bookingData.status,
      isPaid: bookingData.isPaid,
      notes: bookingData.notes,
      amenities: bookingData.amenities,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
    
    return { guest, booking: newBooking };
  }
  
  // Payment management
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [newPayment] = await db.insert(payments).values({
      ...payment,
      createdAt: new Date(),
    }).returning();
    return newPayment;
  }
  
  async getPaymentsByBooking(bookingId: string): Promise<Payment[]> {
    return await db.select().from(payments)
      .where(eq(payments.bookingId, bookingId))
      .orderBy(desc(payments.createdAt));
  }
  
  async updatePaymentStatus(id: string, status: string, transactionId?: string): Promise<Payment | undefined> {
    const updateData: any = { status };
    if (transactionId) updateData.transactionId = transactionId;
    if (status === 'completed') updateData.processedAt = new Date();
    
    const [updatedPayment] = await db.update(payments)
      .set(updateData)
      .where(eq(payments.id, id))
      .returning();
    return updatedPayment;
  }
  
  // Review management
  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(reviews).values({
      ...review,
      createdAt: new Date(),
    }).returning();
    return newReview;
  }
  
  async getReviewsByBooking(bookingId: string): Promise<Review[]> {
    return await db.select().from(reviews)
      .where(eq(reviews.bookingId, bookingId))
      .orderBy(desc(reviews.createdAt));
  }
  
  async getPublicReviews(limit = 10): Promise<Review[]> {
    return await db.select().from(reviews)
      .where(eq(reviews.isPublic, true))
      .orderBy(desc(reviews.createdAt))
      .limit(limit);
  }
  
  // Analytics and availability
  async getBookingStats(): Promise<{
    totalBookings: number;
    confirmedBookings: number;
    pendingBookings: number;
    totalRevenue: string;
  }> {
    const allBookings = await db.select().from(bookings);
    
    const totalBookings = allBookings.length;
    const confirmedBookings = allBookings.filter(b => b.status === 'confirmed').length;
    const pendingBookings = allBookings.filter(b => b.status === 'pending').length;
    const totalRevenue = allBookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + parseFloat(b.totalPrice), 0)
      .toFixed(2);
    
    return {
      totalBookings,
      confirmedBookings,
      pendingBookings,
      totalRevenue,
    };
  }
  
  async checkAvailability(checkIn: Date, checkOut: Date): Promise<boolean> {
    const conflictingBookings = await db.select().from(bookings)
      .where(
        and(
          eq(bookings.status, 'confirmed'),
          and(
            lte(bookings.checkInDate, checkOut),
            gte(bookings.checkOutDate, checkIn)
          )
        )
      );
    
    return conflictingBookings.length === 0;
  }
}

export const storage = new DatabaseStorage();