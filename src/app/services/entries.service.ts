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
  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  getEntries() : Observable<EntryInterface[]> {
    return this.http.get<EntryInterface[]>(`${this.apiUrl}/entries`);
  }

  getEntriesByYear(year: number) : Observable<EntryInterface[]> {
    return this.http.get<EntryInterface[]>(`${this.apiUrl}/year/${year}`);
  }

  getYears() : Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/years`);
  }

  getEntry(key: string) : Observable<EntryInterface|FailedEntryInterface> {
    return this.http.get<EntryInterface|FailedEntryInterface>(`${this.apiUrl}/entry/${key}`); 
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

  uploadPhoto(file: File, entryKey: string): Observable<{"filename": string}> {
    const headers = new HttpHeaders().append('Token', this.auth.getToken());
    let formData = new FormData();
    formData.append("photo", file, file.name);
    return this.http.post<{"filename": string}>(`${this.apiUrl}/entry/${entryKey}/photo`, formData, {'headers': headers});
  }

  deleteEntry(entryKey: string): Observable<boolean> {
    const headers = new HttpHeaders().append('Token', this.auth.getToken());
    const success = new Subject<boolean>();
    
    this.http.delete(`${this.apiUrl}/entry/${entryKey}`, {'headers': headers, 'responseType': 'text'}).subscribe((response) => {
      if (response == "OK") {
        success.next(true);
      } else {
        success.next(false);
      }
    });
    
    return success.asObservable();
  }

  get apiUrl() {
    return SETUP.apiUrl;
  }

  get photosUrl() {
    return SETUP.photosUrl;
  }
}
