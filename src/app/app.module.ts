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
import { TitleComponent } from './shared/title/title.component';
import { ArticleComponent } from './shared/article/article.component';
import { KronikaComponent } from './pages/kronika/kronika.component';
import { Error404Component } from './pages/error404/error404.component';
import { PageComponent } from './pages/page/page.component';
import { ModeratorLoginComponent } from './pages/moderator-login/moderator-login.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { WpisComponent } from './pages/wpis/wpis.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TitleComponent,
    ArticleComponent,
    KronikaComponent,
    Error404Component,
    PageComponent,
    ModeratorLoginComponent,
    LoadingComponent,
    WpisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    YouTubePlayerModule
  ],
  providers: [
    CookieService,
    { provide:LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export var apiLoaded = false;
export function changeApiLoaded(state: boolean) {
  apiLoaded = state;
}