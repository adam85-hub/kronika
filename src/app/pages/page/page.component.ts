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
    if (this.isMainPage) this.titleService.setTitle("Kronika Parafii w Katowicach Podlesiu");
    else this.titleService.setTitle(this.pageTitle);
  }

}
