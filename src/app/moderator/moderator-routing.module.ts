import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { EditMainPageComponent } from './edit-main-page/edit-main-page.component';
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
      { path: '', redirectTo: 'entries' },
      { path: 'entries', component: EntriesListComponent },
      { path: 'failed-entries', component: FailedEntriesListComponent },
      { path: 'prays', component: PraysListComponent },
      { path: 'main-page', component: EditMainPageComponent },
    ]
  },
  { path: 'edit/:id', component: EditEntryComponent },
  { path: 'fix/:id', component: FixEntryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeratorRoutingModule { }
