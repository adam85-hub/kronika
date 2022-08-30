import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PrayInterface } from 'src/app/interfaces/pray.interface';
import { PraysService } from 'src/app/services/prays.service';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-modlitwy',
  templateUrl: './modlitwy.component.html',
  styleUrls: ['./modlitwy.component.scss']
})
export class ModlitwyComponent extends PageComponent implements OnInit {
  Modlitwy?: PrayInterface[] = undefined;

  constructor(title: Title, private praysService: PraysService) {
    super(title);
    this.pageTitle = "Medytacje";

    this.praysService.getPrays().subscribe((response) => {
      this.Modlitwy = response;
      this.Modlitwy.sort((a, b) => ((a.year * 15 + a.month) - (b.year * 15 + b.month)) * -1);
    })
  }

}
