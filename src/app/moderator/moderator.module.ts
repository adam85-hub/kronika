import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ModeratorRoutingModule } from './moderator-routing.module';
import { PanelComponent } from './panel/panel.component';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { SharedModule } from '../shared/shared.module';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { TextareaFitContentDirective } from './textarea-fit-content.directive';

@NgModule({
  declarations: [
    PanelComponent,
    EntriesListComponent,
    EditEntryComponent,
    TextareaFitContentDirective
  ],
  imports: [
    CommonModule,
    ModeratorRoutingModule,
    FormsModule,
    SharedModule,
    DragDropModule
  ]
})
export class ModeratorModule { }
