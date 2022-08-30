import { Component, HostListener, Input, OnInit } from '@angular/core';
import { PrayVideoInterface } from 'src/app/interfaces/prayVideo.interface';

@Component({
  selector: 'app-piosenka',
  templateUrl: './piosenka.component.html',
  styleUrls: ['./piosenka.component.scss']
})
export class PiosenkaComponent implements OnInit {
  widthOfVideo = 500;
  heightOfVideo = 300;

  @Input() prayVideo?: PrayVideoInterface;

  constructor() { }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize')
  onResizeEvent() {
    this.onResize();
  }

  onResize() {
    let el_piosenka = document.getElementById("piosenka");
    if(el_piosenka != null) { 
      this.widthOfVideo = el_piosenka?.clientWidth - 0.3 * el_piosenka?.clientWidth;
      this.heightOfVideo = this.widthOfVideo / 1.618;
    }
  }  
}
