import { Component, EventEmitter, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs';
import { EntryModel } from 'src/app/models/entry.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EntriesService } from 'src/app/services/entries.service';
import { ModeratorComponent } from '../moderator.component';
import { EntryInterface } from '../../interfaces/entry.interface';
import { ParagraphModel } from 'src/app/models/paragraph.model';
import { ImageModel } from 'src/app/models/image.model';
import { VideoModel } from 'src/app/models/video.model';
import { SimpleDate } from 'src/app/models/date';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.scss']
})
export class EditEntryComponent extends ModeratorComponent implements OnInit {
  paramsLoaded = new EventEmitter();
  entry?: EntryModel;
  orginalEntry?: EntryInterface;
  pLoading: boolean[] = [];
  imageUploadIndex: number = 0;

  exitDialog = false;
  addElementDialog = false;

  constructor(private route: ActivatedRoute, titleService: Title, router: Router, auth: AuthenticationService, private entriesService: EntriesService) { 
    super(titleService, auth, router);
    this.pageTitle = "Edycja wydarzenia";    
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id == "new") {
        const now = new Date();
        this.entriesService.postEntry({
          id: 0,
          Title: "Nowe Wydarzenie!",
          TitlePhoto: "",
          Date: new SimpleDate(now.getDate(), now.getMonth(), now.getFullYear()).toDateString("d.m.y"),
          Elements: [new ParagraphModel(1, "")]
        }).subscribe((response) => {
          this.router.navigateByUrl(`/moderator/edit/${response.id}`);
        });
        return;
      }
      
      if(isNaN(id)) this.router.navigateByUrl("/error404"); 
      this.paramsLoaded.subscribe(id => this.loadEntry(id));
      this.paramsLoaded.emit(id);      
    });
  }

  loadEntry(id: number) {    
    this.entriesService.getEntry(id).pipe(last()).subscribe(response => {     
      if('Title' in response) {
        this.entry = new EntryModel(response, response.Elements);         
        this.orginalEntry = response;
        if(response.Elements != undefined)
          for (const element of response.Elements) {
            this.pLoading.push(false);
          }
      }
      else {
        this.router.navigateByUrl(`/moderator/fix/${id}`);
      }
    }, (error) => {
      if (error.status === 404) {
        this.router.navigateByUrl("/error404");
      }
    });
  }

  exitClicked() {
    this.router.navigateByUrl("/moderator/panel/entries");
  }

  elementDrop(e: any) {
    if(this.entry?.Elements != null) {
      this.entry.MoveElement(e.previousIndex, e.currentIndex);
    }
  }

  revertChanges() {
    if(this.orginalEntry === undefined) throw Error("Something is wrong (orginalEntry is undefined)");
    this.entry = new EntryModel(this.orginalEntry, this.orginalEntry?.Elements);
  }

  addNewElement() {
    let select = (document.getElementById("elementTypeSelect") as HTMLSelectElement);
    if(select.selectedIndex === 0) {
      this.entry?.Elements.push(new ParagraphModel(this.entry.Elements.length+1, ""));
    }
    else if(select.selectedIndex === 1) {
      this.entry?.Elements.push(new ImageModel(this.entry.Elements.length+1, ""));
    }
    else if(select.selectedIndex === 2) {
      this.entry?.Elements.push(new VideoModel(this.entry.Elements.length+1, ""));
    }

    this.addElementDialog = false;  // Hides add element dialog
  }

  deleteElement(index: number): void {    
    this.entry?.Elements.splice(index, 1);
    this.pLoading.splice(index, 1);
    this.entry?.Elements.forEach((element, index) => {
      element.index = index +1;
    });    
  }

  private addElement(element: ImageModel | ParagraphModel | VideoModel) {
    this.entry?.Elements.push(element);
    this.pLoading.push(false);
  }

  saveChanges() {
    if (this.entry != undefined) {
      this.entriesService.modifyEntry(this.entry.toInterface()).subscribe((response) => {
        this.router.navigateByUrl("/moderator/panel");
      });
    }
    else throw Error("Entry is undefined");
  }

  setDate(date: string) {
    let dateT = date.split("-");
    if (this.entry != undefined) this.entry.Date = new SimpleDate(Number(dateT[2]), Number(dateT[1]), Number(dateT[0]));
    else throw Error("Entry is undefined");
  }

  pastedToVideo(index: number) {
    setTimeout(() => {
      if(this.entry != undefined) {
        let videoI = this.entry.Elements.findIndex((element) => element.index === index);
        let link = this.entry.Elements[videoI].getAttr();
        let index = link.indexOf("?v=");
        let newValue = "/" + link.substring(index+3);
        this.entry.Elements[videoI].setAttr(newValue); 
      }
    }, 10);    
  }

  uploadPhoto(elementIndex: number) {
    let fileDialog = (document.querySelector("#file-dialog") as HTMLInputElement);
    this.imageUploadIndex = elementIndex;
    fileDialog.click();
  }

  onFileSelected(event: any): void {
    if (this.entry == undefined) throw Error("Entry is undefined");
    this.pLoading[this.imageUploadIndex] = true;

    if (event.target.files.length > 1) {
      let i = 0;
      console.log("Multiple...");
      for (const photo of event.target.files) {
        this.entriesService.uploadPhoto(photo, this.entry.id).subscribe((response) => {
          if (this.entry == undefined) throw Error("Entry is undefined");

          i++;
          const imageUrl = `${this.entriesService.entriesFolderUrl}${this.entry.id}/${response}`;
          if (i == 1) this.entry.Elements[this.imageUploadIndex].setAttr(imageUrl);
          else {
            this.addElement(new ImageModel(this.entry.Elements.length + 1, imageUrl));
            this.entry.MoveElement(this.entry.Elements.length, this.imageUploadIndex + i-1);
          }

          if (i == event.target.files.length) this.pLoading[this.imageUploadIndex] = false;
        });
      }
      return;
    }

    let photo = event.target.files[0];    
    this.entriesService.uploadPhoto(photo, this.entry.id).subscribe((response) => {
      if (this.entry == undefined) throw Error("Entry is undefined");

      const imageUrl = `${this.entriesService.entriesFolderUrl}${this.entry.id}/${response}`;

      // Jeżeli indeks jest równy -1 to ustawiamy zdjęcie tytułowe
      if (this.imageUploadIndex == -1) this.entry.TitlePhoto = imageUrl;
      else this.entry.Elements[this.imageUploadIndex].setAttr(imageUrl);
      this.pLoading[this.imageUploadIndex] = false;
    });      
  }  
}
