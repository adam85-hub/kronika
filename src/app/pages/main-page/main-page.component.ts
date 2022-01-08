import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent extends PageComponent implements OnInit {

  constructor(titleService: Title) { 
    super(titleService);
    this.pageTitle = "Strona główna";
    this.isMainPage = true;
  }
}
