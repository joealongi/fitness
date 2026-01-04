import { Component, signal, inject, OnInit } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from './api';

@Component({
  selector: 'app-root',
  imports: [DecimalPipe, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('Airwave');
  private api = inject(Api);

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
    user: 1, // Hardcoded for demo
  };

  ngOnInit() {
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

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
