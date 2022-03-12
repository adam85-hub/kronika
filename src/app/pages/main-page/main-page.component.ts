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

    let yearNow = new Date().getFullYear();
    // Receives entries from api and adds first 3 to newestEntries
    this.entriesService.getEntriesByYear(yearNow).subscribe((response) => {
      response.forEach((entryInterface) => this.newestEntries.push(new EntryModel(entryInterface, undefined)));
      this.newestEntries.sort((a, b) => b.Date.valueOf() - a.Date.valueOf());
      this.newestEntries = this.newestEntries.slice(0, 3);
    });
  }
}
