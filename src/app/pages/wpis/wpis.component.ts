import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, last, throwError } from 'rxjs';
import { apiLoaded, changeApiLoaded } from 'src/app/app.module';
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
  id: number = 1;
  entry?: EntryModel;
  failedEntry?: FailedEntryInterface;
  widthOfVideos: number = 500;
  heightOfVideos: number = 300;

  constructor(private route: ActivatedRoute, private title: Title, private router: Router, private entriesService: EntriesService) {     
    super(title);    
    this.pageTitle = `Wpis do kroniki`;          
  }

  override ngOnInit(): void {
      super.ngOnInit();    
      
      // Tego nie pisałem jakby co (w sensie nie całe (w sensie trochę z tego kodu napisałem))
      if (!apiLoaded) {
        // This code loads the IFrame Player API code asynchronously, according to the instructions at
        // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
        changeApiLoaded(true); // dokładniej to
      }

      this.route.params.subscribe(params => {
        if(isNaN(params["id"])) this.router.navigateByUrl('/error404');
        this.id = params["id"];
        this.paramsLoaded.subscribe(() => this.loadEntry());
        this.paramsLoaded.emit();
      });       
  }

  loadEntry() : void {
    this.entriesService.getEntry(this.id).pipe(
      catchError(this.handleError), last()
    ).subscribe((entry) => {
      if('url' in entry) {
        this.failedEntry = entry;
        this.entry = undefined;
      }
      else {
        let elements = entry.Elements;
        if(elements != undefined) elements.sort((a,b) => a.index - b.index);
        this.entry = new EntryModel(entry, elements);  
        this.failedEntry = undefined;
        setTimeout(() => this.onResize(), 1000);
      }    
    });
  }

  handleError(error: HttpErrorResponse) {
    if(error.status == 404)
    {      
    }

    return throwError(() => new Error("Wpis o takim id nie istnieje!"));
  }

  getVideoId(url: string): string {
    let re = /embed\//;
    let id = url.split(re)[1];
    return id;
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
}
