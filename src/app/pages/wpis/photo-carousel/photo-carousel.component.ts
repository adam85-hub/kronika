import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ElementInterface } from '../../../interfaces/element.interface';

@Component({
  selector: 'app-photo-carousel',
  templateUrl: './photo-carousel.component.html',
  styleUrls: ['./photo-carousel.component.scss']
})
export class PhotoCarouselComponent implements OnInit {

  @Input() photos: ElementInterface[] = [];
  @Input() selectedIndex: number = 0;
  @Input() hidden: boolean = true;
  @Output() closeClicked = new EventEmitter();
  
  onPhone: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize')
  onResizeEvent() {
    this.onResize();
  }

  onResize() {
    if (window.innerWidth > 630) this.onPhone = false;
    else this.onPhone = true;
  }

  close() {
    this.closeClicked.emit();
  }

  left() {
    if (this.selectedIndex === 0) return;
    this.selectedIndex -= 1;
  }

  right() {
    if (this.selectedIndex === this.photos.length-1) return;
    this.selectedIndex += 1;
  }
}
