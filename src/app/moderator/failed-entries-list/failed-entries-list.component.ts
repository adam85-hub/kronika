import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EntriesService } from 'src/app/services/entries.service';
import { PanelOptionComponent } from '../panel-option/panel-option.component';

@Component({
  selector: 'app-failed-entries-list',
  templateUrl: './failed-entries-list.component.html',
  styleUrls: ['./failed-entries-list.component.scss']
})
export class FailedEntriesListComponent extends PanelOptionComponent implements OnInit {

  constructor(titleService: Title, private entriesService: EntriesService) {
    super(titleService);
    this.title = "Zepsute wpisy";
  }

  override ngOnInit(): void {
      super.ngOnInit();
      this.entriesService;//! Get failed entries (i must implement it on server)
  }

}
