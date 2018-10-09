// angular
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[racerHighlightColor]'
})
export class HighlightColorDirective {

  @Input('racerHighlightColor') racerHighlightColor: string;

  private el: HTMLElement;
  private currentHighlightColor: string;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @HostListener('click', ['$event.target']) onClick(_event: any) {
    let newColor = 'inherit';

    if (this.currentHighlightColor !== this.racerHighlightColor) {
      newColor = this.racerHighlightColor;
    }
    this.highlight(newColor);
  }

  private highlight(color: string) {
    this.currentHighlightColor = color;
    this.el.style.backgroundColor = color;
  }
}
