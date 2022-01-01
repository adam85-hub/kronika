import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page',
  template: ``,
  styles: []
})
export class PageComponent implements OnInit {
  protected isMainPage: boolean = false;
  pageTitle: string = "Page";
  isModerator: boolean = false;

  
  constructor(private titleService: Title) { }
  
  ngOnInit(): void {
    this.setTitle();
  }
  
  public isMain(): boolean {
    return this.isMainPage;
  }
  
  setTitle() {
    this.titleService.setTitle(this.pageTitle); //+ " - Parafia Katowice Podlesie");
  }

}
