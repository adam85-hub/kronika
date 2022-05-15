import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PanelOptionComponent } from '../panel-option/panel-option.component';

@Component({
  selector: 'app-prays-list',
  templateUrl: './prays-list.component.html',
  styleUrls: ['./prays-list.component.scss']
})
export class PraysListComponent extends PanelOptionComponent implements OnInit {

  constructor(title: Title) { 
    super(title);
    this.title = "Modlitwy";
  }

}
