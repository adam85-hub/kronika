import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EntryModel } from 'src/app/models/entry.model';
import { CachingService } from 'src/app/services/caching.service';
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
    if (this.articleOpened) {
      if(window.innerWidth < 550) setTimeout(() => this.detectorRef.detectChanges(), 600);
      return {
        "height": (this.articleTextEl?.nativeElement as HTMLParagraphElement).clientHeight + "px",
        "padding": "10px"
      };
    } 
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

  constructor(titleService: Title, private entriesService: EntriesService, private detectorRef: ChangeDetectorRef, private cachingService: CachingService) { 
    super(titleService);
    this.pageTitle = "Strona główna";
    this.isMainPage = true;
  }

  override ngOnInit(): void {
    super.ngOnInit();

    const newestEntries = this.cachingService.get("newestentries");
    if (newestEntries !== false) {
      this.newestEntries = newestEntries;
      return;
    }

    // Receives 3 newest entries from api
    this.entriesService.getNewestEntries().subscribe((response) => {
      response.forEach((entryInterface) => this.newestEntries.push(new EntryModel(entryInterface, undefined)));
      this.newestEntries.sort((a, b) => b.Date.valueOf() - a.Date.valueOf());

      this.cachingService.set("newestentries", this.newestEntries, 3);
    });
    
  }

  toggleHistoryMobile() {
    this.articleOpened = !this.articleOpened;
  }
}
