import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { last } from 'rxjs';
import { FailedEntryInterface } from 'src/app/interfaces/entry.interface';
import { EntriesService } from 'src/app/services/entries.service';
import { PanelOptionComponent } from '../panel-option/panel-option.component';

@Component({
  selector: 'app-failed-entries-list',
  templateUrl: './failed-entries-list.component.html',
  styleUrls: ['./failed-entries-list.component.scss']
})
export class FailedEntriesListComponent extends PanelOptionComponent implements OnInit {
  failedEntries: FailedEntryInterface[] = [];

  constructor(titleService: Title, private entriesService: EntriesService, private router: Router) {
    super(titleService);
    this.title = "Zepsute wpisy";
  }

  override ngOnInit(): void {
      super.ngOnInit();
      this.entriesService.getFailedEntries().subscribe((response) => {
        this.failedEntries = response;
        setTimeout(() => this.onResize(), 10);        
      });     
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) { 
    let entriesList = document.getElementById("failed-entries-list-container") as HTMLDivElement;
    entriesList.style.height = (window.innerHeight - entriesList.offsetTop - 10) + "px";
  }

  fixEntry(id: number) {
    this.router.navigateByUrl(`/moderator/fix/${id}`);
  }
}
