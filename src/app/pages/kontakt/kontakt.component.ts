import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.scss']
})
export class KontaktComponent extends PageComponent implements OnInit {
  override pageTitle: string = "Kontakt";

  constructor(titleService: Title) { 
    super(titleService);
  }

}
