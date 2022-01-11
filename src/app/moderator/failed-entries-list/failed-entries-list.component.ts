import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PanelOptionComponent } from '../panel-option/panel-option.component';

@Component({
  selector: 'app-failed-entries-list',
  templateUrl: './failed-entries-list.component.html',
  styleUrls: ['./failed-entries-list.component.scss']
})
export class FailedEntriesListComponent extends PanelOptionComponent implements OnInit {

  constructor(titleService: Title) {
    super(titleService);
    this.title = "Zepsute wpisy";
   }

}
