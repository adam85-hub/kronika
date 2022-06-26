import { Component, Input, OnInit } from '@angular/core';
import { numberToMonth, PrayInterface } from 'src/app/interfaces/pray.interface';

@Component({
  selector: 'app-edit-pray',
  templateUrl: './edit-pray.component.html',
  styleUrls: ['./edit-pray.component.scss']
})
export class EditPrayComponent implements OnInit {
  @Input()
  id?: number;
  months: string[] = [];
  pray?: PrayInterface;

  constructor() { 
    for (let i = 1; i <= 12; i++) {
      this.months.push(numberToMonth(i));
    }
  }

  ngOnInit(): void {
    if (this.id == undefined) throw Error("id can't be null or undefined");
  }

  monthChanged(e: Event) {
    if (this.pray == undefined) return;
    const select = e.target as HTMLSelectElement;
    this.pray.month = +select.options[select.selectedIndex].value;
  }
}
