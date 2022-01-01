import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModeratorComponent } from '../moderator.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent extends ModeratorComponent implements OnInit {
  search: string = "Szukaj...";
  menuOptions: MenuOption[] = [
    {name: 'Wpisy'},
    {name: 'Zepsute wpisy'},
    {name: 'Strona główna'},
    {name: 'Pomoc'}
  ];

  constructor(titleService: Title, private auth: AuthenticationService, private router: Router) {
    super(titleService);
    this.pageTitle = "Panel moderatora";

    this.auth.verifyToken().subscribe(s => {
      s ? undefined : this.router.navigateByUrl("/strona-główna");
    });
  }

  returnToMain(): void {
    this.router.navigateByUrl("/strona-główna");
  }
}

interface MenuOption {
  name: string;
}