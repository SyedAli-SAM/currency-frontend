import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, AsyncPipe, MatProgressBarModule],
  template: `<mat-progress-bar *ngIf="loading.loading$ | async" mode="indeterminate" class="global-loader"></mat-progress-bar>`,
  styles: [`.global-loader { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; }`],
})
export class LoaderComponent {
  loading = inject(LoadingService);
}