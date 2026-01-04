import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from './api';
import { Subscription } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WorkoutWithVO2Max, WorkoutForm, DemoWorkoutForm, LoginForm, RegisterForm } from './types';

/* TODO: Add NG Icons when available */
/* Spartan UI - Using CSS-first approach for now */
/* Components will be updated to use Spartan UI directives when available */

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('Airwave');
  private api = inject(Api);
  private subscriptions: Subscription[] = [];

  // Authentication state
  isAuthenticated = false;
  currentUser: any = null;

  // Tab switching for auth forms
  activeAuthTab: 'login' | 'register' = 'login';

  // Expose observables for template
  isAuthenticated$ = this.api.isAuthenticated$;
  currentUser$ = this.api.currentUser$;

  // Login form
  loginData = { username: '', password: '' };
  loginLoading = false;
  loginError = '';

  // Register form
  registerData = { username: '', email: '', password: '' };
  registerLoading = false;
  registerError = '';

  healthData: any = null;
  norseData: any = null;
  workoutResult: WorkoutWithVO2Max | null = null;

  workout: WorkoutForm = {
    activity_type: 'run',
    duration: 30,
    distance: 5,
    heart_rate_avg: undefined,
    heart_rate_max: undefined,
    intensity: 'moderate',
  };

  // Demo calculator for unauthenticated users
  demoWorkout: DemoWorkoutForm = {
    activity_type: 'run',
    duration: 30,
    distance: 5,
  };

  // Chart data and configuration
  view: [number, number] = [700, 300];

  // Color scheme for charts - Red, Black, White, Grey theme
  colorScheme: any = {
    domain: ['#ef4444', '#6b7280', '#374151', '#1f2937', '#9ca3af', '#d1d5db'],
  };

  // VO2 Max trend over time (Line Chart)
  vo2MaxTrend: any[] = [
    { name: 'Jan', value: 35 },
    { name: 'Feb', value: 38 },
    { name: 'Mar', value: 42 },
    { name: 'Apr', value: 39 },
    { name: 'May', value: 45 },
    { name: 'Jun', value: 48 },
  ];

  // Activity type distribution (Pie Chart)
  activityDistribution: any[] = [
    { name: 'Running', value: 45 },
    { name: 'Cycling', value: 30 },
    { name: 'Walking', value: 15 },
    { name: 'Swimming', value: 10 },
  ];

  // Weekly workout volume (Bar Chart)
  weeklyVolume: any[] = [
    { name: 'Mon', value: 2.5 },
    { name: 'Tue', value: 3.1 },
    { name: 'Wed', value: 1.8 },
    { name: 'Thu', value: 4.2 },
    { name: 'Fri', value: 2.9 },
    { name: 'Sat', value: 6.1 },
    { name: 'Sun', value: 3.7 },
  ];

  // Heart rate zones (Area Chart)
  heartRateZones: any[] = [
    {
      name: 'Fat Burn',
      series: [
        { name: 'Week 1', value: 120 },
        { name: 'Week 2', value: 125 },
        { name: 'Week 3', value: 130 },
        { name: 'Week 4', value: 135 },
      ],
    },
    {
      name: 'Cardio',
      series: [
        { name: 'Week 1', value: 140 },
        { name: 'Week 2', value: 145 },
        { name: 'Week 3', value: 150 },
        { name: 'Week 4', value: 155 },
      ],
    },
    {
      name: 'Peak',
      series: [
        { name: 'Week 1', value: 160 },
        { name: 'Week 2', value: 165 },
        { name: 'Week 3', value: 170 },
        { name: 'Week 4', value: 175 },
      ],
    },
  ];

  // Workout history storage
  private workoutHistoryKey = 'airwave_workout_history';
  workoutHistory: any[] = [];

  ngOnInit() {
    // Subscribe to authentication state changes (only if observables exist)
    if (this.api.isAuthenticated$) {
      this.subscriptions.push(
        this.api.isAuthenticated$.subscribe((isAuth) => {
          this.isAuthenticated = isAuth;
          if (isAuth) {
            this.loadWorkoutHistory();
            this.updateChartsFromHistory();
          }
        })
      );
    }

    if (this.api.currentUser$) {
      this.subscriptions.push(
        this.api.currentUser$.subscribe((user) => {
          this.currentUser = user;
        })
      );
    }

    // Load workout history on app start
    this.loadWorkoutHistory();
    this.updateChartsFromHistory();

    // Only subscribe to health checks if methods exist (skip in tests)
    if (this.api.getHealth) {
      this.api.getHealth().subscribe({
        next: (data) => {
          this.healthData = data;
        },
        error: (error) => {
          console.warn('Backend health check failed:', error);
          this.healthData = null;
        },
      });
    }

    if (this.api.getNorseTest) {
      this.api.getNorseTest().subscribe({
        next: (data) => {
          this.norseData = data;
        },
        error: (error) => {
          console.warn('Norse SNN check failed:', error);
          this.norseData = null;
        },
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  login() {
    if (!this.loginData.username || !this.loginData.password) return;

    this.loginLoading = true;
    this.loginError = '';

    this.api.login(this.loginData.username, this.loginData.password).subscribe({
      next: () => {
        this.loginLoading = false;
        this.loginData = { username: '', password: '' };
      },
      error: (error) => {
        this.loginLoading = false;
        this.loginError = error.error?.error || 'Login failed';
      },
    });
  }

  register() {
    if (!this.registerData.username || !this.registerData.email || !this.registerData.password)
      return;

    this.registerLoading = true;
    this.registerError = '';

    this.api
      .register(this.registerData.username, this.registerData.email, this.registerData.password)
      .subscribe({
        next: () => {
          this.registerLoading = false;
          this.registerData = { username: '', email: '', password: '' };
        },
        error: (error) => {
          this.registerLoading = false;
          this.registerError = error.error?.error || 'Registration failed';
        },
      });
  }

  logout() {
    this.api.logout();
  }

  submitWorkout() {
    this.api.postWorkout(this.workout).subscribe({
      next: (result) => {
        this.workoutResult = result;

        // Save workout to history and update charts
        this.saveWorkoutToHistory(result);
        this.updateChartsFromHistory();
      },
      error: (error) => {
        console.error('Failed to submit workout:', error);
        // Could show user-friendly error message here
        this.workoutResult = { error: 'Unable to submit workout. Backend may be unreachable.' };
      },
    });
  }

  // Demo calculator for unauthenticated users
  calculateDemoVO2Max() {
    if (!this.demoWorkout.duration || !this.demoWorkout.distance) return;

    // Simple Cooper test calculation for demo
    // VO2 max = (distance_m - 504.9) / 44.73 for males
    const distanceM = this.demoWorkout.distance * 1000; // Convert km to meters
    const estimatedVO2Max = (distanceM - 504.9) / 44.73;

    // Get basic benefits
    const benefits =
      estimatedVO2Max > 40
        ? 'Excellent aerobic fitness! You have great cardiovascular health.'
        : estimatedVO2Max > 30
        ? 'Good aerobic fitness. Keep up the great work!'
        : 'Fair aerobic fitness. Consider increasing your training intensity.';

    this.workoutResult = {
      vo2max_estimate: Math.max(15, Math.min(80, estimatedVO2Max)), // Clamp between 15-80
      benefits: benefits,
      method: 'demo_calculator',
      note: 'This is a demo calculation. Sign up for personalized results!',
    };
  }

  // Scroll to authentication section
  scrollToAuth() {
    const authSection = document.querySelector('#auth-section');
    if (authSection) {
      authSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Scroll to demo section
  scrollToDemo() {
    const demoSection = document.querySelector('#experience-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Calculate weekly total for chart display
  getWeeklyTotal(): string {
    const total = this.weeklyVolume.reduce((sum: number, item: any) => sum + item.value, 0);
    return total.toFixed(1);
  }

  // Load workout history from localStorage
  private loadWorkoutHistory(): void {
    try {
      const stored = localStorage.getItem(this.workoutHistoryKey);
      if (stored) {
        this.workoutHistory = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load workout history:', error);
      this.workoutHistory = [];
    }
  }

  // Save workout to localStorage history
  private saveWorkoutToHistory(workout: any): void {
    try {
      // Add timestamp and VO2 calculation if not present
      const workoutWithMeta = {
        ...workout,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
        // Calculate VO2 max if not provided by backend
        vo2max: workout.vo2max_estimate || this.calculateVO2Max(workout),
      };

      this.workoutHistory.push(workoutWithMeta);
      localStorage.setItem(this.workoutHistoryKey, JSON.stringify(this.workoutHistory));
    } catch (error) {
      console.warn('Failed to save workout to history:', error);
    }
  }

  // Calculate VO2 max from workout data
  private calculateVO2Max(workout: any): number {
    if (!workout.distance || !workout.duration) return 0;

    // Cooper test formula: VO2 max = (distance_m - 504.9) / 44.73
    const distanceM = workout.distance * 1000; // Convert km to meters
    const vo2max = (distanceM - 504.9) / 44.73;

    return Math.max(15, Math.min(80, vo2max)); // Clamp between 15-80
  }

  // Update all charts based on workout history
  private updateChartsFromHistory(): void {
    if (this.workoutHistory.length === 0) {
      // Reset to default data if no history
      this.resetChartsToDefaults();
      return;
    }

    // Update VO2 Max trend (last 6 workouts or months)
    this.updateVO2MaxTrend();

    // Update activity distribution
    this.updateActivityDistribution();

    // Update weekly volume (group by day of week)
    this.updateWeeklyVolume();

    // Update heart rate zones (mock data for now, could be calculated from history)
    this.updateHeartRateZones();
  }

  private resetChartsToDefaults(): void {
    this.vo2MaxTrend = [
      { name: 'Workout 1', value: 0 },
      { name: 'Workout 2', value: 0 },
      { name: 'Workout 3', value: 0 },
      { name: 'Workout 4', value: 0 },
      { name: 'Workout 5', value: 0 },
      { name: 'Workout 6', value: 0 },
    ];
    this.activityDistribution = [{ name: 'No Workouts', value: 1 }];
    this.weeklyVolume = [
      { name: 'Mon', value: 0 },
      { name: 'Tue', value: 0 },
      { name: 'Wed', value: 0 },
      { name: 'Thu', value: 0 },
      { name: 'Fri', value: 0 },
      { name: 'Sat', value: 0 },
      { name: 'Sun', value: 0 },
    ];
  }

  private updateVO2MaxTrend(): void {
    // Show last 6 workouts or create monthly averages
    const recentWorkouts = this.workoutHistory.slice(-6);

    this.vo2MaxTrend = recentWorkouts.map((workout, index) => ({
      name: `Workout ${index + 1}`,
      value: workout.vo2max || 0,
    }));

    // If less than 6 workouts, pad with zeros
    while (this.vo2MaxTrend.length < 6) {
      this.vo2MaxTrend.unshift({
        name: `Workout ${this.vo2MaxTrend.length}`,
        value: 0,
      });
    }
  }

  private updateActivityDistribution(): void {
    const activityCounts: { [key: string]: number } = {};

    // Count activities
    this.workoutHistory.forEach((workout) => {
      const activity = workout.activity_type || 'unknown';
      activityCounts[activity] = (activityCounts[activity] || 0) + 1;
    });

    // Convert to chart format
    this.activityDistribution = Object.entries(activityCounts).map(([activity, count]) => ({
      name: activity.charAt(0).toUpperCase() + activity.slice(1),
      value: count,
    }));

    // If no data, show default
    if (this.activityDistribution.length === 0) {
      this.activityDistribution = [{ name: 'No Workouts', value: 1 }];
    }
  }

  private updateWeeklyVolume(): void {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyData: { [key: string]: number } = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    };

    // Group workouts by day of week
    this.workoutHistory.forEach((workout) => {
      const date = new Date(workout.timestamp || workout.date);
      const dayName = dayNames[date.getDay()];
      weeklyData[dayName] += workout.distance || 0;
    });

    // Convert to chart format
    this.weeklyVolume = Object.entries(weeklyData).map(([day, distance]) => ({
      name: day,
      value: Math.round(distance * 10) / 10, // Round to 1 decimal
    }));
  }

  private updateHeartRateZones(): void {
    // Use last 4 workouts or create default series
    const recentWorkouts = this.workoutHistory.slice(-4);
    const numWorkouts = Math.max(4, recentWorkouts.length);

    // Create series data
    const fatBurnSeries = [];
    const cardioSeries = [];
    const peakSeries = [];

    for (let i = 0; i < numWorkouts; i++) {
      const workout = recentWorkouts[i];
      const workoutName = `Workout ${i + 1}`;

      fatBurnSeries.push({
        name: workoutName,
        value: workout?.heart_rate_avg ? workout.heart_rate_avg - 20 : 120 + Math.random() * 20,
      });

      cardioSeries.push({
        name: workoutName,
        value: workout?.heart_rate_avg || 140 + Math.random() * 20,
      });

      peakSeries.push({
        name: workoutName,
        value: workout?.heart_rate_max || 160 + Math.random() * 20,
      });
    }

    this.heartRateZones = [
      {
        name: 'Fat Burn',
        series: fatBurnSeries,
      },
      {
        name: 'Cardio',
        series: cardioSeries,
      },
      {
        name: 'Peak',
        series: peakSeries,
      },
    ];
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
