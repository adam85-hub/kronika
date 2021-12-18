import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page',
  template: ``,
  styles: []
})
export class PageComponent implements OnInit {
  isMainPage: boolean = false;
  pageTitle: string = "Page";

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.setTitle();
  }

  setTitle() {
    this.titleService.setTitle(this.pageTitle); //+ " - Parafia Katowice Podlesie");
  }

}
