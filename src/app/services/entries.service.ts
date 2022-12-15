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
    return this.http.get<EntryInterface[]>(`${this.apiUrl}/get-entries.php`);
  }

  getEntriesByYear(year: number) : Observable<EntryInterface[]> {
    return this.http.get<EntryInterface[]>(`${this.apiUrl}/entries-by-year.php?year=${year}`);
  }

  getYears() : Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/get-years.php`);
  }

  getEntry(id: number) : Observable<EntryInterface|FailedEntryInterface> {
    return this.http.get<EntryInterface|FailedEntryInterface>(`${this.apiUrl}/get-entry.php?id=${id}`);
  }

  getFailedEntries(): Observable<FailedEntryInterface[]> {
    return this.http.get<FailedEntryInterface[]>(`${this.apiUrl}/get-failed-entries.php`);
  }

  getNewestEntries(): Observable<EntryInterface[]> {
    return this.http.get<EntryInterface[]>(`${this.apiUrl}/get-newest-entries.php`);
  }

  modifyEntry(entry: EntryInterface) {
    const headers = new HttpHeaders().append('Token', this.auth.getToken());
    return this.http.put<EntryInterface>(`${this.apiUrl}/put-entry.php`, entry, {'headers': headers});
  }

  postEntry(entry: EntryInterface) { //entry id gets overrided by backend
    const headers = new HttpHeaders().append('Token', this.auth.getToken());
    return this.http.post<EntryInterface>(`${this.apiUrl}/post-entry.php`, entry, {'headers': headers});
  }

  uploadPhoto(file: File, entryId: number): Observable<string> {
    const headers = new HttpHeaders().append('Token', this.auth.getToken());
    let formData = new FormData();
    formData.append("photo", file, file.name);
    return this.http.post(`${this.apiUrl}/post-photo.php?id=${entryId}`, formData, {'headers': headers, 'responseType': 'text'});
  }

  deleteEntry(entryId: number): Observable<boolean> {
    const headers = new HttpHeaders().append('Token', this.auth.getToken());
    const success = new Subject<boolean>();
    
    this.http.delete(`${this.apiUrl}/delete-entry.php?id=${entryId}`, {'headers': headers, 'responseType': 'text'}).subscribe((response) => {
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

  get entriesFolderUrl() {
    return SETUP.entriesFolderUrl;
  }
}
