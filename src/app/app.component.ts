import { Component } from '@angular/core';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ConverterComponent } from './features/converter/converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoaderComponent, ConverterComponent],
  template: `<app-loader></app-loader><app-converter></app-converter>`,
})
export class AppComponent {}