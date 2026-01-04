// Re-export all Drizzle-generated types for easy importing
export type {
  UserProfile,
  NewUserProfile,
  UpdateUserProfile,
  Workout,
  NewWorkout,
  UpdateWorkout,
  Subscription,
  NewSubscription,
  UpdateSubscription,
  Payment,
  NewPayment,
  UpdatePayment,
  WorkoutWithVO2Max,
  UserDashboard,
} from './schema';

// Re-export schemas for validation
export {
  userProfileSchema,
  insertUserProfileSchema,
  updateUserProfileSchema,
  workoutSchema,
  insertWorkoutSchema,
  updateWorkoutSchema,
  subscriptionSchema,
  insertSubscriptionSchema,
  updateSubscriptionSchema,
  paymentSchema,
  insertPaymentSchema,
  updatePaymentSchema,
} from './schema';

// API Request/Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Form data types (for Angular reactive forms)
export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export interface WorkoutForm {
  activity_type: 'run' | 'cycle' | 'walk';
  duration: number;
  distance: number;
  heart_rate_avg?: number;
  heart_rate_max?: number;
  intensity: 'low' | 'moderate' | 'high';
}

export interface ProfileForm {
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number; // kg
  height: number; // cm
}

export interface DemoWorkoutForm {
  activity_type: 'run' | 'cycle' | 'walk';
  duration: number;
  distance: number;
}

// Component state types
export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: number;
    username: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
}

export interface WorkoutState {
  workouts: Workout[];
  currentWorkout: Workout | null;
  loading: boolean;
  error: string | null;
  workoutResult: WorkoutWithVO2Max | null;
}

export interface DashboardState {
  data: UserDashboard | null;
  loading: boolean;
  error: string | null;
}

// Chart data types (for ngx-charts)
export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

export interface ChartSeries {
  name: string;
  series: ChartDataPoint[];
}

// VO2 Max calculation types
export interface VO2MaxCalculation {
  method: 'demo_calculator' | 'actual_workout';
  vo2max_estimate: number;
  benefits: string;
  error?: string;
}

// Health metrics types
export interface HealthMetrics {
  bmi: number;
  bodyFatPercentage: number;
  restingHeartRate: number;
  maxHeartRate: number;
  targetHeartRateZones: {
    fatBurn: { min: number; max: number };
    cardio: { min: number; max: number };
    peak: { min: number; max: number };
  };
}
