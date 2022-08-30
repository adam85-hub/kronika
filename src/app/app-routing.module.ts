import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { KontaktComponent } from './pages/kontakt/kontakt.component';
import { KronikaComponent } from './pages/kronika/kronika.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ModeratorLoginComponent } from './pages/moderator-login/moderator-login.component';
import { WpisComponent } from './pages/wpis/wpis.component';
import { ModlitwyComponent } from './pages/modlitwy/modlitwy.component';
import { PiosenkiComponent } from './pages/piosenki/piosenki.component';

const routes: Routes = [
  { path: '', redirectTo: "strona-główna", pathMatch: 'full' },
  { path: 'strona-główna', component: MainPageComponent },
  { path: 'kronika', component: KronikaComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: 'kronika/:id', component: WpisComponent },
  { path: 'medytacje', component: ModlitwyComponent },
  { path: 'modlitwy', component: PiosenkiComponent },
  { path: 'login', component: ModeratorLoginComponent },
  {
    path: 'moderator',
    loadChildren: () => import('./moderator/moderator.module').then(m => m.ModeratorModule)
  },
  { path: 'error404', component: Error404Component },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
