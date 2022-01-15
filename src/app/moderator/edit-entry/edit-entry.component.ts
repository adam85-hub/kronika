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

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.scss']
})
export class EditEntryComponent extends ModeratorComponent implements OnInit {
  paramsLoaded = new EventEmitter();
  entry?: EntryModel;
  orginalEntry?: EntryInterface;

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
      }
      else {
        this.router.navigateByUrl(`/moderator/fix/${id}`);
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
    if(this.orginalEntry === undefined) throw Error("Coś jest nie tak (orginalEntry = undefined)");
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

    this.addElementDialog = false;    
  }

  deleteElement(index: number): void {
    this.entry?.Elements.splice(index, 1);
    this.entry?.Elements.forEach((element, index) => {
      element.index = index +1;
    });    
  }

  saveChanges() {
    if(this.entry != undefined) {
      this.entriesService.modifyEntry(this.entry.toInterface()).subscribe((response) => {
        this.router.navigateByUrl("/moderator/panel");
      });
    }
  }

  setDate(date: string) {
    let dateT = date.split("-");
    if(this.entry != undefined) this.entry.Date = new Date(Number(dateT[0]), Number(dateT[1]), Number(dateT[2]));
  }

  pastedToVideo(index: number) {
    setTimeout(() => {
      if(this.entry != undefined) {
        let videoI = this.entry.Elements.findIndex((element) => element.index === index);
        let link = this.entry.Elements[videoI].getAttr();
        let indexs = link.indexOf("?v=");
        let newValue = "/" + link.substring(indexs+3);
        this.entry.Elements[videoI].setAttr(newValue); 
      }
    }, 10);    
  }
}