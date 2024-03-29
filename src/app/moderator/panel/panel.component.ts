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
  basePath = '/moderator/panel';
  menuOptions: MenuOption[] = [
    { name: 'Wpisy', path: '/entries' },
    { name: 'Zepsute wpisy', path: '/failed-entries' },
    { name: 'Medytacje', path: '/prays'}
  ];

  constructor(titleService: Title, auth: AuthenticationService, router: Router) {
    super(titleService, auth, router);
    this.pageTitle = "Panel moderatora";

    this.auth.verifyToken().subscribe(s => {
      s ? undefined : this.returnToMain();
    });
  }

  changeDisplayedOption(option: MenuOption) {
    this.router.navigateByUrl(this.basePath + option.path);
  }

  logout() {
    this.auth.logOut().subscribe(s => this.returnToMain());
  }
}

interface MenuOption {
  name: string;
  path: string;
}
