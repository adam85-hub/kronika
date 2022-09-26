import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SETUP } from "./web.setup";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private http: HttpClient) { }

  getLog(logType: string): Observable<string> {
    const headers = new HttpHeaders().append("Password", "32a6bc03446f11b005dce175f0");

    return this.http.get(`${SETUP.apiUrl}/log/${logType}.php`, { "responseType": "text", "headers": headers });
  }
}
