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
   * Handles errors in connetcions with back-end
   * @param error Error
   * @returns Observable error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("An error ocurred: ", error.error);
      return throwError(() => new Error("Sprawdź swoje połączenie internetowe."));
    }
    else if (error.status === 401){
      console.error("An error ocurred: ", error.error);
      return throwError(() => new Error("Nie jesteś zalogowany."));
    }
    else {
      console.error(`Backend returned code of ${error.status}, body of error was: `, error.error);
    }

    return throwError(() => new Error("Stało się coś złego; prosimy spróbować poźniej"));
  }

  /**
   * Służy do uzyskania tokenu pozwalającego na edytowanie danych
   * @param password Hasło pozwalające uzyskać token
   * @returns "yes+token" jeżeli prawda "no" jeżeli nie
   */
  public logIn(password: string): Observable<LoginInterface> {
    const headers = new HttpHeaders().set("password", password);

    return this.http.get<LoginInterface>(this.apiUrl + "/login", {'headers': headers}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Wylogowuje (unieważnia token)
   */
  public logOut(): Observable<any> {
    let token = this.getToken();
    let obs$ = new BehaviorSubject<any>('false');    

    if(token != undefined || token != null) {
      const headers = new HttpHeaders().set('Token', token);

      return this.http.get(this.apiUrl + "/logout", {'headers' : headers, responseType: 'text'}).pipe(
        catchError(this.handleError)
      );
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

      return this.http.get<boolean>(this.apiUrl + "/verifytoken", { 'headers': headers }).pipe(
        catchError(this.handleError)
      );
    }

    return obs$.asObservable();
  }

  public getToken() {
    return this.cookieService.get("token");
  }
}
