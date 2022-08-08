import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ArticleComponent } from './article/article.component';
import { TitleComponent } from './title/title.component';
import { DialogComponent } from './dialog/dialog.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    LoadingComponent,
    ArticleComponent,
    TitleComponent,
    DialogComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    ArticleComponent,
    TitleComponent,
    DialogComponent,
    NotificationComponent
  ]
})
export class SharedModule { }
