import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, last, throwError } from 'rxjs';
import { apiLoaded, changeApiLoaded } from 'src/app/app.module';
import { ElementInterface } from 'src/app/interfaces/element.interface';
import { FailedEntryInterface } from 'src/app/interfaces/entry.interface';
import { EntryModel } from 'src/app/models/entry.model';
import { EntriesService } from 'src/app/services/entries.service';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-wpis',
  templateUrl: './wpis.component.html',
  styleUrls: ['./wpis.component.scss']
})
export class WpisComponent extends PageComponent implements OnInit {
  paramsLoaded = new EventEmitter();
  entry?: EntryModel;
  failedEntry?: FailedEntryInterface;
  widthOfVideos: number = 500;
  heightOfVideos: number = 300;

  photoCarouselHidden: boolean = true;
  photos: ElementInterface[] = [];
  selectedPhoto: number = 0;

  constructor(private route: ActivatedRoute, title: Title, private router: Router, private entriesService: EntriesService) {     
    super(title);    
    this.pageTitle = `Wpis do kroniki`;          
  }

  override ngOnInit(): void {
      super.ngOnInit();    
      
      // Tego nie pisałem jakby co (w sensie nie całe (w sensie trochę kodu napisałem))
      if (!apiLoaded) {
        // This code loads the IFrame Player API code asynchronously, according to the instructions at
        // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
        changeApiLoaded(true); // dokładniej to
      }

      this.route.params.subscribe(params => {
        this.paramsLoaded.subscribe(key => this.loadEntry(key));
        this.paramsLoaded.emit(params["key"]);
      });    
  }

  loadEntry(key: string) : void {
    this.entriesService.getEntry(key).pipe(
      catchError(this.handleError), last()
    ).subscribe({next: (entry) => {
      if('url' in entry) {
        this.failedEntry = entry;
        this.entry = undefined;
      }
      else {        
        let elements = entry.Elements;
        if(elements != undefined) elements.sort((a,b) => a.index - b.index);
        this.entry = new EntryModel(entry, elements);  
        this.pageTitle = this.entry.Title; 
        super.updateTitle();
        this.failedEntry = undefined;
        for (let photo of this.entry.Elements) if (photo.type === "Image") this.photos.push(photo);
        setTimeout(() => this.onResize(), 100);
      }    
    },
      error: (e) => {
        this.router.navigateByUrl('/error404');
      }
    });
  }

  photoSelected(index: number) {
    if (this.entry == undefined) throw Error("Unexpected behavior: photo was clicked but entry is undefined.");

    const pIndex = this.entry.Elements[index].index;
    const selectedPhotoIndex = this.photos.findIndex((v) => v.index === pIndex);

    this.selectedPhoto = selectedPhotoIndex;
    this.photoCarouselHidden = false;    
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error("Wpis o takim id nie istnieje!"));
  }

  getVideoId(url: string): string {
    if(url.startsWith("/")) {
      return url.substring(1);
    }
    let re = /embed\//;
    let id = url.split(re)[1];    
    return id;
  }

  paragraphToHtml(p: string): string {
    const links = [...p.matchAll(/\([^\{\}\(\)]+\)\{[^\{\}\(\)]+\}/g)];
    for (const match of links) {
      const text = match[0];
      const title = text.match(/\(.+\)/)![0].replace(/[\(\)]/g, "");
      const href = text.match(/\{.+\}/)![0].replace(/[\{\}]/g, "");

      p = p.replace(/\([^\{\}\(\)]+\)\{[^\{\}\(\)]+\}/, `<a href="${href}" target="_blank">${title}</a>`);
    }
    
    const bolds = [...p.matchAll(/\*[^\*]+\*/g)];
    for (const match of bolds) {
      const text = match[0].replace(/\*/g, "");

      p = p.replace(/\*[^\*]+\*/, `<b>${text}</b>`)
    }

    const cursives = [...p.matchAll(/%[^%]+%/g)];
    for (const match of cursives) {
      const text = match[0].replace(/%/g, "");

      p = p.replace(/%[^%]+%/, `<i>${text}</i>`)
    }

    p = p.replace(/\\n/g, "<br/>");

    return p;
  }

  @HostListener('window:resize')
  onResizeEvent() {
    this.onResize();
  }

  onResize() {
    let el_section = document.getElementById("elements-section");
    if(el_section != null) { 
      this.widthOfVideos = el_section?.clientWidth - 0.3 * el_section?.clientWidth;
      this.heightOfVideos = this.widthOfVideos / 1.618;
    }
  }  

  return() {
    this.router.navigate(["kronika"], {relativeTo: this.route.parent, queryParams: {year: this.entry?.Date.getYear()}});
  }
}
