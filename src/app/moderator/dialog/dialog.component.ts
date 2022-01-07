import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  _visibility: "none" | "block" = "none";

  @Input() set isVisible(value: boolean) {
    if(value) this._visibility = "block";
    else this._visibility = "none";
  }

  @Input() title = "Uwaga!";
  @Input() content = "Not set!";

  @Output()
  exit = new EventEmitter();

  @Output()
  stay = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }  
}
