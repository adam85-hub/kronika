import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input("animation") animationClass: "rotate" = "rotate";

  constructor() { }

  ngOnInit(): void {
  }

}
