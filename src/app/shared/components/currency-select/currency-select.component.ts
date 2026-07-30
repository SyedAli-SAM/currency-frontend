import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyService } from '../../../core/services/currency.service';
import { CurrencySymbols } from '../../../core/models/currency.model';

@Component({
  selector: 'app-currency-select',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>{{ label }}</mat-label>
      <mat-select [(ngModel)]="value" (ngModelChange)="valueChange.emit($event)">
        <mat-option *ngFor="let code of codes()" [value]="code">
          {{ code }} — {{ symbols[code]?.description }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [`.full-width { width: 100%; }`],
})
export class CurrencySelectComponent implements OnInit {
  @Input() label = 'Currency';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  symbols: CurrencySymbols = {};

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.getSymbols().subscribe(s => this.symbols = s);
  }

  codes() {
    return Object.keys(this.symbols);
  }
}