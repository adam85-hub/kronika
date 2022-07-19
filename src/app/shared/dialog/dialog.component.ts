import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  _visibility: "none" | "block" = "none";
  btn1 = 2;
  btn2 = 1;

  @Input() set visible(value: boolean) {
    if(value) this._visibility = "block";
    else this._visibility = "none";
  }

  @Input() Title = "Uwaga!";
  @Input() yesBtnText = "Tak";
  @Input() noBtnText = "Nie";
  @Input() singleButton = false;
  @Input() set order(value: "Normal" | "Reverted") {
    if(value === "Normal") {
      this.btn1 = 2;
      this.btn2 = 1;
    }
    else {
      this.btn1 = 1;
      this.btn2 = 2;
    }
  }

  @Output() yesClicked = new EventEmitter();
  @Output() noClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
