import { Component, EventEmitter, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs';
import { EntryModel } from 'src/app/models/entry.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EntriesService } from 'src/app/services/entries.service';
import { ModeratorComponent } from '../moderator.component';
import { FailedEntryInterface } from '../../interfaces/entry.interface';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.scss']
})
export class EditEntryComponent extends ModeratorComponent implements OnInit {
  paramsLoaded = new EventEmitter();
  entry?: EntryModel;
  failedEntry?: FailedEntryInterface;
  exitDialog = false;

  constructor(private route: ActivatedRoute, titleService: Title, private router: Router, private auth: AuthenticationService, private entriesService: EntriesService) { 
    super(titleService);
    this.pageTitle = "Edycja wydarzenia";
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.params.subscribe(params => {
      let id = params['id'];
      if(isNaN(id)) this.router.navigateByUrl("/error404"); 
      this.paramsLoaded.subscribe(id => this.loadEntry(id));
      this.paramsLoaded.emit(id);
    });
  }

  loadEntry(id: number) {    
    this.entriesService.getEntry(id).pipe(last()).subscribe(response => {     
      if('Title' in response) {
        this.entry = new EntryModel(response, response.Elements);
        this.failedEntry = undefined;
      }
      else {
        this.failedEntry = response;
        this.entry = undefined;
      }
    });
  }

  exitClicked() {
    this.router.navigateByUrl("/moderator/panel/entries");
  }
}
