import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TitleComponent } from './shared/title/title.component';
import { ArticleComponent } from './shared/article/article.component';
import { KronikaComponent } from './pages/kronika/kronika.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Error404Component } from './pages/error404/error404.component';
import { PageComponent } from './pages/page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TitleComponent,
    ArticleComponent,
    KronikaComponent,
    Error404Component,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
