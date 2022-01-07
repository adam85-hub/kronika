import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModeratorRoutingModule } from './moderator-routing.module';
import { PanelComponent } from './panel/panel.component';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { SharedModule } from '../shared/shared.module';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { DialogComponent } from './dialog/dialog.component';
import { TextareaFitContentDirective } from './textarea-fit-content.directive';


@NgModule({
  declarations: [
    PanelComponent,
    EntriesListComponent,
    EditEntryComponent,
    DialogComponent,
    TextareaFitContentDirective
  ],
  imports: [
    CommonModule,
    ModeratorRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ModeratorModule { }
