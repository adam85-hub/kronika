import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EntryInterface } from 'src/app/interfaces/entry.interface';
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

  constructor(titleService: Title, private entriesService: EntriesService) {
    super(titleService);    
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.isLoading = true;
    this.entriesService.getEntries().subscribe(response => {     
      this.isLoading = false;
    });
  }

}
