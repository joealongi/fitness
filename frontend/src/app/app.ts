import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from './api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [DecimalPipe, CommonModule, FormsModule],
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
  workoutResult: any = null;

  workout = {
    activity_type: 'run',
    duration: 30,
    distance: 5,
    heart_rate_avg: null,
    heart_rate_max: null,
    intensity: 'moderate',
  };

  // Demo calculator for unauthenticated users
  demoWorkout = {
    activity_type: 'run',
    duration: 30,
    distance: 5,
  };

  ngOnInit() {
    // Subscribe to authentication state changes
    this.subscriptions.push(
      this.api.isAuthenticated$.subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
      }),
      this.api.currentUser$.subscribe((user) => {
        this.currentUser = user;
      })
    );

    this.api.getHealth().subscribe({
      next: (data) => {
        this.healthData = data;
      },
      error: (error) => {
        console.warn('Backend health check failed:', error);
        this.healthData = null;
      },
    });
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
    const authSection = document.querySelector('.auth-section');
    if (authSection) {
      authSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
