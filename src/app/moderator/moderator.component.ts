import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageComponent } from 'src/app/pages/page/page.component';

@Component({
  selector: 'app-panel',
  template: ``,
  styles: []
})
export class ModeratorComponent extends PageComponent implements OnInit {

  constructor(titleService: Title) {
    super(titleService);
    this.isModerator = true;
  }

}
