import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUppercaseCode]',
  standalone: true,
})
export class UppercaseCodeDirective {
  constructor(private el: ElementRef<HTMLInputElement>, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const upper = input.value.toUpperCase();
    this.renderer.setProperty(this.el.nativeElement, 'value', upper);
  }
}