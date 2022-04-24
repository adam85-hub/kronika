import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-modlitwy',
  templateUrl: './modlitwy.component.html',
  styleUrls: ['./modlitwy.component.scss']
})
export class ModlitwyComponent extends PageComponent implements OnInit {

  constructor(title: Title) {
    super(title);
    this.pageTitle = "Modlitwy i medytacje";
  }

}
