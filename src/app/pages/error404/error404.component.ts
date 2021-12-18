import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component extends PageComponent implements OnInit {
  url: string = "undefined";
  override pageTitle: string = "Error 404";

  constructor(titleService: Title) { 
    super(titleService);
  }

}
