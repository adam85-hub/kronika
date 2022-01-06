import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ArticleComponent } from './article/article.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [
    LoadingComponent,
    ArticleComponent,
    TitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    ArticleComponent,
    TitleComponent
  ]
})
export class SharedModule { }
