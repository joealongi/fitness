import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = environment.apiUrl + '/api/';
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  // Observable to track authentication state
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Observable to track current user
  private currentUserSubject = new BehaviorSubject<any>(this.getSavedUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token
      ? new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        })
      : new HttpHeaders({
          'Content-Type': 'application/json',
        });
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  private saveTokens(access: string, refresh: string): void {
    localStorage.setItem(this.tokenKey, access);
    localStorage.setItem(this.refreshTokenKey, refresh);
    this.isAuthenticatedSubject.next(true);
  }

  private saveUser(user: any): void {
    localStorage.setItem('current_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private getSavedUser(): any {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : null;
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;
      return Date.now() < expiry;
    } catch {
      return false;
    }
  }

  private clearTokens(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem('current_user');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  // Authentication methods
  register(username: string, email: string, password: string): Observable<any> {
    return this.http
      .post(this.baseUrl + 'auth/register/', {
        username,
        email,
        password,
      })
      .pipe(
        tap((response: any) => {
          if (response.tokens) {
            this.saveTokens(response.tokens.access, response.tokens.refresh);
            this.saveUser(response.user);
          }
        })
      );
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(this.baseUrl + 'auth/login/', {
        username,
        password,
      })
      .pipe(
        tap((response: any) => {
          if (response.tokens) {
            this.saveTokens(response.tokens.access, response.tokens.refresh);
            this.saveUser(response.user);
          }
        })
      );
  }

  logout(): void {
    this.clearTokens();
  }

  refreshToken(): Observable<any> {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      throw new Error('No refresh token available');
    }

    return this.http
      .post(this.baseUrl + '../auth/token/refresh/', {
        refresh,
      })
      .pipe(
        tap((response: any) => {
          if (response.access) {
            localStorage.setItem(this.tokenKey, response.access);
          }
        })
      );
  }

  getUserProfile(): Observable<any> {
    return this.http.get(this.baseUrl + 'auth/profile/', {
      headers: this.getAuthHeaders(),
    });
  }

  // API methods
  getHealth(): Observable<any> {
    return this.http.get(this.baseUrl + 'health/');
  }

  getNorseTest(): Observable<any> {
    return this.http.get(this.baseUrl + 'norse-test/');
  }

  postWorkout(workout: any): Observable<any> {
    return this.http.post(this.baseUrl + 'workouts/', workout, {
      headers: this.getAuthHeaders(),
    });
  }

  getWorkouts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'workouts/', {
      headers: this.getAuthHeaders(),
    });
  }

  // Subscription methods
  getSubscriptionPlans(): Observable<any> {
    return this.http.get(this.baseUrl + 'subscription/plans/');
  }

  getSubscriptionStatus(): Observable<any> {
    return this.http.get(this.baseUrl + 'subscription/status/', {
      headers: this.getAuthHeaders(),
    });
  }

  createPaymentIntent(plan: string): Observable<any> {
    return this.http.post(
      this.baseUrl + 'payments/create-intent/',
      { plan },
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  cancelSubscription(): Observable<any> {
    return this.http.post(
      this.baseUrl + 'subscription/cancel/',
      {},
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
}
