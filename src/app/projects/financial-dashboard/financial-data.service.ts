import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialDataService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAccountSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/account-summary`);
  }

  getMonthlyBudget(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/monthly-budget`);
  }

  getRecentTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recent-transactions`);
  }

  getSavingsGoals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/savings-goals`);
  }

  saveData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/data`, data);
  }
}