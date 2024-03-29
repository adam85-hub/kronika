import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PrayInterface } from "../interfaces/pray.interface";
import { PrayVideoInterface } from "../interfaces/prayVideo.interface";
import { AuthenticationService } from "./authentication.service";
import { SETUP } from "./web.setup";

@Injectable({
    providedIn: 'root'
})
export class PraysService {
    constructor(private http: HttpClient, private auth: AuthenticationService) { }

    getPrays(): Observable<PrayInterface[]> {
        return this.http.get<PrayInterface[]>(`${SETUP.apiUrl}/get-prays.php`);
    }

    deletePray(id: number): Observable<boolean> {
        const headers = new HttpHeaders().append('Token', this.auth.getToken());
        const success = new Subject<boolean>();

        const deleteObserver = {
            next: (response: any) => {
                if (response == "OK") success.next(true);
                else success.next(false);
            },
            error: (error: any) => {
                success.next(false);
            }
        }

        this.http.delete(`${SETUP.apiUrl}/delete-pray.php?id=${id}`, { "headers": headers, "responseType": "text" }).subscribe(deleteObserver);

        return success.asObservable();
    }

    modifyPray(pray: PrayInterface): Observable<PrayInterface> {
        const headers = new HttpHeaders().append('Token', this.auth.getToken());

        return this.http.put<PrayInterface>(`${SETUP.apiUrl}/put-pray.php`, pray, { "headers": headers });
    }

    postPray(pray: PrayInterface): Observable<PrayInterface> {
        const headers = new HttpHeaders().append('Token', this.auth.getToken());

        return this.http.post<PrayInterface>(`${SETUP.apiUrl}/post-pray.php`, pray, { "headers": headers });
    }

    getPrayVideos(): Observable<PrayVideoInterface[]> {
        return this.http.get<PrayVideoInterface[]>(`${SETUP.apiUrl}/get-pray-videos.php`);
    }
}
