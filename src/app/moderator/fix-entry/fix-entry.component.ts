import { AfterViewInit, Component, EventEmitter, HostListener, OnInit } from '@angular/core';
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
  Photos: {index: number, url: string, loading: boolean}[] = [];
  ExitDialog = false;
  UploadIndex = 0;

  constructor(private route: ActivatedRoute, titleService: Title, private entriesService: EntriesService, router: Router, auth: AuthenticationService,
  private sanitizer: DomSanitizer) { 
    super(titleService, auth, router);
    this.pageTitle = "Naprawianie wydarzenia - Kronika Parafii";
    this.FailedEntry = undefined;
    this.Entry = undefined;
  }  

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe((params) => {
      let key = params['key'];
      this.paramsLoaded.subscribe(key => this.loadEntry(key));
      this.paramsLoaded.emit(key);
    });
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.resizePhotosContainer();
  }

  loadEntry(key: string) {
    this.entriesService.getEntry(key).subscribe((response) => {
      if('url' in response) {
        this.FailedEntry = response;
        this.SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.FailedEntry.url);
        this.Entry = new EntryModel({
          key: this.FailedEntry.key,
          Title: "",
          Date: new Date().toLocaleDateString(),
          TitlePhoto: "",
          Elements: []
        })
      }
      else {
        this.router.navigateByUrl(`/moderator/edit/${key}`);
      }
    });
  }
  
  setDate(date: string) {
    let dateT = date.split("-");
    if(this.Entry != undefined) this.Entry.Date = new SimpleDate(Number(dateT[2]), Number(dateT[1]), Number(dateT[0]));
  }

  addPhoto() {
    this.Photos.push({ index: this.Photos.length + 1, url: "", loading: false });

    if (this.Photos.length === 1) {
      setTimeout(() => this.resizePhotosContainer(), 10);
    }
    else this.resizePhotosContainer();
  }

  deletePhoto(index: number) {
    this.Photos = this.Photos.filter((photo) => {
      return photo.index != index;
    });
  }

  uploadPhoto(index: number) {
    this.UploadIndex = index;

    const fileDialog = document.getElementById("file-dialog") as HTMLInputElement;
    fileDialog.click();
  }

  onFileSelected(event: any) {
    if (this.Entry == undefined) throw Error("Entry is undefined!");
    if (this.Entry.key == undefined) throw Error("Entry key is undefined!");

    let photo = event.target.files[0];

    if (this.UploadIndex != -1) this.Photos[this.UploadIndex].loading = true;
    
    this.entriesService.uploadPhoto(photo, this.Entry.key).subscribe((response) => {
      if (this.Entry == undefined) throw Error("Entry is undefined!"); 

      // Jeżeli index to -1 wtedy przypisujemy adres do zdjęcia tytułowego
      if (this.UploadIndex == -1) this.Entry.TitlePhoto = this.entriesService.photosUrl + response.filename;
      else {
        this.Photos[this.UploadIndex].url = this.entriesService.photosUrl + response.filename;
        this.Photos[this.UploadIndex].loading = false;
      }
    });
  }

  saveAndContinue() {
    if (this.Entry == undefined) throw Error("Entry cannot be null!");
    this.Entry.Elements = [];
    for(let photo of this.Photos)
      this.Entry.Elements.push(new ImageModel(photo.index, photo.url));      
    
    this.entriesService.modifyEntry(this.Entry.toInterface()).subscribe((response) => {
      this.router.navigateByUrl(`/moderator/edit/${response.key}`);
    });
  }

  exit() {
    this.router.navigateByUrl("/moderator/panel/failed-entries");
  }

  resizePhotosContainer() {
    const photosContainer = document.querySelector("#photos-container") as HTMLDivElement;
    const container = document.querySelector("#component-container") as HTMLDivElement;
    photosContainer.style.height = (container.clientHeight - photosContainer.offsetTop - 52) + "px";
  }
}
