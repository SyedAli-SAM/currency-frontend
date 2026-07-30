import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { CurrencySelectComponent } from '../../shared/components/currency-select/currency-select.component';
import { UppercaseCodeDirective } from '../../shared/directives/uppercase-code.directive';
import { CurrencyService } from '../../core/services/currency.service';
import { HistoryService } from '../../core/services/history.service';
import { ConversionHistoryComponent } from './conversion-history/conversion-history.component';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule,
    MatIconModule, CurrencySelectComponent, ConversionHistoryComponent,
  ],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent {
  from = 'USD';
  to = 'EUR';
  amount = 1;
  selectedDate: Date | null = null;
  result: number | null = null;
  rate: number | null = null;
  error = '';
  today = new Date();
  
  constructor(
    private currencyService: CurrencyService,
    private historyService: HistoryService,
  ) {}

  swap() {
    [this.from, this.to] = [this.to, this.from];
    if (this.result !== null) this.convert();
  }

  convert() {
    this.error = '';
    const dateStr = this.selectedDate
      ? this.selectedDate.toISOString().split('T')[0]
      : undefined;

    this.currencyService.convert(this.from, this.to, this.amount, dateStr).subscribe({
      next: (res) => {
        this.result = res.result;
        this.rate = res.rate;
        this.historyService.add({ ...res, timestamp: new Date().toISOString() });
      },
      error: () => { this.error = 'Conversion failed. Please try again.'; },
    });
  }
}