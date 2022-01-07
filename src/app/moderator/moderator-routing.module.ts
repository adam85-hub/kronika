import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { PanelComponent } from './panel/panel.component';

const routes: Routes = [
  {path: '', redirectTo: 'panel', pathMatch: 'full'},
  {
    path: 'panel', 
    component: PanelComponent,
    children: [
      { path: '', redirectTo: 'entries'},
      { path: 'entries', component: EntriesListComponent }
    ]
  },  
  {path: 'edit/:id', component: EditEntryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeratorRoutingModule { }
