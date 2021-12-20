import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  constructor(private http: HttpClient) {
  }

  getEntries() : Observable<Entry[]> {
    return this.http.get<Entry[]>("http://localhost:80/kronika/api/posts");
  }
}
