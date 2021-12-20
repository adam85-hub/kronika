import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private password: string = 'none';

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
    else {
      console.error(`Backend returned code of ${error.status}, body of error was: `, error.error);
    }

    return throwError(() => new Error("Stało się coś złego; prosimy spróbować poźniej"));
  }

  /**
   * Sprawdza czy hasło jest poprawne
   * @param password Hasło do sprawdzenia
   * @returns Prawdę albo fałsz w zależności od poprawności hasła
   */
  public isLoggedIn(password: string): Observable<boolean> {
    const options = {
      params: new HttpParams().set('password', password)
    }

    return this.http.get<boolean>("http://localhost:80/kronika/api/login", options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Ustawia hasło z którym wysyłane są requesty
   * @param password Wartość hasła do ustawienia
   */
  public setPassword(password: string): void {
    this.password = password;
  }

  public async testLogin(): Promise<boolean> {
    const response: boolean = await this.later(1000).then(() => {
      if (this.password === "twojastarsza") {
        return true;
      }
      else {
        return false;
      }
    })

    return response;
  }

  private later(delay: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, delay);
    });
  }
}
