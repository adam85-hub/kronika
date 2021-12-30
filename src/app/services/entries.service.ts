import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntryInterface, FailedEntryInterface } from '../interfaces/entry.interface';
import { ResponseInterface, YearsResponseInterface } from '../interfaces/responses.interface';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  constructor(private http: HttpClient) {
  }

  getEntries() : Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>("http://localhost:80/kronika/api/entries");
  }

  getEntriesByYear(year: number) : Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>(`http://localhost:80/kronika/api/entries/year/${year}`);
  }

  getYears() : Observable<YearsResponseInterface> {
    return this.http.get<YearsResponseInterface>("http://localhost:80/kronika/api/entries/years");
  }

  getEntry(id: number) : Observable<EntryInterface|FailedEntryInterface> {
    return this.http.get<EntryInterface|FailedEntryInterface>(`http://localhost:80/kronika/api/entry/${id}`);
  }
}
