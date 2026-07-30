import { Component } from '@angular/core';
import { CommonModule, AsyncPipe, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HistoryService } from '../../../core/services/history.service';

@Component({
  selector: 'app-conversion-history',
  standalone: true,
  imports: [CommonModule, AsyncPipe, DatePipe, MatListModule, MatButtonModule],
  template: `
    <div class="history" *ngIf="(historyService.history$ | async)! as history">
      <div class="history-header">
        <h3>History</h3>
        <button mat-button color="warn" *ngIf="history.length" (click)="historyService.clear()">Clear</button>
      </div>
      <mat-list *ngIf="history.length; else empty">
        <mat-list-item *ngFor="let item of history">
          {{ item.amount }} {{ item.base }} → {{ item.result }} {{ item.target }}
          <span class="date">{{ item.timestamp | date:'medium' }}</span>
        </mat-list-item>
      </mat-list>
      <ng-template #empty><p class="empty">No conversions yet.</p></ng-template>
    </div>
  `,
  styles: [`
    .history { margin-top: 16px; }
    .history-header { display: flex; justify-content: space-between; align-items: center; }
    mat-list-item { display: flex; flex-direction: column; align-items: flex-start; height: auto !important; padding: 8px 0; }
    .date { font-size: 12px; color: #777; }
    .empty { color: #777; text-align: center; }
  `],
})
export class ConversionHistoryComponent {
  constructor(public historyService: HistoryService) {}
}