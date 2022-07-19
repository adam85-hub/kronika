import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { numberToMonth, PrayInterface } from 'src/app/interfaces/pray.interface';
import { PraysService } from 'src/app/services/prays.service';
import { PanelOptionComponent } from '../panel-option/panel-option.component';

@Component({
  selector: 'app-prays-list',
  templateUrl: './prays-list.component.html',
  styleUrls: ['./prays-list.component.scss']
})
export class PraysListComponent extends PanelOptionComponent implements OnInit {
  orginalPrays: PrayInterface[] = [];
  prays: PrayInterface[] | null = null;
  editShown: boolean[] = [];

  deleteDialog = false;
  prayToDelete: PrayInterface | null = null;
  deleteErrorDialog = false;

  constructor(title: Title, private praysService: PraysService, private router: Router) {
    super(title);
    this.title = "Medytacje";
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.praysService.getPrays().subscribe((prays) => {
      this.prays = prays;
      prays.map(pray => {
        this.editShown.push(false);
        this.orginalPrays.push(deepCopy(pray));
        return pray;
      })
    });
  }

  numberToMonth(number: number): string {
    return numberToMonth(number);
  }

  edit(index: number): void {
    if (this.prays == null || this.prays.length === 0) throw Error("Unexpected behavior: prays list is null or empty");

    if (this.editShown[index] === false) this.editShown[index] = true;
    else {
      this.editShown[index] = false;
      this.prays[index] = deepCopy(this.orginalPrays[index]);
    }
  }

  deleteButtonClicked(index: number) {
    if (this.prays == null || this.prays.length === 0) throw Error("Unexpected behavior: prays list is null or empty");

    this.prayToDelete = this.prays[index];
    this.deleteDialog = true;
  }

  deletePray() {    
    if (this.prayToDelete == null) throw Error("Unexpected behavior: prayToDelete is null");

    this.praysService.deletePray(this.prayToDelete.id).subscribe((success) => {
      if (this.prays == null || this.prays.length === 0) throw Error("Unexpected behavior: prays list is null or empty");
      
      const filterCondition = (value: PrayInterface) => {
        if (this.prayToDelete == null) throw Error("Unexpected behavior: prayToDelete is null");
        return value.id != this.prayToDelete.id;
      }

      if (success == true) {
        this.prays.filter(filterCondition);
        this.prayToDelete = null;
      }
      else {
        this.deleteErrorDialog = true;
      }
    })
  }
}

function deepCopy(object: object) {
  return JSON.parse(JSON.stringify(object));
}

//todo: Add sorting prays by date
