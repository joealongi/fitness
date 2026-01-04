import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getHealth(): Observable<any> {
    return this.http.get(this.baseUrl + 'health/');
  }

  getNorseTest(): Observable<any> {
    return this.http.get(this.baseUrl + 'norse-test/');
  }
}
