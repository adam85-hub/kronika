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
  prays: PrayInterface[] | null = null;
  editShown: boolean[] = [];

  constructor(title: Title, private praysService: PraysService, private router: Router) { 
    super(title);
    this.title = "Modlitwy";
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.praysService.getPrays().subscribe((prays) => {
      this.prays = prays;
      prays.map(pray => {
        this.editShown.push(false);
        return pray;
      })
    });
  }  

  numberToMonth(number: number): string {
    return numberToMonth(number);
  }

  edit(index: number): void {
    if (this.prays == null || this.prays.length === 0) throw Error("Unexpected behavior: prays list is null or empty");
    this.editShown[index] = true;
  }
}
