import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModeratorRoutingModule } from './moderator-routing.module';
import { PanelComponent } from './panel/panel.component';
import { EntriesListComponent } from './entries-list/entries-list.component';


@NgModule({
  declarations: [
    PanelComponent,
    EntriesListComponent
  ],
  imports: [
    CommonModule,
    ModeratorRoutingModule,
    FormsModule
  ]
})
export class ModeratorModule { }
