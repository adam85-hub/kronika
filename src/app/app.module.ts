import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { KronikaComponent } from './pages/kronika/kronika.component';
import { Error404Component } from './pages/error404/error404.component';
import { PageComponent } from './pages/page/page.component';
import { ModeratorLoginComponent } from './pages/moderator-login/moderator-login.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { WpisComponent } from './pages/wpis/wpis.component';
import { SharedModule } from './shared/shared.module';
import { KontaktComponent } from './pages/kontakt/kontakt.component';
import { ResponsiveSidebarComponent } from './responsive-sidebar/responsive-sidebar.component';
import { ModlitwyComponent } from './pages/modlitwy/modlitwy.component';
import { ModlitwaComponent } from './pages/modlitwy/modlitwa/modlitwa.component';
import { PiosenkiComponent } from './pages/piosenki/piosenki.component';
import { PiosenkaComponent } from './pages/piosenki/piosenka/piosenka.component';
import { PhotoCarouselComponent } from './pages/wpis/photo-carousel/photo-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    KronikaComponent,
    Error404Component,
    PageComponent,
    ModeratorLoginComponent,
    WpisComponent,
    KontaktComponent,
    ResponsiveSidebarComponent,
    ModlitwyComponent,
    ModlitwaComponent,
    PiosenkiComponent,
    PiosenkaComponent,
    PhotoCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    YouTubePlayerModule,
    SharedModule
  ],
  providers: [
    CookieService,
    { provide:LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }


export var apiLoaded = false;
export function changeApiLoaded(state: boolean) {
  apiLoaded = state;
}
