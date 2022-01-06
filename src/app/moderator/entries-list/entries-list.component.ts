import { Component, HostListener, OnInit } from '@angular/core';
import { last } from 'rxjs';
import { EntryModel } from 'src/app/models/entry.model';
import { EntriesService } from 'src/app/services/entries.service';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss']
})
export class EntriesListComponent implements OnInit {
  years: number[] = [];
  entries: EntryModel[] = [];

  constructor(private entriesService: EntriesService) { }

  ngOnInit(): void {
    this.entriesService.getYears().pipe(last()).subscribe(response => {
      this.years = response.years.sort((a, b) => b - a);
      this.getEntries(this.years[0]);      
    });    
  }

  selectedYearChanged(e: Event) {
    let select = e.target as HTMLSelectElement;
    if(this.years.length != 0) {
      const selectedYear = this.years[select.selectedIndex];
      this.entries = [];
      this.getEntries(selectedYear);
    }    
  }

  getEntries(year: number) {
    this.entriesService.getEntriesByYear(year).pipe(last()).subscribe(response => {
      response.entries.forEach(entry => {
        this.entries.push(new EntryModel(entry, entry.Elements));
        this.entries.sort((a, b) => b.Date.getTime() - a.Date.getTime());
        this.onResize();
      })
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) { 
    let entriesList = document.getElementById("entries-list") as HTMLDivElement;
    entriesList.style.height = (window.innerHeight - entriesList.offsetTop - 10) + "px";
  }

  edit(entry: EntryModel): void {
    console.log(entry.id);
  }
}
