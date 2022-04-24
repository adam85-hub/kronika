import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PrayInterface } from 'src/app/interfaces/pray.interface';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-modlitwy',
  templateUrl: './modlitwy.component.html',
  styleUrls: ['./modlitwy.component.scss']
})
export class ModlitwyComponent extends PageComponent implements OnInit {
  Modlitwy = Modlitwy;

  constructor(title: Title) {
    super(title);
    this.pageTitle = "Modlitwy i medytacje";
    this.Modlitwy.sort((a, b) => ((a.year * 15 + a.month) - (b.year * 15 + b.month)) * -1);
  }

}

const Modlitwy: PrayInterface[] = [
  {
    month: 3,
    year: 2022,
    description: "Niesienie Krzyża",
    videoId: "ht8yNfYmZg4"
  },
  {
    month: 2,
    year: 2022,
    description: "Głoszenie Ewangelii",
    videoId: "yupmTtuxVmU"
  },
  {
    month: 3,
    year: 2022,
    description: "Niesienie Krzyża",
    videoId: "ht8yNfYmZg4"
  },
  {
    month: 2,
    year: 2022,
    description: "Głoszenie Ewangelii",
    videoId: "yupmTtuxVmU"
  },
];
