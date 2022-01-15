import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PageComponent } from 'src/app/pages/page/page.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-panel',
  template: ``,
  styles: []
})
export class ModeratorComponent extends PageComponent implements OnInit {

  constructor(titleService: Title, protected auth: AuthenticationService, protected router: Router) {
    super(titleService);
    this.isModerator = true;

    this.auth.verifyToken().subscribe(s => {
      s ? undefined : this.returnToMain();
    });
  }

  returnToMain() {
    this.router.navigateByUrl("/strona-główna");
  }

}
