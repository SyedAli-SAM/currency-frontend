import { Component } from '@angular/core';
import { CommonModule, AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HistoryService } from '../../../core/services/history.service';

@Component({
  selector: 'app-conversion-history',
  standalone: true,
  imports: [CommonModule, AsyncPipe, DatePipe, DecimalPipe, MatButtonModule, MatIconModule],
  templateUrl: './conversion-history.component.html',
  styleUrl: './conversion-history.component.scss',
})
export class ConversionHistoryComponent {
  constructor(public historyService: HistoryService) {}
}
