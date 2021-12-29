import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, Observable, Subject, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token?: string = undefined;

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
    else if (error.status === 403){
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
  public logIn(password: string): Observable<string> {
    const options = {
      params: new HttpParams().set('password', password)
    }

    return this.http.get<string>("http://localhost:80/kronika/api/login", options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Wylogowuje (unieważnia token)
   */
  public logOut(): void {
    this.http.get<boolean>("http://localhost:80/kronika/api/logout");
  }

  /**
   * Ustawia token i ciasteczko które go przechowuje
   * @param token token do ustawienia
   */
  public setToken(token: string): void{
    this.token = token;

    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);

    this.cookieService.set("token", token, expireDate);
  }


  /**
   * Verifies if token is still valid
   * @returns true if token is valid false if not
   */
  public verifyToken() : Observable<boolean> {
    let token = this.cookieService.get("token");
    let obs$ = new BehaviorSubject<boolean>(false);    

    if(token != undefined || token != null) {
      const options = {
        params: new HttpParams().set('token', token)
      }

      return this.http.get<boolean>("http://localhost:80/kronika/api/verifytoken", options).pipe(
        catchError(this.handleError)
      );
    }

    return obs$.asObservable();
  }
}
