import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EntryModel } from 'src/app/models/entry.model';
import { EntriesService } from 'src/app/services/entries.service';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent extends PageComponent implements OnInit {
  public newestEntries: EntryModel[] = [];
  
  articleOpened: boolean = false;

  @ViewChild('articleText') articleTextEl?: ElementRef;

  public get articleStyle() {
    if (this.articleOpened) return {
      "height": (this.articleTextEl?.nativeElement as HTMLParagraphElement).clientHeight + "px",
      "padding": "10px"
    };
    else return {
      "height": "0px",
      "padding": "0px"
    };
  }

  public get arrowStyle() {
    return {
      "transform": `rotate(${this.articleOpened ? "180deg" : "0deg"})`
    };
  }

  constructor(titleService: Title, private entriesService: EntriesService) { 
    super(titleService);
    this.pageTitle = "Strona główna";
    this.isMainPage = true;
  }

  override ngOnInit(): void {
    super.ngOnInit();

    // Receives 3 newest entries from api
    this.entriesService.getNewestEntries().subscribe((response) => {
      response.forEach((entryInterface) => this.newestEntries.push(new EntryModel(entryInterface, undefined)));
      this.newestEntries.sort((a, b) => b.Date.valueOf() - a.Date.valueOf());
    });
    
  }

  toggleHistoryMobile() {
    this.articleOpened = !this.articleOpened;
  }
}
