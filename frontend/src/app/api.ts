import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = (import.meta.env.VITE_API_URL || 'https://api.airwave.fitness') + '/api/';

  constructor(private http: HttpClient) {}

  getHealth(): Observable<any> {
    return this.http.get(this.baseUrl + 'health/');
  }

  getNorseTest(): Observable<any> {
    return this.http.get(this.baseUrl + 'norse-test/');
  }

  postWorkout(workout: any): Observable<any> {
    return this.http.post(this.baseUrl + 'workouts/', workout);
  }

  getWorkouts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'workouts/');
  }
}
