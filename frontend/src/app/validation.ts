import { z } from 'zod';
import {
  workoutSchema,
  insertWorkoutSchema,
  updateWorkoutSchema,
  userProfileSchema,
  insertUserProfileSchema,
  updateUserProfileSchema,
  subscriptionSchema,
  insertSubscriptionSchema,
  updateSubscriptionSchema,
  paymentSchema,
  insertPaymentSchema,
  updatePaymentSchema,
} from './schema';

// Custom validation schemas for API responses
export const workoutWithVO2MaxSchema = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  activityType: z.string().optional(),
  duration: z.union([z.string(), z.number()]).optional(),
  distance: z.union([z.string(), z.number()]).nullable().optional(),
  heartRateAvg: z.string().nullable().optional(),
  heartRateMax: z.string().nullable().optional(),
  intensity: z.enum(['low', 'moderate', 'high']).nullable().optional(),
  date: z.date().nullable().optional(),
  vo2max_estimate: z.number().optional(),
  benefits: z.string().optional(),
  error: z.string().optional(),
  method: z.enum(['demo_calculator', 'actual_workout']).optional(),
  note: z.string().optional(),
});

export const userDashboardSchema = z.object({
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
  }),
  profile: userProfileSchema.nullable(),
  subscription: subscriptionSchema,
  recentWorkouts: z.array(workoutWithVO2MaxSchema),
  stats: z.object({
    totalWorkouts: z.number(),
    totalDistance: z.number(),
    avgVO2Max: z.number(),
    streakDays: z.number(),
  }),
});

// Form validation schemas
export const loginFormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const registerFormSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const workoutFormSchema = z.object({
  activity_type: z.enum(['run', 'cycle', 'walk']),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  distance: z.number().min(0.1, 'Distance must be at least 0.1 km'),
  heart_rate_avg: z.number().min(40).max(220).optional(),
  heart_rate_max: z.number().min(60).max(220).optional(),
  intensity: z.enum(['low', 'moderate', 'high']),
});

export const profileFormSchema = z.object({
  age: z.number().min(13, 'Must be at least 13 years old').max(120, 'Invalid age'),
  gender: z.enum(['male', 'female', 'other']),
  weight: z.number().min(30, 'Weight must be at least 30kg').max(300, 'Invalid weight'),
  height: z.number().min(100, 'Height must be at least 100cm').max(250, 'Invalid height'),
});

export const demoWorkoutFormSchema = z.object({
  activity_type: z.enum(['run', 'cycle', 'walk']),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  distance: z.number().min(0.1, 'Distance must be at least 0.1 km'),
});

// Validation helper functions
export function validateLoginForm(data: unknown) {
  return loginFormSchema.safeParse(data);
}

export function validateRegisterForm(data: unknown) {
  return registerFormSchema.safeParse(data);
}

export function validateWorkoutForm(data: unknown) {
  return workoutFormSchema.safeParse(data);
}

export function validateProfileForm(data: unknown) {
  return profileFormSchema.safeParse(data);
}

export function validateDemoWorkoutForm(data: unknown) {
  return demoWorkoutFormSchema.safeParse(data);
}

export function validateWorkoutResponse(data: unknown) {
  return workoutWithVO2MaxSchema.safeParse(data);
}

export function validateUserDashboard(data: unknown) {
  return userDashboardSchema.safeParse(data);
}

// Type exports for validated data
export type ValidatedLoginForm = z.infer<typeof loginFormSchema>;
export type ValidatedRegisterForm = z.infer<typeof registerFormSchema>;
export type ValidatedWorkoutForm = z.infer<typeof workoutFormSchema>;
export type ValidatedProfileForm = z.infer<typeof profileFormSchema>;
export type ValidatedDemoWorkoutForm = z.infer<typeof demoWorkoutFormSchema>;
export type ValidatedWorkoutResponse = z.infer<typeof workoutWithVO2MaxSchema>;
export type ValidatedUserDashboard = z.infer<typeof userDashboardSchema>;
