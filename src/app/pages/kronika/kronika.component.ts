import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs';
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
  years: number[] = [];
  selectedYear?: number;

  constructor(titleService: Title, private entriesService: EntriesService, private router: Router, private route: ActivatedRoute) {
    super(titleService);     
  }

  override ngOnInit(): void {
    super.ngOnInit();    
    this.isLoading = true; 
    let year = this.route.snapshot.queryParamMap.get("year");
    if(year != null) {
      if(Number(year) != NaN) this.selectedYear = Number(year);
    }  
    this.setYearsToSelect();
  }

  public setYearsToSelect(): void {
    this.entriesService.getYears().pipe(last()).subscribe(response => {
      this.years = response.years;
      this.years.sort((a,b) => b - a);
      if(this.selectedYear === undefined || this.years.find(y => y === this.selectedYear) === undefined) this.selectedYear = this.years[0];
      this.getEntries();
    }, error => {
      this.isLoading = false;
    });
  }

  public getEntries() {
    this.isLoading = true;
    this.entries = [];
    if(this.selectedYear === undefined) throw new Error("Selected year is undefined");
    this.entriesService.getEntriesByYear(this.selectedYear).pipe(last()).subscribe(response => {  
      response.entries.forEach(entry => {
        this.entries.push(new EntryModel(entry, entry.Elements));
      })
      this.entries.sort((b,a) => a.Date.valueOf() - b.Date.valueOf());
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  public indexChanged(e: Event)
  {
    let select = (e.target as HTMLSelectElement);
    let index = select.selectedIndex;
    this.selectedYear = +select.options[index].value;
    this.getEntries();
  }

  toEntry(id: number) {
    this.router.navigateByUrl(`/kronika/${id}`);
  }
}
