import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntryInterface, FailedEntryInterface } from '../interfaces/entry.interface';
import { FailedEntriesResponseInterface, ResponseInterface, YearsResponseInterface } from '../interfaces/responses.interface';
import {SETUP} from './web.setup';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  private baseUrl = SETUP.baseUrl;

  constructor(private http: HttpClient) {
  }

  getEntries() : Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>(this.baseUrl + "/kronika/api/entries");
  }

  getEntriesByYear(year: number) : Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>(this.baseUrl + `/kronika/api/entries/year/${year}`);
  }

  getYears() : Observable<YearsResponseInterface> {
    return this.http.get<YearsResponseInterface>(this.baseUrl + "/kronika/api/entries/years");
  }

  getEntry(id: number) : Observable<EntryInterface|FailedEntryInterface> {
    return this.http.get<EntryInterface|FailedEntryInterface>(this.baseUrl + `/kronika/api/entry/${id}`);
  }

  getFailedEntries(): Observable<FailedEntriesResponseInterface> {
    return this.http.get<FailedEntriesResponseInterface>(this.baseUrl + `/kronika/api/entries/failed`);
  }
}
