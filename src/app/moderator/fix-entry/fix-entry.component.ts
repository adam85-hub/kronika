import { Component, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FailedEntryInterface } from 'src/app/interfaces/entry.interface';
import { SimpleDate } from 'src/app/models/date';
import { EntryModel } from 'src/app/models/entry.model';
import { ImageModel } from 'src/app/models/image.model';
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
  SafeUrl?: SafeResourceUrl;
  Photos: {index: number, url: string}[] = [{index: 1, url: "https://www.w3schools.com/images/colorpicker2000.png"}];

  constructor(private route: ActivatedRoute, titleService: Title, private entriesService: EntriesService, router: Router, auth: AuthenticationService,
  private sanitizer: DomSanitizer) { 
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
        this.SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.FailedEntry.url);
        this.Entry = new EntryModel({
          id: this.FailedEntry.id,
          Title: "",
          Date: new Date().toLocaleDateString(),
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
    if(this.Entry != undefined) this.Entry.Date = new SimpleDate(Number(dateT[2]), Number(dateT[1]), Number(dateT[0]));
  }

  addPhoto() {
    this.Photos.push({ index: this.Photos.length + 1, url: "" });
  }

  deletePhoto(index: number) {
    this.Photos = this.Photos.filter((photo) => {
      return photo.index != index;
    });
  }

  saveAndContinue() {
    if (this.Entry == undefined) throw Error("Entry cannot be null!");
    this.Entry.Elements = [];
    for(let photo of this.Photos)
      this.Entry.Elements.push(new ImageModel(photo.index, photo.url));      
  }
}