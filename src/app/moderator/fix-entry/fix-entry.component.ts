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
      let id = params['id'];
      if(isNaN(id)) this.router.navigateByUrl("/error404"); 
      this.paramsLoaded.subscribe(id => this.loadEntry(id));
      this.paramsLoaded.emit(id);
    });
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.resizePhotosContainer();
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
          TitlePhoto: "",
          Elements: []
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

    let photo = event.target.files[0];

    if (this.UploadIndex != -1) this.Photos[this.UploadIndex].loading = true;
    
    this.entriesService.uploadPhoto(photo, this.Entry.id).subscribe((response) => {
      if (this.Entry == undefined) throw Error("Entry is undefined!"); 

      // Jeżeli index to -1 wtedy przypisujemy adres do zdjęcia tytułowego
      if (this.UploadIndex == -1) this.Entry.TitlePhoto = this.entriesService.entriesFolderUrl + this.Entry.id + "/" + response;
      else {
        this.Photos[this.UploadIndex].url = this.entriesService.entriesFolderUrl + this.Entry.id + "/" + response;
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
      this.router.navigateByUrl(`/moderator/edit/${response.id}`);
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