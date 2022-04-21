import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  fontSize: string = "70px";

  constructor() { }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.fontSize = window.innerWidth > 630 ? "70px" : "50px";
  }

}
