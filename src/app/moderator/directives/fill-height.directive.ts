import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[fillHeight]'
})
export class FillHeightDirective implements OnInit {

  @Input() fillHeight: number = 0;

  constructor(private elRef: ElementRef) {
  }

  ngOnInit(): void {       
    setTimeout(() => this.onResize(), 50);
  }

  @HostListener("window:resize", ['$event'])
  onResize() {
    const el = this.elRef.nativeElement as HTMLElement;
    el.style.height = (window.innerHeight - el.offsetTop - 10 - this.fillHeight) + "px";
  }

}
