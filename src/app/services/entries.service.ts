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
    return this.http.get<EntryInterface[]>(this.baseUrl + "/kronika/api/entries");
  }

  getEntriesByYear(year: number) : Observable<EntryInterface[]> {
    return this.http.get<EntryInterface[]>(this.baseUrl + `/kronika/api/entries/year/${year}`);
  }

  getYears() : Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + "/kronika/api/entries/years");
  }

  getEntry(id: number) : Observable<EntryInterface|FailedEntryInterface> {
    return this.http.get<EntryInterface|FailedEntryInterface>(this.baseUrl + `/kronika/api/entry/${id}`);
  }

  getFailedEntries(): Observable<FailedEntryInterface[]> {
    return this.http.get<FailedEntryInterface[]>(this.baseUrl + `/kronika/api/entries/failed`);
  }

  getNewestEntries(): Observable<EntryInterface[]> {
    return this.http.get<EntryInterface[]>(this.baseUrl + "/kronika/api/entries/newest");
  }

  modifyEntry(entry: EntryInterface) {
    const headers = new HttpHeaders().append('Token', this.auth.getToken());
    return this.http.put<EntryInterface>(this.baseUrl + `/kronika/api/entry`, entry, {'headers': headers});
  }

  uploadPhoto(file: File, entryId: number): Observable<string> {
    const headers = new HttpHeaders().append('Token', this.auth.getToken());
    let formData = new FormData();
    formData.append("photo", file, file.name);
    return this.http.post(this.baseUrl + `/kronika/api/entry/${entryId}/photo`, formData, {'headers': headers, 'responseType': 'text'});
  }

  deleteEntry(entryId: number): Observable<boolean> {
    const headers = new HttpHeaders().append('Token', this.auth.getToken());
    const success = new Subject<boolean>();
    
    setTimeout(() => success.next(true), 1000);
    
    return success.asObservable();
  }

  get apiUrl() {
    return this.baseUrl + "/kronika/api/";
  }

  get entriesFolderUrl() {
    return this.baseUrl + "/kronika/entries/";
  }
}
