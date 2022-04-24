import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PrayInterface } from "../interfaces/pray.interface";
import { EntriesService } from "./entries.service";
import { SETUP } from "./web.setup";

@Injectable({
    providedIn: 'root'
})
export class PraysService {
    constructor(private http: HttpClient) { }
    
    getPrays(): Observable<PrayInterface[]> {
        return this.http.get<PrayInterface[]>(`${SETUP.apiUrl}/prays`);
    }
}
