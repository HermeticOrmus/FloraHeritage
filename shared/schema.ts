import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import type { RoomName } from "./botanicalRooms";

// Guest information table
export const guests = pgTable("guests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  country: text("country"),
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Booking status enum
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// Bookings table
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  guestId: varchar("guest_id").references(() => guests.id).notNull(),
  checkInDate: timestamp("check_in_date").notNull(),
  checkOutDate: timestamp("check_out_date").notNull(),
  numberOfGuests: integer("number_of_guests").notNull(),
  numberOfNights: integer("number_of_nights").notNull(),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  taxes: decimal("taxes", { precision: 10, scale: 2 }).default('0'),
  fees: decimal("fees", { precision: 10, scale: 2 }).default('0'),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default('pending').notNull().$type<BookingStatus>(),
  isPaid: boolean("is_paid").default(false),
  notes: text("notes"),
  amenities: json("amenities").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  confirmedAt: timestamp("confirmed_at"),
});

// Payment records table
export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookingId: varchar("booking_id").references(() => bookings.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default('USD').notNull(),
  paymentMethod: text("payment_method").notNull(),
  transactionId: text("transaction_id"),
  status: text("status").default('pending').notNull(),
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookingId: varchar("booking_id").references(() => bookings.id).notNull(),
  guestId: varchar("guest_id").references(() => guests.id).notNull(),
  rating: integer("rating").notNull(),
  title: text("title"),
  comment: text("comment"),
  isPublic: boolean("is_public").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Botanical rooms reference table (for informational purposes only - no booking per room)
// This table stores the 5 botanical room data for API access
export const botanicalRooms = pgTable("botanical_rooms", {
  id: varchar("id").primaryKey().$type<RoomName>(),
  displayName: text("display_name").notNull(),
  flowerNameEnglish: text("flower_name_english").notNull(),
  flowerNameSpanish: text("flower_name_spanish").notNull(),
  floor: text("floor").notNull().$type<'downstairs' | 'upstairs'>(),
  bathroomType: text("bathroom_type").notNull().$type<'ensuite' | 'shared'>(),
  bedConfiguration: text("bed_configuration").notNull(),
  capacity: integer("capacity").notNull(),
  heritageStory: text("heritage_story").notNull(),
  flowerStory: text("flower_story").notNull(),
  gardenLocation: text("garden_location").notNull(),
  bloomingSeason: text("blooming_season"),
  features: json("features").$type<string[]>().notNull(),
  viewDescription: text("view_description"),
  mainImage: text("main_image").notNull(),
  additionalImages: json("additional_images").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Insert schemas for validation
export const insertGuestSchema = createInsertSchema(guests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  confirmedAt: true,
  numberOfNights: true,  // Server-calculated
  basePrice: true,       // Server-calculated
  taxes: true,           // Server-calculated
  fees: true,            // Server-calculated
  totalPrice: true,      // Server-calculated
}).extend({
  checkInDate: z.string().pipe(z.coerce.date()),
  checkOutDate: z.string().pipe(z.coerce.date()),
  numberOfGuests: z.number().min(1, "At least 1 guest required").max(20, "Maximum 20 guests allowed"),
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
  processedAt: true,
}).extend({
  amount: z.string().regex(/^\d+(\.\d{2})?$/, "Invalid amount format"),
  paymentMethod: z.enum(["credit_card", "paypal", "bank_transfer", "cash"]),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
}).extend({
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  title: z.string().optional(),
  comment: z.string().optional(),
});

// Type exports
export type InsertGuest = z.infer<typeof insertGuestSchema>;
export type Guest = typeof guests.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

// Combined booking with guest info for display
export type BookingWithGuest = Booking & {
  guest: Guest;
  payment?: Payment;
};

// Booking form data type - client only sends essential data
export type BookingFormData = {
  guest: InsertGuest;
  booking: Omit<InsertBooking, 'guestId'>;
};

// Server-side booking creation type with calculated fields
export type ServerBookingData = {
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  numberOfNights: number;
  basePrice: string;
  taxes: string;
  fees: string;
  totalPrice: string;
  status: BookingStatus;
  isPaid: boolean;
  notes?: string | null;
  amenities?: string[] | null;
};
