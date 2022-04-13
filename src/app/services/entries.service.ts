import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EntryInterface, FailedEntryInterface } from '../interfaces/entry.interface';
import { AuthenticationService } from './authentication.service';
import {SETUP} from './web.setup';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  private baseUrl = SETUP.baseUrl;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  getEntries() : Observable<EntryInterface[]> {
    return this.http.get<EntryInterface[]>(`${this.apiUrl}/entries`);
  }

  getEntriesByYear(year: number) : Observable<EntryInterface[]> {
    return this.http.get<EntryInterface[]>(`${this.apiUrl}/entries/year/${year}`);
  }

  getYears() : Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/entries/years`);
  }

  getEntry(id: number) : Observable<EntryInterface|FailedEntryInterface> {
    return this.http.get<EntryInterface|FailedEntryInterface>(`${this.apiUrl}/entry/${id}`);
  }

  getFailedEntries(): Observable<FailedEntryInterface[]> {
    return this.http.get<FailedEntryInterface[]>(`${this.apiUrl}/entries/failed`);
  }

  getNewestEntries(): Observable<EntryInterface[]> {
    return this.http.get<EntryInterface[]>(`${this.apiUrl}/entries/newest`);
  }

  modifyEntry(entry: EntryInterface) {
    const headers = new HttpHeaders().append('Token', this.auth.getToken());
    return this.http.put<EntryInterface>(`${this.apiUrl}/entry`, entry, {'headers': headers});
  }

  postEntry(entry: EntryInterface) { //entry id gets overrided by backend
    const headers = new HttpHeaders().append('Token', this.auth.getToken());
    return this.http.post<EntryInterface>(`${this.apiUrl}/entry`, entry, {'headers': headers});
  }

  uploadPhoto(file: File, entryId: number): Observable<string> {
    const headers = new HttpHeaders().append('Token', this.auth.getToken());
    let formData = new FormData();
    formData.append("photo", file, file.name);
    return this.http.post(`${this.apiUrl}/entry/${entryId}/photo`, formData, {'headers': headers, 'responseType': 'text'});
  }

  deleteEntry(entryId: number): Observable<boolean> {
    const headers = new HttpHeaders().append('Token', this.auth.getToken());
    const success = new Subject<boolean>();
    
    this.http.delete(`${this.apiUrl}/entry/${entryId}`, {'headers': headers, 'responseType': 'text'}).subscribe((response) => {
      if (response == "OK") {
        success.next(true);
      } else {
        success.next(false);
      }
    });
    
    return success.asObservable();
  }

  get apiUrl() {
    return this.baseUrl + "/kronika/api";
  }

  get entriesFolderUrl() {
    return this.baseUrl + "/kronika/entries/";
  }
}
