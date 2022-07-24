import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PanelOptionComponent } from '../panel-option/panel-option.component';

@Component({
  selector: 'app-edit-main-page',
  templateUrl: './edit-main-page.component.html',
  styleUrls: ['./edit-main-page.component.scss']
})
export class EditMainPageComponent extends PanelOptionComponent implements OnInit {

  constructor(titleService: Title) { 
    super(titleService);
    super.title = "Edycja strony głównej";
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
