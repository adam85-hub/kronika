import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { numberToMonth, PrayInterface } from 'src/app/interfaces/pray.interface';
import { PraysService } from 'src/app/services/prays.service';

@Component({
  selector: 'app-edit-pray',
  templateUrl: './edit-pray.component.html',
  styleUrls: ['./edit-pray.component.scss']
})
export class EditPrayComponent implements OnInit {
  @Input()
  pray?: PrayInterface;
  months: string[] = [];

  @Output()
  saved = new EventEmitter();
  saving: boolean = false;
  modifyErrorDialog: boolean = false;

  constructor(private praysService: PraysService) { 
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

  save() {
    if (this.pray == undefined) throw Error("pray can not be undefined.");
    this.saving = true;

    this.praysService.modifyPray(this.pray).subscribe({
      next: (result) => {
        if (this.pray == undefined) throw Error("pray can not be undefined.");
        
        if (areObjectsEqual(this.pray, result)) {
          this.saved.emit(result);
          this.saving = false;
        }
        else {
          console.log("Result:");
          console.log(result);
          console.log("Pray:");
          console.log(this.pray);
          this.modifyErrorDialog = true;
        }
      },
      error: (e) => {
        console.log(e);
        this.modifyErrorDialog = true;
      }
    });
  }
}

function areObjectsEqual(a: object, b: object): boolean {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false;
  
  for (let i = 0; i < Object.keys(a).length; i++) {
    if (Object.values(a)[i] != Object.values(b)[i]) {
      return false;
    }
  }

  return true;
}
