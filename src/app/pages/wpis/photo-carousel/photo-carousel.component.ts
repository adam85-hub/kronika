import { Component, HostListener, Input, OnInit } from '@angular/core';
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

}
