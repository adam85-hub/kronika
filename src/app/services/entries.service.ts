import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ENTRIES } from '../mock-entries';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  private entries$: BehaviorSubject<Entry[]> = new BehaviorSubject<Entry[]>(ENTRIES);

  constructor() {
  }

  getEntries() : Observable<Entry[]> {
    return this.entries$.asObservable();
  }
}
