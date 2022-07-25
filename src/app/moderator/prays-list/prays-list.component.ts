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
      this.sortPrays();      
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

  praySaved(index: number) {
    if (this.prays == null || this.prays.length === 0) throw Error("Unexpected behavior: prays list is null or empty");
    this.editShown[index] = false;
    this.sortPrays();
  }

  deletePray() {    
    if (this.prayToDelete == null) throw Error("Unexpected behavior: prayToDelete is null");

    this.praysService.deletePray(this.prayToDelete.id).subscribe((success) => {
      if (this.prays == null || this.prays.length === 0) throw Error("Unexpected behavior: prays list is null or empty");
      
      const filterCondition = (value: PrayInterface) => {
        if (this.prayToDelete == null) throw Error("Unexpected behavior: prayToDelete is null");
        return value.id === this.prayToDelete.id;
      }

      if (success == true) {
        const indexToDelete = this.prays.findIndex(filterCondition);
        this.prays.splice(indexToDelete, 1);
        this.orginalPrays.splice(indexToDelete, 1);
        this.prays = this.prays;
        this.prayToDelete = null;
      }
      else {
        this.deleteErrorDialog = true;
      }
    })
  }

  sortPrays() {
    if (this.prays == null || this.prays.length === 0) throw Error("Unexpected behavior: prays list is null or empty");
    // Sort by date descending
    this.prays = this.prays.sort((a: PrayInterface, b: PrayInterface) => {
      return (a.month + a.year * 13) - (b.month + b.year * 13);
    });
    this.prays.reverse();

    // Synchronize other tables with sorted prays
    this.orginalPrays = [];
    this.editShown = [];
    for (const pray of this.prays) {
      this.orginalPrays.push(deepCopy(pray));
      this.editShown.push(false);
    }
  }

  addPray() {
    const emptyPray: PrayInterface = {
      id: 0,
      description: "",
      videoId: "",
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
    };

    this.praysService.postPray(emptyPray).subscribe({
      next: (result) => {
        this.prays?.push(result);
        this.sortPrays();
        const newIndex = this.prays?.findIndex((x: PrayInterface) => result.id === x.id);
        if (newIndex === undefined || newIndex === -1) throw Error("Unexpected behavior: pray with id " + result.id + " does not exist in prays array");
        this.editShown[newIndex] = true;
      },
      error: (e) => {
        console.log(e);
        alert("Wystąpił błąd przy dodawaniu nowej medytacji!");
      }
    })
  }
}

function deepCopy(object: object) {
  return JSON.parse(JSON.stringify(object));
}
