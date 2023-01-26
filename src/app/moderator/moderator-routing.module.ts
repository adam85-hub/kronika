import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { FailedEntriesListComponent } from './failed-entries-list/failed-entries-list.component';
import { FixEntryComponent } from './fix-entry/fix-entry.component';
import { PanelComponent } from './panel/panel.component';
import { PraysListComponent } from './prays-list/prays-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'panel', pathMatch: 'full' },
  {
    path: 'panel',
    component: PanelComponent,
    children: [
      { path: '', redirectTo: 'entries', pathMatch: "full" },
      { path: 'entries', component: EntriesListComponent, pathMatch: "full" },
      { path: 'failed-entries', component: FailedEntriesListComponent },
      { path: 'prays', component: PraysListComponent },
    ]
  },
  { path: 'edit/:key', component: EditEntryComponent },
  { path: 'fix/:key', component: FixEntryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeratorRoutingModule { }
