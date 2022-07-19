import { Component, Input, OnInit } from '@angular/core';
import { numberToMonth, PrayInterface } from 'src/app/interfaces/pray.interface';

@Component({
  selector: 'app-edit-pray',
  templateUrl: './edit-pray.component.html',
  styleUrls: ['./edit-pray.component.scss']
})
export class EditPrayComponent implements OnInit {
  @Input()
  pray?: PrayInterface;
  months: string[] = [];

  constructor() { 
    for (let i = 1; i <= 12; i++) {
      this.months.push(numberToMonth(i));
    }    
  }

  ngOnInit(): void {
    if (this.pray == undefined) throw Error("pray can not be undefined.");
    setTimeout(() => {
      if (this.pray == undefined) throw Error("pray can not be undefined.");
      const select = document.getElementById("month-select") as HTMLSelectElement;
      select.selectedIndex = this.pray?.month - 1;
    }, 10);
  }

  monthChanged(e: Event) {
    if (this.pray == undefined) return;
    const select = e.target as HTMLSelectElement;
    this.pray.month = +select.options[select.selectedIndex].value;
  }

  linkChanged(link: string) {
    if (this.pray == undefined) throw Error("pray can not be undefined.");

    let index = link.indexOf("?v=");
    if (index !== -1) link = link.substring(index + 3);
    this.pray.videoId = link;
  }
}

//todo: Make saving pray work
