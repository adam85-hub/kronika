import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { LoginInterface } from '../interfaces/response.interfaces';
import { SETUP } from './web.setup';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = SETUP.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  /**
   * Służy do uzyskania tokenu pozwalającego na edytowanie danych
   * @param password Hasło pozwalające uzyskać token
   * @returns "yes+token" jeżeli prawda "no" jeżeli nie
   */
  public logIn(password: string): Observable<LoginInterface> {
    const headers = new HttpHeaders().set("password", password);

    return this.http.get<LoginInterface>(this.apiUrl + "/login", { 'headers': headers });
  }

  /**
   * Wylogowuje (unieważnia token)
   */
  public logOut(): Observable<any> {
    let token = this.getToken();
    let obs$ = new BehaviorSubject<any>('false');    

    if(token != undefined || token != null) {
      const headers = new HttpHeaders().set('Token', token);

      return this.http.get(this.apiUrl + "/logout", { 'headers': headers, responseType: 'text' });
    }

    return obs$.asObservable();
  }

  /**
   * Ustawia token i ciasteczko które go przechowuje
   * @param token token do ustawienia
   */
  public setToken(token: string): void{
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);

    this.cookieService.set("token", token, expireDate);
  }


  /**
   * Verifies if token is still valid
   * @returns true if token is valid false if not
   */
  public verifyToken() : Observable<boolean> {
    let token = this.getToken();
    let obs$ = new BehaviorSubject<boolean>(false);  

    if(token != undefined && token != null && token != '') {
      const headers = new HttpHeaders().append('Token', token);

      return this.http.get<boolean>(this.apiUrl + "/verifytoken", { 'headers': headers });
    }

    return obs$.asObservable();
  }

  public getToken() {
    return this.cookieService.get("token");
  }
}
