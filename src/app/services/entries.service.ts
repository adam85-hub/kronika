import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseInterface } from '../interfaces/response.model';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  constructor(private http: HttpClient) {
  }

  getEntries() : Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>("http://localhost:80/kronika/api/entries");
  }
}
