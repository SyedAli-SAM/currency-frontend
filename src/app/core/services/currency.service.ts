import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CurrencySymbols, ConvertResponse } from '../models/currency.model';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private http = inject(HttpClient);
  private symbols$?: Observable<CurrencySymbols>;

  getSymbols(): Observable<CurrencySymbols> {
    if (!this.symbols$) {
      this.symbols$ = this.http
        .get<CurrencySymbols>(`${environment.apiUrl}/symbols`)
        .pipe(shareReplay(1));
    }
    return this.symbols$;
  }

  convert(base: string, target: string, amount: number, date?: string): Observable<ConvertResponse> {
    let params = new HttpParams()
      .set('base', base).set('target', target).set('amount', amount);
    if (date) params = params.set('date', date);
    return this.http.get<ConvertResponse>(`${environment.apiUrl}/convert`, { params });
  }
}