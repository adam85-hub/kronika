import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { last } from 'rxjs';
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
  isWaiting: boolean = false;
  isGoodPassword: boolean | undefined = undefined;

  constructor(titleService: Title, private router: Router, private authService: AuthenticationService) { 
    super(titleService);
    this.authService.verifyToken().pipe(last()).subscribe(s => {
      s ? this.router.navigateByUrl('/moderator/panel') : undefined;
    });
  }

  logIn() {
    this.isWaiting = true;
    this.authService.logIn(this.password).pipe(last()).subscribe(s => this.onSuccess(s.text));
  }

  onSuccess(success: String) {
    if(success.startsWith("yes")) {
      let token = success.substring(4);      
      this.authService.setToken(token);

      this.router.navigateByUrl('/moderator/panel');
      this.isGoodPassword = true;        
    }
    else {
      this.isGoodPassword = false;  
    }
    this.isWaiting = false;
    
  }
}
