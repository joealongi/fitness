import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
  boolean,
  decimal,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Enums
export const genderEnum = pgEnum('gender', ['male', 'female', 'other']);
export const intensityEnum = pgEnum('intensity', ['low', 'moderate', 'high']);
export const subscriptionPlanEnum = pgEnum('subscription_plan', ['free', 'premium', 'pro']);
export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'active',
  'canceled',
  'past_due',
  'incomplete',
  'trialing',
]);
export const paymentStatusEnum = pgEnum('payment_status', [
  'pending',
  'succeeded',
  'failed',
  'canceled',
]);

// User Profile table
export const userProfiles = pgTable('user_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  age: integer('age'), // Encrypted in backend
  gender: genderEnum('gender'),
  weight: text('weight'), // Encrypted in backend, stored as text
  height: text('height'), // Encrypted in backend, stored as text
});

// Workout table
export const workouts = pgTable('workouts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  activityType: varchar('activity_type', { length: 50 }).notNull(),
  duration: decimal('duration', { precision: 10, scale: 2 }).notNull(), // minutes
  distance: decimal('distance', { precision: 10, scale: 2 }), // km
  heartRateAvg: text('heart_rate_avg'), // Encrypted in backend, stored as text
  heartRateMax: text('heart_rate_max'), // Encrypted in backend, stored as text
  intensity: intensityEnum('intensity').default('moderate'),
  date: timestamp('date').defaultNow(),
});

// Subscription table
export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  plan: subscriptionPlanEnum('plan').default('free'),
  status: subscriptionStatusEnum('status').default('active'),
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Payment table
export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 255 }).notNull().unique(),
  stripeChargeId: varchar('stripe_charge_id', { length: 255 }),
  amount: integer('amount').notNull(), // Amount in cents
  currency: varchar('currency', { length: 3 }).default('usd'),
  status: paymentStatusEnum('status').default('pending'),
  description: text('description'),
  receiptUrl: varchar('receipt_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Zod schemas for type-safe validation
export const userProfileSchema = createSelectSchema(userProfiles);
export const insertUserProfileSchema = createInsertSchema(userProfiles);
export const updateUserProfileSchema = insertUserProfileSchema.partial();

export const workoutSchema = createSelectSchema(workouts);
export const insertWorkoutSchema = createInsertSchema(workouts);
export const updateWorkoutSchema = insertWorkoutSchema.partial();

export const subscriptionSchema = createSelectSchema(subscriptions);
export const insertSubscriptionSchema = createInsertSchema(subscriptions);
export const updateSubscriptionSchema = insertSubscriptionSchema.partial();

export const paymentSchema = createSelectSchema(payments);
export const insertPaymentSchema = createInsertSchema(payments);
export const updatePaymentSchema = insertPaymentSchema.partial();

// Type exports
export type UserProfile = z.infer<typeof userProfileSchema>;
export type NewUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;

export type Workout = z.infer<typeof workoutSchema>;
export type NewWorkout = z.infer<typeof insertWorkoutSchema>;
export type UpdateWorkout = z.infer<typeof updateWorkoutSchema>;

export type Subscription = z.infer<typeof subscriptionSchema>;
export type NewSubscription = z.infer<typeof insertSubscriptionSchema>;
export type UpdateSubscription = z.infer<typeof updateSubscriptionSchema>;

export type Payment = z.infer<typeof paymentSchema>;
export type NewPayment = z.infer<typeof insertPaymentSchema>;
export type UpdatePayment = z.infer<typeof updatePaymentSchema>;

// API Response types (what the frontend receives) - defined after table types
export type WorkoutWithVO2Max = {
  id?: number;
  userId?: number;
  activityType?: string;
  duration?: string | number;
  distance?: string | number | null;
  heartRateAvg?: string | null;
  heartRateMax?: string | null;
  intensity?: 'low' | 'moderate' | 'high' | null;
  date?: Date | null;
  vo2max_estimate?: number;
  benefits?: string;
  error?: string;
  method?: 'demo_calculator' | 'actual_workout';
  note?: string;
};

export type UserDashboard = {
  user: {
    id: number;
    username: string;
    email: string;
  };
  profile: UserProfile | null;
  subscription: Subscription;
  recentWorkouts: WorkoutWithVO2Max[];
  stats: {
    totalWorkouts: number;
    totalDistance: number;
    avgVO2Max: number;
    streakDays: number;
  };
};
