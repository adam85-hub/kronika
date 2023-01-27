import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { SETUP } from "./web.setup";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  getLog(): Observable<string> {
    const headers = new HttpHeaders().append("Token", this.auth.getToken());

    return this.http.get(`${SETUP.apiUrl}/log`, { "responseType": "text", "headers": headers });
  }
}
