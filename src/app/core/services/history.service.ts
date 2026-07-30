import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConversionRecord } from '../models/currency.model';

const STORAGE_KEY = 'conversion-history';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  private historySubject = new BehaviorSubject<ConversionRecord[]>(this.load());
  history$ = this.historySubject.asObservable();

  private load(): ConversionRecord[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  add(record: ConversionRecord) {
    const updated = [record, ...this.historySubject.value].slice(0, 50); // cap at 50
    this.historySubject.next(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  clear() {
    this.historySubject.next([]);
    localStorage.removeItem(STORAGE_KEY);
  }
}