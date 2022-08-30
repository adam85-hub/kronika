import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { apiLoaded, changeApiLoaded } from 'src/app/app.module';
import { PrayVideoInterface } from 'src/app/interfaces/prayVideo.interface';
import { CachingService } from 'src/app/services/caching.service';
import { PraysService } from 'src/app/services/prays.service';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-piosenki',
  templateUrl: './piosenki.component.html',
  styleUrls: ['./piosenki.component.scss']
})
export class PiosenkiComponent extends PageComponent implements OnInit {
  prayVideos: PrayVideoInterface[] = [];

  constructor(titleService: Title, private prayService: PraysService, private cachingService: CachingService) {
    super(titleService);
    this.pageTitle = "Modlitwy i uwielbienie";
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

    let cachedPrayVideos = this.cachingService.get("prayvideos");
    if (cachedPrayVideos != false) {
      this.prayVideos = cachedPrayVideos;
      return;
    }

    this.prayService.getPrayVideos().subscribe((response) => {
      this.prayVideos = response;
      this.cachingService.set("prayvideos", this.prayVideos, 10);
    })
  }

}
