import { Component } from '@angular/core';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ConverterComponent } from './features/converter/converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoaderComponent, ConverterComponent],
  template: `
    <app-loader></app-loader>
    <main class="app-shell">
      <app-converter></app-converter>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100dvh;
    }

    .app-shell {
      min-height: 100dvh;
      padding-top: env(safe-area-inset-top);
    }
  `],
})
export class AppComponent {}
