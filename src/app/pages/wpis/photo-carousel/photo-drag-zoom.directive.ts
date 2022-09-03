import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhotoDragZoom]'
})
export class PhotoDragZoomDirective {

  mouseOver: boolean = false;

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.mouseOver = true;
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.mouseOver = false;
  }

  @HostListener('wheel', ['$event']) onScroll(event: WheelEvent) {
    if (!this.mouseOver) return;
    console.log(event.deltaY);
  }
}
