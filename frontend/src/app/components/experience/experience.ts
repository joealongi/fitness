import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './experience.html',
  styleUrls: ['./experience.scss'],
})
export class ExperienceComponent {
  // Demo calculator for unauthenticated users
  demoWorkout = {
    activity_type: 'run',
    duration: 30,
    distance: 5,
  };

  workoutResult: any = null;

  // Authentication state
  activeAuthTab: 'login' | 'register' = 'login';

  // Login form
  loginData = { username: '', password: '' };
  loginLoading = false;
  loginError = '';

  // Register form
  registerData = { username: '', email: '', password: '' };
  registerLoading = false;
  registerError = '';

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

  login() {
    // TODO: Implement login
    console.log('Login:', this.loginData);
  }

  register() {
    // TODO: Implement register
    console.log('Register:', this.registerData);
  }
}
