import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PrayInterface } from 'src/app/interfaces/pray.interface';
import { PraysService } from 'src/app/services/prays.service';
import { PanelOptionComponent } from '../panel-option/panel-option.component';

@Component({
  selector: 'app-prays-list',
  templateUrl: './prays-list.component.html',
  styleUrls: ['./prays-list.component.scss']
})
export class PraysListComponent extends PanelOptionComponent implements OnInit {
  prays: PrayInterface[] | null = null;

  constructor(title: Title, private praysService: PraysService) { 
    super(title);
    this.title = "Modlitwy";
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.praysService.getPrays().subscribe((prays) => {
      this.prays = prays;
    });
  }

  numberToMonth(number: number): string {
    const d = new Date();
    d.setMonth(number-1);
    let month = d.toLocaleDateString("default", { month: "long" });
    month = month.charAt(0).toUpperCase() + month.substring(1);
    return month;
  }
}
