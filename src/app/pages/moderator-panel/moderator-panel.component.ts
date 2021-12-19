import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-moderator-panel',
  templateUrl: './moderator-panel.component.html',
  styleUrls: ['./moderator-panel.component.scss']
})
export class ModeratorPanelComponent extends PageComponent implements OnInit {
  override pageTitle: string = "Panel Moderatora";


  constructor(titleService: Title) {
      super(titleService);
   }

}
