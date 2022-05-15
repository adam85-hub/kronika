import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[fillHeight]'
})
export class FillHeightDirective implements OnInit {

  constructor(private elRef: ElementRef) {
  }

  ngOnInit(): void {       
    setTimeout(() => this.onResize(), 50);
  }

  @HostListener("window:resize", ['$event'])
  onResize() {
    const el = this.elRef.nativeElement as HTMLElement;
    el.style.height = (window.innerHeight - el.offsetTop - 10) + "px";
    console.log(el.offsetTop);
  }

}
