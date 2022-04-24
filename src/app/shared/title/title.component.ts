import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() fontSize: number = 70;

  FontSize: string =  this.fontSize + "px";

  constructor() { }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.FontSize = window.innerWidth > 630 ? this.fontSize + "px" : this.fontSize - 20 + "px";
  }

}
