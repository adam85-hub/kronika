import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { KronikaComponent } from './pages/kronika/kronika.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ModeratorLoginComponent } from './pages/moderator-login/moderator-login.component';
import { ModeratorPanelComponent } from './pages/moderator-panel/moderator-panel.component';
import { WpisComponent } from './pages/wpis/wpis.component';

const routes: Routes = [
  { path: '', redirectTo: "strona-główna", pathMatch: 'full' },
  { path: 'strona-główna', component: MainPageComponent },
  { path: 'kronika', component: KronikaComponent },
  { path: 'kronika/:id', component: WpisComponent },
  { path: 'login', component: ModeratorLoginComponent },
  { path: 'panel', component: ModeratorPanelComponent },
  { path: 'error404', component: Error404Component},
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
