import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTextareaFitContent]'
})
export class TextareaFitContentDirective {

  constructor(private el: ElementRef) { 
  }

  ngOnInit(){
    setTimeout(() => this.onInput(), 10);
  }

  @HostListener("input")
  onInput() {
    this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + "px";
  }

}
