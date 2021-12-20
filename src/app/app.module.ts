import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TitleComponent } from './shared/title/title.component';
import { ArticleComponent } from './shared/article/article.component';
import { KronikaComponent } from './pages/kronika/kronika.component';
import { Error404Component } from './pages/error404/error404.component';
import { PageComponent } from './pages/page/page.component';
import { ModeratorLoginComponent } from './pages/moderator-login/moderator-login.component';
import { ModeratorPanelComponent } from './pages/moderator-panel/moderator-panel.component';
import { LoadingComponent } from './shared/loading/loading.component';

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
    ModeratorPanelComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
