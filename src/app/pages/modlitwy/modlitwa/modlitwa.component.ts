import { Component, Input, OnInit } from '@angular/core';
import { apiLoaded, changeApiLoaded } from 'src/app/app.module';
import { PrayInterface } from 'src/app/interfaces/pray.interface';
import { Required } from 'src/app/shared/required.decorator';

@Component({
  selector: 'app-modlitwa',
  templateUrl: './modlitwa.component.html',
  styleUrls: ['./modlitwa.component.scss']
})
export class ModlitwaComponent implements OnInit {
  @Input() @Required pray: PrayInterface = {
    month: 0,
    year: 0,
    description: "Undefined",
    videoId: "Undefined"
  };

  month: string = "undefined";
  playerWidth: number = 1;
  playerHeight: number = 1;

  ngOnInit(): void {
    // Tego nie pisałem jakby co (w sensie nie całe (w sensie trochę z tego kodu napisałem))
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      changeApiLoaded(true); // dokładniej to
    }

    const d = new Date();
    d.setMonth(this.pray.month-1);
    this.month = d.toLocaleDateString("default", { month: "long" });
    this.month = this.month.charAt(0).toUpperCase() + this.month.substring(1);
    this.playerWidth = (document.getElementById("yt-player") as HTMLDivElement).clientWidth * 0.8;
    this.playerHeight = this.playerWidth * 0.6;
  }

}
