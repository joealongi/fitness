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
    // Temporarily disable API calls to prevent potential errors
    // this.api.getHealth().subscribe((data) => {
    //   this.healthData = data;
    // });
    // this.api.getNorseTest().subscribe((data) => {
    //   this.norseData = data;
    // });
  }

  submitWorkout() {
    this.api.postWorkout(this.workout).subscribe((result) => {
      this.workoutResult = result;
    });
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
