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
import { FailedEntriesListComponent } from './failed-entries-list/failed-entries-list.component';
import { PanelOptionComponent } from './panel-option/panel-option.component';
import { FixEntryComponent } from './fix-entry/fix-entry.component';
import { PraysListComponent } from './prays-list/prays-list.component';
import { FillHeightDirective } from './directives/fill-height.directive';
import { EditPrayComponent } from './edit-pray/edit-pray.component';
import { LogsTileComponent } from './panel/logs-tile/logs-tile.component';


@NgModule({
  declarations: [
    PanelComponent,
    EntriesListComponent,
    EditEntryComponent,
    TextareaFitContentDirective,
    FailedEntriesListComponent,
    PanelOptionComponent,
    FixEntryComponent,
    PraysListComponent,
    FillHeightDirective,
    EditPrayComponent,
    LogsTileComponent,
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
