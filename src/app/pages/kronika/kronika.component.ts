import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Entry } from 'src/app/models/entry.model';
import { EntriesService } from 'src/app/services/entries.service';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-kronika',
  templateUrl: './kronika.component.html',
  styleUrls: ['./kronika.component.scss']
})
export class KronikaComponent extends PageComponent implements OnInit {
  override pageTitle: string = "Kronika";
  entries: Entry[] = [];
  isLoading: boolean = false;

  constructor(titleService: Title, private entriesService: EntriesService) {
    super(titleService);    
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.isLoading = true;
    this.entriesService.getEntries().subscribe(entries => {
      this.entries = entries;
      this.isLoading = false;
    });
  }

}
