import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-moderator-login',
  templateUrl: './moderator-login.component.html',
  styleUrls: ['./moderator-login.component.scss']
})
export class ModeratorLoginComponent extends PageComponent implements OnInit {
  override pageTitle: string = "Logowanie do panelu moderatora";
  password: string = "";
  isWaiting: boolean = true;
  isGoodPassword: boolean | undefined = undefined;

  constructor(titleService: Title, private authService: AuthenticationService, private router: Router) { 
    super(titleService);
  }

  async logIn() {
    this.isWaiting = true;
    this.authService.setPassword(this.password);
    await this.authService.testLogin().then((s) => this.onSuccess(s));
  }

  onSuccess(success: boolean) {
    if(success == true) {
      this.router.navigateByUrl('/panel');
    }
    this.isWaiting = false;
    this.isGoodPassword = success;  
  }
}
