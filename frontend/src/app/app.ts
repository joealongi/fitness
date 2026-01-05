import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from './api';
import { Subscription } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WorkoutWithVO2Max, WorkoutForm, DemoWorkoutForm, LoginForm, RegisterForm } from './types';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroCpuChip,
  heroLightBulb,
  heroMagnifyingGlass,
  heroChartBar,
  heroHandRaised,
} from '@ng-icons/heroicons/outline';
import { Hero } from './components/hero/hero';

/* TODO: Add NG Icons when available */
/* Spartan UI - Using CSS-first approach for now */
/* Components will be updated to use Spartan UI directives when available */

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, NgxChartsModule, NgIconComponent, Hero],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [
    provideIcons({
      heroCpuChip,
      heroLightBulb,
      heroMagnifyingGlass,
      heroChartBar,
      heroHandRaised,
    }),
  ],
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

  // Loading states for charts
  chartsLoading = false;

  // Color scheme for charts - Red, Black, Grey theme with accessibility
  colorScheme: any = {
    domain: ['#dc2626', '#1f2937', '#6b7280', '#374151', '#9ca3af', '#d1d5db'],
  };

  // Baseline/Industry standard data
  private baselineVO2Max = 35; // Average adult VO2 max
  private baselineWeeklyVolume = [
    { name: 'Mon', value: 3.2 },
    { name: 'Tue', value: 2.8 },
    { name: 'Wed', value: 3.5 },
    { name: 'Thu', value: 2.9 },
    { name: 'Fri', value: 2.1 },
    { name: 'Sat', value: 5.8 },
    { name: 'Sun', value: 4.2 },
  ];

  // VO2 Max trend over time (Line Chart) - Shows baseline + user data
  vo2MaxTrend: any[] = [];

  // Activity type distribution (Pie Chart)
  activityDistribution: any[] = [];

  // Weekly workout volume (Bar Chart) - Shows baseline + user data
  weeklyVolume: any[] = [];

  // Heart rate zones (Area Chart)
  heartRateZones: any[] = [];

  // Workout history storage
  private workoutHistoryKey = 'airwave_workout_history';
  workoutHistory: any[] = [];

  ngOnInit() {
    // Initialize charts as not loading
    this.chartsLoading = false;

    // Subscribe to authentication state changes (only if observables exist)
    if (this.api.isAuthenticated$) {
      this.subscriptions.push(
        this.api.isAuthenticated$.subscribe((isAuth) => {
          this.isAuthenticated = isAuth;
          if (isAuth) {
            // Load real data from backend when authenticated
            this.loadWorkoutsFromBackend();
          } else {
            // Reset to local/demo data when not authenticated
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
        // Scroll to top after successful login to show dashboard
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Scroll to AI insights section
  scrollToAIInsights() {
    const aiSection = document.querySelector('#ai-insights-section');
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    // Show baseline/industry standard data when no user data exists
    this.vo2MaxTrend = [
      {
        name: 'Industry Average',
        series: [{ name: 'Baseline', value: this.baselineVO2Max }],
      },
      {
        name: 'Your Data',
        series: [{ name: 'Current', value: 0 }],
      },
    ];

    // Show typical activity distribution for fitness enthusiasts
    this.activityDistribution = [
      { name: 'Running', value: 45 },
      { name: 'Cycling', value: 30 },
      { name: 'Walking', value: 15 },
      { name: 'Other', value: 10 },
    ];

    // Show typical weekly volume for active individuals
    this.weeklyVolume = this.baselineWeeklyVolume.map((item) => ({
      ...item,
      series: 'Industry Average',
    }));

    // Default heart rate zones
    this.heartRateZones = [
      {
        name: 'Fat Burn Zone',
        series: [{ name: 'Baseline', value: 125 }],
      },
      {
        name: 'Cardio Zone',
        series: [{ name: 'Baseline', value: 145 }],
      },
      {
        name: 'Peak Zone',
        series: [{ name: 'Baseline', value: 165 }],
      },
    ];
  }

  private updateVO2MaxTrend(): void {
    // Show baseline comparison with user progress
    const recentWorkouts = this.workoutHistory.slice(-5); // Last 5 workouts

    // Create timeline data points (need at least 2 points for line chart)
    const dataPoints = ['Start'];

    // Add workout labels
    recentWorkouts.forEach((_, index) => {
      dataPoints.push(`Workout ${index + 1}`);
    });

    if (recentWorkouts.length === 0) {
      dataPoints.push('Current');
    }

    // Create industry average series (constant line)
    const industrySeries = dataPoints.map((point) => ({
      name: point,
      value: this.baselineVO2Max,
    }));

    // Create user progress series
    const userSeries = [];
    userSeries.push({ name: 'Start', value: 0 }); // Starting point

    recentWorkouts.forEach((workout, index) => {
      userSeries.push({
        name: `Workout ${index + 1}`,
        value: workout.vo2max || 0,
      });
    });

    if (recentWorkouts.length === 0) {
      userSeries.push({ name: 'Current', value: 0 });
    }

    // Format for ngx-charts multi-series line chart
    this.vo2MaxTrend = [
      {
        name: 'Industry Average',
        series: industrySeries,
      },
      {
        name: 'Your Progress',
        series: userSeries,
      },
    ];
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
    const userWeeklyData: { [key: string]: number } = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    };

    // Group user workouts by day of week
    this.workoutHistory.forEach((workout) => {
      const date = new Date(workout.timestamp || workout.date);
      const dayName = dayNames[date.getDay()];
      userWeeklyData[dayName] += workout.distance || 0;
    });

    // Combine baseline and user data
    const combinedData = dayNames
      .map((day) => {
        const baselineValue = this.baselineWeeklyVolume.find((b) => b.name === day)?.value || 0;
        const userValue = Math.round(userWeeklyData[day] * 10) / 10;

        return [
          {
            name: day,
            value: baselineValue,
            series: 'Industry Average',
          },
          {
            name: day,
            value: userValue,
            series: 'Your Data',
          },
        ];
      })
      .flat();

    this.weeklyVolume = combinedData;
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

  // Load workouts from backend when authenticated
  private loadWorkoutsFromBackend(): void {
    this.chartsLoading = true;

    this.api.getWorkouts().subscribe({
      next: (workouts) => {
        // Update workout history with backend data
        this.workoutHistory = workouts.map((workout) => ({
          ...workout,
          timestamp: workout.date,
          date: new Date(workout.date).toLocaleDateString(),
          vo2max: workout.vo2max_estimate,
        }));

        // Update charts with backend data
        this.updateChartsFromHistory();
        this.chartsLoading = false;
      },
      error: (error) => {
        console.error('Failed to load workouts from backend:', error);
        // Fallback to local data if backend fails
        this.loadWorkoutHistory();
        this.updateChartsFromHistory();
        this.chartsLoading = false;
      },
    });
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
