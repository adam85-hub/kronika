import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EntryModel } from 'src/app/models/entry.model';
import { EntriesService } from 'src/app/services/entries.service';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent extends PageComponent implements OnInit {
  public newestEntries: EntryModel[] = [];

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
}
