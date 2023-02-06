import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { last, throwIfEmpty } from 'rxjs';
import { EntryModel } from 'src/app/models/entry.model';
import { CachingService } from 'src/app/services/caching.service';
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
  years: number[] = [];
  selectedYear?: number;

  constructor(titleService: Title, private entriesService: EntriesService, private router: Router, private route: ActivatedRoute, private cachingService: CachingService) {
    super(titleService);     
  }

  override ngOnInit(): void {
    super.ngOnInit();    
    this.isLoading = true; 
    let year = this.route.snapshot.queryParamMap.get("year");
    if(year != null) {
      this.selectedYear = Number(year);
    }  
    this.setYearsToSelect();
  }

  public setYearsToSelect(): void {
    const cachedYears = this.cachingService.get("years");
    if (cachedYears !== false) {
      this.years = cachedYears;
      if (this.selectedYear == undefined || this.years.find(y => y == this.selectedYear) == undefined) this.selectedYear = this.years[0];
      this.getEntries();  

      setTimeout(() => {
        if (this.selectedYear == undefined) throw Error("Something went wrong (selectedYear is undefined)");
        const selectEl = (document.querySelector("#year-selector") as HTMLSelectElement);
        selectEl.value = this.selectedYear.toString();
      }, 100);
      return;
    }

    this.entriesService.getYears().pipe(last()).subscribe(response => {
      this.years = response;
      this.years.sort((a,b) => b - a);
      if (this.selectedYear === undefined || this.years.find(y => y === this.selectedYear) === undefined) this.selectedYear = this.years[0];
      this.getEntries();  

      this.cachingService.set("years", this.years, 3);

      setTimeout(() => {
        if (this.selectedYear == undefined) throw Error("Something went wrong (selectedYear is undefined)");
        const selectEl = (document.querySelector("#year-selector") as HTMLSelectElement);
        selectEl.value = this.selectedYear.toString();
      }, 100);
    }, error => {
      this.isLoading = false;
    });
  }

  public getEntries() {
    this.isLoading = true;
    this.entries = [];
    if (this.selectedYear === undefined) throw new Error("Selected year is undefined");

    const cachedEntries = this.cachingService.get(`entries${this.selectedYear}`);
    if (cachedEntries !== false) {
      this.isLoading = false;
      this.entries = cachedEntries;
      return;
    }

    this.entriesService.getEntriesByYear(this.selectedYear).pipe(last()).subscribe(response => {  
      response.forEach(entry => {
        this.entries.push(new EntryModel(entry, entry.Elements));
      })
      this.entries.sort((b, a) => a.Date.valueOf() - b.Date.valueOf());
      
      this.cachingService.set(`entries${this.selectedYear}`, this.entries, 3);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  //On selected year changed
  public indexChanged(e: Event)
  {
    let select = (e.target as HTMLSelectElement);
    let index = select.selectedIndex;
    this.selectedYear = +select.options[index].value;
    this.getEntries();
  }

  toEntry(key?: string) {
    if (key == undefined) throw Error("Unexpected behavior: key of selected entry is undefined");

    this.router.navigateByUrl(`/kronika/${key}`);
  }
}
