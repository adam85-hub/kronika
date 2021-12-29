import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EntryModel } from 'src/app/models/entry.model';
import { EntriesService } from 'src/app/services/entries.service';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-kronika',
  templateUrl: './kronika.component.html',
  styleUrls: ['./kronika.component.scss']
})
export class KronikaComponent extends PageComponent implements OnInit {
  override pageTitle: string = "Kronika";
  isLoading: boolean = false;
  entries: EntryModel[] = [];

  constructor(titleService: Title, private entriesService: EntriesService) {
    super(titleService);    
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.isLoading = true;
    this.entriesService.getEntriesByYear(2021).subscribe(response => {   
      console.log(response);
      response.entries.forEach(entry => {
        this.entries.push(new EntryModel(entry, entry.Elements));
      })
      this.entries.sort((b,a) => a.Date.valueOf() - b.Date.valueOf());
      this.isLoading = false;
    });
  }

}
