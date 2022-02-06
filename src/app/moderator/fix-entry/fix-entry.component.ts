import { Component, EventEmitter, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FailedEntryInterface } from 'src/app/interfaces/entry.interface';
import { EntryModel } from 'src/app/models/entry.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EntriesService } from 'src/app/services/entries.service';
import { ModeratorComponent } from '../moderator.component';

@Component({
  selector: 'app-fix-entry',
  templateUrl: './fix-entry.component.html',
  styleUrls: ['./fix-entry.component.scss']
})
export class FixEntryComponent extends ModeratorComponent implements OnInit {
  paramsLoaded = new EventEmitter();
  FailedEntry?: FailedEntryInterface;
  Entry?: EntryModel;

  constructor(private route: ActivatedRoute, titleService: Title, private entriesService: EntriesService, router: Router, auth: AuthenticationService) { 
    super(titleService, auth, router);
    this.FailedEntry = undefined;
    this.Entry = undefined;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe((params) => {
      let id = params['id'];
      if(isNaN(id)) this.router.navigateByUrl("/error404"); 
      this.paramsLoaded.subscribe(id => this.loadEntry(id));
      this.paramsLoaded.emit(id);
    });
  }

  loadEntry(id: number) {
    this.entriesService.getEntry(id).subscribe((response) => {
      if('url' in response) {
        this.FailedEntry = response;
        this.Entry = new EntryModel({
          id: this.FailedEntry.id,
          Title: "",
          Date: "",
          TitlePhoto: ""
        })
      }
      else {
        this.router.navigateByUrl(`/moderator/edit/${id}`);
      }
    });
  }
  
  setDate(date: string) {
    let dateT = date.split("-");
    if(this.Entry != undefined) this.Entry.Date = new Date(Number(dateT[0]), Number(dateT[1]), Number(dateT[2]));
  }
}