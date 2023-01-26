import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { last } from 'rxjs';
import { EntryModel } from 'src/app/models/entry.model';
import { EntriesService } from 'src/app/services/entries.service';
import { PanelOptionComponent } from '../panel-option/panel-option.component';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss']
})
export class EntriesListComponent extends PanelOptionComponent implements OnInit {
  years: number[] = [];
  entries: EntryModel[] = [];
  deleteDialog: boolean = false;
  deleteLoading: boolean = false;
  entryToDeleteIndex?: number;

  constructor(private entriesService: EntriesService, private router: Router, titleService: Title) {
    super(titleService);
    this.title = "Wpisy";
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.entriesService.getYears().pipe(last()).subscribe(response => {
      this.years = response.sort((a, b) => b - a);
      this.getEntries(this.years[0]);
    });
  }

  selectedYearChanged(e: Event) {
    let select = e.target as HTMLSelectElement;
    if (this.years.length != 0) {
      const selectedYear = this.years[select.selectedIndex];
      this.entries = [];
      this.getEntries(selectedYear);
    }
  }

  getEntries(year: number) {
    this.entriesService.getEntriesByYear(year).pipe(last()).subscribe(response => {
      response.forEach(entry => {
        this.entries.push(new EntryModel(entry, entry.Elements));
        this.entries.sort((a, b) => b.Date.valueOf() - a.Date.valueOf());
        this.updatePageTitle(`wpisy ${year}`);        
      })
    });
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    const entriesList = document.getElementById("entries-list") as HTMLDivElement;
    const addEntryBtn = document.getElementById("btn-add-entry") as HTMLButtonElement;
    entriesList.style.height = (window.innerHeight - entriesList.offsetTop - 15 - addEntryBtn.offsetHeight) + "px";
  }

  edit(entry: EntryModel): void {
    this.router.navigateByUrl(`/moderator/edit/${entry.key}`);
  }

  openDeleteDialog(index: number) {
    if (this.entries[index] == undefined) throw Error(`Entry with index ${index} does not exist`);

    this.entryToDeleteIndex = index;
    this.deleteDialog = true;
  }

  deleteEntry() {
    if (this.entryToDeleteIndex == undefined) throw Error("Entry to delete is undefined");
    const key = this.entries[this.entryToDeleteIndex].key;
    if (key == undefined) throw Error("Unexpected behavior: key of selected entry is undefined");
    this.deleteLoading = true;

    this.entriesService.deleteEntry(key).subscribe((success) => {
      if (success) {
        if (this.entryToDeleteIndex == undefined) throw Error("Entry to delete is undefined");
        this.deleteLoading = false;
        this.deleteDialog = false;
        this.entries.splice(this.entryToDeleteIndex, 1);
        this.entryToDeleteIndex = undefined;
      }
      else {
        alert("An error occurred while deleting this entry.");
      }
    });
  }

  addEntry() {
    this.router.navigateByUrl("/moderator/edit/new");
  }
}
