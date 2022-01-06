import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModeratorRoutingModule } from './moderator-routing.module';
import { PanelComponent } from './panel/panel.component';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PanelComponent,
    EntriesListComponent
  ],
  imports: [
    CommonModule,
    ModeratorRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ModeratorModule { }
