import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-panel-option',
  template: ``,
  styles: []
})
export class PanelOptionComponent implements OnInit {  
  protected title = "Undefined";

  constructor(private titleService: Title) {
    
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.formatTitle());
  }

  updatePageTitle(newTitle: string) {
    this.title = newTitle;
    this.titleService.setTitle(this.formatTitle());
  }

  private formatTitle(): string {
    let formatedTitle = this.title.toLowerCase();
    formatedTitle = formatedTitle.substring(0,1).toUpperCase() + formatedTitle.substring(1);
    return "Panel moderatora - " + formatedTitle;
  }
}
